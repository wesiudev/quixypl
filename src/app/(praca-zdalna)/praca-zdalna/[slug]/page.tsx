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
import BlogPostList from "@/components/BlogPostList";
import { getProducts } from "@/firebase";
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
  const products: any = await getProducts();
  const talents = await getTalents();
  // const job_offers = await fetch(
  //   `${process.env.NEXT_PUBLIC_URL}/api/getOffersByCategory?tubylytylkofigi=${
  //     process.env.API_SECRET_KEY
  //   }&cat=${polishToEnglish(slug.title)}`,
  //   {
  //     method: "POST",
  //     cache: "no-store",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Accept: "application/json",
  //     },
  //     next: { revalidate: 360 },
  //   }
  // ).then((res) => {
  //   return res.json();
  // });
  return (
    <>
      <div className="bg-gray-200">
        <Header jobsList={jobs} />
        {/* Hero Section */}
        <div className="relative text-center text-white bg-black py-12 font-gotham">
          <Hero />
          <p
            style={{ textShadow: "2px 2px 2px black", lineHeight: 1.35 }}
            className="text-4xl mb-4 relative z-50 font-gotham"
          >
            <span className="bg-primary text-white p-1 mr-2">Praca Zdalna</span>

            {slug.title}
          </p>
          {/* <h2 className="text-2xl font-semibold mb-6">{slug.h2}</h2> */}
          <h2 className="text-lg  relative z-50 w-[90%] mx-auto sm:max-w-[40rem] ">
            Zainteresowany/a pracą zdalną w{" "}
            <span
              className="bg-primary text-white p-1 mr-1.5"
              style={{ textShadow: "2px 2px 2px black", lineHeight: 1.35 }}
            >
              {content?.genitive}?
            </span>
            Szukaj pracy lub dodaj ofertę pracy zdalnej i zatrudnij najlepszych
            ekspertów w Polsce.
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
            <button
              style={{ textShadow: "2px 2px 2px black" }}
              className="bg-cta text-white px-2 py-1.5 rounded-lg hover:bg-opacity-90"
            >
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
              loading="lazy"
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
                <p className="text-base 2xl:text-xl font-light mb-4 p-3 text-black">
                  Talent w {content?.genitive} to np.{" "}
                  {content?.synonyms[1]
                    ? content?.synonyms[1]
                    : content?.synonyms[0]}{" "}
                  - dodaj ogłoszenie w kategorii{" "}
                  <b className="text-cta">{slug.title}</b> i zatrudnij ekspertów
                  z tej dziedziny.
                </p>
                <div className="flex items-end justify-end w-full">
                  <Link
                    href="/register"
                    style={{ textShadow: "2px 2px 2px black" }}
                    className="text-white bg-[#126b91] font-bold p-2 rounded-br-lg rounded-tl-lg flex items-center"
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
                <p className="text-base 2xl:text-xl font-light mb-4 p-3 text-black">
                  Chcesz realizować projekty lub rozwijać swoje portfolio?
                  Przeglądaj ogłoszenia pracy zdalnej, dołącz do zespołu i twórz
                  innowacyjne rozwiązania.
                </p>
                <div className="flex items-end justify-end w-full">
                  <Link
                    href="/register"
                    style={{ textShadow: "2px 2px 2px black" }}
                    className="text-white bg-[#14A800] font-bold p-2 rounded-br-lg rounded-tl-lg flex items-center"
                  >
                    Stwórz konto talentu
                    <FaArrowRightLong className="ml-2" />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <h2 className="text-black mt-12 text-3xl lg:text-5xl font-gotham">
            {slug?.title}{" "}
            <span
              className="text-cta"
              style={{ textShadow: "2px 2px 2px black" }}
            >
              Oferty Pracy
            </span>
          </h2>

          <div className="bg-white rounded-xl p-3 mt-6 lg:mt-12 py-6 sm:py-12 lg:py-24">
            <div className=" rounded-full aspect-square mx-auto w-40 flex items-center justify-center">
              <TfiFlagAlt className="text-cta text-7xl" />
            </div>

            <p className="font-light text-black text-base font-gotham my-3 text-center max-w-xl mx-auto">
              Brak aktywnych ofert pracy zdalnej dla specjalistów w branży{" "}
              {content?.genitive}
            </p>
            <h3 className="flex flex-col text-white p-2 font-gotham font-light text-center mx-auto max-w-[332px] group">
              <Link
                href="/register"
                style={{ textShadow: "2px 2px 2px black" }}
                className="rounded-2xl bg-[#14a800] p-2 duration-100 group-hover:bg-opacity-80"
              >
                Bądź szybszy/a i dodaj ogłoszenie
              </Link>
              <Link
                href="/register"
                style={{ textShadow: "2px 2px 2px black" }}
                className="rounded-b-2xl bg-[#14a800] w-max max-w-[100%] mx-auto p-2 px-4 duration-100 group-hover:bg-opacity-80"
              >
                o pracę już dziś!
              </Link>
            </h3>
          </div>

          <div className="flex flex-row gap-6 my-16">
            <section className="text-left w-full lg:pr-24">
              <h2 className="text-3xl font-extrabold mb-6 text-black font-gotham">
                Czym zajmują się specjaliści pracujący w {content?.genitive}?
              </h2>

              <div
                className="text-black max-w-3xl markdownSlug font-light font-gotham"
                dangerouslySetInnerHTML={{
                  __html: content?.description,
                }}
              />
              <BlogPostList posts={products} />
            </section>
            <div className="flex flex-col">
              <h3
                style={{ lineHeight: 1.4 }}
                className="mt-6 bg-white p-6 rounded-t-xl text-3xl font-gotham text-black "
              >
                <b className="text-white bg-[#126b91] px-3 rounded-lg py-1">
                  {content?.nominative?.charAt(0).toUpperCase() +
                    content?.nominative?.slice(1)}
                </b>
                {" - "}
                Jak rozpocząć swoją przygodę?
              </h3>
              <span className=" text-black text-opacity-60 py-3 italic">
                Koniec ze starymi nawykami i prokrastynacją - dzięki{" "}
                {/* <Link href="/e-booki" className="text-primary underline"> */}
                e-bookom Quixy - już wkrótce!
                {/* </Link> */}
              </span>
              <p className="bg-[#126b91] text-white p-6 rounded-b-xl">
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
            </div>
          </div>
          {/* <h2 className="text-xl font-semibold text-primary mb-4">
          Najlepsi specjaliści {slug.title}
        </h2> */}
          {/* display users with seek:true and user?.categories includes slug.title, else display "no users, want to be first? man with black glasses italic" */}
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
