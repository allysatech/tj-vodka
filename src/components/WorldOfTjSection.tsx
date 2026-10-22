"use client";

import React, { useEffect, useRef } from "react";
import { MEDIA_SLOTS } from "@/config/siteContent";

/**
 * SECTION 04: THE WORLD OF TJ (Image 5 / Voyager2-inspired 3D Curved Showcase)
 * - Image 4 (M08: Gentleman in armchair with TJ Vodka) starts as #1 Main Centerpiece
 * - Left & Right circular icon buttons centered below the gallery to smoothly switch images
 * - Buttery-smooth 60fps requestAnimationFrame 3D coverflow transition + smooth 3D hover lift/tilt
 * - Page number & page title removed, zero wording on cards, images unclickable for inspect
 * - Original colour retained in this gallery only
 */

const BASE_CARDS = [
  {
    id: "main-lounge",
    src: MEDIA_SLOTS.M08.originalMasterSrc,
    alt: MEDIA_SLOTS.M08.alt,
    objectPosition: "62% 42%",
  },
  {
    id: "culture-sneakers",
    src: MEDIA_SLOTS.M07.originalMasterSrc,
    alt: MEDIA_SLOTS.M07.alt,
    objectPosition: "50% 52%",
  },
  {
    id: "venue-tiered-bar",
    src: MEDIA_SLOTS.M09.originalMasterSrc,
    alt: MEDIA_SLOTS.M09.alt,
    objectPosition: "50% 54%",
  },
  {
    id: "atmosphere-shelves",
    src: MEDIA_SLOTS.M06.originalMasterSrc,
    alt: MEDIA_SLOTS.M06.alt,
    objectPosition: "42% 58%",
  },
  {
    id: "vanilla-serve",
    src: MEDIA_SLOTS.M12.originalMasterSrc,
    alt: MEDIA_SLOTS.M12.alt,
    objectPosition: "50% 48%",
  },
  {
    id: "mixology-splash",
    src: MEDIA_SLOTS.M13.originalMasterSrc,
    alt: MEDIA_SLOTS.M13.alt,
    objectPosition: "50% 42%",
  },
  {
    id: "couple-toast",
    src: "/media/originals/m14-couple-toast.jpg",
    alt: "Couple toasting martinis with a bottle of TJ Vodka at a candlelit table",
    objectPosition: "50% 42%",
  },
  {
    id: "alpine-terrace",
    src: "/media/originals/m15-alpine-terrace.jpg",
    alt: "TJ Vodka bottle and crystal tumbler on a snowy alpine terrace",
    objectPosition: "50% 48%",
  },
  {
    id: "snowboard-stand",
    src: "/media/originals/m16-snowboard-stand.jpg",
    alt: "TJ Vodka bottle in the snow with a snowboarder standing on the slope behind it",
    objectPosition: "50% 55%",
  },
  {
    id: "snowboard-jump",
    src: "/media/originals/m17-snowboard-jump.jpg",
    alt: "Snowboarder jumping over a TJ Vodka bottle in fresh powder",
    objectPosition: "50% 48%",
  },
];

// Circular ring (2x unique images) so visible 3D coverflow slots
// glide seamlessly in either direction without any wrap jump
const RING_CARDS = [...BASE_CARDS, ...BASE_CARDS];
const TOTAL = RING_CARDS.length;

function wrapDiff(diff: number, total: number): number {
  let d = ((diff % total) + total) % total;
  if (d > total / 2) d -= total;
  return d;
}

