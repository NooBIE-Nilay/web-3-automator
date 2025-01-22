import React, { memo } from 'react';
import { Position, NodeProps } from 'reactflow';
import { GitBranch } from 'lucide-react';
import BaseNode, { Port } from '../Base/BaseNode';

const inputs: Port[] = [
  { id: 'input', label: 'Input', type: 'input' }
];

const outputs: Port[] = [
  { 
    id: 'true', 
    label: 'True', 
    type: 'output',
    style: { backgroundColor: '#22c55e' }
  },
  { 
    id: 'false', 
    label: 'False', 
    type: 'output',
    style: { backgroundColor: '#ef4444' }
  }
];

function ConditionalNode({ data, ...props }: NodeProps) {
  return (
    <BaseNode
      data={data}
      icon={GitBranch}
      inputs={inputs}
      outputs={outputs}
      {...props}
    />
  );
}

export default memo(ConditionalNode);