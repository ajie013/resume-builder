'use client';

import { Input } from "./ui/input";
import { ChangeEvent } from "react";
import { EducationInfo } from "@/types/Education";
import useEducationStore from "@/store/useEducationStore";
import { Button } from "./ui/button";
import IdGenerator from "@/utils/idGenerator";
import { Label } from "./ui/label";
import {  X } from "lucide-react";
import toast from "react-hot-toast";

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
        <div className="space-y-4 p-4 rounded-xl bg-white dark:bg-primary-background shadow-sm">
            <div>
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                    Educational Background
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                    Add your educational history, starting from the most recent.
                </p>
            </div>

            <div className="space-y-6">
                {educationList.map((item, index) => (
                    <EducationItem key={item.id} item={item} index={index} />
                ))}

               
            </div>
             <Button onClick={handleAddEducation}>
                    Add Education
                </Button>
        </div>
    );
}

const EducationItem = ({ item, index }: { item: EducationInfo, index: number }) => {
    const { updateEducation, deleteEducation } = useEducationStore();

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        updateEducation(item.id, { [name]: value});
    };

    const handleDeleteEducation = () =>{
        deleteEducation(item.id)
        toast.success("Education item deleted")
    }

    return (
        <div className="relative space-y-4 border p-6 rounded-lg bg-gray-50 dark:bg-primary-foregound/50 shadow-sm">
            <div className="grid gap-2">
                 {index > 0 && <X  className='cursor-pointer hover:scale-125 transition-all duration-500  absolute top-2 right-2 size-4 text-red-600' onClick={handleDeleteEducation}/>  }
                <Label htmlFor={`level-${item.id}`}>Educational Level</Label>
                <Input
                    id={`level-${item.id}`}
                    name="level"
                    placeholder="e.g., College, High School"
                    value={item.level}
                    onChange={handleChange}
                />
            </div>

            <div className="grid gap-2">
                <Label htmlFor={`school-${item.id}`}>School or University</Label>
                <Input
                    id={`school-${item.id}`}
                    name="school"
                    placeholder="e.g., University of the Philippines"
                    value={item.school}
                    onChange={handleChange}
                />
            </div>

            <div className="grid gap-2">
                <Label htmlFor={`degree-${item.id}`}>Degree (Optional)</Label>
                <Input
                    id={`degree-${item.id}`}
                    name="degree"
                    placeholder="e.g., BS in Computer Science"
                    value={item.degree}
                    onChange={handleChange}
                />
            </div>

            <div className="grid gap-2">
                <Label htmlFor={`year-${item.id}`}>Years Attended</Label>
                <Input
                    id={`year-${item.id}`}
                    name="year"
                    placeholder="e.g., 2020 - 2024"
                    value={item.year}
                    onChange={handleChange}
                />
            </div>
        </div>
    );
};
