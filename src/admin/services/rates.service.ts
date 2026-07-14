import api from './api';

export interface GoldRates {
  id?: string; gold24k: number; gold22k: number; gold18k: number; silver: number; lastUpdated?: string;
}

export const ratesService = {
  getCurrent: () => api.get<GoldRates>('/rates').then((r) => r.data),
  update: (data: Omit<GoldRates, 'id' | 'lastUpdated'>) => api.put<GoldRates>('/rates', data).then((r) => r.data),
};
