"use client";

import React from "react";
import { MEDIA_SLOTS, SITE_CONTENT } from "@/config/siteContent";

export function OurStorySection() {
  const bgSlot = MEDIA_SLOTS.M03;

  return (
    <section
      id="story"
      aria-label="Our Story"
      className="relative scroll-mt-20 overflow-hidden border-y border-[#080808]/15 bg-[#EFEFEF] pt-10 pb-64 min-h-[650px] md:min-h-0 md:py-24 lg:py-28 text-[#080808]"
    >
      {/* Background Image (Desktop: wide right-aligned bottles; Mobile: 9:16 portrait 3-bottles + signature) */}
      <div
        data-media-slot="M03"
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      >
        {/* Phone Viewport (< 768px): 9:16 portrait 3-bottles + founder signature background */}
        <img
          src={bgSlot.mobileSrc ?? "/media/bw/m03-story-bg-mobile-bw.jpg"}
          alt={bgSlot.alt}
          width={576}
          height={1024}
          className="bw-enforced-media block h-full w-full object-cover object-center md:hidden"
        />

        {/* Desktop & Tablet Viewport (>= 768px): wide 3-bottles + signature on the right */}
        <img
          src={bgSlot.src}
          alt={bgSlot.alt}
          width={bgSlot.dimensions.width}
          height={bgSlot.dimensions.height}
          className="bw-enforced-media hidden h-full w-full object-cover object-right md:block"
        />

        {/* Mobile top-to-bottom readability veil: keeps top copy crisp while revealing the 3 bottles & bottom signature cleanly */}
        <div className="block md:hidden absolute inset-0 bg-[linear-gradient(180deg,rgba(243,243,243,0.80)_0%,rgba(243,243,243,0.74)_46%,rgba(243,243,243,0.15)_60%,transparent_70%)]" />

        {/* Desktop left-side paper-tone readability veil so copy stays razor-sharp while keeping the 3 bottles & right signature 100% clear */}
        <div className="hidden md:block absolute inset-0 bg-gradient-to-r from-[#F3F3F3]/95 via-[#F3F3F3]/68 via-42% to-transparent" />
      </div>

      <div className="relative z-10 mx-auto max-w-[1400px] px-6 md:px-12">
        {/* Left Story Copy (Right-side image box removed so background bottles & signature shine through) */}
        <div className="grid grid-cols-1 items-center md:grid-cols-12">
          <div className="flex flex-col items-start md:col-span-6 lg:col-span-5">
            {/* Highlighted "THE SPIRIT BEHIND THE LABEL" */}
            <span className="inline-block bg-[#080808] px-3.5 py-1.5 font-sans text-[11px] font-semibold uppercase tracking-[0.26em] text-[#F5F5F5] shadow-[0_6px_18px_rgba(0,0,0,0.16)]">
              THE SPIRIT BEHIND THE LABEL
            </span>

            <h2 className="mt-5 font-serif text-[clamp(2.4rem,4.6vw,4.1rem)] font-normal leading-[1.04] tracking-[0.01em] text-[#080808]">
              {SITE_CONTENT.ourStory.heading}
            </h2>

            <div className="mt-5 h-[1.5px] w-16 bg-[#080808]/65" />

            <p className="mt-5 max-w-md font-sans text-sm md:text-[15px] font-medium leading-[1.8] text-[#141414]">
              {SITE_CONTENT.ourStory.paragraph}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
