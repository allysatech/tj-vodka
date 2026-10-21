"use client";

import React from "react";
import { MEDIA_SLOTS, SITE_CONTENT } from "@/config/siteContent";

export function OurStorySection() {
  const bgSlot = MEDIA_SLOTS.M03;

  return (
    <section
      id="story"
      aria-label="Our Story"
      className="relative scroll-mt-16 flex h-[calc(100svh-4rem)] min-h-[540px] w-full flex-col justify-start md:justify-center overflow-hidden border-y border-[#080808]/15 bg-[#EFEFEF] pt-6 pb-8 md:py-10 text-[#080808]"
    >
      {/* Background Image (Desktop: wide right-aligned bottles; Mobile: 9:16 portrait 3-bottles + signature) */}
      <div
        data-media-slot="M03"
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden bg-[#EFEFEF]"
      >
        {/* Phone Viewport (< 768px): 9:16 portrait 3-bottles + founder signature background, anchored to bottom so signature is never cut off */}
        <img
          src={bgSlot.mobileSrc ?? "/media/bw/m03-story-bg-mobile-bw.jpg"}
          alt={bgSlot.alt}
          width={576}
          height={1024}
          className="bw-enforced-media block h-full w-full object-cover object-bottom md:hidden"
        />

        {/* Desktop & Laptop Viewport (>= 768px): Full-bleed paper texture + uncropped full-width 3 bottles & signature */}
        <img
          src={bgSlot.src}
          alt=""
          width={bgSlot.dimensions.width}
          height={bgSlot.dimensions.height}
          className="bw-enforced-media hidden h-full w-full object-cover object-left opacity-35 blur-[2px] md:block"
        />
        <div
          className="hidden md:flex absolute inset-0 items-center justify-end overflow-hidden"
          style={{
            WebkitMaskImage:
              "linear-gradient(180deg, transparent 0%, black 8%, black 92%, transparent 100%)",
            maskImage:
              "linear-gradient(180deg, transparent 0%, black 8%, black 92%, transparent 100%)",
          }}
        >
          <img
            src={bgSlot.src}
            alt={bgSlot.alt}
            width={bgSlot.dimensions.width}
            height={bgSlot.dimensions.height}
            className="bw-enforced-media h-full w-full object-contain object-right"
          />
        </div>

        {/* Mobile top-to-bottom readability veil: keeps top copy crisp while revealing the 3 bottles & bottom signature cleanly */}
        <div className="block md:hidden absolute inset-0 bg-[linear-gradient(180deg,rgba(243,243,243,0.84)_0%,rgba(243,243,243,0.74)_42%,rgba(243,243,243,0.14)_56%,transparent_68%)]" />

        {/* Desktop left-side paper-tone readability veil so copy stays razor-sharp while keeping the 3 bottles & right signature 100% clear */}
        <div className="hidden md:block absolute inset-0 bg-gradient-to-r from-[#EFEFEF]/95 via-[#EFEFEF]/75 via-38% to-transparent" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1400px] px-6 md:px-12">
        {/* Left Story Copy (Right-side image box removed so background bottles & signature shine through) */}
        <div className="grid grid-cols-1 items-center md:grid-cols-12">
          <div className="flex flex-col items-start md:col-span-6 lg:col-span-5">
            {/* Highlighted "THE SPIRIT BEHIND THE LABEL" */}
            <span className="inline-block bg-[#080808] px-3.5 py-1.5 font-sans text-[11px] font-semibold uppercase tracking-[0.26em] text-[#F5F5F5] shadow-[0_6px_18px_rgba(0,0,0,0.16)]">
              THE SPIRIT BEHIND THE LABEL
            </span>

            <h2 className="mt-4 md:mt-5 font-serif text-[clamp(2.2rem,4.2vw,3.8rem)] font-normal leading-[1.04] tracking-[0.01em] text-[#080808]">
              {SITE_CONTENT.ourStory.heading}
            </h2>

            <div className="mt-4 h-[1.5px] w-16 bg-[#080808]/65" />

            <p className="mt-4 max-w-md font-sans text-xs sm:text-sm md:text-[15px] font-medium leading-[1.75] text-[#141414]">
              {SITE_CONTENT.ourStory.paragraph}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
