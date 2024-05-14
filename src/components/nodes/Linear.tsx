import { NodeProps, Position } from "reactflow";

import { Handle } from "reactflow";
import useStore from "../../store";
import { Checkbox } from "../ui/checkbox";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

interface NodeType {
  in_features: number;
  out_features: number;
  bias?: boolean;
}

export const defaultNodeType: NodeType = {
  in_features: 0,
  out_features: 0,
  bias: true,
};

export default function Linear({ id, data }: NodeProps<NodeType>) {
  const update = useStore((state) => state.updateNodesData<NodeType>);
  return (
    <>
      <Handle type="target" position={Position.Left} />
      <div className="p-5 space-y-2 bg-white border border-black rounded-md">
        <p>Linear</p>
        <div className="flex space-x-2 items-top">
          <Label>in_features</Label>
          <Input
            value={data.in_features}
            onChange={(e) => update(id, { in_features: +e.target.value })}
          />
        </div>
        <div className="flex space-x-2 items-top">
          <Label>out_features</Label>
          <Input
            value={data.out_features}
            onChange={(e) => update(id, { out_features: +e.target.value })}
          />
        </div>
        <div className="flex space-x-2 items-top">
          <Checkbox
            id={id}
            checked={data.bias}
            onCheckedChange={(e) => update(id, { bias: !!e })}
          />
          <Label htmlFor={id}>bias</Label>
        </div>
      </div>

      <Handle type="source" position={Position.Right} />
    </>
  );
}
