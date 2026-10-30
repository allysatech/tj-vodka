"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { SITE_CONTENT } from "@/config/siteContent";

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
        className="relative h-[100svh] w-full overflow-hidden border-b border-[#BDBDBD]/15 bg-[#080808]"
      >
        <img
          src="/media/bw/m01-hero-signature-mobile.jpg"
          alt=""
          width={576}
          height={1024}
          fetchPriority="high"
          decoding="sync"
          className="bw-enforced-media absolute inset-0 h-full w-full object-cover object-center md:hidden"
        />
        <img
          src="/media/bw/m01-hero-signature.jpg"
          alt="TJ Vodka bottle with a handwritten TJ Vodka signature"
          width={1024}
          height={576}
          fetchPriority="high"
          decoding="sync"
          className="bw-enforced-media absolute inset-0 hidden h-full w-full object-cover object-center md:block"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-[42%] bg-[linear-gradient(to_top,rgba(8,8,8,0.55)_0%,rgba(8,8,8,0.18)_60%,transparent_100%)]"
        />

        <div className="relative z-10 mx-auto flex h-full w-full max-w-[1400px] flex-col items-center justify-end px-6 pb-0 pt-16 md:px-12 md:pb-1">
          <div className="flex max-w-2xl flex-col items-center text-center">
            <h1
              style={{ opacity: 0 }}
              className="hero-intro-copy font-spirit text-[clamp(1.5rem,2.6vw,2.5rem)] font-medium uppercase leading-[1.1] tracking-[0.04em] text-[#FAF4E7]"
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
              className="hero-intro-copy mt-3 flex flex-wrap items-center justify-center gap-3 sm:gap-5"
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
                className="inline-flex items-center border border-[#BDBDBD]/50 bg-[#080808] px-6 py-2.5 font-sans text-[11px] uppercase tracking-[0.2em] text-[#F5F5F5] transition-colors duration-200 hover:border-[#F5F5F5]"
              >
                {SITE_CONTENT.hero.secondaryCta.label}
              </Link>
            </div>
          </div>

          <a
            href="#vodka"
            onClick={handleScrollToVodka}
            className="group mt-4 inline-flex flex-col items-center gap-1.5 pb-1 font-sans text-[9px] uppercase tracking-[0.28em] text-[#A8A8A8] transition-colors hover:text-[#F5F5F5]"
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
          SECTION 02: THE VODKA — PRODUCT EXPLORER
          Heading, tabs, specs, and flavour buttons. One viewport, no bottle.
         ===================================================================== */}
      <section
        id="vodka"
        aria-label="The Vodka — Product Explorer"
        className="relative z-20 flex h-[calc(100svh-4rem)] w-full flex-col justify-center overflow-hidden scroll-mt-16 border-b border-[#BDBDBD]/15 bg-[#050505]"
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
          <div className="absolute inset-0 bg-[#050505]/50 md:bg-transparent" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,#050505_0%,rgba(5,5,5,0.55)_18%,rgba(5,5,5,0.55)_82%,#050505_100%)] md:bg-[linear-gradient(180deg,#050505_0%,transparent_12%,transparent_88%,#050505_100%)]" />
          <div className="hidden md:block absolute inset-0 bg-[linear-gradient(90deg,transparent_0%,transparent_34%,rgba(5,5,5,0.72)_52%,#050505_72%)]" />
        </div>

        <div className="relative z-10 mx-auto flex h-full w-full max-w-[1400px] items-center px-6 py-4 md:px-12 md:py-5">
          <div className="flex w-full flex-col text-right md:ml-auto md:w-[min(100%,640px)] lg:w-[min(100%,700px)]">
              <span className="font-sans text-[9px] uppercase tracking-[0.26em] text-[#A8A8A8]">
                {SITE_CONTENT.productExplorer.eyebrow}
              </span>

              <h2 className="mt-1 font-serif text-[clamp(1.6rem,3vw,2.7rem)] font-light leading-[1.02] tracking-[0.04em] text-[#F5F5F5]">
                {SITE_CONTENT.productExplorer.heading}
              </h2>

              <p className="mt-1 font-spirit text-xs tracking-[0.03em] text-[#BDBDBD] md:text-sm">
                {SITE_CONTENT.productExplorer.subheading}
              </p>

              {/* Accessible 3-Tab Selector (Overview / Origin / Serve) */}
              <div
                role="tablist"
                aria-label="TJ Vodka Information Tabs"
                className="mt-4 flex items-center justify-end gap-6 border-b border-[#BDBDBD]/25 sm:gap-8 md:mt-5"
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
                      className={`relative pb-2 font-sans text-[10px] uppercase tracking-[0.22em] transition-colors duration-200 md:text-[11px] ${
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
              <div className="mt-3 min-h-[92px] md:mt-3.5 md:min-h-[100px]">
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
                      <h3 className="font-serif text-base font-normal text-[#F5F5F5] md:text-lg">
                        {tab.title}
                      </h3>
                      <p className="mt-1 font-sans text-[11px] leading-snug text-[#F5F5F5]/90 md:ml-auto md:max-w-xl md:text-xs md:leading-relaxed">
                        {tab.body}
                      </p>
                      <p className="mt-1 font-sans text-[9px] leading-snug text-[#A8A8A8]">
                        {tab.note}
                      </p>
                    </div>
                  );
                })}
              </div>

              {/* Verified Specifications Row */}
              <dl className="mt-3 flex justify-end gap-6 border-y border-[#BDBDBD]/20 py-2 md:mt-5 md:gap-10 md:py-3.5">
                {SITE_CONTENT.productExplorer.specifications.map((spec) => (
                  <div key={spec.label} className="flex flex-col items-end">
                    <dt className="font-sans text-[9px] uppercase tracking-[0.22em] text-[#A8A8A8]">
                      {spec.label}
                    </dt>
                    <dd className="mt-0.5 font-serif text-lg font-light text-[#F5F5F5] md:text-xl">
                      {spec.value}
                    </dd>
                    <span className="mt-0.5 font-sans text-[9px] md:text-[10px] leading-tight text-[#A8A8A8]">
                      {spec.detail}
                    </span>
                  </div>
                ))}
              </dl>

              {/* Flavour range + CTA */}
              <div className="ml-auto mt-3 grid w-full max-w-md grid-cols-2 gap-6 md:mt-5 md:gap-10">
                <Link
                  href="/products/tj-vodka"
                  className="group flex flex-col items-center text-center"
                >
                  <img
                    src="/media/bw/m04-bottle-clean.png"
                    alt=""
                    className="bw-enforced-media h-20 w-auto object-contain object-bottom transition duration-300 group-hover:scale-105 sm:h-24"
                  />
                  <span className="mt-2 font-sans text-[10px] uppercase tracking-[0.28em] text-[#F5F5F5]">
                    Original
                  </span>
                  <span className="mt-0.5 font-serif text-[11px] italic text-[#A8A8A8]">
                    Unflavoured
                  </span>
                </Link>
                <Link
                  href="/products/tj-vodka?flavour=vanilla"
                  className="group flex flex-col items-center text-center"
                >
                  <img
                    src="/media/originals/m11-vanilla-cutout.png"
                    alt=""
                    className="product-color-media h-20 w-auto object-contain object-bottom transition duration-300 group-hover:scale-105 sm:h-24"
                  />
                  <span className="mt-2 font-sans text-[10px] uppercase tracking-[0.28em] text-[#F5F5F5]">
                    Vanilla
                  </span>
                  <span className="mt-0.5 font-serif text-[11px] italic text-[#A8A8A8]">
                    Flavoured
                  </span>
                </Link>
              </div>

              <div className="mt-2.5 flex flex-wrap items-center justify-end gap-4 md:mt-4 md:gap-6">
                <Link
                  href={SITE_CONTENT.productExplorer.cta.href}
                  className="inline-flex items-center justify-center border border-[#F5F5F5] bg-[#F4F4F4] px-5 py-2 font-sans text-[10px] font-medium uppercase tracking-[0.2em] text-[#151515] transition-colors duration-200 hover:bg-transparent hover:text-[#F5F5F5] md:px-6 md:py-2.5"
                >
                  {SITE_CONTENT.productExplorer.cta.label}
                </Link>
                <span className="font-sans text-[9px] tracking-[0.12em] text-[#A8A8A8] md:text-[10px]">
                  Live pricing &amp; availability on product page
                </span>
              </div>
            </div>
          </div>
      </section>
    </div>
  );
}
