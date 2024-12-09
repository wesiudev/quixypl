import Link from "next/link";
import { polishToEnglish } from "../../../../../../utils/polishToEnglish";
import jobs from "../../../../../../public/14.09.2024.json";
import MainFooter from "@/components/MainFooter";
import Header from "@/components/Header";
import { getPageContent } from "@/lib/getPageContent";
import BlogPostList from "@/components/BlogPostList";
import { getDocuments, getProducts } from "@/firebase";
import JobBoardList from "@/components/JobBoardList";
import Market from "@/components/marketplace/Market";
import { removePolishSignsAndSpaces } from "@/lib/removePolish";
import Viewer from "@/components/AddJobOffer/Viewer";
import Image from "next/image";
export async function generateStaticParams() {
  return jobs
    .flatMap((service: any) =>
      service.data.flatMap((subItem: any) => subItem.data)
    )
    .map((item: any) => ({ job: polishToEnglish(item.title) }));
}
export default async function Page(props: { params: Promise<any> }) {
  const params = await props.params;
  const offers = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/offers?tubylytylkofigi=${process.env.API_SECRET_KEY}&category=${params.job}`,
    {
      next: { revalidate: 60 },
    }
  ).then((res) => res.json());
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
  const allCities = Array.from(
    new Set([
      ...talents.map((item: any) => item?.city),
      ...companies.map((item: any) => item?.city),
    ])
  );
  const content = await getPageContent(polishToEnglish(params.job));
  const products: any = await getProducts();
  const leads: any = await getDocuments("services");
  return (
    <>
      <Header jobsList={jobs} />
      <div className="min-h-screen flex flex-col w-full">
        {/* Header */}
        {/* Job Title Section */}
        <section
          className="p-4 text-left overflow-hidden relative bg-gradient-to-r from-primary to-cta"
          style={{ boxShadow: "inset 0px 0px 10px rgba(0, 0, 0, 0.5)" }}
        >
          <div className="absolute left-0 top-0 w-full h-auto">
            <Image
              src="/assets/AI-Image.png"
              width={1024}
              height={1024}
              alt=""
              className="w-full h-full object-cover opacity-5"
            />
          </div>
          <div className="text-xs relative z-50 mx-auto container p-4 lg:p-12">
            <div className="!text-white breadcrumbs relative z-50">
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
                <li>
                  <Link
                    title={`Podkategoria Praca Specjaliści ${params.category}`}
                    href={`/praca-zdalna/${params.slug}/${params.category}`}
                  >
                    {params.category}
                  </Link>
                </li>
                <li>
                  <Link
                    title={`Oferty Pracy Zlecenia Freelancerzy Firmy ${params.job}`}
                    href={`/praca-zdalna/${params.slug}/${params.category}/${params.job}`}
                  >
                    {params.job}
                  </Link>
                </li>
              </ul>
            </div>
            <p
              style={{ lineHeight: 1.5 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-3 leading-snug w-full text-white"
            >
              Freelancer Job Boards
            </p>
            <h1 className="lg:text-lg font-coco text-white max-w-3xl">
              Zlecenia, usługi, oferty pracy zdalnej oraz najlepsi{" "}
              {content?.informal_title_plural}
            </h1>
            <div className="mt-5"></div>
            <div className="flex w-max">
              <Link
                className="hover:underline text-white hover:bg-opacity-90 py-2 pr-4 font-extrabold w-max mx-auto relative z-50"
                href="/register"
              >
                Wpisz się
              </Link>
              <Link
                className="rounded-r-xl bg-gradient-to-r from-transparent to-cta text-white hover:bg-opacity-90 py-2 px-4 font-extrabold w-max mx-auto relative z-50"
                href="/register"
              >
                Dodaj ofertę
              </Link>
            </div>
          </div>
        </section>
        <div className="my-12 w-full mx-auto container px-4 lg:px-12 flex flex-col">
          <JobBoardList
            talents={talents}
            companies={companies}
            content={content}
          />
        </div>
        {/* <div className="bg-gradient-to-r from-primary to-cta">
          <div className="mx-auto container p-4 lg:p-12">
            <h2 className="font-extrabold text-white text-xl lg:text-2xl">
              Oferty pracy w{" "}
              <span className="">{content?.genitive?.toLowerCase()}</span>{" "}
            </h2>
            <p className="text-white mt-2">
              Szukasz pracy jako{" "}
              {content?.informal_title_singular.toLowerCase()}?
            </p>
            <JobOffers offers={offers} content={content} />
          </div>
        </div> */}
        {/* Services Section */}
        <div id="search">
          <Market leads={leads} />
        </div>
        {/* Content */}
        <div className="flex flex-col lg:flex-row">
          <section className="text-left">
            <h2
              style={{ lineHeight: 1.5 }}
              className="font-extrabold text-black text-xl lg:text-3xl"
            >
              Czym zajmują się
              <span className="ml-2 text-black">
                {content?.informal_title_plural.toLowerCase()}?
              </span>
            </h2>
            <div
              className="text-black max-w-3xl markdownSlug font-light font-coco"
              dangerouslySetInnerHTML={{
                __html: content?.description,
              }}
            />
            <BlogPostList posts={products} />
          </section>
        </div>
        {/* <div className="my-12">
          <Viewer value={content?.salary} />
        </div> */}
        <div className="bg-white py-12 flex flex-col w-full text-black">
          <h4 className="text-lg w-max font-extrabold">Tagi</h4>
          <ul className="text-xs lg:text-base flex items-center flex-wrap gap-2">
            {content?.synonyms.map((item: any, i: any) => (
              <li key={i} className={``}>
                #{removePolishSignsAndSpaces(item.toLowerCase())}
              </li>
            ))}
            <li>#znajdzprace</li>
            <li>#rekrutacja</li>
            <li>#pracazdalna</li>
            <li>#firmy{removePolishSignsAndSpaces(content?.genitive)}</li>
            <li>#freelancer</li>
            <li>#jobboards</li>
            <li>#joboffers</li>
            <li>#ofertypracy</li>
            <li>#ogloszeniaoprace</li>
            <li>#ogloszeniapracy</li>
            <li>
              #
              {removePolishSignsAndSpaces(
                content?.informal_title_plural.toLowerCase()
              )}
            </li>
            <li>
              #
              {removePolishSignsAndSpaces(
                content?.informal_title_singular.toLowerCase()
              )}
            </li>
            <li>#{removePolishSignsAndSpaces(content?.title.toLowerCase())}</li>
          </ul>
        </div>
        <div className="my-12">
          <Viewer value={content?.salary} />
        </div>
        <div className="mb-12 grid grid-cols-2 lg:grid-cols-3">
          {allCities.map((city: any, i: any) => (
            <Link
              key={city}
              target="_blank"
              href={`/praca-zdalna/${params.slug}/${params.category}/${
                params.job
              }/${polishToEnglish(city)}`}
            >
              <h2 className="text-black font-bold">
                {content?.informal_title_plural} {city}
              </h2>
            </Link>
          ))}
        </div>
      </div>
      <MainFooter jobsList={jobs} />
    </>
  );
}

export async function generateMetadata(props: { params: Promise<any> }) {
  const params = await props.params;
  const category = jobs
    .flatMap((service: any) =>
      service.data.flatMap((subItem: any) => ({ category: subItem.title }))
    )
    .find(
      (item: any) => polishToEnglish(item.category) === params.category
    ).category;
  const job = jobs
    .flatMap((service: any) =>
      service.data.flatMap((subItem: any) => subItem.data)
    )
    .map((item: any) => ({ title: item.title }))
    .find((item) => polishToEnglish(item.title) === params.job);
  const title = `${job?.title} Oferty Pracy, Zlecenia, Specjaliści i Usługi`;
  const description = `Przeglądaj nasze oferty pracy zdalnej jako ${job?.title} w kategorii ${category}. Zrealizuj swój projekt z Quixy!`;

  return {
    title,
    description,
    openGraph: {
      type: "website",
      url: "https://quixy.pl",
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
      site: "@quixy",
      title,
      description,
      image: {
        url: "https://quixy.pl/favicons/android-chrome-512x512.png",
      },
    },
  };
}
