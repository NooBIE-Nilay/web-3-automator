import React, { memo } from 'react';
import { Handle, Position, NodeProps } from 'reactflow';
import { Plus } from 'lucide-react';
import { handleStyles, nodeStyles } from '../../styles/nodeStyles';
import { useSidebarStore } from '../../../../stores/sidebarStore';

function ReplaceNode({ id }: NodeProps) {
  const openSidebar = useSidebarStore((state) => state.openSidebar);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    openSidebar(id);
  };

  return (
    <div className="relative">
      <Handle 
        type="target" 
        position={Position.Left}
        className={handleStyles.target}
        isConnectable={true}
      />
      <button 
        className={`${nodeStyles.addButton} border-secondary-200 hover:border-secondary-400 hover:bg-secondary-50`}
        onClick={handleClick}
      >
        <Plus className="h-6 w-6 text-secondary-500" />
      </button>
      <Handle 
        type="source" 
        position={Position.Right}
        className={handleStyles.source}
        isConnectable={true}
      />
    </div>
  );
}

export default memo(ReplaceNode);