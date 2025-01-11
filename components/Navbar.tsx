import Image from "next/image";
import Link from "next/link";
import Logo from "@/public/logo (1).png"
import { buttonVariants } from "./ui/button";

export function Navbar(){
    return(
        <div className="flex items-center justify-between py-5 shadow-sm">
            <Link href="/" className="flex items-center gap-2">
                <Image className="size-10" src={Logo} alt="logo"/>
                <h4 className="text-3xl font-semibold">Invoice<span className="text-blue-500">Inc.</span></h4>
            </Link>
            <Link className={buttonVariants()} href="/login">
                Get Started
            </Link>
        </div>
    )
}