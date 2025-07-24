import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { api } from '../services/api';

interface User {
  id: number;
  email: string;
  name: string;
  role: 'USER' | 'ADMIN';
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; message?: string }>;
  register: (email: string, password: string, name: string) => Promise<{ success: boolean; message?: string }>;
  logout: () => void;
  setUser: (user: User, token: string) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,

      login: async (email: string, password: string) => {
        try {
          console.log('🔐 AuthStore: Starting login for:', email);
          const response = await api.post('/auth/login', { email, password });
          console.log('📡 AuthStore: Login response:', response.data);
          
          if (response.data.success) {
            console.log('✅ AuthStore: Login successful');
            set({
              user: response.data.data.user,
              token: response.data.data.token,
              isAuthenticated: true,
            });
            localStorage.setItem('token', response.data.data.token);
            return { success: true };
          } else {
            console.log('❌ AuthStore: Login failed:', response.data.message);
            return { success: false, message: response.data.message };
          }
        } catch (error: unknown) {
          console.log('💥 AuthStore: Login error:', error);
          
          // Handle different types of errors
          let errorMessage = 'Network error. Please try again.';
          
          if (error && typeof error === 'object' && 'response' in error) {
            const axiosError = error as { response?: { data?: { message?: string } } };
            if (axiosError.response?.data?.message) {
              errorMessage = axiosError.response.data.message;
            }
          } else if (error instanceof Error) {
            errorMessage = error.message;
          }
          
          return { success: false, message: errorMessage };
        }
      },

      register: async (email: string, password: string, name: string) => {
        try {
          const response = await api.post('/auth/register', { email, password, name });

          if (response.data.success) {
            set({
              user: response.data.data.user,
              token: response.data.data.token,
              isAuthenticated: true,
            });
            localStorage.setItem('token', response.data.data.token);
            return { success: true };
          } else {
            return { success: false, message: response.data.message };
          }
        } catch (error: unknown) {
          let errorMessage = 'Network error. Please try again.';
          
          if (error && typeof error === 'object' && 'response' in error) {
            const axiosError = error as { response?: { data?: { message?: string } } };
            if (axiosError.response?.data?.message) {
              errorMessage = axiosError.response.data.message;
            }
          } else if (error instanceof Error) {
            errorMessage = error.message;
          }
          
          return { success: false, message: errorMessage };
        }
      },

      logout: () => {
        set({
          user: null,
          token: null,
          isAuthenticated: false,
        });
      },

      setUser: (user: User, token: string) => {
        set({
          user,
          token,
          isAuthenticated: true,
        });
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);
