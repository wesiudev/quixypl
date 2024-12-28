import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import MainFooter from "@/components/MainFooter";
import AboutQuixyTalent from "@/components/AboutQuixyTalent";
import Market from "@/components/marketplace/Market";
export default async function Page() {
  const jobs = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/jobs?tubylytylkofigi=${process.env.API_SECRET_KEY}`
  ).then((res) => res.json());
  const services = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/services?tubylytylkofigi=${process.env.API_SECRET_KEY}`
  ).then((res) => res.json());
  const posts = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/posts?tubylytylkofigi=${process.env.API_SECRET_KEY}`
  ).then((res) => res.json());
  return (
    <>
      <div className="bg-white overflow-hidden">
        <div className="container p-6 lg:p-12 bg-white relative z-50 mx-auto">
          <div className=" text-black flex flex-col breadcrumbs">
            <ul className="flex items-center flex-wrap">
              <li className="">
                <Link href={`/`} title="praca zdalna">
                  hello!
                </Link>
              </li>
              <li className="">
                <Link href="/news" title="aktualności">
                  news
                </Link>
              </li>
            </ul>
          </div>

          <div className="min-h-[20vh]">
            <h1 className="mb-6 text-black">
              Aktualności - czytaj o pracy zdalnej, technologii, biznesie i
              nowościach w AI
            </h1>
            {posts && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6 mb-6">
                {posts?.map((post: any, i: number) => (
                  <Link
                    href={`/news/${post.url}`}
                    key={i}
                    title={`Artykuł ${post.title}`}
                    className="rounded-lg group relative aspect-square h-max flex flex-col border-2 border-gray-200 hover:border-ctaStart"
                  >
                    <div className="w-full overflow-hidden flex items-start">
                      <Image
                        src={post.primaryImage}
                        width={512}
                        height={512}
                        alt={`Obrazek ${post.title}`}
                        className="absolute inset-0 object-cover w-full h-full rounded-md"
                      />
                    </div>
                    <h2 className="rounded-md bg-gradient-to-b from-primaryStart to-primaryEnd duration-300 absolute bottom-3 left-3 right-3 text-sm mt-3 text-white font-extralight text-left px-3 py-1">
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
          <AboutQuixyTalent />
          <div className="mt-12"></div>
          <Market leads={services} />
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
