import React, { memo } from 'react';
import { Position, NodeProps } from 'reactflow';
import { RefreshCw } from 'lucide-react';
import BaseNode, { Port } from '../Base/BaseNode';

const inputs: Port[] = [
  { id: 'input', label: 'Input', type: 'input' }
];

const outputs: Port[] = [
  { 
    id: 'done', 
    label: 'Done', 
    type: 'output',
    style: { backgroundColor: '#22c55e' }
  },
  { 
    id: 'loop', 
    label: 'Loop', 
    type: 'output',
    style: { backgroundColor: '#6366f1' }
  }
];

function LoopNode({ data, ...props }: NodeProps) {
  return (
    <BaseNode
      data={data}
      icon={RefreshCw}
      inputs={inputs}
      outputs={outputs}
      {...props}
    />
  );
}

export default memo(LoopNode);