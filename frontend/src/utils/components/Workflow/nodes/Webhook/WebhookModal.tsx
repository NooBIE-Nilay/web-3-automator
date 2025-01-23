import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useModalStore } from '../../../../stores/modalStore';
import { useWorkflowStore } from '../../../../stores/workflowStore';

interface WebhookConfig {
  urls: {
    test: string;
    production: string;
  };
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  path: string;
  authentication: 'None' | 'Basic' | 'Bearer Token';
  response: 'Immediately' | 'After Completion';
}

export default function WebhookModal() {
  const { isOpen, selectedNode, modalType, closeModal } = useModalStore();
  const updateNode = useWorkflowStore((state) => state.updateNode);

  const [activeTab, setActiveTab] = useState<'test' | 'production'>('test');
  const [config, setConfig] = useState<WebhookConfig>({
    urls: {
      test: 'https://burooj.app.n8n.cloud/webhook-test/31...',
      production: '',
    },
    method: 'GET',
    path: '3156b88c-d8a9-4ac8-9627-8f313a7e2f7b',
    authentication: 'None',
    response: 'Immediately',
  });

  if (!isOpen || !selectedNode || modalType !== 'webhook') return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateNode(selectedNode.id, {
      ...selectedNode.data,
      webhookConfig: config,
    });
    closeModal();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-[#2A2A2A] text-white rounded-lg shadow-xl w-full max-w-2xl">
        <div className="flex justify-between items-center p-4 border-b border-gray-600">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-semibold">Configure Webhook</h2>
          </div>
          <div className="flex items-center gap-4">
            <button
              type="button"
              className="px-3 py-1 text-sm bg-red-500 hover:bg-red-600 rounded-md flex items-center gap-2"
            >
              Listen for test event
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
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Webhook URLs
              </label>
              <div className="flex gap-2 mb-2">
                <button
                  type="button"
                  className={`px-3 py-1 text-sm rounded-md ${
                    activeTab === 'test'
                      ? 'bg-primary-500 text-white'
                      : 'text-gray-400 hover:bg-gray-700'
                  }`}
                  onClick={() => setActiveTab('test')}
                >
                  Test URL
                </button>
                <button
                  type="button"
                  className={`px-3 py-1 text-sm rounded-md ${
                    activeTab === 'production'
                      ? 'bg-primary-500 text-white'
                      : 'text-gray-400 hover:bg-gray-700'
                  }`}
                  onClick={() => setActiveTab('production')}
                >
                  Production URL
                </button>
              </div>
              <div className="flex items-center gap-2 bg-[#1A1A1A] p-2 rounded-md">
                <span className="px-2 py-1 bg-[#3A3A3A] text-sm rounded">GET</span>
                <input
                  type="text"
                  value={config.urls[activeTab]}
                  onChange={(e) =>
                    setConfig((prev) => ({
                      ...prev,
                      urls: {
                        ...prev.urls,
                        [activeTab]: e.target.value,
                      },
                    }))
                  }
                  className="flex-1 bg-transparent border-none focus:outline-none text-sm"
                  readOnly
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                HTTP Method
              </label>
              <select
                value={config.method}
                onChange={(e) =>
                  setConfig((prev) => ({
                    ...prev,
                    method: e.target.value as WebhookConfig['method'],
                  }))
                }
                className="w-full bg-[#3A3A3A] border-gray-600 rounded-md p-2"
              >
                <option>GET</option>
                <option>POST</option>
                <option>PUT</option>
                <option>DELETE</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Path
              </label>
              <input
                type="text"
                value={config.path}
                onChange={(e) =>
                  setConfig((prev) => ({ ...prev, path: e.target.value }))
                }
                className="w-full bg-[#3A3A3A] border-gray-600 rounded-md p-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Authentication
              </label>
              <select
                value={config.authentication}
                onChange={(e) =>
                  setConfig((prev) => ({
                    ...prev,
                    authentication: e.target.value as WebhookConfig['authentication'],
                  }))
                }
                className="w-full bg-[#3A3A3A] border-gray-600 rounded-md p-2"
              >
                <option>None</option>
                <option>Basic</option>
                <option>Bearer Token</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Respond
              </label>
              <select
                value={config.response}
                onChange={(e) =>
                  setConfig((prev) => ({
                    ...prev,
                    response: e.target.value as WebhookConfig['response'],
                  }))
                }
                className="w-full bg-[#3A3A3A] border-gray-600 rounded-md p-2"
              >
                <option>Immediately</option>
                <option>After Completion</option>
              </select>
            </div>
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
              Save Webhook
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}