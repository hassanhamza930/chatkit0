import { create } from 'zustand'

interface InputBoxState {
  searchQuery: string
  setSearchQuery: (query: string) => void
  clearSearchQuery: () => void
}

export const useInputBoxStore = create<InputBoxState>((set) => ({
  searchQuery: '',
  setSearchQuery: (query: string) => set({ searchQuery: query }),
  clearSearchQuery: () => set({ searchQuery: '' }),
}))
