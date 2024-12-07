/* eslint-disable @typescript-eslint/no-explicit-any */
import prisma from "@/app/utils/db";
import { InvoiceAction } from "./InvoiceActions";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import requireUser from "@/app/utils/hooks/requireUserHook";
import { useformatCurrency } from "@/app/utils/hooks/useformatCurrency";
import { Badge } from "./ui/badge";

async function getData(userId: string){
    const data = await prisma.invoice.findMany({
        where:{
            userId: userId,
        },
        select:{
            id:true,
            clientName:true,
            total:true,
            status:true,
            createdAt:true,
            invoiceNumber:true,
            currency:true,
        },
        orderBy:{
            createdAt:"desc"
        }
    });

    return data;
}

export async function InvoiceList(){
    const session = await requireUser()
    const userId = session.user?.id as string

    const data = await getData(userId);
    return(
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Invoice ID</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {
                    data.map((invoice) => (
                        <TableRow key={invoice.id}>
                            <TableCell>#{invoice.id}</TableCell>
                            <TableCell>{invoice.clientName}</TableCell>
                            <TableCell>{useformatCurrency({
                                amount:invoice.total,
                                currency:invoice.currency as any
                            })}</TableCell>
                            <TableCell>
                                <Badge>{invoice.status}</Badge>
                            </TableCell>
                            <TableCell>{new Intl.DateTimeFormat("en-IN",{
                                dateStyle:"medium"
                            }).format(invoice.createdAt)}</TableCell>
                            <TableCell className="text-right">
                                <InvoiceAction />
                            </TableCell>
                        </TableRow>
                    ))
                }
            </TableBody>
        </Table>
    )
}