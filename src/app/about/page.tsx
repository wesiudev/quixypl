import {
  FaShieldAlt,
  FaLightbulb,
  FaCheckCircle,
  FaHeadset,
  FaStar,
} from "react-icons/fa";
import React from "react";
import Header from "@/components/Header";
import MainFooter from "@/components/MainFooter";
import jobs from "../../../public/14.09.2024.json";
import Link from "next/link";
import { Metadata } from "next";
import Image from "next/image";
import AboutQuixyTalent from "@/components/AboutQuixyTalent";
export default function Page() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header jobsList={jobs} />

      {/* Hero Section */}
      <div className="flex-grow">
        <div
          className="h-full w-full bg-gradient-to-r from-primary to-cta overflow-hidden text-white py-12 relative z-50 px-4 lg:px-12 text-center"
          style={{ textShadow: "2px 2px 2px black" }}
        >
          <h1 className="text-3xl font-extrabold text-white">QUIXY.PL</h1>
          <p className="text-xl mt-2 max-w-xl mx-auto">
            <Link href="/praca-zdalna" target="_blank">
              Quixy to platforma z pracą zdalną
            </Link>
            {", "}
            <Link href="/marketplace" target="_blank">
              rynkiem usług
            </Link>{" "}
            i nie tylko - na bieżąco rozwijamy nasz serwis i dbamy o
            doświadczenie użytkownika.
          </p>
          <button className="bg-white text-black font-bold relative z-50 py-1.5 px-3 mt-6 hover:bg-gray-200 transition">
            Dołącz teraz
          </button>
        </div>

        {/* Services Section */}
        <div className="py-12 px-4 lg:px-12 text-black">
          <h2 className="text-2xl font-extrabold">Jak możemy Ci pomóc?</h2>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div
              className="bg-gradient-to-r from-primary/20 to-cta/20 p-6 relative z-50 "
              style={{ boxShadow: "0px 0px 4px black" }}
            >
              <h3 className="text-xl text-black flex">
                <FaStar className="mr-2 text-cta mt-1" />
                <Link
                  href="/praca-zdalna/rozwoj-oprogramowania"
                  className="flex flex-col font-extrabold"
                >
                  Rozwój Oprogramowania
                  <span className="ml-1 text-sm font-light">Sprawdź</span>
                </Link>
              </h3>
              <p className="mt-2 text-black font-coco">
                Zatrudnij ekspertów od aplikacji mobilnych, marketingu, usług
                biznesowych, web developmentu, frameworków czy programistów
                nowych technologii w kategorii rozwoju oprogramowania.
              </p>
            </div>
            <div
              className="bg-gradient-to-r from-primary/20 to-cta/20 p-6 relative z-50 "
              style={{ boxShadow: "0px 0px 4px black" }}
            >
              <h3 className="text-xl text-black flex">
                <FaStar className="mr-2 text-cta mt-1" />
                <Link
                  href="/praca-zdalna/e-commerce"
                  className="flex flex-col font-extrabold"
                >
                  E-Commerce{" "}
                  <span className="ml-1 text-sm font-light">Sprawdź</span>
                </Link>
              </h3>
              <p className="mt-2 text-black font-coco">
                Freelancerzy oferujący pełne wsparcie w tworzeniu sklepów
                internetowych, rozwiązań Magento, Shopify i innych.
              </p>
            </div>
            <div
              className="bg-gradient-to-r from-primary/20 to-cta/20 p-6 relative z-50 "
              style={{ boxShadow: "0px 0px 4px black" }}
            >
              <h3 className="text-xl text-black flex">
                <FaStar className="mr-2 text-cta mt-1" />
                <Link
                  href="/praca-zdalna/uslugi-it"
                  className="flex flex-col font-extrabold"
                >
                  Usługi IT{" "}
                  <span className="ml-1 text-sm font-light">Sprawdź</span>
                </Link>
              </h3>
              <p className="mt-2 text-black font-coco">
                Skorzystaj z usług freelancerów i firm doradztwa IT, wsparcia
                technicznego oraz rozwiązań z zakresu bezpieczeństwa IT.
              </p>
            </div>
          </div>
        </div>
        <div className="py-2 bg-gradient-to-r from-primary to-cta w-full relative">
          <Link
            style={{ boxShadow: "0px 0px 4px #000" }}
            className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 bg-cta text-white font-bold z-50 py-3 px-8  hover:bg-white hover:text-cta transition"
            href="/praca-zdalna"
          >
            Zobacz więcej
          </Link>
        </div>

        {/* Features Section */}
        <div className="py-12 px-4 lg:px-12 relative overflow-hidden">
          <h2 className="text-2xl font-extrabold text-black">
            Dlaczego warto wybrać Quixy?
          </h2>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 text-center">
            <div
              className="p-6 bg-gradient-to-r from-primary/20 to-cta/20"
              style={{ boxShadow: "0px 0px 5px black" }}
            >
              <div className="bg-gradient-to-r from-primary to-cta rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <FaShieldAlt className="text-white text-3xl" />{" "}
                {/* Ikona bezpieczeństwa */}
              </div>
              <h3 className="text-xl font-bold text-black">Bezpieczeństwo</h3>
              <p className="mt-2 text-black font-coco">
                Nasze rozwiązania są w pełni bezpieczne i niezawodne.
              </p>
            </div>
            <div
              className="p-6 bg-gradient-to-r from-primary/20 to-cta/20"
              style={{ boxShadow: "0px 0px 5px black" }}
            >
              <div className="bg-gradient-to-r from-primary to-cta rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <FaCheckCircle className="text-white text-3xl" />{" "}
                {/* Ikona prostoty */}
              </div>
              <h3 className="text-xl font-bold text-black">Prostota</h3>
              <p className="mt-2 text-black font-coco">
                Narzędzie stworzone z myślą o Twoich potrzebach.
              </p>
            </div>

            <div
              className="p-6 bg-gradient-to-r from-primary/20 to-cta/20"
              style={{ boxShadow: "0px 0px 5px black" }}
            >
              <div className="bg-gradient-to-r from-primary to-cta rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <FaHeadset className="text-white text-3xl" />{" "}
                {/* Ikona wsparcia */}
              </div>
              <h3 className="text-xl font-bold text-black">Wsparcie 24/7</h3>
              <p className="mt-2 text-black font-coco">
                Jesteśmy dostępni, aby pomóc Ci o każdej porze dnia i nocy.
              </p>
            </div>
          </div>
        </div>
        <div className="relative overflow-hidden px-4 lg:px-12">
          <div className="absolute left-0 -top-36" id="ccrm" />
          <div className="flex w-full justify-between items-center">
            <h2 className="text-2xl font-extrabold text-black">
              Czym jest Quixy Talent&trade;
            </h2>
            <div className="h-full max-w-lg flex items-center justify-center">
              <Image
                src="/assets/quixy-logo.png"
                width={224}
                height={224}
                alt="Logo serwisu quixy.pl"
                className="w-1/2 h-auto"
              />
            </div>
          </div>
          <p className="mt-4 text-lg text-black font-light max-w-3xl">
            W Quixy Talent&trade; postawiliśmy na innowacyjne rozwiązanie CCRM
            (Client-to-Client Relationship Management), aby zmaksymalizować
            wartość płynącą z relacji pomiędzy naszymi klientami. Tradycyjne
            systemy CRM skupiają się wyłącznie na relacji firmy z klientami, ale
            nasza wizja jest szersza. Dzięki CCRM wspieramy współpracę i
            interakcje pomiędzy naszymi klientami, tworząc sieci wartościowych
            kontaktów i wzmacniając ich możliwości rozwoju.
          </p>

          <AboutQuixyTalent />
        </div>
        {/* Call-to-Action Section */}
        <div className="bg-gradient-to-r from-primary to-cta text-white pt-12 relative z-50 px-4 lg:px-12 mt-12">
          <h2 className="text-2xl font-extrabold">Wypróbuj Quixy za darmo!</h2>
          <p className="text-lg max-w-lg">
            Zarejestruj się już teraz i otrzymaj darmowe Quixies 💎 na start!
          </p>
          <div className="mt-3 bg-cta text-white w-max max-w-full">
            <Link
              href="/register"
              className="px-3 py-2 font-bold relative z-50 hover:bg-opacity-90"
            >
              Zarejestruj się
            </Link>
          </div>
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
  title: "Najskuteczniejszy, Polski Rynek Pracy Zdalnej - Kim Jesteśmy?",
  description:
    "Nasi eksperci czekają na Ciebie! Usługi IT, E-commerce, Marketing, Rozwój Oprogramowania, Web Development, SEO, Graphic Design...",
  openGraph: {
    type: "website",
    url: "https://quixy.pl/about",
    title: "Najskuteczniejszy, Polski Rynek Pracy Zdalnej - Kim Jesteśmy?",
    description:
      "Nasi eksperci czekają na Ciebie! Usługi IT, E-commerce, Marketing, Rozwój Oprogramowania, Web Development, SEO, Graphic Design...",
    siteName: "quixy.pl",
  },
};
