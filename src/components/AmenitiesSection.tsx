"use client";

import { useRef, useState } from "react";
import { useInView } from "@/hooks/useInView";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { assets } from "@/lib/assets";

const amenities = [
  {
    name: "Gymnasium",
    category: "Fitness",
    image: assets.amenityImages.gym,
    description: "State-of-the-art fitness centre equipped for a complete daily workout.",
  },
  {
    name: "Jacuzzi Room",
    category: "Wellness",
    image: assets.amenityImages.jacuzzi,
    description: "A serene retreat for relaxation and hydrotherapy after a long day.",
  },
  {
    name: "Steam Room",
    category: "Wellness",
    image: assets.amenityImages.steamRoom,
    description: "Premium steam bathing facility for rejuvenation and recovery.",
  },
  {
    name: "Yoga Area",
    category: "Wellness",
    image: assets.amenityImages.yogaArea,
    description: "A tranquil outdoor space dedicated to mindful movement and wellness practice.",
  },
  {
    name: "Open Theatre",
    category: "Recreation",
    image: assets.amenityImages.openTheatre,
    description: "An open-air amphitheatre for community screenings and gatherings.",
  },
  {
    name: "Multipurpose Court",
    category: "Recreation",
    image: assets.amenityImages.multipurposeCourt,
    description: "A turf court for cricket, football, and multi-sport activities.",
  },
  {
    name: "Star Gazing Deck",
    category: "Recreation",
    image: assets.amenityImages.starGazing,
    description: "An elevated terrace for evening relaxation under an open sky.",
  },
  {
    name: "Seating Garden",
    category: "Lifestyle",
    image: assets.amenityImages.seatingArea,
    description: "Landscaped garden spaces designed for quiet conversation and community.",
  },
  {
    name: "Swing Garden",
    category: "Lifestyle",
    image: assets.amenityImages.swingArea,
    description: "Playful outdoor spaces nestled within natural greenery.",
  },
  {
    name: "Kids' Play Area",
    category: "Family",
    image: assets.amenityImages.kidsPlay,
    description: "A safe and vibrant space designed for children's active play.",
  },
];

export function AmenitiesSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, 0.05);
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((c) => (c === 0 ? amenities.length - 1 : c - 1));
  const next = () => setCurrent((c) => (c + 1) % amenities.length);

  const active = amenities[current];

  return (
    <section
      id="amenities"
      ref={ref}
      className="bg-[var(--color-ivory)] overflow-hidden"
      aria-labelledby="amenities-heading"
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
          <p className="label-sm text-[var(--color-stone)]">Amenities &amp; Lifestyle</p>
        </div>
        <div className="flex flex-col lg:flex-row lg:items-end gap-6 lg:gap-20">
          <h2
            id="amenities-heading"
            className="heading-lg text-[var(--color-deep-navy)] max-w-[20ch]"
          >
            Thoughtfully Curated
            <em> for Every</em>
            <br />
            Lifestyle.
          </h2>
          <p className="body-lg text-[var(--color-stone)] max-w-[42ch] lg:pb-2">
            10 carefully considered amenities that elevate comfort, wellness,
            and the rhythm of everyday living.
          </p>
        </div>
      </div>

      {/* Featured amenity – full width */}
      <div
        className="relative w-full min-h-[70vh] flex flex-col lg:flex-row"
        style={{
          opacity: inView ? 1 : 0,
          transition: "opacity 1s ease 0.25s",
        }}
      >
        {/* Large image */}
        <div className="relative lg:w-[60%] min-h-[55vh] overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            key={active.name}
            src={active.image}
            alt={`${active.name} at HUM Sapphire`}
            className="absolute inset-0 h-full w-full object-cover"
            style={{ transition: "opacity 0.4s ease" }}
          />
          <div className="absolute inset-0 bg-black/15" />
          {/* Category pill */}
          <div className="absolute top-6 left-6">
            <p className="label-sm text-white bg-[var(--color-deep-navy)]/70 backdrop-blur-sm px-3 py-1.5">
              {active.category}
            </p>
          </div>
          {/* Navigation */}
          <div className="absolute bottom-6 right-6 flex gap-2">
            <button
              onClick={prev}
              aria-label="Previous amenity"
              className="p-3 border border-white/40 text-white hover:bg-white hover:text-[var(--color-deep-navy)] transition-colors"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={next}
              aria-label="Next amenity"
              className="p-3 border border-white/40 text-white hover:bg-white hover:text-[var(--color-deep-navy)] transition-colors"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* Text panel */}
        <div className="lg:w-[40%] bg-[var(--color-deep-navy)] flex flex-col justify-center px-10 py-14 lg:px-14">
          <p className="label-sm text-[var(--color-gold)] mb-3">
            {String(current + 1).padStart(2, "0")} / {String(amenities.length).padStart(2, "0")}
          </p>
          <h3 className="font-serif text-white text-3xl lg:text-4xl xl:text-5xl font-light mb-5">
            {active.name}
          </h3>
          <p className="body-lg text-white/60 max-w-[38ch] mb-10">
            {active.description}
          </p>
          {/* Amenity list */}
          <div className="grid grid-cols-2 gap-x-4 gap-y-3">
            {amenities.map((a, i) => (
              <button
                key={a.name}
                onClick={() => setCurrent(i)}
                className={`text-left label-sm transition-colors ${
                  i === current
                    ? "text-[var(--color-gold)]"
                    : "text-white/35 hover:text-white/60"
                }`}
              >
                {a.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
