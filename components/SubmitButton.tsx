"use client"
import { useFormStatus } from "react-dom";
import { Button } from "./ui/button";

import { Loader2 } from "lucide-react"


interface iAppProps {
    text: string;
    variant?: "link" | "default" | "destructive" | "outline" | "secondary" | "ghost" | null | undefined
}

export default function SubmitButton({ text, variant }: iAppProps) {
    const { pending } = useFormStatus();


    return (
        <div className="flex flex-col w-full">
            {pending ? (
                <Button disabled className="w-full" variant={variant}>
                    <Loader2 className="size-4 animate-spin" /> Please wait...
                </Button>
            ) : (
                <Button type="submit" className="w-full" variant={variant}>{text}</Button>
            )
            }
        </div>
    )
}