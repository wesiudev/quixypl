import Link from "next/link";
import { polishToEnglish } from "../../../../utils/polishToEnglish";
import Image from "next/image";
import JobBoardList from "@/components/JobBoardList";
const BlogPostList = dynamic(() => import("@/components/BlogPostList"));
const Market = dynamic(() => import("@/components/marketplace/Market"));
import removePolishSignsAndSpaces from "@/lib/removePolish";
import OpinionsForm from "@/components/OpinionsForm";
import dynamic from "next/dynamic";
export const revalidate = 60;
export const dynamicParams = true;
export default async function Page(props: {
  params: Promise<any>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await props.params;
  const jobs = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/jobs?tubylytylkofigi=${process.env.API_SECRET_KEY}`
  ).then((res) => res.json());
  const content = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/content?tubylytylkofigi=${process.env.API_SECRET_KEY}&job=${params.slug}`
  ).then((res: any) => res.json());
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
  const opinions = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/opinions?tubylytylkofigi=${
      process.env.API_SECRET_KEY
    }&slug=${polishToEnglish(params.slug)}`
  ).then((res: any) => res.json());
  return (
    <>
      <div>
        {/* Hero Section */}
        <section
          className="py-12 text-left relative bg-gradient-to-r from-primaryStart to-primaryEnd"
          style={{ boxShadow: "inset 0px 0px 10px rgba(0, 0, 0)" }}
        >
          {/* Obraz tła z lepszą czytelnością */}
          <div className="absolute left-0 top-0 w-full h-full">
            <Image
              src={`/slug/${params.slug}Hero.png`}
              width={1024}
              height={1024}
              alt="Praca Zdalna Quixy"
              className="w-full h-full object-cover opacity-15"
              priority
            />
          </div>

          {/* Główna zawartość */}
          <div className="relative z-50 w-full mx-auto container px-4 lg:px-12">
            {/* Główny nagłówek */}
            <h1
              style={{ lineHeight: 1.4 }}
              className="w-full lg:w-3/4 text-4xl lg:text-5xl font-extrabold text-white mb-4"
            >
              Oferty pracy i specjaliści{" "}
              <span className="text-accentStart">{content?.genitive}</span>
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
                className="text-sm lg:text-base hover:underline text-white py-2 px-4 border border-white rounded-md"
                href="/register"
              >
                Wpisz się
              </Link>
              <Link
                className="hover:scale-105 duration-100 text-sm lg:text-base bg-gradient-to-b from-ctaStart to-ctaEnd hover:bg-opacity-90 text-white py-2 px-4 rounded-md shadow-md"
                href="/register"
              >
                Dodaj ofertę
              </Link>
            </div>
          </div>
        </section>
        <div className="mx-auto container px-4 lg:px-12">
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
            <Market />
          </div>
          <div className="w-full mb-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="flex flex-col w-full justify-center items-center">
                <div className="text-black">
                  <div className="relative overflow-hidden bg-gradient-to-r from-primaryHoverStart/30 to-primaryHoverEnd/30 px-3 rounded-md">
                    <h2 className="text-sm text-white px-3 py-1 bg-gradient-to-b from-accentStart to-accentEnd rounded-b-3xl w-max mb-2">
                      Quixy dla firm
                    </h2>
                    <p className="text-center sm:text-lg text-black p-3 bg-white rounded-md mt-6 mb-8">
                      Zatrudnij najlepszych specjalistów — opublikuj ofertę
                      pracy w kategorii{" "}
                      <b className="font-bold">
                        {content?.title?.toLowerCase()}
                      </b>{" "}
                      i znajdź ekspertów w tej dziedzinie. Promuj swoje usługi,
                      by dotrzeć do odpowiednich odbiorców.
                    </p>
                    <Link
                      href="/register"
                      className="translate-y-4 hover:translate-y-0 duration-200 absolute bottom-0 right-3 pb-6 ml-auto bg-gradient-to-b from-ctaStart to-ctaEnd mt-3 block w-max max-w-full text-white py-2 px-4 rounded-t-3xl"
                    >
                      Dołącz jako firma
                    </Link>
                  </div>
                </div>
                <div className="mt-6 text-black">
                  <div className="relative overflow-hidden bg-gradient-to-r from-primaryHoverStart/30 to-primaryHoverEnd/30 px-3 rounded-md">
                    <h2 className="text-sm text-white px-3 py-1 bg-gradient-to-b from-accentStart to-accentEnd rounded-b-3xl w-max mb-2">
                      Quixy bez firmy
                    </h2>
                    <p className="sm:text-lg text-black text-center p-3 bg-white rounded-md mt-6 mb-8">
                      Znajdź pracę zdalną lub jednorazowe zlecenia i rozwijaj
                      swoje portfolio w panelu użytkownika. Przeglądaj
                      ogłoszenia pracy, dołącz do zespołu i twórz innowacyjne
                      rozwiązania.
                    </p>

                    <Link
                      href="/register"
                      className="translate-y-4 hover:translate-y-0 duration-200 absolute bottom-0 right-3 pb-6 ml-auto bg-gradient-to-b from-ctaStart to-ctaEnd mt-3 block w-max max-w-full text-white py-2 px-4 rounded-t-3xl"
                    >
                      Dołącz jako freelancer
                    </Link>
                  </div>
                </div>
              </div>
              <Image
                src={`/assets/mockup.png`}
                width={1024}
                height={1024}
                alt={`Prace Zdalne w ${content?.genitive}`}
                blurDataURL="data:image/webp;base64,UklGRiIAAABXRUJQVlA4WAoAAAAQAAAfAADuwH/xAAfAQADAAQAAAAAAQAvAQADAAQAAAAAAQAvAQA"
                placeholder="blur"
                className="my-12 sm:my-0 w-full scale-125 sm:scale-100 h-auto mx-auto"
              />
            </div>
          </div>
          {/* Content */}
          <div className="bg-white mx-auto flex flex-col lg:flex-row gap-12">
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
                      <div className="flex flex-col bg-white rounded-xl gap-6">
                        {job.data.map((item: any, j: any) => (
                          <div key={j} className="relative">
                            <h2
                              title={`Pracuj zdalnie w ${item.title}`}
                              style={{ boxShadow: "0px 1px 10px black" }}
                              className="rounded-md px-4 py-2 text-center w-full bg-gradient-to-b text-white from-accentStart to-accentEnd font-extrabold text-xl"
                            >
                              <div className="">{item.title}</div>
                            </h2>

                            {/* Hover dropdown */}
                            <div className="grid grid-cols-2 gap-3 mt-4">
                              {item.data.map((subcategory: any, k: any) => (
                                <Link
                                  title={`Pracuj zdalnie w ${subcategory.title}`}
                                  key={k}
                                  style={{ boxShadow: "1px 0px 4px black" }}
                                  className="rounded-md text-center py-3 px-6 bg-[#126b91] hover:bg-[#468CA9] duration-75 font-extralight  text-lg text-white"
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
                className="text-black max-w-3xl markdownSlug  "
                dangerouslySetInnerHTML={{
                  __html: content?.description,
                }}
              />
            </section>
          </div>

          <BlogPostList />
          {/* <h2 className="text-xl font-semibold text-primary mb-4">
          Najlepsi specjaliści {slug.title}
        </h2> */}
          {/* display users with seek:true and user?.categories includes slug.title, else display "no users, want to be first? man with black glasses italic" */}
          <div className="rounded-md overflow-hidden mt-12">
            <OpinionsForm opinions={opinions} />
          </div>
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
    </>
  );
}

export async function generateMetadata(props: { params: Promise<any> }) {
  const params = await props.params;
  const content = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/content?tubylytylkofigi=${process.env.API_SECRET_KEY}&job=${params.slug}`
  ).then((res: any) => res.json());
  const title = `${content?.title} Praca Zdalna Freelancer Job Boards`;
  const description = `Prowadzisz rekrutację lub szukasz pracy w ${content?.genitive}? Chcesz zająć się ${content?.instrumental}? Mamy dla Ciebie zlecenia.`;
  return {
    title,
    description,
    openGraph: {
      type: "website",
      url: `https://quixy.pl/praca-zdalna/${polishToEnglish(params.slug)}`,
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
