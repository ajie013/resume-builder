import { Skill } from '@/types/Skill';
import {create} from 'zustand'

interface SkillStore{
    skills: Skill[]

    addSkill: (data: Skill) => void
    removeSkill: (id: number) => void
}

const useSkillStore = create<SkillStore>((set) =>({
    skills: [],

    addSkill: (data) => set((state) =>({
        skills: [...state.skills, data]
    })),

    removeSkill: (id) => set((state) =>({
        skills: state.skills.filter((item) => item.id !== id)
    }))

}));

export default useSkillStore