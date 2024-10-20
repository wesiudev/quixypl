import Link from "next/link";
import { polishToEnglish } from "../../../../../../utils/polishToEnglish";
import jobs from "../../../../../../public/14.09.2024.json";
import MainFooter from "@/components/MainFooter";
import Header from "@/components/Header";
import { FaBriefcase } from "react-icons/fa";
import AboutQuixyTalent from "@/app/(about)/AboutQuixyTalent";
import { TfiFlagAlt } from "react-icons/tfi";
import { getPageContent } from "@/lib/getPageContent";
import Image from "next/image";
import Hero from "@/components/Hero";
import TalentList from "@/components/TalentList";
import JobOffers from "@/components/JobOffers";

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
  const talents = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/talents?tubylytylkofigi=${process.env.API_SECRET_KEY}`,
    {
      next: { revalidate: 60 },
    }
  ).then((res: any) => res.json());
  const categoryTalents = talents
    ?.map((item: any) => {
      const { email, ...talent } = item;
      return talent;
    })
    .filter(
      (item: any) =>
        item?.pseudo &&
        item?.seek &&
        item?.seek !== "ask" &&
        item?.tags?.filter((tag: any) => tag.categoryUrl === params.category)
    );
  return (
    <div className="bg-gradient-to-b !font-gotham relative bg-white">
      <Header jobsList={jobs} />

      {/* Hero Section */}
      <div className="px-4 relative flex flex-col items-center justify-center text-center text-white bg-gradient-to-r from-zinc-900 via-gray-900 to-zinc-950 py-12 font-gotham">
        <Hero />
        <div className="p-3 sm:p-6 lg:p-12 !py-0 relative z-50">
          <h1 className="text-2xl sm:text-3xl lg:text-5xl mb-4">
            Praca zdalna{" "}
            <b className="bg-gradient-to-r from-primary via-cta to-primary p-1 rounded-lg !leading-snug">
              {slug?.title}
            </b>
          </h1>
        </div>
        <div className=" breadcrumbs text-sm bg-transparent mx-auto flex items-center justify-center relative z-50">
          <ul className="flex-wrap flex items-center justify-center px-3 font-light text-white">
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
        <p className="max-w-2xl mx-auto text-lg text-white px-3 mt-3 font-light z-50">
          Zatrudnij najlepszych specjalistów od{" "}
          <b className="text-cta">{content?.genitive}</b> na polskim rynku
          pracy. Zrealizuj swój projekt z ich wsparciem! Odkryj naszą platformę
          pracy zdalnej.
        </p>
        <div className="flex items-center gap-2 sm:gap-3 lg:gap-4 justify-center mt-4 w-full z-50">
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
      <div className="bg-white px-4 container mx-auto">
        {slug?.data?.length > 0 && (
          <div className="">
            <h1 className="!leading-normal text-black bg-white text-xl lg:text-3xl pt-12">
              {slug.title}
              <b className="bg-gradient-to-r from-primary via-cta to-primary p-1 rounded-lg ml-1 text-white">
                oferty pracy zdalnej
              </b>
            </h1>
            <div className="bg-white py-8 relative z-50 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4">
              {slug.data.map((item: any, index: number) => (
                <Link
                  href={`/praca-zdalna/${params.slug}/${
                    params.category
                  }/${polishToEnglish(item.title)}`}
                  key={index}
                  className="flex flex-col md:flex-row items-start md:items-center justify-between bg-[#126b91] px-4 py-2 rounded-xl font-coco"
                >
                  <h2 className="flex items-center text-white">
                    <FaBriefcase className="w-10 h-10 mr-3" /> {item.title}
                  </h2>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
      <JobOffers categoryUrl={params.category} content={content} />

      <div className="px-4 bg-white w-full mb-12">
        <div className="flex flex-col container mx-auto">
          <div className="">
            <h2
              style={{ lineHeight: 1.5 }}
              className="text-black font-gotham text-xl lg:text-3xl my-12"
            >
              {content?.informal_title_plural}{" "}
              <span className="bg-gradient-to-r from-primary to-cta text-white p-2 ml-1 rounded-lg">
                w Quixy Talent&trade;
              </span>
            </h2>{" "}
            <TalentList categoryTalents={categoryTalents} />
          </div>
        </div>
      </div>
      <div className="bg-white w-full px-4">
        <div className="flex flex-col lg:flex-row gap-6 rounded-3xl container mx-auto">
          <section className="text-left w-full lg:pr-24">
            <h2
              style={{ lineHeight: 1.5 }}
              className="text-3xl mb-6 text-black font-gotham"
            >
              Czym zajmują się
              <span className="ml-2 rounded-lg p-2 px-3 bg-gradient-to-r text-white from-primary via-cta to-primary">
                {content?.informal_title_plural.toLowerCase()}?
              </span>
            </h2>

            <div
              className="text-black max-w-3xl markdownSlug font-light font-gotham"
              dangerouslySetInnerHTML={{
                __html: content?.description,
              }}
            />
          </section>
        </div>
      </div>

      <div className="container mx-auto mt-3">
        <AboutQuixyTalent />
      </div>
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
