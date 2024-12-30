import prisma from "@/lib/db";
import { nanoid } from "nanoid";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    const { url } = await request.json();

    const shortCode = nanoid(6);
    const shortenedUrl = await prisma.url.create({
        data: {
            orginalUrl: url,
            shortUrl: shortCode,
        },
    });

    return NextResponse.json({ shortCode: shortenedUrl.shortUrl });
}