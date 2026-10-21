import type { Metadata } from "next";
import { Archivo_Black } from "next/font/google";
import "./globals.css";

const archivoBlack = Archivo_Black({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: "TJ Vodka — Smoother Than Your Average",
  description:
    "TJ Vodka — Italian grain vodka distilled with precision and diluted with pure mountain water from the Appennino. 70cl signature bottle.",
  icons: {
    icon: "/brand/tj-logo-white.png",
  },
};

const cursorRefHydrationGuardScript = `
(function () {
  try {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    if (window.location.pathname === '/' && window.location.hash) {
      window.history.replaceState(null, '', '/');
    }
    window.scrollTo(0, 0);
    window.__HYDRATION_COMPLETE__ = false;
    window.__PENDING_CURSOR_REFS__ = [];
    var origSetAttribute = Element.prototype.setAttribute;
    Element.prototype.setAttribute = function (name, value) {
      if (name === 'data-cursor-ref' && !window.__HYDRATION_COMPLETE__) {
        window.__PENDING_CURSOR_REFS__.push([this, value]);
        return;
      }
      return origSetAttribute.call(this, name, value);
    };
    window.__FLUSH_CURSOR_REFS__ = function () {
      window.__HYDRATION_COMPLETE__ = true;
      var list = window.__PENDING_CURSOR_REFS__ || [];
      for (var i = 0; i < list.length; i++) {
        try {
          origSetAttribute.call(list[i][0], 'data-cursor-ref', list[i][1]);
        } catch (e) {}
      }
      window.__PENDING_CURSOR_REFS__ = [];
    };
    setTimeout(function () {
      if (!window.__HYDRATION_COMPLETE__ && window.__FLUSH_CURSOR_REFS__) {
        window.__FLUSH_CURSOR_REFS__();
      }
    }, 1500);
  } catch (e) {}
})();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={archivoBlack.variable}
    >
      <head>
        <link
          rel="preload"
          href="/fonts/Jost-medium.woff"
          as="font"
          type="font/woff"
          crossOrigin="anonymous"
        />
        <script
          dangerouslySetInnerHTML={{ __html: cursorRefHydrationGuardScript }}
        />
      </head>
      <body
        suppressHydrationWarning
        className="bg-[#080808] text-[#F5F5F5] font-sans antialiased selection:bg-[#BDBDBD] selection:text-[#080808]"
      >
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-[#F4F4F4] focus:text-[#151515] focus:px-4 focus:py-2 focus:text-xs focus:uppercase focus:tracking-[0.16em]"
        >
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}
