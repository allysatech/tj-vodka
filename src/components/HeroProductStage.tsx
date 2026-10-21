"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { MEDIA_SLOTS, SITE_CONTENT } from "@/config/siteContent";
import { MonochromeMedia } from "./MonochromeMedia";

function clamp01(val: number): number {
  return Math.min(1, Math.max(0, val));
}

function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

// Resting hero tilt angle (in degrees, tilted right like the reference video)
const HERO_REST_TILT_DEG = 11.5;

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
  const heroSectionRef = useRef<HTMLElement>(null);
  const productSectionRef = useRef<HTMLElement>(null);
  const heroBottleAnchorRef = useRef<HTMLDivElement>(null);
  const productBottleAnchorRef = useRef<HTMLDivElement>(null);
  const floatingBottleRef = useRef<HTMLDivElement>(null);
  const floatingBottleInnerRef = useRef<HTMLDivElement>(null);
  const heroTextWrapRef = useRef<HTMLDivElement>(null);
  const heroMirrorRef = useRef<HTMLDivElement>(null);
  const heroCopyWrapRef = useRef<HTMLDivElement>(null);
  const productCopyColRef = useRef<HTMLDivElement>(null);
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

    // =========================================================================
    // 1. SCROLL-DRIVEN CHOREOGRAPHY (Section 01 Hero -> Section 02 The Vodka)
    // Smoothly drives the bottle from its tilted central Hero position into the
    // upright left-hand slot of Section 02 Product Explorer as the user scrolls.
    // =========================================================================
    const updateScrollChoreography = () => {
      const stage = stageRef.current;
      const heroAnchor = heroBottleAnchorRef.current;
      const prodAnchor = productBottleAnchorRef.current;
      const bottle = floatingBottleRef.current;
      if (!stage || !heroAnchor || !prodAnchor || !bottle) return;

      const stageRect = stage.getBoundingClientRect();
      const heroRect = heroAnchor.getBoundingClientRect();
      const prodRect = prodAnchor.getBoundingClientRect();

      // Document-relative coordinates inside stageRef (invariant to current scrollY)
      const startX = heroRect.left - stageRect.left + heroRect.width / 2;
      const startY = heroRect.top - stageRect.top + heroRect.height / 2;

      const endX = prodRect.left - stageRect.left + prodRect.width / 2;
      const endY = prodRect.top - stageRect.top + prodRect.height / 2;

      const deltaX = endX - startX;
      const deltaY = endY - startY;
      const endScale = Math.min(
        1.05,
        Math.max(0.84, prodRect.height / Math.max(1, heroRect.height))
      );

      // Scroll distance over which the bottle travels from Hero center to Product Explorer slot
      const scrollY = window.scrollY || document.documentElement.scrollTop || 0;
      const targetScroll = Math.max(420, endY - window.innerHeight * 0.48);
      const progress = clamp01(scrollY / targetScroll);
      const easedBottle = easeInOutCubic(progress);

      // Counter-rotate from 0deg to -HERO_REST_TILT_DEG so net bottle rotation goes from +11.5deg (Hero) to 0deg (Section 02)
      const startScale = 1.06;
      const curX = deltaX * easedBottle;
      const curY = deltaY * easedBottle;
      const curScale = startScale + (endScale - startScale) * easedBottle;
      const scrollCounterRot = -HERO_REST_TILT_DEG * easedBottle;

      bottle.style.left = `${startX}px`;
      bottle.style.top = `${startY}px`;
      bottle.style.width = `${heroRect.width}px`;
      bottle.style.height = `${heroRect.height}px`;
      bottle.style.opacity = "1";
      bottle.style.transform = `translate(-50%, -50%) translate3d(${curX.toFixed(
        2
      )}px, ${curY.toFixed(2)}px, 0px) rotate(${scrollCounterRot.toFixed(
        2
      )}deg) scale(${curScale.toFixed(4)})`;

      // Hero "TJ VODKA" + mirror reflection behind bottle move upward & fade on scroll
      if (heroTextWrapRef.current) {
        const pText = clamp01(progress / 0.65);
        const textY = -125 * pText;
        const textScale = 1 - 0.06 * pText;
        const textOpacity = 1 - pText * 0.96;
        heroTextWrapRef.current.style.transform = `translate3d(0px, ${textY.toFixed(
          1
        )}px, 0px) scale(${textScale.toFixed(3)})`;
        heroTextWrapRef.current.style.opacity = `${textOpacity.toFixed(3)}`;
      }

      // Mirror reflection under "TJ VODKA" shifts slightly downward as title rises
      if (heroMirrorRef.current) {
        const pMirror = clamp01(progress / 0.5);
        const mirrorY = 26 * pMirror;
        const mirrorOpacity = 0.95 * (1 - pMirror);
        heroMirrorRef.current.style.transform = `translate3d(0px, ${mirrorY.toFixed(
          1
        )}px, 0px)`;
        heroMirrorRef.current.style.opacity = `${mirrorOpacity.toFixed(3)}`;
      }

      // Hero slogan, subtitle & CTAs clear upward early so bottle never covers readable text
      if (heroCopyWrapRef.current) {
        const pCopy = clamp01(progress / 0.38);
        const copyY = -75 * pCopy;
        const copyOpacity = 1 - pCopy;
        heroCopyWrapRef.current.style.transform = `translate3d(0px, ${copyY.toFixed(
          1
        )}px, 0px)`;
        heroCopyWrapRef.current.style.opacity = `${copyOpacity.toFixed(3)}`;
      }

      // Product Explorer right column rises & fades in beside the bottle
      if (productCopyColRef.current) {
        const pProd = easeOutCubic(clamp01((progress - 0.32) / 0.68));
        const prodY = 48 * (1 - pProd);
        const prodOpacity = 0.14 + 0.86 * pProd;
        productCopyColRef.current.style.transform = `translate3d(0px, ${prodY.toFixed(
          1
        )}px, 0px)`;
        productCopyColRef.current.style.opacity = `${prodOpacity.toFixed(3)}`;
      }
    };

    // Position the outer bottle container BEFORE revealing anything
    updateScrollChoreography();

    if (mq.matches) {
      return () => mq.removeEventListener("change", handleMqChange);
    }

    // =========================================================================
    // 2. PAGE-LOAD ENTRANCE ANIMATION (Zero initial glitch: elements start at
    //    opacity: 0 in SSR HTML and smoothly animate in once positioned)
    // =========================================================================
    const ctx = gsap.context(() => {
      const introTl = gsap.timeline({ defaults: { ease: "expo.out" } });

      // Background "TJ VODKA" & mirror reflection reveal
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

      // Bottle slides in from bottom-left with a tilted angle into the center hero stage
      if (floatingBottleInnerRef.current) {
        introTl.fromTo(
          floatingBottleInnerRef.current,
          {
            x: -185,
            y: 430,
            rotation: 25,
            scale: 0.84,
            opacity: 0,
          },
          {
            x: 0,
            y: 0,
            rotation: HERO_REST_TILT_DEG,
            scale: 1,
            opacity: 1,
            duration: 1.75,
            ease: "expo.out",
          },
          0.1
        );
      }

      // Slogan, subtitle & CTAs reveal beneath
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
        0.34
      );
    }, stageRef);

    window.addEventListener("scroll", updateScrollChoreography, {
      passive: true,
    });
    window.addEventListener("resize", updateScrollChoreography);

    const ro = new ResizeObserver(() => {
      updateScrollChoreography();
    });
    if (stageRef.current) {
      ro.observe(stageRef.current);
    }

    return () => {
      mq.removeEventListener("change", handleMqChange);
      window.removeEventListener("scroll", updateScrollChoreography);
      window.removeEventListener("resize", updateScrollChoreography);
      ro.disconnect();
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
          SHARED CONTINUOUS BOTTLE LAYER (M01 -> M04)
          Starts at opacity: 0 in SSR HTML so there is zero flash/glitch on the
          very first frame before layout measurements complete.
         ===================================================================== */}
      {!reducedMotion && (
        <div
          ref={floatingBottleRef}
          aria-hidden="true"
          data-media-slot="M01"
          style={{
            opacity: 0,
            left: "50%",
            top: "380px",
            width: "215px",
            height: "430px",
            transform: "translate(-50%, -50%) scale(1.06)",
          }}
          className="pointer-events-none absolute z-30 flex items-center justify-center will-change-transform"
        >
          <div
            ref={floatingBottleInnerRef}
            style={{
              opacity: 0,
              transform:
                "translate3d(-185px, 430px, 0px) rotate(25deg) scale(0.84)",
            }}
            className="relative flex h-full w-full items-center justify-center will-change-transform"
          >
            {/* Studio rim glow + dark contrast core behind bottle so it stays highlighted */}
            <div className="absolute -inset-x-6 inset-y-4 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(8,8,8,0.82)_0%,rgba(8,8,8,0.48)_42%,transparent_74%)] blur-lg" />
            <div className="absolute inset-x-2 inset-y-8 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(245,245,245,0.28)_0%,rgba(189,189,189,0.1)_48%,transparent_75%)] blur-xl" />
            <img
              src={MEDIA_SLOTS.M01.src}
              alt={MEDIA_SLOTS.M01.alt}
              width={MEDIA_SLOTS.M01.dimensions.width}
              height={MEDIA_SLOTS.M01.dimensions.height}
              fetchPriority="high"
              decoding="sync"
              className="bw-enforced-media bottle-highlight-filter relative z-10 h-full w-full object-contain"
            />
          </div>
        </div>
      )}

      {/* =====================================================================
          SECTION 01: HERO (Route /)
         ===================================================================== */}
      <section
        id="hero"
        ref={heroSectionRef}
        aria-label="Hero — TJ Vodka"
        className="relative flex min-h-[100svh] w-full flex-col justify-between pt-24 pb-12 md:pt-28 md:pb-14 border-b border-[#BDBDBD]/15"
      >
        {/* Media M02: Monochrome studio-light background layer (separate from bottle & text) */}
        <div
          data-media-slot="M02"
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
        >
          <MonochromeMedia
            slotId="M02"
            priority
            className="h-full w-full opacity-80 studio-light-pulse"
          />
          {/* Controlled neutral spotlight & dark vignette */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_58%_50%_at_50%_40%,rgba(245,245,245,0.15)_0%,rgba(20,20,20,0.62)_54%,#080808_88%)]" />
        </div>

        {/* Center Hero Stage: Bold Blocky "TJ VODKA" + Mirror Effect BEHIND the Central Bottle */}
        <div className="relative z-10 mx-auto my-auto flex w-full max-w-[1400px] flex-col items-center justify-center px-6 py-4 md:px-12">
          {/* Layered Stage where "TJ VODKA" & its Mirror Reflection sit directly BEHIND the Bottle */}
          <div className="relative flex w-full items-center justify-center py-2 sm:py-4">
            {/* Z-10 LAYER (BEHIND BOTTLE): Heavy Geometric Display "TJ VODKA" + Mirror Reflection Underneath */}
            <div
              ref={heroTextWrapRef}
              className="pointer-events-none absolute inset-x-0 top-[44%] z-10 flex -translate-y-1/2 flex-col items-center justify-center select-none will-change-transform"
            >
              {/* Primary Upright "TJ VODKA" Display Wordmark */}
              <div
                style={{ opacity: 0 }}
                className="hero-intro-word flex scale-x-[1.1] items-center justify-center gap-[0.18em] sm:gap-[0.22em] md:gap-[0.26em] whitespace-nowrap font-display text-[clamp(2.9rem,10.2vw,10.2rem)] uppercase leading-[0.86] tracking-[0.04em] text-[#F5F5F5] drop-shadow-[0_12px_32px_rgba(0,0,0,0.85)]"
              >
                <span>{SITE_CONTENT.hero.titleLeft}</span>
                <span>{SITE_CONTENT.hero.titleRight}</span>
              </div>

              {/* Subtle Studio Horizon Reflection Line */}
              <div
                aria-hidden="true"
                className="my-0.5 h-[1px] w-[min(82vw,840px)] bg-gradient-to-r from-transparent via-[#BDBDBD]/50 to-transparent"
              />

              {/* Mirror Effect Directly Under "TJ VODKA" */}
              <div
                ref={heroMirrorRef}
                aria-hidden="true"
                className="hero-mirror-reflection pointer-events-none -mt-0.5 sm:-mt-1 overflow-hidden select-none will-change-transform"
              >
                <div
                  style={{ opacity: 0 }}
                  className="hero-intro-word flex scale-x-[1.1] scale-y-[-1] items-center justify-center gap-[0.18em] sm:gap-[0.22em] md:gap-[0.26em] whitespace-nowrap font-display text-[clamp(2.9rem,10.2vw,10.2rem)] uppercase leading-[0.86] tracking-[0.04em] text-[#BDBDBD]/95 blur-[0.5px]"
                >
                  <span>{SITE_CONTENT.hero.titleLeft}</span>
                  <span>{SITE_CONTENT.hero.titleRight}</span>
                </div>
              </div>
            </div>

            {/* Z-20 / Z-30 FOREGROUND BOTTLE ANCHOR SLOT (In front of "TJ VODKA" & Mirror) */}
            <div
              ref={heroBottleAnchorRef}
              className="relative z-20 h-[290px] w-[145px] sm:h-[360px] sm:w-[180px] md:h-[430px] md:w-[215px] lg:h-[470px] lg:w-[235px]"
            >
              {/* Studio floor shadow & subtle glass base reflection */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -bottom-3 left-1/2 h-6 w-36 -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.9)_0%,rgba(189,189,189,0.12)_55%,transparent_80%)] blur-[2px]"
              />
              {reducedMotion && (
                <MonochromeMedia
                  slotId="M01"
                  priority
                  className="relative z-20 h-full w-full"
                />
              )}
            </div>
          </div>

          {/* Slogan (Luxury Spirit Typography), Subtitle & Primary/Secondary CTAs */}
          <div
            ref={heroCopyWrapRef}
            className="relative z-20 mt-6 flex max-w-2xl flex-col items-center text-center will-change-transform"
          >
            {/* Luxury Distillery Crest Divider */}
            <div
              aria-hidden="true"
              style={{ opacity: 0 }}
              className="hero-intro-copy mb-2.5 flex items-center justify-center gap-3"
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
              className="hero-intro-copy font-spirit text-[clamp(1.75rem,3.3vw,3rem)] font-medium tracking-[0.04em] bg-gradient-to-r from-[#BDBDBD] via-[#F5F5F5] to-[#BDBDBD] bg-clip-text text-transparent drop-shadow-[0_4px_18px_rgba(0,0,0,0.8)]"
            >
              {SITE_CONTENT.hero.slogan}
            </h1>

            <p
              style={{ opacity: 0 }}
              className="hero-intro-copy mt-3 max-w-md font-sans text-xs md:text-sm leading-relaxed text-[#A8A8A8]"
            >
              {SITE_CONTENT.hero.subtitle}
            </p>

            <div
              style={{ opacity: 0 }}
              className="hero-intro-copy mt-7 flex flex-wrap items-center justify-center gap-4 sm:gap-6"
            >
              <a
                href={SITE_CONTENT.hero.primaryCta.href}
                onClick={handleScrollToVodka}
                className="inline-flex items-center justify-center border border-[#F5F5F5] bg-[#F4F4F4] px-7 py-3.5 font-sans text-[11px] font-medium uppercase tracking-[0.2em] text-[#151515] transition-colors duration-200 hover:bg-transparent hover:text-[#F5F5F5]"
              >
                {SITE_CONTENT.hero.primaryCta.label}
              </a>
              <Link
                href={SITE_CONTENT.hero.secondaryCta.href}
                className="inline-flex items-center gap-2 border border-[#BDBDBD]/50 bg-[#080808]/60 px-7 py-3.5 font-sans text-[11px] uppercase tracking-[0.2em] text-[#F5F5F5] transition-colors duration-200 hover:border-[#F5F5F5]"
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
            className="group inline-flex flex-col items-center gap-2 font-sans text-[9px] uppercase tracking-[0.28em] text-[#A8A8A8] transition-colors hover:text-[#F5F5F5]"
          >
            <span>Scroll to Discover</span>
            <span
              aria-hidden="true"
              className="block h-6 w-[1px] bg-gradient-to-b from-[#BDBDBD] to-transparent"
            />
          </a>
        </div>
      </section>

      {/* =====================================================================
          SECTION 02: THE VODKA — PRODUCT EXPLORER (HWAYO-INSPIRED LAYOUT)
          Large bottle on the left; heading, 3 selectable tabs & specs on the right.
         ===================================================================== */}
      <section
        id="vodka"
        ref={productSectionRef}
        aria-label="The Vodka — Product Explorer"
        className="relative z-20 overflow-hidden scroll-mt-20 border-b border-[#BDBDBD]/15 bg-[#050505] py-20 md:py-28 lg:py-36"
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

        <div className="relative z-10 mx-auto max-w-[1400px] px-6 md:px-12">
          <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-12 md:gap-12 lg:gap-16">
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
              <div className="relative flex w-full items-center justify-center py-6">
                {/* Soft studio spotlight halo + contrast cushion behind the bottle */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-y-2 w-[260px] sm:w-[310px] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(245,245,245,0.22)_0%,rgba(8,8,8,0.65)_48%,transparent_76%)] blur-xl"
                />
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute bottom-4 h-9 w-52 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(245,245,245,0.28)_0%,rgba(189,189,189,0.08)_55%,transparent_78%)] blur-md"
                />

                {/* Target Anchor Slot where the continuous bottle settles */}
                <div
                  ref={productBottleAnchorRef}
                  data-media-slot="M04"
                  className="relative z-20 h-[310px] w-[155px] sm:h-[360px] sm:w-[180px] md:h-[440px] md:w-[215px] lg:h-[490px] lg:w-[240px]"
                >
                  {reducedMotion && (
                    <MonochromeMedia
                      slotId="M04"
                      className="h-full w-full"
                    />
                  )}
                </div>
              </div>
            </div>

            {/* Right Column: HWAYO-Inspired Heading, 3 Information Tabs, Specs & Shop CTA */}
            <div
              ref={productCopyColRef}
              className="flex flex-col md:col-span-7 lg:col-span-6 will-change-transform"
            >
              <span className="font-sans text-[10px] uppercase tracking-[0.26em] text-[#A8A8A8]">
                {SITE_CONTENT.productExplorer.eyebrow}
              </span>

              <h2 className="mt-3 font-serif text-[clamp(2.5rem,5vw,4.5rem)] font-light leading-[1.02] tracking-[0.04em] text-[#F5F5F5]">
                {SITE_CONTENT.productExplorer.heading}
              </h2>

              <p className="mt-2 font-spirit text-lg tracking-[0.03em] text-[#BDBDBD]">
                {SITE_CONTENT.productExplorer.subheading}
              </p>

              {/* Accessible 3-Tab Selector (Overview / Origin / Serve) */}
              <div
                role="tablist"
                aria-label="TJ Vodka Information Tabs"
                className="mt-8 flex items-center gap-8 border-b border-[#BDBDBD]/25"
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
                      className={`relative pb-3.5 font-sans text-xs uppercase tracking-[0.22em] transition-colors duration-200 ${
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
              <div className="mt-7 min-h-[155px]">
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
                      <h3 className="font-serif text-2xl font-normal text-[#F5F5F5]">
                        {tab.title}
                      </h3>
                      <p className="mt-3 max-w-xl font-sans text-sm leading-[1.8] text-[#F5F5F5]/90">
                        {tab.body}
                      </p>
                      <p className="mt-3 font-sans text-[11px] leading-relaxed text-[#A8A8A8]">
                        {tab.note}
                      </p>
                    </div>
                  );
                })}
              </div>

              {/* Verified Specifications Row */}
              <dl className="mt-8 grid grid-cols-3 gap-6 border-y border-[#BDBDBD]/20 py-6">
                {SITE_CONTENT.productExplorer.specifications.map((spec) => (
                  <div key={spec.label} className="flex flex-col">
                    <dt className="font-sans text-[9px] uppercase tracking-[0.22em] text-[#A8A8A8]">
                      {spec.label}
                    </dt>
                    <dd className="mt-1.5 font-serif text-2xl md:text-3xl font-light text-[#F5F5F5]">
                      {spec.value}
                    </dd>
                    <span className="mt-1 font-sans text-[10px] text-[#A8A8A8]">
                      {spec.detail}
                    </span>
                  </div>
                ))}
              </dl>

              {/* CTA to Page 2 (/products/tj-vodka) */}
              <div className="mt-9 flex flex-wrap items-center gap-6">
                <Link
                  href={SITE_CONTENT.productExplorer.cta.href}
                  className="inline-flex items-center justify-center border border-[#F5F5F5] bg-[#F4F4F4] px-8 py-4 font-sans text-[11px] font-medium uppercase tracking-[0.2em] text-[#151515] transition-colors duration-200 hover:bg-transparent hover:text-[#F5F5F5]"
                >
                  {SITE_CONTENT.productExplorer.cta.label}
                </Link>
                <span className="font-sans text-[11px] tracking-[0.12em] text-[#A8A8A8]">
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
