import api from './api';

export interface ProductQuery {
  search?: string; category?: string; purity?: string;
  page?: number; limit?: number; sortBy?: string; order?: string;
  featured?: boolean; available?: boolean;
}

export interface PaginatedProducts {
  data: any[]; total: number; page: number; limit: number; totalPages: number;
}

export const productsService = {
  getAll: (q: ProductQuery = {}) => api.get<PaginatedProducts>('/products', { params: q }).then((r) => r.data),
  getAllAdmin: (q: ProductQuery = {}) => api.get<PaginatedProducts>('/products/admin', { params: q }).then((r) => r.data),
  getBySlug: (slug: string) => api.get(`/products/slug/${slug}`).then((r) => r.data),
  getById: (id: string) => api.get(`/products/${id}`).then((r) => r.data),

  create: (formData: FormData) =>
    api.post('/products', formData).then((r) => r.data),

  update: (id: string, formData: FormData) =>
    api.put(`/products/${id}`, formData).then((r) => r.data),

  toggleHidden: (id: string) => api.patch(`/products/${id}/toggle-hidden`).then((r) => r.data),
  toggleFeatured: (id: string) => api.patch(`/products/${id}/toggle-featured`).then((r) => r.data),
  toggleSoldOut: (id: string) => api.patch(`/products/${id}/toggle-sold-out`).then((r) => r.data),
  delete: (id: string) => api.delete(`/products/${id}`).then((r) => r.data),

  addImages: (id: string, formData: FormData) =>
    api.post(`/products/${id}/images`, formData, { headers: { 'Content-Type': 'multipart/form-data' } }).then((r) => r.data),

  deleteImage: (id: string, imageId: string) =>
    api.delete(`/products/${id}/images/${imageId}`).then((r) => r.data),

  reorderImages: (id: string, imageIds: string[]) =>
    api.patch(`/products/${id}/images/reorder`, { imageIds }).then((r) => r.data),

  setFeaturedImage: (id: string, imageId: string) =>
    api.patch(`/products/${id}/images/${imageId}/featured`).then((r) => r.data),
};
