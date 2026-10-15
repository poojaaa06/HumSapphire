"use client";

import { useRef, useState } from "react";
import { useInView } from "@/hooks/useInView";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { assets } from "@/lib/assets";

export function GallerySection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, 0.05);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const images = assets.galleryImages;

  const closeLightbox = () => setLightboxIndex(null);
  const prevImage = () =>
    setLightboxIndex((i) => (i === null ? 0 : (i - 1 + images.length) % images.length));
  const nextImage = () =>
    setLightboxIndex((i) => (i === null ? 0 : (i + 1) % images.length));

  return (
    <>
      <section
        id="gallery"
        ref={ref}
        className="bg-[var(--color-deep-navy)] overflow-hidden"
        aria-labelledby="gallery-heading"
      >
        {/* Header */}
        <div
          className="max-w-[1600px] mx-auto section-pad pb-14"
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : "translateY(24px)",
            transition: "opacity 0.9s ease, transform 0.9s ease",
          }}
        >
          <div className="flex items-center gap-3 mb-8">
            <span className="gold-line" />
            <p className="label-sm text-[var(--color-gold)]">Gallery</p>
          </div>
          <div className="flex flex-col lg:flex-row lg:items-end gap-6 lg:gap-20">
            <h2
              id="gallery-heading"
              className="heading-lg text-white max-w-[18ch]"
            >
              Imagine Living
              <em> Here.</em>
            </h2>
            <p className="body-lg text-white/50 max-w-[40ch] lg:pb-2">
              A curated journey through HUM Sapphire — lobby, residences,
              wellness spaces, and amenities.
            </p>
          </div>
        </div>

        {/* Masonry-style grid */}
        <div
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[3px]"
          style={{
            opacity: inView ? 1 : 0,
            transition: "opacity 1s ease 0.3s",
          }}
        >
          {images.map((img, i) => {
            // Make first image large (spans 2 cols)
            const isFeature = i === 0 || i === 5;
            return (
              <button
                key={img.src + i}
                className={`relative overflow-hidden group focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)] ${
                  isFeature ? "col-span-2 row-span-1 min-h-[40vw] md:min-h-[30vw]" : "min-h-[30vw] md:min-h-[22vw]"
                }`}
                onClick={() => setLightboxIndex(i)}
                aria-label={`View ${img.caption} in full screen`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={img.src}
                  alt={img.alt}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300" />
                {/* Caption on hover */}
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <p className="label-sm text-white">{img.caption}</p>
                </div>
                {/* Index */}
                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <p className="label-sm text-white/80">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center"
          role="dialog"
          aria-modal="true"
          aria-label="Image lightbox"
        >
          <button
            className="absolute top-6 right-6 text-white/60 hover:text-white transition-colors p-2"
            onClick={closeLightbox}
            aria-label="Close lightbox"
          >
            <X size={28} />
          </button>
          <button
            className="absolute left-4 lg:left-8 text-white/60 hover:text-white transition-colors p-3"
            onClick={prevImage}
            aria-label="Previous image"
          >
            <ChevronLeft size={28} />
          </button>
          <div className="max-w-5xl w-full px-16 flex flex-col items-center gap-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={images[lightboxIndex].src}
              alt={images[lightboxIndex].alt}
              className="max-h-[80vh] w-auto max-w-full object-contain"
            />
            <p className="label-sm text-[var(--color-gold)]">
              {images[lightboxIndex].caption}
            </p>
            <p className="label-sm text-white/30">
              {String(lightboxIndex + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
            </p>
          </div>
          <button
            className="absolute right-4 lg:right-8 text-white/60 hover:text-white transition-colors p-3"
            onClick={nextImage}
            aria-label="Next image"
          >
            <ChevronRight size={28} />
          </button>
        </div>
      )}
    </>
  );
}
