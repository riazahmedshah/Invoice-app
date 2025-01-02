

import { DashboardBlocks } from "@/components/DashboardBlocks";
import requireUser from "../utils/hooks/requireUserHook";
import { Invoicegraph } from "@/components/InvoiceGraph";

export default async function Dashboard() {
    
    await requireUser();
    return (
        <>
            <DashboardBlocks/>
            <div className="grid gap-4 lg:grid-cols-3 md:gap-8">
                <Invoicegraph/>
                <h1 className="bg-green-500 col-span-1">this is about 30%</h1>
            </div>
        </>
    )
}