/**
 * TJ VODKA — CENTRAL MEDIA & CONTENT CONFIGURATION (BLACK & WHITE v2)
 *
 * Every asset slot M01–M10 is defined here with:
 * - slotId: "M01" | "M02" | ... | "M10"
 * - type: "image" | "video"
 * - src: primary neutral B&W asset path
 * - originalMasterSrc: separate original colour/master file path for future editing
 * - poster: static grayscale poster for video slots
 * - alt: descriptive accessibility text
 * - fit: "contain" | "cover"
 * - focalPoint: responsive object-position for desktop, tablet, and mobile
 * - allowVideoReplacement: whether this slot supports video replacement (e.g. M02, M06)
 * - statusNote: asset provenance / launch readiness note
 */

export type MediaSlotId =
  | "M01"
  | "M02"
  | "M03"
  | "M04"
  | "M05"
  | "M06"
  | "M07"
  | "M08"
  | "M09"
  | "M10";

export interface MediaAssetConfig {
  slotId: MediaSlotId;
  title: string;
  placement: string;
  type: "image" | "video";
  src: string;
  webpSrc?: string;
  mobileSrc?: string;
  originalMasterSrc: string;
  poster?: string;
  alt: string;
  fit: "contain" | "cover";
  focalPoint: {
    desktop: string;
    tablet: string;
    mobile: string;
  };
  dimensions: {
    width: number;
    height: number;
  };
  allowVideoReplacement: boolean;
  statusNote: string;
}

