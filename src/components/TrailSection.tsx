"use client";

import { useRef } from "react";
import { useInView } from "@/hooks/useInView";
import { assets } from "@/lib/assets";
import { ImageTrail } from "@/components/ImageTrail";

/** Interactive image-trail showcase – glide across the frame to reveal the project. */
const trailImages = [
    ...assets.galleryImages.map((g) => g.src),
    assets.amenityImages.steamRoom,
    assets.amenityImages.starGazing,
    assets.amenityImages.seatingArea,
    assets.amenityImages.swingArea,
];

export function TrailSection() {
    const ref = useRef<HTMLElement>(null);
    const inView = useInView(ref, 0.1);

    return (
        <section
            id="experience"
            ref={ref}
            className="bg-[var(--color-ivory)]"
            aria-labelledby="trail-heading"
        >
            <div
                className="max-w-[1600px] mx-auto section-pad"
                style={{
                    opacity: inView ? 1 : 0,
                    transform: inView ? "translateY(0)" : "translateY(24px)",
                    transition: "opacity 0.9s ease, transform 0.9s ease",
                }}
            >
                {/* Header */}
                <div className="flex items-center gap-3 mb-8">
                    <span className="gold-line" />
                    <p className="label-sm text-[var(--color-stone)]">Experience</p>
                </div>
                <div className="flex flex-col lg:flex-row lg:items-end gap-6 lg:gap-16 mb-12 lg:mb-16">
                    <h2 id="trail-heading" className="heading-lg text-[var(--color-deep-navy)] max-w-[16ch]">
                        Wander Through
                        <em> HUM Sapphire.</em>
                    </h2>
                    <p className="body-lg text-[var(--color-stone)] max-w-[44ch] lg:pb-2">
                        Glide across the frame to reveal the lobby, residences and wellness spaces — one
                        moment at a time.
                    </p>
                </div>

                {/* Interactive frame */}
                <div className="group relative w-full aspect-[4/5] sm:aspect-[16/10] lg:aspect-[16/8] overflow-hidden cursor-crosshair border border-[var(--color-gold)]/30 bg-[var(--color-cream)]">
                    {/* Resting hint (sits behind the trail) */}
                    <div className="pointer-events-none absolute inset-0 z-0 flex flex-col items-center justify-center gap-4 text-center px-6">
                        <span className="gold-line" />
                        <p className="font-serif italic font-light text-3xl sm:text-4xl lg:text-5xl text-[var(--color-deep-navy)]/25">
                            Move to reveal
                        </p>
                        <p className="label-sm text-[var(--color-stone)]/70">
                            <span className="hidden sm:inline">Move your cursor across the frame</span>
                            <span className="sm:hidden">Drag your finger across the frame</span>
                        </p>
                    </div>

                    <ImageTrail items={trailImages} variant={2} threshold={90} />
                </div>
            </div>
        </section>
    );
}