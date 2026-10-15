"use client";

import { useEffect, useRef } from "react";
import { ChevronDown } from "lucide-react";
import { assets } from "@/lib/assets";

const clamp = (v: number, min = 0, max = 1) => Math.min(max, Math.max(min, v));
const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

/** Scroll progress at which the wordmark starts / finishes leaving the stage. */
const TITLE_OUT_START = 0.72;
const TITLE_OUT_END = 1;

/**
 * Portal hero
 * Two panels part outward to uncover the hero image while the wordmark grows,
 * tightens and splits ("HU" ← → "M"). Once split, the wordmark fades/blurs off
 * screen. Everything is bound to scroll POSITION, so it plays in reverse when
 * scrolling back up. Styles live in globals.css (.portal-*); this component
 * feeds them the --p / --e / --out variables.
 */
export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const stage = stageRef.current;
    if (!section || !stage) return;

    // Reduced motion → CSS already renders the finished (open) hero.
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduce.matches) return;

    let raf = 0;
    const update = () => {
      raf = 0;
      const track = section.offsetHeight - stage.offsetHeight;
      const p = track > 0 ? clamp(-section.getBoundingClientRect().top / track) : 1;

      // Once "HU" and "M" have fully broken apart, take the wordmark off screen.
      const out = clamp((p - TITLE_OUT_START) / (TITLE_OUT_END - TITLE_OUT_START));

      stage.style.setProperty("--p", p.toFixed(4));
      stage.style.setProperty("--e", easeInOut(p).toFixed(4));
      stage.style.setProperty("--out", out.toFixed(4));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const go = (selector: string) =>
    document.querySelector(selector)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="portal-hero"
      aria-label="HUM Sapphire hero section"
    >
      {/* No JS → show the finished, open hero */}
      <noscript>
        <style>{`.portal-hero{height:100svh;min-height:560px}.portal-stage{--p:1;--e:1;--out:1}`}</style>
      </noscript>

      <div ref={stageRef} className="portal-stage">
        {/* 1 — Background image (settles from a slight overscale) */}
        <div className="absolute inset-0 z-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={assets.heroImage}
            alt="HUM Sapphire – G+21 luxury residences in Borivali West"
            className="portal-img h-full w-full object-cover object-center"
          />
        </div>

        {/* 2 — Sapphire gradient field. Opacity rides --e, so the backdrop
               literally deepens into blue as the panels slide apart. */}
        <div className="portal-bg absolute inset-0 z-[1]" aria-hidden="true" />

        {/* 3 — Duotone wash (gold → navy) */}
        <div className="portal-wash absolute inset-0 z-[1]" aria-hidden="true" />

        {/* 4 — Readability gradients */}
        <div className="absolute inset-0 z-[2] bg-gradient-to-b from-black/50 via-black/20 to-black/70" />
        <div className="absolute inset-0 z-[2] bg-gradient-to-r from-black/40 via-transparent to-transparent" />

        {/* 5 — Radial veil + cool blue bloom that grows with the opening */}
        <div className="portal-veil absolute inset-0 z-[2]" aria-hidden="true" />
        <div className="portal-bloom absolute inset-0 z-[2]" aria-hidden="true" />

        {/* 6 — Hero copy (unchanged content) revealed once the portal is open */}
        <div className="portal-content relative z-[3] flex h-full flex-col justify-end px-6 pb-24 lg:px-16 lg:pb-20 xl:px-24">
          <div className="flex items-center gap-4 mb-6">
            <span className="gold-line" />
            <p className="label-sm text-[var(--color-gold)] tracking-[0.25em]">
              Gorai · Borivali West · Mumbai
            </p>
          </div>

          <h2 className="heading-lg text-white max-w-[16ch] mb-6">
            Where Elevation
            <br />
            <em>Meets Living.</em>
          </h2>

          <p className="body-lg text-white/70 max-w-[46ch] mb-10">
            Premium 2 &amp; 3 BHK residences in a G+21 storey tower. Thoughtfully crafted for
            modern families in the heart of Borivali West.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={() => go("#enquiry")}
              className="label-md bg-[var(--color-gold)] text-[var(--color-deep-navy)] px-8 py-3.5 hover:bg-[var(--color-gold-light)] transition-colors duration-300"
            >
              Enquire Now
            </button>
            <button
              onClick={() => go("#overview")}
              className="label-md text-white border border-white/30 px-8 py-3.5 hover:border-[var(--color-gold)] hover:text-[var(--color-gold)] transition-colors duration-300"
            >
              Explore Project
            </button>
          </div>

          <div className="hidden lg:flex absolute right-16 xl:right-24 bottom-20 flex-col items-end gap-1">
            <p className="label-sm text-white/50">MahaRERA</p>
            <p className="label-sm text-[var(--color-gold)]">PM1180002601373</p>
          </div>
        </div>

        {/* 7 — Two panels, meeting in the middle: the hero begins CLOSED.
               Gradient (not flat) + a slow breathing sheen. No centre border. */}
        <div className="portal-panel portal-panel-l z-[4]" aria-hidden="true">
          <span className="portal-panel-sheen" />
        </div>
        <div className="portal-panel portal-panel-r z-[4]" aria-hidden="true">
          <span className="portal-panel-sheen" />
        </div>

        {/* 8 — Wordmark, split into two spans. Fades away via --out once split. */}
        <h1 className="portal-title" aria-label="HUM Sapphire">
          <span aria-hidden="true">HU</span>
          <span aria-hidden="true">M</span>
        </h1>
        <div className="portal-caption" aria-hidden="true">
          <span className="gold-line" />
          <p className="label-sm text-[var(--color-gold)] tracking-[0.5em]">Sapphire</p>
          <span className="gold-line" />
        </div>

        {/* Scroll hint */}
        <button
          onClick={() => go("#overview")}
          className="portal-scroll-hint absolute bottom-24 lg:bottom-8 left-1/2 -translate-x-1/2 z-[31] flex flex-col items-center gap-2 text-white/60 hover:text-white transition-colors"
          aria-label="Scroll to explore"
        >
          <span className="label-sm tracking-[0.2em] text-white/50">Scroll</span>
          <ChevronDown size={18} className="animate-bounce" style={{ animationDuration: "2s" }} />
        </button>
      </div>
    </section>
  );
}