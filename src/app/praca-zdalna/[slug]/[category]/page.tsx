import Link from "next/link";
import { polishToEnglish } from "../../../../../utils/polishToEnglish";
import jobs from "../../../../../public/14.09.2024.json";
import MainFooter from "@/components/MainFooter";
import Header from "@/components/Header";
import { FaBriefcase } from "react-icons/fa";
import AboutQuixyTalent from "@/components/AboutQuixyTalent";
import JobBoardList from "@/components/JobBoardList";
import Market from "@/components/marketplace/Market";
import { getDocuments } from "@/firebase";
import removePolishSignsAndSpaces from "@/lib/removePolish";

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
      <div className="px-6 lg:px-12 relative flex flex-col items-center justify-center text-center bg-gradient-to-r from-primary to-cta">
        <div className="mb-6 lg:mb-12 w-full py-8 lg:py-12 text-center overflow-hidden relative mt-8 lg:mt-12 bg-white">
          <div className="container mx-auto">
            <h1 className="pb-4 px-6 text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold mb-3 leading-snug w-full mx-auto bg-gradient-to-r from-primary to-cta text-transparent bg-clip-text">
              {slug?.title} - Zlecenia, Usługi, Oferty Pracy
            </h1>
          </div>
          <p className="max-w-2xl mx-auto text-lg sm:text-xl text-gray-700 px-4 z-50">
            Zatrudnij najlepszych specjalistów od{" "}
            <b className="text-cta">{content?.genitive}</b> na polskim rynku
            pracy i zrealizuj swój projekt z ich wsparciem!
          </p>
          <div className="flex items-center gap-3 sm:gap-4 lg:gap-5 justify-center mt-3 w-full z-50">
            <Link
              href="/register"
              title="Rekrutuj do pracy zdalnej na panelu Quixy"
              className="font-gotham bg-primary hover:bg-opacity-90 duration-150 text-white font-bold text-sm lg:text-base px-3 py-2 text-center"
            >
              Jestem klientem
            </Link>
            <Link
              href="/register"
              title="Szukaj pracy zdalnej na panelu Quixy"
              className="font-gotham bg-cta hover:bg-opacity-90 duration-150 text-white font-bold text-sm lg:text-base px-3 py-2 text-center"
            >
              Jestem freelancerem
            </Link>
          </div>
        </div>
      </div>
      <div className="bg-white w-full pb-12">
        <div className="flex flex-col mx-auto px-4 lg:px-12">
          <div className="">
            <JobBoardList
              talents={talents}
              companies={companies}
              content={content}
            />
          </div>
        </div>
      </div>{" "}
      <div className="px-4 lg:px-12" id="search">
        <Market leads={leads} />
      </div>
      {/* Subcategories Section */}
      <div className="bg-white mx-auto px-4 lg:px-12">
        {slug?.data?.length > 0 && (
          <div className="">
            <h1 className="!leading-normal text-black bg-white text-xl lg:text-3xl mt-6 font-extrabold">
              {slug.title}
              <span className="bg-gradient-to-r from-primary to-cta p-1 ml-1 text-white">
                oferty pracy zdalnej
              </span>
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
      <div className="bg-white w-full px-3 lg:px-12 mt-12">
        <div className="flex flex-col lg:flex-row gap-6 mx-auto">
          <section className="text-left w-full lg:pr-24">
            <h2
              style={{ lineHeight: 1.5 }}
              className="text-3xl mb-3 text-black font-extrabold"
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
        <div className="my-6">
          <AboutQuixyTalent />
        </div>
      </div>
      <div className="bg-white px-3 lg:px-12 py-6 flex flex-col w-full text-black">
        <h4 className="text-lg w-max font-extrabold">Tagi</h4>
        <ul className="text-xs lg:text-base flex items-center flex-wrap gap-2">
          {content?.synonyms.map((item: any, i: any) => (
            <li key={i} className={``}>
              #{removePolishSignsAndSpaces(item.toLowerCase())}
            </li>
          ))}

          <li>#znajdzprace</li>
          <li>#rekrutacja</li>
          <li>#pracazdalna</li>
          <li>#firmy{removePolishSignsAndSpaces(content?.genitive)}</li>
          <li>#freelancer</li>
          <li>#jobboards</li>
          <li>#joboffers</li>
          <li>#ofertypracy</li>
          <li>#ogloszeniaoprace</li>
          <li>#ogloszeniapracy</li>
          <li>
            #
            {removePolishSignsAndSpaces(
              content?.informal_title_plural.toLowerCase()
            )}
          </li>
          <li>
            #
            {removePolishSignsAndSpaces(
              content?.informal_title_singular.toLowerCase()
            )}
          </li>
          <li>#{removePolishSignsAndSpaces(content?.title.toLowerCase())}</li>
        </ul>
      </div>
      {/* Footer Section */}
      <MainFooter jobsList={cat.data} />
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
