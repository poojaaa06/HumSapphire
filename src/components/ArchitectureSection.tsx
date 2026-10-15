"use client";

import { useRef } from "react";
import { useInView } from "@/hooks/useInView";
import { assets } from "@/lib/assets";

const images = [
  {
    src: assets.architectureImages[0],
    alt: "HUM Sapphire residential tower exterior",
    caption: "Iconic Façade",
    size: "large",
  },
  {
    src: assets.architectureImages[1],
    alt: "Modern architectural details at HUM Sapphire",
    caption: "Architectural Precision",
    size: "small",
  },
  {
    src: assets.architectureImages[2],
    alt: "Contemporary residential architecture",
    caption: "Premium Residences",
    size: "small",
  },
  {
    src: assets.architectureImages[3],
    alt: "Luxury apartment building exterior",
    caption: "Elevated Design",
    size: "large",
  },
];

export function ArchitectureSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, 0.1);

  return (
    <section
      id="architecture"
      ref={ref}
      className="bg-[var(--color-deep-navy)] overflow-hidden"
      aria-labelledby="arch-heading"
    >
      {/* Header */}
      <div
        className="max-w-[1600px] mx-auto section-pad"
        style={{
          opacity: inView ? 1 : 0,
          transform: inView ? "translateY(0)" : "translateY(24px)",
          transition: "opacity 0.9s ease, transform 0.9s ease",
        }}
      >
        <div className="flex items-center gap-3 mb-8">
          <span className="gold-line" />
          <p className="label-sm text-[var(--color-gold)]">Architecture &amp; Design</p>
        </div>
        <div className="flex flex-col lg:flex-row lg:items-end gap-6 lg:gap-16">
          <h2
            id="arch-heading"
            className="heading-lg text-white max-w-[20ch]"
          >
            Crafted for Those Who
            <em> Appreciate</em> the Difference.
          </h2>
          <p className="body-lg text-white/50 max-w-[40ch] lg:pb-2">
            G+21 storeys of architectural intention — every elevation, every
            material, and every amenity chosen to elevate the everyday.
          </p>
        </div>
      </div>

      {/* Image mosaic */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-[2px] bg-[var(--color-deep-navy)]">
        {/* Large left image */}
        <div
          className="lg:col-span-7 relative overflow-hidden min-h-[50vh] lg:min-h-[70vh]"
          style={{
            opacity: inView ? 1 : 0,
            transition: "opacity 1s ease 0.2s",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={images[0].src}
            alt={images[0].alt}
            className="absolute inset-0 h-full w-full object-cover"
            style={{
              transform: inView ? "scale(1)" : "scale(1.06)",
              transition: "transform 1.4s cubic-bezier(0.16,1,0.3,1) 0.2s",
            }}
          />
          <div className="absolute inset-0 bg-black/20" />
          <div className="absolute bottom-6 left-6">
            <p className="label-sm text-[var(--color-gold)]">{images[0].caption}</p>
          </div>
        </div>

        {/* Right column: two stacked images */}
        <div className="lg:col-span-5 grid grid-rows-2 gap-[2px]">
          {[images[1], images[2]].map((img, i) => (
            <div
              key={img.caption}
              className="relative overflow-hidden min-h-[35vh]"
              style={{
                opacity: inView ? 1 : 0,
                transition: `opacity 1s ease ${0.35 + i * 0.15}s`,
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={img.src}
                alt={img.alt}
                className="absolute inset-0 h-full w-full object-cover"
                style={{
                  transform: inView ? "scale(1)" : "scale(1.06)",
                  transition: `transform 1.4s cubic-bezier(0.16,1,0.3,1) ${0.35 + i * 0.15}s`,
                }}
              />
              <div className="absolute inset-0 bg-black/20" />
              <div className="absolute bottom-4 left-4">
                <p className="label-sm text-[var(--color-gold)]">{img.caption}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Project highlights strip */}
      <div
        className="max-w-[1600px] mx-auto section-pad"
        style={{
          opacity: inView ? 1 : 0,
          transition: "opacity 1s ease 0.6s",
        }}
      >
        <div className="flex items-center gap-3 mb-10">
          <span className="gold-line" />
          <p className="label-sm text-[var(--color-gold)]">Project Highlights</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
          {[
            "Vastu Compliant Homes",
            "Air-Conditioned Lobby",
            "High Speed Elevators",
            "Rain Water Harvesting",
            "High Tech Security",
            "Asian Paints — 10 Year Warranty",
            "Branded Vitrified Flooring",
            "Prime Location",
          ].map((h, i) => (
            <div
              key={h}
              className="flex items-start gap-3 group"
              style={{
                opacity: inView ? 1 : 0,
                transition: `opacity 0.7s ease ${0.7 + i * 0.07}s`,
              }}
            >
              <span className="mt-1.5 h-px w-4 bg-[var(--color-gold)] shrink-0 group-hover:w-6 transition-all duration-300" />
              <p className="font-serif text-white/80 text-lg lg:text-xl font-light leading-snug">
                {h}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
