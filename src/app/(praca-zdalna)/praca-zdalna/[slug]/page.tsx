import Link from "next/link";
import { polishToEnglish } from "../../../../../utils/polishToEnglish";
import jobs from "../../../../../public/14.09.2024.json";
import SlugFooter from "@/components/SlugFooter";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import { FaArrowRightLong } from "react-icons/fa6";
import { getPageContent } from "@/lib/getPageContent";
import Image from "next/image";
import { TfiFlagAlt } from "react-icons/tfi";
import { getTalents } from "../../../../../utils/getTalents";
export async function generateStaticParams() {
  return jobs.flatMap((service: any) => ({
    slug: polishToEnglish(service.title),
  }));
}
export default async function Page({ params }: { params: any }) {
  const slug: any = jobs.find(
    (page: any) => polishToEnglish(page.title) === params.slug
  );
  const content = await getPageContent(polishToEnglish(slug.title));
  const talents = await getTalents();
  return (
    <>
      <div className="bg-gray-200">
        <Header jobsList={jobs} />
        {/* Hero Section */}
        <div className="relative overflow-hidden text-center text-white bg-zinc-800 py-12 !font-coco">
          <Hero />
          <p className="text-4xl font-bold mb-4 relative z-50 font-coco">
            Praca Zdalna Quixy - <b className="text-orange-500">{slug.title}</b>
          </p>
          {/* <h2 className="text-2xl font-semibold mb-6">{slug.h2}</h2> */}
          <h2 className="text-lg  relative z-50 w-[90%] mx-auto sm:max-w-[40rem] font-coco">
            Poszukujesz specjalistów zajmujących się{" "}
            <b className="text-orange-500">{content?.instrumental}</b>? Dodaj
            ofertę pracy zdalnej i zatrudnij najlepszych ekspertów w Polsce.
          </h2>
          <div className="px-6 sm:px-12 breadcrumbs text-sm bg-transparent mb-3 mx-auto relative z-50">
            <ul className="flex items-center justify-center flex-wrap font-light">
              <li>
                <Link title="praca zdalna" href={`/praca-zdalna`}>
                  praca-zdalna
                </Link>
              </li>
              <li>
                <Link
                  title={`praca zdalna ${params.slug}`}
                  href={`/praca-zdalna/${params.slug}`}
                >
                  {params.slug}
                </Link>
              </li>
            </ul>
          </div>
          <Link href="/register" className="relative z-50">
            <button className="bg-orange-500 text-white font-semibold px-6 py-3 rounded-lg hover:bg-orange-600">
              Dodaj ofertę pracy
            </button>
          </Link>
        </div>

        {/* Subcategories */}
        <div className="container mx-auto px-6">
          <div className="p-6 rounded-3xl bg-white w-full h-full mx-auto grid grid-cols-1 lg:grid-cols-2 lg:gap-24 mt-12 lg:mt-24">
            <Image
              src={`/slug/${polishToEnglish(slug.title)}.webp`}
              width={1024}
              height={1024}
              alt={`Prace Zdalne w ${content?.genitive}`}
              style={{ boxShadow: "0px 0px 8px black" }}
              className="rounded-full w-full h-auto mb-6 lg:mb-0"
            />
            <div className="flex flex-col w-full justify-center font-gotham">
              <h1 className="text-2xl lg:text-4xl text-black  drop-shadow-md">
                Szukaj pracy zdalnej lub dodaj ofertę pracy w{" "}
                {content?.genitive}. Najlepsi {content?.informal_title_plural}{" "}
                czekają na zlecenia.
              </h1>
              <div
                style={{ boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.5)" }}
                className="mt-12 bg-white rounded-lg text-white"
              >
                <h2 className="font-light italic p-2 bg-black rounded-tl-lg rounded-br-lg w-max text-sm">
                  Rekrutuj do pracy zdalnej
                </h2>
                <p className="text-base 2xl:text-xl font-light mb-4 p-3 text-zinc-800">
                  Chcesz znaleźć idealnych kandydatów do swojego projektu? Dodaj
                  ogłoszenie w kategorii {slug.title} i zatrudnij ekspertów z
                  tej dziedziny.
                </p>
                <div className="flex items-end justify-end w-full">
                  <Link
                    href="/register"
                    className="text-white bg-orange-500 font-bold p-2 rounded-br-lg rounded-tl-lg flex items-center"
                  >
                    Stwórz konto klienta
                    <FaArrowRightLong className="ml-2" />
                  </Link>
                </div>
              </div>
              <div
                style={{ boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.5)" }}
                className="mt-12 bg-white rounded-lg text-white"
              >
                <h2 className="font-light italic p-2 bg-black rounded-tl-lg rounded-br-lg w-max text-sm">
                  Szukaj pracy zdalnej
                </h2>
                <p className="text-base 2xl:text-xl font-light mb-4 p-3 text-zinc-800">
                  Chcesz realizować projekty lub rozwijać swoje portfolio?
                  Przeglądaj ogłoszenia w kategorii {slug.title}, dołącz do
                  zespołu i twórz innowacyjne rozwiązania.
                </p>
                <div className="flex items-end justify-end w-full">
                  <Link
                    href="/register"
                    className="text-white bg-cyan-500 font-bold p-2 rounded-br-lg rounded-tl-lg flex items-center"
                  >
                    Stwórz konto talentu
                    <FaArrowRightLong className="ml-2" />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <h2 className="text-black mt-12 text-3xl lg:text-5xl font-bold font-coco">
            {slug?.title}{" "}
            <strong className="text-orange-500">Praca Zdalna</strong>
          </h2>
          <div className="bg-white rounded-xl p-3 mt-6 lg:mt-12 py-6 sm:py-12 lg:py-24">
            <div className="bg-orange-500 rounded-full aspect-square mx-auto w-40 flex items-center justify-center">
              <TfiFlagAlt className="text-white text-7xl" />
            </div>

            <p className="font-light text-black text-base font-gotham my-3 text-center max-w-xl mx-auto">
              Brak aktywnych ofert pracy zdalnej dla specjalistów w branży{" "}
              {content?.genitive}
            </p>
            <h3 className="flex flex-col text-white p-2 font-gotham font-light text-center mx-auto max-w-[332px] group">
              <Link
                href="/register"
                className="rounded-2xl bg-orange-500 p-2 duration-100 group-hover:bg-green-500"
              >
                Bądź szybszy/a i dodaj ogłoszenie
              </Link>
              <Link
                href="/register"
                className="rounded-b-2xl bg-orange-500 w-max max-w-[100%] mx-auto p-2 px-4 duration-100 group-hover:bg-green-500"
              >
                o pracę już dziś!
              </Link>
            </h3>
          </div>
          <div className="flex flex-row gap-6 my-16">
            <section className="text-left w-full lg:pr-24">
              <h2 className="text-3xl font-extrabold mb-6 text-black  font-gotham">
                Jak wyglądają codzienne zadania w pracy zdalnej specjalistów od{" "}
                {content?.genitive}?
              </h2>

              <div
                className="text-zinc-800 max-w-3xl markdownSlug font-light font-gotham"
                dangerouslySetInnerHTML={{
                  __html: content?.description,
                }}
              />
              <div className="mt-12">
                <h3
                  style={{ lineHeight: 1.4 }}
                  className="text-3xl font-gotham text-black  mb-3"
                >
                  Odwiedź naszego bloga o tematyce poświęconej nie tylko{" "}
                  {content?.dative}
                  {", "} ale także pracy zdalnej.
                </h3>
                <Link
                  href="https://wesiudev.com/pl"
                  target="_blank"
                  title="zobacz autora bloga"
                >
                  <Image
                    src="/assets/wesiudev3.png"
                    width={224}
                    height={224}
                    alt="Logo serwisu wesiudev.com"
                    className="w-32 h-auto"
                  />
                </Link>
                <p className="mt-3 text-black font-gotham font-light">
                  Brak nowych postów... Stay tuned 😎
                </p>
              </div>
            </section>
            <div className="flex flex-col max-w-[30rem]">
              <h3
                style={{ lineHeight: 1.4 }}
                className="bg-white p-6 rounded-t-xl text-3xl font-gotham text-black "
              >
                <b className="text-white bg-orange-500 px-3 rounded-lg py-1">
                  {content?.nominative?.charAt(0).toUpperCase() +
                    content?.nominative?.slice(1)}
                </b>
                {" - "}
                Jak rozpocząć swoją przygodę?
              </h3>
              <span className="font-coco text-black text-opacity-60 py-3 italic">
                Koniec ze starymi nawykami i prokrastynacją - dzięki{" "}
                {/* <Link href="/e-booki" className="text-orange-500 underline"> */}
                e-bookom Quixy - już wkrótce!
                {/* </Link> */}
              </span>
              <p className="bg-orange-500 text-white p-6 rounded-b-xl">
                Tworzymy kursy oraz poradniki dotyczące pracy w{" "}
                {content?.genitive} oraz innych zawodach pracy zdalnej. Jeśli
                posiadasz jakiś problem, chcesz być na bieżąco z wszystkimi
                tematami lub chcesz z nami współpracować, to zapraszamy do
                kontaktu poprzez zakładkę{" "}
                <Link href="/contact" className="underline">
                  Kontakt
                </Link>
                .
              </p>
              <div className="mt-6">
                <h2 className="text-black font-gotham mb-3">
                  Kategorie Pracy Zdalnej
                </h2>
                {slug?.data.map((job: any) => (
                  <h3 key={job.title} className="">
                    <Link
                      title={`${job.title} Praca Zdalna`}
                      className="text-black font-coco items-center"
                      href={`/praca-zdalna/${polishToEnglish(
                        slug?.title
                      )}/${polishToEnglish(job.title)}`}
                      key={job.title}
                    >
                      {job.title}
                    </Link>
                  </h3>
                ))}
              </div>
              <div className="mt-6">
                <h2 className="text-black font-gotham mb-3">
                  Specjaliści {content?.genitive}
                </h2>
                <div className="flex items-center flex-wrap -ml-2">
                  {talents
                    ?.filter((item) => item?.pseudo && item?.seek)
                    .map((talent: any) => (
                      <Link
                        href={`/talent/${talent.pseudo}`}
                        className="flex items-center ml-2"
                        key={talent?.uid}
                      >
                        {talent?.photoURL ? (
                          <div className="w-12 aspect-square rounded-lg p-3 bg-orange-500">
                            <div
                              className="rounded-lg"
                              style={{ boxShadow: "0px 0px 4px black" }}
                            >
                              <Image
                                src={talent?.photoURL}
                                width={224}
                                height={224}
                                alt={`Zdjęcie talentu ${
                                  talent?.name || talent?.pseudo
                                }`}
                                className="rounded-lg"
                              />
                            </div>
                          </div>
                        ) : (
                          <span className="w-12 aspect-square mr-2 rounded-full bg-white flex items-center justify-center text-2xl text-orange-500">
                            {talent?.name?.[0].toUpperCase() ||
                              talent?.pseudo?.[0].toUpperCase()}
                          </span>
                        )}
                      </Link>
                    ))}
                </div>
              </div>
            </div>
          </div>
          {/* <h2 className="text-xl font-semibold text-orange-500 mb-4">
          Najlepsi specjaliści {slug.title}
        </h2> */}
          {/* display users with seek:true and user.categories includes slug.title, else display "no users, want to be first? man with black glasses italic" */}
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

export async function generateMetadata({ params }: { params: any }) {
  const slug: any = jobs.find(
    (page: any) => polishToEnglish(page.title) === params.slug
  );
  const content = await getPageContent(polishToEnglish(slug.title));
  const title = `Praca zdalna w ${content?.genitive} | Zatrudnij ekspertów do Pracy Zdalnej`;
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
