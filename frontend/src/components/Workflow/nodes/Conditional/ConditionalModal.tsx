import React, { useState } from 'react';
import { X, Plus, Trash2 } from 'lucide-react';
import { useModalStore } from '../../../../stores/modalStore';
import { useWorkflowStore } from '../../../../stores/workflowStore';

interface Condition {
  id: string;
  field: string;
  operator: string;
  value: string;
}

interface ConditionalConfig {
  conditions: Condition[];
  operators: string[];
  convertTypes: boolean;
}

const operators = [
  'is equal to',
  'is not equal to',
  'contains',
  'does not contain',
  'starts with',
  'ends with',
  'is greater than',
  'is less than',
];

const defaultCondition = (): Condition => ({
  id: crypto.randomUUID(),
  field: '',
  operator: 'is equal to',
  value: '',
});

export default function ConditionalModal() {
  const { isOpen, selectedNode, modalType, closeModal } = useModalStore();
  const updateNode = useWorkflowStore((state) => state.updateNode);

  const [config, setConfig] = useState<ConditionalConfig>({
    conditions: [defaultCondition()],
    operators: ['AND'],
    convertTypes: false,
  });

  if (!isOpen || !selectedNode || modalType !== 'conditional') return null;

  const addCondition = () => {
    setConfig(prev => ({
      ...prev,
      conditions: [...prev.conditions, defaultCondition()],
      operators: [...prev.operators, 'AND'],
    }));
  };

  const removeCondition = (index: number) => {
    setConfig(prev => ({
      ...prev,
      conditions: prev.conditions.filter((_, i) => i !== index),
      operators: prev.operators.filter((_, i) => i !== index),
    }));
  };

  const updateCondition = (index: number, field: keyof Condition, value: string) => {
    setConfig(prev => ({
      ...prev,
      conditions: prev.conditions.map((condition, i) => 
        i === index ? { ...condition, [field]: value } : condition
      ),
    }));
  };

  const updateOperator = (index: number, value: string) => {
    setConfig(prev => ({
      ...prev,
      operators: prev.operators.map((op, i) => i === index ? value : op),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateNode(selectedNode.id, {
      ...selectedNode.data,
      conditionalConfig: config,
    });
    closeModal();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-[#2A2A2A] text-white rounded-lg shadow-xl w-full max-w-2xl">
        <div className="flex justify-between items-center p-4 border-b border-gray-600">
          <h2 className="text-lg font-semibold">Configure Conditions</h2>
          <button
            onClick={closeModal}
            className="p-1 hover:bg-gray-700 rounded-full transition-colors"
          >
            <X className="h-5 w-5 text-gray-400" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 space-y-6">
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-gray-300">Conditions</h3>
            
            {config.conditions.map((condition, index) => (
              <div key={condition.id} className="space-y-2">
                {index > 0 && (
                  <select
                    value={config.operators[index - 1]}
                    onChange={(e) => updateOperator(index - 1, e.target.value)}
                    className="block w-20 bg-[#3A3A3A] border-gray-600 rounded-md text-sm"
                  >
                    <option>AND</option>
                    <option>OR</option>
                  </select>
                )}
                
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={condition.field}
                    onChange={(e) => updateCondition(index, 'field', e.target.value)}
                    placeholder="value1"
                    className="flex-1 bg-[#3A3A3A] border-gray-600 rounded-md"
                  />
                  
                  <select
                    value={condition.operator}
                    onChange={(e) => updateCondition(index, 'operator', e.target.value)}
                    className="flex-1 bg-[#3A3A3A] border-gray-600 rounded-md"
                  >
                    {operators.map(op => (
                      <option key={op}>{op}</option>
                    ))}
                  </select>
                  
                  <input
                    type="text"
                    value={condition.value}
                    onChange={(e) => updateCondition(index, 'value', e.target.value)}
                    placeholder="value2"
                    className="flex-1 bg-[#3A3A3A] border-gray-600 rounded-md"
                  />
                  
                  <button
                    type="button"
                    onClick={() => removeCondition(index)}
                    className="p-2 hover:bg-gray-700 rounded-full"
                  >
                    <Trash2 className="h-4 w-4 text-gray-400" />
                  </button>
                </div>
              </div>
            ))}

            <button
              type="button"
              onClick={addCondition}
              className="w-full py-2 border border-gray-600 rounded-md hover:bg-gray-700 transition-colors flex items-center justify-center gap-2"
            >
              <Plus className="h-4 w-4" />
              Add condition
            </button>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-300">Convert types where required</span>
              <button
                type="button"
                onClick={() => setConfig(prev => ({ ...prev, convertTypes: !prev.convertTypes }))}
                className={`w-12 h-6 rounded-full transition-colors ${
                  config.convertTypes ? 'bg-primary-500' : 'bg-gray-600'
                }`}
              >
                <div
                  className={`w-4 h-4 bg-white rounded-full transition-transform ${
                    config.convertTypes ? 'translate-x-7' : 'translate-x-1'
                  }`}
                />
              </button>
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
              Save Conditions
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}