import api from './api';

export const dashboardService = {
  getStats: () => api.get('/dashboard/stats').then((r) => r.data),
  getRecentProducts: () => api.get('/dashboard/recent-products').then((r) => r.data),
  getActivity: () => api.get('/dashboard/activity').then((r) => r.data),
};
