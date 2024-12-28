import Image from "next/image";
import { FaUser } from "react-icons/fa";
import Link from "next/link";
import { IProject } from "@/types";
import ProjectCard from "@/components/Dashboard/ImageGenerator/dashboard/ProjectCard";
import UserStickyTop from "@/components/UserStickyTop";
import HireButton from "@/components/HireButton/HireButton";
import { IoLocationOutline } from "react-icons/io5";
import { polishToEnglish } from "../../../../utils/polishToEnglish";
import Viewer from "@/components/AddJobOffer/Viewer";
import JobBoardList from "@/components/JobBoardList";

export default async function Page(props: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<any>;
}) {
  const params = await props.params;
  const talent = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/talents/get?tubylytylkofigi=${
      process.env.API_SECRET_KEY
    }&pseudo=${polishToEnglish(params.slug)}`,
    { cache: "no-store" }
  ).then((res: any) => res.json());
  const talents = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/getSimilarTalents?tubylytylkofigi=${process.env.API_SECRET_KEY}&id=${talent.uid}`,
    { cache: "no-store" }
  ).then((res: any) => res.json());
  const companies = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/getSimilarCompanies?tubylytylkofigi=${process.env.API_SECRET_KEY}&id=${talent.uid}`,
    { cache: "no-store" }
  ).then((res: any) => res.json());
  return (
    <>
      <div className={`relative h-full font-sans`}>
        <div
          className={`${
            !talent?.access
              ? "flex-col fixed top-0 left-0 z-[999] w-full h-full flex items-center justify-center bg-gradient-to-b from-accentStart/70 to-accentEnd/70"
              : "hidden"
          }`}
        >
          <div className="px-6 w-max max-w-full">
            <div className="w-max max-w-full flex flex-col bg-white p-6 rounded-lg ">
              <h2 className="w-full font-extrabold text-2xl">
                Wyświetl się w platformie Quixy
              </h2>
              <p className="w-full mt-1.5">
                Jesteś właścicielem tego profilu? Dokończ konfigurację lub opłać
                wpisowe.
              </p>
              <div className="mt-3 bg-gray-200 rounded-lg px-3 py-6 relative">
                {talent?.hourRate && (
                  <div className="absolute right-0 top-0 rounded-tr-md rounded-bl-xl block w-max max-w-full text-sm font-coco font-extrabold text-white bg-gradient-to-b from-ctaStart to-ctaEnd px-2 py-1 text-center">
                    {talent?.hourRate} zł/h
                  </div>
                )}
                <div className="flex flex-col w-full">
                  <div className="flex flex-col items-center justify-center w-full">
                    <div className="flex w-max flex-col items-center">
                      {talent?.photoURL && (
                        <div className="relative h-20 w-20 sm:w-24 sm:h-24 aspect-square">
                          <Image
                            src={talent?.photoURL}
                            width={256}
                            height={256}
                            alt=""
                            className="rounded-full mb-0 absolute inset-0 object-cover w-full h-full shadow-sm shadow-black"
                          />
                        </div>
                      )}
                      {!talent?.photoURL && (
                        <div className="flex flex-col items-center">
                          <div className="bg-gradient-to-r from-primary to-cta rounded-full aspect-square text-white flex items-center justify-center w-16 h-16 sm:w-24 sm:h-24 shadow-sm shadow-black">
                            <FaUser className="text-3xl sm:text-5xl" />
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="w-full flex items-center justify-center flex-col text-center">
                      <div>
                        <h2 className="lg:text-2xl mt-2">
                          {talent?.name ? talent?.name : "Brak nazwy"}
                        </h2>

                        {talent?.city && (
                          <div className="text-black flex items-center justify-center text-center">
                            <IoLocationOutline className="text-xl mr-1" />{" "}
                            <h3>{talent?.city}, Polska</h3>
                          </div>
                        )}
                      </div>
                      {talent?.title && (
                        <h3>
                          <span className="text-sm sm:text-base mt-1 block font-extrabold w-max max-w-full text-white rounded-md py-0.5 px-1 bg-gradient-to-b from-accentStart to-accentEnd">
                            {talent?.title}
                          </span>
                        </h3>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <Link
                href="/user"
                className="mx-auto text-center w-max max-w-full block mt-3 font-bold font-coco text-white py-2 px-4 rounded-md bg-gradient-to-r from-ctaStart to-ctaEnd"
              >
                Przejdź do panelu
              </Link>
            </div>
          </div>
        </div>
        <div className="fixed bottom-0 left-0 z-[100] w-full">
          <UserStickyTop slugData={talent} />
        </div>
        <div className="container px-4 lg:px-12 relative mx-auto bg-white">
          <div className="bg-white py-6 grid grid-cols-1 h-max w-full mx-auto relative z-50">
            <div>
              <div className="mt-6 w-full">
                <div className="flex justify-between w-full">
                  <div className="flex flex-col w-full">
                    <div className="flex w-full">
                      <div className="flex w-max flex-col items-center">
                        {talent?.photoURL && (
                          <div className="relative h-20 w-20 sm:w-24 sm:h-24 aspect-square">
                            <Image
                              src={talent?.photoURL}
                              width={256}
                              height={256}
                              alt=""
                              className="rounded-full mb-0 absolute inset-0 object-cover w-full h-full shadow-sm shadow-black"
                            />
                          </div>
                        )}
                        {!talent?.photoURL && (
                          <div className="flex flex-col items-center">
                            <div className="bg-gradient-to-b from-primaryStart to-primaryEnd rounded-full aspect-square text-white flex items-center justify-center w-16 h-16 sm:w-24 sm:h-24 shadow-sm shadow-black">
                              <FaUser className="text-3xl sm:text-5xl" />
                            </div>
                          </div>
                        )}
                      </div>
                      <div className="pl-3 lg:pl-6 w-full">
                        <div className="flex flex-col w-full">
                          <div className="text-black font-extrabold w-full flex justify-between">
                            <h2 className="text-xl lg:text-2xl pr-2">
                              {talent?.name ? talent?.name : "Nie podano"}
                            </h2>
                            {talent?.hourRate && (
                              <div className="block w-max max-w-full font-coco font-extrabold text-white bg-gradient-to-b from-ctaStart to-ctaEnd rounded-md px-3 py-1 text-center">
                                {talent?.hourRate} zł/h
                              </div>
                            )}
                          </div>
                          {talent?.city && (
                            <div className="text-black flex items-center">
                              <IoLocationOutline className="-ml-px text-xl mr-1" />{" "}
                              <h3>{talent?.city}, Polska</h3>
                            </div>
                          )}
                        </div>
                        {talent?.title && (
                          <h3>
                            <span className="mt-1 block font-extrabold w-max max-w-full text-white rounded-md py-0.5 px-1 bg-gradient-to-b from-accentStart to-accentEnd">
                              {talent?.title}
                            </span>
                          </h3>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-full flex justify-between mt-3 lg:mt-6">
                  <HireButton talentSlugData={talent} />
                </div>
                <div
                  className={`grid ${
                    talent?.tags?.length > 10
                      ? "grid-cols-1"
                      : "grid-cols-1 lg:grid-cols-2"
                  } gap-3 mt-3`}
                >
                  <div>
                    <h2 className="w-max text-2xl text-black font-extrabold mt-3">
                      Specjalizacje
                    </h2>
                    <div className="w-full -ml-1 mt-1 flex flex-wrap items-center text-black">
                      {talent?.tags?.map((item: any, i: any) => (
                        <h3 className="" key={i}>
                          <Link
                            href={`/praca-zdalna/${item?.slugUrl}/${
                              item?.categoryUrl
                            }/${item?.url}/${
                              talent?.city ? polishToEnglish(talent?.city) : ""
                            }`}
                            className="rounded-md text-xs sm:text-sm lg:text-base bg-gradient-to-b from-primaryHoverStart to-primaryHoverEnd p-2 text-white ml-1 mt-1 duration-100 flex items-center px-2 py-0.5"
                          >
                            {item.title}
                          </Link>
                        </h3>
                      ))}
                      {talent?.tags?.length === 0 &&
                        "Brak podanych specjalizacji..."}
                    </div>
                  </div>
                  <div>
                    <h2 className="w-max text-2xl text-black font-extrabold mt-3">
                      Dostępność
                    </h2>
                    <div className="w-full -ml-1 mt-1 flex flex-wrap items-center">
                      {talent?.preferences ? (
                        talent?.preferences?.map((item: any, i: any) => (
                          <h3
                            key={i}
                            className={`rounded-md text-xs sm:text-sm lg:text-base bg-gradient-to-b from-primaryHoverStart to-primaryHoverEnd p-2 text-white ml-1 mt-1 duration-100 flex items-center px-2 py-0.5`}
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
                {talent?.description && (
                  <>
                    <h2 className="mt-3 text-2xl text-black font-extrabold">
                      Opis
                    </h2>
                    <div className="mt-2 bg-gradient-to-r from-primary/30 to-cta/30 p-3">
                      <div className={`text-black my-3 reset`}>
                        <Viewer value={talent?.description} displayBlack />
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
            {talent?.projects?.filter((project: IProject) => project?.isPaid)
              .length > 0 && (
              <div
                className={`py-12 bg-gradient-to-r from-primary to-cta h-max w-full mt-12 px-3 lg:px-12`}
              >
                <h2
                  className={`text-3xl text-white drop-shadow-lg font-extrabold mb-6`}
                >
                  Usługi
                </h2>
                <div className="gap-3">
                  {talent?.projects?.map((project: IProject, i: any) => (
                    <ProjectCard
                      key={i}
                      project={project}
                      isSlug={true}
                      slug={talent}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="container mx-auto py-12 bg-white px-4 lg:px-12">
          <div className="bg-white relative overflow-hidden">
            <h2 className="text-black w-full text-xl lg:text-2xl font-extrabold">
              Zobacz podobne profile
            </h2>
            <div className="mt-3">
              <JobBoardList talents={talents} companies={companies} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;
  const slug = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/talents/get?tubylytylkofigi=${
      process.env.API_SECRET_KEY
    }&pseudo=${polishToEnglish(params.slug)}`,
    { cache: "no-store" }
  ).then((res: any) => res.json());

  const title = !slug?.googleTitle
    ? `${slug?.title} - ${slug?.name} | ${slug?.city}`
    : slug?.googleTitle;
  const description = !slug.googleDescription
    ? `Profile z ofertami usług - ${slug?.title} - ${slug.name} | ${
        slug?.tags[0]?.title || ""
      } ${slug?.tags[1]?.title || ""} ${slug?.tags[2]?.title || ""} ${
        slug?.tags[3]?.title || ""
      } ${slug?.tags[4]?.title || ""} ${slug?.tags[5]?.title || ""} ${
        slug?.tags[6]?.title || ""
      } ${slug?.tags[7]?.title || ""}`
    : slug.googleDescription;
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
          url: slug?.photoURL || "/favicons/android-chrome-192x192.png",
        },
      ],
    },
    twitter: {
      cardType: "summary_large_image",
      site: "@quixy",
      title,
      description,
      image: {
        url: slug?.photoURL || "/favicons/android-chrome-192x192.png",
      },
    },
  };
}
