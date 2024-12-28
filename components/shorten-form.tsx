"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export default function ShortenForm() {
    const [url, setUrl] = useState<string>("");

    const handleSumbit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log(url);
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
                >
                    Shorten URL
                </Button>
            </div>
        </form>
    )
}

// Removed local useState function to avoid conflict with React's useState
