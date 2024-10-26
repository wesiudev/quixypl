import Header from "@/components/Header";
import jobs from "../../../../public/14.09.2024.json";
import MainFooter from "@/components/MainFooter";
import Link from "next/link";
import HomePageGenerator from "@/components/HomePageGenerator";
import { sendGenerateIdeaRequest } from "../../../../utils/sendGenerateIdeaRequest";
import Image from "next/image";
import { Metadata } from "next";
import IdeaList from "@/components/IdeaList";
import Toast from "@/components/Toast";
import Hero from "@/components/Hero";
export default async function Page() {
  const ideas = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/getIdeas?tubylytylkofigi=${process.env.API_SECRET_KEY}`,
    { next: { revalidate: 300 } }
  ).then((res) => res.json());

  return (
    <div>
      <Header jobsList={jobs} />
      <Toast />
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between h-max w-full relative overflow-hidden bg-gradient-to-r from-primary to-cta ">
        <Hero />
        <div className="w-full relative z-10 p-4 lg:p-8">
          <div className="p-4 lg:p-8 2xl:p-12  bg-white relative z-50">
            <h1 className="text-3xl lg:text-5xl font-gotham text-zinc-800">
              Twój generator pomysłów na biznes!
            </h1>
            <p className="mt-4 text-xl text-black mb-6 font-light font-gotham max-w-xl text-justify">
              Szukasz pomysłu na biznes? Nasze narzędzie do tworzenia
              biznesplanu połączy wizję projektu z jego wykonawcami dzięki Quixy
              Talent&trade;
            </p>
            <Link
              title="Sprawdź Nasz Nowy Generator Pomysłów Na Biznes"
              href="#generator"
              className="bg-gradient-to-r from-primary to-cta text-white py-2 px-3  font-gotham"
            >
              Wypróbuj za darmo
            </Link>
          </div>
        </div>
        <div className="z-10 w-full">
          <Image
            src="/assets/lightbulbshadow.png"
            width={500}
            height={500}
            alt="Top 32 Pomysłów na Biznes"
            className="w-[250px] h-auto mx-auto"
          />
        </div>
      </div>
      <div id="generator" className="my-12 container mx-auto ">
        <HomePageGenerator sendGenerateIdeaRequest={sendGenerateIdeaRequest} />
      </div>
      <div className="my-12 container mx-auto ">
        <IdeaList ideas={ideas} />
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
