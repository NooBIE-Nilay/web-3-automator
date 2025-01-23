import React, { useState } from 'react';
import { Plus, Trash2, MoreVertical } from 'lucide-react';
import { useWorkspaceStore } from '../../stores/workspaceStore';

export default function WorkspaceSidebar() {
  const {
    workspaces,
    activeWorkspaceId,
    createWorkspace,
    deleteWorkspace,
    setActiveWorkspace,
  } = useWorkspaceStore();

  const [isCreating, setIsCreating] = useState(false);
  const [newWorkspaceName, setNewWorkspaceName] = useState('');

  const handleCreateWorkspace = (e: React.FormEvent) => {
    e.preventDefault();
    if (newWorkspaceName.trim()) {
      createWorkspace(newWorkspaceName.trim());
      setNewWorkspaceName('');
      setIsCreating(false);
    }
  };

  const handleDeleteWorkspace = (id: string) => {
    if (workspaces.length > 1) {
      deleteWorkspace(id);
    }
  };

  return (
    <div className="w-64 bg-white border-r border-gray-200 flex flex-col h-full">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-bold mb-4">Workspaces</h2>
        <button
          onClick={() => setIsCreating(true)}
          className="w-full px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors flex items-center justify-center gap-2"
        >
          <Plus className="w-4 h-4" />
          New Workspace
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {isCreating && (
          <form onSubmit={handleCreateWorkspace} className="mb-4">
            <input
              type="text"
              value={newWorkspaceName}
              onChange={(e) => setNewWorkspaceName(e.target.value)}
              placeholder="Workspace name"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              autoFocus
            />
          </form>
        )}

        {workspaces.map((workspace) => (
          <div
            key={workspace.id}
            className={`group flex items-center justify-between p-3 rounded-md cursor-pointer transition-colors ${
              workspace.id === activeWorkspaceId
                ? 'bg-primary-50 text-primary-700'
                : 'hover:bg-gray-50'
            }`}
            onClick={() => setActiveWorkspace(workspace.id)}
          >
            <div className="flex-1 min-w-0">
              <h3 className="font-medium truncate">{workspace.name}</h3>
              <p className="text-xs text-gray-500">
                Updated {new Date(workspace.updatedAt).toLocaleDateString()}
              </p>
            </div>
            {workspaces.length > 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteWorkspace(workspace.id);
                }}
                className="p-1 rounded-full opacity-0 group-hover:opacity-100 hover:bg-gray-100 transition-all"
              >
                <Trash2 className="w-4 h-4 text-gray-500" />
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}