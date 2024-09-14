import { Position, NodeProps, Handle } from "@xyflow/react";
import { memo } from "react";
import Typography from "../../../shared/Tyography";
import { CustomNodeProps } from "../../../../types/node";
import arrowSvg from "../../../../assets/arrow-forward-thick-svgrepo-com.svg";
const ViewNode = ({
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
      <div className="px-4 py-1 border-grey-300 shadow-lg  bg-white border-solid border-[0.125rem] min-w-28 max-w-80 flex gap-2 items-center rounded-2xl">
        {/* <div className="p-1.5 rounded-md bg-purple-600"> */}
        {/* <IconSalad className="w-4 h-4 !text-white"></IconSalad> */}
        <img src={arrowSvg} className="w-4 h-4"></img>
        {/* </div> */}
        <Typography variant={"body1"} className="text-text-secondary">{data?.label as string}</Typography>
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

ViewNode.displayName = "ViewNode";

export default memo(ViewNode);
