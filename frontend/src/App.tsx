import React from 'react';
import { ReactFlowProvider } from 'reactflow';
import WorkflowCanvas from './components/Workflow/WorkflowCanvas';
import WorkspaceSidebar from './components/Workflow/WorkspaceSidebar';

function App() {
  return (
    <div className="h-screen flex">
      <WorkspaceSidebar />
      <div className="flex-1">
        <ReactFlowProvider>
          <WorkflowCanvas />
        </ReactFlowProvider>
      </div>
    </div>
  );
}

export default App;