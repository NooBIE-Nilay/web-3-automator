import React, { memo } from 'react';
import { NodeProps } from 'reactflow';
import { Webhook } from 'lucide-react';
import BaseNode from '../Base/BaseNode';

function WebhookNode({ data, ...props }: NodeProps) {
  return (
    <BaseNode
      data={data}
      icon={Webhook}
      {...props}
    />
  );
}

export default memo(WebhookNode);