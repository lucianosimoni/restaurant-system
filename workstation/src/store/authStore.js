import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useAuthStore = create(
  persist(
    (set, get) => ({
      firstName: 'Luciano',
      lastName: 'Simoni',
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