export const MEDIA_SLOTS: Record<MediaSlotId, MediaAssetConfig> = {
  M01: {
    slotId: "M01",
    title: "Hero & Scroll-Choreographed TJ Bottle Cutout",
    placement: "Page 1 · Section 01 Hero → Section 02 Product Explorer (shared continuous layer)",
    type: "image",
    src: "/media/bw/m01-bottle-cutout.png",
    webpSrc: "/media/bw/m01-bottle-cutout.webp",
    originalMasterSrc: "/media/originals/m01-product01-packshot.jpg",
    alt: "TJ Vodka 70cl clear glass bottle with brushed silver label and black geometric TJ monogram",
    fit: "contain",
    focalPoint: {
      desktop: "50% 50%",
      tablet: "50% 50%",
      mobile: "50% 50%",
    },
    dimensions: {
      width: 809,
      height: 1924,
    },
    allowVideoReplacement: false,
    statusNote:
      "809×1924px (>1600px tall) transparent studio cutout derived from official Shopify front packshot.",
  },
  M02: {
    slotId: "M02",
    title: "Hero Studio-Light Background Loop / Poster",
    placement: "Page 1 · Section 01 Hero Background (separate layer behind bottle & typography)",
    type: "image",
    src: "/media/bw/m02-studio-light-poster.jpg",
    originalMasterSrc: "/media/bw/m02-studio-light-poster.jpg",
    poster: "/media/bw/m02-studio-light-poster.jpg",
    alt: "Subtle monochrome studio spotlight backdrop",
    fit: "cover",
    focalPoint: {
      desktop: "52% 40%",
      tablet: "50% 42%",
      mobile: "50% 38%",
    },
    dimensions: {
      width: 1920,
      height: 1080,
    },
    allowVideoReplacement: true,
    statusNote:
      "1920×1080 neutral grayscale studio spotlight poster with ambient CSS light choreography. Supports drop-in MP4/WebM studio-light loop.",
  },
  M03: {
    slotId: "M03",
    title: "Our Story Monochrome Campaign Background (Image 2)",
    placement: "Page 1 · Section 03 Our Story Background",
    type: "image",
    src: "/media/bw/m03-story-bg-image2-bw.jpg",
    originalMasterSrc: "/media/originals/m03-story-bg-image2.jpg",
    alt: "TJ Vodka monochrome background featuring three signature bottles, founder signature, and the slogan Smoother than your average",
    fit: "cover",
    focalPoint: {
      desktop: "65% 50%",
      tablet: "62% 50%",
      mobile: "65% 50%",
    },
    dimensions: {
      width: 1024,
      height: 379,
    },
    allowVideoReplacement: false,
    statusNote:
      "Clean Image 2 monochrome background with three bottles and signature on the right and open textured space on the left for Our Story copy.",
  },
  M04: {
    slotId: "M04",
    title: "Product Explorer Clean Bottle Cutout",
    placement: "Page 1 · Section 02 The Vodka (left-hand product showcase)",
    type: "image",
    src: "/media/bw/m04-bottle-clean.png",
    webpSrc: "/media/bw/m01-bottle-cutout.webp",
    originalMasterSrc: "/media/originals/m04-image-4-serve-composite.jpg",
    alt: "TJ Vodka 70cl signature bottle studio cutout",
    fit: "contain",
    focalPoint: {
      desktop: "50% 50%",
      tablet: "50% 50%",
      mobile: "50% 50%",
    },
    dimensions: {
      width: 809,
      height: 1924,
    },
    allowVideoReplacement: false,
    statusNote:
      "Replaced temporary Image 4 composite (which contained a glass and unverified distributor badge) with the clean 1924px tall studio bottle cutout.",
  },
  M05: {
    slotId: "M05",
    title: "Monochrome Campaign Artwork Banner",
    placement: "Page 1 · Section 04 The World of TJ (wide campaign strip)",
    type: "image",
    src: "/media/bw/m05-campaign-wide-bw.jpg",
    originalMasterSrc: "/media/originals/m05-image-2-campaign.jpg",
    alt: "TJ Vodka monochrome campaign artwork featuring three bottles, signature, and the slogan Smoother than your average",
    fit: "contain",
    focalPoint: {
      desktop: "50% 50%",
      tablet: "50% 50%",
      mobile: "50% 50%",
    },
    dimensions: {
      width: 735,
      height: 272,
    },
    allowVideoReplacement: false,
    statusNote:
      "Attachment Image 2 (735×272px). Uses object-fit: contain so distorted left typography and right signature remain 100% visible. Request higher-res master for launch.",
  },
  M06: {
    slotId: "M06",
    title: "Venue Atmosphere — Illuminated Bar Shelves",
    placement: "Page 1 · Section 04 The World of TJ (Tile 01 — Atmosphere)",
    type: "image",
    src: "/media/bw/m06-atmosphere-shelves-bw.jpg",
    originalMasterSrc: "/media/originals/m06-image-3-atmosphere-shelves.jpg",
    poster: "/media/bw/m06-atmosphere-shelves-bw.jpg",
    alt: "Backlit cubby bar shelves featuring bottles of TJ Vodka in monochrome",
    fit: "cover",
    focalPoint: {
      desktop: "45% 58%",
      tablet: "45% 58%",
      mobile: "45% 60%",
    },
    dimensions: {
      width: 720,
      height: 720,
    },
    allowVideoReplacement: true,
    statusNote:
      "Attachment Image 3 neutralised from pink lighting to pure monochrome. Supports optional monochrome venue video replacement.",
  },
  M07: {
    slotId: "M07",
    title: "Editorial Culture — Bottle & Sneakers Display",
    placement: "Page 1 · Section 04 The World of TJ (Tile 02 — Culture)",
    type: "image",
    src: "/media/bw/m07-culture-sneakers-bw.jpg",
    originalMasterSrc: "/media/originals/m07-image-5-culture-sneakers.jpg",
    alt: "TJ Vodka bottle centered on an acrylic riser flanked by contemporary high-top sneakers",
    fit: "cover",
    focalPoint: {
      desktop: "50% 52%",
      tablet: "50% 52%",
      mobile: "50% 50%",
    },
    dimensions: {
      width: 750,
      height: 750,
    },
    allowVideoReplacement: false,
    statusNote:
      "Attachment Image 5 converted to neutral grayscale. Center crop protects bottle and label.",
  },
  M08: {
    slotId: "M08",
    title: "Signature Lounge — Gentleman with TJ Vodka (Main #1)",
    placement: "Page 1 · Section 04 The World of TJ (Main #1 Centerpiece Card)",
    type: "image",
    src: "/media/bw/m08-main-lounge-bw.jpg",
    originalMasterSrc: "/media/originals/m08-image-4-main-lounge.jpg",
    alt: "Gentleman seated in a lounge armchair beside a bottle of TJ Vodka in monochrome",
    fit: "cover",
    focalPoint: {
      desktop: "50% 42%",
      tablet: "50% 42%",
      mobile: "50% 42%",
    },
    dimensions: {
      width: 978,
      height: 1024,
    },
    allowVideoReplacement: false,
    statusNote:
      "Attachment Image 4 converted to neutral grayscale. Main #1 featured card in The World of TJ.",
  },
  M09: {
    slotId: "M09",
    title: "Venue — Multi-Tiered Back-Bar Display",
    placement: "Page 1 · Section 04 The World of TJ (Tile 04 — Venue)",
    type: "image",
    src: "/media/bw/m09-venue-bar-bw.jpg",
    originalMasterSrc: "/media/originals/m09-image-8-venue-bar.jpg",
    alt: "Multi-tiered illuminated back-bar shelves featuring two central TJ Vodka bottles",
    fit: "cover",
    focalPoint: {
      desktop: "50% 54%",
      tablet: "50% 54%",
      mobile: "50% 55%",
    },
    dimensions: {
      width: 800,
      height: 800,
    },
    allowVideoReplacement: false,
    statusNote:
      "Attachment Image 8 converted from warm amber to neutral grayscale. Centered on the middle shelf to keep TJ bottles identifiable.",
  },
  M10: {
    slotId: "M10",
    title: "Product / Shop Clean Packshot",
    placement: "Page 2 · /products/tj-vodka Primary Product Packshot",
    type: "image",
    src: "/media/bw/m10-shop-packshot.png",
    webpSrc: "/media/bw/m01-bottle-cutout.webp",
    originalMasterSrc: "/media/originals/m01-product01-packshot.jpg",
    alt: "TJ Vodka 70cl clean monochrome studio packshot showing full cap, label, and glass base",
    fit: "contain",
    focalPoint: {
      desktop: "50% 50%",
      tablet: "50% 50%",
      mobile: "50% 50%",
    },
    dimensions: {
      width: 809,
      height: 1924,
    },
    allowVideoReplacement: false,
    statusNote:
      "Clean >1600px tall monochrome packshot (reuses M01 cutout master) with additional monochrome gallery angles from existing Shopify store.",
  },
};

