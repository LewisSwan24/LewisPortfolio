import type { Metadata } from "next";
import { Lexend, Shantell_Sans, ZCOOL_KuaiLe } from "next/font/google";
import { GeistMono } from "geist/font/mono";
import { getLocale } from "next-intl/server";
import "@/styles/globals.css";
import { siteConfig } from "@/lib/site";

// Lively Icons type: Lexend for everything a reader works through, Shantell
// Sans (Latin) and ZCOOL KuaiLe (Chinese) for the one big title of a page,
// Geist Mono for technical strings. Weights 400 and 600; 700 for titles.
const lexend = Lexend({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "600"],
  variable: "--font-sans",
  display: "swap",
});

const shantell = Shantell_Sans({
  subsets: ["latin"],
  weight: ["700"],
  variable: "--font-shantell",
  display: "swap",
});

// Chinese titles only. Its Han glyphs ship as unicode-range slices, so a page
// downloads only the slices its title touches; no preload.
const zcool = ZCOOL_KuaiLe({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-zcool",
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} | ${siteConfig.title}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.svg",
    apple: "/favicon.svg",
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getLocale();
  return (
    <html
      lang={locale}
      className={`${lexend.variable} ${shantell.variable} ${zcool.variable} ${GeistMono.variable}`}
      data-theme="light"
      suppressHydrationWarning
    >
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
