import { Handle, NodeProps, Position } from "reactflow";
import useStore from "../../store";
import { Checkbox } from "../ui/checkbox";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

interface NodeType {
  num_features: number;
  eps?: number;
  momentum?: number;
  affine?: boolean;
  track_running_stats?: boolean;
}

export const defaultNodeType: NodeType = {
  num_features: 0,
  eps: 1e-5,
  momentum: 0.1,
  affine: true,
  track_running_stats: true,
};

export default function BatchNorm2d({ id, data }: NodeProps<NodeType>) {
  const update = useStore((state) => state.updateNodesData<NodeType>);
  return (
    <>
      <Handle type="target" position={Position.Left} />
      <div className="p-5 space-y-2 bg-white border border-black rounded-md">
        <p>BatchNorm2d</p>
        <div className="flex space-x-2 items-top">
          <Label>num_features</Label>
          <Input
            value={data.num_features}
            type="number"
            onChange={(e) => update(id, { num_features: +e.target.value })}
          />
        </div>
        <div className="flex space-x-2 items-top">
          <Label>eps</Label>
          <Input
            value={data.eps}
            type="number"
            onChange={(e) => update(id, { eps: +e.target.value })}
          />
        </div>
        <div className="flex space-x-2 items-top">
          <Label>momentum</Label>
          <Input
            value={data.momentum}
            type="number"
            onChange={(e) => update(id, { momentum: +e.target.value })}
          />
        </div>
        <div className="flex space-x-2 items-top">
          <Checkbox
            id={id}
            checked={data.affine}
            onCheckedChange={(e) => update(id, { affine: !!e })}
          />
          <Label htmlFor={id}>affine</Label>
        </div>
        <div className="flex space-x-2 items-top">
          <Checkbox
            id={id}
            checked={data.track_running_stats}
            onCheckedChange={(e) => update(id, { track_running_stats: !!e })}
          />
          <Label htmlFor={id}>track_running_stats</Label>
        </div>
      </div>

      <Handle type="source" position={Position.Right} />
    </>
  );
}
