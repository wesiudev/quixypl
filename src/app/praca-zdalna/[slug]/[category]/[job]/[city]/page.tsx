import { polishToEnglish } from "../../../../../../../utils/polishToEnglish";
import MainFooter from "@/components/MainFooter";
import Header from "@/components/Header";
import { getPageContent } from "@/lib/getPageContent";
import BlogPostList from "@/components/BlogPostList";
import { getProducts } from "@/firebase";
import CityBreadcrumbs from "@/components/CitySlugComponents/CityBreadcrumbs";
import JobBoardList from "@/components/JobBoardList";
import removePolishSignsAndSpaces from "@/lib/removePolish";
import JobOffers from "@/components/JobOffers";

export async function generateStaticParams() {
  const jobs = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/jobs?tubylytylkofigi=${process.env.API_SECRET_KEY}`,
    {
      next: { revalidate: 600 },
    }
  ).then((res) => res.json());
  return jobs
    .flatMap((service: any) =>
      service.data.flatMap((subItem: any) => subItem.data)
    )
    .map((item: any) => ({ job: polishToEnglish(item.title) }));
}

export default async function Page(props: { params: Promise<any> }) {
  const params = await props.params;
  const jobs = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/jobs?tubylytylkofigi=${process.env.API_SECRET_KEY}`,
    {
      next: { revalidate: 600 },
    }
  ).then((res) => res.json());
  const offers = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/offers/?tubylytylkofigi=${process.env.API_SECRET_KEY}&category=${params.job}`,
    {
      next: { revalidate: 600 },
    }
  ).then((res) => res.json());
  const talents = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/talents/slug?tubylytylkofigi=${
      process.env.API_SECRET_KEY
    }&slug=${polishToEnglish(params.slug)}`,
    {
      next: { revalidate: 600 },
    }
  ).then((res: any) => res.json());
  const companies = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/companies/slug?tubylytylkofigi=${
      process.env.API_SECRET_KEY
    }&slug=${polishToEnglish(params.slug)}`,
    {
      next: { revalidate: 600 },
    }
  ).then((res: any) => res.json());
  const content = await getPageContent(polishToEnglish(params.job));
  const products: any = await getProducts();
  const categoryTalents = talents.filter(
    (item: any) => polishToEnglish(item?.city) === params.city
  );
  const categoryCompanies = companies.filter(
    (item: any) => polishToEnglish(item?.city) === params.city
  );
  return (
    <>
      <Header jobsList={jobs} />
      <div className="bg-white min-h-screen flex flex-col w-full px-4 lg:px-12">
        {/* Header */}
        {/* Job Title Section */}
        <CityBreadcrumbs params={params} />
        <div className="bg-white w-full mb-6 mx-auto">
          <div className="flex flex-col mx-auto">
            <div className="">
              <h2
                style={{ lineHeight: 1.5 }}
                className="font-extrabold text-black text-2xl"
              >
                Najlepsi {content?.informal_title_plural}{" "}
                {categoryTalents[0]?.city}
              </h2>{" "}
              <p className="text-black">
                Zatrudnij najlepszych freelancerów lub firmę. Przeglądaj usługi
                lub utwórz portfolio.
              </p>
              <JobBoardList
                talents={categoryTalents}
                companies={categoryCompanies}
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
          <JobOffers offers={offers} content={content} />
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
              className="text-black max-w-3xl markdownSlug  font-coco"
              dangerouslySetInnerHTML={{
                __html: content?.description,
              }}
            />
            <BlogPostList posts={products} />
          </section>
        </div>
        <div className="mt-6"></div>
      </div>
      <div className="bg-white px-4 lg:px-12 py-12 flex flex-col w-full text-black">
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
      <MainFooter jobsList={jobs} />
    </>
  );
}

export async function generateMetadata(props: { params: Promise<any> }) {
  const params = await props.params;
  const jobs = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/jobs?tubylytylkofigi=${process.env.API_SECRET_KEY}`,
    {
      next: { revalidate: 600 },
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
  const categoryTalents = talents.filter(
    (item: any) => polishToEnglish(item?.city) === params.city
  );
  const categoryCompanies = companies.filter(
    (item: any) => polishToEnglish(item?.city) === params.city
  );
  const city = categoryTalents[0]?.city || categoryCompanies[0]?.city;
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
  const title = `${job?.title} ${city} | Zlecenia Praca Usługi`;
  const description = `Interesuje cię ${job?.title?.toLowerCase()}? Przeglądaj zlecenia, oferty pracy lub dodaj usługi w ${category} ${city}.`;
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
