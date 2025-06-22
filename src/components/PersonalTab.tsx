'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from './ui/textarea';
import usePersonalStore from '@/store/usePersonalStore';
import type { ChangeEvent } from 'react';

export default function PersonalTab() {
    const { personalInfo, updatePersonalInfo } = usePersonalStore();

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        updatePersonalInfo({ [name]: value });
    };

    return (
        <div className="space-y-6 p-4 rounded-xl bg-white dark:bg-primary-background shadow-sm">
            <div>
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                    Personal Information
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                    Fill in your basic personal details below.
                </p>
            </div>

            <div className="space-y-4">
                <div className="grid gap-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                        id="name"
                        name="name"
                        placeholder="e.g. Juan Dela Cruz"
                        value={personalInfo.name}
                        onChange={handleChange}
                    />
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="address">Address</Label>
                    <Input
                        id="address"
                        name="address"
                        placeholder="e.g. 123 Rizal St., Manila"
                        value={personalInfo.address}
                        onChange={handleChange}
                    />
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                        id="phone"
                        name="phone"
                        placeholder="e.g. +63 912 345 6789"
                        value={personalInfo.phone}
                        onChange={handleChange}
                    />
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                        id="email"
                        name="email"
                        placeholder="e.g. juan@email.com"
                        value={personalInfo.email}
                        onChange={handleChange}
                    />
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="summary">Professional Summary</Label>
                    <Textarea
                        id="summary"
                        name="summary"
                        placeholder="Briefly describe your professional background, goals, or skills."
                        value={personalInfo.summary}
                        onChange={handleChange}
                        rows={4}
                    />
                </div>
            </div>
        </div>
    );
}
