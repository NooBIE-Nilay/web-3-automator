import React, { memo } from 'react';
import { NodeProps } from 'reactflow';
import { Globe } from 'lucide-react';
import BaseNode from '../Base/BaseNode';

function HttpRequestNode({ data, ...props }: NodeProps) {
  return (
    <BaseNode
      data={data}
      icon={Globe}
      {...props}
    />
  );
}

export default memo(HttpRequestNode);