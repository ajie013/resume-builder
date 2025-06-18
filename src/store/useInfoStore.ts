// src/stores/useInfoStore.ts
import { create } from 'zustand';

export interface PersonalInfo {
  name: string;
  address: string;
  email: string;
  phone: string;
  summary: string;
}

interface InfoStore {
  personalInfo: PersonalInfo;
  setPersonalInfo: (update: Partial<PersonalInfo>) => void;
}

export const useInfoStore = create<InfoStore>((set) => ({
  personalInfo: {
    name: '',
    address: '',
    email: '',
    phone: '',
    summary: ''
  },

  setPersonalInfo: (update) =>
    set((state) => ({
      personalInfo: { ...state.personalInfo, ...update },
    })),
}));
