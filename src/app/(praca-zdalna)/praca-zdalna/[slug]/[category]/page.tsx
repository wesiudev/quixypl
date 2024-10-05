/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { polishToEnglish } from "../../../../../../utils/polishToEnglish";
import jobs from "../../../../../../public/14.09.2024.json";
import MainFooter from "@/components/MainFooter";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import { FaBriefcase } from "react-icons/fa";

// Generowanie parametrów statycznych
export async function generateStaticParams() {
  return jobs.flatMap((service: any) =>
    service.data.flatMap((subItem: any) => ({ category: subItem.title }))
  );
}

export default async function Page({ params }: { params: any }) {
  // Znalezienie odpowiednich danych
  const cat: any = jobs.find(
    (page: any) => polishToEnglish(page.title) === params.slug
  );
  const slug = cat?.data.find(
    (item: any) => polishToEnglish(item.title) === params.category
  );

  return (
    <div className="bg-gradient-to-b !font-gotham relative bg-zinc-800">
      <Header jobsList={jobs} />

      {/* Hero Section */}
      <div className="relative text-center text-white py-16 overflow-hidden">
        <Hero />
        <div className="p-3 sm:p-6 lg:p-12 !py-0 relative z-50">
          <h1 className="text-2xl sm:text-3xl lg:text-5xl font-bold mb-4 text-white">
            Praca zdalna <b className="text-orange-500">{slug?.title}</b>
          </h1>
        </div>
        <div className=" breadcrumbs text-sm bg-transparent mx-auto flex items-center justify-center relative z-50">
          <ul className="flex-wrap flex items-center justify-center px-3 font-light">
            <li>
              <Link title="praca zdalna" href={`/praca-zdalna`}>
                praca-zdalna
              </Link>
            </li>
            <li>
              <Link title={params.slug} href={`/praca-zdalna/${params.slug}`}>
                {params.slug}
              </Link>
            </li>
            <li>
              <Link
                title={params.category}
                href={`/praca-zdalna/${params.slug}/${params.category}`}
              >
                {params.category}
              </Link>
            </li>
          </ul>
        </div>
        <p className="max-w-2xl mx-auto text-lg text-white px-3 mt-3">
          Zatrudnij <b className="text-orange-500">najlepszych specjalistów</b>{" "}
          na rynku. Zrealizuj swój projekt z ich wsparciem! Odkryj naszą
          platformę pracy zdalnej.
        </p>
      </div>

      {/* Subcategories Section */}
      {slug?.data?.length > 0 && (
        <div className="!pt-0 p-12">
          <h1
            style={{ boxShadow: "inset 0 0 7px rgb(0, 0, 0)" }}
            className="text-black  bg-white p-3 rounded-t-xl text-lg lg:text-2xl"
          >
            {slug.title}
            <b className="text-orange-500"> oferty pracy zdalnej</b>
          </h1>
          <div
            style={{ boxShadow: "inset 0 0 7px rgb(0, 0, 0)" }}
            className="bg-white shadow-lg p-8 relative z-50 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4"
          >
            {slug.data.map((item: any, index: number) => (
              <Link
                href={`/praca-zdalna/${params.slug}/${
                  params.category
                }/${polishToEnglish(item.title)}`}
                key={index}
                className="flex flex-col md:flex-row items-start md:items-center justify-between bg-orange-500 px-4 py-2 rounded-t-md"
              >
                <h2 className="flex items-center text-white">
                  <FaBriefcase className="w-10 h-10 mr-3" />{" "}
                  <div className="font-light">{item.title}</div>
                </h2>
              </Link>
            ))}
          </div>
        </div>
      )}
      <MainFooter
        jobsList={cat.data}
        heading={`Praca zdalna ${cat.title}`}
        category={params.slug}
      />
    </div>
  );
}

// Metadata generation
export async function generateMetadata({ params }: { params: any }) {
  const category = jobs
    .flatMap((service: any) =>
      service.data.flatMap((subItem: any) => ({ category: subItem.title }))
    )
    .find(
      (item: any) => polishToEnglish(item.category) === params.category
    ).category;

  const title = `Quixy Talent™ | Oferty pracy zdalnej - ${category}`;
  const description = `Przeglądaj nasze oferty pracy w kategorii ${category}. Zrealizuj swój projekt z Quixy!`;

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
