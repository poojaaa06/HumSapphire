"use client";

import { useRef, useState } from "react";
import { useInView } from "@/hooks/useInView";
import { Phone, MessageCircle } from "lucide-react";
import { assets } from "@/lib/assets";

export function EnquirySection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, 0.1);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    interest: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In production: connect to your CRM / email API
    console.log("Enquiry submitted:", formData);
    setSubmitted(true);
  };

  return (
    <section
      id="enquiry"
      ref={ref}
      className="relative overflow-hidden"
      aria-labelledby="enquiry-heading"
    >
      {/* Background image */}
      <div className="absolute inset-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={assets.interiorImages.lobby}
          alt=""
          aria-hidden="true"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-[var(--color-deep-navy)]/90" />
      </div>

      {/* Content */}
      <div
        className="relative z-10 max-w-[1600px] mx-auto section-pad grid lg:grid-cols-2 gap-16 lg:gap-24 items-start"
        style={{
          opacity: inView ? 1 : 0,
          transform: inView ? "translateY(0)" : "translateY(24px)",
          transition: "opacity 1s ease, transform 1s ease",
        }}
      >
        {/* Left – editorial copy */}
        <div className="flex flex-col justify-start pt-2">
          <div className="flex items-center gap-3 mb-8">
            <span className="gold-line" />
            <p className="label-sm text-[var(--color-gold)]">Get in Touch</p>
          </div>
          <h2
            id="enquiry-heading"
            className="heading-lg text-white mb-8 max-w-[16ch]"
          >
            Begin Your Journey
            <em> at HUM Sapphire.</em>
          </h2>
          <p className="body-lg text-white/60 max-w-[44ch] mb-14">
            Schedule a site visit, request a floor plan, or simply ask us
            anything. Our team is ready to guide you home.
          </p>

          {/* Contact options */}
          <div className="flex flex-col gap-6">
            <a
              href="tel:918976764979"
              className="flex items-center gap-4 group"
              aria-label="Call us at +91 89767 64979"
            >
              <div className="p-3 border border-[var(--color-gold)]/30 group-hover:bg-[var(--color-gold)] group-hover:border-transparent transition-colors">
                <Phone size={16} className="text-[var(--color-gold)] group-hover:text-[var(--color-deep-navy)]" />
              </div>
              <div>
                <p className="label-sm text-[var(--color-stone)] mb-0.5">Call us</p>
                <p className="text-white font-sans text-sm">+91 89767 64979</p>
              </div>
            </a>
            <a
              href="https://wa.me/918976764979?text=Hi%2C%20I%27m%20interested%20in%20HUM%20Sapphire.%20Please%20share%20more%20details."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 group"
              aria-label="Chat with us on WhatsApp"
            >
              <div className="p-3 border border-[var(--color-gold)]/30 group-hover:bg-[var(--color-gold)] group-hover:border-transparent transition-colors">
                <MessageCircle size={16} className="text-[var(--color-gold)] group-hover:text-[var(--color-deep-navy)]" />
              </div>
              <div>
                <p className="label-sm text-[var(--color-stone)] mb-0.5">WhatsApp</p>
                <p className="text-white font-sans text-sm">Chat with our team</p>
              </div>
            </a>
          </div>

          {/* RERA */}
          <div className="mt-14 pt-8 border-t border-white/10">
            <p className="label-sm text-[var(--color-stone)] mb-1">MahaRERA Registration</p>
            <p className="font-sans text-white/70 text-sm">PM1180002601373</p>
            <p className="font-sans text-white/40 text-xs mt-2 max-w-[36ch] leading-relaxed">
              Images shown are representative. Specifications subject to change.
              Please verify all details with the sales team.
            </p>
          </div>
        </div>

        {/* Right – enquiry form */}
        <div>
          {!submitted ? (
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-6"
              noValidate
              aria-label="Enquiry form"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label htmlFor="enq-name" className="label-sm text-[var(--color-stone)]">
                    Full Name *
                  </label>
                  <input
                    id="enq-name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    className="bg-transparent border-b border-white/20 py-3 text-white placeholder:text-white/30 font-sans text-sm focus:outline-none focus:border-[var(--color-gold)] transition-colors"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="enq-phone" className="label-sm text-[var(--color-stone)]">
                    Phone Number *
                  </label>
                  <input
                    id="enq-phone"
                    name="phone"
                    type="tel"
                    required
                    inputMode="numeric"
                    maxLength={10}
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="10-digit mobile"
                    className="bg-transparent border-b border-white/20 py-3 text-white placeholder:text-white/30 font-sans text-sm focus:outline-none focus:border-[var(--color-gold)] transition-colors"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="enq-email" className="label-sm text-[var(--color-stone)]">
                  Email Address
                </label>
                <input
                  id="enq-email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  className="bg-transparent border-b border-white/20 py-3 text-white placeholder:text-white/30 font-sans text-sm focus:outline-none focus:border-[var(--color-gold)] transition-colors"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="enq-interest" className="label-sm text-[var(--color-stone)]">
                  I Am Interested In
                </label>
                <select
                  id="enq-interest"
                  name="interest"
                  value={formData.interest}
                  onChange={handleChange}
                  className="bg-[var(--color-deep-navy)] border-b border-white/20 py-3 text-white font-sans text-sm focus:outline-none focus:border-[var(--color-gold)] transition-colors appearance-none cursor-pointer"
                >
                  <option value="">Select residence type</option>
                  <option value="2bhk">2 BHK Residence</option>
                  <option value="3bhk">3 BHK Residence</option>
                  <option value="both">2 &amp; 3 BHK (Both)</option>
                </select>
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="enq-message" className="label-sm text-[var(--color-stone)]">
                  Message (Optional)
                </label>
                <textarea
                  id="enq-message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={3}
                  placeholder="Any specific requirements or questions?"
                  className="bg-transparent border-b border-white/20 py-3 text-white placeholder:text-white/30 font-sans text-sm focus:outline-none focus:border-[var(--color-gold)] transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                className="mt-4 label-md bg-[var(--color-gold)] text-[var(--color-deep-navy)] py-4 hover:bg-[var(--color-gold-light)] transition-colors duration-300 tracking-widest"
              >
                Send Enquiry
              </button>

              <p className="font-sans text-white/30 text-xs text-center leading-relaxed">
                By submitting, you consent to being contacted by HUM Developers.
              </p>
            </form>
          ) : (
            <div className="flex flex-col items-start gap-6 pt-4">
              <span className="gold-line" />
              <h3 className="heading-md text-white">
                Thank you, {formData.name || "there"}.
              </h3>
              <p className="body-lg text-white/60 max-w-[40ch]">
                Your enquiry has been received. Our team will be in touch within
                24 hours to assist you further.
              </p>
              <a
                href="tel:918976764979"
                className="label-md text-[var(--color-gold)] underline underline-offset-4"
              >
                Or call us directly: +91 89767 64979
              </a>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
