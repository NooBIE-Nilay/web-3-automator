import React from 'react';
import { X, Clock, Webhook, Blocks, Timer } from 'lucide-react';
import { TriggerType, TriggerConfig } from '../../types/workflow';
import { useModalStore } from '../../stores/modalStore';
import { useWorkflowStore } from '../../stores/workflowStore';
import CronjobConfig from './triggers/CronjobConfig';
import WebhookConfig from './triggers/WebhookConfig';
import OnChainConfig from './triggers/OnChainConfig';
import IntervalConfig from './triggers/IntervalConfig';

const triggerTypes: { type: TriggerType; label: string; icon: React.ElementType; description: string }[] = [
  {
    type: 'cronjob',
    label: 'Cronjob',
    icon: Clock,
    description: 'Schedule workflow runs using cron expressions'
  },
  {
    type: 'webhook',
    label: 'Webhook',
    icon: Webhook,
    description: 'Trigger workflow via HTTP requests'
  },
  {
    type: 'onchain',
    label: 'On-Chain Event',
    icon: Blocks,
    description: 'Listen for blockchain events'
  },
  {
    type: 'interval',
    label: 'Interval',
    icon: Timer,
    description: 'Run workflow at fixed time intervals'
  }
];

const defaultParams = {
  cronjob: { schedule: '*/5 * * * *', timezone: 'UTC' },
  webhook: { method: 'POST' as const, path: '/webhook' },
  onchain: { network: 'ethereum', contract: '', event: '' },
  interval: { interval: '10s' as const }
};

export default function StartNodeModal() {
  const { isOpen, selectedNode, modalType, closeModal } = useModalStore();
  const updateNode = useWorkflowStore((state) => state.updateNode);
  const [selectedTrigger, setSelectedTrigger] = React.useState<TriggerType | null>(null);
  const [config, setConfig] = React.useState<TriggerConfig | null>(null);

  React.useEffect(() => {
    if (selectedNode?.data?.config?.trigger) {
      setSelectedTrigger(selectedNode.data.config.trigger);
      setConfig({
        type: selectedNode.data.config.trigger,
        params: selectedNode.data.config
      });
    }
  }, [selectedNode]);

  if (!isOpen || !selectedNode || modalType !== 'start') return null;

  const handleTriggerSelect = (type: TriggerType) => {
    setSelectedTrigger(type);
    setConfig({ type, params: defaultParams[type] });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (config) {
      let nodeData;
      if (config.type === 'interval') {
        nodeData = {
          label: 'Start',
          config: {
            trigger: 'interval',
            value: config.params.interval === '10s' ? '10000' :
                   config.params.interval === '30s' ? '30000' : '60000'
          }
        };
      } else {
        nodeData = {
          label: `${triggerTypes.find(t => t.type === config.type)?.label} Trigger`,
          config: {
            trigger: config.type,
            ...config.params
          }
        };
      }
      
      updateNode(selectedNode.id, nodeData);
      closeModal();
    }
  };

  const renderConfig = () => {
    if (!config) return null;

    switch (config.type) {
      case 'cronjob':
        return (
          <CronjobConfig
            params={config.params}
            onChange={(params) => setConfig({ ...config, params })}
          />
        );
      case 'webhook':
        return (
          <WebhookConfig
            params={config.params}
            onChange={(params) => setConfig({ ...config, params })}
          />
        );
      case 'onchain':
        return (
          <OnChainConfig
            params={config.params}
            onChange={(params) => setConfig({ ...config, params })}
          />
        );
      case 'interval':
        return (
          <IntervalConfig
            params={config.params}
            onChange={(params) => setConfig({ ...config, params })}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-semibold">Configure Start Trigger</h2>
          <button
            onClick={closeModal}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>
        <div className="p-4">
          {!selectedTrigger ? (
            <div className="grid grid-cols-2 gap-4">
              {triggerTypes.map((trigger) => (
                <button
                  key={trigger.type}
                  onClick={() => handleTriggerSelect(trigger.type)}
                  className="p-4 border border-gray-200 rounded-lg hover:border-primary-500 hover:shadow-md transition-all text-left"
                >
                  <trigger.icon className="h-6 w-6 text-primary-500 mb-2" />
                  <h3 className="font-medium">{trigger.label}</h3>
                  <p className="text-sm text-gray-500 mt-1">{trigger.description}</p>
                </button>
              ))}
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {renderConfig()}
              <div className="flex justify-end gap-2 pt-4">
                <button
                  type="button"
                  onClick={() => setSelectedTrigger(null)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-md hover:bg-primary-700"
                >
                  Save Trigger
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}