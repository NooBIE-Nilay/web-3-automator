import React, { memo } from 'react';
import { NodeProps } from 'reactflow';
import { Code } from 'lucide-react';
import BaseNode from '../Base/BaseNode';

function CodeNode({ data, ...props }: NodeProps) {
  return (
    <BaseNode
      data={data}
      icon={Code}
      {...props}
    />
  );
}

export default memo(CodeNode);