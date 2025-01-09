import prisma from "@/app/utils/db";
import { Graph } from "./Graph";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import requireUser from "@/app/utils/hooks/requireUserHook";

async function getInvoices(userId:string){
    const rawData = await prisma.invoice.findMany({
        where:{
            status:"PAID",
            userId: userId,
            createdAt: {
                lte: new Date(),
                gte: new Date(Date.now() - 30*24*60*60*1000)
            }

        },
        select:{
            createdAt:true,
            total: true,

        },
        orderBy:{
            createdAt:"asc"
        }
    });

    // Group and aggregate data by date

    const aggregateData = rawData.reduce((acc:{[key:string]: number},curr) => {
        const date = new Date(curr.createdAt).toLocaleDateString("en-IN",{
            month:"short",
            day:'numeric'
        });

        acc[date] = (acc[date] || 0) + curr.total;
        return acc;
    },{});

    // convert to array and form the object
    const transformData = Object.entries(aggregateData).map(([date,amount]) => ({
        date,
        amount,
        originalDate : new Date(date + ", " + new Date().getFullYear()),

    })).sort((a,b) => a.originalDate.getTime() - b.originalDate.getTime())
    .map(({date,amount}) => ({
        date,
        amount,
    }));
    
    return aggregateData;
};



export async function Invoicegraph() {
    const session = await requireUser();
    const data = await getInvoices(session.user?.id as string);
    console.log(data);
    return(
        <Card className="col-span-2">
            <CardHeader>
                <CardTitle>Paid Invoices</CardTitle>
                <CardDescription>
                    Invoice which have been paid in the last 30 days.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Graph/>
            </CardContent>
        </Card>
    )
}