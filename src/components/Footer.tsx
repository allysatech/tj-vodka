"use client";

import React from "react";
import Link from "next/link";
import { SITE_CONTENT } from "@/config/siteContent";

interface FooterProps {
  compact?: boolean;
}

export function Footer({ compact = false }: FooterProps) {
  return (
    <footer
      id="contact"
      aria-label="05 Footer and Contact"
      className={`scroll-mt-20 bg-[#080808] text-[#F5F5F5] ${
        compact ? "py-14" : "py-20 md:py-24"
      }`}
    >
      <div className="mx-auto max-w-[1400px] px-6 md:px-12">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
          {/* Brand Column */}
          <div className="flex flex-col md:col-span-5">
            <Link href="/" aria-label="TJ Vodka" className="inline-flex w-fit">
              <img
                src="/brand/tj-lockup-footer.png"
                alt="TJ Vodka"
                width={1221}
                height={3060}
                className="h-auto w-16 object-contain md:w-20"
              />
            </Link>

            <p className="mt-5 font-spirit text-xl uppercase tracking-[0.03em]">
              <span className="text-[#FAF4E7]">Smoother than </span>
              <span className="text-[#FBBD4E]">your </span>
              <span className="text-[#D01B23]">average.</span>
            </p>

            <p className="mt-2 max-w-sm font-sans text-xs leading-relaxed text-[#A8A8A8]">
              Distilled in Italy from a refined blend of grains and Appennino
              mountain water. 70cl · 37.5% vol.
            </p>
          </div>

          {/* Navigation Column */}
          <div className="flex flex-col md:col-span-3">
            <span className="font-sans text-[10px] uppercase tracking-[0.24em] text-[#A8A8A8]">
              Explore
            </span>
            <ul className="mt-4 flex flex-col gap-3 font-sans text-xs tracking-[0.14em] text-[#F5F5F5]">
              <li>
                <Link
                  href="/#story"
                  className="text-[#A8A8A8] transition-colors hover:text-[#F5F5F5]"
                >
                  Our Story
                </Link>
              </li>
              <li>
                <Link
                  href="/#vodka"
                  className="text-[#A8A8A8] transition-colors hover:text-[#F5F5F5]"
                >
                  The Vodka
                </Link>
              </li>
              <li>
                <Link
                  href="/#world"
                  className="text-[#A8A8A8] transition-colors hover:text-[#F5F5F5]"
                >
                  The World of TJ
                </Link>
              </li>
              <li>
                <Link
                  href="/products/tj-vodka"
                  className="text-[#F5F5F5] underline underline-offset-4 transition-colors hover:text-[#BDBDBD]"
                >
                  Shop TJ Vodka
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Social Column */}
          <div className="flex flex-col md:col-span-4">
            <span className="font-sans text-[10px] uppercase tracking-[0.24em] text-[#A8A8A8]">
              Contact &amp; Connect
            </span>
            <ul className="mt-4 flex flex-col gap-3 font-sans text-xs tracking-[0.1em] text-[#A8A8A8]">
              <li>
                <a
                  href={`mailto:${SITE_CONTENT.brand.contactEmail}`}
                  className="text-[#F5F5F5] transition-colors hover:text-[#BDBDBD]"
                >
                  {SITE_CONTENT.brand.contactEmail}
                </a>
              </li>
              <li>
                <a
                  href={SITE_CONTENT.brand.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-[#F5F5F5] transition-colors hover:text-[#BDBDBD]"
                >
                  <img
                    src="/brand/instagram-icon.png"
                    alt=""
                    width={16}
                    height={16}
                    className="h-4 w-4 shrink-0 object-contain"
                  />
                  <span>Instagram {SITE_CONTENT.brand.instagramHandle}</span>
                </a>
              </li>
              <li>
                <Link
                  href="/pages/contact"
                  className="text-[#A8A8A8] transition-colors hover:text-[#F5F5F5]"
                >
                  Customer &amp; Trade Enquiries
                </Link>
              </li>
              <li className="pt-1 text-[11px] text-[#A8A8A8]/80">
                Kurvado Group Ltd., 26 Adelaide Road, Leamington Spa, UK, CV31 3PL
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Legal & Policy Bar */}
        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-[#BDBDBD]/15 pt-8 sm:flex-row sm:items-center">
          <div className="flex flex-wrap items-center gap-6">
            {SITE_CONTENT.footer.policyLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-sans text-[11px] tracking-[0.1em] text-[#A8A8A8] transition-colors hover:text-[#F5F5F5]"
              >
                {link.label}
              </Link>
            ))}
          </div>
          <p className="font-sans text-[11px] tracking-[0.08em] text-[#A8A8A8]">
            © {new Date().getFullYear()} TJ Vodka. {SITE_CONTENT.footer.responsibleDrinking}
          </p>
        </div>
      </div>
    </footer>
  );
}
