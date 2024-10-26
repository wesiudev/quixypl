import Link from "next/link";
import { polishToEnglish } from "../../../../../../../utils/polishToEnglish";
import jobs from "../../../../../../../public/14.09.2024.json";
import MainFooter from "@/components/MainFooter";
import Header from "@/components/Header";
import Image from "next/image";
import JobOfferList from "@/components/Postings/Postings";
import { getPageContent } from "@/lib/getPageContent";
import { JobPosting, Tag } from "@/types";
import { TfiFlagAlt } from "react-icons/tfi";
import BlogPostList from "@/components/BlogPostList";
import { getProducts } from "@/firebase";
import TalentList from "@/components/TalentList";

export async function generateStaticParams() {
  return jobs
    .flatMap((service: any) =>
      service.data.flatMap((subItem: any) => subItem.data)
    )
    .map((item: any) => ({ job: polishToEnglish(item.title) }));
}

export default async function Page({ params }: { params: any }) {
  const offers = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/offers/?tubylytylkofigi=${process.env.API_SECRET_KEY}&category=${params.job}`,
    {
      next: { revalidate: 60 },
    }
  ).then((res) => res.json());
  const talents = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/talents?tubylytylkofigi=${process.env.API_SECRET_KEY}`,
    {
      next: { revalidate: 60 },
    }
  ).then((res: any) => res.json());
  const content = await getPageContent(polishToEnglish(params.job));
  const products: any = await getProducts();
  console.log(content);
  const categoryTalents = talents
    ?.map((item: any) => {
      const { email, ...talent } = item;
      return talent;
    })
    .filter(
      (item: any) =>
        item?.pseudo &&
        item?.seek &&
        item?.seek !== "ask" &&
        item?.tags?.filter((tag: Tag) => tag.url === params.slug)
    );
  return (
    <div className="bg-white min-h-screen flex flex-col w-full">
      {/* Header */}
      <Header jobsList={jobs} />
      {/* Breadcrumbs Section */}

      {/* Banner Section */}
      <div className="hidden lg:block bg-white">
        <Image
          width={1920}
          height={1080}
          src="/assets/banner-jobs.webp"
          alt="Praca Zdalna Banner"
          className="w-full shadow"
        />
      </div>
      <div className="lg:hidden bg-white">
        <Image
          width={1920}
          height={1080}
          src="/assets/banner-jobs-mobile.webp"
          alt="Praca Zdalna Banner"
          className="w-full shadow"
        />
      </div>

      {/* Job Title Section */}
      <div className="container px-4 mx-auto">
        <div className="breadcrumbs px-4 py-4 text-sm">
          <ul className="space-x-2 font-coco">
            <li>
              <Link href={`/praca-zdalna`} className="text-black">
                praca-zdalna
              </Link>
            </li>
            <li>
              <Link
                href={`/praca-zdalna/${params.slug}`}
                className="text-black"
              >
                {params.slug}
              </Link>
            </li>
            <li>
              <Link
                href={`/praca-zdalna/${params.slug}/${params.category}`}
                className="text-black"
              >
                {params.category}
              </Link>
            </li>
            <li>
              <Link
                href={`/praca-zdalna/${params.slug}/${params.category}/${params.job}`}
                className="text-black"
              >
                {params.job}
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className=" bg-white w-full mb-6 container mx-auto">
        <div className="flex flex-col mx-auto">
          <div className="">
            <h2
              style={{ lineHeight: 1.5 }}
              className="text-black font-gotham text-xl lg:text-3xl my-12"
            >
              {content?.informal_title_plural}{" "}
              <span className="bg-gradient-to-r from-primary to-cta text-white p-2 ml-1 ">
                w Quixy Talent&trade;
              </span>
            </h2>{" "}
            <TalentList categoryTalents={categoryTalents} />
          </div>
        </div>
      </div>
      <div className="container px-4 mx-auto">
        <h1
          style={{ lineHeight: 1.45 }}
          className="text-3xl font-bold font-coco text-black mt-6"
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

              <p className="font-light text-black text-base font-gotham mt-3 text-center max-w-xl mx-auto">
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
                  className=" bg-[#14a800] w-max max-w-[100%] mx-auto p-2 px-4 duration-100 group-hover:bg-opacity-80"
                >
                  o pracę już dziś!
                </Link>
              </h3>
            </div>
          </div>
        )}
        {offers?.length > 0 && (
          <ul className="list-none">
            {offers.map((offer: JobPosting, i: any) => (
              <li key={i} className="mb-2">
                <Link
                  href={`/search/${offer.title}-${offer.creationTime}`}
                  className="link text-primary hover:underline"
                >
                  {offer.title}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
      {/* <div className="bg-white px-6 sm:px-12 py-6 text-gray-800">
        <JobOfferList jobOffers={offers} />
      </div> */}
      {/* Content */}
      <div className="flex flex-col lg:flex-row mt-6 container mx-auto px-4">
        <section className="text-left lg:w-[55%]">
          <h2
            style={{ lineHeight: 1.5 }}
            className="text-3xl mb-6 text-black font-gotham"
          >
            Czym zajmują się
            <span className="ml-2  p-2 px-3 bg-gradient-to-r text-white from-primary via-cta to-primary">
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
      <MainFooter jobsList={jobs} />
    </div>
  );
}

export async function generateMetadata({ params }: { params: any }) {
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
