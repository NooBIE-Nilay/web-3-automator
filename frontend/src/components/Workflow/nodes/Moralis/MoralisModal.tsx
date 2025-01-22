import React, { useState } from "react";
import { X, Eye, EyeOff } from "lucide-react";
import { useModalStore } from "../../../../stores/modalStore";
import { useWorkflowStore } from "../../../../stores/workflowStore";

interface MoralisConfig {
  address: string;
}

export default function MoralisModal() {
  const { isOpen, selectedNode, modalType, closeModal } = useModalStore();
  const updateNode = useWorkflowStore((state) => state.updateNode);

  const [showKey, setShowKey] = useState(false);
  const [config, setConfig] = useState<MoralisConfig>({
    address: "",
  });

  if (!isOpen || !selectedNode || modalType !== "moralis") return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateNode(selectedNode.id, {
      ...selectedNode.data,
      config: {
        address: config.address,
      },
    });
    closeModal();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-[#2A2A2A] text-white rounded-lg shadow-xl w-full max-w-2xl">
        <div className="flex justify-between items-center p-4 border-b border-gray-600">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-semibold">
              Configure Moralis Listener
            </h2>
          </div>
          <div className="flex items-center gap-4">
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
                Wallet to watch
              </label>
              <input
                type="text"
                value={config.address}
                onChange={(e) =>
                  setConfig((prev) => ({ ...prev, address: e.target.value }))
                }
                className="w-full bg-[#3A3A3A] border-gray-600 rounded-md p-2"
                placeholder="Enter wallet address"
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
              Watch Wallet
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
