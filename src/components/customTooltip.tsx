"use client"

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import React from "react"

export default function CustomTooltip({trigger, text}: {trigger: React.ReactNode, text: string}){
    return(
        <>
            <Tooltip >
                <TooltipTrigger>{trigger}</TooltipTrigger>
                <TooltipContent>
                    <p>{text}</p>
                </TooltipContent>
            </Tooltip>
        </>
    )
}