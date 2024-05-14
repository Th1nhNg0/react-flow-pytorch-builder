import { NodeProps, Position } from "reactflow";

import { Handle } from "reactflow";
import useStore from "../../store";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";

interface NodeType {
  inplace?: boolean;
}

export const defaultNodeType: NodeType = {
  inplace: false,
};

export default function Relu({ id, data }: NodeProps<NodeType>) {
  const update = useStore((state) => state.updateNodesData<NodeType>);
  return (
    <>
      <Handle type="target" position={Position.Left} />
      <div className="p-5 space-y-2 bg-white border border-black rounded-md">
        <p>Relu</p>
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
