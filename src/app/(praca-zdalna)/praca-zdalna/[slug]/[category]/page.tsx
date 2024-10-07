/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { polishToEnglish } from "../../../../../../utils/polishToEnglish";
import jobs from "../../../../../../public/14.09.2024.json";
import MainFooter from "@/components/MainFooter";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import { FaBriefcase } from "react-icons/fa";
import AboutQuixyTalent from "@/app/(about)/AboutQuixyTalent";
import { TfiFlagAlt } from "react-icons/tfi";
import { getPageContent } from "@/lib/getPageContent";

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
  const content = await getPageContent(polishToEnglish(slug?.title));
  return (
    <div className="bg-gradient-to-b !font-gotham relative bg-black">
      <Header jobsList={jobs} />

      {/* Hero Section */}
      <div className="relative text-center py-16 overflow-hidden bg-gray-200">
        <div className="p-3 sm:p-6 lg:p-12 !py-0 relative z-50">
          <h1 className="text-2xl sm:text-3xl lg:text-5xl font-bold mb-4 text-black">
            Praca zdalna <b>{slug?.title}</b>
          </h1>
        </div>
        <div className=" breadcrumbs text-sm bg-transparent mx-auto flex items-center justify-center relative z-50">
          <ul className="flex-wrap flex items-center justify-center px-3 font-light text-black">
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
        <p className="max-w-2xl mx-auto text-lg text-black px-3 mt-3 font-light">
          Zatrudnij najlepszych specjalistów od{" "}
          <b className="text-cta">{content?.genitive}</b> na polskim rynku
          pracy. Zrealizuj swój projekt z ich wsparciem! Odkryj naszą platformę
          pracy zdalnej.
        </p>
        <div className="flex items-center gap-2 sm:gap-3 lg:gap-4 justify-center mt-4 w-full">
          <Link
            href="/register"
            title="Rekrutuj do pracy zdalnej na panelu Quixy"
            className="font-gotham rounded-md bg-primary hover:bg-opacity-90 duration-100 text-white font-bold text-sm lg:text-base p-2 py-1.5 text-center"
          >
            <h2 className="w-max mx-auto">Zatrudnij talent</h2>
          </Link>
          <Link
            href="/register"
            title="Szukaj pracy zdalnej na panelu Quixy"
            className="font-gotham rounded-md bg-cta hover:bg-opacity-90 duration-100 text-white font-bold text-sm lg:text-base p-2 py-1.5 text-center"
          >
            <h2 className="w-max mx-auto">Pracuj zdalnie</h2>
          </Link>
        </div>
      </div>

      {/* Subcategories Section */}
      <div className="bg-white">
        {slug?.data?.length > 0 && (
          <div className=" container mx-auto">
            <h1 className="text-black bg-white px-8 text-lg lg:text-2xl pt-12">
              {slug.title}
              <b className="text-primary ml-1">oferty pracy zdalnej</b>
            </h1>
            <div className="bg-white p-8 relative z-50 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4">
              {slug.data.map((item: any, index: number) => (
                <Link
                  href={`/praca-zdalna/${params.slug}/${
                    params.category
                  }/${polishToEnglish(item.title)}`}
                  key={index}
                  className="flex flex-col md:flex-row items-start md:items-center justify-between bg-[#126b91] px-4 py-2 rounded-xl font-coco italic"
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
      </div>
      <div className="bg-white p-3 py-6 sm:py-12 lg:py-24">
        <div className="bg-cta rounded-full aspect-square mx-auto w-40 flex items-center justify-center">
          <TfiFlagAlt className="text-white text-7xl" />
        </div>

        <p className="font-light text-black text-base font-gotham my-3 text-center max-w-xl mx-auto">
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
      <AboutQuixyTalent />
      {/* Footer Section */}
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
