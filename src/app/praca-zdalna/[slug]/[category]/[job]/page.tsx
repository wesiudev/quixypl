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
import { removePolishSignsAndSpaces } from "@/lib/removePolish";
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
      <div className=" min-h-screen flex flex-col w-full px-4 lg:px-12">
        {/* Header */}
        {/* Job Title Section */}
        <div className="w-full mt-6 mx-auto">
          <div className="flex flex-col mx-auto">
            <div className="">
              <p className="text-3xl text-black font-extrabold">
                Freelancer Job Boards
              </p>
              <h1 className="text-black">
                Zlecenia, usługi, oferty pracy zdalnej oraz najlepsi{" "}
                {content?.informal_title_plural}
              </h1>{" "}
              <div className="w-full pb-6 flex flex-col mx-auto">
                <JobBoardList
                  talents={talents}
                  companies={companies}
                  content={content}
                />
              </div>
            </div>
          </div>
        </div>
        <div className=" ">
          <h2 className="font-extrabold text-black text-xl lg:text-3xl">
            Oferty pracy zdalnej{" "}
            <span className="">{content?.title.toLowerCase()}</span>{" "}
          </h2>
          <p className="text-black">
            Szukasz pracy jako {content?.informal_title_singular}?
          </p>
          {offers?.length === 0 && (
            <div className="">
              <div className="py-3 bg-gradient-to-r from-primary/30 to-cta/30 mx-auto my-6">
                <div className="bg-gradient-to-r from-primary to-cta rounded-full aspect-square mx-auto w-32 flex items-center justify-center">
                  <TfiFlagAlt className="text-white text-4xl animate-bounce" />
                </div>
                <p className="bg-white font-coco font-light text-black text-base p-3 mt-3 text-center max-w-xl mx-auto">
                  Brak aktywnych ofert pracy zdalnej dla specjalistów w branży{" "}
                  {content?.genitive}
                </p>
                <h3 className="flex flex-col text-white p-2 font-gotham font-light text-center mx-auto max-w-[332px] group">
                  <Link
                    href="/register"
                    className=" bg-[#14a800] p-2 duration-100 group-hover:bg-opacity-80"
                  >
                    Dodaj darmowe ogłoszenie
                  </Link>
                  <Link
                    href="/register"
                    className=" bg-[#14a800] w-max max-w-[100%] mx-auto p-2 duration-100 group-hover:bg-opacity-80"
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
        {/* <div className="bg-white  sm:px-12 py-6 text-gray-800">
        <JobOfferList jobOffers={offers} />
      </div> */}
        {/* Services Section */}
        <div className="" id="search">
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
        <div className="bg-white px-6 lg:px-12 py-12 flex flex-col w-full text-black">
          <h4 className="text-lg w-max font-extrabold">Tagi</h4>
          <ul className="font-coco flex items-center flex-wrap gap-2">
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
