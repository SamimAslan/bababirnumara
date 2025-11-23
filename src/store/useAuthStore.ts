import { create } from 'zustand';
import type { AuthState } from '../types';

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  login: (email: string) => {
    set({
      isAuthenticated: true,
      user: {
        id: '1',
        email: email,
        name: 'Nomad User',
      },
    });
  },
  logout: () => {
    set({
      isAuthenticated: false,
      user: null,
    });
  },
}));