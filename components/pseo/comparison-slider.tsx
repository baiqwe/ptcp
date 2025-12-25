"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import { GripVertical } from "lucide-react";
import { cn } from "@/utils/utils";

interface ComparisonSliderProps {
    beforeImage: string;
    afterImage: string;
    beforeLabel?: string;
    afterLabel?: string;
}

export function ComparisonSlider({
    beforeImage,
    afterImage,
    beforeLabel = "Original",
    afterLabel = "Coloring Page",
}: ComparisonSliderProps) {
    const [isResizing, setIsResizing] = useState(false);
    const [position, setPosition] = useState(50);
    const containerRef = useRef<HTMLDivElement>(null);

    const handleMove = useCallback(
        (clientX: number) => {
            if (!containerRef.current) return;

            const rect = containerRef.current.getBoundingClientRect();
            const x = clientX - rect.left;
            const width = rect.width;
            const percentage = Math.max(0, Math.min(100, (x / width) * 100));

            setPosition(percentage);
        },
        []
    );

    const handleMouseDown = useCallback(() => setIsResizing(true), []);
    const handleTouchStart = useCallback(() => setIsResizing(true), []);

    const handleMouseUp = useCallback(() => setIsResizing(false), []);
    const handleTouchEnd = useCallback(() => setIsResizing(false), []);

    useEffect(() => {
        const handleGlobalMove = (e: MouseEvent) => {
            if (isResizing) handleMove(e.clientX);
        };

        const handleGlobalTouchMove = (e: TouchEvent) => {
            if (isResizing && e.touches[0]) handleMove(e.touches[0].clientX);
        };

        const handleGlobalUp = () => setIsResizing(false);

        window.addEventListener("mousemove", handleGlobalMove);
        window.addEventListener("touchmove", handleGlobalTouchMove);
        window.addEventListener("mouseup", handleGlobalUp);
        window.addEventListener("touchend", handleGlobalUp);

        return () => {
            window.removeEventListener("mousemove", handleGlobalMove);
            window.removeEventListener("touchmove", handleGlobalTouchMove);
            window.removeEventListener("mouseup", handleGlobalUp);
            window.removeEventListener("touchend", handleGlobalUp);
        };
    }, [isResizing, handleMove]);

    return (
        <div
            ref={containerRef}
            className="relative w-full aspect-[4/3] rounded-xl overflow-hidden cursor-col-resize select-none border shadow-sm touch-none"
            onMouseDown={(e) => {
                setIsResizing(true);
                handleMove(e.clientX);
            }}
            onTouchStart={(e) => {
                setIsResizing(true);
                if (e.touches[0]) handleMove(e.touches[0].clientX);
            }}
        >
            {/* After Image (Background) - The Coloring Page */}
            <div className="absolute inset-0 w-full h-full">
                <Image
                    src={afterImage}
                    alt={afterLabel}
                    fill
                    className="object-cover"
                    draggable={false}
                />
                <div className="absolute top-4 right-4 bg-background/80 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold shadow-sm z-10">
                    {afterLabel}
                </div>
            </div>

            {/* Before Image (Foreground) - The Original Photo */}
            <div
                className="absolute inset-0 h-full w-full overflow-hidden"
                style={{ width: `${position}%` }}
            >
                <div className="relative w-full h-full">
                    {/* 
             We need to ensure the image maintains aspect ratio relative to the container 
             Wait, if we use object-cover on both, they map 1:1.
             But we need 'fill' and the wrapper to constrain it.
             Alternatively, we can set the inner image width to the container width 
             so it doesn't squish.
             
             Actually, easiest is:
             Container: relative aspect-ratio
             Inner Images: absolute inset-0
           */}
                    {/* To prevent squishing, we must set the width of this inner image 
               to contain the FULL width of the parent, not just the clipped width.
               Currently the parent 'div' has width: position%.
               So the image inside needs width: (100 / position * 100) % ?
               No.
               
               Better technique:
               Use clip-path on the top layer.
           */}
                </div>
            </div>

            {/* Re-implementing with Clip Path approach for stability */}
            <Image
                src={beforeImage}
                alt={beforeLabel}
                fill
                className="object-cover absolute inset-0 z-20 pointer-events-none"
                style={{
                    clipPath: `inset(0 ${100 - position}% 0 0)`
                }}
                draggable={false}
            />
            <div
                className="absolute top-4 left-4 bg-background/80 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold shadow-sm z-30"
                style={{ opacity: position < 10 ? 0 : 1, transition: 'opacity 0.2s' }}
            >
                {beforeLabel}
            </div>


            {/* Slider Handle */}
            <div
                className="absolute inset-y-0 w-1 bg-white z-40 shadow-[0_0_10px_rgba(0,0,0,0.5)] flex items-center justify-center pointer-events-none"
                style={{ left: `${position}%` }}
            >
                <div className="h-8 w-8 bg-white rounded-full shadow-lg flex items-center justify-center -ml-[14px]">
                    <GripVertical className="h-4 w-4 text-gray-500" />
                </div>
            </div>
        </div>
    );
}
