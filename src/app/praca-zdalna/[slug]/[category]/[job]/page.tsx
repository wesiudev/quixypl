import Link from "next/link";
import { polishToEnglish } from "../../../../../../utils/polishToEnglish";
import jobs from "../../../../../../public/14.09.2024.json";
import MainFooter from "@/components/MainFooter";
import Header from "@/components/Header";
import BlogPostList from "@/components/BlogPostList";
import { getDocuments, getProducts } from "@/firebase";
import JobBoardList from "@/components/JobBoardList";
import Market from "@/components/marketplace/Market";
import removePolishSignsAndSpaces from "@/lib/removePolish";
import Viewer from "@/components/AddJobOffer/Viewer";
import JobOffers from "@/components/JobOffers";
import Image from "next/image";
export async function generateStaticParams() {
  return jobs
    .flatMap((service: any) =>
      service.data.flatMap((subItem: any) => subItem.data)
    )
    .map((item: any) => ({ job: polishToEnglish(item.title) }));
}
export default async function Page(props: { params: Promise<any> }) {
  const params = await props.params;
  const offers = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/offers?tubylytylkofigi=${process.env.API_SECRET_KEY}&category=${params.job}`,
    {
      next: { revalidate: 600 },
    }
  ).then((res) => res.json());
  const talents = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/talents/slug?tubylytylkofigi=${
      process.env.API_SECRET_KEY
    }&slug=${polishToEnglish(params.job)}`,
    {
      next: { revalidate: 600 },
    }
  ).then((res: any) => res.json());
  const companies = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/companies/slug?tubylytylkofigi=${
      process.env.API_SECRET_KEY
    }&slug=${polishToEnglish(params.job)}`,
    {
      next: { revalidate: 600 },
    }
  ).then((res: any) => res.json());
  const allCities = Array.from(
    new Set([
      ...talents.map((item: any) => item?.city),
      ...companies.map((item: any) => item?.city),
    ])
  );
  const content = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/content?tubylytylkofigi=${process.env.API_SECRET_KEY}&job=${params.job}`,
    {
      next: { revalidate: 600 },
    }
  ).then((res: any) => res.json());
  const products: any = await getProducts();
  const leads: any = await getDocuments("services");
  return (
    <>
      <Header jobsList={jobs} />
      <div className="min-h-screen flex flex-col w-full">
        {/* Header */}
        {/* Job Title Section */}
        <section
          className="p-6 lg:p-12 text-left relative bg-gradient-to-r from-primary to-cta"
          style={{ boxShadow: "inset 0px 0px 10px rgba(0, 0, 0, 0.3)" }}
        >
          {/* Obraz tła z lepszą czytelnością */}
          <div className="absolute left-0 top-0 w-full h-full">
            <Image
              src="/assets/AI-Image.png"
              width={1024}
              height={1024}
              alt=""
              className="w-full h-full object-cover opacity-[0.05]"
            />
          </div>

          {/* Główna zawartość */}
          <div className="relative z-50 w-full mx-auto container px-4 lg:px-12">
            {/* Breadcrumbs */}
            <div className="text-xs text-gray-200 breadcrumbs mb-4">
              <ul className="flex flex-wrap font-light">
                <li>
                  <Link title="home" href={`/`}>
                    hello!
                  </Link>
                </li>
                <li>
                  <Link
                    title="Główna zakładka z pracą zdalną"
                    href={`/praca-zdalna`}
                  >
                    praca-zdalna
                  </Link>
                </li>
                <li>
                  <Link
                    title={`Kategoria Pracy ${params.slug}`}
                    href={`/praca-zdalna/${params.slug}`}
                  >
                    {params.slug}
                  </Link>
                </li>
                <li>
                  <Link
                    title={`Podkategoria Praca Specjaliści ${params.category}`}
                    href={`/praca-zdalna/${params.slug}/${params.category}`}
                  >
                    {params.category}
                  </Link>
                </li>
                <li>
                  <Link
                    title={`Oferty Pracy Zlecenia Freelancerzy Firmy ${params.job}`}
                    href={`/praca-zdalna/${params.slug}/${params.category}/${params.job}`}
                  >
                    {params.job}
                  </Link>
                </li>
              </ul>
            </div>

            {/* Główny nagłówek */}
            <p
              style={{ lineHeight: 1.4 }}
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-4"
            >
              Freelancer Job Boards
            </p>

            {/* Opis */}
            <h1 className="lg:text-base text-gray-100 max-w-2xl mb-6">
              Zlecenia, usługi, oferty pracy zdalnej i najlepsi{" "}
              {content?.informal_title_plural}
            </h1>

            {/* Przyciski */}
            <div className="flex gap-4">
              <Link
                className="text-sm lg:text-base hover:underline text-white py-2 px-4 border border-white rounded-lg transition"
                href="/register"
              >
                Wpisz się
              </Link>
              <Link
                className="text-sm lg:text-base bg-cta hover:bg-opacity-90 text-white py-2 px-4 rounded-lg shadow-md transition"
                href="/register"
              >
                Dodaj ofertę
              </Link>
            </div>
          </div>
        </section>
        <div className="mx-auto container px-4 lg:px-12">
          <div className="my-12 w-full flex flex-col">
            <JobBoardList
              talents={talents}
              companies={companies}
              content={content}
            />
          </div>
          <div
            className={`${
              offers.length > 0
                ? "bg-gradient-to-r from-primary to-cta"
                : "bg-white"
            }`}
          >
            <div>
              <h2
                className={`${
                  offers.length > 0 ? "text-white" : "text-black"
                } font-extrabold text-xl lg:text-3xl`}
              >
                {content?.title} - oferty pracy
              </h2>
              <p
                className={`${offers.length > 0 ? "text-white" : "text-black"}`}
              >
                Szukasz pracy jako{" "}
                {content?.informal_title_singular.toLowerCase()}?
              </p>
              <JobOffers offers={offers} content={content} />
            </div>
          </div>
          {/* Services Section */}
          <div className="mt-12 w-full" id="search">
            <Market leads={leads} />
          </div>

          {/* Content */}
          <div className="w-full flex flex-col lg:flex-row">
            <section className="text-left">
              <h2
                style={{ lineHeight: 1.5 }}
                className="font-extrabold text-black text-xl lg:text-3xl"
              >
                Czym zajmują się
                <span className="ml-2 text-black">
                  {content?.informal_title_plural.toLowerCase()}?
                </span>
              </h2>
              <div
                className="text-black max-w-3xl markdownSlug font-light font-coco"
                dangerouslySetInnerHTML={{
                  __html: content?.description,
                }}
              />
              <div className="w-full my-12">
                <div className="mt-12 flex flex-wrap gap-4">
                  {allCities.map((city: any, i: any) => (
                    <Link
                      key={city}
                      target="_blank"
                      className="block text-white font-bold"
                      href={`/praca-zdalna/${params.slug}/${params.category}/${
                        params.job
                      }/${polishToEnglish(city)}`}
                    >
                      <span className="block w-max max-w-full rounded-3xl py-2 px-4 bg-gradient-to-r from-primary to-cta">
                        {content?.informal_title_plural} {city}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
              <BlogPostList posts={products} />
            </section>
          </div>
          <div className="my-12">
            <div className="my-12 w-full">
              <h4 className="text-xl font-extrabold text-gray-800 mb-4">
                Tagi
              </h4>
              <ul className="flex overflow-x-scroll lg:overflow-visible w-full lg:flex-wrap gap-4 text-sm lg:text-base">
                {content?.synonyms.map((item: any, i: number) => (
                  <li
                    key={i}
                    className="bg-gradient-to-r from-primary to-cta text-white px-4 py-2 rounded-full shadow-sm transition-transform duration-200 lg:hover:scale-105"
                  >
                    #{removePolishSignsAndSpaces(item.toLowerCase())}
                  </li>
                ))}
                <li className="bg-gradient-to-r from-primary to-cta text-white px-4 py-2 rounded-full shadow-sm transition-transform duration-200 lg:hover:scale-105">
                  #firmy{removePolishSignsAndSpaces(content?.genitive)}
                </li>
                <li className="bg-gradient-to-r from-primary to-cta text-white px-4 py-2 rounded-full shadow-sm transition-transform duration-200 lg:hover:scale-105">
                  #zleceniadlafirm
                  {removePolishSignsAndSpaces(content?.genitive)}
                </li>
                <li className="bg-gradient-to-r from-primary to-cta text-white px-4 py-2 rounded-full shadow-sm transition-transform duration-200 lg:hover:scale-105">
                  #zleceniadlafreelancerow
                  {removePolishSignsAndSpaces(content?.genitive)}
                </li>
                <li className="bg-gradient-to-r from-primary to-cta text-white px-4 py-2 rounded-full shadow-sm transition-transform duration-200 lg:hover:scale-105">
                  #ilezarabia
                  {removePolishSignsAndSpaces(
                    content?.informal_title_singular.toLowerCase()
                  )}
                </li>
                <li className="bg-gradient-to-r from-primary to-cta text-white px-4 py-2 rounded-full shadow-sm transition-transform duration-200 lg:hover:scale-105">
                  #jakzostac
                  {removePolishSignsAndSpaces(
                    content?.informal_title_singular.toLowerCase()
                  )}
                </li>
                <li className="bg-gradient-to-r from-primary to-cta text-white px-4 py-2 rounded-full shadow-sm transition-transform duration-200 lg:hover:scale-105">
                  #
                  {removePolishSignsAndSpaces(
                    content?.informal_title_singular.toLowerCase()
                  )}
                  freelance
                </li>
                <li className="bg-gradient-to-r from-primary to-cta text-white px-4 py-2 rounded-full shadow-sm transition-transform duration-200 lg:hover:scale-105">
                  #zarobki
                  {removePolishSignsAndSpaces(
                    content?.informal_title_plural.toLowerCase()
                  )}
                </li>
                <li className="bg-gradient-to-r from-primary to-cta text-white px-4 py-2 rounded-full shadow-sm transition-transform duration-200 lg:hover:scale-105">
                  #
                  {removePolishSignsAndSpaces(
                    content?.informal_title_plural.toLowerCase()
                  )}
                </li>
                <li className="text-black bg-gray-100 px-4 py-2 rounded-full shadow-sm hover:bg-gray-200 transition-all">
                  #znajdzprace
                </li>
                <li className="text-black bg-gray-100 px-4 py-2 rounded-full shadow-sm hover:bg-gray-200 transition-all">
                  #rekrutacja
                </li>
                <li className="text-black bg-gray-100 px-4 py-2 rounded-full shadow-sm hover:bg-gray-200 transition-all">
                  #pracazdalna
                </li>
                <li className="text-black bg-gray-100 px-4 py-2 rounded-full shadow-sm hover:bg-gray-200 transition-all">
                  #freelancer
                </li>
                <li className="text-black bg-gray-100 px-4 py-2 rounded-full shadow-sm hover:bg-gray-200 transition-all">
                  #jobboards
                </li>
                <li className="text-black bg-gray-100 px-4 py-2 rounded-full shadow-sm hover:bg-gray-200 transition-all">
                  #joboffers
                </li>
                <li className="text-black bg-gray-100 px-4 py-2 rounded-full shadow-sm hover:bg-gray-200 transition-all">
                  #ofertypracy
                </li>
                <li className="text-black bg-gray-100 px-4 py-2 rounded-full shadow-sm hover:bg-gray-200 transition-all">
                  #ogloszeniaoprace
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <MainFooter jobsList={jobs} />
    </>
  );
}

export async function generateMetadata(props: { params: Promise<any> }) {
  const params = await props.params;
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
  const title = `${job?.title} Oferty Pracy, Zlecenia, Specjaliści i Usługi`;
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
          url: "https://quixy.pl/favicons/android-chrome-512x512.png",
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
        url: "https://quixy.pl/favicons/android-chrome-512x512.png",
      },
    },
  };
}
