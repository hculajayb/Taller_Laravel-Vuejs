import api from './api'

export const getTareas = () => api.get('/tareas/listTareas')
export const addTarea = (data: any) => api.post('/tareas/addTareas', data)
export const updateTarea = (id: number, data: any) => api.put(`/tareas/updateTareas/${id}`, data)
export const deleteTarea = (id: number) => api.delete(`/tareas/deleteTareas/${id}`)
