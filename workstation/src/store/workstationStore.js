import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const defaultState = {
  isAuthenticated: false,
  id: null,
  token: null,
  authenticatedBy: null, // Staff Id
  previouslyAuthenticatedBy: null,
  title: '',
  info: {
    id: null,
    description: '',
    imageUrl: '',
  },
  usableApps: [],
};

const methods = (set) => ({
  authenticate: (wStation) =>
    set(() => ({
      isAuthenticated: true,
      id: wStation.id,
      token: wStation.token,
      authenticatedBy: wStation.authenticatedBy,
      previouslyAuthenticatedBy: wStation.previouslyAuthenticatedBy,
      title: wStation.title,
      info: {
        id: wStation.info.id,
        description: wStation.info.description,
        imageUrl: wStation.info.imageUrl,
      },
      usableApps: wStation.usableApps,
    })),
  logout: () => set(() => ({ ...defaultState })),
});

export const useWorkstationStore = create(
  persist(
    (set, get) => ({
      ...defaultState,
      // Methods
      ...methods(set, get),
    }),
    {
      name: 'workstation-storage',
    },
  ),
);
