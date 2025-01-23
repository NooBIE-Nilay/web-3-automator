import React from 'react';
import { Activity, Box, ArrowRightCircle } from 'lucide-react';

const nodeTypes = [
  {
    type: 'task',
    label: 'Task Node',
    icon: Activity,
    description: 'A basic task in the workflow',
  },
  {
    type: 'process',
    label: 'Process Node',
    icon: Box,
    description: 'A complex process or subprocess',
  },
  {
    type: 'action',
    label: 'Action Node',
    icon: ArrowRightCircle,
    description: 'An action or trigger in the workflow',
  },
];

export default function Sidebar() {
  const onDragStart = (event: React.DragEvent, nodeType: string) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div className="w-64 bg-white p-4 border-r border-gray-200">
      <h2 className="text-lg font-bold mb-4">Workflow Nodes</h2>
      <div className="space-y-2">
        {nodeTypes.map((node) => (
          <div
            key={node.type}
            className="bg-gray-50 p-4 rounded-md cursor-move border border-gray-200 hover:bg-gray-100 transition-colors"
            onDragStart={(event) => onDragStart(event, node.type)}
            draggable
          >
            <div className="flex items-center gap-2">
              <node.icon className="h-5 w-5 text-primary-500" />
              <div>
                <span className="font-medium">{node.label}</span>
                <p className="text-sm text-gray-500">{node.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}