"use client"

import { Toaster } from "react-hot-toast"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import PersonalTab from "@/components/personal-tab"

export default function Main(){
    return(
        <>
            <div className="w-full min-h-screen flex justify-center items-center bg-white dark:bg-primary-background">

                <Tabs defaultValue="personal" className="w-[400px] border border-black">
                    <TabsList>
                        <TabsTrigger value="personal">Personal</TabsTrigger>
                        <TabsTrigger value="education">Education</TabsTrigger>
                        <TabsTrigger value="experience">Experience</TabsTrigger>
                        <TabsTrigger value="skills">Skills</TabsTrigger>
                    </TabsList>

                    <TabsContent value="personal" className="p-5">
                        <PersonalTab/>

                    </TabsContent>

                    <TabsContent value="education" className="p-5">education

                    </TabsContent>

                      <TabsContent value="experience" className="p-5">experience

                    </TabsContent>

                      <TabsContent value="skills" className="p-5">skills

                    </TabsContent>
                </Tabs>
            </div>
            
            <Toaster/>
        </>
    )
}
