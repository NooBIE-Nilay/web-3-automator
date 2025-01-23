import { create } from 'zustand';

type SidebarStore = {
  isOpen: boolean;
  selectedNodeId: string | null;
  openSidebar: (nodeId: string) => void;
  closeSidebar: () => void;
};

export const useSidebarStore = create<SidebarStore>((set) => ({
  isOpen: false,
  selectedNodeId: null,
  openSidebar: (nodeId: string) => set({ isOpen: true, selectedNodeId: nodeId }),
  closeSidebar: () => set({ isOpen: false, selectedNodeId: null }),
}));