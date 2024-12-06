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
import { useState } from "react";
import { Textarea } from "./ui/textarea";
import SubmitButton from "./SubmitButton";

export function CreateInvoice(){
    const[selectedDate, setSelectedDate] = useState(new Date())
    return(
        <Card className="w-full max-w-4xl mx-auto">
            <CardContent className="p-6">
                <div className="flex flex-col gap-1 w-fit mb-6">
                    <div className="flex items-center gap-4">
                        <Badge className="" variant="secondary">Draft</Badge>
                        <Input placeholder="Test 123"/>
                    </div>
                </div>

                <div className="grid md:grid-cols-3 gap-6 mb-6">
                    <div>
                        <Label>Invoice No.</Label>
                        <div className="flex">
                            <span className="px-3 border-r-0 rounded-l-md bg-muted 
                                flex items-center">#</span>
                            <Input className="rounded-l-none" placeholder="5"/>
                        </div>
                    </div>
                    <div>
                        <Label>Currency</Label>
                        <Select defaultValue="INR">
                            <SelectTrigger>
                                <SelectValue placeholder="Select Currency"/>
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="USD"> United State Dollar --USD</SelectItem>
                                <SelectItem value="INR"> Indian Rupees --INR</SelectItem>
                                <SelectItem value="EUR"> Euro --EUR</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div>
                        <Label>From</Label>
                        <div className="space-y-2">
                            <Input placeholder="Your Name"/>
                            <Input placeholder="Your Email"/>
                            <Input placeholder="Your Address"/>
                        </div>
                    </div>
                    <div className="">
                        <Label>To</Label>
                        <div className="space-y-2">
                            <Input placeholder="Client Name"/>
                            <Input placeholder="Client Email"/>
                            <Input placeholder="Client Address"/>
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
                    </div>

                    <div>
                        <Label>Invoice Due</Label>
                        <Select>
                            <SelectTrigger>
                                <SelectValue placeholder="Select due date"/>
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="0">Due on Reciept</SelectItem>
                                <SelectItem value="15">Net 15</SelectItem>
                                <SelectItem value="30">Net 30</SelectItem>
                            </SelectContent>
                        </Select>
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
                            <Textarea placeholder="Item name & description"/>
                        </div>
                        <div className="col-span-2">
                            <Input type="number" placeholder="0"/>
                        </div>
                        <div className="col-span-2">
                            <Input type="number" placeholder="0"/>
                        </div>
                        <div className="col-span-2">
                            <Input type="number" placeholder="0" disabled/>
                        </div>
                    </div>
                </div>

                <div className="flex justify-end">
                    <div className="w-1/3">
                        <div className="flex justify-between py-2">
                            <span>Sub Total</span>
                            <span>$5.00</span>
                        </div>
                        <div className="flex justify-between py-2 border-t">
                            <span>Total (USD)</span>
                            <span className="font-medium underline underline-offset-2">$5.00</span>
                        </div>
                    </div>
                </div>
                <div>
                    <Label>Note</Label>
                    <Textarea placeholder="Add your Notes here..."/>
                </div>

                <div className="flex items-center justify-end mt-6">
                    <div>
                        <SubmitButton text="Send Invoice to client"/>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}