import Link from "next/link";
import { polishToEnglish } from "../../../../utils/polishToEnglish";
import jobs from "../../../../public/14.09.2024.json";
import SlugFooter from "@/components/SlugFooter";
import Header from "@/components/Header";
import { FaArrowRightLong } from "react-icons/fa6";
import { getPageContent } from "@/lib/getPageContent";
import Image from "next/image";
import BlogPostList from "@/components/BlogPostList";
import { getProducts } from "@/firebase";
import TalentList from "@/components/JobBoardList";
export async function generateStaticParams() {
  return jobs.flatMap((service: any) => ({
    slug: polishToEnglish(service.title),
  }));
}
export default async function Page(props: {
  params: Promise<any>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const searchParams = await props.searchParams;
  const params = await props.params;
  const slug: any = jobs.find(
    (page: any) => polishToEnglish(page.title) === params.slug
  );
  const content = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/content?tubylytylkofigi=${process.env.API_SECRET_KEY}&job=${params.slug}`,
    {
      next: { revalidate: 60 },
    }
  ).then((res: any) => res.json());
  const products: any = await getProducts();
  const isTalent = searchParams?.talent === "" ? true : false;
  const talents = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/talents?tubylytylkofigi=${process.env.API_SECRET_KEY}`,
    {
      next: { revalidate: 60 },
    }
  ).then((res: any) => res.json());
  const companies = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/companies?tubylytylkofigi=${process.env.API_SECRET_KEY}`,
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
        item?.emailVerified &&
        item?.pseudo &&
        item?.seek &&
        item?.seek !== "ask" &&
        item?.tags?.filter((tag: any) => tag.slugUrl === params.slug).length > 0
    );
  return (
    <>
      <Header jobsList={jobs} />
      <div>
        {/* Hero Section */}
        <div className="px-6 lg:px-12 relative flex flex-col items-center justify-center text-center bg-gradient-to-r from-primary to-cta">
          <div className="w-full py-6 lg:py-12 text-center overflow-hidden relative mt-6 lg:mt-12 bg-white">
            <div className="container mx-auto">
              <p className="pb-4 lg:pb-8 px-6 text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold mb-6 leading-snug w-full text-center mx-auto bg-gradient-to-r from-primary to-cta text-transparent bg-clip-text">
                Freelancer Job Boards – {slug.title}
              </p>
            </div>
            {/* <h2 className="text-2xl font-semibold mb-6">{slug.h2}</h2> */}
            {isTalent && (
              <p className="-mt-6 font-coco text-black w-full sm:text-lg lg:max-w-xl mx-auto">
                Zaprezentuj swoje usługi i znajdź pracę by rozwinąc swoje
                portfolio.
              </p>
            )}
            {!isTalent && (
              <p className="-mt-6 font-coco text-black w-full sm:text-lg lg:max-w-xl mx-auto">
                Stwórz najskuteczniejsze oferty pracy w {content?.genitive}!
                Zajmij się swoim biznesem, a my znajdziemy idealnych ekspertów.
              </p>
            )}
            <div className="mt-2"></div>
            <Link href="/register" className="relative z-50">
              <button className="bg-gradient-to-r from-primary to-cta text-white px-2 py-1.5">
                Dołącz już dziś
              </button>
            </Link>
          </div>
        </div>
        {/* Subcategories */}

        <div className="bg-gradient-to-r from-primary to-cta w-full h-full mx-auto pt-6 lg:pt-12">
          <div className="px-6 lg:px-12 mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12">
            <Image
              src={`/slug/${polishToEnglish(slug.title)}.webp`}
              width={1024}
              height={1024}
              alt={`Prace Zdalne w ${content?.genitive}`}
              blurDataURL="data:image/webp;base64,UklGRiIAAABXRUJQVlA4WAoAAAAQAAAfAADuwH/xAAfAQADAAQAAAAAAQAvAQADAAQAAAAAAQAvAQA"
              placeholder="blur"
              className="w-full h-auto mb-6 lg:mb-0"
            />
            <div className="flex flex-col w-full">
              <h1 className="font-extrabold text-2xl lg:text-4xl text-white drop-shadow-md shadow-black mb-6">
                {isTalent && "Szukaj pracy zdalnej"}{" "}
                {!isTalent && "Dodaj ofertę pracy"} w {content?.genitive}.{" "}
              </h1>
              <div
                className={`${
                  isTalent ? "flex-col-reverse" : "flex-col"
                } flex mt-3`}
              >
                <div className="p-6 text-black bg-white">
                  <h2 className="text-primary w-max font-extrabold">
                    QUIXY DLA FIRM
                  </h2>
                  <p className="sm:text-lg 2xl:text-xl pb-3 text-black">
                    Zatrudnij najlepszych specjalistów — opublikuj ofertę pracy
                    w kategorii <b className="font-bold">{slug.title}</b> i
                    znajdź ekspertów w tej dziedzinie. Promuj swoje usługi, by
                    dotrzeć do odpowiednich odbiorców.
                  </p>
                  <div className="flex w-full">
                    <Link
                      href="/register"
                      className="text-white bg-gradient-to-r from-primary to-cta font-extrabold p-3 flex items-center"
                    >
                      Stwórz konto klienta
                      <FaArrowRightLong className="ml-2" />
                    </Link>
                  </div>
                </div>
                <div className="p-6 mt-6 text-black bg-white">
                  <h2 className="text-primary w-max font-extrabold">
                    FREELANCERZY
                  </h2>
                  <p className="sm:text-lg 2xl:text-xl pb-3 text-black">
                    Znajdź pracę zdalną lub jednorazowe zlecenia i rozwijaj
                    swoje portfolio w panelu użytkownika. Przeglądaj ogłoszenia
                    pracy, dołącz do zespołu i twórz innowacyjne rozwiązania.
                  </p>
                  <div className="flex w-full">
                    <Link
                      href="/register"
                      className="text-white bg-gradient-to-r from-primary to-cta font-extrabold p-3 flex items-center"
                    >
                      Stwórz konto talentu
                      <FaArrowRightLong className="ml-2" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white w-full pb-12 mt-12 p-6 lg:p-12">
            <div className="flex flex-col mx-auto">
              <div className="">
                <TalentList
                  talents={categoryTalents}
                  companies={companies}
                  content={content}
                />
              </div>
            </div>
          </div>
          {/* Content */}
          <div className="px-6 lg:px-12 bg-white mx-auto flex flex-col lg:flex-row">
            <section className="">
              <h2 className="py-3 text-black text-xl lg:text-3xl mb-3 font-extrabold">
                Czym zajmują się {content?.informal_title_plural.toLowerCase()}?
              </h2>

              <div
                className="text-black max-w-3xl markdownSlug font-light font-coco"
                dangerouslySetInnerHTML={{
                  __html: content?.description,
                }}
              />
              <BlogPostList posts={products} />
            </section>
            <div className="w-full lg:w-[40%] mt-12 lg:mt-0">
              {jobs.map((job: any, i: any) => (
                <div key={i}>
                  {polishToEnglish(job.title) === params.slug && (
                    <div className="flex flex-col" key={i}>
                      <div className="flex flex-col bg-white rounded-xl">
                        {job.data.map((item: any, j: any) => (
                          <div key={j} className="relative">
                            <h2
                              title={`Pracuj zdalnie w ${item.title}`}
                              className="py-3 text-black font-extrabold w-full text-xl"
                            >
                              <div className="w-[90%] mx-auto">
                                {item.title}
                              </div>
                            </h2>

                            {/* Hover dropdown */}
                            <div className="flex w-[90%] mx-auto flex-wrap my-3">
                              {item.data.map((subcategory: any, k: any) => (
                                <Link
                                  title={`Pracuj zdalnie w ${subcategory.title}`}
                                  key={k}
                                  style={{ boxShadow: "1px 0px 4px black" }}
                                  className="max-w-[300px] bg-[#126b91] hover:bg-[#468CA9] duration-75 font-light text-white text-sm p-2 w-max"
                                  href={`/praca-zdalna/${polishToEnglish(
                                    job.title
                                  )}/${polishToEnglish(
                                    item.title
                                  )}/${polishToEnglish(subcategory.title)}`}
                                >
                                  {subcategory.title}
                                </Link>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
          {/* <h2 className="text-xl font-semibold text-primary mb-4">
          Najlepsi specjaliści {slug.title}
        </h2> */}
          {/* display users with seek:true and user?.categories includes slug.title, else display "no users, want to be first? man with black glasses italic" */}
          <div className="bg-white px-6 lg:px-12 py-12 flex flex-col w-full sm:max-w-sm lg:max-w-lg xl:max-w-xl 2xl:max-w-2xl text-black">
            <h4 className="text-lg w-max font-extrabold">Tagi</h4>
            <ul className="font-coco flex items-center flex-wrap">
              {content?.synonyms.map((item: any, i: any) => (
                <li key={i} className={`ml-2 mt-2`}>
                  #{item.toLowerCase()}
                </li>
              ))}

              {isTalent && <li className="mt-2 ml-2">#znajdz-prace</li>}
              {!isTalent && <li className="mt-2 ml-2">#rekrutacja</li>}
              <li className="mt-2 ml-2">#praca-zdalna</li>
              <li className="mt-2 ml-2">#job-boards</li>
              <li className="mt-2 ml-2">#job-offers</li>
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

export async function generateMetadata(props: { params: Promise<any> }) {
  const params = await props.params;
  const slug: any = jobs.find(
    (page: any) => polishToEnglish(page.title) === params.slug
  );
  const content = await getPageContent(polishToEnglish(slug.title));
  const title = `Oferty pracy w ${content?.genitive} - Job Boards`;
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
