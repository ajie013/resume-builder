"use client";

import { useEffect, useState } from "react";
import { useInfoStore } from "@/store/useInfoStore";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Switch } from "./ui/switch";
import type { ChangeEvent } from "react";

export default function ExperienceTab() {
  const {
    experienceInfo,
    setExperienceInfo,
    noExperience,
    setNoExperience,
  } = useInfoStore();

  const [hasHydrated, setHasHydrated] = useState(false);

  useEffect(() => {
    setHasHydrated(true);
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setExperienceInfo({ [name]: value });
  };

  if (!hasHydrated) return null; 

  return (
    <div className="space-y-2 h-auto">
      <h1 className="text-lg font-medium text-secondary-text dark:text-primary-text">
        Experience
      </h1>
      <div className="w-full flex items-center justify-end gap-1">
        <Switch checked={noExperience} onCheckedChange={setNoExperience} />
        <span className="text-[0.7rem]">No Experience</span>
      </div>

      {!noExperience && (
        <>
          <Input
            name="companyName"
            placeholder="Company Name"
            value={experienceInfo.companyName}
            onChange={handleChange}
          />
          <Input
            name="jobTitle"
            placeholder="Job Title"
            value={experienceInfo.jobTitle}
            onChange={handleChange}
          />
          <Input
            name="year"
            placeholder="Years Attended (e.g., 2020 - 2024)"
            value={experienceInfo.year}
            onChange={handleChange}
          />
          <Textarea
            name="description"
            placeholder="Job Description"
            value={experienceInfo.description}
            onChange={handleChange}
          />
        </>
      )}
    </div>
  );
}
