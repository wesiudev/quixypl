import { polishToEnglish } from "../../../../../../../utils/polishToEnglish";
import MainFooter from "@/components/MainFooter";
import BlogPostList from "@/components/BlogPostList";
import removePolishSignsAndSpaces from "@/lib/removePolish";
import JobOffers from "@/components/JobOffers";
import Link from "next/link";
import Image from "next/image";
import Market from "@/components/marketplace/Market";
import JobBoardList from "@/components/JobBoardList";
export const revalidate = 60;
export async function generateStaticParams() {
  const jobs = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/jobs?tubylytylkofigi=${process.env.API_SECRET_KEY}`
  ).then((res) => res.json());
  return jobs
    .flatMap((service: any) =>
      service.data.flatMap((subItem: any) => subItem.data)
    )
    .map((item: any) => ({ job: polishToEnglish(item.title) }));
}

export default async function Page(props: { params: Promise<any> }) {
  const params = await props.params;
  const jobs = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/jobs?tubylytylkofigi=${process.env.API_SECRET_KEY}`
  ).then((res) => res.json());
  const offers = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/offers?tubylytylkofigi=${process.env.API_SECRET_KEY}&category=${params.job}`
  ).then((res) => res.json());
  const talents = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/talents/slug?tubylytylkofigi=${
      process.env.API_SECRET_KEY
    }&slug=${polishToEnglish(params.slug)}`
  ).then((res: any) => res.json());
  const companies = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/companies/slug?tubylytylkofigi=${
      process.env.API_SECRET_KEY
    }&slug=${polishToEnglish(params.slug)}`
  ).then((res: any) => res.json());
  const content = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/content?tubylytylkofigi=${process.env.API_SECRET_KEY}&job=${params.job}`
  ).then((res: any) => res.json());
  const services = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/services?tubylytylkofigi=${process.env.API_SECRET_KEY}`
  ).then((res: any) => res.json());
  const posts = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/posts?tubylytylkofigi=${process.env.API_SECRET_KEY}`
  ).then((res: any) => res.json());
  const categoryTalents = talents.filter(
    (item: any) => polishToEnglish(item?.city) === params.city
  );
  const categoryCompanies = companies.filter(
    (item: any) => polishToEnglish(item?.city) === params.city
  );
  const city = categoryTalents[0]?.city || categoryCompanies[0]?.city;
  const allCities = Array.from(
    new Set([
      ...talents.map((item: any) => item?.city),
      ...companies.map((item: any) => item?.city),
    ])
  );
  return (
    <>
      <div className="">
        {/* Job Title Section */}
        <section
          className="py-12 text-left relative bg-gradient-to-r from-primaryStart to-primaryEnd"
          style={{ boxShadow: "inset 0px 0px 10px rgba(0, 0, 0)" }}
        >
          {/* Obraz tła z lepszą czytelnością */}
          <div className="absolute left-0 top-0 w-full h-full">
            <Image
              src="/assets/AI-Image.png"
              width={1024}
              height={1024}
              alt="praca zdalna quixy freelancerzy"
              className="w-full h-full object-cover opacity-10"
            />
          </div>
          {/* Główna zawartość */}
          <div className="relative z-50 w-full mx-auto container px-4 lg:px-12">
            {/* Główny nagłówek */}
            <h1
              style={{ lineHeight: 1.4 }}
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-4"
            >
              Oferty pracy, zlecenia usługi i najlepsi{" "}
              <span className="text-accentStart">
                {content?.informal_title_plural}
              </span>{" "}
              - {city}
            </h1>
            {/* Opis */}
            <p className="lg:text-base text-gray-100 max-w-2xl mb-6">
              Zatrudnij najlepszych specjalistów na polskim rynku pracy i
              zrealizuj swój projekt z ich wsparciem!
            </p>
            {/* Przyciski */}
            <div className="flex gap-4">
              <Link
                className="hover:underline text-white py-2 px-4 border border-white rounded-md"
                href="/register"
              >
                Wpisz się
              </Link>
              <Link
                className="bg-gradient-to-b from-ctaStart to-ctaEnd text-white py-2 px-4 rounded-md shadow-md hover:scale-105 duration-100"
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
              talents={categoryTalents}
              companies={categoryCompanies}
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
            <Market leads={services} />
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
                className="text-black max-w-3xl markdownSlug  font-coco"
                dangerouslySetInnerHTML={{
                  __html: content?.description,
                }}
              />
              <div className="w-full mt-12">
                <div className="flex flex-wrap gap-4">
                  {allCities.map((city: any, i: any) => (
                    <Link
                      key={city}
                      className="text-xs sm:text-sm block text-white hover:scale-105 duration-150"
                      href={`/praca-zdalna/${params.slug}/${params.category}/${
                        params.job
                      }/${polishToEnglish(city)}`}
                    >
                      <span className="block w-max max-w-full rounded-3xl py-2 px-4 bg-gradient-to-b from-primaryStart to-primaryEnd">
                        {content?.informal_title_plural} {city}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </section>
          </div>
          <BlogPostList posts={posts} />
          <div className="my-12 w-full">
            <h4 className="text-xl font-extrabold text-gray-800 mb-4">Tagi</h4>
            <ul className="flex overflow-x-scroll lg:overflow-visible w-full lg:flex-wrap gap-4 text-sm lg:text-base">
              {content?.synonyms.map((item: any, i: number) => (
                <li
                  key={i}
                  className="text-black bg-gray-100 px-4 py-2 rounded-full shadow-sm hover:bg-gray-200 transition-all"
                >
                  #{removePolishSignsAndSpaces(item.toLowerCase())}
                </li>
              ))}
              <li className="text-black bg-gray-100 px-4 py-2 rounded-full shadow-sm hover:bg-gray-200 transition-all">
                #firmy
                {removePolishSignsAndSpaces(content?.genitive.toLowerCase())}
              </li>
              <li className="text-black bg-gray-100 px-4 py-2 rounded-full shadow-sm hover:bg-gray-200 transition-all">
                #zleceniadlafirm
                {removePolishSignsAndSpaces(content?.genitive.toLowerCase())}
              </li>
              <li className="text-black bg-gray-100 px-4 py-2 rounded-full shadow-sm hover:bg-gray-200 transition-all">
                #zleceniadlafreelancerow
                {removePolishSignsAndSpaces(content?.genitive.toLowerCase())}
              </li>
              <li className="text-black bg-gray-100 px-4 py-2 rounded-full shadow-sm hover:bg-gray-200 transition-all">
                #ilezarabia
                {removePolishSignsAndSpaces(
                  content?.informal_title_singular.toLowerCase()
                )}
              </li>
              <li className="text-black bg-gray-100 px-4 py-2 rounded-full shadow-sm hover:bg-gray-200 transition-all">
                #
                {removePolishSignsAndSpaces(
                  content?.informal_title_singular.toLowerCase()
                )}
                freelance
              </li>
              <li className="text-black bg-gray-100 px-4 py-2 rounded-full shadow-sm hover:bg-gray-200 transition-all">
                #zarobki
                {removePolishSignsAndSpaces(
                  content?.informal_title_plural.toLowerCase()
                )}
              </li>
              <li className="text-black bg-gray-100 px-4 py-2 rounded-full shadow-sm hover:bg-gray-200 transition-all">
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

      <MainFooter jobsList={jobs} />
    </>
  );
}

export async function generateMetadata(props: { params: Promise<any> }) {
  const params = await props.params;
  const jobs = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/jobs?tubylytylkofigi=${process.env.API_SECRET_KEY}`
  ).then((res) => res.json());
  const talents = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/talents/slug?tubylytylkofigi=${
      process.env.API_SECRET_KEY
    }&slug=${polishToEnglish(params.slug)}`
  ).then((res: any) => res.json());
  const companies = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/companies/slug?tubylytylkofigi=${
      process.env.API_SECRET_KEY
    }&slug=${polishToEnglish(params.slug)}`
  ).then((res: any) => res.json());
  const categoryTalents = talents.filter(
    (item: any) => polishToEnglish(item?.city) === params.city
  );
  const categoryCompanies = companies.filter(
    (item: any) => polishToEnglish(item?.city) === params.city
  );
  const city = categoryTalents[0]?.city || categoryCompanies[0]?.city;
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
    .find((item: any) => polishToEnglish(item.title) === params.job);
  const title = `${job?.title} ${city} Oferty Pracy Zlecenia Specjaliści Usługi`;
  const description = `Interesuje cię ${job?.title?.toLowerCase()}? Przeglądaj zlecenia, oferty pracy lub dodaj usługi w ${category} ${city}.`;
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
