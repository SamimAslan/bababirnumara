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
  register: (email: string, name: string) => {
    set({
      isAuthenticated: true,
      user: {
        id: Date.now().toString(),
        email: email,
        name: name,
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