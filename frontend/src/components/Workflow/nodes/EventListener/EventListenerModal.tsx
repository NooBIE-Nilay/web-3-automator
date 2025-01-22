import React, { useState } from "react";
import { X, Eye, EyeOff } from "lucide-react";
import { useModalStore } from "../../../../stores/modalStore";
import { useWorkflowStore } from "../../../../stores/workflowStore";

interface EventListenerConfig {
  key: string;
  name: string;
  eventName: string;
  customInput: string;
}

export default function EventListenerModal() {
  const { isOpen, selectedNode, modalType, closeModal } = useModalStore();
  const updateNode = useWorkflowStore((state) => state.updateNode);

  const [showKey, setShowKey] = useState(false);
  const [config, setConfig] = useState<EventListenerConfig>({
    key: "",
    name: "",
    eventName: "",
    customInput: "",
  });

  if (!isOpen || !selectedNode || modalType !== "eventListener") return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateNode(selectedNode.id, {
      ...selectedNode.data,
      privateKeyConfig: config,
    });
    closeModal();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-[#2A2A2A] text-white rounded-lg shadow-xl w-full max-w-2xl">
        <div className="flex justify-between items-center p-4 border-b border-gray-600">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-semibold">Configure Event Listener</h2>
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
                Wallet Name
              </label>
              <input
                type="text"
                value={config.name}
                onChange={(e) =>
                  setConfig((prev) => ({ ...prev, name: e.target.value }))
                }
                className="w-full bg-[#3A3A3A] border-gray-600 rounded-md p-2"
                placeholder="Give name to wallet"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Wallet Address
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={config.key}
                  onChange={(e) =>
                    setConfig((prev) => ({ ...prev, key: e.target.value }))
                  }
                  className="w-full bg-[#3A3A3A] border-gray-600 rounded-md p-2 font-mono text-sm pr-10"
                  placeholder="Enter whale wallet address..."
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Subscribe to event:
              </label>
              <div className="relative">
                <select
                  id="eventSelect"
                  className="w-full bg-[#3A3A3A] border-gray-600 rounded-md p-2 font-mono text-sm pr-10"
                  onChange={(e) =>
                    setConfig((prev) => ({
                      ...prev,
                      eventName: e.target.value,
                    }))
                  }
                >
                  <option value="TRANSFER">TRANSFER</option>
                  <option value="APPROVE">APPROVE</option>
                  <option value="CUSTOM">CUSTOM</option>
                </select>
              </div>
            </div>
            {config.eventName === "CUSTOM" && (
              <div>
                <textarea
                  value={config.key}
                  onChange={(e) =>
                    setConfig((prev) => ({
                      ...prev,
                      customInput: e.target.value,
                    }))
                  }
                  className="w-full h-48 bg-[#3A3A3A] border-gray-600 rounded-md p-2 font-mono text-sm pr-10"
                  placeholder="Enter ABI code..."
                  type={"text"}
                />
              </div>
            )}
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
              Save Wallet
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
