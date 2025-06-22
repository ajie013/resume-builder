'use client';

import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Switch } from './ui/switch';
import { Button } from './ui/button';
import type { ChangeEvent } from 'react';
import useExperienceStore from '@/store/useExperienceStore';
import { ExperienceInfo } from '@/types/Experience';
import IdGenerator from '@/utils/idGenerator';
import { Label } from './ui/label';
import { X } from 'lucide-react';
import toast from 'react-hot-toast';

export default function ExperienceTab() {
    const {
        noExperience,
        setNoExperience,
        experienceList,
        addExperience,
    } = useExperienceStore();

    const handleAddExperience = () => {
        const newExperience: ExperienceInfo = {
            id: IdGenerator(),
            companyName: '',
            jobTitle: '',
            year: '',
            description: '',
        };
        addExperience(newExperience);
        toast.success("New experience added")
    };

    const mockSkill: ExperienceInfo = {
        id: IdGenerator(),
        companyName: '',
        jobTitle: '',
        year: '',
        description: '',
    };

    return (
        <div className="space-y-4 p-4 rounded-xl bg-white dark:bg-primary-background shadow-sm">
            <div className="flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                <div>
                    <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                        Experience
                    </h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        Add your relevant job experience below, or toggle if you have none.
                    </p>
                </div>

                <div className="flex items-center justify-end gap-2 mt-2">
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                        No Experience
                    </span>
                    <Switch
                        checked={noExperience}
                        onCheckedChange={setNoExperience}
                    />
                </div>
            </div>

            {noExperience ? (
                <ExperienceItem isDisabled={true} item={mockSkill} index={0}/>
            ) : (
                <div className="space-y-6">
                    {experienceList.map((item, index) => (
                        <ExperienceItem key={item.id} item={item} index={index} />
                    ))}
                    <Button onClick={handleAddExperience}>
                        Add Experience
                    </Button>
                </div>
            )}
        </div>
    );
}

interface ExperienceItemProps {
    item: ExperienceInfo;
    isDisabled?: boolean;
    index: number
}

const ExperienceItem = ({ item, isDisabled = false, index }: ExperienceItemProps) => {
    const { updateExperience, deleteExperience } = useExperienceStore();

    const handleChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        updateExperience(item.id, { [name]: value });
    };

    const handleDeleteExperience = () =>{
        deleteExperience(item.id)
        toast.success("Experience item deleted")
    };

    return (
        <div className="relative space-y-4 border p-6 rounded-lg bg-gray-50 dark:bg-primary-foregound/50 shadow-sm">
            {index > 0 && <X className='cursor-pointer hover:scale-125 transition-all duration-500  absolute top-2 right-2 size-4 text-red-600' onClick={handleDeleteExperience}/> }
          
            <div className="grid gap-2">
                <Label htmlFor={`company-${item.id}`}>Company Name</Label>
                <Input
                    id={`company-${item.id}`}
                    name="companyName"
                    placeholder="e.g., Google"
                    value={item.companyName}
                    onChange={handleChange}
                    disabled={isDisabled}
                />
            </div>

            <div className="grid gap-2">
                <Label htmlFor={`title-${item.id}`}>Job Title</Label>
                <Input
                    id={`title-${item.id}`}
                    name="jobTitle"
                    placeholder="e.g., Front-End Developer"
                    value={item.jobTitle}
                    onChange={handleChange}
                    disabled={isDisabled}
                />
            </div>

            <div className="grid gap-2">
                <Label htmlFor={`year-${item.id}`}>Years</Label>
                <Input
                    id={`year-${item.id}`}
                    name="year"
                    placeholder="e.g., 2021 – 2024"
                    value={item.year}
                    onChange={handleChange}
                    disabled={isDisabled}
                />
            </div>

            <div className="grid gap-2">
                <Label htmlFor={`desc-${item.id}`}>Job Description</Label>
                <Textarea
                    id={`desc-${item.id}`}
                    name="description"
                    placeholder="Describe your key responsibilities, achievements, tech stack, etc."
                    value={item.description}
                    onChange={handleChange}
                    rows={4}
                    disabled={isDisabled}
                />
            </div>
        </div>
    );
};
