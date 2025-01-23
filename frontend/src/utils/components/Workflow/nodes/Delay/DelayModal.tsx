import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useModalStore } from '../../../../stores/modalStore';
import { useWorkflowStore } from '../../../../stores/workflowStore';

interface DelayConfig {
  resumeType: 'after' | 'at';
  amount: number;
  unit: string;
}

const timeUnits = [
  'Seconds',
  'Minutes',
  'Hours',
  'Days'
];

export default function DelayModal() {
  const { isOpen, selectedNode, modalType, closeModal } = useModalStore();
  const updateNode = useWorkflowStore((state) => state.updateNode);

  const [config, setConfig] = useState<DelayConfig>({
    resumeType: 'after',
    amount: 5,
    unit: 'Seconds'
  });

  if (!isOpen || !selectedNode || modalType !== 'delay') return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateNode(selectedNode.id, {
      ...selectedNode.data,
      delayConfig: config,
    });
    closeModal();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-[#2A2A2A] text-white rounded-lg shadow-xl w-full max-w-md">
        <div className="flex justify-between items-center p-4 border-b border-gray-600">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-semibold">Configure Time Delay</h2>
          </div>
          <div className="flex items-center gap-4">
            <button
              type="button"
              className="px-3 py-1 text-sm bg-red-500 hover:bg-red-600 rounded-md"
            >
              Test step
            </button>
            <button
              onClick={closeModal}
              className="p-1 hover:bg-gray-700 rounded-full transition-colors"
            >
              <X className="h-5 w-5 text-gray-400" />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-4 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Resume
            </label>
            <select
              value={config.resumeType}
              onChange={(e) => setConfig(prev => ({ ...prev, resumeType: e.target.value as 'after' | 'at' }))}
              className="w-full bg-[#3A3A3A] border-gray-600 rounded-md p-2 text-white"
            >
              <option value="after">After Time Interval</option>
              <option value="at">At Specific Time</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Wait Amount
            </label>
            <input
              type="number"
              value={config.amount}
              onChange={(e) => setConfig(prev => ({ ...prev, amount: parseFloat(e.target.value) }))}
              step="0.01"
              min="0"
              className="w-full bg-[#3A3A3A] border-gray-600 rounded-md p-2 text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Wait Unit
            </label>
            <select
              value={config.unit}
              onChange={(e) => setConfig(prev => ({ ...prev, unit: e.target.value }))}
              className="w-full bg-[#3A3A3A] border-gray-600 rounded-md p-2 text-white"
            >
              {timeUnits.map(unit => (
                <option key={unit} value={unit}>{unit}</option>
              ))}
            </select>
          </div>

          <div className="flex justify-end gap-2 pt-4 border-t border-gray-600">
            <button
              type="button"
              onClick={closeModal}
              className="px-4 py-2 text-sm font-medium text-gray-300 bg-transparent border border-gray-600 rounded-md hover:bg-gray-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-md hover:bg-primary-700"
            >
              Save Delay
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}