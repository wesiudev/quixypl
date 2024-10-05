import Link from "next/link";
import { polishToEnglish } from "../../../../../../../utils/polishToEnglish";
import jobs from "../../../../../../../public/14.09.2024.json";
import MainFooter from "@/components/MainFooter";
import Header from "@/components/Header";
import Image from "next/image";

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

  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <Header jobsList={jobs} />

      {/* Breadcrumbs with Icons */}
      <div className="px-6 sm:px-12 breadcrumbs text-sm bg-white !text-black ">
        <ul className="flex items-center flex-wrap">
          <li className="mr-2">
            <Link href={`/praca-zdalna`} title="praca zdalna">
              praca-zdalna
            </Link>
          </li>
          <li className="mr-2">
            <Link href={`/praca-zdalna/${params.slug}`} title={params.slug}>
              {params.slug}
            </Link>
          </li>
          <li className="mr-2">
            <Link
              href={`/praca-zdalna/${params.slug}/${params.category}`}
              title={params.slug}
            >
              {params.category}
            </Link>
          </li>
          <li className="mr-2">
            <Link
              href={`/praca-zdalna/${params.slug}/${params.category}/${params.job}`}
              title={params.slug}
            >
              {params.job}
            </Link>
          </li>
        </ul>
      </div>

      {/* Description Section with Banner */}
      <div className="">
        <h3 className="text-2xl font-bold text-black  text-center">
          Praca zdalna <b className="text-orange-500">{job?.title}</b>
        </h3>
      </div>
      <div className="lg:block hidden bg-white px-6 sm:px-12 text-black ">
        <Image
          width={1920}
          height={1080}
          src="/assets/banner-jobs.png"
          alt="Praca Zdalna Banner"
          className="w-full rounded-lg shadow"
        />
        <h3 className="text-2xl font-bold">
          <b className="text-orange-500">Oferty Pracy</b> {job?.title}
        </h3>
      </div>
      <div className="lg:hidden bg-white px-6 sm:px-12 text-gray-800">
        <Image
          width={1920}
          height={1080}
          src="/assets/banner-jobs-mobile.png"
          alt="Praca Zdalna Banner"
          className="w-full rounded-lg shadow"
        />
      </div>

      {/* Job Opportunities Section with Images */}
      <div className="bg-white px-6 sm:px-12 text-gray-800">
        <h2 className="bg-orange-500 text-white rounded-md p-3">
          Oferty Pracy - Quixy Talent&trade;
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.slice(0, 3).map((job, index) => (
            <div
              key={index}
              className="p-4 border-2 border-gray-200 rounded-lg shadow-md bg-gray-100 hover:shadow-lg transition"
            >
              <h3 className="text-xl font-semibold text-cyan-500">
                {job.title}
              </h3>

              <Link
                href={`/praca-zdalna/${polishToEnglish(job.title)}`}
                className="mt-4 inline-block text-orange-500 font-semibold underline"
              >
                Zobacz więcej
              </Link>
            </div>
          ))}
        </div>

        <div className="text-left">
          <h2 className="bg-orange-500 text-white rounded-md p-3">
            Oferty pracy od firm
          </h2>
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="flex flex-col space-y-3 bg-orange-500 py-12 text-white text-center">
        <h2 className="text-3xl font-bold mb-4">Gotowy, aby rozpocząć?</h2>
        <Link
          href="/register"
          className="w-max mx-auto mt-4 bg-white text-orange-500 py-3 px-8 rounded font-semibold hover:bg-gray-100 transition"
        >
          Wypróbuj Quixy Talent&trade; za darmo!
        </Link>
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
