import api from './api';

export const categoriesService = {
  getAll: () => api.get('/categories/admin/all').then((r) => r.data),
  getOne: (id: string) => api.get(`/categories/${id}`).then((r) => r.data),
  create: (data: { name: string; isActive?: boolean }) => api.post('/categories', data).then((r) => r.data),
  update: (id: string, data: { name?: string; isActive?: boolean }) => api.put(`/categories/${id}`, data).then((r) => r.data),
  delete: (id: string) => api.delete(`/categories/${id}`).then((r) => r.data),
};
