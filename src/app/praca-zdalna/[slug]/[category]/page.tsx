import Link from "next/link";
import { polishToEnglish } from "../../../../../utils/polishToEnglish";
import MainFooter from "@/components/MainFooter";
import Header from "@/components/Header";
import { FaBriefcase } from "react-icons/fa";
import AboutQuixyTalent from "@/components/AboutQuixyTalent";
import JobBoardList from "@/components/JobBoardList";
import Market from "@/components/marketplace/Market";
import { getDocuments } from "@/firebase";
import removePolishSignsAndSpaces from "@/lib/removePolish";
import Image from "next/image";

// Generowanie parametrów statycznych
export async function generateStaticParams() {
  const jobs = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/jobs?tubylytylkofigi=${process.env.API_SECRET_KEY}`,
    {
      next: { revalidate: 600 },
    }
  ).then((res) => res.json());
  return jobs.flatMap((service: any) =>
    service.data.flatMap((subItem: any) => ({ category: subItem.title }))
  );
}

export default async function Page(props: { params: Promise<any> }) {
  const params = await props.params;
  const jobs = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/jobs?tubylytylkofigi=${process.env.API_SECRET_KEY}`,
    {
      next: { revalidate: 600 },
    }
  ).then((res) => res.json());
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
    `${process.env.NEXT_PUBLIC_URL}/api/talents/slug?tubylytylkofigi=${
      process.env.API_SECRET_KEY
    }&slug=${polishToEnglish(params.category)}`,
    {
      next: { revalidate: 60 },
    }
  ).then((res: any) => res.json());
  const companies = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/companies/slug?tubylytylkofigi=${
      process.env.API_SECRET_KEY
    }&slug=${polishToEnglish(params.category)}`,
    {
      next: { revalidate: 60 },
    }
  ).then((res: any) => res.json());
  const leads: any = await getDocuments("services");
  return (
    <div className="bg-gradient-to-b relative bg-white">
      <Header jobsList={jobs} />
      {/* Hero Section */}
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
          <div className="text-xs sm:text-sm text-gray-200 breadcrumbs mb-4">
            <ul className="flex flex-wrap font-light">
              <li>
                <Link title="Strona główna" href={`/`}>
                  hello!
                </Link>
              </li>
              <li>
                <Link title="Zakładka praca zdalna" href={`/praca-zdalna`}>
                  praca-zdalna
                </Link>
              </li>
              <li>
                <Link
                  title={`Kategoria: ${params.slug}`}
                  href={`/praca-zdalna/${params.slug}`}
                >
                  {params.slug}
                </Link>
              </li>
              <li>
                <Link
                  title={`Podkategoria: ${params.category}`}
                  href={`/praca-zdalna/${params.slug}/${params.category}`}
                >
                  {params.category}
                </Link>
              </li>
            </ul>
          </div>

          {/* Główny nagłówek */}
          <h1
            style={{ lineHeight: 1.4 }}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-4"
          >
            {slug?.title} - Zlecenia, Usługi, Oferty Pracy
          </h1>

          {/* Opis */}
          <p className="lg:text-base text-gray-100 max-w-2xl mb-6">
            Zatrudnij najlepszych specjalistów od{" "}
            <b className="text-white">{content?.genitive}</b> na polskim rynku
            pracy i zrealizuj swój projekt z ich wsparciem!
          </p>

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

      <div className="w-full mx-auto container px-4 lg:px-12 flex flex-col items-center justify-center">
        {/* Sekcja główna */}
        <div className="mt-12 w-full">
          <div className="flex flex-col mx-auto ">
            <JobBoardList
              talents={talents}
              companies={companies}
              content={content}
            />
          </div>
        </div>

        {/* Sekcja wyszukiwania */}
        <div className="mt-12 w-full" id="search">
          <Market leads={leads} />
        </div>

        {/* Podkategorie */}
        {slug?.data?.length > 0 && (
          <div className="w-full">
            <h1 className="text-black text-2xl lg:text-3xl font-extrabold mb-6">
              Oferty Pracy - {slug.title}
            </h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4">
              {slug.data.map((item: any, index: number) => (
                <Link
                  href={`/praca-zdalna/${params.slug}/${
                    params.category
                  }/${polishToEnglish(item.title)}`}
                  key={index}
                  className="flex items-center justify-between bg-gradient-to-r from-primary to-cta text-white px-4 py-3 rounded-lg shadow-md hover:shadow-lg transition"
                >
                  <h2 className="flex items-center gap-3">
                    <FaBriefcase className="w-6 h-6" />
                    {item.title}
                  </h2>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Sekcja opisu */}
        <div className="w-full mt-12">
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-12 mx-auto">
            {/* Główna sekcja tekstowa */}
            <section className="w-full lg:w-3/5">
              {/* Nagłówek */}
              <h2 className="text-2xl sm:text-3xl lg:text-4xl text-black font-extrabold mb-6 leading-tight">
                Czym zajmują się {content?.informal_title_plural?.toLowerCase()}
                ?
              </h2>

              {/* Opis - obsługa HTML */}
              <div
                className="text-gray-800 text-sm sm:text-base leading-relaxed markdownSlug"
                dangerouslySetInnerHTML={{
                  __html: content?.description,
                }}
              />
            </section>
          </div>

          <div className="mt-8">
            <AboutQuixyTalent />
          </div>
        </div>

        {/* Sekcja tagów */}
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
              #jakzostac
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
      {/* Footer Section */}
      <MainFooter jobsList={cat.data} />
    </div>
  );
}

// Metadata generation
export async function generateMetadata(props: { params: Promise<any> }) {
  const params = await props.params;
  const jobs = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/jobs?tubylytylkofigi=${process.env.API_SECRET_KEY}`,
    {
      next: { revalidate: 600 },
    }
  ).then((res) => res.json());
  const category = jobs
    .flatMap((service: any) =>
      service.data.flatMap((subItem: any) => ({ category: subItem.title }))
    )
    .find(
      (item: any) => polishToEnglish(item.category) === params.category
    ).category;
  const title = `Oferty Pracy Zdalnej Zlecenia Freelancerzy | ${category}`;
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
