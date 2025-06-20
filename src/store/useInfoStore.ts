import { stat } from 'fs';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface PersonalInfo {
  name: string;
  address: string;
  email: string;
  phone: string;
  summary: string;
}

interface EducationInfo {
  level: string;
  degree?: string;
  school: string;
  year: string;
}

interface ExperienceInfo {
  companyName: string;
  year: string;
  jobTitle: string;
  description: string;
}


interface InfoStore {
  personalInfo: PersonalInfo;
  educationInfo: EducationInfo;
  experienceInfo: ExperienceInfo;
  noExperience: boolean;
  skills: string[] 
  setSkillsInfo: (update: string) => void
  setPersonalInfo: (update: Partial<PersonalInfo>) => void;
  setEducationInfo: (update: Partial<EducationInfo>) => void;
  setExperienceInfo: (update: Partial<ExperienceInfo>) => void;
  setNoExperience: () => void;
}

export const useInfoStore = create<InfoStore>()(

    (set) => ({
      noExperience: false,

      personalInfo: {
        name: '',
        address: '',
        email: '',
        phone: '',
        summary: ''
      },

      educationInfo: {
        level: '',
        degree: '',
        school: '',
        year: '',
      },

      experienceInfo: {
        companyName: '',
        year: '',
        jobTitle: '',
        description: ''
      },

      skills: [],

     setSkillsInfo: (update) =>
      set((state) => ({
        skills: [...state.skills, update]
      })),

      setNoExperience: () => set((state) => ({ noExperience: !state.noExperience })),

      setPersonalInfo: (update) => set((state) => ({
        personalInfo: { ...state.personalInfo, ...update },
      })),

      setEducationInfo: (update) => set((state) => ({
        educationInfo: { ...state.educationInfo, ...update }
      })),

      setExperienceInfo: (update) => set((state) => ({
        experienceInfo: { ...state.experienceInfo, ...update }
      })),
    }
  )
);
