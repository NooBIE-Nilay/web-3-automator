import React from 'react';
import { Play } from 'lucide-react';
import { Panel } from 'reactflow';
import { useWorkflowStore } from '../../stores/workflowStore';
import { executeWorkflow } from '../../utils/apiUtils';

export default function ExecuteFlowButton() {
  const { nodes, edges } = useWorkflowStore();
  const [isExecuting, setIsExecuting] = React.useState(false);

  const handleExecute = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    try {
      setIsExecuting(true);
      await executeWorkflow({ nodes, edges });
      // You could add a success toast/notification here
    } catch (error) {
      console.error('Failed to execute workflow:', error);
      // You could add an error toast/notification here
    } finally {
      setIsExecuting(false);
    }
  };

  return (
    <Panel position="bottom-center">
      <button
        onClick={handleExecute}
        disabled={isExecuting}
        className="px-6 py-3 bg-primary-600 text-white rounded-full shadow-lg hover:bg-primary-700 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Play className="w-5 h-5" />
        {isExecuting ? 'Executing...' : 'Execute Flow'}
      </button>
    </Panel>
  );
}