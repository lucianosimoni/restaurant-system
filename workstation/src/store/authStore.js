import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const defaultState = {
  isAuthenticated: false,
  token: null,
  firstName: '',
  lastName: '',
};

export const useAuthStore = create(
  persist(
    (set, get) => ({
      isAuthenticated: false,
      token: null,
      firstName: '',
      lastName: '',
      login: (token) => set(() => ({ isAuthenticated: true, token })),
      logout: () => set(() => ({ ...defaultState })),
      updateFirstName: (newFirstName) => set(() => ({ firstName: newFirstName })),
      updateLastName: (newLastName) => set(() => ({ lastName: newLastName })),
      bears: 0,
      addABear: () => set({ bears: get().bears + 1 }),
    }),
    {
      name: 'user-storage',
    },
  ),
);
