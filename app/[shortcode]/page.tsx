import prisma from "@/lib/db";
import { redirect } from "next/navigation";

interface RedirectPageProps {
    params: { shortcode: string }
}

export default async function RedirectPage({ params }: RedirectPageProps) {
    // Use `await` before accessing params
    //dynamic route in nextjs do not allow to use params directly
    const { shortcode } = await Promise.resolve(params); // Fix: Await params
    console.log(shortcode);

    const url = await prisma.url.findUnique({
        where: {
            shortUrl: shortcode,
        },
    });

    if (!url) {
        return (
            <div>
                404 -URL not found
            </div>
        )
    }

    await prisma.url.update({
        where: {
            id: url.id,
        },
        data: {
            visits: {
                increment: 1,
            },
        },
    });

    redirect(url.orginalUrl);
}