import { ExperienceInfo } from '@/types/Experience';
import IdGenerator from '@/utils/idGenerator';
import {create} from 'zustand'

interface ExperienceStore{
    noExperience: boolean
    setNoExperience: () => void

    experienceList: ExperienceInfo[]
    addExperience: (data: ExperienceInfo) => void
    updateExperience: (id: number,data: Partial<ExperienceInfo>) => void
    deleteExperience: (id: number) => void
}

const useExperienceStore = create<ExperienceStore>((set) =>({
    noExperience: false,

    setNoExperience: () => set((state) => ({noExperience: !state.noExperience})),

    experienceList:[
        {
            id: IdGenerator(),
            companyName: '',
            jobTitle: '',
            year: '',
            description: ''
        },
    ],

    addExperience: (data) => set((state) => ({experienceList: [...state.experienceList, data]})),

    updateExperience: (id, data) => set((state) => ({
        experienceList: state.experienceList.map((item) => id === item.id ? {...item, ...data} : item)
    })),

    deleteExperience: (id) => set((state) => ({
        experienceList: state.experienceList.filter((item) => id !== item.id)
    }))
}));

export default useExperienceStore