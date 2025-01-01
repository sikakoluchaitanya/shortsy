import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const urls = await prisma.url.findMany({
            orderBy: {
                createdAt: "desc",
            },
            take: 5,
        });
        return NextResponse.json(urls);
    } catch (error: unknown) {
        console.error("Error fetching URLs:", error);

        // Ensure error response is always a valid JSON object
        const errorResponse = {
            message: error instanceof Error ? error.message : "An unknown error occurred",
            ...(error instanceof Error && { stack: error.stack }), // Include stack trace if available
        };

        return NextResponse.json(errorResponse, { status: 500 });
    }
}
