import Link from "next/link";
import { polishToEnglish } from "../../../../../../utils/polishToEnglish";
import jobs from "../../../../../../public/14.09.2024.json";
import MainFooter from "@/components/MainFooter";
import Header from "@/components/Header";
import { getPageContent } from "@/lib/getPageContent";
import { JobPosting, Tag } from "@/types";
import { TfiFlagAlt } from "react-icons/tfi";
import BlogPostList from "@/components/BlogPostList";
import { getDocuments, getProducts } from "@/firebase";
import JobOfferCard from "@/components/Dashboard/JobOfferCard";
import JobBoardList from "@/components/JobBoardList";
import Market from "@/components/marketplace/Market";
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
  const content = await getPageContent(polishToEnglish(params.job));
  const products: any = await getProducts();
  const leads: any = await getDocuments("services");
  return (
    <>
      <Header jobsList={jobs} />
      <div className=" min-h-screen flex flex-col w-full">
        {/* Header */}
        {/* Job Title Section */}
        <div className="w-full mb-6 mx-auto">
          <div className="flex flex-col mx-auto">
            <div className="">
              <div className="p-6 container mx-auto">
                <p className="text-3xl text-black font-extrabold">
                  Freelancer Job Boards
                </p>
                <h1 className="text-black">
                  Zlecenia, Usługi, Oferty Pracy Zdalnej oraz Najlepsi{" "}
                  {content?.informal_title_plural}
                </h1>{" "}
              </div>
              <div className="w-full pb-6">
                <div className="flex flex-col mx-auto">
                  <div className="bg-gradient-to-r from-primary to-cta">
                    <div className="mx-auto container p-6">
                      <JobBoardList
                        talents={talents}
                        companies={companies}
                        content={content}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="px-6 container mx-auto">
          <h2 className="font-extrabold text-black text-xl lg:text-3xl">
            Oferty pracy zdalnej{" "}
            <span className="">{content?.title.toLowerCase()}</span>{" "}
          </h2>
          <p className="text-black">
            Szukasz pracy jako {content?.informal_title_singular}?
          </p>
          {offers?.length === 0 && (
            <div className="">
              <div className="p-6 bg-gradient-to-r from-primary/40 to-cta/40 bg-left-to-right  mx-auto my-6">
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
            <section className="">
              {offers.map((offer: JobPosting, i: any) => (
                <div className="w-full overflow-hidden" key={i}>
                  <JobOfferCard
                    href={`/job-offers/${polishToEnglish(offer.title)}-${
                      offer.creationTime
                    }`}
                    offer={offer}
                  />
                </div>
              ))}
            </section>
          )}
        </div>
        {/* <div className="bg-white px-6 sm:px-12 py-6 text-gray-800">
        <JobOfferList jobOffers={offers} />
      </div> */}
        {/* Services Section */}
        <div className="container mx-auto rounded-xl" id="search">
          <Market leads={leads} />
        </div>
        {/* Content */}
        <div className="flex flex-col lg:flex-row container p-6 mx-auto">
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
        <div className="container p-6 mx-auto">
          {" "}
          <h2
            style={{ lineHeight: 1.5 }}
            className="font-extrabold text-black text-xl lg:text-3xl"
          >
            Ile zarabiają
            <span className="ml-2 text-black">
              {content?.informal_title_plural.toLowerCase()}?
            </span>
          </h2>
          {/* <div
            className="text-black max-w-3xl markdownSlug font-light font-coco"
            dangerouslySetInnerHTML={{
              __html: content?.salary,
            }}
          /> */}
        </div>
        <MainFooter jobsList={jobs} />
      </div>
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
  const content = await getPageContent(params.job);
  const title = `Freelancer Job Boards ${job?.title} - Co robią, ile zarabiają? Zlecenia, Praca Zdalna`;
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
