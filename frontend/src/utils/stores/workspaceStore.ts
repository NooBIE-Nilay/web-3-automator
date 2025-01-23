import { create } from 'zustand';
import { Node, Edge } from 'reactflow';

export interface Workspace {
  id: string;
  name: string;
  nodes: Node[];
  edges: Edge[];
  createdAt: Date;
  updatedAt: Date;
}

interface WorkspaceStore {
  workspaces: Workspace[];
  activeWorkspaceId: string | null;
  createWorkspace: (name: string) => void;
  deleteWorkspace: (id: string) => void;
  setActiveWorkspace: (id: string) => void;
  updateWorkspace: (id: string, updates: Partial<Workspace>) => void;
}

const initialWorkspace: Workspace = {
  id: 'default',
  name: 'My First Workflow',
  nodes: [
    {
      id: 'start',
      type: 'start',
      position: { x: 0, y: 0 },
      data: { label: 'Start' },
    },
    {
      id: 'replace-start',
      type: 'replace',
      position: { x: 150, y: 0 },
      data: { label: 'Replace Me' },
    }
  ],
  edges: [
    {
      id: 'start-to-replace',
      source: 'start',
      target: 'replace-start',
      type: 'smoothstep',
    }
  ],
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const useWorkspaceStore = create<WorkspaceStore>((set) => ({
  workspaces: [initialWorkspace],
  activeWorkspaceId: 'default',

  createWorkspace: (name: string) => {
    const newWorkspace: Workspace = {
      id: crypto.randomUUID(),
      name,
      nodes: initialWorkspace.nodes,
      edges: initialWorkspace.edges,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    set((state) => ({
      workspaces: [...state.workspaces, newWorkspace],
      activeWorkspaceId: newWorkspace.id,
    }));
  },

  deleteWorkspace: (id: string) => {
    set((state) => {
      const newWorkspaces = state.workspaces.filter((w) => w.id !== id);
      return {
        workspaces: newWorkspaces,
        activeWorkspaceId: state.activeWorkspaceId === id 
          ? (newWorkspaces[0]?.id || null)
          : state.activeWorkspaceId,
      };
    });
  },

  setActiveWorkspace: (id: string) => {
    set({ activeWorkspaceId: id });
  },

  updateWorkspace: (id: string, updates: Partial<Workspace>) => {
    set((state) => ({
      workspaces: state.workspaces.map((workspace) =>
        workspace.id === id
          ? { ...workspace, ...updates, updatedAt: new Date() }
          : workspace
      ),
    }));
  },
}));