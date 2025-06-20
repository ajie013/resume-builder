"use client";

import { useInfoStore } from "@/store/useInfoStore";
import { Input } from "./ui/input";
import { ChangeEvent } from "react";

export default function EducationTab() {
  const { educationInfo, setEducationInfo } = useInfoStore();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEducationInfo({ ...educationInfo, [name]: value });
  };

  return (
    <div className="space-y-2 h-auto">
      <h1 className="text-lg font-medium text-secondary-text dark:text-primary-text">
        Educational Background
      </h1>

      <Input
        name="level"
        placeholder="Educational Level (e.g., College, High School)"
        value={educationInfo.level}
        onChange={handleChange}
      />

      <Input
        name="school"
        placeholder="School or University Name"
        value={educationInfo.school}
        onChange={handleChange}
      />

      <Input
        name="degree"
        placeholder="Degree (e.g., BS in Computer Science) (Optional)"
        value={educationInfo.degree || ""}
        onChange={handleChange}
      />

      <Input
        name="year"
        placeholder="Years Attended (e.g., 2020 - 2024)"
        value={educationInfo.year}
        onChange={handleChange}
      />


    </div>
  );
}
