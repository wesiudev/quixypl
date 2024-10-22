import Header from "@/components/Header";
import Hero from "@/components/Hero";
import { getProducts } from "@/firebase";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import jobs from "../../../public/14.09.2024.json";
import MainFooter from "@/components/MainFooter";
import { FaChevronRight } from "react-icons/fa";
import AboutQuixyTalent from "../(about)/AboutQuixyTalent";
export const revalidate = 30;
export default async function Page() {
  const posts = await getProducts();
  return (
    <>
      <Header jobsList={jobs} />
      <div className="py-48 bg-gradient-to-r from-zinc-800 via-gray-800 to-zinc-950 overflow-hidden">
        <div className="container p-6 lg:p-12 bg-white rounded-xl relative z-50 mx-auto mb-24">
          <div className="w-full relative mx-auto">
            <ul className="breadcrumbs font-gotham font-light flex items-center flex-wrap text-black">
              <li className="mr-2">
                <Link
                  href="/"
                  className="hover:underline text-sm md:text-base lg:text-lg xl:text-xl"
                >
                  strona główna
                </Link>
              </li>
              <li className="mx-2 text-sm md:text-base lg:text-lg xl:text-xl">
                <FaChevronRight className="text-primary" />
              </li>
              <li className="mr-2">
                <Link
                  href="/news"
                  className="hover:underline text-sm md:text-base lg:text-lg xl:text-xl"
                >
                  news
                </Link>
              </li>
            </ul>
          </div>
          <AboutQuixyTalent />

          <div className="min-h-[20vh]">
            <h1 className="text-black text-lg mb-6 font-coco">
              Quixy Czytaj - Znajdź pracę zdalną, biznes, AI
            </h1>
            {posts && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6 mb-6">
                {posts?.map((post: any, i: number) => (
                  <Link
                    href={`/news/${post.url}`}
                    key={i}
                    title={`Przejdź do artykułu ${post.title}`}
                    className="group relative aspect-square h-max flex flex-col hover:bg-[#74B901] hover:bg-opacity-30 hover:p-1 duration-300 ease-in-out"
                    style={{ boxShadow: "0px 0px 5px #000000" }}
                  >
                    <div className="w-full overflow-hidden flex items-start">
                      <Image
                        src={post.primaryImage}
                        width={512}
                        height={512}
                        alt={`Obrazek ${post.title}`}
                        className="absolute inset-0 object-cover w-full h-full "
                      />
                    </div>
                    <h2
                      style={{ boxShadow: "0px 0px 5px #000000" }}
                      className="group-hover:bg-gray-300 bg-gray-200 duration-300 absolute bottom-3 left-3 right-3 text-base lg:text-xl mt-3 text-black font-light text-left px-3 py-1"
                    >
                      {post.title}
                    </h2>
                  </Link>
                ))}
              </div>
            )}

            {!posts && (
              <div className="p-12 italic text-base text-black drop-shadow-lg shadow-black font-light mt-3">
                Brak postów
              </div>
            )}
          </div>
          <div>
            <Link href="/">
              <Image
                src="/assets/quixy-logo.png"
                width={420}
                height={420}
                alt=""
                className="w-[300px]"
              />
            </Link>
          </div>
        </div>{" "}
      </div>
      <MainFooter jobsList={jobs} />
    </>
  );
}
export const metadata: Metadata = {
  viewport: "width=device-width, initial-scale=1",
  themeColor: "#fff",
  publisher: "wesiudev.com",
  authors: [
    {
      name: "wesiudev",
      url: "https://wesiudev.com",
    },
    {
      name: "quixy",
      url: "https://quixy.pl",
    },
  ],

  manifest: "/manifest.json",
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
      url: "/favicons/favicon.ico",
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
  title: "Quixy | Czytaj - Znajdź pracę zdalną, biznes, AI",

  description:
    "Dołącz do platformy z pracą zdalną Quixy.pl znajdź pracę lub zlecenia, u nas pracodawcy poszukują ludzi do pracy zdalnej.",
  openGraph: {
    type: "website",
    url: "https://quixy.pl/news",
    title: "Quixy | Czytaj - Znajdź pracę zdalną, biznes, AI",
    description:
      "Dołącz do platformy z pracą zdalną Quixy.pl znajdź pracę lub zlecenia, u nas pracodawcy poszukują ludzi do pracy zdalnej.",
    siteName: "Quixy",
  },
};
