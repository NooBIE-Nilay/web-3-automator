import React, { memo } from 'react';
import { NodeProps } from 'reactflow';
import { Activity, Box, ArrowRightCircle } from 'lucide-react';
import BaseNode from '../Base/BaseNode';

const iconMap = {
  task: Activity,
  process: Box,
  action: ArrowRightCircle,
};

function TaskNode({ data, type = 'task', ...props }: NodeProps) {
  const Icon = iconMap[type as keyof typeof iconMap] || Activity;

  return (
    <BaseNode
      data={data}
      icon={Icon}
      {...props}
    />
  );
}

export default memo(TaskNode);