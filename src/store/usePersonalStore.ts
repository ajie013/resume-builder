import { Personal } from '@/types/Personal';
import {create} from 'zustand'

interface PersonalStore{
    personalInfo: Personal

    updatePersonalInfo: (data: Partial<Personal>) => void
}
const usePersonalStore = create<PersonalStore>((set) => ({
    personalInfo:{
        name: '',
        phone: '',
        email: '',
        address: '',
        summary: ''
    },

    updatePersonalInfo: (data) => set((state) =>({
        personalInfo: {...state.personalInfo, ...data}
    }))
}));

export default usePersonalStore

