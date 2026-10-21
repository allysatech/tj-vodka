import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const POLICIES: Record<
  string,
  {
    title: string;
    updated?: string;
    sections: { heading?: string; paragraphs: string[] }[];
  }
> = {
  "refund-policy": {
    title: "Refund Policy",
    sections: [
      {
        paragraphs: [
          "We have a 30-day return policy, which means you have 30 days after receiving your item to request a return.",
          "To be eligible for a return, your item must be in the same condition that you received it, unopened and unused, with original seals intact, and in its original packaging. You’ll also need the receipt or proof of purchase.",
          "To start a return, you can contact us at sales@tjvodka.co.uk. If your return is accepted, we’ll send you a return shipping label, as well as instructions on how and where to send your package. Items sent back to us without first requesting a return will not be accepted.",
        ],
      },
      {
        heading: "Damages and Issues",
        paragraphs: [
          "Please inspect your order upon reception and contact us immediately at sales@tjvodka.co.uk if the item is defective, damaged or if you receive the wrong item, so that we can evaluate the issue and make it right.",
        ],
      },
      {
        heading: "Refunds",
        paragraphs: [
          "We will notify you once we’ve received and inspected your return, and let you know if the refund was approved or not. If approved, you’ll be automatically refunded on your original payment method within 10 business days. Please remember it can take some time for your bank or credit card company to process and post the refund too.",
        ],
      },
    ],
  },
  "privacy-policy": {
    title: "Privacy Policy",
    updated: "Last updated: October 6, 2025",
    sections: [
      {
        paragraphs: [
          'This Privacy Policy describes how TJ Vodka (the "Site", "we", "us", or "our") collects, uses, and discloses your personal information when you visit, use our services, or make a purchase from tjvodka.co.uk (the "Site") or otherwise communicate with us regarding the Site (collectively, the "Services").',
        ],
      },
      {
        heading: "Personal Information We Collect",
        paragraphs: [
          "When you visit the Site or place an order through our Shopify checkout, we collect information necessary to fulfil your order, verify legal purchasing age, process payment securely, and arrange delivery — including your name, billing address, shipping address, payment confirmation, email address, and phone number.",
        ],
      },
      {
        heading: "Contact Us",
        paragraphs: [
          "Should you have any questions about our privacy practices or this Privacy Policy, please contact us by email at sales@tjvodka.co.uk or via our official Shopify store at https://tjvodka.co.uk/policies/privacy-policy.",
        ],
      },
    ],
  },
  "terms-of-service": {
    title: "Terms of Service",
    sections: [
      {
        heading: "Overview",
        paragraphs: [
          "This website is operated by TJ Vodka. Throughout the site, the terms “we”, “us” and “our” refer to TJ Vodka. TJ Vodka offers this website, including all information, tools and Services available from this site to you, the user, conditioned upon your acceptance of all terms, conditions, policies and notices stated here.",
        ],
      },
      {
        heading: "Age Restriction (18+)",
        paragraphs: [
          "By placing an order for TJ Vodka, you confirm that you are of legal drinking age (18 years or older in the United Kingdom) to purchase alcohol. All orders and payments are processed through our official Shopify storefront (tjvodka.co.uk).",
        ],
      },
      {
        heading: "Company & Importer Information",
        paragraphs: [
          "TJ Vodka (70cl · 37.5% vol.) is Made in Italy and imported in the UK for Kurvado Group Ltd., 26 Adelaide Road, Leamington Spa, UK, CV31 3PL. Enquiries: sales@tjvodka.co.uk.",
        ],
      },
    ],
  },
};

export default async function PolicyUtilityPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const policy = POLICIES[slug];

  if (!policy) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#080808] text-[#F5F5F5]">
      <Navbar />
      <main id="main-content" className="pt-32 pb-24">
        <div className="mx-auto max-w-3xl px-6 md:px-12">
          <div className="mb-8 flex items-center justify-between border-b border-[#BDBDBD]/15 pb-4">
            <Link
              href="/"
              className="font-sans text-[11px] uppercase tracking-[0.2em] text-[#A8A8A8] hover:text-[#F5F5F5]"
            >
              ← Back to Homepage
            </Link>
            <span className="font-sans text-[10px] uppercase tracking-[0.24em] text-[#A8A8A8]">
              LEGAL POLICY UTILITY
            </span>
          </div>

          <h1 className="font-serif text-4xl md:text-5xl font-light text-[#F5F5F5]">
            {policy.title}
          </h1>
          {policy.updated && (
            <p className="mt-2 font-sans text-xs text-[#A8A8A8]">
              {policy.updated}
            </p>
          )}

          <div className="mt-10 space-y-8 border-t border-[#BDBDBD]/15 pt-8">
            {policy.sections.map((sec, i) => (
              <div key={i} className="space-y-4">
                {sec.heading && (
                  <h2 className="font-serif text-2xl font-normal text-[#F5F5F5]">
                    {sec.heading}
                  </h2>
                )}
                {sec.paragraphs.map((p, j) => (
                  <p
                    key={j}
                    className="font-sans text-sm leading-[1.85] text-[#F5F5F5]/85"
                  >
                    {p}
                  </p>
                ))}
              </div>
            ))}
          </div>

          <div className="mt-12 border border-[#BDBDBD]/20 bg-[#141414] p-6">
            <p className="font-sans text-xs text-[#A8A8A8]">
              View the canonical Shopify policy document at{" "}
              <a
                href={`https://tjvodka.co.uk/policies/${slug}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#F5F5F5] underline underline-offset-4"
              >
                tjvodka.co.uk/policies/{slug} ↗
              </a>
            </p>
          </div>
        </div>
      </main>
      <Footer compact />
    </div>
  );
}
