import Link from "next/link";
import { polishToEnglish } from "../../../../../utils/polishToEnglish";
import jobs from "../../../../../public/14.09.2024.json";
import SlugFooter from "@/components/SlugFooter";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import { FaArrowRightLong } from "react-icons/fa6";
import { getPageContent } from "@/lib/getPageContent";
import Image from "next/image";
import BlogPostList from "@/components/BlogPostList";
import { getProducts } from "@/firebase";
import TalentList from "@/components/TalentList";
export async function generateStaticParams() {
  return jobs.flatMap((service: any) => ({
    slug: polishToEnglish(service.title),
  }));
}
export default async function Page({
  params,
  searchParams,
}: {
  params: any;
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const slug: any = jobs.find(
    (page: any) => polishToEnglish(page.title) === params.slug
  );
  const content = await getPageContent(polishToEnglish(slug.title));
  const products: any = await getProducts();
  const isTalent = searchParams?.talent === "" ? true : false;
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
        item?.tags?.filter((tag: any) => tag.categoryUrl === params.slug)
    );

  return (
    <>
      <div className="bg-gray-200">
        <Header jobsList={jobs} />
        {/* Hero Section */}
        <div className="px-4 relative flex flex-col items-center justify-center text-center text-white bg-gradient-to-r from-zinc-800 via-gray-800 to-zinc-950 py-12 font-gotham">
          <Hero />
          <div className="bg-black/50 px-3 py-6 rounded-xl">
            <p className="!leading-normal text-4xl mb-4 relative z-50 font-gotham">
              <span className="bg-gradient-to-r from-primary to-cta px-2 py-3 rounded-lg text-white mr-2">
                Praca Zdalna
              </span>

              {slug.title}
            </p>
            {/* <h2 className="text-2xl font-semibold mb-6">{slug.h2}</h2> */}
            {isTalent && (
              <h2 className="text-lg  relative z-50 w-[90%] mx-auto sm:max-w-[40rem] ">
                Jesteś zainteresowany/a pracą zdalną w{" "}
                <span className="font-semibold">{content?.genitive}</span>?
              </h2>
            )}
            {isTalent && (
              <p className=" text-white font-light w-full px-4 text-sm sm:text-base lg:max-w-xl mx-auto">
                Tworzymy Quixy Talent by pomagać freelancerom i ludziom takim
                jak my.
              </p>
            )}
            {!isTalent && (
              <p className="font-light text-white w-full px-4 text-sm sm:text-base lg:max-w-xl mx-auto">
                Pomożemy ci stworzyć najskuteczniejsze oferty pracy zdalnej w{" "}
                {content?.genitive} w Polsce! Zajmij się swoim biznesem, a my
                znajdziemy idealnych ekspertów.
              </p>
            )}
            <div className="px-6 sm:px-12 breadcrumbs text-sm bg-transparent  mx-auto relative z-50">
              <ul className="flex items-center justify-center flex-wrap font-light">
                <li>
                  <Link title="praca zdalna" href={`/praca-zdalna`}>
                    praca-zdalna
                  </Link>
                </li>
                <li>
                  <Link
                    title={`praca zdalna ${params.slug}`}
                    href={`/praca-zdalna/${params.slug}`}
                  >
                    {params.slug}
                  </Link>
                </li>
              </ul>
            </div>
            <Link href="/register" className="relative z-50">
              <button className="bg-gradient-to-r from-primary to-cta text-white px-2 py-1.5 rounded-lg font-light">
                {isTalent && "Wypróbuj Tanel Talentu"}
                {!isTalent && "Wypróbuj Panel"}
              </button>
            </Link>
          </div>
        </div>
        {/* Subcategories */}
        <div className="container mx-auto px-6">
          <div className="rounded-3xl w-full h-full mx-auto grid grid-cols-1 lg:grid-cols-2 lg:gap-12 mt-12">
            <Image
              src={`/slug/${polishToEnglish(slug.title)}.webp`}
              width={1024}
              height={1024}
              alt={`Prace Zdalne w ${content?.genitive}`}
              style={{ boxShadow: "0px 0px 8px black" }}
              quality={75}
              blurDataURL="data:image/webp;base64,UklGRiIAAABXRUJQVlA4WAoAAAAQAAAfAADuwH/xAAfAQADAAQAAAAAAQAvAQADAAQAAAAAAQAvAQA"
              placeholder="blur"
              className="rounded-3xl w-full h-auto mb-6 lg:mb-0"
            />
            <div className="flex flex-col w-full justify-center font-gotham">
              <h1 className="!leading-snug text-2xl lg:text-4xl text-black drop-shadow-md mb-6 lg:mb-10">
                {isTalent && "Szukaj pracy zdalnej"}{" "}
                {!isTalent && "Dodaj ofertę pracy"} w {content?.genitive}.{" "}
                {isTalent && (
                  <span className="p-1 rounded-md bg-gradient-to-r from-primary via-cta to-primary text-white">
                    Dołącz do Quixy Talent.
                  </span>
                )}
                {!isTalent && (
                  <span className="p-1 rounded-md bg-gradient-to-r from-primary via-cta to-primary text-white">
                    Wypróbuj Quixy AI!
                  </span>
                )}
              </h1>
              <div
                className={`${isTalent ? "flex-col-reverse" : "flex-col"} flex`}
              >
                <div className="mt-6 bg-white rounded-lg text-white">
                  <h2 className="font-light italic p-2 bg-black rounded-tl-lg rounded-br-lg w-max text-sm">
                    Dodaj ogłoszenie
                  </h2>
                  <p className="text-base 2xl:text-xl font-light mb-4 p-3 text-black">
                    Talent w {content?.genitive} to np.{" "}
                    {content?.synonyms[1]
                      ? content?.synonyms[1]
                      : content?.synonyms[0]}{" "}
                    - dodaj ogłoszenie o pracę w kategorii{" "}
                    <b className="text-cta">{slug.title}</b> i zatrudnij
                    ekspertów z tej dziedziny.
                  </p>
                  <div className="flex items-end justify-end w-full">
                    <Link
                      href="/register"
                      className="text-white bg-[#126b91] font-bold p-2 rounded-br-lg rounded-tl-lg flex items-center"
                    >
                      Stwórz konto klienta
                      <FaArrowRightLong className="ml-2" />
                    </Link>
                  </div>
                </div>
                <div className="mt-6 bg-white rounded-lg text-white">
                  <h2 className="font-light italic p-2 bg-black rounded-tl-lg rounded-br-lg w-max text-sm">
                    Znajdź pracę
                  </h2>
                  <p className="text-base 2xl:text-xl font-light mb-4 p-3 text-black">
                    Chcesz znaleźć pracę zdalną lub rozwijać swoje portfolio?
                    Przeglądaj ogłoszenia pracy, dołącz do zespołu i twórz
                    innowacyjne rozwiązania.
                  </p>
                  <div className="flex items-end justify-end w-full">
                    <Link
                      href="/register"
                      className="text-white bg-[#14A800] font-bold p-2 rounded-br-lg rounded-tl-lg flex items-center"
                    >
                      Stwórz konto talentu
                      <FaArrowRightLong className="ml-2" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {isTalent && (
            <div className="rounded-xl w-full mb-12">
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
          )}
          <div className="px-4 bg-white w-full my-12 rounded-xl p-6">
            <div className="flex flex-col container mx-auto">
              <div className="">
                <h2
                  style={{ lineHeight: 1.5 }}
                  className="text-black font-gotham text-xl lg:text-3xl mb-6"
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
          {/* Content */}
          <div className="flex flex-col lg:flex-row my-12">
            <section className="text-left lg:w-[55%]">
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
                className="text-black max-w-3xl markdownSlug font-light font-coco"
                dangerouslySetInnerHTML={{
                  __html: content?.description,
                }}
              />
              <BlogPostList posts={products} />
            </section>
          </div>
          {/* <h2 className="text-xl font-semibold text-primary mb-4">
          Najlepsi specjaliści {slug.title}
        </h2> */}
          {/* display users with seek:true and user?.categories includes slug.title, else display "no users, want to be first? man with black glasses italic" */}
          <div className="mb-12 flex flex-col w-full sm:max-w-sm lg:max-w-lg xl:max-w-xl 2xl:max-w-2xl font-coco text-black">
            <h4 className="text-lg px-2 w-max font-light italic">Tagi</h4>
            <ul className="text-sm font-light flex items-center flex-wrap">
              {content?.synonyms.map((item: any, i: any) => (
                <li key={i} className={`ml-2 mt-2`}>
                  #{item.toLowerCase()}
                </li>
              ))}

              {isTalent && <li className="mt-2 ml-2">#znajdz-prace</li>}
              {!isTalent && <li className="mt-2 ml-2">#rekrutacja</li>}
              <li className="mt-2 ml-2">#praca zdalna</li>
              <li className="mt-2 ml-2">#{slug.title.toLowerCase()}</li>
            </ul>
          </div>
        </div>
      </div>

      <SlugFooter
        jobsList={slug.data}
        title={slug.title}
        footerTitle={slug.title}
      />
    </>
  );
}

export async function generateMetadata({ params }: { params: any }) {
  const slug: any = jobs.find(
    (page: any) => polishToEnglish(page.title) === params.slug
  );
  const content = await getPageContent(polishToEnglish(slug.title));
  const title = `Praca zdalna w ${content?.genitive} | Zatrudnij ekspertów do Pracy Zdalnej`;
  const description = `Prowadzisz rekrutację lub szukasz pracy w ${content?.genitive}? Chcesz zająć się ${content?.instrumental}? Mamy dla Ciebie zlecenia.`;

  return {
    title,
    description,
    openGraph: {
      type: "website",
      url: `https://quixy.pl/praca-zdalna/${polishToEnglish(slug.title)}`,
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
    },
  };
}
