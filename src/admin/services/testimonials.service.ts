import api from './api';

export const testimonialsService = {
  getAll: (approvedOnly = false) => api.get('/testimonials', { params: approvedOnly ? { approved: 'true' } : {} }).then((r) => r.data),
  create: (data: any) => api.post('/testimonials', data).then((r) => r.data),
  update: (id: string, data: any) => api.put(`/testimonials/${id}`, data).then((r) => r.data),
  toggleApproved: (id: string) => api.patch(`/testimonials/${id}/toggle-approved`).then((r) => r.data),
  delete: (id: string) => api.delete(`/testimonials/${id}`).then((r) => r.data),
};
