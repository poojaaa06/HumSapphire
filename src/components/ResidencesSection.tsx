"use client";

import { useRef, useState } from "react";
import { useInView } from "@/hooks/useInView";
import { assets } from "@/lib/assets";

const configs = [
  {
    type: "2 BHK",
    label: "01 / Configuration",
    subtitle: "Two Bedroom Residence",
    description:
      "Thoughtfully designed two-bedroom homes with generous living areas, well-appointed bedrooms, and a contemporary kitchen. Ideal for young families and professionals.",
    image: assets.interiorImages.livingRoom,
    features: [
      "Spacious Living & Dining",
      "Master Bedroom with Wardrobe",
      "Modern Modular Kitchen",
      "Vastu Compliant Layout",
    ],
  },
  {
    type: "3 BHK",
    label: "02 / Configuration",
    subtitle: "Three Bedroom Residence",
    description:
      "Expansive three-bedroom residences offering abundant natural light, open-plan living spaces, and premium finishes throughout. Designed for families who seek generous proportions.",
    image: assets.interiorImages.masterBedroom,
    features: [
      "Large Living & Dining Area",
      "Two Full Bathrooms",
      "Premium Vitrified Flooring",
      "High-Speed Elevator Access",
    ],
  },
];

export function ResidencesSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, 0.1);
  const [active, setActive] = useState(0);

  return (
    <section
      id="residences"
      ref={ref}
      className="bg-[var(--color-cream)]"
      aria-labelledby="res-heading"
    >
      {/* Section header */}
      <div
        className="max-w-[1600px] mx-auto section-pad pb-12"
        style={{
          opacity: inView ? 1 : 0,
          transform: inView ? "translateY(0)" : "translateY(24px)",
          transition: "opacity 0.9s ease, transform 0.9s ease",
        }}
      >
        <div className="flex items-center gap-3 mb-8">
          <span className="gold-line" />
          <p className="label-sm text-[var(--color-stone)]">Residences &amp; Configurations</p>
        </div>
        <div className="flex flex-col lg:flex-row lg:items-end gap-6 lg:gap-16">
          <h2 id="res-heading" className="heading-lg text-[var(--color-deep-navy)] max-w-[18ch]">
            Your Space.
            <em> Your Way.</em>
          </h2>
          <p className="body-lg text-[var(--color-stone)] max-w-[44ch] lg:pb-2">
            Choose from spacious 2 &amp; 3 BHK residences designed for modern family
            living — each crafted with precision and purpose.
          </p>
        </div>
      </div>

      {/* Config selector tabs */}
      <div
        className="max-w-[1600px] mx-auto section-pad-x mb-1"
        style={{
          opacity: inView ? 1 : 0,
          transition: "opacity 0.9s ease 0.2s",
        }}
      >
        <div className="flex gap-0 border-b border-[var(--color-gold)]/20">
          {configs.map((c, i) => (
            <button
              key={c.type}
              onClick={() => setActive(i)}
              className={`relative pb-4 pr-8 label-md transition-colors duration-300 ${
                active === i
                  ? "text-[var(--color-deep-navy)]"
                  : "text-[var(--color-stone)] hover:text-[var(--color-deep-navy)]"
              }`}
              aria-selected={active === i}
              role="tab"
            >
              {c.type}
              {active === i && (
                <span className="absolute bottom-0 left-0 h-[2px] w-full bg-[var(--color-gold)] transition-all duration-300" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Active config layout */}
      <div
        className="max-w-[1600px] mx-auto grid lg:grid-cols-2 min-h-[70vh]"
        style={{
          opacity: inView ? 1 : 0,
          transition: "opacity 0.9s ease 0.3s",
        }}
      >
        {/* Image */}
        <div className="relative overflow-hidden min-h-[45vh] lg:min-h-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            key={configs[active].type}
            src={configs[active].image}
            alt={`${configs[active].type} interior at HUM Sapphire`}
            className="absolute inset-0 h-full w-full object-cover"
            style={{
              transition: "opacity 0.5s ease",
            }}
          />
          <div className="absolute inset-0 bg-[var(--color-deep-navy)]/10" />
          <div className="absolute top-6 left-6">
            <p className="label-sm text-white bg-[var(--color-deep-navy)]/60 px-3 py-1.5 backdrop-blur-sm">
              {configs[active].label}
            </p>
          </div>
        </div>

        {/* Text */}
        <div className="flex flex-col justify-center px-8 py-16 lg:px-16 xl:px-20">
          <p className="label-sm text-[var(--color-stone)] mb-4">
            {configs[active].subtitle}
          </p>
          <h3 className="heading-md text-[var(--color-deep-navy)] mb-6">
            {configs[active].type} Residence
          </h3>
          <p className="body-lg text-[var(--color-stone)] mb-10 max-w-[44ch]">
            {configs[active].description}
          </p>

          {/* Features */}
          <ul className="flex flex-col gap-4 mb-12">
            {configs[active].features.map((f) => (
              <li key={f} className="flex items-center gap-4">
                <span className="h-px w-8 bg-[var(--color-gold)]" />
                <span className="font-serif text-xl text-[var(--color-deep-navy)] font-light">{f}</span>
              </li>
            ))}
          </ul>

          {/* Floor plan placeholder */}
          <div className="border border-[var(--color-gold)]/30 p-6 bg-[var(--color-ivory)]">
            <p className="label-sm text-[var(--color-stone)] mb-2">Floor Plan</p>
            <p className="font-serif text-[var(--color-stone)] text-lg font-light">
              Official floor plans available upon enquiry.
            </p>
            <button
              onClick={() => document.querySelector("#enquiry")?.scrollIntoView({ behavior: "smooth" })}
              className="mt-4 label-md text-[var(--color-deep-navy)] underline underline-offset-4 hover:text-[var(--color-gold)] transition-colors"
            >
              Request Floor Plan →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
