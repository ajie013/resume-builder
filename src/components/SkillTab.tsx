'use client';

import { useState, ChangeEvent } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import useSkillStore from "@/store/useSkillStore";
import IdGenerator from "@/utils/idGenerator";
import { Skill } from "@/types/Skill";

export default function SkillsTab() {
    const { skills, addSkill } = useSkillStore();
    const [newSkill, setNewSkill] = useState("");

    const handleAddSkill = () => {
        const skillTrimmed = newSkill.trim();
        if (skillTrimmed === '') {
            return toast.error('Skill field cannot be empty');
        }

        const newSkillItem: Skill = {
            id: IdGenerator(),
            skill: skillTrimmed
        };

        addSkill(newSkillItem);
        setNewSkill('');
        toast.success("New skill added");
    };

    return (
        <div className="space-y-4 p-4 rounded-xl bg-white dark:bg-primary-background shadow-sm">
            <div>
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                    Skills
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                    List the technical or soft skills relevant to your profession.
                </p>
            </div>

            <div className="flex gap-2">
                <Input
                    placeholder="Enter a skill (e.g., React, Tailwind)"
                    value={newSkill}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        setNewSkill(e.target.value)
                    }
                />
                <Button onClick={handleAddSkill}>
                    Add
                </Button>
            </div>

            <div className="flex flex-col gap-2">
                {skills.map((skill) => (
                    <SkillItem key={skill.id} skill={skill} />
                ))}
            </div>
        </div>
    );
}

const SkillItem = ({ skill }: { skill: Skill }) => {
    const { removeSkill } = useSkillStore();
    const [showDelete, setShowDelete] = useState(false);

    return (
        <div
            onMouseEnter={() => setShowDelete(true)}
            onMouseLeave={() => setShowDelete(false)}
            className="group flex justify-between items-center bg-gray-100 dark:bg-primary-foregound/50 border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-2 shadow-sm transition hover:bg-gray-200 dark:hover:bg-primary-foregound"
        >
            <span className="text-sm font-medium text-gray-800 dark:text-white">
                {skill.skill}
            </span>

            {showDelete && (
                <button
                    onClick={() => removeSkill(skill.id)}
                    className="ml-2 p-1 rounded hover:bg-red-100 dark:hover:bg-red-500/20 transition"
                    aria-label="Delete skill"
                >
                    <Trash2 className="cursor-pointer w-4 h-4 text-red-600 dark:text-red-400" />
                </button>
            )}
        </div>
    );
};
