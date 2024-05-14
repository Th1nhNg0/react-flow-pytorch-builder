import { Handle, Position } from "reactflow";

export default function Start() {
  return (
    <>
      <div className="p-5 space-y-2 text-white bg-green-500 border border-black rounded-full">
        <p>Start</p>
      </div>
      <Handle type="source" position={Position.Right} />
    </>
  );
}
