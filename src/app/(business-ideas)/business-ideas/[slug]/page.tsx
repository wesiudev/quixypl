import jobs from "../../../../../public/14.09.2024.json";
import { polishToEnglish } from "../../../../../utils/polishToEnglish";
import Link from "next/link";
import moment from "moment";
import Header from "@/components/Header";
import MainFooter from "@/components/MainFooter";
import IdeaListSlug from "@/components/IdeaListSlug";
import UserStickyTop from "@/components/UserStickyTop";

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
    <div className="bg-gray-200">
      <Header jobsList={jobs} />
      <div className="sm:px-4 mx-auto container relative font-gotham">
        <div className="font-light pt-6 sm:py-2 sm:mt-8 breadcrumbs mx-auto bg-white text-black sm:rounded-xl relative z-50 sm:mb-8 px-4">
          <ul className="flex items-center flex-wrap">
            <li className="mr-2">
              <Link href="/business-ideas">business-ideas</Link>
            </li>
            <li className="mr-2">
              <Link href={`/business-ideas/${params.slug}`} title={params.slug}>
                {polishToEnglish(slug.name)}
              </Link>
            </li>
          </ul>
        </div>
        <div className="pt-6 sm:pt-8 container bg-white px-4 sm:p-8 grid grid-cols-1 w-full mx-auto relative z-50 sm:rounded-xl">
          <div className="mx-auto container flex text-black bg-white rounded-xl flex-col">
            <div className="flex flex-col h-max w-full">
              <div className="flex items-start justify-between mb-4">
                <h1 className="text-2xl sm:text-3xl lg:text-5xl pr-4">
                  {slug?.name || "Nie podano"}
                </h1>
                <div className="w-max text-sm font-light !text-white bg-[#126b91] p-2 rounded-lg">
                  <span className="font-bold">Dodano</span>
                  <div className="w-max">
                    {moment(slug?.creationTime).format("DD-MM-yyyy")}
                  </div>
                </div>
              </div>
              <h3 className="flex items-center text-xl text-white bg-gradient-to-r from-primary to-cta px-3 py-2 w-max rounded-lg">
                Opis projektu
              </h3>
              <p className="text-lg font-light mt-2">
                {slug?.content || "Brak opisu pomysłu..."}
              </p>
            </div>

            <section className="mt-6">
              <h3 className="flex items-center text-xl text-white bg-gradient-to-r from-primary to-cta px-3 py-2 w-max rounded-lg">
                Szczegóły projektu
              </h3>
              <h3 className="text-base text-black w-max mt-6">Marketing</h3>
              <p className="text-lg font-light mt-1 ">
                {slug?.marketing || "Brak danych..."}
              </p>
            </section>

            {slug?.businessplan && (
              <section className="mt-6">
                <h2 className="text-base text-black w-max">Plan Biznesowy</h2>
                <p className="text-lg font-light mt-1 ">
                  {slug?.businessplan || "Brak planu biznesowego..."}
                </p>
              </section>
            )}

            {slug?.staff && (
              <section className="mt-6">
                <h2 className="text-base text-black w-max">Zespół</h2>
                <p className="text-lg font-light mt-1 ">
                  {slug?.staff || "Brak zespołu..."}
                </p>
              </section>
            )}

            <section className="mt-6">
              <h2 className="text-base text-black w-max">
                Szacowany Czas Realizacji
              </h2>
              <p className="text-lg font-light mt-1 ">
                {slug?.estimatedRealizationTime || "Brak danych..."}
              </p>
            </section>
          </div>
          <div className="mt-6">
            <h2 className="text-base text-black w-max">Tagi</h2>
            <p className="mt-1 text-black font-light font-gotham">
              {slug?.tags.join(", ")}
            </p>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4">
        <IdeaListSlug ideas={ideas} />
      </div>
      <UserStickyTop isIdea={true} slugData={slug}/>
      <MainFooter heading={"Zrealizuj pomysł z Quixy Talent"} jobsList={jobs} />
    </div>
  );
}

export async function generateMetadata({ params }: { params: any }) {
  const slug = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/ideas?tubylytylkofigi=${
      process.env.API_SECRET_KEY
    }&name=${polishToEnglish(params.slug)}`
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
