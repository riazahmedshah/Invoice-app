import { redirect } from "next/navigation";
import prisma from "../utils/db";
import requireUser from "../utils/hooks/requireUserHook";

export async function markAsPaid(invoiceId: string){
    const session = await requireUser();

    await prisma.invoice.update({
        where:{
            userId: session.user?.id,
            id: invoiceId
        },
        data:{
            status:"PAID"
        }
    });

    return redirect("/dashboard/invoices")
}