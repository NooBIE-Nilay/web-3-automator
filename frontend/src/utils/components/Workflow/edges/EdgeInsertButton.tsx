import React from 'react';
import { Plus } from 'lucide-react';
import { useSidebarStore } from '../../../stores/sidebarStore';

interface EdgeInsertButtonProps {
  edgeId: string;
}

export default function EdgeInsertButton({ edgeId }: EdgeInsertButtonProps) {
  const openSidebar = useSidebarStore((state) => state.openSidebar);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    openSidebar(edgeId);
  };

  return (
    <button
      className="flex items-center justify-center w-5 h-5 rounded-full bg-white border border-gray-300 hover:bg-primary-50 hover:border-primary-300 transition-colors group"
      onClick={handleClick}
    >
      <Plus className="w-3 h-3 text-gray-500 group-hover:text-primary-500" />
    </button>
  );
}