"use client"

import { Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "./ui/chart";


// const data = [
//     {
//         date: "nov 5",
//         amount:"300"
//     },
//     {
//         date: "nov 7",
//         amount:"100"
//     },
//     {
//         date: "nov 7",
//         amount:"400"
//     },
//     {
//         date: "nov 7",
//         amount:"300"
//     },
    
// ]

interface iAppProps {
    data:{
        date:string;
        amount:number;
    }[]
}

export function Graph({data}: iAppProps){
    return(
        <ChartContainer config={{
            amount:{
                label:"Amount",
                color:"hsl(var(--primary))"
                //color:"#2563eb"
            },
        }}
        className="min-h-[300px]"
        >
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                    <XAxis dataKey="date"/>
                    <YAxis/>
                    <ChartTooltip content={<ChartTooltipContent indicator="line"/>}/>
                    <Line 
                        type="monotone"
                        dataKey="amount"
                        stroke="var(--color-amount)"
                        strokeWidth={2}
                    />
                </LineChart>
            </ResponsiveContainer>
        </ChartContainer>
    )
}