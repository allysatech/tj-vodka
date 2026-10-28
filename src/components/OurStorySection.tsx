"use client";

import React from "react";
import { MEDIA_SLOTS, SITE_CONTENT } from "@/config/siteContent";

export function OurStorySection() {
  const bgSlot = MEDIA_SLOTS.M03;

  return (
    <section
      id="story"
      aria-label="Our Story"
      className="relative h-[calc(177.78vw+2.5rem)] w-full scroll-mt-16 overflow-hidden border-y border-[#080808]/15 bg-[#F4F4F4] text-[#080808] md:h-[56.25vw]"
    >
      <div
        data-media-slot="M03"
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0"
      >
        <img
          src={bgSlot.mobileSrc ?? "/media/bw/m03-story-splash-mobile.jpg"}
          alt=""
          width={576}
          height={1024}
          className="bw-enforced-media absolute inset-x-0 bottom-0 h-auto w-full object-contain object-bottom md:hidden"
        />
        <img
          src={bgSlot.src}
          alt={bgSlot.alt}
          width={1024}
          height={576}
          className="bw-enforced-media hidden h-full w-full object-contain object-right md:block"
        />
      </div>

      <div className="relative z-10 flex h-full items-start px-6 pt-8 md:items-center md:px-12 md:pt-0">
        <div className="flex w-full max-w-[34rem] flex-col items-start md:w-[46%] lg:w-[42%]">
          <span className="inline-block bg-[#080808] px-3 py-1 font-sans text-[10px] font-semibold uppercase tracking-[0.26em] text-[#F5F5F5] shadow-[0_6px_18px_rgba(0,0,0,0.16)] md:px-3.5 md:py-1.5 md:text-[11px]">
            THE SPIRIT BEHIND THE LABEL
          </span>

          <h2 className="mt-3 font-serif text-[clamp(1.7rem,7vw,2.4rem)] font-normal leading-[1.04] tracking-[0.01em] text-[#080808] md:mt-5 md:text-[clamp(2.2rem,4.2vw,3.8rem)]">
            {SITE_CONTENT.ourStory.heading}
          </h2>

          <div className="mt-3 h-[1.5px] w-16 bg-[#080808]/65 md:mt-4" />

          <p className="mt-3 max-w-md font-sans text-[11px] font-medium leading-[1.45] text-[#141414] sm:text-xs md:mt-4 md:text-[15px] md:leading-[1.75]">
            {SITE_CONTENT.ourStory.paragraph}
          </p>
        </div>
      </div>
    </section>
  );
}
