import Link from "next/link";
import { polishToEnglish } from "../../../../../../../utils/polishToEnglish";
import jobs from "../../../../../../../public/14.09.2024.json";
import MainFooter from "@/components/MainFooter";
import Header from "@/components/Header";
import { getPageContent } from "@/lib/getPageContent";
import { JobPosting } from "@/types";
import { TfiFlagAlt } from "react-icons/tfi";
import BlogPostList from "@/components/BlogPostList";
import { getDocuments, getProducts } from "@/firebase";
import CityBreadcrumbs from "@/components/CitySlugComponents/CityBreadcrumbs";
import JobBoardList from "@/components/JobBoardList";
import JobOfferCard from "@/components/Dashboard/JobOfferCard";

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
    `${process.env.NEXT_PUBLIC_URL}/api/offers/?tubylytylkofigi=${process.env.API_SECRET_KEY}&category=${params.job}`,
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
  const content = await getPageContent(polishToEnglish(params.job));
  const products: any = await getProducts();
  const leads: any = await getDocuments("services");
  return (
    <>
      <Header jobsList={jobs} />
      <div className="bg-white min-h-screen flex flex-col w-full px-4 lg:px-12">
        {/* Header */}
        {/* Job Title Section */}
        <div className="">
          <CityBreadcrumbs params={params} />
        </div>
        <div className="bg-white w-full mb-6 mx-auto">
          <div className="flex flex-col mx-auto">
            <div className="">
              <h2
                style={{ lineHeight: 1.5 }}
                className="font-bold text-black text-xl lg:text-3xl my-6"
              >
                Najlepsi {content?.informal_title_plural} {talents[0]?.city}
              </h2>{" "}
              <JobBoardList
                talents={talents}
                companies={companies}
                content={content}
              />
            </div>
          </div>
        </div>
        <div>
          <h1
            style={{ lineHeight: 1.45 }}
            className="font-bold text-black text-xl lg:text-3xl my-6"
          >
            Oferty pracy zdalnej{" "}
            <span className="text-white bg-gradient-to-r from-primary to-cta px-2 py-0.5 ">
              {content?.title}
            </span>{" "}
          </h1>
          {offers?.length === 0 && (
            <div className="">
              <div className=" p-6 bg-gradient-to-r from-primary/20 to-cta/20 mx-auto my-6">
                <div className="bg-gradient-to-r from-primary to-cta rounded-full aspect-square mx-auto w-32 flex items-center justify-center">
                  <TfiFlagAlt className="text-white text-4xl animate-bounce" />
                </div>

                <p className="bg-white font-coco font-light text-black text-base p-3 my-3 text-center max-w-xl mx-auto">
                  Brak aktywnych ofert pracy zdalnej dla specjalistów w branży{" "}
                  {content?.genitive}
                </p>
                <h3 className="flex flex-col text-white p-2 font-gotham font-light text-center mx-auto max-w-[332px] group">
                  <Link
                    href="/register"
                    className=" bg-[#14a800] p-2 duration-100 group-hover:bg-opacity-80"
                  >
                    Bądź szybszy/a i dodaj ogłoszenie
                  </Link>
                  <Link
                    href="/register"
                    className=" bg-[#14a800] w-max max-w-[100%] mx-auto p-2  duration-100 group-hover:bg-opacity-80"
                  >
                    o pracę już dziś!
                  </Link>
                </h3>
              </div>
            </div>
          )}
          {offers?.length > 0 && (
            <section className="grid grid-cols-1 lg:grid-cols-2">
              {offers.map((offer: JobPosting, i: any) => (
                <div className="h-[40vh] overflow-hidden my-3" key={i}>
                  <JobOfferCard
                    offer={offer}
                    href={`/job-offers/${polishToEnglish(offer?.title)}-${
                      offer?.creationTime
                    }`}
                  />
                </div>
              ))}
            </section>
          )}
        </div>
        {/* <div className="bg-white px-6 sm:px-12 py-6 text-gray-800">
        <JobOfferList jobOffers={offers} />
      </div> */}
        {/* Content */}
        <div className="flex flex-col lg:flex-row mt-6">
          <section className="text-left">
            <h2
              style={{ lineHeight: 1.5 }}
              className="font-bold text-black text-xl lg:text-3xl my-6"
            >
              Czym zajmują się
              <span className="ml-2 bg-gradient-to-r text-white from-primary via-cta to-primary">
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
        <div className="mt-6"></div>
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
    .find((item: any) => polishToEnglish(item.title) === params.job);
  const content = await getPageContent(params.job);
  const title = `Praca Zdalna Oferty ${job?.title} - ${
    content?.synonyms[0] || ""
  }`;
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
      image: {
        url: "/favicons/android-chrome-512x512.png",
        alt: "Quixy Logo",
      },
    },
  };
}
