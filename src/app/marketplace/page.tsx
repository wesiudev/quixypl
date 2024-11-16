import Header from "@/components/Header";
import Link from "next/link";
import jobs from "../../../public/14.09.2024.json";
import MainFooter from "@/components/MainFooter";
import { FaFileSignature, FaImages, FaUsers } from "react-icons/fa";
import {
  FaChevronRight,
  FaDiamondTurnRight,
  FaFileArrowUp,
} from "react-icons/fa6";
import { Metadata } from "next";
import { IoSparkles } from "react-icons/io5";
import Image from "next/image";
import Regions from "@/components/Regions";
import heroImg from "../../../public/assets/AI-Image.png";
import { getDocuments } from "@/firebase";
import Market from "../marketplace2/Market";
export const revalidate = 60;
export default async function Page() {
  const leads: any = await getDocuments("services");

  return (
    <div className="min-h-screen w-full flex flex-col font-coco">
      {/* Header */}
      <Header jobsList={jobs} />

      <main className="bg-gray-100 ">
        {/* Hero Section */}
        <div className="">
          <div className="mx-auto px-4 w-full max-w-[1366px] flex flex-col lg:items-center lg:grid lg:grid-cols-2 relative z-50 py-12">
            <div className="group relative flex flex-col">
              <h1 className="lg:max-w-lg font-extrabold text-3xl lg:text-5xl text-zinc-800">
                Szukaj usług zdalnych lub utwórz portfolio
              </h1>
              <p className="max-w-[100%] sm:max-w-sm lg:max-w-lg text-black mt-3">
                Pierwsza platforma napędzana technologią{" "}
                <Link href="/about#ccrm" className="italic">
                  CCRM
                </Link>
                , która łączy freelancerów z klientami!
              </p>
              <div className="flex items-center gap-2 sm:gap-3 lg:gap-4 w-full mt-2">
                <Link
                  href="/marketplace#search"
                  title="Rekrutuj do pracy zdalnej na panelu Quixy"
                  className="hover:bg-opacity-90 duration-100 text-gray-700 p-2 py-1.5"
                >
                  <h2 className="w-max mx-auto">Szukaj usług</h2>
                </Link>
                <Link
                  href="/register"
                  title="Szukaj pracy zdalnej na panelu Quixy"
                  className="font-gotham font-light bg-cta hover:bg-opacity-90 duration-100 text-white text-sm sm:text-base p-2 py-1.5 text-center"
                >
                  <h2 className="w-max mx-auto">Dodaj usługi</h2>
                </Link>
              </div>
              <Regions />
            </div>
            <div className="flex flex-col items-center justify-center w-full h-full mx-auto mt-12 lg:mt-0 overflow-hidden relative">
              <div className="absolute left-3 top-3 flex items-center z-50">
                <Link href="/register">
                  <h2 className="font-extrabold text-white bg-gradient-to-r from-primary to-cta p-2 flex items-center">
                    Wygeneruj obraz za darmo!
                    <FaChevronRight className="text-lg ml-2" />
                  </h2>
                </Link>
              </div>
              <Image
                src={heroImg}
                alt="Quixy Praca Zdalna"
                className="w-full h-full"
                blurDataURL="data:image/webp;base64,UklGRiIAAABXRUJQVlA4WAoAAAAQAAAfAADuwH/xAAfAQADAAQAAAAAAQAvAQADAAQAAAAAAQAvAQA"
                placeholder="blur"
              />
              <Link
                href="/register"
                className="pb-2 px-2 py-1.5 absolute bottom-3 left-3 w-[90%] container z-50 text-white bg-gradient-to-r from-primary to-cta"
              >
                <h2 className="text-xl font-extrabold">
                  Promuj swoje usługi z Quixy!
                </h2>
                <p className="font-coco text-sm">
                  Quixy.pl to rozwiązanie zarówno dla freelancerów jak i dla
                  firm. Pokaż swoje usługi nowym klientom!
                </p>
              </Link>
            </div>
          </div>
        </div>
        {/* Services Section */}
        <div className="container px-6 lg:px-12 mx-auto rounded-xl" id="search">
          <Market leads={leads} />
        </div>
        <div className="flex flex-col items-center justify-center mx-auto">
          <section className="services-section bg-gray-100 py-16 text-black flex justify-center items-center flex-col">
            {/* Service Cards */}
            <div className="px-6 w-full grid gap-3 grid-cols-6">
              {secondMenuItems.map((item, i) => (
                <div
                  style={{ backgroundColor: item.color }}
                  key={i}
                  className="mx-auto mt-12 w-8 h-2"
                ></div>
              ))}
            </div>
          </section>
        </div>
      </main>
      <div className="grid grid-cols-2 lg:grid-cols-3 2xl:grid-cols-6 gap-3 h-max w-full p-6 lg:p-12">
        {secondMenuItems.map((item: any, i: number) => (
          <article key={i} className="w-full">
            {item && (
              <Link
                title={`Wypróbuj Quixy Talent™: ${item.urlLabel}`}
                aria-label={`Link to ${item.urlLabel}`}
                href={item.url}
                className={`bg-gradient-to-r from-primary to-cta aspect-square group w-full h-max text-white font-bold text-sm sm:text-lg text-center relative overflow-hidden flex flex-col items-center justify-center`}
                style={{
                  boxShadow: "0px 0px 3px rgb(0, 0, 0)",
                }}
              >
                <div className="absolute w-full h-full left-0 top-0 z-[50] opacity-100 hover:opacity-0 duration-300" />
                <div className="mx-auto my-auto h-full w-full flex items-center justify-center relative z-[201]">
                  <div
                    className="group-hover:scale-90 bg-white duration-300 flex items-center justify-center w-[40%] p-[10%] rounded-full"
                    style={{
                      boxShadow: "0px 0px 5px black",
                    }}
                  >
                    <item.icon className="text-black drop-shadow-sm shadow-black w-full h-auto" />
                  </div>
                </div>
                <h4
                  style={{ textShadow: "0px 4px 6px rgb(0, 0, 0)" }}
                  className="text-center absolute bg-opacity-50 font-gotham text-white font-bold bottom-[10%] left-1/2 -translate-x-1/2 h-max w-full drop-shadow-xl shadow-black z-[202] py-2 text-lg sm:text-xl"
                >
                  {item.urlLabel}
                </h4>
              </Link>
            )}
          </article>
        ))}
      </div>

      {/* Footer */}
      <MainFooter jobsList={jobs} />
    </div>
  );
}

const secondMenuItems = [
  {
    urlLabel: "Pomysły na biznes",
    url: "/business-ideas",
    color: "#A6BFFD",
    icon: IoSparkles,
  },
  {
    urlLabel: "Generator obrazów",
    url: "/register",
    color: "#F97316",
    icon: FaImages,
  },
  {
    urlLabel: "Pracuj zdalnie",
    url: "/praca-zdalna",
    color: "#74B901",
    icon: FaUsers,
  },
  {
    urlLabel: "Reklamuj się",
    url: "/register",
    color: "#F59BBB",
    icon: FaDiamondTurnRight,
  },
  {
    urlLabel: "Kup projekt",
    url: "/marketplace",
    color: "#468CA9",
    icon: FaFileSignature,
  },
  {
    urlLabel: "Sprzedaj projekt",
    url: "/marketplace",
    color: "red",
    icon: FaFileArrowUp,
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
  title: "Rynek Aplikacji i Stron Internetowych - Kup lub Sprzedaj",
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
