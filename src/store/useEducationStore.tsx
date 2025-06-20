import { EducationInfo } from '@/types/Education';
import IdGenerator from '@/utils/idGenerator';
import {create} from 'zustand'

interface EducationStore{
    educationList: EducationInfo[]

    addEducation: (data: EducationInfo) => void
    updateEducation: (id:number, data: Partial<EducationInfo>) => void
}

const useEducationStore = create<EducationStore>((set) => ({
    educationList:[
        {
            id: IdGenerator(),
            level: '',
            degree: '',
            school: '',
            year: ''
        }
    ], 
    
    addEducation: (data) => set((state) => ({
        educationList: [...state.educationList, data]
    })),

    updateEducation: (id, data) => set((state) =>({
        educationList: state.educationList.map((item) => id === item.id ? {...item, ...data} : item)
    }))

}));

export default useEducationStore