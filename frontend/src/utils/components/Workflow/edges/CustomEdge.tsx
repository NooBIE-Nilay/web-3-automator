import React, { memo, useState, useMemo } from 'react';
import { EdgeProps, getSmoothStepPath } from 'reactflow';
import { X, Plus } from 'lucide-react';
import { useWorkflowStore } from '../../../stores/workflowStore';
import { useSidebarStore } from '../../../stores/sidebarStore';

function CustomEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  markerEnd,
}: EdgeProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [edgePath, labelX, labelY] = getSmoothStepPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  const removeEdge = useWorkflowStore((state) => state.removeEdge);
  const openSidebar = useSidebarStore((state) => state.openSidebar);

  // Calculate the angle between source and target points
  const angle = useMemo(() => {
    const dx = targetX - sourceX;
    const dy = targetY - sourceY;
    return Math.atan2(dy, dx) * (180 / Math.PI);
  }, [sourceX, sourceY, targetX, targetY]);

  // Determine if the line is more vertical than horizontal
  const isVertical = Math.abs(angle) > 45 && Math.abs(angle) < 135;

  const onEdgeClick = (evt: React.MouseEvent<HTMLButtonElement>, id: string) => {
    evt.stopPropagation();
    removeEdge(id);
  };

  const handleInsertClick = (evt: React.MouseEvent<HTMLButtonElement>) => {
    evt.stopPropagation();
    openSidebar(id);
  };

  return (
    <g
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group"
    >
      <path
        id={id}
        style={style}
        className="react-flow__edge-path stroke-gray-300"
        d={edgePath}
        markerEnd={markerEnd}
      />
      {isHovered && (
        <foreignObject
          width={isVertical ? 20 : 52}
          height={isVertical ? 52 : 20}
          x={labelX - (isVertical ? 10 : 26)}
          y={labelY - (isVertical ? 26 : 10)}
          className="overflow-visible pointer-events-none"
          requiredExtensions="http://www.w3.org/1999/xhtml"
        >
          <div className={`flex ${isVertical ? 'flex-col' : ''} gap-1 pointer-events-auto`}>
            <button
              className="flex items-center justify-center w-5 h-5 rounded-full bg-white border border-gray-300 hover:bg-red-50 hover:border-red-300 transition-colors group shadow-sm"
              onClick={(event) => onEdgeClick(event, id)}
            >
              <X className="w-3 h-3 text-gray-500 group-hover:text-red-500" />
            </button>
            <button
              className="flex items-center justify-center w-5 h-5 rounded-full bg-white border border-gray-300 hover:bg-primary-50 hover:border-primary-300 transition-colors group shadow-sm"
              onClick={handleInsertClick}
            >
              <Plus className="w-3 h-3 text-gray-500 group-hover:text-primary-500" />
            </button>
          </div>
        </foreignObject>
      )}
    </g>
  );
}

export default memo(CustomEdge);