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
import removePolishSignsAndSpaces from "@/lib/removePolish";
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
              </ul>
            </div>

            {/* Główny nagłówek */}
            <h1
              style={{ lineHeight: 1.4 }}
              className="w-full lg:w-3/4 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-4"
            >
              Oferty pracy oraz zlecenia w {content?.genitive}
            </h1>

            {/* Opis */}
            <p className="lg:text-base text-gray-100 max-w-2xl mb-6">
              Stwórz najskuteczniejsze oferty pracy w {content?.genitive}!
              Poszukujesz klientów? Dodaj swoje usługi do profilu i rozpocznij
              współpracę!
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
        <div className="mx-auto container px-4 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12">
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
              <h1 className="font-extrabold text-2xl lg:text-3xl text-black mb-4">
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
          <div className="bg-white w-full py-12">
            <div className="flex flex-col mx-auto">
              <JobBoardList
                talents={talents}
                companies={companies}
                content={content}
              />
            </div>
          </div>
          <div className="bg-white" id="search">
            <Market leads={leads} />
          </div>
          {/* Content */}
          <div className=" bg-white mx-auto flex flex-col lg:flex-row gap-12">
            <div className="w-full lg:w-[50%]">
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
            <section className="w-full lg:w-3/5">
              <h2 className="pb-3 text-black text-2xl font-extrabold">
                Czym zajmują się {content?.informal_title_plural.toLowerCase()}?
              </h2>

              <div
                className="text-black max-w-3xl markdownSlug  font-coco"
                dangerouslySetInnerHTML={{
                  __html: content?.description,
                }}
              />
            </section>
          </div>

          <BlogPostList posts={products} />
          {/* <h2 className="text-xl font-semibold text-primary mb-4">
          Najlepsi specjaliści {slug.title}
        </h2> */}
          {/* display users with seek:true and user?.categories includes slug.title, else display "no users, want to be first? man with black glasses italic" */}
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
          url: "https://quixy.pl/favicons/android-chrome-512x512.png",
          type: "image/png",
        },
      ],
    },
    twitter: {
      cardType: "summary_large_image",
      image: {
        url: "https://quixy.pl/favicons/android-chrome-512x512.png",
        type: "image/png",
      },
      site: "@quixy",
      title,
      description,
    },
  };
}
