
import prisma from "@/app/utils/db"
import requireUser from "@/app/utils/hooks/requireUserHook";
import { EditInvoice } from "@/components/EditInvoice";
import { notFound } from "next/navigation";

async function getData(invoiceId: string, userId: string){
    const data = await prisma.invoice.findUnique({
        where:{
            id: invoiceId,
            userId: userId,
        }
    });

    if(!data){
        return notFound();
    }

    return data;
}

type ParamsType = Promise<{invoiceId: string}>

export default async function EditInvoiceRoute({params}: {params:ParamsType}){

    const {invoiceId} = await params;
    // console.log(invoiceId);

    const session = await requireUser();

    const data = await getData(invoiceId, session.user?.id as string);
    // console.log(data);

    return(
        <EditInvoice data={data}/>
    )
}