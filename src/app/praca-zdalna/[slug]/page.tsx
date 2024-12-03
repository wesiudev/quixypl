import Link from "next/link";
import { polishToEnglish } from "../../../../utils/polishToEnglish";
import jobs from "../../../../public/14.09.2024.json";
import SlugFooter from "@/components/SlugFooter";
import Header from "@/components/Header";
import { FaArrowRightLong } from "react-icons/fa6";
import { getPageContent } from "@/lib/getPageContent";
import Image from "next/image";
import BlogPostList from "@/components/BlogPostList";
import { getDocuments, getProducts } from "@/firebase";
import JobBoardList from "@/components/JobBoardList";
import Market from "@/components/marketplace/Market";
import { removePolishSignsAndSpaces } from "@/lib/removePolish";
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
    `${process.env.NEXT_PUBLIC_URL}/api/talents/slug?tubylytylkofigi=${
      process.env.API_SECRET_KEY
    }&slug=${polishToEnglish(params.slug)}`,
    {
      next: { revalidate: 60 },
    }
  ).then((res: any) => res.json());
  const companies = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/companies/slug?tubylytylkofigi=${
      process.env.API_SECRET_KEY
    }&slug=${polishToEnglish(params.slug)}`,
    {
      next: { revalidate: 60 },
    }
  ).then((res: any) => res.json());

  const leads: any = await getDocuments("services");
  return (
    <>
      <Header jobsList={jobs} />
      <div>
        {/* Hero Section */}
        <div className="px-6 lg:px-12 relative flex flex-col items-center justify-center text-center bg-gradient-to-r from-primary to-cta">
          <div className="w-full py-6 lg:py-12 text-center overflow-hidden relative mt-6 lg:mt-12 bg-white">
            <div className="container mx-auto">
              <p className="text-2xl sm:text-3xl md:text-4xl xl:text-5xl font-extrabold w-full text-center mx-auto bg-gradient-to-r from-primary to-cta text-transparent bg-clip-text">
                Freelancer Job Boards – {slug.title}
              </p>
            </div>
            {/* <h2 className="text-2xl font-semibold mb-6">{slug.h2}</h2> */}
            {isTalent && (
              <p className="mt-2 text-black w-full sm:text-lg lg:max-w-xl mx-auto">
                Zaprezentuj swoje usługi i znajdź pracę i rozwijaj swoje
                portfolio w Quixy.
              </p>
            )}
            {!isTalent && (
              <p className="mt-2 text-black w-full sm:text-lg lg:max-w-xl mx-auto">
                Stwórz najskuteczniejsze oferty pracy w {content?.genitive}!
                Poszukujesz klientów? Dodaj swoje usługi do profilu i rozpocznij
                współpracę!
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
              <h1 className="font-extrabold text-2xl lg:text-4xl text-white drop-shadow-md shadow-black mb-4">
                {isTalent && "Szukaj pracy zdalnej"}{" "}
                {!isTalent && "Dodaj ofertę pracy"} w {content?.genitive}.{" "}
              </h1>
              <div
                className={`${
                  isTalent ? "flex-col-reverse" : "flex-col"
                } flex mt-3`}
              >
                <div className="p-6 text-black bg-white">
                  <h2 className="text-black text-xl mb-2 font-extrabold">
                    Dla klientów
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
                  <h2 className="text-black text-xl font-extrabold mb-2">
                    Dla freelancerów i firm
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
          <div className="bg-white w-full pb-12 px-6 lg:px-12 mt-12">
            <div className="flex flex-col mx-auto">
              <div className="">
                <JobBoardList
                  talents={talents}
                  companies={companies}
                  content={content}
                />
              </div>
            </div>
          </div>
          <div className="px-4 lg:px-12 bg-white" id="search">
            <Market leads={leads} />
          </div>
          {/* Content */}
          <div className="px-6 lg:px-12 bg-white mx-auto flex flex-col lg:flex-row gap-12">
            <div className="w-full lg:w-[50%] mt-12">
              <h2
                style={{ lineHeight: 1.2 }}
                className="rounded-xl text-black w-max max-w-full font-extrabold text-4xl mb-6"
              >
                Zlecenia i oferty pracy zdalnej dla freelancerów oraz firm
              </h2>
              {jobs.map((job: any, i: any) => (
                <div key={i}>
                  {polishToEnglish(job.title) === params.slug && (
                    <div className="flex flex-col" key={i}>
                      <div className="flex flex-col bg-white rounded-xl gap-3">
                        {job.data.map((item: any, j: any) => (
                          <div
                            key={j}
                            className="relative bg-gradient-to-r from-transparent to-primary/10 p-3 rounded-xl"
                          >
                            <h2
                              title={`Pracuj zdalnie w ${item.title}`}
                              className="pb-3 text-black font-extrabold w-full text-xl"
                            >
                              <div className="w-[90%]">{item.title}</div>
                            </h2>

                            {/* Hover dropdown */}
                            <div className="flex w-[90%] flex-wrap">
                              {item.data.map((subcategory: any, k: any) => (
                                <Link
                                  title={`Pracuj zdalnie w ${subcategory.title}`}
                                  key={k}
                                  style={{ boxShadow: "1px 0px 4px black" }}
                                  className="max-w-[300px] bg-[#126b91] hover:bg-[#468CA9] duration-75 font-extralight font-coco text-lg text-white p-2 w-max"
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
            <section className="w-full lg:w-[50%]">
              <h2 className="pb-3 text-black text-2xl font-extrabold">
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
          </div>
          {/* <h2 className="text-xl font-semibold text-primary mb-4">
          Najlepsi specjaliści {slug.title}
        </h2> */}
          {/* display users with seek:true and user?.categories includes slug.title, else display "no users, want to be first? man with black glasses italic" */}
        </div>
        <div className="bg-white py-12 px-4 lg:px-12 flex flex-col w-full text-black">
          <h4 className="text-lg w-max font-extrabold">Tagi</h4>
          <ul className="font-coco flex items-center flex-wrap gap-2">
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
