import { Edge, Node as GraphNode} from "@xyflow/react";
import { Category, Meal, PartialMeal } from "../types";
import { categoryId, edgeConfig, ingredientId, mealId, tagId, viewDetailId, viewIngredientId, viewMealId, viewTagId } from "./config";

// Edge Count
let edgeCount = 0;
// Category Count
let categoryCount = 0;
// Meal Count
let mealCount = 0;
// Ingredient Count
let ingredientCount = 0;
// Tag Count
let tagCount = 0;
// View Detail Count
let viewDetailCount = 0;
// View Meal Count
let viewMealCount = 0;
// View Ingredient Count
let viewIngredientCount = 0;
// View Tag Count
let viewTagCount = 0;

// Function to convert Category array to nodes array
export const convertCategoriesToNodes = (
  categories?: Category[]
): GraphNode[] => {
  if (categories) {
    return categories.map((category) => {
      categoryCount += 1;
      return {
        id: categoryId+ ` ${categoryCount} ` + category.idCategory,
        data: {
          label: category.strCategory, // Use strCategory as the label
        },
        position: { x: 0, y: 0 }, // Position each node vertically
        type: "category", // Specify node type (can be customized)
      };
    });
  }
  return [];
};

// Function to convert Meal array to nodes array
export const convertMealsToNodes = (meals?: PartialMeal[]): GraphNode[] => {
  if (meals) {
    return meals.map((meal) => {
      mealCount += 1;
      return {
        id: mealId+` ${mealCount} ` + meal.idMeal,
        data: {
          label: meal.strMeal, // Use strMeal as the label
        },
        position: { x: 0, y: 0 }, // Position each node vertically
        type: "meal", // Specify node type (can be customized)
      };
    });
  }
  return [];
};

// Function to generate  tag nodes array
export const generateTagNodes = (meal: Meal): GraphNode[] => {
  let tagNodes: GraphNode[] = [];

  meal?.strTags?.split(",").map((tag, _index) => {
      tagCount += 1;
      tagNodes.push({
        id: tagId + ` ${tagCount} ` + `${meal.idMeal}`,
        data: {
          label:tag,
        },
        position: { x: 0, y: 0 },
        type: "tag",
      });
  });
  return tagNodes;
};


// Function to generate  ingredient nodes array
export const generateIngredientNodes = (meal: Meal): GraphNode[] => {
  let ingredient: GraphNode[] = [];
  Object.keys(meal).map((key, _index) => {
    if (key.toLowerCase().includes("ingredient") && Boolean(meal[key as keyof Meal]?.trim())) {
      ingredientCount += 1;
      ingredient.push({
        id: ingredientId + ` ${ingredientCount} ` + `${meal.idMeal}`,
        data: {
          label: meal[key as keyof Meal],
        },
        position: { x: 0, y: 0 },
        type: "ingredient",
      });
    }
  });
  return ingredient;
};

// Function to generate  general nodes array
export const generateGeneralNodes = (source: string): GraphNode[] => {
  viewIngredientCount += 1;
  viewTagCount += 1;
  viewDetailCount += 1;
  return [
    {
      id: viewIngredientId + ` ${viewIngredientCount} ` + `${source}`,
      data: {
        label: "View Ingredients",
      },
      position: { x: 0, y: 0 },
      type: "view",
    },
    {
      id: viewTagId + ` ${viewTagCount} ` + `${source}`,
      data: {
        label: "View Tags",
      },
      position: { x: 0, y: 0 },
      type: "view",
    },
    {
      id: viewDetailId + ` ${viewDetailCount} ` + `${source}`,
      data: {
        label: "View Details",
      },
      position: { x: 0, y: 0 },
      type: "view",
    },
  ];
};

// Function to generate  view-meal nodes array
export const generateViewMealNodes = (source: string): GraphNode[] => {
  viewMealCount+=1;
  return [
    {
      id: viewMealId + ` ${viewMealCount} ` + `${source}`,
      data: {
        label: "View Meals",
      },
      position: { x: 0, y: 0 },
      type: "view",
    },
  ];
};

// Function to delete nodes and edges
export const deleteNodesAndEdges=(edges:Edge[],nodes:GraphNode[],value:string):{newNodes:GraphNode[],newEdges:Edge[]}=> {
  let newNodes:GraphNode[] = [];
  let newEdges:Edge[] = [];
  let nodesToBeDeleted:Set<string>=new Set();
  newEdges=edges.filter((edge)=>{
    if(edge.target.includes(value))
    {
      nodesToBeDeleted.add(edge.target);
      return false;
    }else if(nodesToBeDeleted.has(edge.source)){
      nodesToBeDeleted.add(edge.target);
      return false;
    }
    return true;
  })
  newNodes=nodes.filter((node)=>!nodesToBeDeleted.has(node.id))
  return {newNodes,newEdges};
};

// Function to generate edges
export const generateEdges = (source: string, nodes?: GraphNode[]): Edge[] => {
  if (nodes) {
    return nodes.map((node) => {
      edgeCount += 1;
      return {
        id: "edge" + edgeCount,
        source: source,
        target: node.id,
        ...edgeConfig,
      };
    });
  }
  return [];
};

// Function to delete edges and nodes
// export const deleteEdges = (source:string,edges:Edges[],nodes:GraphNode[]): {edges:Edge[],nodes:GraphNode[]} => {
//   let newEdges:Edge[] = [];
//   let newNodes:GraphNode[] =[];
//   if (edges){
//     edges.map()
// nodes.map((node) => {
//   edgeCount += 1;
//   return {
//     id: 'edge' + edgeCount,
//     source: source,
//     target: node.id,
//     ...edgeConfig
//   }
// });
//   }
//   return {edges:[],nodes:[]};
// };
