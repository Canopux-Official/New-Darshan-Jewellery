import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';
import { authService, type AdminProfile } from '../services/auth.service';

interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: AdminProfile | null;
}

interface AuthContextValue extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthState>({ isAuthenticated: false, isLoading: true, user: null });

  const refreshUser = useCallback(async () => {
    const token = localStorage.getItem('kj_access_token');
    if (!token) { setState({ isAuthenticated: false, isLoading: false, user: null }); return; }
    try {
      const user = await authService.getProfile();
      setState({ isAuthenticated: true, isLoading: false, user });
    } catch {
      localStorage.removeItem('kj_access_token');
      localStorage.removeItem('kj_refresh_token');
      setState({ isAuthenticated: false, isLoading: false, user: null });
    }
  }, []);

  useEffect(() => { refreshUser(); }, [refreshUser]);

  const login = async (email: string, password: string) => {
    const tokens = await authService.login({ email, password });
    localStorage.setItem('kj_access_token', tokens.accessToken);
    localStorage.setItem('kj_refresh_token', tokens.refreshToken);
    const user = await authService.getProfile();
    setState({ isAuthenticated: true, isLoading: false, user });
  };

  const logout = async () => {
    try { await authService.logout(); } catch { /* ignore */ }
    localStorage.removeItem('kj_access_token');
    localStorage.removeItem('kj_refresh_token');
    setState({ isAuthenticated: false, isLoading: false, user: null });
  };

  return <AuthContext.Provider value={{ ...state, login, logout, refreshUser }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
}
