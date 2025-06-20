"use client";

import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Switch } from "./ui/switch";
import { Button } from "./ui/button";
import type { ChangeEvent } from "react";
import useExperienceStore from "@/store/useExperienceStore";
import { ExperienceInfo } from "@/types/Experience";
import IdGenerator from "@/utils/idGenerator";

export default function ExperienceTab() {
    const { noExperience, setNoExperience, experienceList, addExperience } = useExperienceStore();

    const handleAddExperience = () => {
        const newExperience: ExperienceInfo = {
            id: IdGenerator(),
            companyName: '',
            jobTitle: '',
            year: '',
            description: ''
        };

        addExperience(newExperience);
    };

    return (
        <div className="space-y-4 h-auto">
            <h1 className="text-lg font-medium text-secondary-text dark:text-primary-text">
                Experience
            </h1>

            <div className="w-full flex items-center justify-end gap-1">
                <Switch checked={noExperience} onCheckedChange={setNoExperience} />
                <span className="text-[0.7rem]">No Experience</span>
            </div>

            {!noExperience && (
                <div className="space-y-4">
                    {experienceList.map((item) => (
                        <ExperienceItem key={item.id} item={item} />
                    ))}
                    <Button onClick={handleAddExperience}>Add Experience</Button>
                </div>
            )}
        </div>
    );
}

const ExperienceItem = ({ item }: { item: ExperienceInfo }) => {
    const { updateExperience } = useExperienceStore();

    const handleChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        updateExperience(item.id, { [name]: value });
    };

    return (
        <div className="space-y-2">
            <Input
                name="companyName"
                placeholder="Company Name"
                value={item.companyName}
                onChange={handleChange}
            />
            <Input
                name="jobTitle"
                placeholder="Job Title"
                value={item.jobTitle}
                onChange={handleChange}
            />
            <Input
                name="year"
                placeholder="Years Attended (e.g., 2020 - 2024)"
                value={item.year}
                onChange={handleChange}
            />
            <Textarea
                name="description"
                placeholder="Job Description"
                value={item.description}
                onChange={handleChange}
            />
        </div>
    );
};
