/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { polishToEnglish } from "../../../../../../utils/polishToEnglish";
import jobs from "../../../../../../public/14.09.2024.json";
import MainFooter from "@/components/MainFooter";
import Header from "@/components/Header";
import { FaBriefcase } from "react-icons/fa";
import AboutQuixyTalent from "@/app/(about)/AboutQuixyTalent";
import { TfiFlagAlt } from "react-icons/tfi";
import { getPageContent } from "@/lib/getPageContent";
import { getTalents } from "../../../../../../utils/getTalents";
import Image from "next/image";

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
  const talents = await getTalents();
  // const job_offers = await fetch(
  //   `${process.env.NEXT_PUBLIC_URL}/api/getOffersByCategory?tubylytylkofigi=${process.env.API_SECRET_KEY}&cat=${params.category}`,
  //   {
  //     method: "POST",
  //     cache: "no-store",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Accept: "application/json",
  //     },
  //     next: { revalidate: 360 },
  //   }
  // ).then((res) => {
  //   return res.json();
  // });

  return (
    <div className="bg-gradient-to-b !font-gotham relative bg-white">
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
          <div className="container mx-auto">
            <h1 className="text-black bg-white text-lg lg:text-2xl pt-12">
              {slug.title}
              <b className="text-primary ml-1">oferty pracy zdalnej</b>
            </h1>
            <div className="bg-white py-8 relative z-50 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4">
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

      <div className="bg-gray-200 rounded-3xl p-3 py-6 sm:py-12 lg:py-24 mt-6 container mx-auto my-12">
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
      <div className="px-8 bg-white w-full mb-20">
        <div className="flex flex-col container mx-auto">
          <div className="mt-6">
            <h2 className="text-black font-gotham mb-3">
              Specjaliści {content?.genitive}
            </h2>
            <div className="flex items-center flex-wrap -ml-2">
              {talents
                ?.filter((item) => item?.pseudo && item?.seek)
                .map((talent: any) => (
                  <Link
                    href={`/talent/${talent.pseudo}`}
                    className="flex items-center ml-2"
                    key={talent?.uid}
                  >
                    {talent?.photoURL ? (
                      <div className="w-12 aspect-square rounded-lg bg-gray-200">
                        <div
                          className="rounded-lg"
                          style={{ boxShadow: "0px 0px 4px black" }}
                        >
                          <Image
                            src={talent?.photoURL}
                            width={224}
                            height={224}
                            alt={`Zdjęcie talentu ${
                              talent?.name || talent?.pseudo
                            }`}
                            className="rounded-lg"
                          />
                        </div>
                      </div>
                    ) : (
                      <span
                        style={{ boxShadow: "0px 0px 4px black" }}
                        className="w-12 aspect-square mr-2 rounded-lg bg-white flex items-center justify-center text-2xl text-primary"
                      >
                        {talent?.name?.[0].toUpperCase() ||
                          talent?.pseudo?.[0].toUpperCase()}
                      </span>
                    )}
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white w-full px-4">
        <div className="flex flex-col lg:flex-row gap-6 p-6 lg:p-12 2xl:p-24 bg-gray-200 rounded-3xl container mx-auto">
          <section className="text-left w-full lg:pr-24">
            <h2 className="text-3xl font-extrabold mb-6 text-black font-gotham">
              Czym zajmują się specjaliści {content?.genitive}?
            </h2>

            <div
              className="text-black max-w-3xl markdownSlug font-light font-gotham"
              dangerouslySetInnerHTML={{
                __html: content?.description,
              }}
            />
            {/* <div className="mt-12">
              <h3
                style={{ lineHeight: 1.4 }}
                className="text-3xl font-gotham text-black  mb-3"
              >
                Odwiedź naszego bloga o tematyce poświęconej nie tylko{" "}
                {content?.dative}
                {", "} ale także pracy zdalnej.
              </h3>
              <Link
                href="https://wesiudev.com/pl"
                target="_blank"
                title="zobacz autora bloga"
              >
                <Image
                  src="/assets/wesiudev3.png"
                  width={224}
                  height={224}
                  alt="Logo serwisu wesiudev.com"
                  className="w-32 h-auto"
                />
              </Link>
              <p className="mt-3 text-black font-gotham font-light">
                Brak nowych postów... Stay tuned 😎
              </p>
            </div> */}
          </section>
        </div>
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
