import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useModalStore } from '../../../../stores/modalStore';
import { useWorkflowStore } from '../../../../stores/workflowStore';

interface LoopConfig {
  type: 'collection' | 'count' | 'condition';
  collection?: string;
  count?: number;
  condition?: string;
}

export default function LoopModal() {
  const { isOpen, selectedNode, modalType, closeModal } = useModalStore();
  const updateNode = useWorkflowStore((state) => state.updateNode);

  const [config, setConfig] = useState<LoopConfig>({
    type: 'collection',
    collection: '$.items'
  });

  if (!isOpen || !selectedNode || modalType !== 'loop') return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateNode(selectedNode.id, {
      ...selectedNode.data,
      loopConfig: config,
    });
    closeModal();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-[#2A2A2A] text-white rounded-lg shadow-xl w-full max-w-md">
        <div className="flex justify-between items-center p-4 border-b border-gray-600">
          <h2 className="text-lg font-semibold">Configure Loop</h2>
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
              Loop Type
            </label>
            <select
              value={config.type}
              onChange={(e) => setConfig(prev => ({ ...prev, type: e.target.value as LoopConfig['type'] }))}
              className="w-full bg-[#3A3A3A] border-gray-600 rounded-md p-2 text-white"
            >
              <option value="collection">For Each Item in Collection</option>
              <option value="count">Fixed Number of Times</option>
              <option value="condition">While Condition is True</option>
            </select>
          </div>

          {config.type === 'collection' && (
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Collection Path
              </label>
              <input
                type="text"
                value={config.collection}
                onChange={(e) => setConfig(prev => ({ ...prev, collection: e.target.value }))}
                className="w-full bg-[#3A3A3A] border-gray-600 rounded-md p-2 text-white"
                placeholder="$.items"
              />
            </div>
          )}

          {config.type === 'count' && (
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Number of Iterations
              </label>
              <input
                type="number"
                value={config.count}
                onChange={(e) => setConfig(prev => ({ ...prev, count: parseInt(e.target.value) }))}
                className="w-full bg-[#3A3A3A] border-gray-600 rounded-md p-2 text-white"
                min="1"
              />
            </div>
          )}

          {config.type === 'condition' && (
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Continue While
              </label>
              <input
                type="text"
                value={config.condition}
                onChange={(e) => setConfig(prev => ({ ...prev, condition: e.target.value }))}
                className="w-full bg-[#3A3A3A] border-gray-600 rounded-md p-2 text-white"
                placeholder="$.counter < 10"
              />
            </div>
          )}

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
              Save Loop
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}