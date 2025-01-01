import { redirect } from "next/navigation";
import prisma from "../utils/db";
import requireUser from "../utils/hooks/requireUserHook";

export async function DeleteInvoice(invoiceId: string){
    const session = await requireUser();

    await prisma.invoice.delete({
        where:{
            userId: session.user?.id,
            id: invoiceId
        },
    });

    return redirect("/dashboard/invoices")
}