'use client';

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { CopyCheck, CopyIcon, EyeIcon } from "lucide-react";

type Url = {
    id: number;
    shortUrl: string;
    originalUrl: string;
    visits: number;
}
export default function UrlList() {
    const [urls, setUrls] = useState<Url[]>([]);
    const [copiedUrl, setCopiedUrl] = useState<boolean>(false);
    const [copyUrl, setCopyUrl] = useState<string>("");
    const [isloading, setIsLoading] = useState<boolean>(false);

    const shortenerUrl = (code : string) => `${process.env.NEXT_PUBLIC_BASE_URL}/${code}`
    const fetchUrls = async () => {
        setIsLoading(true);
        try {
            const response = await fetch("/api/urls");
            const data = await response.json();
            setUrls(data);
            console.log(urls);
        } catch (error) {
            console.error("error fetching urls", error);
        } finally {
            setIsLoading(false);
        }
    }

    const handlecopyUrl = async (url: string) => {
        const fullUrl = `${shortenerUrl(url)}`;
        navigator.clipboard.writeText(fullUrl)
        .then(() => {
            setCopiedUrl(true);
            setCopyUrl(url);
            setTimeout(() => {
                setCopiedUrl(false);
                setCopyUrl("");
            }, 2000);
        })
    }

    useEffect(() => {
        fetchUrls();
    }, []);
    
    if (isloading) {
        return (
            <div className="animate-pulse">
                <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
                <ul className="space-y-2">
                    {[1,2,3].map((item) => (
                        <li
                            key={item}
                            className="flex items-center gap-2 rounded-md border bg-card p-4
                            text-card-foreground justify-between"
                        >
                            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                            <div className="flex items-center gap-3">
                                <div className="h-4 bg-gray-200 rounded"></div>
                                <span className="flex items-center gap-2">
                                    <div className="h-4 w-4 bg-gray-200 rounded"></div>
                                    <div className="h-4 bg-gray-200 w-10 rounded"></div>
                                </span>
                            </div>

                        </li>
                    ))}
                </ul>
            </div>
        )
    }
    return (
        <div>
            <h2 className="text-2xl font-bold mb-2">
                Recent URLs
            </h2>
            <ul className="space-y-2">
                {
                    urls.map((url) => (
                        <li key={url.id} className="flex items-center gap-2 justify-between bg-card rounded-sm text-card-foreground border p-1">
                        <Link 
                            href={`/${url.shortUrl}`} 
                            target="_blank" 
                            className="text-blue-500"
                        >
                            {shortenerUrl(url.shortUrl)}
                        </Link>
                        <div className="flex items-center gap-2">
                            <Button 
                                variant="ghost" 
                                size="icon"
                                className="text-muted-foreground hover-bg-muted"
                                onClick={() => handlecopyUrl(url.shortUrl)}
                            >
                                {
                                    copiedUrl && copyUrl === url.shortUrl ? (
                                        <CopyCheck className="w-4 h-4" />
                                    ) : (
                                        <CopyIcon className="w-4 h-4" />
                                    )
                                }
                                <span className="sr-only">Copy Url</span>
                            </Button>
                            <span className="flex items-center gap-2">
                                <EyeIcon className="w-4 h-4 mr-1" />
                                {url.visits} views
                            </span>
                        </div>
                    </li>
                    ))
                }
            </ul>
        </div>
    )
}