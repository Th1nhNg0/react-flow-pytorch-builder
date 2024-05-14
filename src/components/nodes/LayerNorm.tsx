import { NodeProps, Position } from "reactflow";

import { Handle } from "reactflow";
import useStore from "../../store";
import { Checkbox } from "../ui/checkbox";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

interface NodeType {
  normalized_shape: string;
  //   normalized_shape: Union<number, List<number>>;
  eps?: number;
  elementwise_affine?: boolean;
  bias?: boolean;
}

export const defaultNodeType: NodeType = {
  normalized_shape: "1",
  eps: 1e-5,
  elementwise_affine: true,
  bias: true,
};

export default function LayerNorm({ id, data }: NodeProps<NodeType>) {
  const update = useStore((state) => state.updateNodesData<NodeType>);
  return (
    <>
      <Handle type="target" position={Position.Left} />
      <div className="p-5 space-y-2 bg-white border border-black rounded-md">
        <p>LayerNorm</p>
        <div className="flex space-x-2 items-top">
          <Label>normalized_shape</Label>
          <Input
            value={data.normalized_shape}
            onChange={(e) => update(id, { normalized_shape: e.target.value })}
          />
        </div>
        <div className="flex space-x-2 items-top">
          <Label>normalized_shape</Label>
          <Input
            value={data.eps}
            type="number"
            onChange={(e) => update(id, { eps: +e.target.value })}
          />
        </div>
        <div className="flex space-x-2 items-top">
          <Checkbox
            id={id}
            checked={data.elementwise_affine}
            onCheckedChange={(e) => update(id, { elementwise_affine: !!e })}
          />
          <Label htmlFor={id}>elementwise_affine</Label>
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
