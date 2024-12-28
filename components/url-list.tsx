import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import { CopyIcon, EyeIcon } from "lucide-react";

export default function UrlList() {
    return (
        <div>
            <h2 className="text-2xl font-bold mb-2">
                Recent URLs
            </h2>
            <ul className="space-y-2">
                <li className="flex items-center gap-2 justify-between">
                    <Link href="https://monkeytype.com/" target="_blank" className="text-blue-500">
                        https://monkeytype.com/
                    </Link>
                    <div className="flex items-center gap-2">
                        <Button 
                            variant="ghost" 
                            size="icon"
                            className="text-muted-foreground hover-bg-muted"
                        >
                            <CopyIcon className="w-4 h-4" />
                            <span className="sr-only">Copy Url</span>
                        </Button>
                        <span className="flex items-center">
                            <EyeIcon className="w-4 h-4 mr-1" />
                            100 views
                        </span>
                    </div>
                </li>
            </ul>
        </div>
    )
}