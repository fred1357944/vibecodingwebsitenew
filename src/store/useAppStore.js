import { create } from 'zustand'

export const useAppStore = create((set) => ({
  // Current selected model
  selectedModel: null,
  setSelectedModel: (model) => set({ selectedModel: model }),

  // UI state
  isUploading: false,
  setIsUploading: (status) => set({ isUploading: status }),

  // User info (placeholder for future auth)
  user: null,
  setUser: (user) => set({ user }),

  // 3D viewer state
  viewerSettings: {
    showGrid: true,
    showAxes: true,
    backgroundColor: '#f5f5f5',
  },
  updateViewerSettings: (settings) =>
    set((state) => ({
      viewerSettings: { ...state.viewerSettings, ...settings },
    })),
}))
