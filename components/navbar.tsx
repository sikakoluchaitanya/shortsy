import { Airplay, ArrowDownWideNarrow } from "lucide-react"
import Link from "next/link"
import { Button, buttonVariants } from "./ui/button"
import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import { redirect } from "next/navigation"


export default async function Navbar() {
    const session = await auth.api.getSession({
        headers: await headers()
    })
    return (
        <div className="border-b px-4 ">
            <div className="flex items-center justify-between mx-auto max-w-8xl h-16">
                <Link href="/" className="flex items-center gap-1">
                    <ArrowDownWideNarrow className="w-6 h-6" />
                    <span className="font-bold">Shortsy</span>
                </Link>

                <div>
                    {
                        session ? (
                            <form action={async () => {
                                'use server'
                                await auth.api.signOut({
                                    headers: await headers()
                                })
                                redirect("/sign-in")
                            }}>
                                <Button>Sign Out</Button>
                            </form>
                        ) : (
                            <Link href="/sign-in" className={buttonVariants()}>
                                Sign In
                            </Link>
                        )
                    }
                </div>
            </div>
        </div>
    )
}