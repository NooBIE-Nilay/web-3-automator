import React, { memo } from 'react';
import { NodeProps } from 'reactflow';
import { Mail } from 'lucide-react';
import BaseNode from '../Base/BaseNode';

function EmailNode({ data, ...props }: NodeProps) {
  return (
    <BaseNode
      data={data}
      icon={Mail}
      {...props}
    />
  );
}

export default memo(EmailNode);