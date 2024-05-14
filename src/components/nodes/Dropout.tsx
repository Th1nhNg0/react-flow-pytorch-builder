import { NodeProps, Position } from "reactflow";

import { Handle } from "reactflow";
import useStore from "../../store";
import { Checkbox } from "../ui/checkbox";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

interface NodeType {
  p: number;
  inplace?: boolean;
}

export const defaultNodeType: NodeType = {
  p: 0.5,
  inplace: false,
};

export default function Dropout({ id, data }: NodeProps<NodeType>) {
  const update = useStore((state) => state.updateNodesData<NodeType>);
  return (
    <>
      <Handle type="target" position={Position.Left} />
      <div className="p-5 space-y-2 bg-white border border-black rounded-md">
        <p>Dropout</p>
        <div className="flex space-x-2 items-top">
          <Label>p</Label>
          <Input
            value={data.p}
            onChange={(e) => update(id, { p: +e.target.value })}
          />
        </div>

        <div className="flex space-x-2 items-top">
          <Checkbox
            id={id}
            checked={data.inplace}
            onCheckedChange={(e) => update(id, { inplace: !!e })}
          />
          <Label htmlFor={id}>inplace</Label>
        </div>
      </div>

      <Handle type="source" position={Position.Right} />
    </>
  );
}
