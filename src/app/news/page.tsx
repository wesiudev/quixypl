import { Metadata } from "next";
import Link from "next/link";
import AboutQuixyTalent from "@/components/AboutQuixyTalent";
const Market = dynamic(() => import("@/components/marketplace/Market"));
import dynamic from "next/dynamic";
import { getServices } from "@/lib/getServices";
import { getPosts } from "@/lib/getPosts";
const BlogPostList = dynamic(() => import("@/components/BlogPostList"));

export default async function Page() {
  const services = await getServices();
  const posts = await getPosts();
  return (
    <>
      <div className="bg-white overflow-hidden">
        <div className="container p-6 lg:p-12 bg-white relative z-50 mx-auto">
          <div className=" text-black flex flex-col breadcrumbs">
            <ul className="flex items-center flex-wrap">
              <li className="!text-black">
                <Link href={`/`} title="praca zdalna">
                  hello!
                </Link>
              </li>
              <li className="!text-black">
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
            <BlogPostList posts={posts} />
          </div>
          <AboutQuixyTalent />
          <div className="mt-12"></div>
          <Market services={services} />
        </div>{" "}
      </div>
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
