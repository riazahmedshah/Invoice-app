import {z} from "zod";


export const onboardingSchema = z.object({
    firstName: z.string().min(2, "First Name is required"),
    lastName: z.string().min(2,"Last Name is required"),
    address:z.string().min(2,"Address is required")
})


export const invoiceSchema = z.object({
    invoiceName: z.string().min(1, "Invoice Name is requires"),
    total: z.number().min(1, "1$ is minimum"),
    status:z.enum(["PAID", "PENDING"]).default("PENDING"),
    date: z.string().min(1,"Date is required"),
    dueDate: z.number().min(0,"Due Date is Required"),

    fromName: z.string().min(2,"Your name is required"),
    fromEmail: z.string().email("Invalid Email"),
    fromAddress: z.string().min(2,"Your Address is required"),
    clientName: z.string().min(2,"Client name is required"),
    clientEmail: z.string().email("Invalid Email"),
    clientAddress: z.string().min(2,"Client Address is required"),

    currency: z.string().min(1, "currency is required"),
    invoiceNumber: z.number().min(1,"Min Invoice number of 1"),

    note: z.string().optional(),

    invoiceItemDescription: z.string().min(1,"Description is required"),
    invoiceItemQuantity: z.number().min(1,"Quantity is required"),
    invoiceItemRate:z.number().min(1,"rate Min 1"),



})
