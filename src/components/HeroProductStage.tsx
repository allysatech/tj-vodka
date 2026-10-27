"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { SITE_CONTENT } from "@/config/siteContent";
import { MonochromeMedia } from "./MonochromeMedia";

export function HeroProductStage() {
  if (typeof document !== "undefined") {
    document
      .querySelectorAll("[data-cursor-ref]")
      .forEach((el) => el.removeAttribute("data-cursor-ref"));
  }
  const [activeTabId, setActiveTabId] = useState<string>(
    SITE_CONTENT.productExplorer.tabs[0].id
  );
  const [reducedMotion, setReducedMotion] = useState(false);

  const stageRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    // =========================================================================
    // 0. FORCE HERO START ON PAGE LOAD / RELOAD (NO SCROLL RESTORATION GLITCH)
    // =========================================================================
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    if (window.location.hash) {
      window.history.replaceState(null, "", window.location.pathname);
    }
    const htmlEl = document.documentElement;
    const prevScrollBehavior = htmlEl.style.scrollBehavior;
    htmlEl.style.scrollBehavior = "auto";
    window.scrollTo(0, 0);
    htmlEl.scrollTop = 0;
    document.body.scrollTop = 0;
    requestAnimationFrame(() => {
      htmlEl.style.scrollBehavior = prevScrollBehavior;
    });

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);

    const handleMqChange = (e: MediaQueryListEvent) => {
      setReducedMotion(e.matches);
    };
    mq.addEventListener("change", handleMqChange);

    if (mq.matches && stageRef.current) {
      stageRef.current
        .querySelectorAll<HTMLElement>(".hero-intro-word, .hero-intro-copy")
        .forEach((el) => {
          el.style.opacity = "1";
        });
      return () => mq.removeEventListener("change", handleMqChange);
    }

    const ctx = gsap.context(() => {
      const introTl = gsap.timeline({ defaults: { ease: "expo.out" } });

      introTl.fromTo(
        ".hero-intro-word",
        { y: 36, opacity: 0, scale: 0.94 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1.25,
          stagger: 0.08,
        },
        0.04
      );

      introTl.fromTo(
        ".hero-intro-copy",
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.15,
          stagger: 0.08,
          ease: "power3.out",
        },
        0.2
      );
    }, stageRef);

    return () => {
      mq.removeEventListener("change", handleMqChange);
      ctx.revert();
    };
  }, []);

  const handleTabKeyDown = (
    e: React.KeyboardEvent<HTMLButtonElement>,
    idx: number
  ) => {
    const tabs = SITE_CONTENT.productExplorer.tabs;
    let nextIdx: number | null = null;
    if (e.key === "ArrowRight") nextIdx = (idx + 1) % tabs.length;
    else if (e.key === "ArrowLeft")
      nextIdx = (idx - 1 + tabs.length) % tabs.length;
    else if (e.key === "Home") nextIdx = 0;
    else if (e.key === "End") nextIdx = tabs.length - 1;

    if (nextIdx !== null) {
      e.preventDefault();
      setActiveTabId(tabs[nextIdx].id);
      tabRefs.current[nextIdx]?.focus();
    }
  };

  const handleScrollToVodka = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const target = document.getElementById("vodka");
    if (target) {
      target.scrollIntoView({
        behavior: reducedMotion ? "auto" : "smooth",
        block: "start",
      });
    }
  };

  return (
    <div ref={stageRef} className="relative w-full overflow-hidden bg-[#080808]">
      {/* =====================================================================
          SECTION 01: HERO (Route /)
         ===================================================================== */}
      <section
        id="hero"
        aria-label="Hero — TJ Vodka"
        className="relative flex h-[100svh] w-full flex-col justify-end overflow-hidden pb-3 border-b border-[#BDBDBD]/15"
      >
        <div className="pointer-events-none absolute inset-0 z-0">
          <img
            src="/media/bw/m01-hero-script-mobile.jpg"
            alt=""
            width={576}
            height={1024}
            fetchPriority="high"
            decoding="sync"
            className="bw-enforced-media h-full w-full object-cover object-center md:hidden"
          />
          <img
            src="/media/bw/m01-hero-script.jpg"
            alt="TJ Vodka bottle with a handwritten TJ Vodka signature"
            width={1024}
            height={576}
            fetchPriority="high"
            decoding="sync"
            className="bw-enforced-media hidden h-full w-full object-cover object-center md:block"
          />
          <div className="absolute inset-x-0 bottom-0 h-[38%] bg-[linear-gradient(to_top,rgba(8,8,8,0.15)_0%,rgba(8,8,8,0.15)_68%,transparent_100%)]" />
        </div>

        <div className="relative z-10 mx-auto flex w-full max-w-[1400px] flex-col items-center justify-center px-6 md:px-12">
          {/* Slogan (Luxury Spirit Typography), Subtitle & Primary/Secondary CTAs */}
          <div className="relative z-30 mt-2 sm:mt-3 flex max-w-2xl flex-col items-center text-center">
            {/* Luxury Distillery Crest Divider */}
            <div
              aria-hidden="true"
              style={{ opacity: 0 }}
              className="hero-intro-copy mb-1.5 flex items-center justify-center gap-3"
            >
              <span className="h-[1px] w-8 sm:w-12 bg-gradient-to-r from-transparent to-[#BDBDBD]/60" />
              <span className="font-cinzel text-[9px] uppercase tracking-[0.34em] text-[#BDBDBD]">
                ◆ Signature Italian Spirit ◆
              </span>
              <span className="h-[1px] w-8 sm:w-12 bg-gradient-to-l from-transparent to-[#BDBDBD]/60" />
            </div>

            {/* Slogan in Jost Medium */}
            <h1
              style={{ opacity: 0 }}
              className="hero-intro-copy font-spirit text-[clamp(1.5rem,2.6vw,2.5rem)] font-medium uppercase leading-[1.1] tracking-[0.04em] text-[#FAF4E7] drop-shadow-[0_4px_18px_rgba(0,0,0,0.8)]"
            >
              Smoother than your average.
            </h1>

            <p
              style={{ opacity: 0 }}
              className="hero-intro-copy mt-1.5 max-w-md font-sans text-xs md:text-[13px] leading-relaxed text-[#A8A8A8]"
            >
              {SITE_CONTENT.hero.subtitle}
            </p>

            <div
              style={{ opacity: 0 }}
              className="hero-intro-copy mt-3.5 sm:mt-4 flex flex-wrap items-center justify-center gap-3 sm:gap-5"
            >
              <a
                href={SITE_CONTENT.hero.primaryCta.href}
                onClick={handleScrollToVodka}
                className="inline-flex items-center justify-center border border-[#F5F5F5] bg-[#F4F4F4] px-6 py-2.5 font-sans text-[11px] font-medium uppercase tracking-[0.2em] text-[#151515] transition-colors duration-200 hover:bg-transparent hover:text-[#F5F5F5]"
              >
                {SITE_CONTENT.hero.primaryCta.label}
              </a>
              <Link
                href={SITE_CONTENT.hero.secondaryCta.href}
                className="inline-flex items-center gap-2 border border-[#BDBDBD]/50 bg-[#080808]/60 px-6 py-2.5 font-sans text-[11px] uppercase tracking-[0.2em] text-[#F5F5F5] transition-colors duration-200 hover:border-[#F5F5F5]"
              >
                <span>{SITE_CONTENT.hero.secondaryCta.label}</span>
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Scroll Cue */}
        <div className="relative z-20 mx-auto flex w-full max-w-[1400px] items-center justify-center px-6 md:px-12">
          <a
            href="#vodka"
            onClick={handleScrollToVodka}
            className="group inline-flex flex-col items-center gap-1.5 font-sans text-[9px] uppercase tracking-[0.28em] text-[#A8A8A8] transition-colors hover:text-[#F5F5F5]"
          >
            <span>Scroll to Discover</span>
            <span
              aria-hidden="true"
              className="block h-4 w-[1px] bg-gradient-to-b from-[#BDBDBD] to-transparent"
            />
          </a>
        </div>
      </section>

      {/* =====================================================================
          SECTION 02: THE VODKA — PRODUCT EXPLORER (HWAYO-INSPIRED LAYOUT)
          Large bottle on the left; heading, 3 selectable tabs & specs on the right.
          Fits 100% in 1 viewport on laptops/desktops and phones.
         ===================================================================== */}
      <section
        id="vodka"
        aria-label="The Vodka — Product Explorer"
        className="relative z-20 flex min-h-[calc(100svh-4rem)] w-full flex-col justify-center overflow-hidden scroll-mt-16 border-b border-[#BDBDBD]/15 bg-[#050505] py-5 sm:py-6 md:py-8 lg:py-10"
      >
        {/* Responsive Background ("SMOOTHER THAN YOUR AVERAGE" warped monochrome artwork) at 50% opacity */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
        >
          {/* Phone / Mobile Viewport (< 768px): Portrait 9:16 artwork behind top bottle */}
          <img
            src="/media/bw/m04-vodka-bg-smoother-mobile-bw.jpg"
            alt=""
            style={{ opacity: 0.5 }}
            className="bw-enforced-media block h-full w-full object-cover object-top select-none md:hidden"
          />

          {/* Desktop / Tablet Viewport (>= 768px): Wide 16:6 artwork behind left bottle */}
          <img
            src="/media/bw/m04-vodka-bg-smoother-bw.jpg"
            alt=""
            style={{ opacity: 0.5 }}
            className="bw-enforced-media hidden h-full w-full object-cover object-left select-none md:block"
          />

          {/* Subtle edge blends for phone (top-to-bottom readability) and desktop (left-to-right readability) */}
          <div className="absolute inset-0 bg-[linear-gradient(180deg,#050505_0%,transparent_8%,transparent_48%,rgba(5,5,5,0.86)_66%,#050505_100%)] md:bg-[linear-gradient(180deg,#050505_0%,transparent_12%,transparent_88%,#050505_100%)]" />
          <div className="hidden md:block absolute inset-0 bg-[linear-gradient(90deg,transparent_0%,transparent_46%,rgba(5,5,5,0.82)_66%,#050505_100%)]" />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-[1400px] px-6 md:px-12">
          <div className="grid grid-cols-1 items-center gap-4 sm:gap-6 md:grid-cols-12 md:gap-10 lg:gap-14">
            {/* Left Column: Bottle Showcase Slot (M04 target for descending M01 bottle) */}
            <div className="relative flex flex-col items-center justify-center md:col-span-5 lg:col-span-6">
              {/* Vertical side label inspired by HWAYO reference */}
              <span
                aria-hidden="true"
                className="hidden lg:block absolute left-0 top-1/2 -translate-y-1/2 -rotate-90 origin-left font-sans text-[9px] uppercase tracking-[0.34em] text-[#A8A8A8]/70"
              >
                TJ VODKA · SIGNATURE 70CL
              </span>

              {/* Pedestal & Spotlight Halo so the TJ Vodka bottle stays clearly highlighted in front of the 50% background */}
              <div className="relative flex w-full items-center justify-center py-1 md:py-3">
                {/* Soft studio spotlight halo + contrast cushion behind the bottle */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-y-1 w-[220px] sm:w-[270px] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(245,245,245,0.22)_0%,rgba(8,8,8,0.65)_48%,transparent_76%)] blur-xl"
                />
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute bottom-2 h-7 w-44 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(245,245,245,0.28)_0%,rgba(189,189,189,0.08)_55%,transparent_78%)] blur-md"
                />

                {/* Target Anchor Slot where the continuous bottle settles */}
                <div
                  data-media-slot="M04"
                  className="relative z-20 h-[clamp(170px,24svh,240px)] w-[clamp(85px,12svh,120px)] md:h-[clamp(280px,54svh,440px)] md:w-[clamp(140px,27svh,215px)]"
                >
                  <MonochromeMedia slotId="M04" className="h-full w-full" />
                </div>
              </div>
            </div>

            {/* Right Column: HWAYO-Inspired Heading, 3 Information Tabs, Specs & Shop CTA */}
            <div className="flex flex-col md:col-span-7 lg:col-span-6">
              <span className="font-sans text-[10px] uppercase tracking-[0.26em] text-[#A8A8A8]">
                {SITE_CONTENT.productExplorer.eyebrow}
              </span>

              <h2 className="mt-1.5 font-serif text-[clamp(1.9rem,3.6vw,3.3rem)] font-light leading-[1.02] tracking-[0.04em] text-[#F5F5F5]">
                {SITE_CONTENT.productExplorer.heading}
              </h2>

              <p className="mt-1 font-spirit text-sm md:text-base tracking-[0.03em] text-[#BDBDBD]">
                {SITE_CONTENT.productExplorer.subheading}
              </p>

              {/* Accessible 3-Tab Selector (Overview / Origin / Serve) */}
              <div
                role="tablist"
                aria-label="TJ Vodka Information Tabs"
                className="mt-4 md:mt-5 flex items-center gap-6 sm:gap-8 border-b border-[#BDBDBD]/25"
              >
                {SITE_CONTENT.productExplorer.tabs.map((tab, idx) => {
                  const isSelected = activeTabId === tab.id;
                  return (
                    <button
                      key={tab.id}
                      ref={(el) => {
                        tabRefs.current[idx] = el;
                      }}
                      role="tab"
                      id={`tab-${tab.id}`}
                      aria-selected={isSelected}
                      aria-controls={`panel-${tab.id}`}
                      tabIndex={isSelected ? 0 : -1}
                      onClick={() => setActiveTabId(tab.id)}
                      onKeyDown={(e) => handleTabKeyDown(e, idx)}
                      className={`relative pb-2.5 font-sans text-[11px] md:text-xs uppercase tracking-[0.22em] transition-colors duration-200 ${
                        isSelected
                          ? "text-[#F5F5F5] font-medium"
                          : "text-[#A8A8A8] hover:text-[#F5F5F5]"
                      }`}
                    >
                      {tab.label}
                      {isSelected && (
                        <span
                          aria-hidden="true"
                          className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#F5F5F5]"
                        />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Tab Panels */}
              <div className="mt-3.5 md:mt-4 min-h-[108px] md:min-h-[118px]">
                {SITE_CONTENT.productExplorer.tabs.map((tab) => {
                  const isSelected = activeTabId === tab.id;
                  return (
                    <div
                      key={tab.id}
                      role="tabpanel"
                      id={`panel-${tab.id}`}
                      aria-labelledby={`tab-${tab.id}`}
                      hidden={!isSelected}
                      tabIndex={0}
                      className="focus:outline-none"
                    >
                      <h3 className="font-serif text-lg md:text-xl font-normal text-[#F5F5F5]">
                        {tab.title}
                      </h3>
                      <p className="mt-1.5 max-w-xl font-sans text-xs md:text-[13px] leading-[1.65] text-[#F5F5F5]/90">
                        {tab.body}
                      </p>
                      <p className="mt-1.5 font-sans text-[10px] leading-snug text-[#A8A8A8]">
                        {tab.note}
                      </p>
                    </div>
                  );
                })}
              </div>

              {/* Verified Specifications Row */}
              <dl className="mt-4 md:mt-5 grid grid-cols-3 gap-4 md:gap-6 border-y border-[#BDBDBD]/20 py-3 md:py-3.5">
                {SITE_CONTENT.productExplorer.specifications.map((spec) => (
                  <div key={spec.label} className="flex flex-col">
                    <dt className="font-sans text-[9px] uppercase tracking-[0.22em] text-[#A8A8A8]">
                      {spec.label}
                    </dt>
                    <dd className="mt-0.5 font-serif text-xl md:text-2xl font-light text-[#F5F5F5]">
                      {spec.value}
                    </dd>
                    <span className="mt-0.5 font-sans text-[9px] md:text-[10px] leading-tight text-[#A8A8A8]">
                      {spec.detail}
                    </span>
                  </div>
                ))}
              </dl>

              {/* Flavour range + CTA */}
              <div className="mt-4 md:mt-5 flex flex-wrap items-center gap-3">
                <Link
                  href="/products/tj-vodka"
                  className="inline-flex items-center gap-2.5 border border-[#BDBDBD]/30 bg-[#080808]/50 px-3 py-1.5 transition-colors hover:border-[#F5F5F5]"
                >
                  <img
                    src="/media/originals/m10-original-studio.jpg"
                    alt=""
                    className="bw-enforced-media h-8 w-4 object-cover object-center"
                  />
                  <span className="font-sans text-[10px] uppercase tracking-[0.18em] text-[#F5F5F5]">
                    Original
                  </span>
                </Link>
                <Link
                  href="/products/tj-vodka?flavour=vanilla"
                  className="inline-flex items-center gap-2.5 border border-[#BDBDBD]/30 bg-[#080808]/50 px-3 py-1.5 transition-colors hover:border-[#F5F5F5]"
                >
                  <img
                    src="/media/originals/m11-vanilla-studio.jpg"
                    alt=""
                    className="product-color-media h-8 w-4 object-cover object-center"
                  />
                  <span className="font-sans text-[10px] uppercase tracking-[0.18em] text-[#F5F5F5]">
                    Vanilla
                  </span>
                </Link>
              </div>

              <div className="mt-3.5 md:mt-4 flex flex-wrap items-center gap-4 md:gap-6">
                <Link
                  href={SITE_CONTENT.productExplorer.cta.href}
                  className="inline-flex items-center justify-center border border-[#F5F5F5] bg-[#F4F4F4] px-6 py-2.5 md:px-7 md:py-3 font-sans text-[11px] font-medium uppercase tracking-[0.2em] text-[#151515] transition-colors duration-200 hover:bg-transparent hover:text-[#F5F5F5]"
                >
                  {SITE_CONTENT.productExplorer.cta.label}
                </Link>
                <span className="font-sans text-[10px] md:text-[11px] tracking-[0.12em] text-[#A8A8A8]">
                  Live pricing &amp; availability on product page →
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
