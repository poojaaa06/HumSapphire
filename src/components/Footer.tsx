"use client";

import Image from "next/image";
import { Phone, MessageCircle } from "lucide-react";
import { assets } from "@/lib/assets";

const navLinks = [
  { label: "Overview", href: "#overview" },
  { label: "Architecture", href: "#architecture" },
  { label: "Residences", href: "#residences" },
  { label: "Amenities", href: "#amenities" },
  { label: "Location", href: "#location" },
  { label: "Gallery", href: "#gallery" },
  { label: "Enquire", href: "#enquiry" },
];

export function Footer() {
  const scrollTo = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="bg-[var(--color-deep-navy)] border-t border-white/10 pb-14 lg:pb-0" role="contentinfo">
      <div className="max-w-[1600px] mx-auto section-pad">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Image
              src={assets.logo}
              alt="HUM Developers logo"
              width={140}
              height={44}
              className="h-10 w-auto brightness-0 invert mb-6 object-contain"
              unoptimized
            />
            <p className="font-sans text-sm text-white/50 leading-relaxed max-w-[28ch]">
              Building dreams and creating legacies in Mumbai&apos;s premium
              real estate landscape for over 21+ years.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <p className="label-sm text-[var(--color-gold)] mb-6">Navigate</p>
            <ul className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => scrollTo(link.href)}
                    className="font-sans text-sm text-white/50 hover:text-white transition-colors cursor-pointer bg-transparent border-0 p-0 text-left"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Project */}
          <div>
            <p className="label-sm text-[var(--color-gold)] mb-6">HUM Sapphire</p>
            <div className="flex flex-col gap-3">
              <p className="font-sans text-sm text-white/50">
                2 &amp; 3 BHK Premium Residences
              </p>
              <p className="font-sans text-sm text-white/50">
                G+21 Storey Tower
              </p>
              <p className="font-sans text-sm text-white/50">
                Gorai, Borivali West, Mumbai
              </p>
              <div className="mt-2 pt-4 border-t border-white/10">
                <p className="label-sm text-white/30 mb-1">MahaRERA</p>
                <p className="font-sans text-sm text-white/40">PM1180002601373</p>
              </div>
            </div>
          </div>

          {/* Contact */}
          <div>
            <p className="label-sm text-[var(--color-gold)] mb-6">Contact</p>
            <div className="flex flex-col gap-5">
              <a
                href="tel:918976764979"
                className="flex items-start gap-3 group"
              >
                <Phone size={14} className="text-white/40 group-hover:text-[var(--color-gold)] transition-colors mt-0.5 shrink-0" />
                <div>
                  <p className="font-sans text-sm text-white/50 group-hover:text-white transition-colors">
                    +91 89767 64979
                  </p>
                  <p className="label-sm text-white/25">Call us anytime</p>
                </div>
              </a>
              <a
                href="https://wa.me/918976764979?text=Hi%2C%20I%27m%20interested%20in%20HUM%20Sapphire."
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 group"
              >
                <MessageCircle size={14} className="text-white/40 group-hover:text-[var(--color-gold)] transition-colors mt-0.5 shrink-0" />
                <div>
                  <p className="font-sans text-sm text-white/50 group-hover:text-white transition-colors">
                    WhatsApp
                  </p>
                  <p className="label-sm text-white/25">Chat with our team</p>
                </div>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-sans text-xs text-white/25 text-center md:text-left">
            © {new Date().getFullYear()} HUM Developers. All rights reserved.
          </p>
          <p className="font-sans text-xs text-white/20 text-center leading-relaxed max-w-[60ch]">
            All images are for representational purposes only. Furniture, décor, and
            landscaping are suggested concepts. Please confirm all details with the
            sales team.
          </p>
        </div>
      </div>

      {/* Mobile fixed bottom bar */}
      <div className="fixed inset-x-0 bottom-0 z-50 flex border-t border-[var(--color-gold)]/30 bg-[var(--color-deep-navy)] lg:hidden">
        <a
          href="tel:918976764979"
          className="flex h-14 flex-1 items-center justify-center label-sm text-white hover:bg-white/5 transition-colors"
        >
          Call Now
        </a>
        <div className="my-3 w-px bg-[var(--color-gold)]/30" />
        <a
          href="https://wa.me/918976764979?text=Hi%2C%20I%27m%20interested%20in%20HUM%20Sapphire."
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-14 flex-1 items-center justify-center label-sm text-white hover:bg-white/5 transition-colors"
        >
          WhatsApp
        </a>
        <div className="my-3 w-px bg-[var(--color-gold)]/30" />
        <button
          onClick={() => document.querySelector("#enquiry")?.scrollIntoView({ behavior: "smooth" })}
          className="flex h-14 flex-1 items-center justify-center bg-[var(--color-gold)] label-sm text-[var(--color-deep-navy)] hover:bg-[var(--color-gold-light)] transition-colors"
        >
          Enquire
        </button>
      </div>
    </footer>
  );
}