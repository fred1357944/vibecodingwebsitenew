// API client configuration
// This will handle all API calls to the backend

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api'

export const api = {
  // Upload file
  uploadModel: async (file) => {
    const formData = new FormData()
    formData.append('model', file)

    const response = await fetch(`${API_BASE_URL}/models/upload`, {
      method: 'POST',
      body: formData,
    })

    if (!response.ok) {
      throw new Error('Upload failed')
    }

    return response.json()
  },

  // Get all models
  getModels: async () => {
    const response = await fetch(`${API_BASE_URL}/models`)

    if (!response.ok) {
      throw new Error('Failed to fetch models')
    }

    return response.json()
  },

  // Get single model
  getModel: async (id) => {
    const response = await fetch(`${API_BASE_URL}/models/${id}`)

    if (!response.ok) {
      throw new Error('Failed to fetch model')
    }

    return response.json()
  },

  // Delete model
  deleteModel: async (id) => {
    const response = await fetch(`${API_BASE_URL}/models/${id}`, {
      method: 'DELETE',
    })

    if (!response.ok) {
      throw new Error('Failed to delete model')
    }

    return response.json()
  },
}
