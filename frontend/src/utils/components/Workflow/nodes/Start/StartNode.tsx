import React, { memo } from 'react';
import { Handle, Position, NodeProps } from 'reactflow';
import { Clock, Webhook, Blocks } from 'lucide-react';
import { handleStyles, nodeStyles } from '../../styles/nodeStyles';
import { TriggerType } from '../../../../types/workflow';

const iconMap: Record<TriggerType, React.ElementType> = {
  cronjob: Clock,
  webhook: Webhook,
  onchain: Blocks,
};

function StartNode({ data }: NodeProps) {
  const trigger = data.trigger;
  const Icon = trigger ? iconMap[trigger.type] : Clock;

  return (
    <div className="flex flex-col items-center">
      <div className="relative">
        <Handle
          type="source"
          position={Position.Right}
          className={handleStyles.source}
        />
        <div className={nodeStyles.startNode}>
          <Icon className="h-6 w-6 text-primary-500" />
        </div>
      </div>
      <div className="mt-1 text-xs text-gray-600 text-center max-w-[100px] truncate">
        {data.label || 'Start'}
      </div>
    </div>
  );
}

export default memo(StartNode);
