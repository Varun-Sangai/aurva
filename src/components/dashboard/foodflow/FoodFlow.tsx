import Dagre from '@dagrejs/dagre';
import { useCallback, useEffect } from 'react';
import {
  ReactFlow,
  useNodesState,
  useEdgesState,
  Background,
  Node as GraphNode,
  useNodesInitialized,
  Edge,
  useReactFlow,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { queryCategories } from '../../../apis/queries/categories.queries.ts';
import { convertCategoriesToNodes, convertMealsToNodes, deleteNodesAndEdges, generateEdges, generateGeneralNodes, generateIngredientNodes, generateTagNodes, generateViewMealNodes, setMealLevelCount } from '../../../utils/nodeHelper.ts';
import CategoryNode from './nodes/CategoryNode.tsx';
import ExploreNode from './nodes/ExploreNode.tsx';
import MealNode from './nodes/MealNode.tsx';
import { queryMeal, queryMealFilteredByCategory, queryMealFilteredByIngredient } from '../../../apis/queries/meals.queries.ts';
import ViewNode from './nodes/ViewNode.tsx';
import TagNode from './nodes/TagNode.tsx';
import IngredientNode from './nodes/IngredientNode.tsx';
import React from 'react';
import { isObjectInArrayByProperty } from '../../../utils/helper.ts';
import { categoryId, exploreId, ingredientId, mealId, tagId, viewDetailId, viewIngredientId, viewMealId, viewTagId } from '../../../utils/config.ts';
import { errorToast, warningToast } from '../../shared/Toasts.tsx';


const nodeWidth = 0;
const nodeHeight = 0;

const getLayoutedElements = (nodes: any, edges: any, options: any) => {
  const g = new Dagre.graphlib.Graph().setDefaultEdgeLabel(() => ({}));
  g.setGraph({ rankdir: options.direction });

  edges.forEach((edge: any) => g.setEdge(edge.source, edge.target));
  nodes.forEach((node: any) =>
    g.setNode(node.id, {
      ...node,
      width: node.measured?.width ?? nodeWidth,
      height: node.measured?.height ?? nodeHeight,
    }),
  );

  Dagre.layout(g);

  return {
    nodes: nodes.map((node: any) => {
      const position = g.node(node.id);
      // We are shifting the dagre node position (anchor=center center) to the top left
      // so it matches the React Flow node anchor point (top left).
      const x = position.x - (node.measured?.width ?? nodeWidth) / 2;
      const y = position.y - (node.measured?.height ?? nodeHeight) / 2;

      return { ...node, position: { x, y }, hidden: false };
    }),
    edges,
  };
};

const layoutedInitial = getLayoutedElements([
  {
    id: exploreId,
    data: { label: 'Explore' },
    type: "explore",
    position: { x: 0, y: 0 },
  },
], [], { direction: 'LR' });

const options = {
  includeHiddenNodes: true,
}

const nodeTypes = {
  category: CategoryNode,
  explore: ExploreNode,
  meal: MealNode,
  view: ViewNode,
  tag: TagNode,
  ingredient: IngredientNode
};

const FoodFlow = ({ toggleMeal }: { toggleMeal: (id?: string) => void }) => {
  const { fitView } = useReactFlow();
  const [nodes, setNodes, onNodesChange] = useNodesState<GraphNode>(layoutedInitial?.nodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(layoutedInitial?.edges);
  const nodesInitialized = useNodesInitialized(options);

  useEffect(() => {
    const temp: GraphNode[] = [...nodes];
    let nodesToFocus: GraphNode[] = [...nodes];
    if (temp.length > 6) {
      nodesToFocus = temp.splice(temp.length - 6);
    }
    window.requestAnimationFrame(() => {
      fitView(
        {
          includeHiddenNodes: true,
          maxZoom: 0.8,
          duration: 500,
          nodes: [...nodesToFocus]
        }
      );
    });
  }, [nodes, edges]);

  useEffect(() => {
    if (nodesInitialized) {
      const layouted = getLayoutedElements([...nodes], [...edges], { direction: 'LR' });
      updateNodesAndEdges([...layouted.nodes], [...layouted.edges]);
    }
  }, [nodesInitialized]);

  const updateNodesAndEdges = useCallback((nodes: GraphNode[], edges: Edge[]) => {
    setNodes(nodes);
    setEdges(edges);
  }, []);

  const handleNodeClick = useCallback(
    async (_event: React.MouseEvent, node: GraphNode) => {
      try {
        if (node.id.includes(exploreId)) {
          if (!isObjectInArrayByProperty(edges, "source",node.id)){
            const categories = await queryCategories();
            const categoriesNode = convertCategoriesToNodes(categories);
            categoriesNode.splice(5);
            const categoriesEdges = generateEdges(node.id, categoriesNode);
            updateNodesAndEdges([...nodes, ...categoriesNode], [...categoriesEdges])
          } else {
            const { newNodes }=deleteNodesAndEdges(edges, nodes, categoryId);
            setMealLevelCount(0);
            updateNodesAndEdges([...newNodes], []);
            toggleMeal(undefined);
          }
        } else if (node.id.includes(categoryId)){
          if (!isObjectInArrayByProperty(edges, "target", viewMealId)) {
            const viewMealNodes = generateViewMealNodes(node?.data?.label as string || "");
            viewMealNodes.splice(5);
            const viewMealsEdges = generateEdges(node.id, viewMealNodes);
            updateNodesAndEdges([...nodes, ...viewMealNodes], [...edges, ...viewMealsEdges])
          } else {
            if (isObjectInArrayByProperty(edges, "source", node.id)) {
              const { newNodes, newEdges } = deleteNodesAndEdges(edges, nodes, viewMealId);
              updateNodesAndEdges(newNodes, newEdges);
              setMealLevelCount(0);
              toggleMeal(undefined);
            } else {
              const { newNodes, newEdges } = deleteNodesAndEdges(edges, nodes, viewMealId);
              const viewMealNodes = generateViewMealNodes(node?.data?.label as string || "");
              viewMealNodes.splice(5);
              const viewMealsEdges = generateEdges(node.id, viewMealNodes);
              setMealLevelCount(0);
              updateNodesAndEdges([...newNodes, ...viewMealNodes], [...newEdges, ...viewMealsEdges]);
              toggleMeal(undefined);
            }
          }
        } else if (node.id.includes(viewMealId)) {
          if (!isObjectInArrayByProperty(nodes, "id", mealId)) {
            const temp: string[] = node.id.split(" ");
            const category = temp[temp.length - 1];
            const meals = await queryMealFilteredByCategory(category as string || "");
            const mealsNode = convertMealsToNodes(meals);
            mealsNode.splice(5);
            const mealsEdges = generateEdges(node.id, mealsNode);
            if (mealsNode.length > 0)
              updateNodesAndEdges([...nodes, ...mealsNode], [...edges, ...mealsEdges])
            else
              warningToast("No Meals were found for this category!!");
          } else {
            const { newNodes, newEdges } = deleteNodesAndEdges(edges, nodes, mealId);
            setMealLevelCount(0);
            updateNodesAndEdges(newNodes, newEdges);
            toggleMeal(undefined);
          }
        } else if (node.id.includes(mealId)) {
          const [shaMealIdLevel,_mealCount,realMealId]: string[] = node.id.split(" ");
          let [_shaMealId,Level]=shaMealIdLevel.split("-");
          if(!isObjectInArrayByProperty(nodes, "id", `${viewIngredientId}-${Level}`)){
            const generalNodes = generateGeneralNodes(realMealId);
            const generalEdges = generateEdges(node.id, generalNodes);
            updateNodesAndEdges([...nodes, ...generalNodes], [...edges, ...generalEdges])
          }else{
            if (isObjectInArrayByProperty(edges, "source", node.id)) {
              const { newNodes: newNodes1, newEdges: newEdges1 } = deleteNodesAndEdges(edges, nodes,`${viewIngredientId}-${Level}`);
              const { newNodes: newNodes2, newEdges: newEdges2 } = deleteNodesAndEdges(newEdges1, newNodes1, `${viewTagId}-${Level}`);
              const { newNodes: newNodes3, newEdges: newEdges3 } = deleteNodesAndEdges(newEdges2, newNodes2, `${viewDetailId}-${Level}`);
              setMealLevelCount(Number(Level));
              updateNodesAndEdges(newNodes3, newEdges3);
              toggleMeal(undefined);
            } else {
              const { newNodes: newNodes1, newEdges: newEdges1 } = deleteNodesAndEdges(edges, nodes,`${viewIngredientId}-${Level}`);
              const { newNodes: newNodes2, newEdges: newEdges2 } = deleteNodesAndEdges(newEdges1, newNodes1, `${viewTagId}-${Level}`);
              const { newNodes: newNodes3, newEdges: newEdges3 } = deleteNodesAndEdges(newEdges2, newNodes2, `${viewDetailId}-${Level}`);
              setMealLevelCount(Number(Level));
              const generalNodes = generateGeneralNodes(realMealId);
              const generalEdges = generateEdges(node.id, generalNodes);
              updateNodesAndEdges([...newNodes3, ...generalNodes], [...newEdges3, ...generalEdges]);
              toggleMeal(undefined);
            }
          }
        } else if (node.id.includes(viewTagId)){
          const [shaViewTagIdLevel,_viewTagCount,realMealId]: string[] = node.id.split(" ");
          let [_shaViewTagId,Level]=shaViewTagIdLevel.split("-");
          if (!isObjectInArrayByProperty(edges, "source", node.id)){
            const meal = await queryMeal(realMealId);
            if (meal) {
              const tagNodes = generateTagNodes(meal);
              tagNodes.splice(5);
              const tagEdges = generateEdges(node.id, tagNodes);
              if (tagNodes.length > 0)
                updateNodesAndEdges([...nodes, ...tagNodes], [...edges, ...tagEdges])
              else
                warningToast("No tags were found for this meal!!");
            }
          } else {
            const { newNodes, newEdges } = deleteNodesAndEdges(edges, nodes,`${tagId}-${Level}`);
            updateNodesAndEdges(newNodes, newEdges);
            toggleMeal(undefined);
          }
        } else if (node.id.includes(viewIngredientId)) {
          const [shaViewIngredientIdLevel,_viewTagCount,realMealId]: string[] = node.id.split(" ");
          let [_shaViewIngredientId,Level]=shaViewIngredientIdLevel.split("-");
          if (!isObjectInArrayByProperty(edges, "source", node.id)){
            const meal = await queryMeal(realMealId);
            if (meal) {
              const ingredientNodes = generateIngredientNodes(meal);
              ingredientNodes.splice(5);
              const ingredientEdges = generateEdges(node.id, ingredientNodes);
              if (ingredientEdges.length > 0)
                updateNodesAndEdges([...nodes, ...ingredientNodes], [...edges, ...ingredientEdges]);
              else
                warningToast("No Ingredient were found for this meal!!");
            }
          } else {
            const { newNodes, newEdges } = deleteNodesAndEdges(edges, nodes, `${ingredientId}-${Level}`);
            setMealLevelCount(Number(Level));
            updateNodesAndEdges(newNodes, newEdges);
            toggleMeal(undefined);
          }
        } else if (node.id.includes(viewDetailId)) {
          const temp: string[] = node.id.split(" ");
          toggleMeal(temp[temp.length - 1])
        } else if (node.id.includes(ingredientId)) {
          const [shaIngredientIdLevel,_viewTagCount,_realMealId]: string[] = node.id.split(" ");
          let [_shaIngredientId,Level]=shaIngredientIdLevel.split("-");
          if (!isObjectInArrayByProperty(nodes, "id", `${mealId}-${Number(Level)+1}`)) {
            const meal = await queryMealFilteredByIngredient(node?.data?.label as string  || "");
            if (meal) {
              const mealNodes = convertMealsToNodes(meal);
              mealNodes.splice(5);
              const mealEdges = generateEdges(node.id, mealNodes);
              if (mealEdges.length > 0)
                updateNodesAndEdges([...nodes, ...mealNodes], [...edges, ...mealEdges]);
              else
                warningToast("No Meal were found for this ingredient!!");
            }
          }
          else{
            if (isObjectInArrayByProperty(edges, "source", node.id)) {
              const { newNodes: newNodes1, newEdges: newEdges1 } = deleteNodesAndEdges(edges, nodes,`${mealId}-${Number(Level)+1}`);
              setMealLevelCount(Number(Level));
              updateNodesAndEdges(newNodes1, newEdges1);
              toggleMeal(undefined);
            } else {
              const { newNodes: newNodes1, newEdges: newEdges1 } = deleteNodesAndEdges(edges, nodes,`${mealId}-${Number(Level)+1}`);
              setMealLevelCount(Number(Level));
              const meal = await queryMealFilteredByIngredient(node?.data?.label as string  || "");
              const mealNodes = convertMealsToNodes(meal);
              mealNodes.splice(5);
              const mealEdges = generateEdges(node.id, mealNodes);
              updateNodesAndEdges([...newNodes1, ...mealNodes], [...newEdges1, ...mealEdges]);
              toggleMeal(undefined);
            }
          }
        }
      } catch (err) {
        errorToast(err as string)
      }
    },
    [nodes, edges],
  );

  return (
    <div className='h-full'>
      <ReactFlow
        nodeTypes={nodeTypes}
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onNodeClick={handleNodeClick}
        nodesDraggable={false}
      >
        <Background></Background>
      </ReactFlow>
    </div>
  );
};


export default React.memo(FoodFlow);