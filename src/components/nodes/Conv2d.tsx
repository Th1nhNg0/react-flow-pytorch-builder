import { Input } from "@/components/ui/input";
import { Handle, NodeProps, Position } from "reactflow";

import useStore from "../../store";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";

type Union<T, U> = T | U;

interface NodeType {
  in_channels: number;
  out_channels: number;
  kernel_size: number;
  stride?: number;
  padding?: Union<number, string>;
  bias?: boolean;
}

export const defaultNodeType: NodeType = {
  in_channels: 0,
  out_channels: 0,
  kernel_size: 0,
  stride: 1,
  padding: 0,
  bias: true,
};

export default function Conv2d({ id, data }: NodeProps<NodeType>) {
  const update = useStore((state) => state.updateNodesData<NodeType>);
  return (
    <>
      <Handle type="target" position={Position.Left} />
      <div className="p-5 space-y-2 bg-white border border-black rounded-md">
        <p>Conv2d</p>
        <div>
          <Label>in_channels</Label>
          <Input
            name="in_channels"
            type="number"
            value={data.in_channels}
            onChange={(e) => update(id, { in_channels: +e.target.value })}
          />
        </div>
        <div>
          <Label>out_channels</Label>
          <Input
            name="out_channels"
            type="number"
            value={data.out_channels}
            onChange={(e) => update(id, { out_channels: +e.target.value })}
          />
        </div>
        <div>
          <Label>kernel_size</Label>
          <Input
            name="kernel_size"
            type="number"
            value={data.kernel_size}
            onChange={(e) => update(id, { kernel_size: +e.target.value })}
          />
        </div>
        <div>
          <Label>stride</Label>
          <Input
            name="stride"
            type="number"
            value={data.stride}
            onChange={(e) => update(id, { stride: +e.target.value })}
          />
        </div>
        <div>
          <Label>padding</Label>
          <Input
            name="padding"
            type="text"
            value={data.padding}
            onChange={(e) => update(id, { padding: e.target.value })}
          />
        </div>
        <div className="flex space-x-2 items-top">
          <Checkbox
            name="bias"
            id={`${id}_bias`}
            checked={data.bias}
            onCheckedChange={(e) => update(id, { bias: !!e })}
          />
          <Label htmlFor={`${id}_bias`}>bias</Label>
        </div>
      </div>
      <Handle type="source" position={Position.Right} />
    </>
  );
}
