import { NodeProps, Position } from "reactflow";

import { Handle } from "reactflow";
import useStore from "../../store";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
// import { Tuple, Union } from "@/types";

interface NodeType {
  // kernel_size: Union<number, Tuple<number, number>>;
  // stride: Union<number, Tuple<number, number>>;
  // padding: Union<number, Tuple<number, number>>;
  kernel_size: string;
  stride: string;
  padding: string;
}

export const defaultNodeType: NodeType = {
  kernel_size: "1",
  stride: "1",
  padding: "0",
};

export default function MaxPool2d({ id, data }: NodeProps<NodeType>) {
  const update = useStore((state) => state.updateNodesData<NodeType>);
  return (
    <>
      <Handle type="target" position={Position.Left} />
      <div className="p-5 space-y-2 bg-white border border-black rounded-md">
        <p>MaxPool2d</p>
        <div className="flex space-x-2 items-top">
          <Label>kernel_size</Label>
          <Input
            value={data.kernel_size}
            onChange={(e) => update(id, { kernel_size: e.target.value })}
          />
        </div>
        <div className="flex space-x-2 items-top">
          <Label>stride</Label>
          <Input
            value={data.stride}
            onChange={(e) => update(id, { stride: e.target.value })}
          />
        </div>
        <div className="flex space-x-2 items-top">
          <Label>padding</Label>
          <Input
            value={data.padding}
            onChange={(e) => update(id, { padding: e.target.value })}
          />
        </div>
      </div>
      <Handle type="source" position={Position.Right} />
    </>
  );
}
