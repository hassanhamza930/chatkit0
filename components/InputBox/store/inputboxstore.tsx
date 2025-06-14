import { availableModels } from '@/app/const';
import { create } from 'zustand'

interface Model {
  name: string;
  value: string;
  logo: string;
  byok: boolean;
  thinking?: boolean;
}

interface InputBoxState {
  searchQuery: string
  selectedModel: Model | null
  setSearchQuery: (query: string) => void
  setSelectedModel: (model: Model) => void
  clearSearchQuery: () => void
  openrouterKey: string
  setOpenrouterKey: (key: string) => void
  loadingResponse: boolean
  setLoadingResponse: (loading: boolean) => void
}

export const useInputBoxStore = create<InputBoxState>((set) => ({
  searchQuery: '',
  selectedModel: availableModels[0], // Default to null, will be set in logic
  setSearchQuery: (query: string) => set({ searchQuery: query }),
  setSelectedModel: (model: Model) => set({ selectedModel: model }),
  clearSearchQuery: () => set({ searchQuery: '' }),
  openrouterKey: '',
  setOpenrouterKey: (key: string) => set({ openrouterKey: key }),
  loadingResponse: false,
  setLoadingResponse: (loading: boolean) => set({ loadingResponse: loading }),
}))
