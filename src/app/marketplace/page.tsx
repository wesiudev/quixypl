import Header from "@/components/Header";
import Link from "next/link";
import jobs from "../../../public/14.09.2024.json";
import MainFooter from "@/components/MainFooter";
import Hero from "@/components/Hero";
import {
  FaFileSignature,
  FaImages,
  FaList,
  FaPlus,
  FaRobot,
  FaUsers,
} from "react-icons/fa";
import { FaFileArrowUp } from "react-icons/fa6";
import { Metadata } from "next";

export default function Page() {
  return (
    <div className="min-h-screen w-full flex flex-col font-coco">
      {/* Header */}
      <Header jobsList={jobs} />

      <main className="bg-gray-100 ">
        {/* Hero Section */}
        <section className="hero-section h-full w-full bg-black text-white py-20 px-10 relative overflow-hidden">
          <Hero />
          <h1 className="text-4xl font-bold text-center z-50 relative">
            Rynek gotowych aplikacji, stron internetowych i projektów.
          </h1>
          <p className="text-lg italic text-center mt-4 z-50 relative font-light">
            Tutaj będzie można wystawić swój projekt, do sprzedaży lub
            współpracy z ludźmi.
            <br />
            <span className="font-bold text-primary">Stay tuned</span> 😎
          </p>
        </section>
        <div className="flex flex-col items-center justify-center mx-auto">
          {/* Services Section */}
          <section className="services-section bg-gray-100 py-16 text-black flex justify-center items-center flex-col">
            <h2 className="mb-3 text-3xl font-bold text-center">
              Co możesz osiągnąć dzięki współpracy z Quixy Talent™?
            </h2>

            <p className="mb-3 font-light max-w-[40rem] text-center px-4">
              Quixy to zaawansowana platforma, stworzona z myślą o
              przedsiębiorcach i profesjonalistach, którzy pragną dynamicznie
              rozwijać swoje projekty i inwestycje...
            </p>
            <Link
              href="/register"
              className="text-white py-1.5 px-2 bg-[#126b91] my-6 rounded-md w-max mx-auto"
            >
              Rejestracja
            </Link>
            {/* Service Cards */}
            <div className="px-6 w-full grid gap-3 grid-cols-6">
              {secondMenuItems.map((item, i) => (
                <div
                  style={{ backgroundColor: item.color }}
                  key={i}
                  className="mx-auto my-12 w-12 h-4 rounded-3xl "
                ></div>
              ))}
            </div>
            <div className="w-full px-6 grid grid-cols-2 gap-3 md:grid-cols-3 h-max">
              {secondMenuItems.map((item, i) => (
                <article key={i} className="w-full">
                  {item && (
                    <Link
                      title={`Wypróbuj Quixy Talent™: ${item.urlLabel}`}
                      aria-label={`Link to ${item.urlLabel}`}
                      href={item.url}
                      className={`aspect-square rounded-lg group w-full h-max text-white font-bold text-sm sm:text-lg text-center relative overflow-hidden flex flex-col items-center justify-center`}
                      style={{
                        backgroundColor: item.color,
                        boxShadow: "0px 0px 3px rgb(0, 0, 0)",
                      }}
                    >
                      <div className="bg-black bg-opacity-50 duration-500 absolute top-0 left-0 w-full h-full z-[200]"></div>
                      <div className="absolute w-full h-full left-0 top-0 z-[50] opacity-100 hover:opacity-0 duration-300" />
                      <div className="mx-auto my-auto h-full w-full flex items-center justify-center relative z-[201]">
                        <div
                          className="group-hover:scale-90 duration-300 flex items-center justify-center w-[40%] p-[10%] rounded-full bg-opacity-50"
                          style={{
                            backgroundColor: item.color,
                            boxShadow: "0px 0px 5px black",
                          }}
                        >
                          <item.icon className="text-white drop-shadow-sm shadow-black w-full h-auto" />
                        </div>
                      </div>
                      <h4 className="bg-black bg-opacity-50 font-gotham text-white font-bold sticky bottom-0 left-0 w-full drop-shadow-xl shadow-black z-[202] text-xs sm:text-sm 2xl:text-base py-2">
                        {item.urlLabel}
                      </h4>
                    </Link>
                  )}
                </article>
              ))}
            </div>
          </section>
        </div>
        {/* Call to Action Section */}
        <section className="cta-section bg-orange-600 text-white py-16 px-10">
          <h2 className="text-3xl font-bold text-center">
            Chcesz kupić lub sprzedać projekt?
          </h2>
          <p className="text-center mt-4 text-lg">
            Dołącz do naszego marketplace już dziś i wystaw swój projekt, aby
            przyciągnąć inwestorów lub potencjalnych partnerów!
          </p>
          <div className="flex justify-center mt-8">
            <Link
              href="/contact"
              className="bg-white text-orange-600 py-3 px-8 rounded hover:bg-gray-200 transition"
              aria-label="Kontaktuj się z nami"
            >
              Kontaktuj się z nami
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <MainFooter jobsList={jobs} />
    </div>
  );
}

const secondMenuItems = [
  {
    urlLabel: "Wygeneruj pomysł",
    url: "/register",
    color: "#A6BFFD",
    icon: FaRobot,
  },
  {
    urlLabel: "Wygeneruj obraz",
    url: "/register",
    color: "#F97316",
    icon: FaImages,
  },
  {
    urlLabel: "Szukaj pracy",
    url: "/register",
    color: "#74B901",
    icon: FaUsers,
  },
  {
    urlLabel: "Przeglądaj zlecenia",
    url: "/register",
    color: "#F59BBB",
    icon: FaList,
  },
  {
    urlLabel: "Kup projekt",
    url: "/marketplace",
    color: "green",
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
