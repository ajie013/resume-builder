"use client"

import { ModeToggle } from "./mode-toggle";

export default function Navigation(){
    return(
        <>
            <header className="fixed top-0 left-0 right-0 h-[70px] p-2">

                    <ModeToggle/>
            </header>
        </>
    )
}