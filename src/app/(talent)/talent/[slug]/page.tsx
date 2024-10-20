import Image from "next/image";
import { FaUser } from "react-icons/fa";
import Link from "next/link";
import moment from "moment";
import { IProject } from "@/types";
import ProjectCard from "@/components/Dashboard/ImageGenerator/dashboard/ProjectCard";
import TalentList from "@/components/TalentList";
import UserStickyTop from "@/components/UserStickyTop";
import HireButton from "@/components/HireButton/HireButton";
import { IoLocationOutline } from "react-icons/io5";

export default async function Page({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: any;
}) {
  const talents = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/talents?tubylytylkofigi=${process.env.API_SECRET_KEY}`,
    { next: { revalidate: 60 } }
  ).then((res: any) => res.json());
  const slug = talents.find((item: any) => item.pseudo === params.slug);
  const talentTags = Array.from(
    new Set(slug?.tags?.map((item: any) => item.slugTitle))
  );
  return (
    <>
      <div className="container relative mx-auto">
        <UserStickyTop slugData={slug} />
        {/* Breadcrumbs with Icons */}
        <div className="px-4  bg-white py-6 grid grid-cols-1 h-max font-coco w-full mx-auto relative z-50">
          <div className="items-end flex justify-between w-full text-sm bg-white !text-black relative z-50">
            <div className="flex flex-col breadcrumbs">
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
            <div className="lg:block hidden w-max bg-gradient-to-r from-primary to-cta text-white font-bold text-lg font-gotham px-3 rounded-lg">
              Quixy Talent&trade;
            </div>
          </div>
          <div>
            <div className="mt-6">
              <div className="flex flex-col">
                <div className="flex">
                  <div className="flex w-max">
                    {slug?.photoURL && (
                      <div className="relative w-24 aspect-square h-24">
                        <Image
                          src={slug?.photoURL}
                          width={256}
                          height={256}
                          alt=""
                          className="rounded-full mb-0 absolute inset-0 object-cover w-full h-full"
                        />
                      </div>
                    )}
                    {!slug?.photoURL && (
                      <div className="bg-[#126b91] rounded-l-xl aspect-square text-white flex items-center justify-center w-24">
                        <FaUser className="text-5xl" />
                      </div>
                    )}
                  </div>
                  <div className="px-3">
                    <div className="flex flex-col h-max w-full rounded-xl">
                      <div className="text-black font-gotham font-bold w-full flex items-center justify-between">
                        <h2 className="text-base sm:text-xl lg:text-2xl">
                          {slug?.name ? slug?.name : "Nie podano"}
                        </h2>
                      </div>
                      <div className="my-1 text-black text-xs sm:text-sm flex items-center">
                        <IoLocationOutline className="-ml-px text-xl mr-1" />{" "}
                        <h3>{slug?.city}, Polska</h3>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full flex justify-between mt-3">
                <div className="w-full flex flex-col-reverse space-y-2 justify-between">
                  <div className="mt-3">
                    <h3 className=" font-gotham text-black font-bold text-xl lg:text-2xl">
                      {slug?.title && slug?.title}
                    </h3>
                    {slug?.hourRate && (
                      <div className="text-black text-xl font-gotham font-bold w-full flex items-center justify-between">
                        <div className="text-sm text-black font-light font-gotham flex flex-col">
                          <h3 className="font-bold">Stawka godzinowa</h3>
                          <div className="">{slug?.hourRate} zł/h</div>
                        </div>
                      </div>
                    )}
                  </div>
                  <HireButton talentSlugData={slug} />
                </div>
                <div className="w-max text-sm text-black font-light font-gotham flex flex-col">
                  <div className="font-bold">Dołączył/a</div>
                  <div className="">
                    {moment(slug?.history[0]?.creationTime)?.format(
                      "DD-MM-yyyy"
                    )}
                  </div>
                </div>{" "}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 mt-3">
                <div className="mr-1">
                  <h2 className="w-max rounded-lg text-xl text-black font-gotham mt-3">
                    Specjalizacje
                  </h2>
                  <div className="w-full -ml-1 mt-1 flex flex-wrap items-center font-coco text-black">
                    {slug?.tags?.map((item: any, i: any) => (
                      <h3 className="text-sm" key={i}>
                        <Link
                          href={`/praca-zdalna/${item?.slugUrl}/${item?.categoryUrl}/${item?.url}`}
                          className="ml-1 mt-1 rounded-xl bg-primary duration-100 flex items-center px-2 py-0.5 text-sm font-coco font-light text-white"
                        >
                          {item.title}
                        </Link>
                      </h3>
                    ))}
                    {slug?.tags?.length === 0 &&
                      "Brak podanych specjalizacji..."}
                  </div>
                </div>
                <div className="">
                  <h2 className="w-max rounded-lg text-xl text-black font-gotham mt-3">
                    Dostępność
                  </h2>
                  <div className="-ml-1 mt-1 flex items-center flex-wrap">
                    {slug?.preferences ? (
                      slug?.preferences?.map((item: any, i: any) => (
                        <h3
                          key={i}
                          className={`ml-1 mt-1 rounded-xl bg-primary duration-100 flex items-center px-2 py-0.5 text-sm font-coco font-light text-white`}
                        >
                          {item}
                        </h3>
                      ))
                    ) : (
                      <h3 className="text-black text-lg ml-2">
                        Brak danych o dostępności
                      </h3>
                    )}
                  </div>
                </div>
              </div>
              {slug?.bio && (
                <>
                  <h2 className="text-xl text-black drop-shadow-lg font-gotham mt-6">
                    Opis użytkownika
                  </h2>
                  <h3
                    className={`text-black text-base max-w-2xl my-3 ${
                      slug?.bio && ""
                    }`}
                  >
                    {slug?.bio ? slug?.bio : "Brak opisu..."}
                  </h3>
                </>
              )}
            </div>
          </div>
          {slug?.projects?.length > 0 && (
            <div className={`rounded-xl h-max w-full mt-3`}>
              <h2
                className={`text-3xl text-black drop-shadow-lg font-gotham mb-3`}
              >
                {slug?.seek && slug?.seek !== "ask" && "Portfolio"}
                {!slug?.seek && slug?.seek !== "ask" && "Aktywne oferty pracy"}
              </h2>
              <div>
                {slug?.projects?.map((project: IProject, i: any) => (
                  <ProjectCard key={i} project={project} isSlug={true} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="container mx-auto py-12 bg-white px-4">
        <div className="bg-white relative overflow-hidden">
          <div className="bg-gradient-to-r from-primary/40 to-cta/40 text-xl lg:text-3xl mx-auto rounded-xl">
            <h2 className="text-white font-gotham w-full text-center px-2 py-1 rounded-t-xl bg-gradient-to-r from-primary to-cta">
              Zobacz podobne profile
            </h2>
            <div className="p-2">
              <TalentList
                categoryTalents={talents.filter((item: any) =>
                  item?.tags?.find(
                    (tag: any) => tag.slugUrl === slug?.tags[0]?.slugUrl
                  )
                )}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export async function generateMetadata({ params }: { params: any }) {
  const talents = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/talents?tubylytylkofigi=${process.env.API_SECRET_KEY}`,
    { next: { revalidate: 60 } }
  ).then((res: any) => res.json());
  const slug = talents.find((item: any) => item.pseudo === params.slug);
  const talentTags = Array.from(
    new Set(slug?.tags?.map((item: any) => item.slugTitle))
  );
  const title = `Eksperci ${params.slug} | Zatrudnij do Pracy Zdalnej`;
  const description = `Sprawdź projekty ${params.slug} ${talentTags.join(
    ", "
  )}`;
  return {
    title,
    description,
    openGraph: {
      type: "website",
      url: `https://quixy.pl/talent/${params.slug}`,
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
      image: "/assets/woman-pc.webp",
    },
  };
}
