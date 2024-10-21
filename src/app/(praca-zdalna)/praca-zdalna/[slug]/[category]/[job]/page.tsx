import Link from "next/link";
import { polishToEnglish } from "../../../../../../../utils/polishToEnglish";
import jobs from "../../../../../../../public/14.09.2024.json";
import MainFooter from "@/components/MainFooter";
import Header from "@/components/Header";
import Image from "next/image";
import JobOfferList from "@/components/Postings/Postings";
import { getPageContent } from "@/lib/getPageContent";
import { JobPosting } from "@/types";
import { TfiFlagAlt } from "react-icons/tfi";

export async function generateStaticParams() {
  return jobs
    .flatMap((service: any) =>
      service.data.flatMap((subItem: any) => subItem.data)
    )
    .map((item: any) => ({ job: polishToEnglish(item.title) }));
}

export default async function Page({ params }: { params: any }) {
  const offers = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/offers/?tubylytylkofigi=${process.env.API_SECRET_KEY}&category=${params.job}`,
    {
      next: { revalidate: 60 },
    }
  ).then((res) => res.json());
  const content = await getPageContent(polishToEnglish(params.job));
  console.log(content);
  return (
    <div className="bg-white min-h-screen flex flex-col">
      {/* Header */}
      <Header jobsList={jobs} />
      {/* Breadcrumbs Section */}
      <div className="breadcrumbs px-6 sm:px-12 py-4 bg-gray-100 text-sm">
        <ul className="flex items-center flex-wrap space-x-2">
          <li>
            <Link href={`/praca-zdalna`} className="link text-primary">
              praca-zdalna
            </Link>
          </li>
          <li>
            <Link
              href={`/praca-zdalna/${params.slug}`}
              className="link text-primary"
            >
              {params.slug}
            </Link>
          </li>
          <li>
            <Link
              href={`/praca-zdalna/${params.slug}/${params.category}`}
              className="link text-primary"
            >
              {params.category}
            </Link>
          </li>
          <li>
            <Link
              href={`/praca-zdalna/${params.slug}/${params.category}/${params.job}`}
              className="link text-primary"
            >
              {params.job}
            </Link>
          </li>
        </ul>
      </div>
      {/* Job Title Section */}
      <div className="text-center px-6 sm:px-12 py-8">
        <h3
          style={{ lineHeight: 1.45 }}
          className="text-3xl font-bold text-black"
        >
          <span className="text-white bg-gradient-to-r from-primary to-cta px-2 py-0.5 rounded-md">
            {content?.title}
          </span>{" "}
          Praca zdalna
        </h3>
      </div>
      {/* Banner Section */}
      <div className="hidden lg:block bg-white px-6 sm:px-12 py-4">
        <Image
          width={1920}
          height={1080}
          src="/assets/banner-jobs.webp"
          alt="Praca Zdalna Banner"
          className="w-full rounded-lg shadow"
        />
      </div>
      <div className="lg:hidden bg-white px-4 container mx-auto">
        <Image
          width={1920}
          height={1080}
          src="/assets/banner-jobs-mobile.webp"
          alt="Praca Zdalna Banner"
          className="w-full rounded-lg shadow"
        />
      </div>
      <div className="content mx-auto px-4">
        <h2 className="text-black text-2xl lg:text-3xl font-coco font-bold my-6">
          Przeglądaj oferty pracy {content?.genitive}
        </h2>
        {offers?.length === 0 && (
          <div className="px-4">
            <div className="rounded-3xl p-3 bg-gradient-to-r from-primary/20 to-cta/20 container mx-auto my-12">
              <div className="bg-gradient-to-r from-primary to-cta rounded-full aspect-square mx-auto w-32 flex items-center justify-center">
                <TfiFlagAlt className="text-white text-4xl animate-bounce" />
              </div>

              <p className="font-light text-black text-base font-gotham mt-3 text-center max-w-xl mx-auto">
                Brak aktywnych ofert pracy zdalnej dla specjalistów w branży{" "}
                {content?.genitive}
              </p>
              <h3 className="flex flex-col text-white p-2 font-gotham font-light text-center mx-auto max-w-[332px] group">
                <Link
                  href="/register"
                  className="rounded-2xl bg-[#14a800] p-2 duration-100 group-hover:bg-opacity-80"
                >
                  Bądź szybszy/a i dodaj ogłoszenie
                </Link>
                <Link
                  href="/register"
                  className="rounded-b-2xl bg-[#14a800] w-max max-w-[100%] mx-auto p-2 px-4 duration-100 group-hover:bg-opacity-80"
                >
                  o pracę już dziś!
                </Link>
              </h3>
            </div>
          </div>
        )}
        {offers?.length > 0 && (
          <ul className="list-disc pl-6">
            {offers.map((offer: JobPosting, i: any) => (
              <li key={i} className="mb-2">
                <Link
                  href={`/search/${offer.title}-${offer.creationTime}`}
                  className="link text-primary hover:underline"
                >
                  {offer.title}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
      {/* <div className="bg-white px-6 sm:px-12 py-6 text-gray-800">
        <JobOfferList jobOffers={offers} />
      </div> */}
      <div className="mt-6"></div>
      <MainFooter jobsList={jobs} />
    </div>
  );
}

export async function generateMetadata({ params }: { params: any }) {
  const category = jobs
    .flatMap((service: any) =>
      service.data.flatMap((subItem: any) => ({ category: subItem.title }))
    )
    .find(
      (item: any) => polishToEnglish(item.category) === params.category
    ).category;
  const job = jobs
    .flatMap((service: any) =>
      service.data.flatMap((subItem: any) => subItem.data)
    )
    .map((item: any) => ({ title: item.title }))
    .find((item) => polishToEnglish(item.title) === params.job);
  const title = `Quixy Talent™ | Oferty pracy zdalnej - ${job?.title}`;
  const description = `Przeglądaj nasze oferty pracy zdalnej jako ${job?.title} w kategorii ${category}. Zrealizuj swój projekt z Quixy!`;

  return {
    title,
    description,
    openGraph: {
      type: "website",
      url: "https://quixy.pl",
      title,
      description,
      siteName: "Quixy",
      images: [
        {
          url: "/favicons/favicon-32x32.png",
          sizes: "32x32",
          type: "image/png",
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
    },
    twitter: {
      cardType: "summary_large_image",
      site: "@quixy",
      title,
      description,
      image: {
        url: "/favicons/android-chrome-512x512.png",
        alt: "Quixy Logo",
      },
    },
  };
}
