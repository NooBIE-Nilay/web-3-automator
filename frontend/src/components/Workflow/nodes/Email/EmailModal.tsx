import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useModalStore } from '../../../../stores/modalStore';
import { useWorkflowStore } from '../../../../stores/workflowStore';

interface EmailConfig {
  credential: string;
  fromEmail: string;
  toEmail: string;
  subject: string;
  format: 'HTML' | 'Plain';
  content: string;
}

export default function EmailModal() {
  const { isOpen, selectedNode, modalType, closeModal } = useModalStore();
  const updateNode = useWorkflowStore((state) => state.updateNode);

  const [config, setConfig] = useState<EmailConfig>({
    credential: '',
    fromEmail: 'admin@example.com',
    toEmail: 'info@example.com',
    subject: 'My subject line',
    format: 'HTML',
    content: '',
  });

  if (!isOpen || !selectedNode || modalType !== 'email') return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateNode(selectedNode.id, {
      ...selectedNode.data,
      emailConfig: config,
    });
    closeModal();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-[#2A2A2A] text-white rounded-lg shadow-xl w-full max-w-2xl">
        <div className="flex justify-between items-center p-4 border-b border-gray-600">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-semibold">Configure Email</h2>
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
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Credential to connect with
              </label>
              <select
                value={config.credential}
                onChange={(e) => setConfig(prev => ({ ...prev, credential: e.target.value }))}
                className="w-full bg-[#3A3A3A] border-gray-600 rounded-md p-2"
              >
                <option value="">Select Credential</option>
                <option value="smtp1">SMTP Server 1</option>
                <option value="smtp2">SMTP Server 2</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                From Email
              </label>
              <input
                type="email"
                value={config.fromEmail}
                onChange={(e) => setConfig(prev => ({ ...prev, fromEmail: e.target.value }))}
                className="w-full bg-[#3A3A3A] border-gray-600 rounded-md p-2"
                placeholder="admin@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                To Email
              </label>
              <input
                type="email"
                value={config.toEmail}
                onChange={(e) => setConfig(prev => ({ ...prev, toEmail: e.target.value }))}
                className="w-full bg-[#3A3A3A] border-gray-600 rounded-md p-2"
                placeholder="info@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Subject
              </label>
              <input
                type="text"
                value={config.subject}
                onChange={(e) => setConfig(prev => ({ ...prev, subject: e.target.value }))}
                className="w-full bg-[#3A3A3A] border-gray-600 rounded-md p-2"
                placeholder="My subject line"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Email Format
              </label>
              <select
                value={config.format}
                onChange={(e) => setConfig(prev => ({ ...prev, format: e.target.value as 'HTML' | 'Plain' }))}
                className="w-full bg-[#3A3A3A] border-gray-600 rounded-md p-2"
              >
                <option>HTML</option>
                <option>Plain</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                {config.format === 'HTML' ? 'HTML' : 'Content'}
              </label>
              <textarea
                value={config.content}
                onChange={(e) => setConfig(prev => ({ ...prev, content: e.target.value }))}
                className="w-full h-48 bg-[#3A3A3A] border-gray-600 rounded-md p-2 font-mono text-sm"
                placeholder={config.format === 'HTML' ? '<p>Enter your HTML content here</p>' : 'Enter your email content here'}
              />
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
              Save Email
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}