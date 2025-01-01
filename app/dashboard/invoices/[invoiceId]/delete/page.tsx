import prisma from "@/app/utils/db"
import requireUser from "@/app/utils/hooks/requireUserHook";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { redirect } from "next/navigation";

import WarningGif from "@/public/warning-gif.gif"
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import SubmitButton from "@/components/SubmitButton";
import { DeleteInvoice } from "@/app/actions/deleteInvoice";

async function Authorize(invoiceId: string, userId:string){
    const data = await prisma.invoice.findUnique({
        where:{
            id: invoiceId,
            userId: userId
        }
    });

    if(!data){
        redirect("/dashboard/invoices");
    }
};

type Param = Promise<{invoiceId:string}>;


export default async function deleteIvoiceRoute({params} : {params : Param}){
    const {invoiceId} = await params
    const session = await requireUser()
    await Authorize(invoiceId,session.user?.id as string)
    return(
        <div className="flex flex-1 justify-center items-center">
            <Card className="max-w-[500px]">
                <CardHeader>
                    <CardTitle>Delete Invoice</CardTitle>
                    <CardDescription>
                        Are you sure you want to delete this invoice?
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Image src={WarningGif} alt="Warning-gif" className="rounded-lg"/>
                </CardContent>
                <CardFooter className="flex justify-between items-center">
                    <Link className={buttonVariants({variant:"secondary"})} href="/dashboard/invoices">Cancel</Link>
                    <form action={async() => {
                        "use server"
                        await DeleteInvoice(invoiceId);
                    }}>
                        <SubmitButton text="Delete Invoice" variant={"destructive"}/>
                    </form>
                </CardFooter>
            </Card>
        </div>
    )
}