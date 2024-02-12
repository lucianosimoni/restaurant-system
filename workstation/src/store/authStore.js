import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const defaultState = {
  isAuthenticated: false,
  token: null,
  id: null,
  username: '',
  info: {
    id: null,
    firstName: '',
    lastName: '',
  },
  role: '',
};

const methods = (set, get) => ({
  login: (staff) =>
    set(() => ({
      isAuthenticated: true,
      token: staff.token,
      id: staff.id,
      username: staff.username,
      info: {
        id: staff.info.id,
        firstName: staff.info.firstName,
        lastName: staff.info.lastName,
      },
      role: staff.role,
    })),
  logout: () => set(() => ({ ...defaultState })),
  updateFirstName: (firstname) => set((state) => ({ ...state, info: { ...state.info, firstName: firstname } })),
  updateLastName: (newLastName) => set((state) => ({ ...state, info: { ...state.info, lastName: newLastName } })),
});

export const useAuthStore = create(
  persist(
    (set, get) => ({
      isAuthenticated: false,
      token: null,
      id: null,
      username: '',
      info: {
        id: null,
        firstName: '',
        lastName: '',
      },
      role: '',
      bears: 0,
      // Methods
      ...methods(set, get),
      addABear: () => set({ bears: get().bears + 1 }),
    }),
    {
      name: 'user-storage',
    },
  ),
);
