"use client";

import React from "react";
import ShortenForm from "./shorten-form";
import UrlList from "./url-list";

export default function UrlInput() {
    const [refresh, setRefresh] = React.useState(0);

    const handleRefresh = () => {
        setRefresh((prev) => prev + 1);
    }
    return (
        <div>
            <ShortenForm handleRefresh={handleRefresh} />
            <UrlList key={refresh} />
        </div>
    )
}