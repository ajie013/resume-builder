"use client";

import {  useState, ChangeEvent } from "react";

import { Input } from "./ui/input";
import { Button } from "./ui/button";

import { Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import CustomTooltip from "./customTooltip";
import useSkillStore from "@/store/useSkillStore";
import IdGenerator from "@/utils/idGenerator";

import { Skill } from "@/types/Skill";

export default function SkillsTab() {
  const { skills, addSkill } = useSkillStore()
 
  const [newSkill, setNewSkill] = useState("");

  const handleAddSkill = () => {
     const skillTrimmed = newSkill.trim();
      if(skillTrimmed === '') return toast.error('Skill field cannot be empty')
    const newSkillItem = {
      id: IdGenerator(),
      skill: skillTrimmed
    }

    addSkill(newSkillItem)
   

   ;

   
  };


  return (
    <div className="space-y-4 h-auto">
      <h1 className="text-lg font-medium text-secondary-text dark:text-primary-text">
        Skills
      </h1>

      <div className="flex gap-2">
        <Input
          placeholder="Enter a skill (e.g., React, Tailwind)"
          value={newSkill}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setNewSkill(e.target.value)}
        
        />
        <Button type="button" onClick={handleAddSkill}>
          Add
        </Button>
      </div>

      <div className="flex flex-wrap gap-2">
        {skills.map((skill: Skill, index) => (
            <CustomTooltip key={index} trigger={<SkillItem  skill={skill}/>} text="Delete skill"/>
        ))}
      </div>
    </div>
  );
}

const SkillItem = ({ skill }: {skill: Skill}) => {
  const { removeSkill } = useSkillStore();

  return (
   
    <div
      onClick={() => removeSkill(skill.id)}
      className="relative group cursor-pointer"
    >
      <div className="transition-all duration-200 bg-muted px-3 py-1 rounded text-sm font-medium text-muted-foreground group-hover:bg-red-500 group-hover:text-transparent">
        {skill.skill}
      </div>

      <Trash2
        className="absolute inset-0 m-auto h-4 w-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none"
      />
    </div>
  );
};