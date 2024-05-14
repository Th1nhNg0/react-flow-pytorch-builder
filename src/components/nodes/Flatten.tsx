import { NodeProps, Position } from "reactflow";

import useStore from "../../store";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

interface NodeType {
  start_dim?: number;
  end_dim?: number;
}

import { Handle } from "reactflow";
export const defaultNodeType: NodeType = {
  start_dim: 1,
  end_dim: -1,
};

export default function Flatten({ id, data }: NodeProps<NodeType>) {
  const update = useStore((state) => state.updateNodesData<NodeType>);
  return (
    <>
      <Handle type="target" position={Position.Left} />
      <div className="p-5 space-y-2 bg-white border border-black rounded-md">
        <p>Flatten</p>
        <div className="flex space-x-2 items-top">
          <Label>start_dim</Label>
          <Input
            value={data.start_dim}
            onChange={(e) => update(id, { start_dim: +e.target.value })}
          />
        </div>
        <div className="flex space-x-2 items-top">
          <Label>end_dim</Label>
          <Input
            value={data.end_dim}
            onChange={(e) => update(id, { end_dim: +e.target.value })}
          />
        </div>
      </div>
      <Handle type="source" position={Position.Right} />
    </>
  );
}
