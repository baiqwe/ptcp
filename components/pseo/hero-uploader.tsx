"use client";

import { useState, useCallback } from "react";
import { cn } from "@/utils/utils";
import { Upload, FileImage, Loader2 } from "lucide-react";

interface HeroUploaderProps {
    niche: string;
}

export function HeroUploader({ niche }: HeroUploaderProps) {
    const [isDragging, setIsDragging] = useState(false);
    const [file, setFile] = useState<File | null>(null);
    const [isProcessing, setIsProcessing] = useState(false);

    const handleDragOver = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    }, []);

    const handleDragLeave = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
    }, []);

    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            const droppedFile = e.dataTransfer.files[0];
            if (droppedFile.type.startsWith("image/")) {
                setFile(droppedFile);
                // Simulate processing
                handleProcess(droppedFile);
            }
        }
    }, []);

    const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const selectedFile = e.target.files[0];
            setFile(selectedFile);
            handleProcess(selectedFile);
        }
    }, []);

    const handleProcess = async (file: File) => {
        setIsProcessing(true);

        try {
            const formData = new FormData();
            formData.append('image', file);

            const response = await fetch('/api/process', {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();

            if (data.success) {
                // In a real app, we would redirect to a result page or update parent state
                // For this demo, just alert/log
                console.log("Processing success:", data);
                alert("Mock Processing Complete! See console for details.");
            }
        } catch (error) {
            console.error("Upload failed", error);
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <div className="w-full max-w-2xl mx-auto">
            <div
                className={cn(
                    "relative group cursor-pointer overflow-hidden rounded-3xl border-2 border-dashed transition-all duration-300 ease-in-out",
                    isDragging
                        ? "border-primary bg-primary/5 scale-[1.02]"
                        : "border-muted-foreground/25 hover:border-primary/50 hover:bg-muted/50",
                    "h-64 sm:h-80 flex flex-col items-center justify-center text-center p-8"
                )}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => document.getElementById("file-upload")?.click()}
            >
                <input
                    id="file-upload"
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleFileSelect}
                />

                <div className="relative z-10 flex flex-col items-center gap-4">
                    <div className={cn(
                        "h-20 w-20 rounded-full bg-background shadow-sm flex items-center justify-center transition-transform",
                        isDragging ? "scale-110" : "group-hover:scale-105"
                    )}>
                        {isProcessing ? (
                            <Loader2 className="h-10 w-10 text-primary animate-spin" />
                        ) : file ? (
                            <FileImage className="h-10 w-10 text-primary" />
                        ) : (
                            <Upload className="h-10 w-10 text-primary" />
                        )}
                    </div>

                    <div className="space-y-2">
                        <h3 className="text-xl sm:text-2xl font-bold font-display">
                            {isProcessing ? "Processing..." : file ? "File Selected" : "Upload your photo"}
                        </h3>
                        <p className="text-muted-foreground max-w-xs mx-auto text-sm sm:text-base">
                            {isProcessing
                                ? "Creating your coloring page..."
                                : file
                                    ? file.name
                                    : `Drag & drop your ${niche} photo here, or click to browse`
                            }
                        </p>
                    </div>
                </div>

                {/* Decorative pattern background */}
                <div className="absolute inset-0 -z-10 opacity-50 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]" />
            </div>
        </div>
    );
}
