import React from 'react';
import {
  AppWindow,
  GitBranch,
  Clock,
  Wallet,
  Code,
  Webhook,
  Mail,
  Filter,
  FileCode,
  FileText,
  Database,
  Table,
  ArrowRightLeft,
  TimerReset,
  Blocks,
  FileJson,
  Globe,
  RefreshCw,
  X,
} from 'lucide-react';
import { useWorkflowStore } from '../../stores/workflowStore';
import { useSidebarStore } from '../../stores/sidebarStore';

const nodeCategories = [
  {
    name: 'Flow',
    nodes: [
      {
        type: 'conditional',
        label: 'If Condition',
        icon: GitBranch,
        description: 'Branch workflow based on condition',
      },
      {
        type: 'loop',
        label: 'Loop',
        icon: RefreshCw,
        description: 'Loop over items',
      },
      {
        type: 'switch',
        label: 'Switch',
        icon: GitBranch,
        description: 'Multiple conditional branches',
      },
      {
        type: 'delay',
        label: 'Time Delay',
        icon: TimerReset,
        description: 'Add delay between steps',
      },
    ],
  },
  {
    name: 'App',
    nodes: [
      {
        type: 'uniswap',
        label: 'Uniswap',
        icon: ArrowRightLeft,
        description: 'Interact with Uniswap protocol',
      },
      {
        type: 'textscreener',
        label: 'Text Screener',
        icon: FileText,
        description: 'Screen and analyze text content',
      },
      {
        type: 'googlesheets',
        label: 'Google Sheets',
        icon: Table,
        description: 'Interact with Google Sheets',
      },
    ],
  },
  {
    name: 'Transformation',
    nodes: [
      {
        type: 'filter',
        label: 'Filter',
        icon: Filter,
        description: 'Filter data based on conditions',
      },
      {
        type: 'code',
        label: 'Code',
        icon: Code,
        description: 'Execute custom code',
      },
      {
        type: 'summarize',
        label: 'Summarize',
        icon: FileText,
        description: 'Summarize data or text',
      },
    ],
  },
  {
    name: 'Web3',
    nodes: [
      {
        type: 'privatekey',
        label: 'Private Key',
        icon: Wallet,
        description: 'Manage private keys',
      },
      {
        type: 'contract-events',
        label: 'Contract Events',
        icon: Blocks,
        description: 'Listen to contract events',
      },
      {
        type: 'contract-transactions',
        label: 'Contract Transactions',
        icon: Blocks,
        description: 'Monitor contract transactions',
      },
      {
        type: 'contract-function',
        label: 'Contract Function',
        icon: FileCode,
        description: 'Execute contract functions',
      },
    ],
  },
  {
    name: 'Core',
    nodes: [
      {
        type: 'webhook',
        label: 'Webhook',
        icon: Webhook,
        description: 'Handle HTTP webhooks',
      },
      {
        type: 'http',
        label: 'HTTP Request',
        icon: Globe,
        description: 'Make HTTP requests',
      },
      {
        type: 'code',
        label: 'Code',
        icon: Code,
        description: 'Execute custom code',
      },
      {
        type: 'email',
        label: 'Email',
        icon: Mail,
        description: 'Send email notifications',
      },
    ],
  },
];

export default function NodeSidebar() {
  const { isOpen, selectedNodeId, closeSidebar } = useSidebarStore();

  const addNodeWithButton = useWorkflowStore(
    (state) => state.addNodeWithButton
  );

  const handleNodeSelect = (type: string) => {
    if (selectedNodeId) {
      const newNode = {
        id: `${type}-${Date.now()}`,
        type,
        position: { x: 0, y: 0 },
        data: {
          label: type === 'conditional' ? 'If Condition' : `New ${type}`,
          description:
            type === 'conditional'
              ? 'Define your condition'
              : `Description for ${type}`,
          condition: type === 'conditional' ? 'value > 0' : undefined,
        },
      };
      addNodeWithButton(newNode, selectedNodeId);
      closeSidebar();
    }
  };

  return (
    <div
      className={`fixed inset-y-0 right-0 w-80 bg-white shadow-lg border-l border-gray-200 transform transition-transform duration-300 ease-in-out ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      } z-50`}
    >
      <div className="h-full flex flex-col">
        <div className="flex justify-between items-center p-4 border-b border-gray-200">
          <h2 className="text-lg font-bold">Add Node</h2>
          <button
            onClick={closeSidebar}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          {nodeCategories.map((category) => (
            <div key={category.name}>
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
                {category.name}
              </h3>
              <div className="space-y-2">
                {category.nodes.map((node) => (
                  <button
                    key={node.type}
                    className="w-full p-3 bg-white border border-gray-200 rounded-lg hover:border-primary-500 hover:shadow-md transition-all duration-200 text-left"
                    onClick={() => handleNodeSelect(node.type)}
                  >
                    <div className="flex items-center gap-3">
                      <node.icon className="h-5 w-5 text-primary-500" />
                      <div>
                        <h4 className="font-medium text-gray-900">
                          {node.label}
                        </h4>
                        <p className="text-sm text-gray-500">
                          {node.description}
                        </p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
