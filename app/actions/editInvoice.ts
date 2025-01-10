"use server"

/* eslint-disable @typescript-eslint/no-explicit-any */
import { parseWithZod } from "@conform-to/zod";
import requireUser from "../utils/hooks/requireUserHook";
import { invoiceSchema } from "../utils/zodSchemas";
import prisma from "../utils/db";
import { redirect } from "next/navigation";
import { useformatCurrency } from "../utils/hooks/useformatCurrency";
import { emailClient } from "../utils/mailtrap";

export async function editInvoice(prevState: any,formData: FormData){
    const session = await requireUser();

    const submission = parseWithZod(formData, {
        schema: invoiceSchema
    });

    if(submission.status != "success"){
        return submission.reply();
    }

    const data = await prisma.invoice.update({
        where: {
            id: formData.get("id") as string,
            userId: session.user?.id
        },
        data:{
            clientAddress: submission.value.clientAddress,
            clientEmail: submission.value.clientEmail,
            clientName:submission.value.clientName,
            currency: submission.value.currency,
            date: submission.value.date,
            dueDate: submission.value.dueDate,
            fromAddress:submission.value.fromAddress,
            fromEmail:submission.value.fromEmail,
            fromName:submission.value.fromName,
            invoiceItemDescription:submission.value.invoiceItemDescription,
            invoiceItemQuantity:submission.value.invoiceItemQuantity,
            invoiceItemRate:submission.value.invoiceItemRate,
            invoiceName:submission.value.invoiceName,
            invoiceNumber:submission.value.invoiceNumber,
            status:submission.value.status,
            total:submission.value.total,
            note:submission.value.note,
        }
    });

    const sender = {
        email: "invoice@demomailtrap.com",
        name: "Riyaz Ahmed",
      };

    emailClient.send({
        from:sender,
        to:[{email: "riyazsh360@gmail.com"}],
        template_uuid: "235d6f75-f0f1-4839-a838-63673bbee08a",
        template_variables: {
        "clientName": submission.value.clientName,
        "invoiceDetails": "Test_InvoiceDetails",
        "invoiceNumber": submission.value.invoiceNumber,
        "InvoiceDueDate": submission.value.dueDate,
        "totalAmount": useformatCurrency({
            amount:submission.value.total,
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            currency:submission.value.currency as any
        }),
        "invoiceLink": `http://localhost:3000/api/invoice/${data.id}`
        }
    })

    return redirect("/dashboard/invoices");
}