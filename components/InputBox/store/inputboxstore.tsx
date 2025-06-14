import { create } from 'zustand'

interface InputBoxState {
  searchQuery: string
  selectedModel: string
  setSearchQuery: (query: string) => void
  setSelectedModel: (model: string) => void
  clearSearchQuery: () => void
  openrouterKey: string
  setOpenrouterKey: (key: string) => void
  loadingResponse: boolean
  setLoadingResponse: (loading: boolean) => void
}

export const useInputBoxStore = create<InputBoxState>((set) => ({
  searchQuery: '',
  selectedModel: 'google/gemini-2.0-flash-lite-001', // Default to first model
  setSearchQuery: (query: string) => set({ searchQuery: query }),
  setSelectedModel: (model: string) => set({ selectedModel: model }),
  clearSearchQuery: () => set({ searchQuery: '' }),
  openrouterKey: '',
  setOpenrouterKey: (key: string) => set({ openrouterKey: key }),
  loadingResponse: false,
  setLoadingResponse: (loading: boolean) => set({ loadingResponse: loading }),
}))
