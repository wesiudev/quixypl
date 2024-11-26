import Image from "next/image";
import { FaImage } from "react-icons/fa";
import Link from "next/link";
import jobs from "../../../../public/14.09.2024.json";
import { getDocuments, getProductByUrl, getProducts } from "@/firebase";
import { renderMarkdown } from "@/lib/parseMarkdown";
import BlogPostList from "@/components/BlogPostList";
import Header from "@/components/Header";
import MainFooter from "@/components/MainFooter";
import Script from "next/script";
import { polishToEnglish } from "../../../../utils/polishToEnglish";
import { JobPosting } from "@/types";
import Viewer from "@/components/AddJobOffer/Viewer";
import moment from "moment";
import ApplyBtn from "./ApplyBtn";
export async function generateStaticParams() {
  const offers = await getDocuments("offers");
  return offers?.map((offer: any) => ({
    slug: `${polishToEnglish(offer.title)}-${offer.creationTime}`,
  }));
}
export const revalidate = 30;

export default async function Page(props: { params: Promise<any> }) {
  const params = await props.params;
  const offers: any = await getDocuments("offers");
  const offer: JobPosting = offers.find(
    (offer: any) =>
      `${polishToEnglish(offer.title)}-${offer.creationTime}` === params.slug
  );
  return (
    <>
      <Header jobsList={jobs} />
      <div className="overflow-x-hidden">
        <div className="bg-gradient-to-r from-primary to-cta">
          <h1 className="text-3xl font-extrabold text-white container mx-auto p-6 lg:p-12">
            <span className="text-base italic font-extralight text-white">
              Oferta Pracy
            </span>{" "}
            <br />
            {offer.title}
            <div className="grid sm:grid-cols-2 gap-3 w-max max-w-full">
              <div className="mt-3 px-3 pb-3 rounded-xl bg-zinc-800 w-max max-w-full">
                <p className="mb-2 font-medium text-gray-900 dark:text-gray-100">
                  <span className="text-sm font-bold text-indigo-600 dark:text-indigo-400">
                    Typ wynagrodzenia:
                  </span>{" "}
                  <br />
                  {offer.salary}
                </p>
              </div>
              <div className="mt-3 px-3 pb-3 rounded-xl bg-zinc-800 w-max max-w-full">
                <p className="font-medium text-gray-900 dark:text-gray-100">
                  <span className="text-sm font-bold text-indigo-600 dark:text-indigo-400">
                    Wynagrodzenie:
                  </span>{" "}
                  <br />
                  {offer.salaryValue}
                </p>
              </div>
              <p className="font-extrabold mt-3 text-xl">
                Ogłoszenie opublikowano:
              </p>
              <br />
              <p className="font-coco text-white text-base">
                {moment(offer.creationTime).format("DD.MM.YYYY")}
              </p>
              <br />
              <ApplyBtn offer={offer} />
            </div>
          </h1>
        </div>
        <div className="container mx-auto px-6 lg:px-12 mt-6">
          <h2 className="text-3xl font-extrabold text-black">Treść oferty</h2>
          <div className="font-coco mt-6">
            <Viewer value={offer.description} />
          </div>
        </div>
        {offer.requirements}
        <div className="px-6 lg:px-12 mx-auto container">
          <Link
            className="text-black font-extrabold"
            href={`/praca-zdalna/${polishToEnglish(
              offer.slug
            )}/${polishToEnglish(offer.category)}/${polishToEnglish(
              offer.job
            )}`}
          >
            {offer.job}
          </Link>

          <h2>Ogłoszenie o pracę {offer?.id}</h2>
        </div>
      </div>

      <div className="w-full container mx-auto p-6 lg:p-12">
        <Image
          src="/assets/quixy-logo.png"
          width={224}
          height={224}
          alt="logo Quixy strona bloga slug"
          className=""
        />
      </div>
      <MainFooter jobsList={jobs} />
    </>
  );
}
export async function generateMetadata(props: { params: Promise<any> }) {
  const params = await props.params;
  // Pobierz dane produktu
  const offers = await getDocuments("offers");
  const offer: any = offers.find(
    (offer: any) =>
      `${polishToEnglish(offer.title)}-${offer.creationTime}` === params.slug
  );

  return {
    title: `Praca Zdalna ${offer?.title} ${offer?.salary} ${offer.salaryValue}`,
    description:
      `Oferty pracy - Zobacz ${offer?.title} i inne. Szukaj zleceń zdalnych i wyświetlaj swoje usługi.` ||
      "",
    publisher: "wesiudev.com",
    url: `https://quixy.pl/job-offers/${polishToEnglish(offer?.title)}-${
      offer?.creationTime
    }`,
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
    icons: [
      { url: "/favicons/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicons/favicon.ico", sizes: "48x48", type: "image/x-icon" },
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
    openGraph: {
      type: "website",
      title: offer?.title,
      description:
        `Oferty pracy - Zobacz ${offer?.title} i inne. Szukaj zleceń zdalnych i wyświetlaj swoje usługi.` ||
        "",
      publisher: "wesiudev.com",
      url: `https://quixy.pl/job-offers/${polishToEnglish(offer?.title)}-${
        offer?.creationTime
      }`,
      siteName: "Quixy",
      images: [{ url: offer?.primaryImage, type: "image/png" }],
    },
    twitter: {
      cardType: "summary_large_image",
      site: "@Quixy",
      title: offer?.googleTitle,
      description: offer?.googleDescription,
      image: { url: offer?.primaryImage },
    },
    meta: [{ name: "theme-color", content: "#fff" }],
  };
}
