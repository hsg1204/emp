import { create } from 'zustand'

interface AppStoreState {
  collapsed: boolean
  setCollapsed: (collapsed: boolean) => void
}

export const useAppStore = create<AppStoreState>((set) => ({
  collapsed: false,
  setCollapsed: (collapsed) => set({ collapsed }),
}))
