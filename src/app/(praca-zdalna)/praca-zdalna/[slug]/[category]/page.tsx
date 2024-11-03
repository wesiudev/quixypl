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
import TalentList from "@/components/TalentList";
import JobOffers from "@/components/JobOffers";

// Generowanie parametrów statycznych
export async function generateStaticParams() {
  return jobs.flatMap((service: any) =>
    service.data.flatMap((subItem: any) => ({ category: subItem.title }))
  );
}

export default async function Page(props: { params: Promise<any> }) {
  const params = await props.params;
  // Znalezienie odpowiednich danych
  const cat: any = jobs.find(
    (page: any) => polishToEnglish(page.title) === params.slug
  );
  const slug = cat?.data.find(
    (item: any) => polishToEnglish(item.title) === params.category
  );
  const content = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/content?tubylytylkofigi=${process.env.API_SECRET_KEY}&job=${params.category}`,
    {
      next: { revalidate: 60 },
    }
  ).then((res: any) => res.json());
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
        item.emailVerified &&
        item?.seek !== "ask" &&
        item?.tags?.filter((tag: any) => tag.categoryUrl === params.category)
    );
  return (
    <div className="bg-gradient-to-b !font-gotham relative bg-white">
      <Header jobsList={jobs} />

      {/* Hero Section */}
      <div className="px-4 relative flex flex-col items-center justify-center text-center text-white bg-gradient-to-r from-zinc-900 via-gray-900 to-zinc-950 py-12 font-gotham">
        <div className="p-3 sm:p-6 lg:p-12 !py-0 relative z-50">
          <h1 className="text-2xl mb-4">
            Praca zdalna{" "}
            <b className="bg-gradient-to-r from-primary via-cta to-primary p-1  !leading-snug">
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
          <b className="text-cta">{content?.genitive}</b> na polskim rynku pracy
          i zrealizuj swój projekt z ich wsparciem! Odkryj możliwości Quixy.
        </p>
        <div className="flex items-center gap-2 sm:gap-3 lg:gap-4 justify-center mt-4 w-full z-50">
          <Link
            href="/register"
            title="Rekrutuj do pracy zdalnej na panelu Quixy"
            className="font-gotham  bg-primary hover:bg-opacity-90 duration-100 text-white font-bold text-sm lg:text-base p-2 py-1.5 text-center"
          >
            <h2 className="w-max mx-auto">Jestem klientem</h2>
          </Link>
          <Link
            href="/register"
            title="Szukaj pracy zdalnej na panelu Quixy"
            className="font-gotham  bg-cta hover:bg-opacity-90 duration-100 text-white font-bold text-sm lg:text-base p-2 py-1.5 text-center"
          >
            <h2 className="w-max mx-auto">Jestem freelancerem</h2>
          </Link>
        </div>
      </div>
      <div className="px-4 bg-white w-full mb-6 mt-12">
        <div className="flex flex-col container mx-auto">
          <div className="">
            <h2
              style={{ lineHeight: 1.5 }}
              className="text-black font-gotham text-xl lg:text-3xl my-6"
            >
              {content?.informal_title_plural}{" "}
              <span className="bg-gradient-to-r from-primary to-cta text-white p-2 ml-1 ">
                w Quixy Talent&trade;
              </span>
            </h2>{" "}
            <TalentList categoryTalents={categoryTalents} />
          </div>
        </div>
      </div>
      {/* Subcategories Section */}
      <div className="bg-white px-4 container mx-auto">
        {slug?.data?.length > 0 && (
          <div className="">
            <h1 className="!leading-normal text-black bg-white text-xl lg:text-3xl mt-6">
              {slug.title}
              <b className="bg-gradient-to-r from-primary via-cta to-primary p-1  ml-1 text-white">
                oferty pracy zdalnej
              </b>
            </h1>
            <div className="bg-white mt-6 relative z-50 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-3">
              {slug.data.map((item: any, index: number) => (
                <Link
                  href={`/praca-zdalna/${params.slug}/${
                    params.category
                  }/${polishToEnglish(item.title)}`}
                  key={index}
                  className="flex flex-col md:flex-row items-start md:items-center justify-between bg-[#126b91] px-4 py-2  font-coco"
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

      <div className="bg-white w-full px-4 mt-12">
        <div className="flex flex-col lg:flex-row gap-6  container mx-auto">
          <section className="text-left w-full lg:pr-24">
            <h2
              style={{ lineHeight: 1.5 }}
              className="text-3xl mb-3 text-black font-bold"
            >
              Czym zajmują się {content?.informal_title_plural?.toLowerCase()}?
            </h2>

            <div
              className="text-black max-w-3xl markdownSlug font-gotham"
              dangerouslySetInnerHTML={{
                __html: content?.description,
              }}
            />
          </section>
        </div>
        <div className="container mx-auto mt-6">
          <AboutQuixyTalent />
        </div>
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
export async function generateMetadata(props: { params: Promise<any> }) {
  const params = await props.params;
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
