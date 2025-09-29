// frontend/src/services/tareas.ts
import api from '@/services/api'

export type Tarea = {
  id: number
  titulo: string
  descripcion: string
  estado: string
  fecha_vencimiento: string | null
  usuario?: { nombre: string; rol: 'admin' | 'usuario' }
  created_at: string
  updated_at?: string
}

// Listar
export const getTareas = () => api.get<Tarea[]>('/tareas/listTareas')

// Crear
export const addTarea = (data: Partial<Tarea>) =>
  api.post('/tareas/addTareas', data)

// Actualizar
export const updateTarea = (id: number, data: Partial<Tarea>) =>
  api.put(`/tareas/updateTareas/${id}`, data)

// Eliminar
export const deleteTarea = (id: number) =>
  api.delete(`/tareas/deleteTareas/${id}`)

// (Opcional) Obtener una tarea por id
export const getTarea = (id: number) =>
  api.get<Tarea>(`/tareas/getTareas/${id}`)

// (Opcional) Descargar Excel de pendientes (si prefieres centralizarlo aquí)
export const exportPendientes = () =>
  api.get('/tareas/exportPendientes', { responseType: 'blob' })
