import create from 'zustand';
import persist from 'zustand/middleware';

const useAuthStore = create(
  persist(
    (set, get) => ({
      bears: 0,
      addABear: () => set({ bears: get().bears + 1 }),
    }),
    {
      name: 'user-storage',
    },
  ),
);

export default useAuthStore;
