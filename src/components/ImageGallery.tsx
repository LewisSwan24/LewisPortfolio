"use client";

import { useState } from "react";
import Image from "next/image";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Captions from "yet-another-react-lightbox/plugins/captions";
import "yet-another-react-lightbox/plugins/captions.css";
import { cn } from "@/lib/cn";

interface ImageGalleryProps {
    images: Array<{
        src: string;
        alt: string;
        caption?: string;
        width?: number;
        height?: number;
    }>;
    columns?: 2 | 3 | 4;
}

/**
 * Image Gallery component with lightbox functionality
 * Optimized for project showcases
 */
export function ImageGallery({ images, columns = 3 }: ImageGalleryProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [photoIndex, setPhotoIndex] = useState(0);

    // Transform images for lightbox
    const lightboxSlides = images.map((img) => ({
        src: img.src,
        title: img.caption || img.alt,
        description: img.caption,
    }));

    const gridCols = {
        2: "grid-cols-1 sm:grid-cols-2",
        3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
        4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
    };

    return (
        <>
            <div className={cn("grid gap-4", gridCols[columns])}>
                {images.map((image, index) => (
                    <button
                        key={index}
                        onClick={() => {
                            setPhotoIndex(index);
                            setIsOpen(true);
                        }}
                        className={cn(
                            "group relative aspect-video overflow-hidden rounded-xl",
                            "border border-border/50 bg-muted/30",
                            "transition-all duration-300",
                            "hover:border-accent/50 hover:shadow-xl hover:shadow-accent/10",
                            "focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2",
                            "cursor-pointer"
                        )}
                    >
                        <Image
                            src={image.src}
                            alt={image.alt}
                            fill
                            className={cn(
                                "object-cover transition-transform duration-500",
                                "motion-safe:group-hover:scale-110"
                            )}
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />

                        {/* Overlay */}
                        <div
                            className={cn(
                                "absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent",
                                "opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                            )}
                        />

                        {/* Zoom icon */}
                        <div
                            className={cn(
                                "absolute inset-0 flex items-center justify-center",
                                "opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                            )}
                        >
                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/90 dark:bg-black/90">
                                <svg
                                    className="h-6 w-6 text-foreground"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                                    />
                                </svg>
                            </div>
                        </div>

                        {/* Caption (optional) */}
                        {image.caption && (
                            <div
                                className={cn(
                                    "absolute bottom-0 left-0 right-0 p-3",
                                    "bg-gradient-to-t from-black/80 to-transparent",
                                    "translate-y-full group-hover:translate-y-0 transition-transform duration-300"
                                )}
                            >
                                <p className="text-sm text-white font-medium line-clamp-2">
                                    {image.caption}
                                </p>
                            </div>
                        )}
                    </button>
                ))}
            </div>

            {/* Lightbox */}
            <Lightbox
                open={isOpen}
                close={() => setIsOpen(false)}
                index={photoIndex}
                slides={lightboxSlides}
                plugins={[Zoom, Captions]}
                zoom={{
                    maxZoomPixelRatio: 3,
                    scrollToZoom: true,
                }}
                captions={{
                    showToggle: true,
                    descriptionTextAlign: "center",
                }}
                styles={{
                    container: {
                        backgroundColor: "rgba(0, 0, 0, 0.95)",
                    },
                }}
                on={{
                    view: ({ index }) => setPhotoIndex(index),
                }}
            />
        </>
    );
}
