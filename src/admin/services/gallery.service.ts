import api from './api';

export const galleryService = {
  getAll: () => api.get('/gallery').then((r) => r.data),
  upload: (formData: FormData) =>
    api
      .post('/gallery/upload', formData, {
        timeout: 180000, // videos can take longer
      })
      .then((r) => r.data),
  delete: (id: string) => api.delete(`/gallery/${id}`).then((r) => r.data),
};
