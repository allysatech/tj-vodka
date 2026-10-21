"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SITE_CONTENT } from "@/config/siteContent";

const CART_STORAGE_KEY = "tj_vodka_cart_qty";
const UNIT_PRICE_GBP = 20;

export function dispatchCartUpdate(newQty: number, openDrawer = true) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(CART_STORAGE_KEY, String(Math.max(0, newQty)));
  } catch {
    // ignore storage errors
  }
  window.dispatchEvent(
    new CustomEvent("tj-cart-updated", {
      detail: { quantity: Math.max(0, newQty), openDrawer },
    })
  );
}

export function Navbar() {
  if (typeof document !== "undefined") {
    document
      .querySelectorAll("[data-cursor-ref]")
      .forEach((el) => el.removeAttribute("data-cursor-ref"));
  }
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [cartQty, setCartQty] = useState<number>(0);

  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const cartButtonRef = useRef<HTMLButtonElement>(null);

  // Sync scroll state + cart quantity from localStorage & custom events
  useEffect(() => {
    const timer = window.setTimeout(() => {
      const win = window as Window & { __FLUSH_CURSOR_REFS__?: () => void };
      if (win.__FLUSH_CURSOR_REFS__) {
        win.__FLUSH_CURSOR_REFS__();
      }
    }, 100);

    try {
      const saved = window.localStorage.getItem(CART_STORAGE_KEY);
      if (saved !== null) {
        const parsed = parseInt(saved, 10);
        if (!Number.isNaN(parsed) && parsed >= 0) {
          setCartQty(parsed);
        }
      }
    } catch {
      // ignore storage errors
    }

    const handleCartUpdated = (event: Event) => {
      const custom = event as CustomEvent<{
        quantity: number;
        openDrawer?: boolean;
      }>;
      if (custom.detail && typeof custom.detail.quantity === "number") {
        setCartQty(custom.detail.quantity);
        if (custom.detail.openDrawer) {
          setMenuOpen(false);
          setCartOpen(true);
        }
      }
    };

    const handleScroll = () => {
      setScrolled(window.scrollY > 24);
    };
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("tj-cart-updated", handleCartUpdated);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("tj-cart-updated", handleCartUpdated);
    };
  }, []);

  // Close drawers on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (menuOpen) {
          setMenuOpen(false);
          menuButtonRef.current?.focus();
        }
        if (cartOpen) {
          setCartOpen(false);
          cartButtonRef.current?.focus();
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [menuOpen, cartOpen]);

  // Prevent background body scroll when either left menu drawer or right cart drawer is open
  useEffect(() => {
    if (menuOpen || cartOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen, cartOpen]);

  const updateCartQuantity = (nextQty: number) => {
    const clamped = Math.max(0, Math.min(24, nextQty));
    setCartQty(clamped);
    try {
      window.localStorage.setItem(CART_STORAGE_KEY, String(clamped));
    } catch {
      // ignore
    }
  };

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    sectionId: string
  ) => {
    setMenuOpen(false);
    setCartOpen(false);
    if (!sectionId) return;

    if (isHome) {
      e.preventDefault();
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      if (sectionId === "hero") {
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: prefersReducedMotion ? "auto" : "smooth",
        });
        return;
      }
      const target = document.getElementById(sectionId);
      if (target) {
        target.scrollIntoView({
          behavior: prefersReducedMotion ? "auto" : "smooth",
          block: "start",
        });
      }
    }
  };

  const shopifyCheckoutUrl = `${SITE_CONTENT.shopPage.shopifyStoreDomain}/cart/${
    SITE_CONTENT.shopPage.shopifyVariantId
  }:${Math.max(1, cartQty)}`;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
          scrolled || menuOpen || cartOpen || !isHome
            ? "bg-[#080808] border-b border-[#BDBDBD]/15"
            : "bg-[#080808]/90 backdrop-blur-md border-b border-[#BDBDBD]/10"
        }`}
      >
        <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-5 sm:px-8 md:px-12">
          {/* LEFT CLUSTER: Hamburger Menu Icon + TJ Monogram Logo (Exact Original Layout) */}
          <div className="flex items-center gap-5 sm:gap-6">
            <button
              ref={menuButtonRef}
              type="button"
              aria-expanded={menuOpen}
              aria-controls="menu-drawer"
              aria-label={menuOpen ? "Close menu" : "Menu"}
              onClick={() => {
                setCartOpen(false);
                setMenuOpen((prev) => !prev);
              }}
              className="group -ml-2 inline-flex h-10 w-10 items-center justify-center text-[#F5F5F5] transition-transform duration-200 hover:scale-105 focus:outline-none"
            >
              {menuOpen ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                  focusable="false"
                  className="h-[17px] w-[18px]"
                  fill="none"
                  viewBox="0 0 18 17"
                >
                  <path
                    d="M.865 15.978a.5.5 0 00.707.707l7.433-7.431 7.579 7.282a.501.501 0 00.846-.37.5.5 0 00-.153-.351L9.712 8.546l7.417-7.416a.5.5 0 10-.707-.708L8.991 7.853 1.413.573a.5.5 0 10-.693.72l7.563 7.268-7.418 7.417z"
                    fill="currentColor"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                  focusable="false"
                  className="h-[16px] w-[18px]"
                  fill="none"
                  viewBox="0 0 18 16"
                >
                  <path
                    d="M1 .5a.5.5 0 100 1h15.71a.5.5 0 000-1H1zM.5 8a.5.5 0 01.5-.5h15.71a.5.5 0 010 1H1A.5.5 0 01.5 8zm0 7a.5.5 0 01.5-.5h15.71a.5.5 0 010 1H1a.5.5 0 01-.5-.5z"
                    fill="currentColor"
                  />
                </svg>
              )}
            </button>

            <Link
              href="/"
              aria-label="TJ Vodka"
              onClick={(e) => handleNavClick(e, "hero")}
              className="inline-flex items-center text-[#F5F5F5] no-underline focus:outline-none"
            >
              <img
                src={SITE_CONTENT.brand.logoSrc}
                alt="TJ Vodka"
                width={24}
                height={35}
                className="bw-enforced-media h-7 sm:h-8 w-auto object-contain"
              />
            </Link>
          </div>

          {/* RIGHT CLUSTER: Profile Login Icon + Cart Bag Icon (Replaces SHOP TJ VODKA placement) */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Profile / Account Login Icon */}
            <a
              href={SITE_CONTENT.navigation.loginUrl}
              aria-label="Log in"
              className="inline-flex h-10 w-10 items-center justify-center text-[#F5F5F5] transition-transform duration-200 hover:scale-105 hover:text-[#BDBDBD] focus:outline-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                focusable="false"
                className="h-[19px] w-[18px]"
                fill="none"
                viewBox="0 0 18 19"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M6 4.5a3 3 0 116 0 3 3 0 01-6 0zm3-4a4 4 0 100 8 4 4 0 000-8zm5.58 12.15c1.12.82 1.83 2.24 1.91 4.85H1.51c.08-2.6.79-4.03 1.9-4.85C4.66 11.75 6.5 11.5 9 11.5s4.35.26 5.58 1.15zM9 10.5c-2.5 0-4.65.24-6.17 1.35C1.27 12.98.5 14.93.5 18v.5h17V18c0-3.07-.77-5.02-2.33-6.15-1.52-1.1-3.67-1.35-6.17-1.35z"
                  fill="currentColor"
                />
              </svg>
              <span className="sr-only">Log in</span>
            </a>

            {/* Far Right: Cart Bag Icon */}
            <button
              ref={cartButtonRef}
              type="button"
              id="cart-icon-bubble"
              aria-expanded={cartOpen}
              aria-controls="cart-drawer"
              aria-label={`Cart (${cartQty} ${cartQty === 1 ? "item" : "items"})`}
              onClick={() => {
                setMenuOpen(false);
                setCartOpen((prev) => !prev);
              }}
              className="relative -mr-2 inline-flex h-10 w-10 items-center justify-center text-[#F5F5F5] transition-transform duration-200 hover:scale-105 hover:text-[#BDBDBD] focus:outline-none"
            >
              <svg
                className="h-10 w-10"
                aria-hidden="true"
                focusable="false"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 40 40"
                fill="none"
              >
                <path
                  d="m15.75 11.8h-3.16l-.77 11.6a5 5 0 0 0 4.99 5.34h7.38a5 5 0 0 0 4.99-5.33l-.78-11.61zm0 1h-2.22l-.71 10.67a4 4 0 0 0 3.99 4.27h7.38a4 4 0 0 0 4-4.27l-.72-10.67h-2.22v.63a4.75 4.75 0 1 1 -9.5 0zm8.5 0h-7.5v.63a3.75 3.75 0 1 0 7.5 0z"
                  fill="currentColor"
                  fillRule="evenodd"
                />
              </svg>
              {cartQty > 0 && (
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute bottom-[6px] right-[7px] flex h-4 min-w-[16px] items-center justify-center rounded-full bg-[#080808] px-1 font-sans text-[10px] font-semibold leading-none text-[#F5F5F5]"
                >
                  {cartQty}
                </span>
              )}
              <span className="sr-only">Cart</span>
            </button>
          </div>
        </div>
      </header>

      {/* =====================================================================
          LEFT NAVIGATION SIDEBAR DRAWER (#menu-drawer)
          Opens on the left side when clicking the Hamburger menu icon.
          Includes BUY NOW inside the navigation list + Log in & Socials at bottom.
         ===================================================================== */}
      <div
        aria-hidden={!menuOpen}
        className={`fixed inset-0 top-16 z-40 transition-opacity duration-300 ${
          menuOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
      >
        {/* Backdrop Overlay */}
        <div
          onClick={() => setMenuOpen(false)}
          className="
            absolute inset-0 bg-black/65 backdrop-blur-[2px]
          "
        />

        {/* Left Slide-Out Sidebar Panel */}
        <aside
          id="menu-drawer"
          role="dialog"
          aria-modal="true"
          aria-label="Site Navigation"
          className={`relative z-10 flex h-full w-[86vw] max-w-[380px] flex-col justify-between border-r border-[#BDBDBD]/20 bg-[#080808] transition-transform duration-300 ease-out ${
            menuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          {/* Primary Navigation Links (Includes BUY NOW) */}
          <nav
            aria-label="Primary Sidebar Navigation"
            className="flex-1 overflow-y-auto px-7 pt-8 pb-6"
          >
            <ul className="flex flex-col divide-y divide-[#BDBDBD]/15">
              {SITE_CONTENT.navigation.sidebarLinks.map((item) => {
                const isBuyNow = item.href === "/products/tj-vodka";
                const isActive =
                  (isBuyNow && pathname === "/products/tj-vodka") ||
                  (item.href === "/" && isHome && !isBuyNow);
                return (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      onClick={(e) => handleNavClick(e, item.sectionId)}
                      className={`group flex items-center justify-between py-4 font-sans text-sm uppercase tracking-[0.2em] transition-colors duration-200 ${
                        isBuyNow
                          ? "font-semibold text-[#F5F5F5] hover:text-[#BDBDBD]"
                          : isActive
                          ? "text-[#F5F5F5]"
                          : "text-[#BDBDBD] hover:text-[#F5F5F5]"
                      }`}
                    >
                      <span>{item.label}</span>
                      {isBuyNow && (
                        <span
                          aria-hidden="true"
                          className="border border-[#F5F5F5]/60 px-2.5 py-0.5 text-[10px] tracking-[0.18em] text-[#F5F5F5] transition-colors group-hover:bg-[#F5F5F5] group-hover:text-[#080808]"
                        >
                          70CL
                        </span>
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Bottom Utility Links: Shopify Account Log in + Social Icons (Matches Original Drawer) */}
          <div className="border-t border-[#BDBDBD]/15 bg-[#0E0E0E] px-7 py-6">
            <a
              href={SITE_CONTENT.navigation.loginUrl}
              className="inline-flex items-center gap-3 font-sans text-xs uppercase tracking-[0.18em] text-[#F5F5F5] transition-colors hover:text-[#BDBDBD]"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                focusable="false"
                className="h-[18px] w-[17px]"
                fill="none"
                viewBox="0 0 18 19"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M6 4.5a3 3 0 116 0 3 3 0 01-6 0zm3-4a4 4 0 100 8 4 4 0 000-8zm5.58 12.15c1.12.82 1.83 2.24 1.91 4.85H1.51c.08-2.6.79-4.03 1.9-4.85C4.66 11.75 6.5 11.5 9 11.5s4.35.26 5.58 1.15zM9 10.5c-2.5 0-4.65.24-6.17 1.35C1.27 12.98.5 14.93.5 18v.5h17V18c0-3.07-.77-5.02-2.33-6.15-1.52-1.1-3.67-1.35-6.17-1.35z"
                  fill="currentColor"
                />
              </svg>
              <span>Log in</span>
            </a>

            <ul className="mt-5 flex items-center gap-5" role="list">
              <li>
                <a
                  href="https://www.facebook.com/tj.vodka/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="text-[#BDBDBD] transition-colors hover:text-[#F5F5F5]"
                >
                  <svg
                    aria-hidden="true"
                    focusable="false"
                    className="h-[17px] w-[17px]"
                    viewBox="0 0 18 18"
                  >
                    <path
                      fill="currentColor"
                      d="M16.42.61c.27 0 .5.1.69.28.19.2.28.42.28.7v15.44c0 .27-.1.5-.28.69a.94.94 0 01-.7.28h-4.39v-6.7h2.25l.31-2.65h-2.56v-1.7c0-.4.1-.72.28-.93.18-.2.5-.32 1-.32h1.37V3.35c-.6-.06-1.27-.1-2.01-.1-1.01 0-1.83.3-2.45.9-.62.6-.93 1.44-.93 2.53v1.97H7.04v2.65h2.24V18H.98c-.28 0-.5-.1-.7-.28a.94.94 0 01-.28-.7V1.59c0-.27.1-.5.28-.69a.94.94 0 01.7-.28h15.44z"
                    />
                  </svg>
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/tj.vodka/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="text-[#BDBDBD] transition-colors hover:text-[#F5F5F5]"
                >
                  <svg
                    aria-hidden="true"
                    focusable="false"
                    className="h-[17px] w-[17px]"
                    viewBox="0 0 18 18"
                  >
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
                  className="text-[#BDBDBD] transition-colors hover:text-[#F5F5F5]"
                >
                  <svg
                    aria-hidden="true"
                    focusable="false"
                    className="h-[17px] w-[15px]"
                    viewBox="0 0 16 18"
                    fill="none"
                  >
                    <path
                      d="M8.02 0H11s-.17 3.82 4.13 4.1v2.95s-2.3.14-4.13-1.26l.03 6.1a5.52 5.52 0 11-5.51-5.52h.77V9.4a2.5 2.5 0 101.76 2.4L8.02 0z"
                      fill="currentColor"
                    />
                  </svg>
                </a>
              </li>
            </ul>
          </div>
        </aside>
      </div>

      {/* =====================================================================
          RIGHT CART DRAWER (#cart-drawer)
          Matches original Shopify <cart-drawer> behavior when clicking Cart icon.
         ===================================================================== */}
      <div
        aria-hidden={!cartOpen}
        className={`fixed inset-0 z-50 transition-opacity duration-300 ${
          cartOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
      >
        {/* Backdrop Overlay */}
        <div
          onClick={() => setCartOpen(false)}
          className="absolute inset-0 bg-black/65 backdrop-blur-[2px]"
        />

        {/* Right Slide-Out Cart Panel */}
        <aside
          id="cart-drawer"
          role="dialog"
          aria-modal="true"
          aria-label="Your cart"
          className={`absolute top-0 right-0 bottom-0 z-10 flex w-[90vw] max-w-[400px] flex-col justify-between border-l border-[#BDBDBD]/20 bg-[#080808] p-6 sm:p-7 transition-transform duration-300 ease-out ${
            cartOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {/* Drawer Header */}
          <div className="flex items-center justify-between border-b border-[#BDBDBD]/15 pb-4">
            <h2 className="font-serif text-2xl font-light tracking-[0.04em] text-[#F5F5F5]">
              Your cart
            </h2>
            <button
              type="button"
              onClick={() => setCartOpen(false)}
              aria-label="Close cart"
              className="inline-flex h-9 w-9 items-center justify-center text-[#F5F5F5] transition-colors hover:text-[#BDBDBD]"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                focusable="false"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 18 17"
              >
                <path
                  d="M.865 15.978a.5.5 0 00.707.707l7.433-7.431 7.579 7.282a.501.501 0 00.846-.37.5.5 0 00-.153-.351L9.712 8.546l7.417-7.416a.5.5 0 10-.707-.708L8.991 7.853 1.413.573a.5.5 0 10-.693.72l7.563 7.268-7.418 7.417z"
                  fill="currentColor"
                />
              </svg>
            </button>
          </div>

          {cartQty === 0 ? (
            /* Empty Cart State (Exact Original Copy + Login Prompt) */
            <div className="my-auto flex flex-col items-center text-center">
              <p className="font-serif text-3xl font-light text-[#F5F5F5]">
                Your cart is empty
              </p>
              <Link
                href="/products/tj-vodka"
                onClick={() => setCartOpen(false)}
                className="mt-6 inline-flex items-center justify-center border border-[#F5F5F5] bg-[#F4F4F4] px-7 py-3.5 font-sans text-xs font-medium uppercase tracking-[0.2em] text-[#151515] transition-colors hover:bg-transparent hover:text-[#F5F5F5]"
              >
                Continue shopping
              </Link>

              <div className="mt-10 border-t border-[#BDBDBD]/15 pt-6">
                <p className="font-serif text-lg text-[#F5F5F5]">
                  Have an account?
                </p>
                <p className="mt-1.5 font-sans text-xs text-[#A8A8A8]">
                  <a
                    href={SITE_CONTENT.navigation.loginUrl}
                    className="text-[#F5F5F5] underline underline-offset-4 hover:text-[#BDBDBD]"
                  >
                    Log in
                  </a>{" "}
                  to check out faster.
                </p>
              </div>
            </div>
          ) : (
            /* Filled Cart State */
            <>
              <div className="flex-1 overflow-y-auto py-6">
                <div className="flex gap-4 border-b border-[#BDBDBD]/15 pb-6">
                  <div className="flex h-24 w-20 shrink-0 items-center justify-center border border-[#BDBDBD]/20 bg-[#141414] p-2">
                    <img
                      src="/media/bw/m10-shop-packshot.png"
                      alt="TJ Vodka 70cl"
                      className="bw-enforced-media h-full w-auto object-contain"
                    />
                  </div>
                  <div className="flex flex-1 flex-col justify-between">
                    <div>
                      <Link
                        href="/products/tj-vodka"
                        onClick={() => setCartOpen(false)}
                        className="font-serif text-lg text-[#F5F5F5] hover:underline"
                      >
                        TJ Vodka
                      </Link>
                      <p className="font-sans text-[11px] uppercase tracking-[0.16em] text-[#A8A8A8]">
                        70cl · £{UNIT_PRICE_GBP.toFixed(2)} GBP
                      </p>
                    </div>

                    <div className="mt-3 flex items-center justify-between">
                      <div className="inline-flex items-center border border-[#BDBDBD]/40 bg-[#141414]">
                        <button
                          type="button"
                          onClick={() => updateCartQuantity(cartQty - 1)}
                          aria-label="Decrease quantity"
                          className="px-3 py-1.5 font-sans text-xs text-[#F5F5F5] hover:bg-[#080808]"
                        >
                          −
                        </button>
                        <span className="px-3 font-sans text-xs text-[#F5F5F5]">
                          {cartQty}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateCartQuantity(cartQty + 1)}
                          aria-label="Increase quantity"
                          className="px-3 py-1.5 font-sans text-xs text-[#F5F5F5] hover:bg-[#080808]"
                        >
                          +
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={() => updateCartQuantity(0)}
                        className="font-sans text-[10px] uppercase tracking-[0.16em] text-[#A8A8A8] underline underline-offset-4 hover:text-[#F5F5F5]"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Cart Footer & Checkout CTA */}
              <div className="border-t border-[#BDBDBD]/20 pt-5">
                <div className="flex items-baseline justify-between">
                  <span className="font-sans text-xs uppercase tracking-[0.18em] text-[#A8A8A8]">
                    Subtotal
                  </span>
                  <span className="font-serif text-2xl text-[#F5F5F5]">
                    £{(cartQty * UNIT_PRICE_GBP).toFixed(2)} GBP
                  </span>
                </div>
                <p className="mt-1.5 font-sans text-[11px] text-[#A8A8A8]">
                  Tax included and shipping calculated at checkout
                </p>

                <a
                  href={shopifyCheckoutUrl}
                  className="mt-5 flex w-full items-center justify-center border border-[#F5F5F5] bg-[#F4F4F4] py-4 font-sans text-xs font-medium uppercase tracking-[0.2em] text-[#151515] transition-colors hover:bg-transparent hover:text-[#F5F5F5]"
                >
                  Check out
                </a>
              </div>
            </>
          )}
        </aside>
      </div>
    </>
  );
}
