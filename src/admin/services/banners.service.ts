import api from './api';

export const bannersService = {
  getAll: () => api.get('/banners').then((r) => r.data),
  create: (formData: FormData) => api.post('/banners', formData, { headers: { 'Content-Type': 'multipart/form-data' } }).then((r) => r.data),
  update: (id: string, formData: FormData) => api.put(`/banners/${id}`, formData, { headers: { 'Content-Type': 'multipart/form-data' } }).then((r) => r.data),
  toggleActive: (id: string, isActive: boolean) => api.put(`/banners/${id}`, { isActive }).then((r) => r.data),
  delete: (id: string) => api.delete(`/banners/${id}`).then((r) => r.data),
};
