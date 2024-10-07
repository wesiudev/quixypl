import jobs from "../../../../../public/14.09.2024.json";
import Image from "next/image";
import { polishToEnglish } from "../../../../../utils/polishToEnglish";
import Link from "next/link";
import moment from "moment";
import Hero from "@/components/Hero";
import Header from "@/components/Header";
import MainFooter from "@/components/MainFooter";
import IdeaListSlug from "@/components/IdeaListSlug";
import { FaChevronRight } from "react-icons/fa";

export default async function Page({ params }: { params: { slug: string } }) {
  const slug = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/ideas?tubylytylkofigi=${
      process.env.API_SECRET_KEY
    }&name=${polishToEnglish(params.slug)}`
  ).then((res) => res.json());
  const ideas = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/getIdeas?tubylytylkofigi=${process.env.API_SECRET_KEY}`
  ).then((res) => res.json());

  return (
    <div>
      <Header jobsList={jobs} />
      <div className="relative bg-black sm:p-8 lg:p-16 xl:p-24">
        <Hero />
        <div className="bg-white text-black sm:rounded-xl breadcrumbs-container relative z-50 sm:mb-8 px-4">
          <ul className="breadcrumbs flex items-center flex-wrap">
            <h2 className="breadcrumb-title mr-2">
              <Link href="/business-ideas">Pomysły na biznes Quixy&trade;</Link>
            </h2>
            <FaChevronRight className="mr-2" />
            <li className="mr-2">
              <Link href={`/business-ideas/${params.slug}`} title={params.slug}>
                {slug.name}
              </Link>
            </li>
          </ul>
        </div>
        <div className="content-container bg-white p-6 grid grid-cols-1 w-full mx-auto relative z-50 sm:rounded-xl">
          <div className="flex items-center justify-between">
            <div className="flex items-start">
              <div className="text-white bg-orange-300 p-4 rounded-full mr-3 ">
                <Image
                  src="/assets/lightbulb.png"
                  width={224}
                  height={224}
                  alt="Logo serwisu quixy.pl"
                  className="w-16 h-auto"
                />
              </div>
              <div className="">
                <div className="italic font-light text-lg text-black">
                  Wygenerowano z AI Pomysły Quixy&trade;
                </div>
                <Link href="/business-ideas" className="font-bold text-primary">
                  Wypróbuj za darmo
                </Link>
              </div>
            </div>
            <Image
              src="/assets/quixy-logo.png"
              width={224}
              height={224}
              alt="Logo serwisu quixy.pl"
              className="w-auto h-16"
            />
          </div>
          <div
            className="mx-auto p-6 lg:p-12 2xl:p-24 mt-12 container flex text-black bg-white rounded-xl flex-col"
            style={{ boxShadow: "inset 0px 0px 5px black" }}
          >
            {slug?.photoURL && (
              <Image
                src={slug?.photoURL}
                width={256}
                height={256}
                alt="Idea image"
                className="rounded-l-xl w-48 mb-0"
              />
            )}

            <div className="flex flex-col h-max w-full">
              <div className="flex items-start justify-between mb-4">
                <h2 className="text-3xl lg:text-5xl">
                  {slug?.name || "Nie podano"}
                </h2>
                <div className="w-48 text-sm font-light !text-white bg-[#126b91] p-2 rounded-lg">
                  <div>Data Utworzenia</div>
                  <div>{moment(slug?.createdAt).format("DD-MM-yyyy")}</div>
                </div>
              </div>

              <p className="text-lg text-black">
                {slug?.content || "Brak opisu pomysłu..."}
              </p>
            </div>

            <section className="details-section mt-6">
              <h3 className="flex items-center text-lg">
                Szczegóły pomysłu{" "}
                <FaChevronRight className="text-primary ml-2" />
              </h3>
              <h3 className="text-2xl mt-4">Marketing</h3>
              <p className="text-lg font-light">
                {slug?.marketing || "Brak danych..."}
              </p>
            </section>

            {slug?.businessplan && (
              <section className="mt-6">
                <h2 className="section-title text-3xl">Plan Biznesowy</h2>
                <p className="text-lg font-light">
                  {slug?.businessplan || "Brak planu biznesowego..."}
                </p>
              </section>
            )}

            {slug?.staff && (
              <section className="mt-6">
                <h2 className="section-title text-xl">Zespół</h2>
                <p className="text-lg font-light">
                  {slug?.staff || "Brak zespołu..."}
                </p>
              </section>
            )}

            <section className="mt-6">
              <h2 className="section-title text-xl">
                Szacowany Czas Realizacji
              </h2>
              <p className="text-lg font-light">
                {slug?.estimatedRealizationTime || "Brak danych..."}
              </p>
            </section>
          </div>
          <IdeaListSlug ideas={ideas} />
        </div>
      </div>
      <MainFooter heading={"Zrealizuj pomysł z Quixy Talent"} jobsList={jobs} />
    </div>
  );
}

export async function generateMetadata({ params }: { params: any }) {
  const slug = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/ideas?tubylytylkofigi=${
      process.env.API_SECRET_KEY
    }&name=${`${polishToEnglish(params.slug)}`}`
  ).then((res) => res.json());

  const title = `Pomysły na biznes - ${slug?.name}`;
  const description = `Szukasz idealnego pomysłu na biznes? Sprawdź nowy pomysł - ${slug?.name}`;

  return {
    title,
    description,
    openGraph: {
      type: "website",
      url: `https://quixy.pl/business-ideas/${polishToEnglish(
        slug?.name
      )}${slug?.creationTime?.toString()}`,
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