function getInitialCardStyle(idx: number): React.CSSProperties {
  const d = wrapDiff(idx, TOTAL);
  const absD = Math.abs(d);
  const baseX = d * 94 - Math.sign(d) * Math.max(0, absD - 1) * 12;
  const zPx = Math.max(-180, 60 - absD * 68);
  const rotY = Math.max(-42, Math.min(42, -d * 17.5));
  const scale = Math.max(0.62, 1.06 - absD * 0.15);
  const opacity =
    absD > 2.25
      ? Math.max(0, 1 - (absD - 2.25) * 1.6)
      : Math.max(0.55, 1 - absD * 0.2);
  const zIndex = Math.round(60 - absD * 14);

  return {
    transform: `translate3d(calc(-50% + ${baseX.toFixed(
      2
    )}%), -50%, ${zPx.toFixed(1)}px) rotateY(${rotY.toFixed(
      2
    )}deg) rotateX(0deg) scale(${scale.toFixed(4)})`,
    opacity,
    zIndex,
  };
}

export function WorldOfTjSection() {
  if (typeof document !== "undefined") {
    document
      .querySelectorAll("[data-cursor-ref]")
      .forEach((el) => el.removeAttribute("data-cursor-ref"));
  }

  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const imgRefs = useRef<(HTMLImageElement | null)[]>([]);
  const shadeRefs = useRef<(HTMLDivElement | null)[]>([]);

  // 60fps interpolated physics state
  const animRef = useRef({
    currentPos: 0, // continuous float slot index
    targetPos: 0, // integer slot index stepped by Left / Right buttons
    hoveredIdx: -1, // index in RING_CARDS [0..7] or -1
    hoverWeights: new Array<number>(TOTAL).fill(0),
    anyHoverWeight: 0,
    mouseX: 0,
    mouseY: 0,
    smoothMouseX: 0,
    smoothMouseY: 0,
  });

  useEffect(() => {
    const st = animRef.current;
    if (typeof st.currentPos !== "number" || Number.isNaN(st.currentPos)) {
      st.currentPos = 0;
    }
    if (typeof st.targetPos !== "number" || Number.isNaN(st.targetPos)) {
      st.targetPos = 0;
    }
    if (!Array.isArray(st.hoverWeights) || st.hoverWeights.length !== TOTAL) {
      st.hoverWeights = new Array<number>(TOTAL).fill(0);
    }

    let rafId = 0;

    const tick = () => {
      // Smooth 60fps damping when switching via Left / Right circular buttons
      st.currentPos += (st.targetPos - st.currentPos) * 0.085;

      const isAnyHovered = st.hoveredIdx !== -1;
      st.anyHoverWeight += ((isAnyHovered ? 1 : 0) - st.anyHoverWeight) * 0.09;

      // Smooth cursor tilt interpolation
      st.smoothMouseX +=
        ((isAnyHovered ? st.mouseX : 0) - st.smoothMouseX) * 0.1;
      st.smoothMouseY +=
        ((isAnyHovered ? st.mouseY : 0) - st.smoothMouseY) * 0.1;

      const vw = typeof window !== "undefined" ? window.innerWidth : 1280;
      const spreadScale = vw < 640 ? 0.76 : vw < 1024 ? 0.9 : 1;

      const hoveredSlotDiff = isAnyHovered
        ? wrapDiff(st.hoveredIdx - st.currentPos, TOTAL)
        : 0;

      for (let i = 0; i < TOTAL; i++) {
        const cardEl = cardRefs.current[i];
        const imgEl = imgRefs.current[i];
        const shadeEl = shadeRefs.current[i];
        if (!cardEl) continue;

        // Continuous signed slot offset from the current center card in [-4, +4]
        const d = wrapDiff(i - st.currentPos, TOTAL);
        const absD = Math.abs(d);

        // Smooth hover weight for this card
        const targetW = st.hoveredIdx === i && absD < 2.3 ? 1 : 0;
        st.hoverWeights[i] += (targetW - (st.hoverWeights[i] || 0)) * 0.095;
        const w = st.hoverWeights[i];
        const otherHovered = Math.max(0, st.anyHoverWeight - w);

        // Neighbors part slightly when a card is hovered
        const relToHovered = d - hoveredSlotDiff;
        const pushDir =
          Math.abs(relToHovered) < 0.1 ? 0 : Math.sign(relToHovered);
        const neighborPushX = pushDir * 14 * otherHovered;
        const hoverPullX = -d * 6 * w;

        // Continuous 3D Coverflow curve matching the 5 visible slots (-2, -1, 0, +1, +2)
        const baseX = d * 94 - Math.sign(d) * Math.max(0, absD - 1) * 12;
        const xPct = (baseX + neighborPushX + hoverPullX) * spreadScale;
        const zPx = Math.max(-180, 60 - absD * 68) + w * 70 - otherHovered * 18;

        const baseRotY = Math.max(-42, Math.min(42, -d * 17.5));
        const rotY =
          baseRotY * (1 - w * 0.82) + w * st.smoothMouseX * 7;
        const rotX = w * -st.smoothMouseY * 5;

        const baseScale = Math.max(0.62, 1.06 - absD * 0.15);
        const scale = baseScale + w * 0.09 - otherHovered * 0.025;

        // Smooth fade out beyond the 5 visible cards (|d| > 2.25)
        let opacity = 1;
        if (absD > 2.25) {
          opacity = Math.max(0, 1 - (absD - 2.25) * 1.6);
        } else {
          const baseOp = Math.max(0.55, 1 - absD * 0.2);
          opacity = Math.min(1, baseOp + w * 0.35 - otherHovered * 0.1);
        }

        const zIndex = Math.round(60 - absD * 14 + w * 35);

        cardEl.style.transform = `translate3d(calc(-50% + ${xPct.toFixed(
          2
        )}%), -50%, ${zPx.toFixed(1)}px) rotateY(${rotY.toFixed(
          2
        )}deg) rotateX(${rotX.toFixed(2)}deg) scale(${scale.toFixed(4)})`;
        cardEl.style.opacity = opacity.toFixed(3);
        cardEl.style.zIndex = String(zIndex);
        cardEl.style.pointerEvents = absD < 2.25 ? "auto" : "none";

        const isCenterStrength = Math.max(0, 1 - absD * 0.9);
        const glowStrength = Math.max(isCenterStrength * (1 - otherHovered), w);
        cardEl.style.borderColor = `rgba(255, 255, 255, ${(
          0.12 +
          glowStrength * 0.32
        ).toFixed(3)})`;

        if (imgEl) {
          const imgScale = 1 + w * 0.06 + isCenterStrength * 0.02;
          imgEl.style.transform = `scale(${imgScale.toFixed(4)})`;
        }

        if (shadeEl) {
          const baseShade = Math.min(0.6, absD * 0.19);
          const shadeOp = Math.max(
            0,
            Math.min(0.62, baseShade * (1 - w * 0.9) + otherHovered * 0.12)
          );
          shadeEl.style.opacity = shadeOp.toFixed(3);
        }
      }

      rafId = window.requestAnimationFrame(tick);
    };

    rafId = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(rafId);
  }, []);

  const handlePrev = () => {
    animRef.current.hoveredIdx = -1;
    animRef.current.targetPos -= 1;
  };

  const handleNext = () => {
    animRef.current.hoveredIdx = -1;
    animRef.current.targetPos += 1;
  };

  const handleCardEnter = (idx: number) => {
    animRef.current.hoveredIdx = idx;
  };

  const handleCardMove = (
    e: React.MouseEvent<HTMLDivElement>,
    idx: number
  ) => {
    animRef.current.hoveredIdx = idx;
    const rect = e.currentTarget.getBoundingClientRect();
    const nx = ((e.clientX - rect.left) / Math.max(1, rect.width) - 0.5) * 2;
    const ny = ((e.clientY - rect.top) / Math.max(1, rect.height) - 0.5) * 2;
    animRef.current.mouseX = Math.max(-1, Math.min(1, nx));
    animRef.current.mouseY = Math.max(-1, Math.min(1, ny));
  };

  const handleStageLeave = () => {
    animRef.current.hoveredIdx = -1;
    animRef.current.mouseX = 0;
    animRef.current.mouseY = 0;
  };

  return (
    <section
      id="world"
      aria-label="The World of TJ"
      className="relative scroll-mt-16 flex min-h-[calc(100svh-4rem)] w-full flex-col justify-center overflow-hidden border-b border-[#BDBDBD]/15 bg-[#050505] py-8 md:py-10"
    >
      <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 md:px-12">
        {/* ===================================================================
            SMOOTH 60FPS 3D CURVED SHOWCASE
            - Starts with Image 4 (M08) at Center (#1)
            - Smooth 3D hover lift/tilt on cards
            - Unclickable for inspect (no onClick lightbox, cursor-default, select-none)
            - Zero page number, zero page title, zero wording on cards
           =================================================================== */}
        <div
          onMouseLeave={handleStageLeave}
          onContextMenu={(e) => e.preventDefault()}
          className="select-none relative mx-auto flex h-[clamp(280px,54svh,490px)] w-full max-w-[1360px] items-center justify-center"
          style={{ perspective: "1350px" }}
        >
          <div
            className="relative h-full w-full"
            style={{ transformStyle: "preserve-3d" }}
          >
            {RING_CARDS.map((card, idx) => (
              <div
                key={`${card.id}-${idx}`}
                ref={(el) => {
                  cardRefs.current[idx] = el;
                }}
                style={getInitialCardStyle(idx)}
                onMouseEnter={() => handleCardEnter(idx)}
                onMouseMove={(e) => handleCardMove(e, idx)}
                className="cursor-default select-none absolute left-1/2 top-1/2 h-[clamp(245px,48svh,440px)] w-[clamp(180px,35.5svh,328px)] overflow-hidden rounded-[24px] md:rounded-[30px] border border-white/20 bg-[#121212] shadow-[0_30px_80px_rgba(0,0,0,0.92)] will-change-transform"
              >
                <img
                  ref={(el) => {
                    imgRefs.current[idx] = el;
                  }}
                  src={card.src}
                  alt={card.alt}
                  draggable={false}
                  style={{ objectPosition: card.objectPosition }}
                  className="world-color-media pointer-events-none h-full w-full select-none object-cover will-change-transform"
                />
                {/* Dynamic 3D depth shading on angled side cards */}
                <div
                  ref={(el) => {
                    shadeRefs.current[idx] = el;
                  }}
                  className="pointer-events-none absolute inset-0"
                  style={{
                    opacity: 0,
                    background:
                      "linear-gradient(180deg, rgba(0,0,0,0.14) 0%, rgba(0,0,0,0.55) 100%)",
                  }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* ===================================================================
            CENTERED CIRCULAR LEFT / RIGHT SWITCH BUTTONS BELOW IMAGES
           =================================================================== */}
        <div className="relative z-40 mt-5 md:mt-7 flex items-center justify-center gap-5">
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous image"
            className="group flex h-12 w-12 md:h-14 md:w-14 items-center justify-center rounded-full border border-[#F5F5F5]/45 bg-[#141414] text-[#F5F5F5] shadow-[0_12px_32px_rgba(0,0,0,0.85)] transition-all duration-300 hover:border-[#F5F5F5] hover:bg-[#F5F5F5] hover:text-[#080808] active:scale-95"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              className="transition-transform duration-300 group-hover:-translate-x-0.5"
            >
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>

          <button
            type="button"
            onClick={handleNext}
            aria-label="Next image"
            className="group flex h-12 w-12 md:h-14 md:w-14 items-center justify-center rounded-full border border-[#F5F5F5]/45 bg-[#141414] text-[#F5F5F5] shadow-[0_12px_32px_rgba(0,0,0,0.85)] transition-all duration-300 hover:border-[#F5F5F5] hover:bg-[#F5F5F5] hover:text-[#080808] active:scale-95"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              className="transition-transform duration-300 group-hover:translate-x-0.5"
            >
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
