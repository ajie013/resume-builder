"use client";

import { useEffect, useState, ChangeEvent, KeyboardEvent } from "react";
import { useInfoStore } from "@/store/useInfoStore";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { X } from "lucide-react";

export default function SkillsTab() {
  const { skills, setSkillsInfo } = useInfoStore();
  const [hasHydrated, setHasHydrated] = useState(false);
  const [newSkill, setNewSkill] = useState("");

  useEffect(() => {
    setHasHydrated(true);
  }, []);

  const handleAddSkill = () => {
    const trimmed = newSkill.trim();
    if (trimmed && !skills.includes(trimmed)) {
      setSkillsInfo(trimmed);
      setNewSkill("");
    }
  };


    if (!hasHydrated) return null;

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
        {skills.map((skill, index) => (
          <Badge key={index} variant="secondary" className="flex items-center gap-1 px-2 py-1">
            {skill}
          </Badge>
        ))}
      </div>
    </div>
  );
}
