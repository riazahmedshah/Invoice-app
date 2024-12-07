/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { Popover } from "@radix-ui/react-popover";
import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import { Calendar } from "./ui/calendar";
import { CalendarIcon } from "lucide-react";
import { useActionState, useState } from "react";
import { Textarea } from "./ui/textarea";
import SubmitButton from "./SubmitButton";

import {cretaeInvoice} from "@/app/actions/createInvoice"
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { invoiceSchema } from "@/app/utils/zodSchemas";
import { useformatCurrency } from "@/app/utils/hooks/useformatCurrency";

export function CreateInvoice(){
    const [lastResult, action] = useActionState(cretaeInvoice, undefined)
    const [form, fields] = useForm({
        lastResult,

        onValidate({formData}){
            return parseWithZod(formData,{
                schema: invoiceSchema,
            })
        },

        shouldValidate:"onBlur",
        shouldRevalidate: "onInput"
    })
    const[selectedDate, setSelectedDate] = useState(new Date());

    const [rate, setRate] = useState("");
    const [quantity, setQuantity] = useState("");

    const [currency, setCurrency] = useState("INR")

    const calTotal = (Number(quantity) || 0) * (Number(rate) || 0);

    return(
        <Card className="w-full max-w-4xl mx-auto">
            <CardContent className="p-6">
                <form id={form.id} action={action} onSubmit={form.onSubmit} noValidate>
                    <input type="hidden" name={fields.date.name} value={selectedDate.toISOString()}/>
                    <input type="hidden" 
                        name={fields.total.name} 
                        value={calTotal}
                    />
                <div className="flex flex-col gap-1 w-fit mb-6">
                    <div className="flex items-center gap-4">
                        <Badge className="" variant="secondary">Draft</Badge>
                        <Input 
                            name={fields.invoiceName.name} 
                            key={fields.invoiceName.key}
                            defaultValue={fields.invoiceName.initialValue}
                            placeholder="Test 123"
                        />
                    </div>
                    <p className="text-sm text-red-500">{fields.invoiceName.errors}</p>
                </div>

                <div className="grid md:grid-cols-3 gap-6 mb-6">
                    <div>
                        <Label>Invoice No.</Label>
                        <div className="flex">
                            <span className="px-3 border-r-0 rounded-l-md bg-muted 
                                flex items-center">#</span>
                            <Input 
                                name={fields.invoiceNumber.name} 
                                key={fields.invoiceNumber.key}
                                defaultValue={fields.invoiceNumber.initialValue}
                                className="rounded-l-none" placeholder="5"/>
                        </div>
                        <p className="text-sm text-red-500">{fields.invoiceNumber.errors}</p>
                    </div>
                    <div>
                        <Label>Currency</Label>
                        <Select defaultValue="INR" 
                            name={fields.currency.name}
                            key={fields.currency.key}
                            onValueChange={(value) => setCurrency(value)}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select Currency"/>
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="USD"> United State Dollar --USD</SelectItem>
                                <SelectItem value="INR"> Indian Rupees --INR</SelectItem>
                                <SelectItem value="EUR"> Euro --EUR</SelectItem>
                            </SelectContent>
                        </Select>
                        <p className="text-sm text-red-500">{fields.currency.errors}</p>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div>
                        <Label>From</Label>
                        <div className="space-y-2">
                            <Input 
                                name={fields.fromName.name} 
                                key={fields.fromName.key}
                                defaultValue={fields.fromName.initialValue}
                                placeholder="Your Name"/>
                                <p className="text-sm text-red-500">{fields.fromName.errors}</p>
                            <Input 
                                name={fields.fromEmail.name} 
                                key={fields.fromEmail.key}
                                defaultValue={fields.fromEmail.initialValue}
                                placeholder="Your Email"/>
                                <p className="text-sm text-red-500">{fields.fromEmail.errors}</p>
                            <Input 
                                name={fields.fromAddress.name} 
                                key={fields.fromAddress.key}
                                defaultValue={fields.fromAddress.initialValue}
                                placeholder="Your Address"/>
                                <p className="text-sm text-red-500">{fields.fromAddress.errors}</p>
                        </div>
                    </div>
                    <div className="">
                        <Label>To</Label>
                        <div className="space-y-2">
                            <Input 
                                name={fields.clientName.name} 
                                key={fields.clientName.key}
                                defaultValue={fields.clientName.initialValue}
                                placeholder="Client Name"/>
                                <p className="text-sm text-red-500">{fields.clientName.errors}</p>
                            <Input 
                                name={fields.clientEmail.name} 
                                key={fields.clientEmail.key}
                                defaultValue={fields.clientEmail.initialValue}
                                placeholder="Client Email"/>
                                <p className="text-sm text-red-500">{fields.clientEmail.errors}</p>
                            <Input 
                                name={fields.clientAddress.name} 
                                key={fields.clientAddress.key}
                                defaultValue={fields.clientAddress.initialValue}
                                placeholder="Client Address"/>
                                <p className="text-sm text-red-500">{fields.clientAddress.errors}</p>
                        </div>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div>
                        <div>
                            <Label>Date</Label>
                        </div>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button variant="outline" className="w-[280px] text-left justify-start">
                                        <CalendarIcon/>

                                        {
                                            selectedDate ? (
                                                // <p>{selectedDate.toDateString()}</p> Fri Dec 06 2024
                                                new Intl.DateTimeFormat("en-IN",{
                                                    dateStyle:"long",
                                                }).format(selectedDate)
                                            ) : (
                                                <span>Pick a date</span>
                                            )
                                        }
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent>
                                    <Calendar 
                                        mode="single" 
                                        selected={selectedDate} 
                                        onSelect={(date) => setSelectedDate(date || new Date())}
                                        fromDate={new Date()}
                                        />
                                </PopoverContent>
                            </Popover>
                            <p className="text-sm text-red-500">{fields.date.errors}</p>
                    </div>

                    <div>
                        <Label>Invoice Due</Label>
                        <Select 
                            name={fields.dueDate.name} 
                            key={fields.dueDate.key} 
                            defaultValue={fields.dueDate.initialValue}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select due date"/>
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="0">Due on Reciept</SelectItem>
                                <SelectItem value="15">Net 15</SelectItem>
                                <SelectItem value="30">Net 30</SelectItem>
                            </SelectContent>
                        </Select>
                        <p className="text-sm text-red-500">{fields.dueDate.errors}</p>
                    </div>
                </div>

                <div>
                    <div className="grid grid-cols-12 gap-4 mb-2 font-medium">
                        <p className="col-span-6">Description</p>
                        <p className="col-span-2">Quantity</p>
                        <p className="col-span-2">Rate</p>
                        <p className="col-span-2">Amount</p>
                    </div>
                    <div className="grid grid-cols-12 gap-4 mb-4">
                        <div className="col-span-6">
                            <Textarea 
                                name={fields.invoiceItemDescription.name}
                                key={fields.invoiceItemDescription.key}
                                defaultValue={fields.invoiceItemDescription.initialValue}
                                placeholder="Item name & description"/>
                                <p className="text-sm text-red-500">{fields.invoiceItemDescription.errors}</p>
                        </div>
                        <div className="col-span-2">
                            <Input 
                                name={fields.invoiceItemQuantity.name}
                                key={fields.invoiceItemQuantity.key}
                                value={quantity}
                                onChange={(e) => setQuantity(e.target.value)}
                                //defaultValue={fields.invoiceItemQuantity.initialValue}
                                type="number" placeholder="0"/>
                                <p className="text-sm text-red-500">{fields.invoiceItemQuantity.errors}</p>
                        </div>
                        <div className="col-span-2">
                            <Input 
                                name={fields.invoiceItemRate.name}
                                key={fields.invoiceItemRate.key}
                                value={rate}
                                onChange={(e) => setRate(e.target.value)}
                                //defaultValue={fields.invoiceItemRate.initialValue}
                                type="number" placeholder="0"/>
                                <p className="text-sm text-red-500">{fields.invoiceItemRate.errors}</p>
                        </div>
                        <div className="col-span-2">
                            <Input 
                                value={useformatCurrency({
                                    amount: calTotal, 
                                    currency: currency as any
                                })}
                                placeholder="0" disabled/>
                        </div>
                    </div>
                </div>

                <div className="flex justify-end">
                    <div className="w-1/3">
                        <div className="flex justify-between py-2">
                            <span>SubTotal</span>
                            <span>{useformatCurrency({
                                amount: calTotal,
                                currency:currency as any
                            })}</span>
                        </div>
                        <div className="flex justify-between py-2 border-t">
                            <span>Total ({currency})</span>
                            <span className="font-medium underline underline-offset-2">{useformatCurrency({
                                amount:calTotal,
                                currency: currency as any
                                })}</span>
                        </div>
                    </div>
                </div>
                <div>
                    <Label>Note</Label>
                    <Textarea
                        name={fields.note.name}
                        key={fields.note.key}
                        defaultValue={fields.note.initialValue}
                        placeholder="Add your Notes here..."/>
                        <p className="text-sm text-red-500">{fields.note.errors}</p>
                </div>

                <div className="flex items-center justify-end mt-6">
                    <div>
                        <SubmitButton text="Send Invoice to client"/>
                    </div>
                </div>
                </form>
            </CardContent>
        </Card>
    )
}