import React from "react";
import { SITE_CONTENT } from "@/config/siteContent";

type Partner = (typeof SITE_CONTENT.wholesalePartners.partners)[number];

const ORBIT_POSITION: Record<Partner["place"], string> = {
  top: "left-[22%] top-[20%] -translate-x-1/2 -translate-y-1/2",
  right: "left-[78%] top-[20%] -translate-x-1/2 -translate-y-1/2",
  left: "left-[22%] top-[74%] -translate-x-1/2 -translate-y-1/2",
  bottom: "left-[78%] top-[74%] -translate-x-1/2 -translate-y-1/2",
};

function PartnerLogo({ partner }: { partner: Partner }) {
  return (
    <img
      src={partner.logoSrc}
      alt=""
      width={136}
      height={136}
      draggable={false}
      className="partner-color-media h-full w-full object-contain"
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
        <span className="mt-0.5 inline-flex items-center font-sans text-[10px] tracking-[0.04em] text-[#A8A8A8] underline decoration-[#A8A8A8]/50 underline-offset-4 transition-colors group-hover:text-[#F5F5F5] md:mt-1 md:text-[11px] md:tracking-[0.06em]">
          View TJ Vodka
        </span>
      ) : (
        <span className="mt-0.5 font-sans text-[10px] tracking-[0.04em] text-[#A8A8A8] md:mt-1 md:text-[11px]">
          Product link missing
        </span>
      )}
    </>
  );
}

function OrbitPartner({ partner }: { partner: Partner }) {
  const className = `group absolute z-10 block h-16 w-16 no-underline sm:h-20 sm:w-20 md:h-28 md:w-28 lg:h-32 lg:w-32 ${ORBIT_POSITION[partner.place]}`;
  const body = (
    <>
      <span className="flex h-full w-full items-center justify-center transition duration-300 ease-out group-hover:scale-110">
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
      className="scroll-mt-16 border-t border-[#BDBDBD]/15 bg-[#080808] pb-10 pt-14 text-[#F5F5F5] md:flex md:h-[calc(100svh-4rem)] md:min-h-[40rem] md:flex-col md:py-6"
    >
      <div className="mx-auto flex w-full max-w-[1400px] flex-col px-6 md:h-full md:px-10">
        <div className="mx-auto max-w-2xl shrink-0 text-center">
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

        <div className="relative mx-auto mt-6 w-full pb-2 md:mt-3 md:min-h-0 md:flex-1 md:pb-12">
          <div className="relative aspect-square w-full [container-type:inline-size] md:aspect-auto md:h-full">
            <div className="pointer-events-none absolute left-1/2 top-1/2 z-[1] -translate-x-1/2 -translate-y-1/2">
              <div className="relative">
                <img
                  src="/brand/tj-logo-white.png"
                  alt=""
                  width={1026}
                  height={1475}
                  className="h-[clamp(5.5rem,20cqw,9.5rem)] w-auto object-contain"
                />
                <img
                  aria-hidden="true"
                  src="/brand/tj-logo-white.png"
                  alt=""
                  width={1026}
                  height={1475}
                  className="absolute inset-x-0 top-0 h-[clamp(5.5rem,20cqw,9.5rem)] w-auto object-contain"
                  style={{
                    transform: "scaleY(-1)",
                    transformOrigin: "center bottom",
                    filter: "blur(0.45px)",
                    maskImage:
                      "linear-gradient(to top, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.28) 28%, transparent 46%)",
                    WebkitMaskImage:
                      "linear-gradient(to top, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.28) 28%, transparent 46%)",
                  }}
                />
              </div>
            </div>
            {partners.map((partner) => (
              <OrbitPartner key={partner.name} partner={partner} />
            ))}
          </div>
        </div>

        <nav
          aria-label="Wholesale partner websites"
          className="mt-5 flex shrink-0 flex-wrap items-center justify-center md:mt-2"
        >
          {partners.map((partner, index) => (
            <span key={partner.name} className="inline-flex items-center">
              {index > 0 ? (
                <span
                  aria-hidden="true"
                  className="mx-2.5 inline-block h-1.5 w-1.5 rounded-full md:mx-3"
                  style={{ backgroundColor: partner.dot }}
                />
              ) : null}
              <a
                href={partner.href}
                target="_blank"
                rel="noopener noreferrer"
                className="font-sans text-sm tracking-[0.01em] text-[#F5F5F5] transition-colors hover:text-white md:text-[15px]"
              >
                {partner.name}
              </a>
            </span>
          ))}
        </nav>
      </div>
    </section>
  );
}
