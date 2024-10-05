import Image from "next/image";
import { polishToEnglish } from "../../../../../utils/polishToEnglish";
import { FaUser } from "react-icons/fa";
import Link from "next/link";
import moment from "moment";
import Hero from "@/components/Hero";
import { IProject } from "@/types";
import ProjectCard from "@/components/Dashboard/ImageGenerator/dashboard/ProjectCard";

export const revalidate = 300;
export default async function Page({ params }: { params: { slug: string } }) {
  const slug = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/talents?tubylytylkofigi=${
      process.env.API_SECRET_KEY
    }&pseudo=${polishToEnglish(params.slug)}`
  ).then((res) => res.json());
  return (
    <div>
      <div className="relative bg-zinc-800 sm:p-8 lg:p-16 xl:p-24">
        <Hero />
        {/* Breadcrumbs with Icons */}
        <div className="container bg-white p-6 grid grid-cols-1 h-max font-coco w-full mx-auto relative z-50 sm:rounded-xl">
          <div className="flex justify-between w-full text-sm bg-white !text-black  relative z-50 sm:rounded-xl">
            <div className="flex flex-col breadcrumbs">
              <div className="font-bold text-lg font-gotham">
                Quixy Talent&trade;
              </div>
              <ul className="flex items-center flex-wrap">
                <li className="">
                  <Link href={`/talent`} title="praca zdalna talent">
                    talent
                  </Link>
                </li>
                <li className="">
                  <Link href={`/talent/${params.slug}`} title={params.slug}>
                    {params.slug}
                  </Link>
                </li>
              </ul>
            </div>
            <Image
              src="/assets/quixy-logo.png"
              width={224}
              height={224}
              alt="Quixy Talent Logo"
              className="mt-3 w-24 h-auto"
            />
          </div>
          <div>
            <div className="">
              <div className="flex flex-col">
                <div className="flex flex-col">
                  <div className="flex flex-col">
                    <div className="w-full flex items-start justify-between text-black  font-gotham mb-6">
                      <div className="flex flex-col">
                        <div className="flex items-center flex-wrap -ml-3 mb-6">
                          {Array.from(
                            new Set(
                              slug?.tags?.map((item: any) => item.slugTitle)
                            )
                          ).map((item: any, i: any) => (
                            <Link
                              href={`/praca-zdalna/${polishToEnglish(item)}`}
                              key={item}
                              className="text-white bg-orange-500 rounded-md py-0.5 px-3 font-gotham ml-3 mt-3"
                            >
                              {item.toUpperCase()}
                            </Link>
                          ))}
                        </div>
                      </div>{" "}
                    </div>

                    <div
                      className="flex bg-white rounded-xl"
                      style={{ boxShadow: "inset 0px 0px 5px black" }}
                    >
                      <div>
                        {slug?.photoURL && (
                          <Image
                            src={slug?.photoURL}
                            width={256}
                            height={256}
                            alt=""
                            className="rounded-l-xl w-40 mb-0"
                          />
                        )}
                        {!slug.photoURL && (
                          <div className="bg-orange-500 rounded-l-xl aspect-square w-40 text-white flex items-center justify-center">
                            <FaUser className="text-3xl lg:text-5xl" />
                          </div>
                        )}
                      </div>
                      <div className="flex flex-col h-max p-3 w-full">
                        {!slug?.name && (
                          <h2 className="text-sm text-zinc-800 drop-shadow-lg font-bold font-coco italic">
                            Imię (lub imię i nazwisko)
                          </h2>
                        )}
                        <div className="text-black text-xl font-gotham font-bold w-full flex items-center justify-between">
                          <h2 className="lg:text-2xl">
                            {slug?.name ? slug?.name : "Nie podano"}
                          </h2>
                          <div className="text-sm text-black font-light font-gotham flex flex-col">
                            <div className="font-bold">Dołączył/a</div>
                            <div className="">
                              {moment(slug?.history[0]?.creationTime)?.format(
                                "DD-MM-yyyy"
                              )}
                            </div>
                          </div>
                        </div>

                        <h3 className="text-black text-lg">
                          {slug?.title && slug?.title}
                        </h3>
                        <h3 className="text-black text-lg">
                          {slug?.pseudo && slug?.pseudo}
                        </h3>
                      </div>
                    </div>
                  </div>

                  {!slug?.title && (
                    <div>
                      <h2 className="text-xl text-zinc-800 drop-shadow-lg font-gotham mt-6">
                        Tytuł
                      </h2>
                      <h3
                        className={`text-black  text-lg ${
                          slug?.title && "!text-3xl lg:text-5xl"
                        }`}
                      >
                        {slug?.title ? slug?.title : "Brak tytułu..."}
                      </h3>
                    </div>
                  )}
                  {!slug?.title && (
                    <div>
                      <h2 className="text-xl text-zinc-800 drop-shadow-lg font-gotham mt-6">
                        Pseudonim
                      </h2>
                      <h3
                        className={`text-black  text-lg ${
                          slug?.pseudo && "!text-3xl lg:text-5xl"
                        }`}
                      >
                        {slug?.pseudo ? slug?.pseudo : "Brak pseudonimu..."}
                      </h3>
                    </div>
                  )}
                  <h2 className="text-xl text-black  drop-shadow-lg font-gotham mt-6">
                    Specjalizacje
                  </h2>
                  <div className="w-full -ml-1 mt-1 flex flex-wrap items-center font-coco font-light text-white">
                    {slug?.tags?.map((item: any, i: any) => (
                      <h3 className="text-sm" key={i}>
                        <Link
                          href={`/praca-zdalna/${item?.slugUrl}/${item?.categoryUrl}/${item?.url}`}
                          className="ml-1 mt-1 rounded-xl bg-gray-500 flex items-center px-2 py-0.5"
                        >
                          {item.title}
                        </Link>
                      </h3>
                    ))}
                    {slug?.tags?.length === 0 &&
                      "Brak podanych specjalizacji..."}
                  </div>
                  <h2 className="text-xl text-zinc-800 drop-shadow-lg font-gotham mt-6">
                    Dostępność
                  </h2>
                  <div className="-ml-1 flex items-center flex-wrap">
                    {slug?.preferences ? (
                      slug?.preferences?.map((item: any, i: any) => (
                        <h3
                          key={i}
                          className={`ml-1 mt-1 rounded-xl bg-gray-500 flex items-center px-2 py-0.5 text-sm font-coco font-light text-white`}
                        >
                          {item}
                        </h3>
                      ))
                    ) : (
                      <h3 className="text-zinc-800 text-lg ml-2">
                        Brak danych o dostępności
                      </h3>
                    )}
                  </div>

                  <h2 className="text-xl text-zinc-800 drop-shadow-lg font-gotham mt-6">
                    Opis użytkownika
                  </h2>
                  <h3
                    className={`text-black  text-lg my-3 ${
                      slug?.bio && "!text-3xl lg:text-5xl"
                    }`}
                  >
                    {slug?.bio ? slug?.bio : "Brak opisu..."}
                  </h3>
                </div>
              </div>
            </div>
          </div>
          {slug?.projects?.length > 0 && (
            <div
              style={{ boxShadow: "inset 0px 0px 5px black" }}
              className={`bg-white p-5 lg:p-10 2xl:p-12 mt-6 mb-3 rounded-xl h-max w-full`}
            >
              <h2
                className={`text-3xl lg:text-5xl text-black drop-shadow-lg font-gotham mb-3`}
              >
                Projekty
              </h2>
              <div>
                {slug?.projects?.map((project: IProject, i: any) => (
                  <ProjectCard place="slug" key={i} project={project} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
export async function generateMetadata({ params }: { params: any }) {
  const slug = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/talents?tubylytylkofigi=${
      process.env.API_SECRET_KEY
    }&pseudo=${polishToEnglish(params.slug)}`
  ).then((res) => res.json());
  const title = `Quixy Talent™ ${slug?.pseudo} | Zatrudnij do Pracy Zdalnej`;
  const description = `Prowadzisz rekrutację lub szukasz pracy zdalnej? Sprawdź projekty ${slug?.pseudo} i współpracujcie gdziekolwiek jesteście, zdalnie`;

  return {
    title,
    description,
    openGraph: {
      type: "website",
      url: `https://quixy.pl/talent/${slug.pseudo}`,
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
      image: `${slug.photoURL ? slug.photoURL : "/assets/quixy-logo.png"}`,
    },
  };
}
