import React from "react";
import { Navbar } from "@/components/Navbar";
import { HeroProductStage } from "@/components/HeroProductStage";
import { OurStorySection } from "@/components/OurStorySection";
import { WorldOfTjSection } from "@/components/WorldOfTjSection";
import { Footer } from "@/components/Footer";

/**
 * PAGE 1: HOMEPAGE (route /)
 * Exactly five principal sections:
 * 01 Hero and navbar
 * 02 The Vodka: animated product showcase and information
 * 03 Our Story: brief brand introduction
 * 04 The World of TJ: campaign and editorial gallery in ONE section
 * 05 Footer and contact links
 */
export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#080808] text-[#F5F5F5]">
      <Navbar />
      <main id="main-content">
        {/* Sections 01 (Hero) + 02 (The Vodka Product Explorer) share one continuous bottle stage */}
        <HeroProductStage />

        {/* Section 03: Our Story */}
        <OurStorySection />

        {/* Section 04: The World of TJ (One combined campaign & editorial gallery section) */}
        <WorldOfTjSection />
      </main>

      {/* Section 05: Footer and Contact Links */}
      <Footer />
    </div>
  );
}
