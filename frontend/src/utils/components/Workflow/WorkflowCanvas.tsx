import React, { useCallback, useRef } from "react";
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  Connection,
  addEdge,
  useNodesState,
  useEdgesState,
  ReactFlowInstance,
  Node,
} from "reactflow";
import "reactflow/dist/style.css";
import { useWorkflowStore } from "../../stores/workflowStore";
import { useModalStore } from "../../stores/modalStore";
import { nodeTypes } from "./nodes";
import NodeSidebar from "./NodeSidebar";
import StartNodeModal from "./StartNodeModal";
import ExecuteFlowButton from "./ExecuteFlowButton";
import CustomEdge from "./edges/CustomEdge";

// Import all modals
import FilterModal from "./nodes/Filter/FilterModal";
import CodeModal from "./nodes/Code/CodeModal";
import ConditionalModal from "./nodes/Conditional/ConditionalModal";
import DelayModal from "./nodes/Delay/DelayModal";
import WebhookModal from "./nodes/Webhook/WebhookModal";
import HttpRequestModal from "./nodes/HttpRequest/HttpRequestModal";
import EmailModal from "./nodes/Email/EmailModal";
import PrivateKeyModal from "./nodes/PrivateKey/PrivateKeyModal";
import TaskModal from "./nodes/Task/TaskModal";
import LoopModal from "./nodes/Loop/LoopModal";
import EventListenerModal from "./nodes/EventListener/EventListenerModal";
import SelectDataModal from "./nodes/SelectData/SelectDataModal";

const edgeTypes = {
  smoothstep: CustomEdge,
};

// Map node types to their corresponding modal types
const nodeToModalType = {
  start: "start",
  filter: "filter",
  code: "code",
  conditional: "conditional",
  delay: "delay",
  webhook: "webhook",
  http: "http",
  email: "email",
  privatekey: "privatekey",
  eventListener: "eventListener",
  task: "task",
  loop: "loop",
  selectData: "selectData",
} as const;

export default function WorkflowCanvas() {
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const store = useWorkflowStore();
  const openModal = useModalStore((state) => state.openModal);
  const [nodes, setNodes, onNodesChange] = useNodesState(store.nodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(store.edges);

  console.log(nodes);

  const [reactFlowInstance, setReactFlowInstance] =
    React.useState<ReactFlowInstance | null>(null);

  const onConnect = useCallback(
    (connection: Connection) => {
      const edge = { ...connection, type: "smoothstep" };
      setEdges((eds) => addEdge(edge, eds));
    },
    [setEdges]
  );

  const onDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();

      if (!reactFlowWrapper.current || !reactFlowInstance) {
        return;
      }

      const type = event.dataTransfer.getData("application/reactflow");
      if (!type) return;

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });

      const newNode = {
        id: `${type}-${Date.now()}`,
        type,
        position,
        data: {
          label: type === "conditional" ? "If Condition" : `New ${type}`,
          description:
            type === "conditional"
              ? "Define your condition"
              : `Description for ${type}`,
          condition: type === "conditional" ? "value > 0" : undefined,
        },
      };

      store.addNodeWithButton(newNode);
    },
    [reactFlowInstance, store]
  );

  const onNodeClick = (_: React.MouseEvent, node: Node) => {
    if (node.type === "replace") return;

    const modalType =
      nodeToModalType[node.type as keyof typeof nodeToModalType];
    if (modalType) {
      openModal(node, modalType);
    } else {
      openModal(node, "edit");
    }
  };

  React.useEffect(() => {
    setNodes(store.nodes);
    setEdges(store.edges);
  }, [store.nodes, store.edges, setNodes, setEdges]);

  return (
    <div ref={reactFlowWrapper} className="h-full w-full bg-gray-50">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onInit={setReactFlowInstance}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onNodeClick={onNodeClick}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        defaultEdgeOptions={{
          type: "smoothstep",
        }}
        fitView
      >
        <Background gap={12} size={1} color="#94a3b8" />
        <Controls />
        <MiniMap />
        <ExecuteFlowButton />
      </ReactFlow>
      <NodeSidebar />
      <StartNodeModal />
      <FilterModal />
      <CodeModal />
      <ConditionalModal />
      <DelayModal />
      <WebhookModal />
      <HttpRequestModal />
      <EmailModal />
      <PrivateKeyModal />
      <EventListenerModal />
      <TaskModal />
      <LoopModal />
      <SelectDataModal />
    </div>
  );
}
