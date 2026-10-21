import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export interface LiveShopifyProductData {
  connected: boolean;
  fetchedAt: string;
  id: number | null;
  variantId: number;
  title: string;
  description: string;
  priceCents: number | null;
  formattedPrice: string | null;
  currency: string;
  available: boolean | null;
  storeUrl: string;
  productUrl: string;
  cartPermalinkBase: string;
  error?: string;
}

/**
 * Fetches live pricing, availability, and variant data directly from
 * the existing TJ Vodka Shopify storefront (https://tjvodka.co.uk/products/tj-vodka.js).
 * Does not hardcode previously observed price or stock status when offline.
 */
export async function GET() {
  const storeUrl = "https://tjvodka.co.uk";
  const productUrl = `${storeUrl}/products/tj-vodka`;
  const defaultVariantId = 44534023651623;

  try {
    const response = await fetch(`${productUrl}.js`, {
      headers: {
        Accept: "application/json",
        "User-Agent": "TJVodka-Storefront/2.0",
      },
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`Shopify responded with HTTP ${response.status}`);
    }

    const data = await response.json();
    const primaryVariant = data.variants?.[0];
    const variantId = primaryVariant?.id || defaultVariantId;
    const priceCents =
      typeof primaryVariant?.price === "number"
        ? primaryVariant.price
        : typeof data.price === "number"
        ? data.price
        : null;

    const formattedPrice =
      priceCents !== null ? `£${(priceCents / 100).toFixed(2)}` : null;

    const payload: LiveShopifyProductData = {
      connected: true,
      fetchedAt: new Date().toISOString(),
      id: data.id || null,
      variantId,
      title: data.title || "TJ Vodka",
      description:
        data.description ||
        "Indulge in the smooth and exquisite taste of TJ Vodka, the perfect ingredient for crafting delicious cocktails.",
      priceCents,
      formattedPrice,
      currency: "GBP",
      available:
        typeof primaryVariant?.available === "boolean"
          ? primaryVariant.available
          : typeof data.available === "boolean"
          ? data.available
          : null,
      storeUrl,
      productUrl,
      cartPermalinkBase: `${storeUrl}/cart`,
    };

    return NextResponse.json(payload);
  } catch (err) {
    // Honest fallback if live Shopify fetch cannot be reached from current network
    const fallbackPayload: LiveShopifyProductData = {
      connected: false,
      fetchedAt: new Date().toISOString(),
      id: null,
      variantId: defaultVariantId,
      title: "TJ Vodka",
      description:
        "Indulge in the smooth and exquisite taste of TJ Vodka, the perfect ingredient for crafting delicious cocktails.",
      priceCents: null,
      formattedPrice: null,
      currency: "GBP",
      available: null,
      storeUrl,
      productUrl,
      cartPermalinkBase: `${storeUrl}/cart`,
      error:
        err instanceof Error
          ? err.message
          : "Unable to reach live Shopify storefront.",
    };

    return NextResponse.json(fallbackPayload, { status: 200 });
  }
}
