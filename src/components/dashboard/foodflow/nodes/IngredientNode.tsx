import { Position, NodeProps, Handle } from "@xyflow/react";
import { memo } from "react";
import Typography from "../../../shared/Tyography";
import { CustomNodeProps } from "../../../../types/node";
import ingredientSvg from "../../../../assets/ingredients-for-cooking-svgrepo-com.svg";
const IngredientNode = ({
  data,
  isConnectable,
  targetPosition = Position.Left,
  sourcePosition = Position.Right,
}: NodeProps<CustomNodeProps>) => {
  return (
    <>
      <Handle
        type="target"
        position={targetPosition}
        isConnectable={isConnectable}
        className="opacity-0"
      />
      <div className="p-3 border-grey-300 shadow-lg  bg-white border-solid border-[0.125rem] min-w-28 max-w-80 flex gap-2 items-center rounded-md hover:!shadow-purple-200 hover:bg-purple-200 hover:!border-none transition-all ease-in-out duration-500">
        <div className="p-1.5 rounded-md bg-purple-600">
        {/* <IconSalad className="w-4 h-4 !text-white"></IconSalad> */}
        <img src={ingredientSvg} className="w-4 h-4"></img>
        </div>
        <Typography variant={"h6"} fontWeight={500}>{data?.label as string}</Typography>
      </div>
      <Handle
        type="source"
        className="opacity-0"
        position={sourcePosition}
        isConnectable={isConnectable}
      />
    </>
  );
};

IngredientNode.displayName = "IngredientNode";

export default memo(IngredientNode);
