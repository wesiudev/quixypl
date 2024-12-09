import Link from "next/link";
import jobs from "../../../../public/14.09.2024.json";
import { getDocuments } from "@/firebase";
import Header from "@/components/Header";
import MainFooter from "@/components/MainFooter";
import { polishToEnglish } from "../../../../utils/polishToEnglish";
import { JobPosting } from "@/types";
import Viewer from "@/components/AddJobOffer/Viewer";
import moment from "moment";
import ApplyBtn from "./ApplyBtn";
import { getPageContent } from "@/lib/getPageContent";
import JobOffers from "@/components/JobOffers";
export async function generateStaticParams() {
  const offers = await getDocuments("offers");
  return offers?.map((offer: any) => ({
    slug: `${polishToEnglish(offer.title)}-${offer.creationTime}`,
  }));
}
export const revalidate = 600;
export default async function Page(props: { params: Promise<any> }) {
  const params = await props.params;
  const offers: any = await getDocuments("offers");
  const offer: JobPosting = await offers?.find(
    (offer: any) =>
      `${polishToEnglish(offer.title)}-${offer.creationTime}` === params.slug
  );
  const similarOffers = offers.filter(
    (item: any) => polishToEnglish(item.job) === polishToEnglish(offer.job)
  );
  const content = await getPageContent(polishToEnglish(offer.job));
  return (
    <>
      <Header jobsList={jobs} />
      <div className="overflow-x-hidden">
        <div className="bg-gradient-to-r from-primary to-cta">
          <div className="font-extrabold text-white container mx-auto p-4 lg:p-12">
            <span className="text-base italic font-extralight text-white">
              Oferta Pracy
            </span>{" "}
            <br />
            <h1 className="text-3xl">{offer.title}</h1>
            <div className="gap-3 w-max max-w-full">
              <div className="mt-2 flex flex-col sm:flex-row gap-2">
                <div className="mt-3 px-3 py-2 bg-zinc-800 w-max max-w-full">
                  <p className="text-white flex flex-col">
                    <span className="text-sm font-bold text-indigo-400">
                      Typ wynagrodzenia:
                    </span>{" "}
                    <span className="font-light">{offer.salary}</span>
                  </p>
                </div>
                <div className="mt-3 px-3 py-2 bg-zinc-800 w-max max-w-full">
                  <p className="text-white flex flex-col">
                    <span className="text-sm font-bold text-indigo-400">
                      Wynagrodzenie:
                    </span>{" "}
                    <span className="font-light">{offer.salaryValue}</span>
                  </p>
                </div>
              </div>
              <div className="flex flex-col">
                <p className="mt-3">Ogłoszenie opublikowano:</p>
                <p className="font-coco font-light text-white text-base">
                  {moment(offer.creationTime).format("DD.MM.YYYY")}
                </p>
              </div>
              <ApplyBtn offer={offer} />
            </div>
          </div>
        </div>
        <div className="container mx-auto p-4 lg:p-12">
          <h2 className="text-3xl font-extrabold text-black">Treść oferty</h2>
          <div className="font-coco mt-6">
            <Viewer value={offer.description} />
          </div>
        </div>
      </div>
      <div className="bg-gradient-to-r from-primary to-cta">
        <div className="mx-auto container p-4 lg:p-12">
          <h2 className="font-extrabold text-white text-xl lg:text-2xl">
            Oferty pracy w{" "}
            <span className="">{content?.genitive?.toLowerCase()}</span>{" "}
          </h2>
          <p className="text-white mt-2">
            Szukasz pracy jako {content?.informal_title_singular.toLowerCase()}?
          </p>
          <JobOffers
            offers={similarOffers.filter((item: any) => item.id !== offer.id)}
            content={content}
          />
        </div>
      </div>
      <div className="p-4 lg:p-12 mx-auto container">
        <Link
          className="text-black font-extrabold"
          href={`/praca-zdalna/${polishToEnglish(offer.slug)}/${polishToEnglish(
            offer.category
          )}/${polishToEnglish(offer.job)}`}
        >
          {offer.job}
        </Link>
        <h2>Ogłoszenie o pracę {offer?.id}</h2>
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
