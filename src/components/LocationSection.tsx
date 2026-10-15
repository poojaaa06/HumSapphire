"use client";

import { useRef } from "react";
import { useInView } from "@/hooks/useInView";

const locations = [
  {
    category: "Transport",
    items: [
      { name: "New Link Road", distance: "3 mins", icon: "🛣️" },
      { name: "Shimpoli Metro Station", distance: "3 mins", icon: "🚇" },
      { name: "Borivali West Metro Station", distance: "5 mins", icon: "🚇" },
    ],
  },
  {
    category: "Healthcare",
    items: [
      { name: "Mangalmurti Hospital", distance: "4 mins", icon: "🏥" },
    ],
  },
  {
    category: "Education",
    items: [
      { name: "Nalanda Law College", distance: "6 mins", icon: "🎓" },
      { name: "Swami Vivekanand International School", distance: "5 mins", icon: "🎓" },
    ],
  },
];

export function LocationSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, 0.1);

  return (
    <section
      id="location"
      ref={ref}
      className="bg-[var(--color-cream)]"
      aria-labelledby="location-heading"
    >
      <div className="max-w-[1600px] mx-auto grid lg:grid-cols-2 min-h-[80vh]">
        {/* Map / visual */}
        <div
          className="relative overflow-hidden min-h-[50vh] lg:min-h-0 order-last lg:order-first"
          style={{
            opacity: inView ? 1 : 0,
            transition: "opacity 1s ease 0.2s",
          }}
        >
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d30157.99!2d72.851!3d19.228!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b13471a4f083%3A0x6f3e6a24b1c3dbf!2sGorai%2C%20Borivali%20West%2C%20Mumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1699000000"
            className="absolute inset-0 h-full w-full border-0 grayscale"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="HUM Sapphire location map – Gorai, Borivali West, Mumbai"
            aria-label="Map showing HUM Sapphire location in Borivali West"
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-[var(--color-deep-navy)]/10 pointer-events-none" />
          {/* Location pill */}
          <div className="absolute top-6 left-6 bg-[var(--color-deep-navy)] text-white px-4 py-2">
            <p className="label-sm">Gorai · Borivali West · Mumbai</p>
          </div>
        </div>

        {/* Location details */}
        <div
          className="flex flex-col justify-center px-8 py-16 lg:px-16 xl:px-20"
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? "translateX(0)" : "translateX(24px)",
            transition: "opacity 1s ease, transform 1s ease",
          }}
        >
          <div className="flex items-center gap-3 mb-8">
            <span className="gold-line" />
            <p className="label-sm text-[var(--color-stone)]">Location &amp; Connectivity</p>
          </div>
          <h2
            id="location-heading"
            className="heading-lg text-[var(--color-deep-navy)] mb-6 max-w-[18ch]"
          >
            Well Connected.
            <em> Well Located.</em>
          </h2>
          <p className="body-lg text-[var(--color-stone)] mb-12 max-w-[44ch]">
            Situated in Gorai, Borivali West — the development offers seamless
            access to transportation hubs, healthcare, education, and leisure.
          </p>

          {/* Location categories */}
          <div className="flex flex-col gap-8">
            {locations.map((cat) => (
              <div key={cat.category}>
                <p className="label-sm text-[var(--color-gold)] mb-4">{cat.category}</p>
                <div className="flex flex-col gap-3">
                  {cat.items.map((item) => (
                    <div
                      key={item.name}
                      className="flex items-center justify-between py-3 border-b border-[var(--color-gold)]/15"
                    >
                      <p className="font-serif text-[var(--color-deep-navy)] text-lg font-light">
                        {item.name}
                      </p>
                      <p className="label-sm text-[var(--color-stone)]">{item.distance}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
