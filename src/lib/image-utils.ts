import Image from "next/image";

/**
 * Generate a blur data URL for images
 * This creates a tiny placeholder while the full image loads
 */
export function getBlurDataURL(width: number = 8, height: number = 6): string {
    const canvas = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#e5e7eb"/>
    </svg>
  `;

    return `data:image/svg+xml;base64,${Buffer.from(canvas).toString("base64")}`;
}

/**
 * Get optimized image props for Next.js Image component
 */
export function getImageProps(
    src: string,
    alt: string,
    options?: {
        priority?: boolean;
        fill?: boolean;
        width?: number;
        height?: number;
        sizes?: string;
    }
) {
    const { priority = false, fill = false, width, height, sizes } = options || {};

    const baseProps = {
        src,
        alt,
        quality: 90,
        placeholder: "blur" as const,
        blurDataURL: getBlurDataURL(),
    };

    if (fill) {
        return {
            ...baseProps,
            fill: true,
            sizes: sizes || "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
            priority,
        };
    }

    return {
        ...baseProps,
        width: width || 1200,
        height: height || 630,
        sizes,
        priority,
    };
}

/**
 * Optimized image sizes for different use cases
 */
export const IMAGE_SIZES = {
    // Project cards
    card: "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
    // Project detail page
    detail: "(max-width: 768px) 100vw, 1200px",
    // Hero/featured images
    hero: "100vw",
    // Thumbnails
    thumbnail: "(max-width: 768px) 48px, 64px",
} as const;
