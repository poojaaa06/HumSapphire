import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { OverviewSection } from "@/components/OverviewSection";
import { ArchitectureSection } from "@/components/ArchitectureSection";
import { ResidencesSection } from "@/components/ResidencesSection";
import { AmenitiesSection } from "@/components/AmenitiesSection";
import { DeveloperSection } from "@/components/DeveloperSection";
import { LocationSection } from "@/components/LocationSection";
import { TrailSection } from "@/components/TrailSection";
import { GallerySection } from "@/components/GallerySection";
import { EnquirySection } from "@/components/EnquirySection";
import { Footer } from "@/components/Footer";

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        {/* A — Cinematic Hero */}
        <HeroSection />
        {/* B — Project Introduction */}
        <OverviewSection />
        {/* C — Architecture & Design */}
        <ArchitectureSection />
        {/* D — Residences & Configurations */}
        <ResidencesSection />
        {/* E — Amenities & Lifestyle */}
        <AmenitiesSection />
        {/* F — Developer Heritage */}
        <DeveloperSection />
        {/* G — Location & Connectivity */}
        <LocationSection />
        {/* H — Interactive Image Trail */}
        <TrailSection />
        {/* H2 — Image Gallery */}
        <GallerySection />
        {/* I — Enquiry & Conversion */}
        <EnquirySection />
      </main>
      <Footer />
    </>
  );
}