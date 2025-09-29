// src/services/api.ts
import axios, { AxiosError } from 'axios'
import type { InternalAxiosRequestConfig } from 'axios'

function backendOrigin() {
  if (import.meta.env.DEV) {
    const port = import.meta.env.VITE_BACKEND_PORT ?? '8000'
    return `${window.location.protocol}//${window.location.hostname}:${port}`
  }
  return window.location.origin
}

const api = axios.create({
  baseURL: `${backendOrigin()}/api`,
})

// Añade Authorization: Bearer <token> a cada request
api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = localStorage.getItem('token')
  if (token) {
    const h = config.headers as any
    if (typeof h?.set === 'function') {
      h.set('Authorization', `Bearer ${token}`)
    } else {
      config.headers = { ...(config.headers as any), Authorization: `Bearer ${token}` } as any
    }
  }
  return config
})

api.interceptors.response.use(
  (r) => r,
  (error: AxiosError) => Promise.reject(error)
)

export default api
