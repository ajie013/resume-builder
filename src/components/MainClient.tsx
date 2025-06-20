"use client";

import toast, { Toaster } from "react-hot-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PersonalTab from "@/components/personal-tab";
import { Button } from "@/components/ui/button";
import EducationTab from "@/components/education-tab";
import ExperienceTab from "@/components/experience-tab";
import { ThemeProvider } from "@/components/theme-provide";
import Navigation from "@/components/navigation";
import SkillsTab from "@/components/skills-tab";

export default function MainClient() {

   

    // const validatePersonalInfo = () =>{
        
    //     if(!personalInfo.name.trim()) return toast.error("Name is required");
    //     if(!personalInfo.address.trim()) return toast.error("Address is required");
    //     if(!personalInfo.phone.trim()) return toast.error("Phone number is required");
    //     if(!personalInfo.email.trim()) return toast.error("Email is required");
    //     if(!personalInfo.summary.trim()) return toast.error("Summary is required");
    // };

    //  const validateExperience = () =>{
        
      
    // };

    const generateResume = () =>{
        // validatePersonalInfo();
    }

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <Toaster/>
      <div className="p-4 w-full min-h-screen flex justify-center items-center bg-white dark:bg-primary-background">
        <Navigation />

        <Tabs defaultValue="personal" className="w-[400px] h-[400px] border p-2">
          <TabsList>
            <TabsTrigger value="personal">Personal</TabsTrigger>
            <TabsTrigger value="education">Education</TabsTrigger>
            <TabsTrigger value="experience">Experience</TabsTrigger>
            <TabsTrigger value="skills">Skills</TabsTrigger>
          </TabsList>

          <TabsContent value="personal" className="p-2 h-[300px] overflow-y-auto">
            <PersonalTab />
          </TabsContent>

          <TabsContent value="education" className="p-2 h-[300px] overflow-y-auto">
            <EducationTab />
          </TabsContent>

          <TabsContent value="experience" className="p-2 h-[300px] overflow-y-auto">
            <ExperienceTab />
          </TabsContent>

          <TabsContent value="skills" className="p-2 h-[300px] overflow-y-auto">
            <SkillsTab />
          </TabsContent>

          <Button onClick={generateResume} className="mx-auto block">Generate Resume</Button>
        </Tabs>
      </div>

      <Toaster />
    </ThemeProvider>
  );
}
