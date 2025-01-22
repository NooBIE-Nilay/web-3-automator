import React, { useState } from 'react';
import { X } from 'lucide-react';
import Editor from '@monaco-editor/react';
import { useModalStore } from '../../../../stores/modalStore';
import { useWorkflowStore } from '../../../../stores/workflowStore';

const modes = [
  'Run Once for All Items',
  'Run Once for Each Item',
  'Run in Parallel'
];

export default function CodeModal() {
  const { isOpen, selectedNode, modalType, closeModal } = useModalStore();
  const updateNode = useWorkflowStore((state) => state.updateNode);

  const [mode, setMode] = useState(modes[0]);
  const [code, setCode] = useState(`// Loop over input items and add a new field called 'myNewField' to the JSON of each one
for (const item of $input.all()) {
  item.json.myNewField = 1;
}

return $input.all();`);

  if (!isOpen || !selectedNode || modalType !== 'code') return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateNode(selectedNode.id, {
      ...selectedNode.data,
      code: {
        mode,
        content: code
      }
    });
    closeModal();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-[#2A2A2A] text-white rounded-lg shadow-xl w-full max-w-4xl h-[80vh]">
        <div className="flex justify-between items-center p-4 border-b border-gray-600">
          <div className="flex items-center gap-2">
            <span className="text-orange-400">{}</span>
            <h2 className="text-lg font-semibold">Code</h2>
          </div>
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={handleSubmit}
              className="px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-md hover:bg-primary-700"
            >
              Save
            </button>
            <button
              onClick={closeModal}
              className="p-1 hover:bg-gray-700 rounded-full transition-colors"
            >
              <X className="h-5 w-5 text-gray-400" />
            </button>
          </div>
        </div>

        <div className="flex h-[calc(100%-4rem)]">
          <div className="flex-1 flex flex-col">
            <div className="border-b border-gray-600">
              <div className="flex">
                <button className="px-4 py-2 text-sm border-b-2 border-red-500 text-red-500">
                  Parameters
                </button>
                <button className="px-4 py-2 text-sm text-gray-400 hover:text-white">
                  Settings
                </button>
              </div>
            </div>

            <div className="p-4 space-y-6">
              <div>
                <label className="block text-sm text-gray-300 mb-2">Mode</label>
                <select
                  value={mode}
                  onChange={(e) => setMode(e.target.value)}
                  className="w-full bg-[#3A3A3A] border-gray-600 rounded-md p-2 text-white"
                >
                  {modes.map(m => (
                    <option key={m} value={m}>{m}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm text-gray-300 mb-2">JavaScript</label>
                <div className="border border-gray-600 rounded-md overflow-hidden">
                  <Editor
                    height="400px"
                    defaultLanguage="javascript"
                    language="javascript"
                    theme="vs-dark"
                    value={code}
                    onChange={(value) => setCode(value || '')}
                    options={{
                      minimap: { enabled: false },
                      fontSize: 14,
                      lineNumbers: 'on',
                      scrollBeyondLastLine: false,
                      automaticLayout: true,
                      scrollbar: {
                        vertical: 'visible',
                        horizontal: 'visible'
                      },
                      padding: { top: 10, bottom: 10 },
                    }}
                  />
                </div>
                <div className="mt-2 text-xs text-gray-400 bg-[#3A3A3A] p-2 rounded">
                  Type $ for a list of special vars/methods. Debug by using console.log() statements and viewing their output in the browser console.
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 text-sm font-medium text-gray-300 bg-transparent border border-gray-600 rounded-md hover:bg-gray-700"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  className="px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-md hover:bg-primary-700"
                >
                  Save Code
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}