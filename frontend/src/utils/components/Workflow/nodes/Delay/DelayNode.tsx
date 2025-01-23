import React, { memo } from 'react';
import { NodeProps } from 'reactflow';
import { TimerReset } from 'lucide-react';
import BaseNode from '../Base/BaseNode';

function DelayNode({ data, ...props }: NodeProps) {
  return (
    <BaseNode
      data={data}
      icon={TimerReset}
      {...props}
    />
  );
}

export default memo(DelayNode);