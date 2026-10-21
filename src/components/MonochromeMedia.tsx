"use client";

import React from "react";
import { MEDIA_SLOTS, MediaSlotId, MediaAssetConfig } from "@/config/siteContent";

interface MonochromeMediaProps {
  slotId?: MediaSlotId;
  customAsset?: Partial<MediaAssetConfig> & { src: string; alt: string };
  className?: string;
  imgClassName?: string;
  priority?: boolean;
  onClick?: () => void;
  interactiveLabel?: string;
  showSlotBadge?: boolean;
  overrideSrc?: string;
  overrideType?: "image" | "video";
}

/**
 * MANDATORY DESIGN RULE ENFORCEMENT:
 * Every displayed photograph, product image, thumbnail, video, video poster and
 * background image must appear in neutral BLACK AND WHITE at all times,
 * including hover, focus, loading, mobile and open-gallery states.
 * No return-to-colour hover effect.
 */
export function MonochromeMedia({
  slotId,
  customAsset,
  className = "",
  imgClassName = "",
  priority = false,
  onClick,
  interactiveLabel,
  showSlotBadge = false,
  overrideSrc,
  overrideType,
}: MonochromeMediaProps) {
  const slotConfig = slotId ? MEDIA_SLOTS[slotId] : undefined;

  const src = overrideSrc || customAsset?.src || slotConfig?.src || "";
  const type = overrideType || customAsset?.type || slotConfig?.type || "image";
  const poster = customAsset?.poster || slotConfig?.poster;
  const alt = customAsset?.alt || slotConfig?.alt || "TJ Vodka monochrome visual";
  const fit = customAsset?.fit || slotConfig?.fit || "cover";
  const focalDesktop =
    customAsset?.focalPoint?.desktop || slotConfig?.focalPoint?.desktop || "50% 50%";
  const focalMobile =
    customAsset?.focalPoint?.mobile || slotConfig?.focalPoint?.mobile || "50% 50%";
  const width = customAsset?.dimensions?.width || slotConfig?.dimensions?.width || 1200;
  const height = customAsset?.dimensions?.height || slotConfig?.dimensions?.height || 1200;

  const fitClass = fit === "contain" ? "object-contain" : "object-cover";

  const mediaElement =
    type === "video" ? (
      <video
        src={src}
        poster={poster}
        muted
        loop
        playsInline
        autoPlay
        preload="metadata"
        aria-label={alt}
        style={
          {
            "--focal-desktop": focalDesktop,
            "--focal-mobile": focalMobile,
            filter: "grayscale(100%) contrast(1.03)",
            WebkitFilter: "grayscale(100%) contrast(1.03)",
          } as React.CSSProperties
        }
        className={`bw-enforced-media w-full h-full ${fitClass} [object-position:var(--focal-mobile)] md:[object-position:var(--focal-desktop)] select-none ${imgClassName}`}
      />
    ) : (
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? "eager" : "lazy"}
        decoding={priority ? "sync" : "async"}
        fetchPriority={priority ? "high" : "auto"}
        style={
          {
            "--focal-desktop": focalDesktop,
            "--focal-mobile": focalMobile,
            filter: "grayscale(100%)",
            WebkitFilter: "grayscale(100%)",
          } as React.CSSProperties
        }
        className={`bw-enforced-media w-full h-full ${fitClass} [object-position:var(--focal-mobile)] md:[object-position:var(--focal-desktop)] select-none ${imgClassName}`}
      />
    );

  if (onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        aria-label={interactiveLabel || `View ${alt} in monochrome lightbox`}
        data-media-slot={slotId}
        className={`group relative block overflow-hidden text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#BDBDBD] ${className}`}
      >
        {mediaElement}
        {showSlotBadge && slotId && (
          <span className="pointer-events-none absolute top-3 left-3 z-10 bg-[#080808]/85 px-2.5 py-1 font-sans text-[10px] uppercase tracking-[0.18em] text-[#BDBDBD] border border-[#BDBDBD]/25">
            {slotId}
          </span>
        )}
      </button>
    );
  }

  return (
    <div
      data-media-slot={slotId}
      className={`relative overflow-hidden ${className}`}
    >
      {mediaElement}
      {showSlotBadge && slotId && (
        <span className="pointer-events-none absolute top-3 left-3 z-10 bg-[#080808]/85 px-2.5 py-1 font-sans text-[10px] uppercase tracking-[0.18em] text-[#BDBDBD] border border-[#BDBDBD]/25">
          {slotId}
        </span>
      )}
    </div>
  );
}
