"use client";

import React, { Suspense, useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Navbar, dispatchCartUpdate } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import {
  FLAVOURS,
  SITE_CONTENT,
  type FlavourId,
} from "@/config/siteContent";
import type { LiveShopifyProductData } from "@/app/api/shopify-product/route";

function flavourFromParam(value: string | null): FlavourId {
  return value === "vanilla" ? "vanilla" : "original";
}

export default function ProductShopPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-[#0a0a0a] text-white/40">
          Loading…
        </div>
      }
    >
      <ProductShopPageInner />
    </Suspense>
  );
}

function ProductShopPageInner() {
  if (typeof document !== "undefined") {
    document
      .querySelectorAll("[data-cursor-ref]")
      .forEach((el) => el.removeAttribute("data-cursor-ref"));
  }
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const flavourFromUrl = flavourFromParam(searchParams.get("flavour"));
  const [flavourId, setFlavourId] = useState<FlavourId>(flavourFromUrl);
  const flavour = FLAVOURS[flavourId];
  const [selectedGalleryId, setSelectedGalleryId] = useState<string>(
    flavour.gallery[0].id
  );
  const [quantity, setQuantity] = useState<number>(1);
  const [liveData, setLiveData] = useState<LiveShopifyProductData | null>(null);
  const [loadingLive, setLoadingLive] = useState<boolean>(true);

  useEffect(() => {
    setFlavourId(flavourFromUrl);
    setSelectedGalleryId(FLAVOURS[flavourFromUrl].gallery[0].id);
    setQuantity(1);
  }, [flavourFromUrl]);

  const selectFlavour = (nextId: FlavourId) => {
    setFlavourId(nextId);
    setSelectedGalleryId(FLAVOURS[nextId].gallery[0].id);
    setQuantity(1);
    const params = new URLSearchParams(searchParams.toString());
    if (nextId === "vanilla") {
      params.set("flavour", "vanilla");
    } else {
      params.delete("flavour");
    }
    const query = params.toString();
    router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
  };

  useEffect(() => {
    let active = true;
    async function loadShopifyData() {
      try {
        setLiveData(null);
        setLoadingLive(true);
        const res = await fetch(
          `/api/shopify-product?handle=${encodeURIComponent(flavour.shopifyHandle)}`,
          { cache: "no-store" }
        );
        const json: LiveShopifyProductData = await res.json();
        if (active) {
          setLiveData(json);
        }
      } catch {
        if (active) {
          setLiveData({
            connected: false,
            fetchedAt: new Date().toISOString(),
            id: null,
            variantId: flavour.shopifyVariantId || 0,
            title: flavour.title,
            description: flavour.description,
            priceCents: null,
            formattedPrice: null,
            currency: "GBP",
            available: null,
            storeUrl: SITE_CONTENT.shopPage.shopifyStoreDomain,
            productUrl: flavour.productUrl,
            cartPermalinkBase: `${SITE_CONTENT.shopPage.shopifyStoreDomain}/cart`,
          });
        }
      } finally {
        if (active) {
          setLoadingLive(false);
        }
      }
    }
    loadShopifyData();
    return () => {
      active = false;
    };
  }, [flavour.description, flavour.productUrl, flavour.shopifyHandle, flavour.shopifyVariantId, flavour.title]);

  const currentGalleryItem =
    flavour.gallery.find((item) => item.id === selectedGalleryId) ||
    flavour.gallery[0];

  const variantId =
    liveData?.variantId || flavour.shopifyVariantId || 0;
  const canCheckout = Boolean(liveData?.connected && variantId);

  // Real Shopify checkout permalink for the selected quantity
  const shopifyCheckoutUrl = canCheckout
    ? `${SITE_CONTENT.shopPage.shopifyStoreDomain}/cart/${variantId}:${quantity}`
    : flavour.productUrl;

  const decreaseQty = () => setQuantity((q) => Math.max(1, q - 1));
  const increaseQty = () => setQuantity((q) => Math.min(24, q + 1));

  return (
    <div className="min-h-screen bg-[#080808] text-[#F5F5F5]">
      <Navbar />

      <main id="main-content" className="pt-28 pb-20 md:pt-36 md:pb-28">
        <div className="mx-auto max-w-[1400px] px-6 md:px-12">
          {/* Top Breadcrumb / Back Link */}
          <div className="mb-10 flex flex-wrap items-center justify-between gap-4 border-b border-[#BDBDBD]/15 pb-4">
            <Link
              href="/"
              className="inline-flex items-center font-sans text-[11px] uppercase tracking-[0.2em] text-[#A8A8A8] transition-colors hover:text-[#F5F5F5]"
            >
              Back to Homepage
            </Link>
          </div>

          {/* Primary Product Split: gallery sticks on the left while the buy column scrolls */}
          <div className="grid grid-cols-1 items-start gap-12 md:grid-cols-12 md:gap-10 lg:gap-16">
            <div className="flex flex-col md:sticky md:top-24 md:w-[min(100%,calc((100svh-17rem)*1301/2048))] md:col-span-5 md:self-start lg:col-span-6">
              <div
                data-media-slot={flavourId === "vanilla" ? "M11" : "M10"}
                className="relative aspect-[1301/2048] w-full overflow-hidden bg-[#080808]"
              >
                <img
                  src={currentGalleryItem.src}
                  alt={currentGalleryItem.alt}
                  width={flavourId === "vanilla" ? 650 : 1301}
                  height={flavourId === "vanilla" ? 1024 : 2048}
                  className={`${
                    flavourId === "vanilla"
                      ? "product-color-media"
                      : "bw-enforced-media"
                  } h-full w-full object-cover object-center`}
                />
              </div>

              {flavour.gallery.length > 1 && (
                <div
                  role="group"
                  aria-label="Product photos"
                  className={`mt-4 grid gap-3 ${
                    flavour.gallery.length === 3 ? "grid-cols-3" : "grid-cols-4"
                  }`}
                >
                  {flavour.gallery.map((item) => {
                    const isActive = item.id === selectedGalleryId;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setSelectedGalleryId(item.id)}
                        aria-pressed={isActive}
                        aria-label={item.alt}
                        className={`overflow-hidden border-2 bg-[#080808] p-0 transition-colors ${
                          isActive
                            ? "border-[#F5F5F5]"
                            : "border-transparent hover:border-[#BDBDBD]/50"
                        }`}
                      >
                        <img
                          src={item.src}
                          alt=""
                          className={`${
                            flavourId === "vanilla"
                              ? "product-color-media"
                              : "bw-enforced-media"
                          } aspect-square w-full object-contain object-center`}
                        />
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Right Column: Title, Live Price & Availability, Quantity, Real Shopify Cart/Checkout */}
            <div className="flex flex-col md:col-span-7 lg:col-span-6">
              <span className="font-sans text-[10px] uppercase tracking-[0.26em] text-[#A8A8A8]">
                {flavour.eyebrow}
              </span>

              <h1 className="mt-3 font-serif text-[clamp(2.75rem,5vw,4.5rem)] font-light leading-[1.02] tracking-[0.02em] text-[#F5F5F5]">
                {flavour.title}
              </h1>

              <p className="mt-2 font-spirit text-xl tracking-[0.03em] text-[#BDBDBD]">
                {flavour.subtitle}
              </p>

              <div
                role="tablist"
                aria-label="Choose flavour"
                className="mt-6 inline-flex border border-[#BDBDBD]/30"
              >
                {(Object.keys(FLAVOURS) as FlavourId[]).map((id) => {
                  const isActive = flavourId === id;
                  return (
                    <button
                      key={id}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      onClick={() => selectFlavour(id)}
                      className={`px-5 py-2.5 font-sans text-[11px] uppercase tracking-[0.2em] transition-colors ${
                        isActive
                          ? "bg-[#F4F4F4] text-[#151515]"
                          : "bg-transparent text-[#A8A8A8] hover:text-[#F5F5F5]"
                      }`}
                    >
                      {FLAVOURS[id].flavourLabel}
                    </button>
                  );
                })}
              </div>

              {/* Live Price & Availability Status Block (from tjvodka.co.uk/products/tj-vodka.js) */}
              <div
                aria-live="polite"
                className="mt-7 flex flex-wrap items-baseline justify-between gap-4 border-y border-[#BDBDBD]/20 py-5"
              >
                <div>
                  <span className="block font-sans text-[9px] uppercase tracking-[0.22em] text-[#A8A8A8]">
                    LIVE STORE PRICE (70CL)
                  </span>
                  {loadingLive ? (
                    <span className="mt-1 inline-block font-serif text-3xl text-[#A8A8A8]">
                      Checking live store…
                    </span>
                  ) : liveData?.connected && liveData.formattedPrice ? (
                    <div className="mt-1 flex items-baseline gap-3">
                      <span className="font-serif text-4xl font-light text-[#F5F5F5]">
                        {liveData.formattedPrice}
                      </span>
                      <span className="font-sans text-[11px] text-[#A8A8A8]">
                        Tax included · GBP
                      </span>
                    </div>
                  ) : (
                    <span className="mt-1 inline-block font-serif text-2xl text-[#F5F5F5]">
                      See live pricing at checkout
                    </span>
                  )}
                </div>

                <div className="flex flex-col items-start sm:items-end">
                  <span className="font-sans text-[9px] uppercase tracking-[0.22em] text-[#A8A8A8]">
                    AVAILABILITY
                  </span>
                  {loadingLive ? (
                    <span className="mt-1.5 font-sans text-xs uppercase tracking-[0.16em] text-[#A8A8A8]">
                      Verifying stock…
                    </span>
                  ) : liveData?.connected ? (
                    <span className="mt-1.5 inline-flex items-center gap-2 border border-[#BDBDBD]/40 bg-[#141414] px-3 py-1 font-sans text-[10px] uppercase tracking-[0.2em] text-[#F5F5F5]">
                      <span
                        aria-hidden="true"
                        className={`h-1.5 w-1.5 rounded-full ${
                          liveData.available ? "bg-[#F5F5F5]" : "bg-[#A8A8A8]"
                        }`}
                      />
                      {liveData.available ? "In Stock · Ready to Ship" : "Currently Sold Out"}
                    </span>
                  ) : (
                    <span className="mt-1.5 font-sans text-xs text-[#A8A8A8]">
                      Live stock verified on Shopify store
                    </span>
                  )}
                </div>
              </div>

              {/* Approved Description */}
              <div className="mt-6">
                <p className="font-sans text-sm md:text-base leading-[1.8] text-[#F5F5F5]/90">
                  {flavour.description}
                </p>
              </div>

              {/* Quantity Selector & Real Connected Shopify Cart / Checkout Actions */}
              <form
                action={`${SITE_CONTENT.shopPage.shopifyStoreDomain}/cart/add`}
                method="post"
                onSubmit={(e) => {
                  e.preventDefault();
                  if (!canCheckout) return;
                  try {
                    const current = parseInt(
                      window.localStorage.getItem("tj_vodka_cart_qty") || "0",
                      10
                    );
                    const nextQty = Math.min(
                      24,
                      (Number.isNaN(current) ? 0 : current) + quantity
                    );
                    dispatchCartUpdate(nextQty, true);
                  } catch {
                    dispatchCartUpdate(quantity, true);
                  }
                }}
                className="mt-8 border border-[#BDBDBD]/20 bg-[#141414] p-6"
              >
                <input type="hidden" name="id" value={variantId} />
                <input type="hidden" name="return_to" value="/cart" />

                <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <label
                      htmlFor="product-quantity-input"
                      className="block font-sans text-[10px] uppercase tracking-[0.22em] text-[#A8A8A8]"
                    >
                      Quantity (70cl Bottles)
                    </label>
                    <div className="mt-2.5 inline-flex items-center border border-[#BDBDBD]/50 bg-[#080808]">
                      <button
                        type="button"
                        onClick={decreaseQty}
                        aria-label="Decrease quantity"
                        className="px-4 py-3 font-sans text-sm text-[#F5F5F5] transition-colors hover:bg-[#141414]"
                      >
                        −
                      </button>
                      <input
                        id="product-quantity-input"
                        type="number"
                        name="quantity"
                        min={1}
                        max={24}
                        value={quantity}
                        onChange={(e) => {
                          const val = parseInt(e.target.value, 10);
                          if (!Number.isNaN(val)) {
                            setQuantity(Math.min(24, Math.max(1, val)));
                          }
                        }}
                        className="w-14 bg-transparent text-center font-sans text-sm text-[#F5F5F5] focus:outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                      />
                      <button
                        type="button"
                        onClick={increaseQty}
                        aria-label="Increase quantity"
                        className="px-4 py-3 font-sans text-sm text-[#F5F5F5] transition-colors hover:bg-[#141414]"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {liveData?.connected && liveData.priceCents && (
                    <div className="text-left sm:text-right">
                      <span className="block font-sans text-[10px] uppercase tracking-[0.2em] text-[#A8A8A8]">
                        Subtotal ({quantity} {quantity === 1 ? "Bottle" : "Bottles"})
                      </span>
                      <span className="mt-1 block font-serif text-2xl text-[#F5F5F5]">
                        £{((liveData.priceCents * quantity) / 100).toFixed(2)}
                      </span>
                    </div>
                  )}
                </div>

                {/* Primary & Secondary Real Shopify Commerce Actions */}
                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <button
                    type="submit"
                    disabled={
                      !canCheckout ||
                      (liveData?.connected === true && liveData.available === false)
                    }
                    className="flex-1 border border-[#F5F5F5] bg-[#F4F4F4] px-6 py-4 text-center font-sans text-xs font-medium uppercase tracking-[0.2em] text-[#151515] transition-colors duration-200 hover:bg-transparent hover:text-[#F5F5F5] disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {loadingLive
                      ? "Checking live store…"
                      : liveData?.connected && liveData.available === false
                        ? "Sold Out"
                        : canCheckout
                          ? "Add to Shopify Cart"
                          : flavourId === "vanilla"
                            ? "Vanilla joining the official store"
                            : "See official store"}
                  </button>

                  <a
                    href={shopifyCheckoutUrl}
                    className="flex-1 border border-[#BDBDBD]/60 bg-[#080808] px-6 py-4 text-center font-sans text-xs uppercase tracking-[0.2em] text-[#F5F5F5] transition-colors duration-200 hover:border-[#F5F5F5] hover:bg-[#F4F4F4] hover:text-[#151515]"
                  >
                    {canCheckout
                      ? "Proceed to Shopify Checkout"
                      : "View official store"}
                  </a>
                </div>

                <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-[#BDBDBD]/15 pt-3 font-sans text-[11px] text-[#A8A8A8]">
                  <span>
                    {canCheckout ? "Connected to official store: " : "Official store listing: "}
                    <a
                      href={flavour.productUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#F5F5F5] underline underline-offset-4"
                    >
                      tjvodka.co.uk/products/{flavour.shopifyHandle}
                    </a>
                  </span>
                  {canCheckout && <span>Variant ID: {variantId}</span>}
                </div>
              </form>

              {/* Verified Specifications Table */}
              <div className="mt-8">
                <h2 className="font-sans text-[10px] uppercase tracking-[0.24em] text-[#A8A8A8]">
                  Verified Product Specifications
                </h2>
                <dl className="mt-3 divide-y divide-[#BDBDBD]/15 border-y border-[#BDBDBD]/20">
                  {flavour.specifications.map((spec) => (
                    <div
                      key={spec.label}
                      className="flex items-baseline justify-between py-3.5 text-xs"
                    >
                      <dt className="font-sans uppercase tracking-[0.16em] text-[#A8A8A8]">
                        {spec.label}
                      </dt>
                      <dd className="font-sans text-right text-[#F5F5F5]">
                        {spec.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </div>

          {/* Approved Delivery & Returns Information Section */}
          <div className="mt-16 grid grid-cols-1 gap-8 border-t border-[#BDBDBD]/20 pt-12 md:grid-cols-2">
            <div className="border border-[#BDBDBD]/15 bg-[#141414] p-6 md:p-8">
              <span className="font-sans text-[9px] uppercase tracking-[0.22em] text-[#A8A8A8]">
                ORDER FULFILMENT
              </span>
              <h2 className="mt-2 font-serif text-2xl text-[#F5F5F5]">
                {SITE_CONTENT.shopPage.deliveryAndReturns.deliveryTitle}
              </h2>
              <p className="mt-3 font-sans text-xs md:text-sm leading-relaxed text-[#A8A8A8]">
                {SITE_CONTENT.shopPage.deliveryAndReturns.deliveryBody}
              </p>
            </div>

            <div className="border border-[#BDBDBD]/15 bg-[#141414] p-6 md:p-8">
              <span className="font-sans text-[9px] uppercase tracking-[0.22em] text-[#A8A8A8]">
                CUSTOMER ASSURANCE
              </span>
              <h2 className="mt-2 font-serif text-2xl text-[#F5F5F5]">
                {SITE_CONTENT.shopPage.deliveryAndReturns.returnsTitle}
              </h2>
              <p className="mt-3 font-sans text-xs md:text-sm leading-relaxed text-[#A8A8A8]">
                {SITE_CONTENT.shopPage.deliveryAndReturns.returnsBody}
              </p>
              <div className="mt-4">
                <Link
                  href="/policies/refund-policy"
                  className="font-sans text-[11px] uppercase tracking-[0.18em] text-[#F5F5F5] underline underline-offset-4"
                >
                  Read Full Refund Policy
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Shared Compact Footer */}
      <Footer compact />
    </div>
  );
}
