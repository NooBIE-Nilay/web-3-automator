import React, { memo } from 'react';
import { Handle, Position, NodeProps } from 'reactflow';
import { Trash2 } from 'lucide-react';
import { handleStyles } from '../../styles/nodeStyles';
import { useWorkflowStore } from '../../../../stores/workflowStore';

export interface Port {
  id: string;
  label: string;
  type: 'input' | 'output';
  position?: Position;
  style?: React.CSSProperties;
}

interface BaseNodeProps extends NodeProps {
  icon?: React.ElementType;
  inputs?: Port[];
  outputs?: Port[];
}

function BaseNode({
  data,
  id,
  icon: Icon,
  inputs = [{ id: 'default', label: '', type: 'input' }],
  outputs = [{ id: 'default', label: '', type: 'output' }],
}: BaseNodeProps) {
  const removeNode = useWorkflowStore((state) => state.removeNode);

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    removeNode(id);
  };

  const getPortPosition = (index: number, total: number) => {
    if (total === 1) return 50;
    if (total === 2) {
      return index === 0 ? 25 : 75;
    }
    const step = 100 / (total + 1);
    return (index + 1) * step;
  };

  return (
    <div className="relative flex flex-col items-center group">
      <button
        onClick={handleDelete}
        className="absolute -top-2 -right-2 p-1 bg-white rounded-full border border-gray-200 shadow-sm hover:bg-red-50 hover:border-red-300 transition-colors group z-10 opacity-0 group-hover:opacity-100"
      >
        <Trash2 className="w-4 h-4 text-gray-400 group-hover:text-red-500" />
      </button>

      {inputs.map((input, index) => (
        <div
          key={input.id}
          className="absolute top-0 -left-3 h-full flex flex-col items-center"
          style={{
            top: `${getPortPosition(index, inputs.length)}%`,
            transform: 'translateY(-50%)',
          }}
        >
          {input.label && (
            <span className="absolute top-4 text-[8px] text-gray-400 whitespace-nowrap">
              {input.label}
            </span>
          )}
          <Handle
            id={input.id}
            type="target"
            position={Position.Left}
            className={handleStyles.target}
            style={input.style}
            isConnectable={true}
          />
        </div>
      ))}

      <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-white border border-gray-200 shadow-sm">
        {Icon && <Icon className="h-6 w-6 text-primary-500" />}
      </div>

      <div className="mt-1 text-[10px] text-gray-500 text-center max-w-[80px] truncate">
        {data.label}
      </div>

      {outputs.map((output, index) => (
        <div
          key={output.id}
          className="absolute top-0 -right-3 h-full flex flex-col items-center"
          style={{
            top: `${getPortPosition(index, outputs.length)}%`,
            transform: 'translateY(-50%)',
          }}
        >
          {output.label && (
            <span className="absolute top-4 text-[8px] text-gray-400 whitespace-nowrap">
              {output.label}
            </span>
          )}
          <Handle
            id={output.id}
            type="source"
            position={Position.Right}
            className={handleStyles.source}
            style={output.style}
            isConnectable={true}
          />
        </div>
      ))}
    </div>
  );
}

export default memo(BaseNode);
