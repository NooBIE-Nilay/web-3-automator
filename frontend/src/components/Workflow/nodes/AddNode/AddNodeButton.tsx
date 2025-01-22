import React, { memo } from 'react';
import { Handle, Position, NodeProps } from 'reactflow';
import { Plus } from 'lucide-react';
import { handleStyles, nodeStyles } from '../../styles/nodeStyles';
import { useSidebarStore } from '../../../../stores/sidebarStore';

function AddNodeButton({ id }: NodeProps) {
  const openSidebar = useSidebarStore((state) => state.openSidebar);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    openSidebar(id);
  };

  return (
    <div className="relative">
      <Handle 
        type="target" 
        position={Position.Top} 
        className={handleStyles.target}
        isConnectable={true}
      />
      <button 
        className={nodeStyles.addButton}
        onClick={handleClick}
      >
        <Plus className="h-6 w-6 text-primary-500" />
      </button>
    </div>
  );
}

export default memo(AddNodeButton);