import React from "react";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SITE_CONTENT } from "@/config/siteContent";

/**
 * Supporting utility route for /pages/contact. Messages and newsletter
 * signups post to the official TJ Vodka Shopify contact desk.
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

          <section className="mt-16" aria-labelledby="contact-form-title">
            <h2
              id="contact-form-title"
              className="font-serif text-5xl font-light text-[#F5F5F5] md:text-6xl"
            >
              Contact
            </h2>
            <form
              action="https://tjvodka.co.uk/contact#contact_form"
              method="post"
              acceptCharset="UTF-8"
              className="mt-10 flex flex-col gap-4"
            >
              <input type="hidden" name="form_type" value="contact" />
              <input type="hidden" name="utf8" value="✓" />
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <label className="sr-only" htmlFor="contact-name">
                  Name
                </label>
                <input
                  id="contact-name"
                  type="text"
                  name="contact[name]"
                  placeholder="Name"
                  autoComplete="name"
                  className="border border-[#F5F5F5]/80 bg-transparent px-4 py-3 font-sans text-sm text-[#F5F5F5] placeholder:text-[#A8A8A8] focus:border-[#F5F5F5] focus:outline-none"
                />
                <label className="sr-only" htmlFor="contact-email">
                  Email
                </label>
                <input
                  id="contact-email"
                  type="email"
                  name="contact[email]"
                  placeholder="Email *"
                  autoComplete="email"
                  required
                  className="border border-[#F5F5F5]/80 bg-transparent px-4 py-3 font-sans text-sm text-[#F5F5F5] placeholder:text-[#A8A8A8] focus:border-[#F5F5F5] focus:outline-none"
                />
              </div>
              <label className="sr-only" htmlFor="contact-phone">
                Phone number
              </label>
              <input
                id="contact-phone"
                type="tel"
                name="contact[phone]"
                placeholder="Phone number"
                autoComplete="tel"
                className="border border-[#F5F5F5]/80 bg-transparent px-4 py-3 font-sans text-sm text-[#F5F5F5] placeholder:text-[#A8A8A8] focus:border-[#F5F5F5] focus:outline-none"
              />
              <label className="sr-only" htmlFor="contact-comment">
                Comment
              </label>
              <textarea
                id="contact-comment"
                name="contact[body]"
                placeholder="Comment"
                rows={6}
                className="border border-[#F5F5F5]/80 bg-transparent px-4 py-3 font-sans text-sm text-[#F5F5F5] placeholder:text-[#A8A8A8] focus:border-[#F5F5F5] focus:outline-none"
              />
              <button
                type="submit"
                className="mt-4 self-start font-sans text-sm text-[#F5F5F5] hover:text-[#FAF4E7]"
              >
                Send
              </button>
            </form>
          </section>

          <section className="mt-24 text-center" aria-labelledby="newsletter-title">
            <h2
              id="newsletter-title"
              className="font-serif text-4xl font-light text-[#F5F5F5] md:text-5xl"
            >
              Stay in the know
            </h2>
            <form
              action="https://tjvodka.co.uk/contact#contact_form"
              method="post"
              acceptCharset="UTF-8"
              className="mx-auto mt-8 flex max-w-xl items-center border border-[#F5F5F5]/80"
            >
              <input type="hidden" name="form_type" value="customer" />
              <input type="hidden" name="utf8" value="✓" />
              <input type="hidden" name="contact[tags]" value="newsletter" />
              <label className="sr-only" htmlFor="newsletter-email">
                Email
              </label>
              <input
                id="newsletter-email"
                type="email"
                name="contact[email]"
                placeholder="Email"
                autoComplete="email"
                required
                className="min-w-0 flex-1 bg-transparent px-4 py-3 font-sans text-sm text-[#F5F5F5] placeholder:text-[#A8A8A8] focus:outline-none"
              />
              <button
                type="submit"
                aria-label="Subscribe"
                className="px-4 text-xl text-[#F5F5F5]"
              >
                →
              </button>
            </form>
            <p className="mt-8 font-sans text-sm text-[#F5F5F5]">
              Follow us on social media
            </p>
            <ul className="mt-5 flex items-center justify-center gap-5" role="list">
              <li>
                <a
                  href="https://www.facebook.com/tj.vodka/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="text-[#F5F5F5] hover:text-[#FAF4E7]"
                >
                  <svg aria-hidden="true" className="h-5 w-5" viewBox="0 0 18 18">
                    <path
                      fill="currentColor"
                      d="M16.42.61c.27 0 .5.1.69.28.19.2.28.42.28.7v15.44c0 .27-.1.5-.28.69a.94.94 0 01-.7.28h-4.39v-6.7h2.25l.31-2.65h-2.56v-1.7c0-.4.1-.72.28-.93.18-.2.5-.32 1-.32h1.37V3.35c-.6-.06-1.27-.1-2.01-.1-1.01 0-1.83.3-2.45.9-.62.6-.93 1.44-.93 2.53v1.97H7.04v2.65h2.24V18H.98c-.28 0-.5-.1-.7-.28a.94.94 0 01-.28-.7V1.59c0-.27.1-.5.28-.69a.94.94 0 01.7-.28h15.44z"
                    />
                  </svg>
                </a>
              </li>
              <li>
                <a
                  href={SITE_CONTENT.brand.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="text-[#F5F5F5] hover:text-[#FAF4E7]"
                >
                  <svg aria-hidden="true" className="h-5 w-5" viewBox="0 0 18 18">
                    <path
                      fill="currentColor"
                      d="M8.77 1.58c2.34 0 2.62.01 3.54.05.86.04 1.32.18 1.63.3.41.17.7.35 1.01.66.3.3.5.6.65 1 .12.32.27.78.3 1.64.05.92.06 1.2.06 3.54s-.01 2.62-.05 3.54a4.79 4.79 0 01-.3 1.63c-.17.41-.35.7-.66 1.01-.3.3-.6.5-1.01.66-.31.12-.77.26-1.63.3-.92.04-1.2.05-3.54.05s-2.62 0-3.55-.05a4.79 4.79 0 01-1.62-.3c-.42-.16-.7-.35-1.01-.66-.31-.3-.5-.6-.66-1a4.87 4.87 0 01-.3-1.64c-.04-.92-.05-1.2-.05-3.54s0-2.62.05-3.54c.04-.86.18-1.32.3-1.63.16-.41.35-.7.66-1.01.3-.3.6-.5 1-.65.32-.12.78-.27 1.63-.3.93-.05 1.2-.06 3.55-.06zm0-1.58C6.39 0 6.09.01 5.15.05c-.93.04-1.57.2-2.13.4-.57.23-1.06.54-1.55 1.02C1 1.96.7 2.45.46 3.02c-.22.56-.37 1.2-.4 2.13C0 6.1 0 6.4 0 8.77s.01 2.68.05 3.61c.04.94.2 1.57.4 2.13.23.58.54 1.07 1.02 1.56.49.48.98.78 1.55 1.01.56.22 1.2.37 2.13.4.94.05 1.24.06 3.62.06 2.39 0 2.68-.01 3.62-.05.93-.04 1.57-.2 2.13-.41a4.27 4.27 0 001.55-1.01c.49-.49.79-.98 1.01-1.56.22-.55.37-1.19.41-2.13.04-.93.05-1.23.05-3.61 0-2.39 0-2.68-.05-3.62a6.47 6.47 0 00-.4-2.13 4.27 4.27 0 00-1.02-1.55A4.35 4.35 0 0014.52.46a6.43 6.43 0 00-2.13-.41A69 69 0 008.77 0z"
                    />
                    <path
                      fill="currentColor"
                      d="M8.8 4a4.5 4.5 0 100 9 4.5 4.5 0 000-9zm0 7.43a2.92 2.92 0 110-5.85 2.92 2.92 0 010 5.85zM13.43 5a1.05 1.05 0 100-2.1 1.05 1.05 0 000 2.1z"
                    />
                  </svg>
                </a>
              </li>
              <li>
                <a
                  href="https://www.tiktok.com/@tj.vodka"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="TikTok"
                  className="text-[#F5F5F5] hover:text-[#FAF4E7]"
                >
                  <svg aria-hidden="true" className="h-5 w-5" viewBox="0 0 18 18">
                    <path
                      fill="currentColor"
                      d="M12.3 1.5c.3 1.7 1.2 3.1 2.6 3.9.6.3 1.2.5 1.9.6v2.4c-1.1 0-2.2-.3-3.2-.8v5.7c0 3-2.4 5.2-5.4 5.2S2.8 16.3 2.8 13.3c0-3 2.5-5.2 5.5-5.2.3 0 .6 0 .9.1v2.6c-.3-.1-.6-.2-.9-.2-1.5 0-2.7 1.2-2.7 2.7s1.2 2.7 2.7 2.7 2.6-1.2 2.6-2.8V1.5h1.4z"
                    />
                  </svg>
                </a>
              </li>
            </ul>
          </section>
        </div>
      </main>
      <Footer compact />
    </div>
  );
}
