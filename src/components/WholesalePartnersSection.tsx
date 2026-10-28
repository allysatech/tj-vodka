import React from "react";
import { SITE_CONTENT } from "@/config/siteContent";

type Partner = (typeof SITE_CONTENT.wholesalePartners.partners)[number];

const ORBIT_POSITION: Record<Partner["place"], string> = {
  top: "left-1/2 top-[18%] -translate-x-1/2 -translate-y-1/2",
  right: "left-[82%] top-1/2 -translate-x-1/2 -translate-y-1/2",
  bottom: "left-1/2 top-[82%] -translate-x-1/2 -translate-y-1/2",
  left: "left-[18%] top-1/2 -translate-x-1/2 -translate-y-1/2",
};

function PartnerLogo({ partner }: { partner: Partner }) {
  return (
    <img
      src={partner.logoSrc}
      alt=""
      width={136}
      height={136}
      draggable={false}
      className="h-full w-full object-contain"
    />
  );
}

function PartnerCaption({ partner }: { partner: Partner }) {
  return (
    <>
      <span className="font-sans text-[11px] tracking-[0.04em] text-[#F5F5F5] md:text-sm md:tracking-[0.06em]">
        {partner.name}
      </span>
      {partner.href ? (
        <span className="mt-0.5 inline-flex items-center gap-1 font-sans text-[10px] tracking-[0.04em] text-[#A8A8A8] underline decoration-[#A8A8A8]/50 underline-offset-4 transition-colors group-hover:text-[#F5F5F5] md:mt-1 md:text-[11px] md:tracking-[0.06em]">
          View TJ Vodka
          <span aria-hidden="true">↗</span>
        </span>
      ) : (
        <span className="mt-0.5 font-sans text-[10px] tracking-[0.04em] text-[#A8A8A8] md:mt-1 md:text-[11px]">
          Product link missing
        </span>
      )}
    </>
  );
}

const WORDMARK_SIZE = { fontSize: "clamp(1.05rem, 6.6cqw, 3.25rem)" };

function OrbitPartner({ partner }: { partner: Partner }) {
  const className = `group absolute z-10 block h-14 w-14 no-underline sm:h-20 sm:w-20 md:h-28 md:w-28 ${ORBIT_POSITION[partner.place]}`;
  const body = (
    <>
      <span className="block h-full w-full overflow-hidden rounded-full">
        <PartnerLogo partner={partner} />
      </span>
      <span className="absolute left-1/2 top-full mt-1.5 flex w-[7.25rem] -translate-x-1/2 flex-col items-center text-center md:mt-2.5 md:w-40 md:whitespace-nowrap">
        <PartnerCaption partner={partner} />
      </span>
    </>
  );

  if (partner.href) {
    return (
      <a
        href={partner.href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`View TJ Vodka at ${partner.name}`}
        className={`${className} rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#F5F5F5]`}
      >
        {body}
      </a>
    );
  }

  return <div className={className}>{body}</div>;
}

export function WholesalePartnersSection() {
  const { eyebrow, heading, subheading, partners } =
    SITE_CONTENT.wholesalePartners;

  return (
    <section
      id="partners"
      aria-label="Wholesale Partners"
      className="scroll-mt-16 border-t border-[#BDBDBD]/15 bg-[#080808] py-16 text-[#F5F5F5] md:py-20"
    >
      <div className="mx-auto max-w-[1400px] px-6 md:px-12">
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.26em] text-[#A8A8A8]">
            {eyebrow}
          </p>
          <h2 className="mt-3 font-serif text-[clamp(2.1rem,5vw,3.5rem)] font-normal leading-[1.05] tracking-[0.01em] text-[#F5F5F5]">
            {heading}
          </h2>
          <p className="mt-3 font-sans text-sm leading-relaxed text-[#A8A8A8]">
            {subheading}
          </p>
        </div>

        <div className="relative mx-auto mt-8 w-full max-w-[740px] pb-4 md:mt-10 md:pb-0">
          <div className="relative aspect-square w-full [container-type:inline-size]">
            <div className="pointer-events-none absolute left-1/2 top-1/2 z-[1] -translate-x-1/2 -translate-y-1/2">
              <div className="relative">
                <p
                  className="font-display whitespace-nowrap uppercase leading-none tracking-[0.02em] text-[#F5F5F5]"
                  style={WORDMARK_SIZE}
                >
                  TJ Vodka
                </p>
                <p
                  aria-hidden="true"
                  className="font-display absolute inset-x-0 top-0 whitespace-nowrap uppercase leading-none tracking-[0.02em] text-[#F5F5F5]"
                  style={{
                    ...WORDMARK_SIZE,
                    transform: "scaleY(-1)",
                    transformOrigin: "center bottom",
                    filter: "blur(0.45px)",
                    maskImage:
                      "linear-gradient(to top, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.34) 36%, transparent 68%)",
                    WebkitMaskImage:
                      "linear-gradient(to top, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.34) 36%, transparent 68%)",
                  }}
                >
                  TJ Vodka
                </p>
              </div>
            </div>
            {partners.map((partner) => (
              <OrbitPartner key={partner.name} partner={partner} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
