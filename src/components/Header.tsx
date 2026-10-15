"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, Phone } from "lucide-react";
import { assets } from "@/lib/assets";

const navItems = [
  { label: "Overview", href: "#overview" },
  { label: "Architecture", href: "#architecture" },
  { label: "Residences", href: "#residences" },
  { label: "Amenities", href: "#amenities" },
  { label: "Location", href: "#location" },
  { label: "Gallery", href: "#gallery" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${scrolled
            ? "bg-white/95 backdrop-blur-md border-b border-[var(--color-gold)]/20 py-3"
            : "bg-transparent py-5"
          }`}
      >
        <div className="mx-auto flex max-w-[1600px] items-center justify-between px-6 lg:px-12">
          {/* Logo */}
          <Link
            href="/"
            className="relative z-10 shrink-0"
            aria-label="HUM Sapphire – home"
          >
            <Image
              src={assets.logo}
              alt="HUM Developers logo"
              width={140}
              height={44}
              className="h-10 w-auto object-contain"
              priority
              unoptimized
            />
          </Link>

          {/* Desktop nav */}
          <nav
            className="hidden lg:flex items-center gap-8"
            aria-label="Primary navigation"
          >
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => handleNavClick(item.href)}
                className={`nav-link cursor-pointer bg-transparent border-0 transition-colors duration-300 ${scrolled ? "text-[var(--color-deep-navy)]" : "text-white"
                  }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href="tel:918976764979"
              className={`flex items-center gap-2 label-md transition-colors duration-300 ${scrolled ? "text-[var(--color-deep-navy)]" : "text-white"
                } hover:text-[var(--color-gold)]`}
            >
              <Phone size={14} strokeWidth={2} />
              +91 89767 64979
            </a>
            <button
              onClick={() => handleNavClick("#enquiry")}
              className="label-md bg-[var(--color-gold)] text-[var(--color-deep-navy)] px-6 py-2.5 hover:bg-[var(--color-gold-light)] transition-colors duration-300 tracking-widest"
            >
              Enquire
            </button>
          </div>

          {/* Mobile hamburger */}
          <button
            className={`lg:hidden p-2 transition-colors ${scrolled ? "text-[var(--color-deep-navy)]" : "text-white"
              }`}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Mobile overlay */}
      <div
        className={`fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden transition-opacity duration-300 ${mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          }`}
        onClick={() => setMobileOpen(false)}
        aria-hidden="true"
      />

      {/* Mobile drawer */}
      <aside
        className={`fixed inset-y-0 right-0 z-40 w-[85%] max-w-sm flex flex-col bg-[var(--color-deep-navy)] lg:hidden transition-transform duration-300 ease-out ${mobileOpen ? "translate-x-0" : "translate-x-full"
          }`}
        aria-hidden={!mobileOpen}
      >
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
          <Image
            src={assets.logo}
            alt="HUM Developers logo"
            width={120}
            height={38}
            className="h-9 w-auto brightness-0 invert object-contain"
            unoptimized
          />
          <button
            onClick={() => setMobileOpen(false)}
            className="text-white p-2"
            aria-label="Close menu"
          >
            <X size={22} />
          </button>
        </div>

        <nav className="flex flex-col px-6 py-8 gap-1 flex-1">
          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={() => handleNavClick(item.href)}
              className="text-left py-4 border-b border-white/10 text-white/80 hover:text-[var(--color-gold)] label-md transition-colors"
            >
              {item.label}
            </button>
          ))}
        </nav>

        <div className="px-6 py-8 border-t border-white/10 flex flex-col gap-4">
          <a
            href="tel:918976764979"
            className="flex items-center gap-3 text-white/70 label-md hover:text-white transition-colors"
          >
            <Phone size={14} />
            +91 89767 64979
          </a>
          <button
            onClick={() => handleNavClick("#enquiry")}
            className="w-full bg-[var(--color-gold)] text-[var(--color-deep-navy)] py-3 label-md hover:bg-[var(--color-gold-light)] transition-colors"
          >
            Enquire Now
          </button>
        </div>
      </aside>
    </>
  );
}
