import { Position, NodeProps, Handle } from "@xyflow/react";
import { memo } from "react";
import Typography from "../../../shared/Tyography";
import { CustomNodeProps } from "../../../../types/node";
import mealSvg from "../../../../assets/meal-svgrepo-com.svg";
const MealNode = ({
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
      <div className="p-3 border-grey-300 shadow-lg bg-white border-solid border-[0.125rem] min-w-28 max-w-80 flex gap-2 items-center rounded-md hover:!shadow-cyan-200/80 hover:bg-cyan-100/50 hover:!border-cyan-50/80  transition-all ease-in-out duration-500">
        <div className="p-1.5 rounded-md bg-cyan-600">
          <img src={mealSvg} className="w-4 h-4" alt="" />
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

MealNode.displayName = "MealNode";

export default memo(MealNode);
