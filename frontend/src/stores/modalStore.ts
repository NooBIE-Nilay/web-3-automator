import { create } from 'zustand';
import { Node } from 'reactflow';

type ModalType = 'start' | 'edit' | 'filter' | 'code' | 'conditional' | 'delay' | 'webhook' | 'http' | 'email' | 'privatekey';

type ModalStore = {
  isOpen: boolean;
  selectedNode: Node | null;
  modalType: ModalType | null;
  openModal: (node: Node, type: ModalType) => void;
  closeModal: () => void;
};

export const useModalStore = create<ModalStore>((set) => ({
  isOpen: false,
  selectedNode: null,
  modalType: null,
  openModal: (node: Node, type: ModalType) => set({ isOpen: true, selectedNode: node, modalType: type }),
  closeModal: () => set({ isOpen: false, selectedNode: null, modalType: null }),
}));