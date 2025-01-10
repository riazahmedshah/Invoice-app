import prisma from "@/app/utils/db";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import requireUser from "@/app/utils/hooks/requireUserHook";
import { useformatCurrency } from "@/app/utils/hooks/useformatCurrency";


async function getData(userId: string){
    const data = await prisma.invoice.findMany({
        where:{
            userId: userId
        },
        select:{
            id:true,
            clientName:true,
            clientEmail:true,
            total:true,
            currency:true,
        },
        orderBy:{
            createdAt: "desc"
        },
        take: 7,
    });

    return data;
}

export async function RecentInvoices(){
    const session = await requireUser();
    const data = await getData(session.user?.id as string);
    return(
        <Card>
            <CardHeader>
                <CardTitle>Recent Invoices</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-6">
                {data.map((item) => (
                    <div key={item.id} className="flex items-center gap-2">
                    <Avatar className="hidden sm:flex size-11">
                        <AvatarFallback>{item.clientName.slice(0,2)}</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col gap-1">
                        <p className="text-sm font-medium leading-none">{item.clientName}</p>
                        <p className="text-sm text-muted-foreground">{item.clientEmail}</p>
                    </div>
                    <div className="ml-auto font-medium">
                        +{useformatCurrency({
                            amount:item.total,
                            currency: "INR"
                        })}
                    </div>
                </div>
                ))}
            </CardContent>
        </Card>
    )
}