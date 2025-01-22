import React, { memo } from 'react';
import { NodeProps } from 'reactflow';
import { Filter } from 'lucide-react';
import BaseNode from '../Base/BaseNode';

function FilterNode({ data, ...props }: NodeProps) {
  return (
    <BaseNode
      data={data}
      icon={Filter}
      {...props}
    />
  );
}

export default memo(FilterNode);