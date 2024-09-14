import { Node as GraphNode } from "@xyflow/react";
// import { TablerIconsProps } from "@tabler/icons-react";
export type CustomNodeProps = GraphNode<
  {
   label:string
  },
  'category'|'explore'|'meal'|"view"|"ingredient"|"tag"
>;