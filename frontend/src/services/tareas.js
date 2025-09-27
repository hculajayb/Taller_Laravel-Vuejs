import api from './api';
export const getTareas = () => api.get('/tareas/listTareas');
export const addTarea = (data) => api.post('/tareas/addTareas', data);
export const updateTarea = (id, data) => api.put(`/tareas/updateTareas/${id}`, data);
export const deleteTarea = (id) => api.delete(`/tareas/deleteTareas/${id}`);
