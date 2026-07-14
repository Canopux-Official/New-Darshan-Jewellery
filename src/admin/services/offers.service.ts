import api from './api';

export const offersService = {
  getAll: () => api.get('/offers').then((r) => r.data),
  create: (data: any) => api.post('/offers', data).then((r) => r.data),
  update: (id: string, data: any) => api.put(`/offers/${id}`, data).then((r) => r.data),
  delete: (id: string) => api.delete(`/offers/${id}`).then((r) => r.data),
};
