import Image from "next/image";
import { FaUser } from "react-icons/fa";
import Link from "next/link";
import moment from "moment";
import { IProject, JobPosting } from "@/types";
import ProjectCard from "@/components/Dashboard/ImageGenerator/dashboard/ProjectCard";
import UserStickyTop from "@/components/UserStickyTop";
import HireButton from "@/components/HireButton/HireButton";
import { IoLocationOutline } from "react-icons/io5";
import JobOfferCard from "@/components/Dashboard/JobOfferCard";
import { polishToEnglish } from "../../../../utils/polishToEnglish";
import Viewer from "@/components/AddJobOffer/Viewer";

export default async function Page(props: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<any>;
}) {
  const params = await props.params;
  const talent = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/talents/get?tubylytylkofigi=${
      process.env.API_SECRET_KEY
    }&pseudo=${polishToEnglish(params.slug)}`,
    {
      next: { revalidate: 60 },
    }
  ).then((res: any) => res.json());

  return (
    <div>
      <div className="fixed top-0 left-0 z-[100] w-full">
        <UserStickyTop slugData={talent} />
      </div>
      <div className="container relative mx-auto px-3 lg:px-12 bg-white">
        {/* Breadcrumbs with Icons */}
        <div className="bg-white py-6 grid grid-cols-1 h-max w-full mx-auto relative z-50">
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
            <div className="lg:block hidden w-max bg-gradient-to-r from-primary to-cta text-white italic rounded-xl text-lg font-coco font-extralight px-3 ">
              Quixy Talent&trade;
            </div>
          </div>
          <div>
            <div className="mt-6 w-full">
              <div className="flex justify-between w-full">
                <div className="flex flex-col w-full">
                  <div className="flex w-full">
                    <div className="flex w-max flex-col items-center">
                      {talent?.photoURL && (
                        <div className="">
                          <div className="relative w-24 aspect-square h-24">
                            <Image
                              src={talent?.photoURL}
                              width={256}
                              height={256}
                              alt=""
                              className="rounded-full mb-0 absolute inset-0 object-cover w-full h-full shadow-sm shadow-black"
                            />
                          </div>
                        </div>
                      )}
                      {!talent?.photoURL && (
                        <div className="flex flex-col items-center">
                          <div className="bg-[#126b91] aspect-square text-white flex items-center justify-center w-24 shadow-sm shadow-black">
                            <FaUser className="text-5xl" />
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="pl-3 lg:pl-6 w-full">
                      <div className="flex flex-col w-full">
                        <div className="text-black font-extrabold w-full flex justify-between">
                          <h2 className="text-xl lg:text-2xl">
                            {talent?.name ? talent?.name : "Nie podano"}
                          </h2>
                          <div className="w-max text-black flex flex-col">
                            {talent?.hourRate && (
                              <div className="w-max max-w-full font-coco rounded-3xl font-extrabold text-white bg-gradient-to-r from-primary to-cta px-2 py-1 text-center">
                                {talent?.hourRate} zł/h
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="text-black flex items-center">
                          <IoLocationOutline className="-ml-px text-xl mr-1" />{" "}
                          <h3>{talent?.city}, Polska</h3>
                        </div>
                      </div>
                      <h3 className="">
                        <span className="text-xl font-extrabold w-max max-w-full text-transparent bg-clip-text bg-gradient-to-r from-primary to-cta rounded-xl">
                          {talent?.title && talent?.title}
                        </span>
                      </h3>
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
                }  mt-3`}
              >
                <div className="mr-1">
                  <h2 className="w-max text-2xl text-black font-extrabold mt-3">
                    Specjalizacje
                  </h2>
                  <div className="w-full -ml-1 mt-1 flex flex-wrap items-center text-black">
                    {talent?.tags?.map((item: any, i: any) => (
                      <h3 className="" key={i}>
                        <Link
                          href={`/praca-zdalna/${item?.slugUrl}/${
                            item?.categoryUrl
                          }/${item?.url}/${polishToEnglish(talent?.city)}`}
                          className="badge bg-white badge-outline ml-1 mt-1 duration-100 flex items-center px-2 py-0.5"
                        >
                          {item.title}
                        </Link>
                      </h3>
                    ))}
                    {talent?.tags?.length === 0 &&
                      "Brak podanych specjalizacji..."}
                  </div>
                </div>
                <div className="">
                  <h2 className="w-max text-2xl text-black font-extrabold mt-3">
                    Dostępność
                  </h2>
                  <div className="w-full -ml-1 mt-1 flex flex-wrap items-center text-black">
                    {talent?.preferences ? (
                      talent?.preferences?.map((item: any, i: any) => (
                        <h3
                          key={i}
                          className={`badge bg-white badge-outline ml-1 mt-1 duration-100 flex items-center px-2 py-0.5`}
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
                <div className="mt-12 bg-gradient-to-r from-primary/10 to-cta/10 p-3">
                  <h2 className="text-2xl text-black drop-shadow-lg font-extrabold">
                    Opis użytkownika
                  </h2>
                  <div className={`text-black my-3`}>
                    <Viewer value={talent?.description} />
                  </div>
                </div>
              )}
            </div>
          </div>
          {talent?.projects?.length > 0 && (
            <div className={` h-max w-full mt-3`}>
              <h2
                className={`text-3xl text-black drop-shadow-lg font-gotham mb-3`}
              >
                {talent?.seek && talent?.seek !== "ask" && "Portfolio"}
                {!talent?.seek &&
                  talent?.seek !== "ask" &&
                  "Aktywne oferty pracy"}
              </h2>
              <div>
                {talent?.projects?.map((project: IProject, i: any) => (
                  <ProjectCard key={i} project={project} isSlug={true} />
                ))}
              </div>
            </div>
          )}
          {talent?.job_offers?.length > 0 &&
            talent?.job_offers?.filter(
              (jobOffer: JobPosting, i: number) => jobOffer.isPaid
            )?.length > 0 && (
              <div className={` h-max w-full mt-3`}>
                <h2
                  className={`text-xl text-black drop-shadow-lg font-gotham mb-3`}
                >
                  Aktywne oferty pracy
                </h2>
                <div>
                  {talent?.job_offers?.map((offer: JobPosting, i: any) => (
                    <div
                      key={offer.id}
                      className={`${!offer?.isPaid ? "hidden" : "block"}`}
                    >
                      <JobOfferCard
                        href={`/job-offer/${offer.title}-${offer.creationTime}`}
                        key={i}
                        offer={offer}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
        </div>
      </div>
      {/* <div className="container mx-auto py-12 bg-white px-4">
        <div className="bg-white relative overflow-hidden">
          <div className="bg-gradient-to-r from-primary/40 to-cta/40 text-xl lg:text-3xl mx-auto ">
            <h2 className="text-white font-gotham w-full text-center px-2 py-1  bg-gradient-to-r from-primary to-cta">
              Zobacz podobne profile
            </h2>
            <div className="p-2">
              <JobBoardList
                talents={talents}
                companies={companies}
                content={content}
              />
            </div>
          </div>
        </div>
      </div> */}
    </div>
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
    {
      next: { revalidate: 60 },
    }
  ).then((res: any) => res.json());

  const title = `${slug?.name} ${slug?.title}, ${slug?.city}`;
  const description = `Sprawdź projekty ${params.slug}`;
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
