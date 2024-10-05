import Register from "./Register";
import type { Metadata } from "next";
export default function Page() {
  return <Register />;
}

export const metadata: Metadata = {
  viewport: "width=device-width, initial-scale=1",
  themeColor: "#ffffff",
  publisher: "wesiu.dev",
  manifest: "/manifest.json",
  keywords: [],
  verification: {
    google: "google85185d3abec28326.html",
  },
  icons: [
    {
      url: "/favicons/favicon-32x32.png",
      sizes: "32x32",
      type: "image/png",
    },
    {
      url: "/favicon.ico",
      sizes: "48x48",
      type: "image/x-icon",
    },
    {
      url: "/favicons/android-chrome-192x192.png",
      sizes: "192x192",
      type: "image/png",
    },
    {
      url: "/favicons/android-chrome-512x512.png",
      sizes: "512x512",
      type: "image/png",
    },
  ],
  title: "Najskuteczniejsza platforma z pracą zdalną w Polsce - Rejestracja",
  description:
    "Rejestracja w serwisie Quixy.pl - Zatrudnij ekspertów z branży IT, marketingu, designu i innych dziedzin. Znajdź specjalistów w Quixy Talent™ i rozwijaj swój biznes już dziś!",
  openGraph: {
    type: "website",
    url: "https://quixy.pl",
    title: "Najskuteczniejsza platforma z pracą zdalną w Polsce - Rejestracja",
    description:
      "Rejestracja w serwisie Quixy.pl - Zatrudnij ekspertów z branży IT, marketingu, designu i innych dziedzin. Znajdź specjalistów w Quixy Talent™ i rozwijaj swój biznes już dziś!",
    siteName: "Quixy",
  },
};
