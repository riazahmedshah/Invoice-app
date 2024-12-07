/* eslint-disable @typescript-eslint/no-unused-vars */
"use server"

import { parseWithZod } from "@conform-to/zod";
import requireUser from "../utils/hooks/requireUserHook";
import { invoiceSchema } from "../utils/zodSchemas";
import prisma from "../utils/db";
import { redirect } from "next/navigation";
import { emailClient } from "../utils/mailtrap";
import { useformatCurrency } from "../utils/hooks/useformatCurrency";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function cretaeInvoice(prevState:any,formData: FormData){
    const session = await requireUser();

    const submission = parseWithZod(formData, {
        schema: invoiceSchema,
    });

    if(submission.status !== "success"){
        return submission.reply();
    }

    const data = await prisma.invoice.create({
        data: {
            clientAddress: submission.value.clientAddress,
            clientEmail: submission.value.clientAddress,
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
            userId:session.user?.id
        }
    });

    const sender = {
        email: "invoice@demomailtrap.com",
        name: "Riyaz Ahmed",
      };

    emailClient.send({
        from:sender,
        to:[{email: "riyazsh360@gmail.com"}],
        template_uuid: "ac3f7b5e-f963-4761-8d62-fb780bbc24df",
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
        "invoiceLink": "Test_Link"
        }
    })

    return redirect("/dashboard/invoices");


} 