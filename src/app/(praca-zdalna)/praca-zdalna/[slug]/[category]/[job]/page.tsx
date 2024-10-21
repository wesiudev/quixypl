import Link from "next/link";
import { polishToEnglish } from "../../../../../../../utils/polishToEnglish";
import jobs from "../../../../../../../public/14.09.2024.json";
import MainFooter from "@/components/MainFooter";
import Header from "@/components/Header";
import Image from "next/image";
import JobOffers from "@/components/JobOffers";
import JobOfferList from "@/components/Postings/Postings";

export async function generateStaticParams() {
  return jobs
    .flatMap((service: any) =>
      service.data.flatMap((subItem: any) => subItem.data)
    )
    .map((item: any) => ({ job: polishToEnglish(item.title) }));
}

export default async function Page({ params }: { params: any }) {
  const job = jobs
    .flatMap((service: any) =>
      service.data.flatMap((subItem: any) => subItem.data)
    )
    .map((item: any) => ({ title: item.title }))
    .find((item) => polishToEnglish(item.title) === params.job);
  const offers = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/offers/`, {
    next: { revalidate: 15 },
  }).then((res) => res.json());
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
        <h3 className="text-3xl font-bold text-black">
          Praca zdalna <span className="text-primary">{job?.title}</span>
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
      <div className="lg:hidden bg-white px-6 sm:px-12 py-4">
        <Image
          width={1920}
          height={1080}
          src="/assets/banner-jobs-mobile.webp"
          alt="Praca Zdalna Banner"
          className="w-full rounded-lg shadow"
        />
      </div>

      {/* Job Opportunities Section */}
      <h2 className="bg-[#126b91] text-white rounded-md p-3 mt-6">
        Oferty pracy od firm
      </h2>
      <div className="bg-white px-6 sm:px-12 py-6 text-gray-800">
        <JobOfferList />
      </div>
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
