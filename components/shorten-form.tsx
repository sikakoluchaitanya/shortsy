"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

interface ShortenFormProps {
    handleRefresh: () => void;
}

export default function ShortenForm({ handleRefresh }: ShortenFormProps) {
    const [url, setUrl] = useState<string>("");
    const [isloading, setIsLoading] = useState<boolean>(false);

    const handleSumbit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try{
            const response = await fetch("/api/shorten", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ url }),
            });
            await response.json();
            setUrl("");
            handleRefresh();
        } catch (error) {
            console.error("An unexpected error occurred:", error);
        }
    }


    return (
        <form onSubmit={handleSumbit} className="mb-4">
            <div className="space-y-4">
                <Input
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    type="url"
                    className="w-full p-2 h-9"
                    placeholder="https://example.com"
                    required
                />
                <Button
                    type="submit"
                    className="w-full p-2"
                    variant="default"
                    size="lg"
                    disabled={isloading}
                >
                    {isloading ? "Shortening..." : "Shorten URL"}
                </Button>
            </div>
        </form>
    )
}

// Removed local useState function to avoid conflict with React's useState
