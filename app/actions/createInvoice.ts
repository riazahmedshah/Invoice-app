/* eslint-disable @typescript-eslint/no-unused-vars */
"use server"

import { parseWithZod } from "@conform-to/zod";
import requireUser from "../utils/hooks/requireUserHook";
import { invoiceSchema } from "../utils/zodSchemas";
import prisma from "../utils/db";

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
            note:submission.value.note
        }
    })


} 