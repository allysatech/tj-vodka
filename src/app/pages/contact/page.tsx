import React from "react";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SITE_CONTENT } from "@/config/siteContent";

/**
 * Supporting utility route for /pages/contact (preserved from existing Shopify URL structure,
 * not a standalone marketing page). Uses real contact details and direct handoff to
 * the existing Shopify contact form without simulating a false submission state.
 */
export default function ContactUtilityPage() {
  return (
    <div className="min-h-screen bg-[#080808] text-[#F5F5F5]">
      <Navbar />
      <main id="main-content" className="pt-32 pb-24">
        <div className="mx-auto max-w-3xl px-6 md:px-12">
          <div className="mb-8 flex items-center justify-between border-b border-[#BDBDBD]/15 pb-4">
            <Link
              href="/#contact"
              className="font-sans text-[11px] uppercase tracking-[0.2em] text-[#A8A8A8] hover:text-[#F5F5F5]"
            >
              ← Back to Homepage Footer
            </Link>
            <span className="font-sans text-[10px] uppercase tracking-[0.24em] text-[#A8A8A8]">
              SUPPORTING CONTACT UTILITY
            </span>
          </div>

          <h1 className="font-serif text-4xl md:text-5xl font-light text-[#F5F5F5]">
            Contact TJ Vodka
          </h1>
          <p className="mt-3 font-sans text-sm leading-relaxed text-[#A8A8A8]">
            For customer orders, returns, or UK trade and hospitality enquiries,
            reach out directly via email or through our official Shopify contact
            channel.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div className="border border-[#BDBDBD]/20 bg-[#141414] p-6">
              <span className="font-sans text-[10px] uppercase tracking-[0.22em] text-[#A8A8A8]">
                Direct Email
              </span>
              <a
                href={`mailto:${SITE_CONTENT.brand.contactEmail}`}
                className="mt-2 block font-serif text-2xl text-[#F5F5F5] underline underline-offset-4"
              >
                {SITE_CONTENT.brand.contactEmail}
              </a>
              <p className="mt-2 font-sans text-xs text-[#A8A8A8]">
                Customer support, returns &amp; trade enquiries.
              </p>
            </div>

            <div className="border border-[#BDBDBD]/20 bg-[#141414] p-6">
              <span className="font-sans text-[10px] uppercase tracking-[0.22em] text-[#A8A8A8]">
                Instagram
              </span>
              <a
                href={SITE_CONTENT.brand.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 block font-serif text-2xl text-[#F5F5F5] underline underline-offset-4"
              >
                {SITE_CONTENT.brand.instagramHandle} ↗
              </a>
              <p className="mt-2 font-sans text-xs text-[#A8A8A8]">
                Official brand updates and editorial archive.
              </p>
            </div>
          </div>

          <div className="mt-8 border border-[#BDBDBD]/20 bg-[#141414] p-6">
            <span className="font-sans text-[10px] uppercase tracking-[0.22em] text-[#A8A8A8]">
              Official Store Contact Form
            </span>
            <p className="mt-2 font-sans text-xs leading-relaxed text-[#F5F5F5]/85">
              To send a message through the connected Shopify customer desk,
              use the official contact form on tjvodka.co.uk:
            </p>
            <div className="mt-5">
              <a
                href={SITE_CONTENT.brand.existingContactUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-[#F5F5F5] bg-[#F4F4F4] px-6 py-3 font-sans text-[11px] font-medium uppercase tracking-[0.2em] text-[#151515] hover:bg-transparent hover:text-[#F5F5F5]"
              >
                <span>Open Official Store Contact Form</span>
                <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>
        </div>
      </main>
      <Footer compact />
    </div>
  );
}
