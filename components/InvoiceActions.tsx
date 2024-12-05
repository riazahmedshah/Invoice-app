import { CheckCircle, DownloadIcon, Mail, MoreHorizontal, Pencil, Trash } from "lucide-react";
import { Button } from "./ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import Link from "next/link";

export function InvoiceAction(){
    return(
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button size="icon" variant="secondary">
                    <MoreHorizontal className="size-4"/>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                    <Link href="#">
                        <Pencil className="size-4 mr-2"/>Edit Invoice
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                    <Link href="#">
                        <DownloadIcon className="size-4 mr-2"/>Download Invoice
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                    <Link href="#">
                        <Mail className="size-4 mr-2"/>Reminder Enail
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                    <Link href="#">
                        <Trash className="size-4 mr-2"/>Delete Invoice
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                    <Link href="#">
                        <CheckCircle className="size-4 mr-2"/>Mark as paid
                    </Link>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}