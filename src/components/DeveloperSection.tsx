"use client";

import { useRef } from "react";
import { useInView } from "@/hooks/useInView";
import { assets } from "@/lib/assets";

const stats = [
  { value: "21+", label: "Years & Counting" },
  { value: "15 Lacs+", label: "Sq. Ft Delivered" },
  { value: "8 Lacs+", label: "Sq. Ft Ongoing" },
  { value: "2000+", label: "Happy Families" },
];

export function DeveloperSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, 0.1);

  return (
    <section
      id="developer"
      ref={ref}
      className="bg-[var(--color-ivory)]"
      aria-labelledby="dev-heading"
    >
      <div className="max-w-[1600px] mx-auto grid lg:grid-cols-2 min-h-[80vh]">
        {/* Text */}
        <div
          className="flex flex-col justify-center px-8 py-20 lg:px-16 xl:px-20"
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? "translateX(0)" : "translateX(-24px)",
            transition: "opacity 1s ease, transform 1s ease",
          }}
        >
          <div className="flex items-center gap-3 mb-8">
            <span className="gold-line" />
            <p className="label-sm text-[var(--color-stone)]">About HUM Developers</p>
          </div>
          <h2
            id="dev-heading"
            className="heading-lg text-[var(--color-deep-navy)] mb-8 max-w-[16ch]"
          >
            Transforming Spaces,
            <em> Enriching Lives.</em>
          </h2>
          <p className="body-lg text-[var(--color-stone)] mb-5 max-w-[48ch]">
            For over two decades, we have evolved from a boutique developer to
            one of the trusted names in real estate — with our portfolio spanning
            residential, commercial, and mixed-use developments.
          </p>
          <p className="body-lg text-[var(--color-stone)] mb-14 max-w-[48ch]">
            Our commitment to architectural excellence, sustainable practices,
            and a customer-centric approach has earned us the trust of over 2000
            families and recognition from industry peers.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-x-8 gap-y-10 pt-10 border-t border-[var(--color-gold)]/20">
            {stats.map((s, i) => (
              <div
                key={s.label}
                style={{
                  opacity: inView ? 1 : 0,
                  transition: `opacity 0.7s ease ${0.4 + i * 0.1}s`,
                }}
              >
                <p className="font-serif text-[var(--color-deep-navy)] text-4xl lg:text-5xl font-light mb-1">
                  {s.value}
                </p>
                <p className="label-sm text-[var(--color-stone)]">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Image */}
        <div
          className="relative overflow-hidden min-h-[50vh] lg:min-h-0"
          style={{
            opacity: inView ? 1 : 0,
            transition: "opacity 1s ease 0.3s",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={assets.developerImage}
            alt="HUM Developers – crafted spaces, refined living"
            className="absolute inset-0 h-full w-full object-cover"
            style={{
              transform: inView ? "scale(1)" : "scale(1.06)",
              transition: "transform 1.4s cubic-bezier(0.16,1,0.3,1)",
            }}
          />
          <div className="absolute inset-0 bg-[var(--color-deep-navy)]/10" />
        </div>
      </div>
    </section>
  );
}
