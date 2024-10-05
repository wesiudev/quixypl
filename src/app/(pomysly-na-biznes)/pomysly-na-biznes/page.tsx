import Header from "@/components/Header";
import jobs from "../../../../public/14.09.2024.json";
import MainFooter from "@/components/MainFooter";
import Hero from "@/components/Hero";
import Link from "next/link";
import HomePageGenerator from "@/components/HomePageGenerator";
import { sendGenerateIdeaRequest } from "../../../../utils/sendGenerateIdeaRequest";
import Register from "@/app/(register)/register/Register";
import Image from "next/image";
import { Metadata } from "next";
import IdeaList from "@/components/IdeaList";
import { getDocuments } from "@/firebase";
export default async function Page() {
  const ideas: any = await getDocuments("ideas");
  return (
    <div>
      <Header jobsList={jobs} />
      <div className="flex items-center justify-center h-max py-16 w-full relative overflow-hidden bg-zinc-800">
        <Hero />
        <div className="relative z-50 px-6 lg:px-0">
          <div
            className="p-4 lg:p-8 2xl:p-12 rounded-lg bg-white relative z-50 mt-12"
            style={{ boxShadow: "inset 0px 0px 5px black" }}
          >
            <Image
              src="/favicons/android-chrome-192x192.png"
              width={150}
              height={150}
              alt="Pomysły Na Biznes Logo Quixy.pl"
              className="w-16 h-auto absolute left-6 -top-6 bg-white p-1.5 rounded-full"
              style={{ boxShadow: "0px 0px 5px black" }}
            />
            <div className="flex items-center justify-between w-full">
              <h1 className="text-3xl lg:text-5xl font-gotham text-black ">
                Pomysły na biznes Quixy&trade;
              </h1>
              <Image
                src="/assets/lightbulbshadow.png"
                width={500}
                height={500}
                alt="Logo serwisu quixy.pl"
                className="relative lg:right-auto lg:top-auto w-[120px]"
              />
            </div>
            <p className="text-xl text-left text-black  mb-6 font-light font-gotham max-w-xl">
              Szukasz pomysłu na biznes? Nasze narzędzie do tworzenia
              biznesplanu połączy wizję projektu z jego wykonawcami dzięki Quixy
              Talent&trade;
            </p>
            <Link
              title="Sprawdź Nasz Nowy Generator Pomysłów Na Biznes"
              href="#generator"
              className="bg-orange-500 text-white p-1.5 px-2 rounded-lg font-gotham"
            >
              Wypróbuj za darmo
            </Link>
          </div>
        </div>
      </div>
      <div
        id="generator"
        className="py-12 2xl:py-24 container mx-auto px-6 lg:px-0 rounded-xl"
      >
        <HomePageGenerator sendGenerateIdeaRequest={sendGenerateIdeaRequest} />
      </div>
      <IdeaList ideas={ideas} />
      <Register />
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
  publisher: "wesiu.dev",
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
  title: "Najlepsze pomysły na biznes! Lista i Generator Pomysłów Quixy",
  description:
    "Na Quixy nie tylko znajdziesz eksperta, który zrealizuje twoją wizję biznesową, ale także skorzystasz z usług AI Quixy™.",
};
