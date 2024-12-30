import { Airplay, ArrowDownWideNarrow } from "lucide-react"
import Link from "next/link"
import { buttonVariants } from "./ui/button"


export default function Navbar() {
    return (
        <div className="border-b px-4 ">
            <div className="flex items-center justify-between mx-auto max-w-8xl h-16">
                <Link href="/" className="flex items-center gap-1">
                    <ArrowDownWideNarrow className="w-6 h-6" />
                    <span className="font-bold">Shortsy</span>
                </Link>

                <div>
                    <Link href="/sign-in" className={buttonVariants()}>
                        Sign In
                    </Link>
                </div>
            </div>
        </div>
    )
}