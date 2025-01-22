import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useModalStore } from '../../../../stores/modalStore';
import { useWorkflowStore } from '../../../../stores/workflowStore';

interface HttpRequestConfig {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  url: string;
  authentication: 'None' | 'Basic' | 'Bearer Token';
  sendQueryParams: boolean;
  sendHeaders: boolean;
  sendBody: boolean;
  headers: Record<string, string>;
  queryParams: Record<string, string>;
  body: string;
}

export default function HttpRequestModal() {
  const { isOpen, selectedNode, modalType, closeModal } = useModalStore();
  const updateNode = useWorkflowStore((state) => state.updateNode);

  const [config, setConfig] = useState<HttpRequestConfig>({
    method: 'GET',
    url: 'http://example.com/index.html',
    authentication: 'None',
    sendQueryParams: false,
    sendHeaders: false,
    sendBody: false,
    headers: {},
    queryParams: {},
    body: '',
  });

  if (!isOpen || !selectedNode || modalType !== 'http') return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateNode(selectedNode.id, {
      ...selectedNode.data,
      httpConfig: config,
    });
    closeModal();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-[#2A2A2A] text-white rounded-lg shadow-xl w-full max-w-2xl">
        <div className="flex justify-between items-center p-4 border-b border-gray-600">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-semibold">HTTP Request</h2>
          </div>
          <div className="flex items-center gap-4">
            <button
              type="button"
              className="px-3 py-1 text-sm bg-red-500 hover:bg-red-600 rounded-md"
            >
              Test step
            </button>
            <button
              type="button"
              className="px-3 py-1 text-sm border border-gray-600 rounded-md hover:bg-gray-700"
            >
              Import cURL
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
                Method
              </label>
              <select
                value={config.method}
                onChange={(e) => setConfig(prev => ({ ...prev, method: e.target.value as HttpRequestConfig['method'] }))}
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
                URL
              </label>
              <input
                type="text"
                value={config.url}
                onChange={(e) => setConfig(prev => ({ ...prev, url: e.target.value }))}
                className="w-full bg-[#3A3A3A] border-gray-600 rounded-md p-2"
                placeholder="http://example.com/index.html"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Authentication
              </label>
              <select
                value={config.authentication}
                onChange={(e) => setConfig(prev => ({ ...prev, authentication: e.target.value as HttpRequestConfig['authentication'] }))}
                className="w-full bg-[#3A3A3A] border-gray-600 rounded-md p-2"
              >
                <option>None</option>
                <option>Basic</option>
                <option>Bearer Token</option>
              </select>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-300">Send Query Parameters</span>
                <button
                  type="button"
                  onClick={() => setConfig(prev => ({ ...prev, sendQueryParams: !prev.sendQueryParams }))}
                  className={`w-12 h-6 rounded-full transition-colors ${
                    config.sendQueryParams ? 'bg-primary-500' : 'bg-gray-600'
                  }`}
                >
                  <div
                    className={`w-4 h-4 bg-white rounded-full transition-transform ${
                      config.sendQueryParams ? 'translate-x-7' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-300">Send Headers</span>
                <button
                  type="button"
                  onClick={() => setConfig(prev => ({ ...prev, sendHeaders: !prev.sendHeaders }))}
                  className={`w-12 h-6 rounded-full transition-colors ${
                    config.sendHeaders ? 'bg-primary-500' : 'bg-gray-600'
                  }`}
                >
                  <div
                    className={`w-4 h-4 bg-white rounded-full transition-transform ${
                      config.sendHeaders ? 'translate-x-7' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-300">Send Body</span>
                <button
                  type="button"
                  onClick={() => setConfig(prev => ({ ...prev, sendBody: !prev.sendBody }))}
                  className={`w-12 h-6 rounded-full transition-colors ${
                    config.sendBody ? 'bg-primary-500' : 'bg-gray-600'
                  }`}
                >
                  <div
                    className={`w-4 h-4 bg-white rounded-full transition-transform ${
                      config.sendBody ? 'translate-x-7' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
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
              Save Request
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}