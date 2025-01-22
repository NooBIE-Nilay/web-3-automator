import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useModalStore } from '../../../../stores/modalStore';
import { useWorkflowStore } from '../../../../stores/workflowStore';

interface TaskConfig {
  description: string;
  timeout: number;
  retries: number;
  errorHandling: 'continue' | 'stop' | 'retry';
}

export default function TaskModal() {
  const { isOpen, selectedNode, modalType, closeModal } = useModalStore();
  const updateNode = useWorkflowStore((state) => state.updateNode);

  const [config, setConfig] = useState<TaskConfig>({
    description: '',
    timeout: 30,
    retries: 3,
    errorHandling: 'retry'
  });

  if (!isOpen || !selectedNode || modalType !== 'task') return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateNode(selectedNode.id, {
      ...selectedNode.data,
      taskConfig: config,
    });
    closeModal();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-[#2A2A2A] text-white rounded-lg shadow-xl w-full max-w-md">
        <div className="flex justify-between items-center p-4 border-b border-gray-600">
          <h2 className="text-lg font-semibold">Configure Task</h2>
          <button
            onClick={closeModal}
            className="p-1 hover:bg-gray-700 rounded-full transition-colors"
          >
            <X className="h-5 w-5 text-gray-400" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Description
            </label>
            <textarea
              value={config.description}
              onChange={(e) => setConfig(prev => ({ ...prev, description: e.target.value }))}
              className="w-full bg-[#3A3A3A] border-gray-600 rounded-md p-2 text-white"
              rows={3}
              placeholder="Describe what this task does..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Timeout (seconds)
            </label>
            <input
              type="number"
              value={config.timeout}
              onChange={(e) => setConfig(prev => ({ ...prev, timeout: parseInt(e.target.value) }))}
              className="w-full bg-[#3A3A3A] border-gray-600 rounded-md p-2 text-white"
              min="1"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Retry Attempts
            </label>
            <input
              type="number"
              value={config.retries}
              onChange={(e) => setConfig(prev => ({ ...prev, retries: parseInt(e.target.value) }))}
              className="w-full bg-[#3A3A3A] border-gray-600 rounded-md p-2 text-white"
              min="0"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Error Handling
            </label>
            <select
              value={config.errorHandling}
              onChange={(e) => setConfig(prev => ({ ...prev, errorHandling: e.target.value as TaskConfig['errorHandling'] }))}
              className="w-full bg-[#3A3A3A] border-gray-600 rounded-md p-2 text-white"
            >
              <option value="retry">Retry on Error</option>
              <option value="continue">Continue on Error</option>
              <option value="stop">Stop on Error</option>
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
              Save Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}