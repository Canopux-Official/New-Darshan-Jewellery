import api from './api';

export interface LoginPayload { email: string; password: string; }
export interface AuthTokens { accessToken: string; refreshToken: string; tokenType: string; }
export interface AdminProfile { id: string; email: string; name: string; role: string; }

export const authService = {
  async login(payload: LoginPayload): Promise<AuthTokens> {
    const { data } = await api.post<AuthTokens>('/auth/login', payload);
    return data;
  },

  async getProfile(): Promise<AdminProfile> {
    const { data } = await api.get<AdminProfile>('/auth/profile');
    return data;
  },

  async logout(): Promise<void> {
    await api.post('/auth/logout');
  },

  async changePassword(currentPassword: string, newPassword: string): Promise<{ message: string }> {
    const { data } = await api.post<{ message: string }>('/auth/change-password', {
      currentPassword,
      newPassword,
    });
    return data;
  },

  async refresh(refreshToken: string): Promise<AuthTokens> {
    const { data } = await api.post<AuthTokens>('/auth/refresh', { refreshToken });
    return data;
  },
};
