"use client";

import toast, { Toaster } from "react-hot-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PersonalTab from "@/components/PersonalTab";
import { Button } from "@/components/ui/button";
import EducationTab from "@/components/EducationTab";
import ExperienceTab from "@/components/ExperienceTab";
import { ThemeProvider } from "@/components/theme-provide";

import SkillsTab from "@/components/SkillTab";
import useExperienceStore from "@/store/useExperienceStore";
import usePersonalStore from "@/store/usePersonalStore";
import useEducationStore from "@/store/useEducationStore";
import useSkillStore from "@/store/useSkillStore";
import Navigation from "./NavigationBar";

import {jsPDF} from 'jspdf'

export default function MainClient() {

    const doc = new jsPDF();

    const {experienceList, noExperience} = useExperienceStore();
    const {personalInfo} = usePersonalStore();
    const {educationList} = useEducationStore();
    const {skills} = useSkillStore();

    const centerText = (text: string) =>{
       
        const textWidth = doc.getTextWidth(text);
        const pageWidth = doc.internal.pageSize.getWidth();
        const xOffset = (pageWidth - textWidth) / 2;
        return xOffset
    }

    const isValidPersonal = () =>{
        let isValid = true;

        if(!personalInfo.name || !personalInfo.email || !personalInfo.address || !personalInfo.phone || !personalInfo.summary){
            isValid = false;
            toast.error("Personal Information fields are required");
        };
      
        return isValid;
    }

    const isValidExperience =  () =>{
        let isValid = true;

        if(!noExperience){
            experienceList.map((item)=>{
                if(!item.companyName || !item.description || !item.jobTitle || !item.year){
                    isValid = false;
                    toast.error("Experience fields are required");
                }
            })
        };

        return isValid;
    };

    const isValidEducation = () =>{
        let isValid = true;

        educationList.map((item)=>{
            if(!item.level || !item.school || !item.year){
                isValid = false;
                toast.error("Education fields are required");
            }
        })

        return isValid;
    };

    const isValidSkill = () =>{
        let isValid = true;

        if(skills.length <= 0 ){
            isValid = false;
            toast.error("Skills are required");
        }

        return isValid;
    }

    const generateResume = () => {
       

        const isAllValid = isValidPersonal()  && isValidEducation() && isValidExperience() && isValidSkill();

        if(!isAllValid){
           return;
        }

        const pageHeight = doc.internal.pageSize.height;
        let yOffset = 20;
    
        const checkPageLimit = (requiredSpace: number) => {
            if (yOffset + requiredSpace > pageHeight - 20) {  
                doc.addPage();
                yOffset = 20; 
            }
        };
    
        // --- Personal Information ---
        doc.setFont("helvetica", "bold");
        doc.setFontSize(24);
        doc.text(personalInfo.name, centerText(personalInfo.name), yOffset);
        yOffset += 10;
    
        doc.setFont("helvetica", "normal");
        doc.setFontSize(12);
        doc.text(`${personalInfo.address} | ${personalInfo.phone} | ${personalInfo.email}`, centerText(`${personalInfo.address} | ${personalInfo.phone} | ${personalInfo.email}`), yOffset);
        yOffset += 15;
    
        // --- Summary Section ---
        checkPageLimit(30);
        doc.setFont("helvetica", "bold");
        doc.setFontSize(16);
        doc.text("Summary", 20, yOffset);
        yOffset += 5;
        doc.setLineWidth(1.5);
        doc.line(20, yOffset, 190, yOffset);
        yOffset += 10;
    
        doc.setFontSize(12);
        doc.setFont("helvetica", "normal");
    
        const summaryLines = doc.splitTextToSize(personalInfo.summary || "No summary provided.", 170);
        checkPageLimit(summaryLines.length * 6);
        doc.text(summaryLines, 20, yOffset);
        yOffset += summaryLines.length * 6 + 10;
    
        // --- Education Section ---
        if (educationList.length > 0) {
            checkPageLimit(30);
            doc.setFont("helvetica", "bold");
            doc.setFontSize(16);
            doc.text("Education", 20, yOffset);
            yOffset += 5;
            doc.line(20, yOffset, 190, yOffset);
            yOffset += 10;
    
            doc.setFontSize(12);
            doc.setFont("helvetica", "normal");
    
            educationList.forEach((edu) => {
                const eduLines = [
                    edu.level,
                    edu.school,
                    edu.year,
                    edu.degree || ""
                ].filter(Boolean);
    
                checkPageLimit(eduLines.length * 6 + 10);
                doc.text(eduLines, 20, yOffset);
                yOffset += eduLines.length * 6 + 5;
            });
    
            yOffset += 10;
        }
    
        // --- Experience Section ---
        if(!noExperience){
            if (experienceList.length > 0) {
                        checkPageLimit(30);
                        doc.setFont("helvetica", "bold");
                        doc.setFontSize(16);
                        doc.text("Experience", 20, yOffset);
                        yOffset += 5;
                        doc.line(20, yOffset, 190, yOffset);
                        yOffset += 10;
                
                        doc.setFontSize(12);
                        doc.setFont("helvetica", "normal");
                
                        experienceList.forEach((exp) => {
                            const expLines = [
                                `${exp.companyName} | ${exp.year}`,
                                exp.jobTitle,
                                ...doc.splitTextToSize(exp.description, 170)
                            ];
                
                            checkPageLimit(expLines.length * 6 + 10);
                            doc.text(expLines, 20, yOffset);
                            yOffset += expLines.length * 6 + 5;
                        });
                
                        yOffset += 10;
                }
        }
      
    
        // --- Skills Section ---
        if (skills.length > 0) {
            checkPageLimit(30);
            doc.setFont("helvetica", "bold");
            doc.setFontSize(16);
            doc.text("Technical Skills", 20, yOffset);
            yOffset += 5;
            doc.line(20, yOffset, 190, yOffset);
            yOffset += 10;
    
            doc.setFontSize(12);
            doc.setFont("helvetica", "normal");
    
            skills.forEach((skill) => {
                checkPageLimit(10);
                doc.text(`• ${skill.skill}`, 20, yOffset);
                yOffset += 5;
            });
    
            yOffset += 15;
        }

        const blob = doc.output('blob');
        const blobUrl = URL.createObjectURL(blob);
        window.open(blobUrl, '_blank'); 
      
       
    };

    return (
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
            <div className="p-4 w-full min-h-screen flex justify-center items-center bg-white dark:bg-primary-background">
                
                <Navigation/>
                <div className="flex flex-col items-center gap-4">
                    <Tabs defaultValue="personal" className="w-[400px] h-[400px] border p-2">
                        <TabsList className="">
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
                    </Tabs>

                    <Button onClick={generateResume}>Generate Resume</Button>
                </div>
            </div>

            <Toaster />
        </ThemeProvider>
    );
}
