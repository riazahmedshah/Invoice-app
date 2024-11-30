"use client"

import SubmitButton from "@/components/SubmitButton";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useActionState } from "react";
import { onboardUser } from "../actions/onboarduser";
import { useForm } from "@conform-to/react"
import { parseWithZod } from "@conform-to/zod";
import { onboardingSchema } from "../utils/zodSchemas";

export default function Onboarding(){
    const [lastResult, action] = useActionState(onboardUser, undefined);
    const [form, fields] = useForm({
        lastResult,

        onValidate({formData}){
            return parseWithZod(formData,{
                schema: onboardingSchema,
            });
        },

        shouldValidate:"onBlur",
        shouldRevalidate:"onInput",
    })
    return(
        <div className="min-h-screen w-screen flex items-center justify-center px-4">
            <Card className="max-w-sm mx-auto">
                <CardHeader>
                    <CardTitle className="text-xl">You are almost finished!</CardTitle>
                    <CardDescription>Enter your information to create acccount </CardDescription>
                </CardHeader>
                <CardContent>
                    <form className="grid gap-4" action={action} id={form.id} onSubmit={form.onSubmit} noValidate>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex flex-col gap-2">
                                <Label className="font-semibold">First Name</Label>
                                <Input 
                                    name={fields.firstName.name} 
                                    key={fields.firstName.key}
                                    defaultValue={fields.firstName.initialValue}
                                    placeholder="Jhon"
                                />
                                <p className="text-red-500 text-sm py-1">{fields.firstName.errors}</p>
                            </div>
                            <div className="grid gap-2">
                                <Label className="font-semibold">Last Name</Label>
                                <Input
                                    name={fields.lastName.name}
                                    key={fields.lastName.key}
                                    defaultValue={fields.lastName.initialValue} 
                                    placeholder="Doe"
                                />
                                <p className="text-red-500 text-sm py-1">{fields.lastName.errors}</p>
                            </div>
                        </div>
                        
                        <div className="grid gap-2">
                            <Label className="font-semibold">Address</Label>
                            <Input 
                                name={fields.address.name}
                                key={fields.address.key}
                                defaultValue={fields.address.initialValue}
                                placeholder="3/2, street 12, California USA"
                            />
                            <p className="text-red-500 text-sm py-1">{fields.address.errors}</p>
                        </div>

                        <SubmitButton text="Finished onboardning"/>
                        
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}