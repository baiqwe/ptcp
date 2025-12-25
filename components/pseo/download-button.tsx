"use client";

import { Download } from "lucide-react";

interface DownloadButtonProps {
    imageUrl: string;
    filename: string;
    label: string;
}

export function DownloadButton({ imageUrl, filename, label }: DownloadButtonProps) {
    const handleDownload = async () => {
        try {
            const response = await fetch(imageUrl);
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = filename;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
        } catch (error) {
            console.error("Download failed", error);
        }
    };

    return (
        <button
            onClick={handleDownload}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-8 py-3 text-lg font-semibold text-primary-foreground shadow-lg transition-all hover:bg-primary/90 hover:scale-105 active:scale-95"
        >
            <Download className="h-5 w-5" />
            {label}
        </button>
    );
}