export interface ProductGalleryItem {
  id: string;
  label: string;
  src: string;
  alt: string;
  fit: "contain" | "cover";
}

export const SHOP_GALLERY_ITEMS: ProductGalleryItem[] = [
  {
    id: "front-cutout",
    label: "Front Bottle",
    src: "/media/bw/m10-shop-packshot.png",
    alt: "TJ Vodka 70cl front studio bottle packshot",
    fit: "contain",
  },
  {
    id: "back-label",
    label: "Back Label",
    src: "/media/bw/m10-product-back-bw.jpg",
    alt: "TJ Vodka 70cl back label showing Italian origin, 70cl volume, and 37.5% vol ABV",
    fit: "contain",
  },
  {
    id: "studio-reflection",
    label: "Studio Light",
    src: "/media/bw/m10-product-studio-bw.jpg",
    alt: "TJ Vodka bottle on reflective studio surface in black and white",
    fit: "contain",
  },
  {
    id: "campaign-serve",
    label: "Editorial Serve",
    src: "/media/bw/m10-product-martini-bw.jpg",
    alt: "TJ Vodka bottle alongside a chilled martini glass in monochrome",
    fit: "contain",
  },
];

export const SITE_CONTENT = {
  brand: {
    name: "TJ Vodka",
    shortName: "TJ",
    subName: "VODKA",
    slogan: "Smoother than your average.",
    logoSrc: "/brand/tj-logo-white.png",
    signatureSvg: "/brand/tj-signature-watermark.svg",
    instagramUrl: "https://www.instagram.com/tj.vodka/",
    instagramHandle: "@tj.vodka",
    existingStoreUrl: "https://tjvodka.co.uk",
    existingProductUrl: "https://tjvodka.co.uk/products/tj-vodka",
    existingContactUrl: "https://tjvodka.co.uk/pages/contact",
    contactEmail: "sales@tjvodka.co.uk",
  },
  navigation: {
    loginUrl:
      "https://shopify.com/authentication/72755839271/login?analytics_trace_id=7b4cd8d8-7b62-4092-9f08-6ade80ae1dda&client_id=91e7ac83-e109-4a83-9a7e-a8f823635b8d&locale=en-GB&redirect_uri=%2Fauthentication%2F72755839271%2Foauth%2Fauthorize%3Fanalytics_trace_id%3D7b4cd8d8-7b62-4092-9f08-6ade80ae1dda%26buyer_flags%3DeyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJmb3ItZW1tYS13aXRoLW1hbnktdGhhbmtzLm15c2hvcGlmeS5jb20iLCJmbGFncyI6W10sImV4cCI6MTc5MzE3Mzc3NSwibmJmIjoxNzkyNTY4OTc1fQ.6MB_MHgT5LgOJ2fi2hgKOJ76p_YZRv4pylc2uLSyeD8%26client_id%3D91e7ac83-e109-4a83-9a7e-a8f823635b8d%26locale%3Den-GB%26nonce%3D397fe821-0c8b-45d1-b85f-a26b38ffd2ab%26redirect_uri%3Dhttps%253A%252F%252Fshopify.com%252F72755839271%252Faccount%252Fcallback%26region_country%3DGB%26response_type%3Dcode%26scope%3Dopenid%2Bemail%2Bcustomer-account-api%253Afull%26state%3DhWNIDdqCHD4KGvCdLLqu19ft&region_country=GB",
    sidebarLinks: [
      { label: "Home", href: "/", sectionId: "hero" },
      { label: "The Vodka", href: "/#vodka", sectionId: "vodka" },
      { label: "Our Story", href: "/#story", sectionId: "story" },
      { label: "The World of TJ", href: "/#world", sectionId: "world" },
      { label: "Buy Now", href: "/products/tj-vodka", sectionId: "" },
      { label: "Contact", href: "/#contact", sectionId: "contact" },
    ],
    centerLinks: [
      { label: "Our Story", href: "/#story", sectionId: "story" },
      { label: "The Vodka", href: "/#vodka", sectionId: "vodka" },
      { label: "The World of TJ", href: "/#world", sectionId: "world" },
      { label: "Buy Now", href: "/products/tj-vodka", sectionId: "" },
    ],
    cta: {
      label: "Buy Now",
      href: "/products/tj-vodka",
    },
  },
  hero: {
    eyebrow: "ITALIAN GRAIN VODKA · 70CL",
    titleLeft: "TJ",
    titleRight: "VODKA",
    slogan: "Smoother than your average.",
    subtitle:
      "Distilled from a refined blend of grains and diluted with pure mountain water from the Appennino. Crisp, composed, and unmistakably smooth.",
    primaryCta: {
      label: "Discover the Vodka",
      href: "#vodka",
    },
    secondaryCta: {
      label: "Shop TJ Vodka",
      href: "/products/tj-vodka",
    },
  },
  productExplorer: {
    sectionNumber: "02",
    eyebrow: "ONE SIGNATURE BOTTLE",
    heading: "The Vodka",
    subheading: "Pure monochrome presence. Uncomplicated character.",
    tabs: [
      {
        id: "overview",
        label: "OVERVIEW",
        title: "Refined & Harmonious",
        body: "TJ Vodka is a premium vodka crafted with precision and care, resulting in a taste that is undeniably smooth and refined. Created as a clean, composed foundation for both classic serves and contemporary mixology.",
        note: "Approved introduction from existing TJ Vodka store listing and bottle label.",
      },
      {
        id: "origin",
        label: "ORIGIN",
        title: "Emilia Romagna & Appennino Water",
        body: "Emilia Romagna is famous for being 'The Food Valley'. This centuries-old devotion is infused in our vodka — distilled in Italy from a refined blend of grains, then filtered and diluted with pure mountain water from the Appennino. The result is smooth and harmonious.",
        note: "Verified from the official TJ Vodka bottle back label and indexed About page (confirm final launch wording with brand owner).",
      },
      {
        id: "serve",
        label: "SERVE",
        title: "Chilled Neat or Precision Cocktails",
        body: "Designed to elevate your mixology game as the foundation for crisp, balanced cocktails, or served well-chilled over large clear ice with a clean citrus twist.",
        note: "Approved serving direction based on existing TJ Vodka product copy. Specific measure recipes can be updated here upon brand sign-off.",
      },
    ],
    specifications: [
      {
        label: "VOLUME",
        value: "70cl",
        detail: "Verified listing & bottle label (70cl e)",
      },
      {
        label: "ABV",
        value: "37.5% vol.",
        detail: "Verified on bottle back label (confirm for launch)",
      },
      {
        label: "ORIGIN",
        value: "Italy",
        detail: "Distilled from grain · Appennino water",
      },
    ],
    cta: {
      label: "Shop TJ Vodka",
      href: "/products/tj-vodka",
    },
  },
  ourStory: {
    sectionNumber: "03",
    eyebrow: "OUR STORY",
    heading: "A distinct point of view.",
    paragraph:
      "Born from a dedication to clarity and craft, TJ Vodka brings together a refined blend of Italian grains and pure mountain water from the Appennino region. Stripped of excess and defined by its iconic monochrome label, it is a spirit built to stand apart — smoother than your average.",
    editorialDisclaimer:
      "Editorial photograph (Slot M03 / Image 6). Wording reflects the existing TJ Vodka About page and back label; reconfirm final story copy before launch.",
  },
  worldOfTj: {
    sectionNumber: "04",
    eyebrow: "THE SIGNATURE · THE PEOPLE · THE PLACES",
    heading: "The World of TJ",
    intro:
      "Bold product presence across late-night venues, contemporary culture, and monochrome campaign studies.",
    campaignTile: {
      slotId: "M05" as MediaSlotId,
      caption: "Campaign Study · Smoother than your average.",
    },
    gridTiles: [
      {
        slotId: "M08" as MediaSlotId,
        tag: "PEOPLE",
        title: "Signature Lounge",
        caption: "Main feature.",
      },
      {
        slotId: "M06" as MediaSlotId,
        tag: "ATMOSPHERE",
        title: "After Hours",
        caption: "Illuminated back-bar presence.",
      },
      {
        slotId: "M07" as MediaSlotId,
        tag: "CULTURE",
        title: "Form & Streetwear",
        caption: "Clean lines and contemporary editorial framing.",
      },
      {
        slotId: "M09" as MediaSlotId,
        tag: "VENUE",
        title: "On the Tier",
        caption: "Standing out on the back bar.",
      },
    ],
  },
  shopPage: {
    eyebrow: "SIGNATURE RELEASE · 70CL",
    title: "TJ Vodka",
    subtitle: "Smoother than your average.",
    description:
      "Indulge in the smooth and exquisite taste of TJ Vodka, the perfect ingredient for crafting delicious cocktails. Distilled in Italy from a refined blend of grains, filtered and diluted with pure mountain water from the Appennino.",
    shopifyStoreDomain: "https://tjvodka.co.uk",
    shopifyVariantId: 44534023651623,
    shopifyProductId: 8146885312807,
    specifications: [
      { label: "Volume", value: "70cl e" },
      { label: "ABV", value: "37.5% vol. (Bottle Label — Confirm Before Launch)" },
      { label: "Base", value: "Refined Blend of Grains & Appennino Mountain Water" },
      { label: "Origin", value: "Made in Italy" },
      { label: "Importer (UK)", value: "Kurvado Group Ltd., Leamington Spa, UK" },
    ],
    deliveryAndReturns: {
      deliveryTitle: "Delivery & Fulfilment",
      deliveryBody:
        "Orders are processed and fulfilled directly through the official TJ Vodka UK Shopify checkout. Shipping rates, age verification (18+ UK requirement), and delivery estimates are calculated live at checkout.",
      returnsTitle: "30-Day Returns Policy",
      returnsBody:
        "We operate a 30-day return policy — you have 30 days after receiving your item to request a return. To be eligible, the bottle must be unopened, unused, and in its original packaging with proof of purchase. Contact sales@tjvodka.co.uk to initiate a return.",
    },
  },
  footer: {
    brandLine: "Smoother than your average.",
    responsibleDrinking: "Please enjoy TJ Vodka responsibly. 18+ only in the United Kingdom.",
    policyLinks: [
      { label: "Refund Policy", href: "/policies/refund-policy" },
      { label: "Privacy Policy", href: "/policies/privacy-policy" },
      { label: "Terms of Service", href: "/policies/terms-of-service" },
      { label: "Contact", href: "/pages/contact" },
    ],
  },
};
