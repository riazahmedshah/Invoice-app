"use client"
import { useFormStatus } from "react-dom";
import { Button } from "./ui/button";

import {Loader2} from "lucide-react"

export default function SubmitButton(){
    const {pending} = useFormStatus();

    
    return(
        <div className="flex flex-col w-full">
            {pending ? (
                <Button disabled>
                    <Loader2 className="size-4 animate-spin"/> Please wait...
                </Button>
            ) : (
                <Button type="submit">Submit</Button>
                )
            }
        </div>
    )
}