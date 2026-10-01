import axios from 'axios'

// Once the FastAPI backend is live, point VITE_API_BASE_URL at it and swap
// the mock logic in uploadApi.js for a real POST to `${API}/analyze`.
export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api',
  timeout: 20000,
})

export default api
