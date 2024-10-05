import {
  FaShieldAlt,
  FaLightbulb,
  FaCheckCircle,
  FaHeadset,
} from "react-icons/fa";
import React from "react";
import Header from "@/components/Header";
import MainFooter from "@/components/MainFooter";
import jobs from "../../../../public/14.09.2024.json";
import Hero from "@/components/Hero";
import Link from "next/link";
import { Metadata } from "next";
export default function Page() {
  return (
    <div className="min-h-screen flex flex-col font-gotham">
      <Header jobsList={jobs} />

      {/* Hero Section */}
      <div className="flex-grow">
        <div
          className="h-full w-full bg-zinc-800 overflow-hidden text-white py-12 relative z-50 px-10 text-center"
          style={{ textShadow: "2px 2px 2px black" }}
        >
          <Hero />
          <h1 className="text-5xl font-bold text-orange-500">
            Czym jest Quixy.pl?
          </h1>
          <p className="text-xl italic mt-4 max-w-xl mx-auto">
            Quixy to platforma z pracą zdalną i nie tylko - na bieżąco rozwijamy
            nasz serwis i dbamy o doświadczenie użytkownika.
          </p>
          <button className="bg-white text-orange-500 font-bold relative z-50 py-3 px-8 rounded mt-6 hover:bg-gray-100 transition">
            Dołącz teraz
          </button>
        </div>

        {/* Services Section */}
        <div className="bg-gray-200 py-16 px-10 text-black">
          <h2 className="text-3xl text-center">Jak możemy Ci pomóc?</h2>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div
              className="bg-white p-6 relative z-50 rounded-xl"
              style={{ boxShadow: "0px 0px 4px black" }}
            >
              <h3 className="text-xl font-semibold text-orange-500">
                <Link href="/praca-zdalna/rozwoj-oprogramowania">
                  Rozwój Oprogramowania
                </Link>
              </h3>
              <p className="mt-2 text-zinc-800 font-coco">
                Zatrudnij ekspertów od aplikacji mobilnych, web developmentu,
                frameworków i nowych technologii.
              </p>
            </div>
            <div
              className="bg-white p-6 relative z-50 rounded-xl"
              style={{ boxShadow: "0px 0px 4px black" }}
            >
              <h3 className="text-xl font-semibold text-orange-500">
                <Link href="/praca-zdalna/e-commerce">E-Commerce</Link>
              </h3>
              <p className="mt-2 text-zinc-800 font-coco">
                Oferujemy pełne wsparcie w tworzeniu sklepów internetowych,
                rozwiązań Magento, Shopify i innych.
              </p>
            </div>
            <div
              className="bg-white p-6 relative z-50 rounded-xl"
              style={{ boxShadow: "0px 0px 4px black" }}
            >
              <h3 className="text-xl font-semibold text-orange-500">
                <Link href="/praca-zdalna/uslugi-it">Usługi IT</Link>
              </h3>
              <p className="mt-2 text-zinc-800 font-coco">
                Skorzystaj z doradztwa IT, wsparcia technicznego oraz rozwiązań
                z zakresu bezpieczeństwa IT.
              </p>
            </div>
          </div>
        </div>
        <div className="py-2 bg-orange-300 w-full relative">
          <Link
            style={{ boxShadow: "0px 0px 4px #000" }}
            className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 bg-orange-500 text-white font-bold z-50 py-3 px-8 rounded-lg hover:bg-gray-100 "
            href="/praca-zdalna"
          >
            Zobacz więcej
          </Link>
        </div>

        {/* Features Section */}
        <div className="bg-gray-200 py-16 px-10 relative overflow-hidden">
          <h2 className="text-3xl font-bold text-center text-black">
            Dlaczego warto wybrać Quixy?
          </h2>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 text-center">
            <div
              className="p-6 bg-white rounded-xl"
              style={{ boxShadow: "0px 0px 5px black" }}
            >
              <div className="bg-orange-500 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <FaShieldAlt className="text-white text-3xl" />{" "}
                {/* Ikona bezpieczeństwa */}
              </div>
              <h3 className="text-xl font-bold text-black">Bezpieczeństwo</h3>
              <p className="mt-2 text-zinc-800 font-coco">
                Nasze rozwiązania są w pełni bezpieczne i niezawodne.
              </p>
            </div>

            <div
              className="p-6 bg-white rounded-xl"
              style={{ boxShadow: "0px 0px 5px black" }}
            >
              <div className="bg-orange-500 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <FaLightbulb className="text-white text-3xl" />{" "}
                {/* Ikona kreatywności */}
              </div>
              <h3 className="text-xl font-bold text-black">Kreatywność</h3>
              <p className="mt-2 text-zinc-800 font-coco">
                Twórz nowe pomysły na biznes za pomocą naszego generatora.
              </p>
            </div>

            <div
              className="p-6 bg-white rounded-xl"
              style={{ boxShadow: "0px 0px 5px black" }}
            >
              <div className="bg-orange-500 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <FaCheckCircle className="text-white text-3xl" />{" "}
                {/* Ikona prostoty */}
              </div>
              <h3 className="text-xl font-bold text-black">Prostota</h3>
              <p className="mt-2 text-zinc-800 font-coco">
                Narzędzie stworzone z myślą o Twoich potrzebach.
              </p>
            </div>

            <div
              className="p-6 bg-white rounded-xl"
              style={{ boxShadow: "0px 0px 5px black" }}
            >
              <div className="bg-orange-500 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <FaHeadset className="text-white text-3xl" />{" "}
                {/* Ikona wsparcia */}
              </div>
              <h3 className="text-xl font-bold text-black">Wsparcie 24/7</h3>
              <p className="mt-2 text-zinc-800 font-coco">
                Jesteśmy dostępni, aby pomóc Ci o każdej porze dnia i nocy.
              </p>
            </div>
          </div>
        </div>

        {/* Call-to-Action Section */}
        <div className="bg-orange-500 text-white py-16 relative z-50 px-10 text-center">
          <h2 className="text-3xl font-bold">
            Wypróbuj Quixy Talent™ za darmo!
          </h2>
          <p className="text-lg mt-4">
            Zarejestruj się już teraz i zyskaj darmowe Quixies 💎 na start!
          </p>
          <button className="bg-white text-orange-500 font-bold relative z-50 py-1.5 px-2 rounded mt-6 hover:bg-gray-200 transition">
            Rejestracja
          </button>
        </div>
      </div>

      <MainFooter jobsList={jobs} />
    </div>
  );
}
export const metadata: Metadata = {
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
  publisher: "wesiudev",
  manifest: "/manifest.json",
  authors: [
    {
      name: "wesiudev",
      url: "https://wesiudev.com",
    },
  ],

  verification: {
    google: "google85185d3abec28326.html",
  },
  title: "Największy Polski Rynek Pracy Zdalnej - Kim Jesteśmy?",
  description:
    "Nasi eksperci czekają na Ciebie! Usługi IT, E-commerce, Marketing, Rozwój Oprogramowania, Web Development, SEO, Graphic Design...",
  openGraph: {
    type: "website",
    url: "https://quixy.pl/about",
    title: "Największy Polski Rynek Pracy Zdalnej - Kim Jesteśmy?",
    description:
      "Nasi eksperci czekają na Ciebie! Usługi IT, E-commerce, Marketing, Rozwój Oprogramowania, Web Development, SEO, Graphic Design...",
    siteName: "quixy.pl",
  },
};
