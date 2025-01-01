import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import PaidGif from "@/public/paid-gif.gif"
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import SubmitButton from "@/components/SubmitButton";
import { markAsPaid } from "@/app/actions/markaspaid";
import prisma from "@/app/utils/db";
import { redirect } from "next/navigation";
import requireUser from "@/app/utils/hooks/requireUserHook";


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

type Param = Promise<{invoiceId: string}>

export default async function MarkAsPaid({params} : {params:Param}){
    const session = await requireUser()
    const {invoiceId} = await params
    await Authorize(invoiceId, session.user?.id as string);
    return(
        <div className="flex items-center justify-center">
            <Card className="max-w-[500px]">
                <CardHeader>
                    <CardTitle>Mark as Paid?</CardTitle>
                    <CardDescription>
                        Are you sure you want mark this invoice as paid
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Image src={PaidGif} alt="paid-git" className="rounded-lg"/>
                </CardContent>
                <CardFooter className="flex items-center justify-between">
                    <Link href="/dashboard/invoices" className={buttonVariants({variant:"secondary"})}>Cancel</Link>
                    <form action={async() => {
                        "use server"
                        await markAsPaid(invoiceId);
                    }}>
                        <SubmitButton text="Mark as paid"/>
                    </form>
                </CardFooter>
            </Card>
        </div>
    )
}