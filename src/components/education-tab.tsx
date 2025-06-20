"use client";


import { Input } from "./ui/input";
import { ChangeEvent } from "react";
import { EducationInfo } from "@/types/Education";
import useEducationStore from "@/store/useEducationStore";
import { Button } from "./ui/button";
import IdGenerator from "@/utils/idGenerator";

export default function EducationTab() {
    const { educationList, addEducation } = useEducationStore();

    const handleAddEducation = () => {
        const newEducation: EducationInfo = {
            id: IdGenerator(),
            year: '',
            school: '',
            degree: '',
            level: ''
        };
        addEducation(newEducation);
    };

    return (
        <div className="space-y-4 h-auto">
            <h1 className="text-lg font-medium text-secondary-text dark:text-primary-text">
                Educational Background
            </h1>

            <div className="space-y-4">
                {educationList.map((item) => (
                    <EducationItem key={item.id} item={item} />
                ))}
                <Button onClick={handleAddEducation}>Add Education</Button>
            </div>
        </div>
    );
}

const EducationItem = ({ item }: { item: EducationInfo }) => {
    const { updateEducation } = useEducationStore();

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        updateEducation(item.id, { [name]: value });
    };

    return (
        <>
            <Input
                name="level"
                placeholder="Educational Level (e.g., College, High School)"
                value={item.level}
                onChange={handleChange}
            />

            <Input
                name="school"
                placeholder="School or University Name"
                value={item.school}
                onChange={handleChange}
            />

            <Input
                name="degree"
                placeholder="Degree (e.g., BS in Computer Science) (Optional)"
                value={item.degree}
                onChange={handleChange}
            />

            <Input
                name="year"
                placeholder="Years Attended (e.g., 2020 - 2024)"
                value={item.year}
                onChange={handleChange}
            />
        </>
    );
};
