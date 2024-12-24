import Header from "@/components/Header";
import Link from "next/link";
import MainFooter from "@/components/MainFooter";
import { FaStar } from "react-icons/fa6";
import { Metadata } from "next";
import Image from "next/image";
import Regions from "@/components/Regions";
import heroImg from "../../../public/assets/AI-Image.png";
import Market from "@/components/marketplace/Market";
import AboutQuixyTalent from "@/components/AboutQuixyTalent";
import FAQ from "@/components/Faq";
export const revalidate = 60;
export default async function Page() {
  const jobs = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/jobs?tubylytylkofigi=${process.env.API_SECRET_KEY}`,
    {
      next: { revalidate: 600 },
    }
  ).then((res) => res.json());
  const services = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/services?tubylytylkofigi=${process.env.API_SECRET_KEY}`,
    {
      next: { revalidate: 600 },
    }
  ).then((res) => res.json());
  return (
    <div className="min-h-screen w-full flex flex-col">
      {/* Header */}
      <Header jobsList={jobs} />
      <main className="">
        {/* Hero Section */}
        <div className="">
          <div className="mx-auto px-4 w-full max-w-[1366px] flex flex-col lg:items-center lg:grid lg:grid-cols-2 relative z-50 py-12">
            <div className="group relative flex flex-col">
              <h1
                style={{ lineHeight: 1.3 }}
                className="lg:max-w-lg font-extrabold text-3xl lg:text-5xl text-zinc-800"
              >
                Szukaj usług zdalnych lub dodaj nowe na rynek
              </h1>
              <p className="max-w-[100%] sm:max-w-sm lg:max-w-lg text-black mt-3">
                Marketplace Quixy to jedyne takie miejsce, w którym spotkasz
                profesjonalistów do współpracy zdalnej w Polsce.
              </p>
              <div className="flex items-center gap-2 sm:gap-3 lg:gap-4 w-full mt-2">
                <Link
                  href="/marketplace#search"
                  title="Rekrutuj do pracy zdalnej na panelu Quixy"
                  className="hover:bg-opacity-90 duration-100 text-black p-2 py-1.5"
                >
                  <h2 className="w-max mx-auto">Szukaj usług</h2>
                </Link>
                <Link
                  href="/register"
                  title="Szukaj pracy zdalnej na panelu Quixy"
                  className="rounded-md font-gotham bg-gradient-to-r from-ctaStart to-ctaEnd duration-100 text-white text-sm sm:text-base px-4 py-2 text-center hover:scale-105"
                >
                  <h2 className="w-max mx-auto">Dodaj usługi</h2>
                </Link>
              </div>
              <Regions />
            </div>
            <div className="flex flex-col items-center justify-center w-full h-full mx-auto mt-12 lg:mt-0 overflow-hidden relative rounded-lg">
              <Image
                src={heroImg}
                alt="Quixy Praca Zdalna"
                className="w-full h-full"
                blurDataURL="data:image/webp;base64,UklGRiIAAABXRUJQVlA4WAoAAAAQAAAfAADuwH/xAAfAQADAAQAAAAAAQAvAQADAAQAAAAAAQAvAQA"
                placeholder="blur"
                priority
              />
              <div className="px-4 py-2 absolute bottom-3 left-3 w-max max-w-full z-50 text-white bg-gradient-to-b from-primaryStart to-primaryEnd rounded-md">
                <h2 className="text-xl font-extrabold">
                  Promuj swoje usługi na rynku Quixy!
                </h2>
                <p className="font-coco text-sm">
                  Quixy to idealne rozwiązanie dla freelancerów i firm.
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* Services Section */}
        <div className="mx-auto px-4 w-full max-w-[1366px]" id="search">
          <Market leads={services} />
        </div>
      </main>
      <div className="py-12 bg-gradient-to-r from-primaryHoverStart to-primaryHoverEnd text-black">
        <div className="mx-auto px-4 w-full max-w-[1366px]">
          <h2 className="text-3xl font-extrabold text-white">
            Nasze kategorie pracy zdalnej
          </h2>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div
              className="bg-white p-6 relative z-50 rounded-md"
              style={{ boxShadow: "0px 0px 4px black" }}
            >
              <h3 className="font-extrabold text-xl text-black flex">
                <FaStar className="mr-2 text-accentEnd mt-1" />
                <Link
                  href="/praca-zdalna/rozwoj-oprogramowania"
                  className="flex flex-col"
                >
                  Rozwój Oprogramowania
                </Link>
              </h3>
              <p className="mt-2 text-black font-coco">
                W kategorii rozwoju oprogramowania znajdziesz najlepszych
                freelancerów od aplikacji mobilnych, stron internetowych czy
                gier.
              </p>
            </div>
            <div
              className="bg-white p-6 relative z-50 rounded-md"
              style={{ boxShadow: "0px 0px 4px black" }}
            >
              <h3 className="font-extrabold text-xl text-black flex">
                <FaStar className="mr-2 text-accentEnd mt-1" />
                <Link href="/praca-zdalna/e-commerce" className="flex flex-col">
                  E-Commerce{" "}
                </Link>
              </h3>
              <p className="mt-2 text-black font-coco">
                Freelancerzy oferujący pełne wsparcie w tworzeniu sklepów
                internetowych, rozwiązań Magento, Shopify i innych.
              </p>
            </div>
            <div
              className="bg-white p-6 relative z-50 rounded-md"
              style={{ boxShadow: "0px 0px 4px black" }}
            >
              <h3 className="font-extrabold text-xl text-black flex">
                <FaStar className="mr-2 text-accentEnd mt-1" />
                <Link href="/praca-zdalna/uslugi-it" className="flex flex-col">
                  Usługi IT{" "}
                </Link>
              </h3>
              <p className="mt-2 text-black font-coco">
                Skorzystaj z usług freelancerów i firm doradztwa IT, wsparcia
                technicznego oraz rozwiązań z zakresu bezpieczeństwa IT.
              </p>
            </div>
            <div
              className="bg-white p-6 relative z-50 rounded-md"
              style={{ boxShadow: "0px 0px 4px black" }}
            >
              <h3 className="font-extrabold text-xl text-black flex">
                <FaStar className="mr-2 text-accentEnd mt-1" />
                <Link href="/praca-zdalna/marketing" className="flex flex-col">
                  Marketing
                </Link>
              </h3>
              <p className="mt-2 text-black font-coco">
                Przeglądaj portfolia marketingowe naszych użytkowników od reklam
                w Google, Social Mediach i nie tylko.
              </p>
            </div>
            <div
              className="bg-white p-6 relative z-50 rounded-md"
              style={{ boxShadow: "0px 0px 4px black" }}
            >
              <h3 className="font-extrabold text-xl text-black flex">
                <FaStar className="mr-2 text-accentEnd mt-1" />
                <Link
                  href="/praca-zdalna/projektowanie"
                  className="flex flex-col"
                >
                  Projektowanie
                </Link>
              </h3>
              <p className="mt-2 text-black font-coco">
                Skorzystaj z usług freelancerów i firm doradztwa IT, wsparcia
                technicznego oraz rozwiązań z zakresu bezpieczeństwa IT.
              </p>
            </div>
            <div
              className="bg-white p-6 relative z-50 rounded-md"
              style={{ boxShadow: "0px 0px 4px black" }}
            >
              <h3 className="font-extrabold text-xl text-black flex">
                <FaStar className="mr-2 text-accentEnd mt-1" />
                <Link
                  href="/praca-zdalna/uslugi-biznesowe"
                  className="flex flex-col"
                >
                  Usługi biznesowe{" "}
                </Link>
              </h3>
              <p className="mt-2 text-black font-coco">
                Skorzystaj z usług doradztwa biznesowego takich jak wsparcie
                sprzedaży, ksiegowość zdalna, czy zasoby ludzkie.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="mx-auto px-4 w-full max-w-[1366px]">
        <AboutQuixyTalent />
        <div className="mt-6 mb-12">
          <FAQ faqItems={faqItems} />
        </div>
      </div>
      {/* Footer */}
      <MainFooter jobsList={jobs} />
    </div>
  );
}
const faqItems = [
  {
    question: "Jak działa rynek usług?",
    answer:
      "Nasza platforma prezentuje oferty usług wszystkich użytkowników, umożliwiając klientom łatwe dotarcie do profilu dostawcy, który świadczy interesującą ich usługę.",
  },
  {
    question: "Czy mogę ustawić różne ceny dla różnych usług?",
    answer:
      "Tak, możesz dostosować cenę oraz preferowany sposób płatności indywidualnie dla każdej dodawanej usługi.",
  },
  {
    question: "Jak klienci kontaktują się ze mną po znalezieniu mojej oferty?",
    answer:
      "Klienci mogą skorzystać z przycisku *Wyślij zapytanie* dostępnego na Twoim profilu.",
  },
  {
    question: "Czy istnieje opłata za korzystanie z platformy?",
    answer:
      "Dodanie usługi do naszej platformy wiąże się z jednorazową opłatą.",
  },
  {
    question: "Ile kosztuje 1 Quixie?",
    answer:
      "Aktualny cennik jest dostępny w panelu użytkownika po zalogowaniu się na platformę.",
  },
  {
    question: "Jakie rodzaje usług są najczęściej poszukiwane przez klientów?",
    answer:
      "Najczęściej wyszukiwane usługi to: tworzenie stron internetowych, aplikacje mobilne, marketing, projektowanie graficzne, księgowość oraz usługi biznesowe.",
  },
  {
    question: "Czy platforma oferuje wsparcie w promowaniu moich usług?",
    answer:
      "Tak, nasze podstrony oraz oferty dostępne na rynku są promowane m.in. za pośrednictwem Google.",
  },
  {
    question:
      "Jakie informacje powinienem umieścić w swoim profilu, aby przyciągnąć klientów?",
    answer:
      "Zadbaj o szczegółowy opis swoich usług, profesjonalne zdjęcia, referencje od klientów oraz jasne warunki współpracy.",
  },
  {
    question: "Czy platforma zapewnia ochronę płatności za świadczone usługi?",
    answer:
      "Płatności są ustalane bezpośrednio między klientami a dostawcami usług. Platforma nie pośredniczy w rozliczeniach.",
  },
];
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
  title: "Rynek Usług Zdalnych - Ogłoszenia dla firm i freelancerów",
  description:
    "Nasi eksperci czekają na Ciebie! Usługi IT, E-commerce, Marketing, Rozwój Oprogramowania, Web Development, SEO, Graphic Design...",
  openGraph: {
    type: "website",
    url: "https://quixy.pl/marketplace",
    title: "Rynek Aplikacji i Stron Internetowych - Kup lub Sprzedaj",
    description:
      "Nasi eksperci czekają na Ciebie! Usługi IT, E-commerce, Marketing, Rozwój Oprogramowania, Web Development, SEO, Graphic Design...",
    siteName: "quixy.pl",
  },
};
