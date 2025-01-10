

import { DashboardBlocks } from "@/components/DashboardBlocks";
import requireUser from "../utils/hooks/requireUserHook";
import { Invoicegraph } from "@/components/InvoiceGraph";
import { RecentInvoices } from "@/components/RecentInvoice";
import prisma from "../utils/db";
import { EmptyState } from "@/components/EmptySTate";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";

async function getData(userId:string) {
    const data = await prisma.invoice.findMany({
        where:{
            userId:userId,
        },
        select:{
            id:true,
        }
    });
    return data;
}


export default async function Dashboard() {

    const session = await requireUser();
    const data = await getData(session.user?.id as string)
    return (
        <>
            {
                data.length < 1 ? (
                    <EmptyState 
                        title="No invoice found"
                        description="Create an Invoice to see it right here"
                        buttontext="Create Invoice"
                        href="/dashboard/invoices/create"/>
                ) : (
                <Suspense fallback={<Skeleton className="w-full h-full flex-1"/>}>
                    <DashboardBlocks/>
                        <div className="grid gap-4 lg:grid-cols-3 md:gap-8">
                            <Invoicegraph/>
                            <RecentInvoices/>
                        </div>
                </Suspense>
                )
            }
            
        </>
    )
}