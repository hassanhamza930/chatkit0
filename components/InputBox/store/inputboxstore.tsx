import { availableModels } from '@/app/const';
import { create } from 'zustand'
import { ModelInterface } from '@/app/interfaces';

interface InputBoxState {
  searchQuery: string
  selectedModel: ModelInterface | null
  setSearchQuery: (query: string) => void
  setSelectedModel: (model: ModelInterface) => void
  clearSearchQuery: () => void
  openrouterKey: string
  setOpenrouterKey: (key: string) => void
  openrouterKeyModalOpen: boolean
  setOpenrouterKeyModalOpen: (open: boolean) => void

}

export const useInputBoxStore = create<InputBoxState>((set) => ({
  searchQuery: '',
  selectedModel: availableModels[0], // Default to null, will be set in logic
  setSearchQuery: (query: string) => set({ searchQuery: query }),
  setSelectedModel: (model: ModelInterface) => set({ selectedModel: model }),
  clearSearchQuery: () => set({ searchQuery: '' }),
  openrouterKey: '',
  setOpenrouterKey: (key: string) => set({ openrouterKey: key }),
  openrouterKeyModalOpen: false,
  setOpenrouterKeyModalOpen: (open: boolean) => set({ openrouterKeyModalOpen: open }),

}))
