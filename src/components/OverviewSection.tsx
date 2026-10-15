"use client";

import { useRef } from "react";
import { useInView } from "@/hooks/useInView";
import { assets } from "@/lib/assets";

export function OverviewSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref);

  return (
    <section
      id="overview"
      ref={ref}
      className="bg-[var(--color-ivory)]"
      aria-labelledby="overview-heading"
    >
      <div className="max-w-[1600px] mx-auto grid lg:grid-cols-2 min-h-[90vh]">
        {/* Image column */}
        <div className="relative overflow-hidden order-last lg:order-first min-h-[50vh] lg:min-h-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={assets.introImage}
            alt="HUM Sapphire – contemporary architecture in Borivali West"
            className="absolute inset-0 h-full w-full object-cover"
            style={{
              transform: inView ? "scale(1)" : "scale(1.07)",
              transition: "transform 1.4s cubic-bezier(0.16,1,0.3,1)",
            }}
          />
          {/* Subtle tint */}
          <div className="absolute inset-0 bg-[var(--color-deep-navy)]/10" />
        </div>

        {/* Text column */}
        <div
          className="flex flex-col justify-center px-8 py-20 lg:px-16 xl:px-20"
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? "translateX(0)" : "translateX(30px)",
            transition: "opacity 1s ease 0.2s, transform 1s ease 0.2s",
          }}
        >
          {/* Label */}
          <div className="flex items-center gap-3 mb-8">
            <span className="gold-line" />
            <p className="label-sm text-[var(--color-stone)]">About HUM Sapphire</p>
          </div>

          <h2
            id="overview-heading"
            className="heading-lg text-[var(--color-deep-navy)] mb-8 max-w-[16ch]"
          >
            Modern Homes.{" "}
            <em>Elevated</em>
            <br />
            Lifestyle.
          </h2>

          <div className="flex flex-col gap-5 max-w-[48ch]">
            <p className="body-lg text-[var(--color-stone)]">
              Discover thoughtfully designed 2 &amp; 3 BHK residences in a G+21
              storey tower, created for modern families who value comfort,
              convenience, and a well-rounded lifestyle.
            </p>
            <p className="body-lg text-[var(--color-stone)]">
              With spacious homes, thoughtfully planned amenities, and excellent
              connectivity to key destinations across Borivali West, experience
              a home where everyday living feels more comfortable, connected, and
              fulfilling.
            </p>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-3 gap-6 mt-14 pt-10 border-t border-[var(--color-gold)]/20">
            {[
              { value: "G+21", label: "Storey Tower" },
              { value: "2 & 3", label: "BHK Residences" },
              { value: "21+", label: "Years of Legacy" },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="font-serif text-3xl lg:text-4xl text-[var(--color-deep-navy)] font-light">
                  {stat.value}
                </p>
                <p className="label-sm text-[var(--color-stone)] mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
