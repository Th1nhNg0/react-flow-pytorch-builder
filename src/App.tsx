import { Toaster } from "@/components/ui/toaster";
import SyntaxHighlighter from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";
import ReactFlow from "reactflow";
import { useShallow } from "zustand/react/shallow";

import "reactflow/dist/style.css";

import { Loader2 } from "lucide-react";
import { useCallback, useState } from "react";
import DevTools from "./components/Devtools";
import { nodeDefaultProps, nodeTypes } from "./components/nodes";
import { Button } from "./components/ui/button";
import { useToast } from "./components/ui/use-toast";
import useStore from "./store";

let id = 0;
const getId = () => `dndnode_${id++}`;

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
  setNodes: state.setNodes,
});

function Flow() {
  const { toast } = useToast();
  const { nodes, edges, onNodesChange, onEdgesChange, onConnect, setNodes } =
    useStore(useShallow(selector));
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [code, setCode] = useState("");
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const type = event.dataTransfer.getData("application/reactflow");

      // check if the dropped element is valid
      if (typeof type === "undefined" || !type) {
        return;
      }

      // reactFlowInstance.project was renamed to reactFlowInstance.screenToFlowPosition
      // and you don't need to subtract the reactFlowBounds.left/top anymore
      // details: https://reactflow.dev/whats-new/2023-11-10
      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });
      const newNode = {
        id: getId(),
        type,
        position,
        data: nodeDefaultProps[type],
      };

      setNodes([...nodes, newNode]);
    },
    [nodes, reactFlowInstance, setNodes]
  );

  function onFetch() {
    let start_node = nodes.find((node) => node.id === "start");
    const layers = [];
    // eslint-disable-next-line no-constant-condition
    while (true) {
      let shouldStop = true;
      for (const edge of edges) {
        if (edge.source === start_node.id) {
          const target = nodes.find((node) => node.id === edge.target);
          layers.push(target);
          start_node = target;
          shouldStop = false;
          break;
        }
      }
      if (shouldStop) break;
    }
    const payload = layers.map((e) => ({
      torch_layer: e.type,
      kwargs: e.data,
    }));
    setIsLoading(true);
    fetch("https://55f5-171-250-165-82.ngrok-free.app/api/v1/build_model", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ layers: payload, input_data: [] }),
    })
      .then((res) => res.json())
      .then((res) => setCode(res.code_block))
      .then(() =>
        toast({
          title: "Success",
        })
      )
      .catch((e) =>
        toast({
          title: "Error",
          description: e.message,
          variant: "destructive",
        })
      )
      .finally(() => setIsLoading(false));
  }

  return (
    <div className="flex w-screen h-screen">
      <div className="p-5 bg-white border-r shadow">
        <p>Nodes</p>
        <div>
          {Object.keys(nodeTypes)
            .filter((e) => e != "Start")
            .map((type) => (
              <div
                key={type}
                className="p-2 my-2 bg-gray-200 cursor-pointer"
                draggable
                onDragStart={(event) => onDragStart(event, type)}
              >
                {type}
              </div>
            ))}
        </div>
      </div>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
        onInit={setReactFlowInstance}
        nodeTypes={nodeTypes}
        onDragOver={onDragOver}
        onDrop={onDrop}
      >
        <DevTools />
      </ReactFlow>
      <div className="flex flex-col w-full max-w-xs p-5 bg-white border-l shadow">
        <p>Python Code</p>
        <div className="flex-1 overflow-auto">
          <SyntaxHighlighter language="python" style={docco}>
            {code}
          </SyntaxHighlighter>
        </div>
        <Button onClick={onFetch} disabled={isLoading}>
          {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
          Send request
        </Button>
      </div>
      <Toaster />
    </div>
  );
}

export default Flow;
