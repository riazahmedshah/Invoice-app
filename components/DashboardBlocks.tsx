import { Activity, CreditCard, DollarSign, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import prisma from "@/app/utils/db";
import requireUser from "@/app/utils/hooks/requireUserHook";


async function getData(userId:string){
    const [data,openInvoices,paidInvoices] = await Promise.all([
        prisma.invoice.findMany({
            where:{
                userId:userId,
            },
            select:{
                total:true,
            },
        }),
        prisma.invoice.findMany({
            where:{
                userId:userId,
                status: "PENDING"
            },
            select:{
                id: true,
            }
        }),
        prisma.invoice.findMany({
            where:{
                userId:userId,
                status: "PAID"
            },
            select:{
                id: true,
            }
        }),
    ]);

    return{
        data,
        openInvoices,
        paidInvoices
    }
}



export async function DashboardBlocks(){
    const session = await requireUser()
    const {data,openInvoices,paidInvoices} = await getData(session.user?.id as string);
    return(
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 md:gap-8">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                    <DollarSign className="size-4 text-muted-foreground"/>
                </CardHeader>
                <CardContent>
                    <h2 className="text-2xl font-bold">
                        {data.reduce((acc,invoice) => acc + invoice.total,0)}.Rs
                    </h2>
                    <p className="text-sm text-muted-foreground">Based on the last 30 days</p>
                </CardContent>
            </Card>
            {/* seconr card */}
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total invoice issued</CardTitle>
                    <Users className="size-4 text-muted-foreground"/>
                </CardHeader>
                <CardContent>
                    <h2 className="text-2xl font-bold">
                        +{data.length}
                    </h2>
                    <p className="text-sm text-muted-foreground">Total Invoice Issued!</p>
                </CardContent>
            </Card>
            {/* third card */}
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Paid Invoices</CardTitle>
                    <CreditCard className="size-4 text-muted-foreground"/>
                </CardHeader>
                <CardContent>
                    <h2 className="text-2xl font-bold">
                        +{paidInvoices.length}
                    </h2>
                    <p className="text-sm text-muted-foreground">Total Invoice which have been paid!</p>
                </CardContent>
            </Card>
            {/* fourth card */}
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Open Invoices</CardTitle>
                    <Activity className="size-4 text-muted-foreground"/>
                </CardHeader>
                <CardContent>
                    <h2 className="text-2xl font-bold">
                        +{openInvoices.length}
                    </h2>
                    <p className="text-sm text-muted-foreground">TInvoices which have not been paid!</p>
                </CardContent>
            </Card>


            
        </div>
    )
}