import Link from "next/link";
import { polishToEnglish } from "../../../../../utils/polishToEnglish";
import { FaBriefcase } from "react-icons/fa";
import JobBoardList from "@/components/JobBoardList";
import removePolishSignsAndSpaces from "@/lib/removePolish";
import Image from "next/image";
import dynamic from "next/dynamic";
import { getServices } from "@/lib/getServices";
import { getPosts } from "@/lib/getPosts";
import { getContent } from "@/lib/getContent";
const Market = dynamic(() => import("@/components/marketplace/Market"));
const BlogPostList = dynamic(() => import("@/components/BlogPostList"));
// Generowanie parametrów statycznych
export async function generateStaticParams() {
  const jobs = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/jobs?tubylytylkofigi=${process.env.API_SECRET_KEY}`,
    { next: { revalidate: 60 } }
  ).then((res) => res.json());
  return jobs.flatMap((service: any) =>
    service.data.flatMap((subItem: any) => ({ category: subItem.title }))
  );
}
export default async function Page(props: { params: Promise<any> }) {
  const params = await props.params;
  const jobs = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/jobs?tubylytylkofigi=${process.env.API_SECRET_KEY}`,
    { next: { revalidate: 60 } }
  ).then((res) => res.json());
  const cat: any = jobs.find(
    (page: any) => polishToEnglish(page.title) === params.slug
  );
  const slug = cat?.data.find(
    (item: any) => polishToEnglish(item.title) === params.category
  );
  const users = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/users/${params.category}?tubylytylkofigi=${process.env.API_SECRET_KEY}`
  ).then((res: any) => res.json());
  const content = await getContent(params.category);
  const services = await getServices();
  const posts = await getPosts();
  return (
    <div className="bg-gradient-to-b relative bg-white">
      {/* Hero Section */}
      <section
        className="py-12 text-left relative bg-gradient-to-r from-primaryStart to-primaryEnd"
        style={{ boxShadow: "inset 0px 0px 10px rgba(0, 0, 0)" }}
      >
        {/* Obraz tła z lepszą czytelnością */}
        <div className="absolute left-0 top-0 w-full h-full">
          <Image
            src="/assets/AI-Image.png"
            width={1024}
            height={1024}
            alt=""
            className="w-full h-full object-cover opacity-10"
          />
        </div>

        {/* Główna zawartość */}
        <div className="relative z-50 w-full mx-auto container px-4 lg:px-12">
          {/* Główny nagłówek */}
          <h1
            style={{ lineHeight: 1.4 }}
            className="text-4xl lg:text-5xl font-extrabold text-white mb-4"
          >
            Oferty pracy, zlecenia usługi i najlepsi eksperci -{" "}
            <span className="text-accentStart">{slug?.title}</span>
          </h1>

          {/* Opis */}
          <p className="lg:text-base text-gray-100 max-w-2xl mb-6">
            Zatrudnij najlepszych specjalistów od{" "}
            <b className="text-white">{content?.genitive}</b> na polskim rynku
            pracy i zrealizuj swój projekt z ich wsparciem!
          </p>

          {/* Przyciski */}
          <div className="flex gap-4">
            <Link
              className="hover:underline text-white py-2 px-4 border border-white rounded-md"
              href="/register"
            >
              Wpisz się
            </Link>
            <Link
              className="bg-gradient-to-b from-ctaStart to-ctaEnd text-white py-2 px-4 rounded-md shadow-md hover:scale-105 duration-100"
              href="/register"
            >
              Dodaj ofertę
            </Link>
          </div>
        </div>
      </section>

      <div className="w-full mx-auto container px-4 lg:px-12 flex flex-col items-center justify-center">
        {/* Sekcja główna */}
        <div className="mt-12 w-full">
          <div className="flex flex-col mx-auto ">
            <JobBoardList
              talents={users.filter((user: any) => user.seek)}
              companies={users.filter((user: any) => !user.seek)}
              content={content}
            />
          </div>
        </div>

        {/* Sekcja wyszukiwania */}
        <div className="mt-12 w-full" id="search">
          <Market services={services} />
        </div>

        {/* Podkategorie */}
        {slug?.data?.length > 0 && (
          <div className="w-full">
            <h2 className="text-black text-2xl lg:text-3xl font-extrabold mb-6">
              Oferty Pracy - {slug.title}
            </h2>
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4">
              {slug.data.map((item: any, index: number) => (
                <Link
                  href={`/praca-zdalna/${params.slug}/${
                    params.category
                  }/${polishToEnglish(item.title)}`}
                  key={index}
                  className="p-1 hover:scale-105 duration-100 flex items-center bg-gradient-to-b from-primaryHoverStart to-primaryHoverEnd text-white pr-4 h-[50px] rounded-lg shadow-md hover:shadow-lg transition"
                >
                  <div className="flex items-center justify-center aspect-square h-full rounded-md bg-white text-primaryHoverEnd">
                    <FaBriefcase className="w-6 h-6" />
                  </div>
                  <h2 className="font-coco w-full flex items-center justify-center text-center gap-3">
                    {item.title}
                  </h2>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Sekcja opisu */}
        <div className="w-full mt-12">
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-12 mx-auto">
            {/* Główna sekcja tekstowa */}
            <section className="w-full lg:w-3/5">
              {/* Nagłówek */}
              <h2 className="font-extrabold text-black text-xl lg:text-3xl mb-3">
                Czym zajmują się {content?.informal_title_plural?.toLowerCase()}
                ?
              </h2>

              {/* Opis - obsługa HTML */}
              <div
                className="text-gray-800 text-sm sm:text-base leading-relaxed markdownSlug"
                dangerouslySetInnerHTML={{
                  __html: content?.description,
                }}
              />
            </section>
          </div>

          <BlogPostList posts={posts} />
        </div>

        {/* Sekcja tagów */}
        <div className="my-12 w-full">
          <h4 className="text-xl font-extrabold text-gray-800 mb-4">Tagi</h4>
          <ul className="flex overflow-x-scroll lg:overflow-visible w-full lg:flex-wrap gap-4 text-sm lg:text-base">
            {content?.synonyms.map((item: any, i: number) => (
              <li
                key={i}
                className="text-black bg-gray-100 px-4 py-2 rounded-full shadow-sm hover:bg-gray-200 transition-all"
              >
                #{removePolishSignsAndSpaces(item.toLowerCase())}
              </li>
            ))}
            <li className="text-black bg-gray-100 px-4 py-2 rounded-full shadow-sm hover:bg-gray-200 transition-all">
              #firmy
              {removePolishSignsAndSpaces(content?.genitive.toLowerCase())}
            </li>
            <li className="text-black bg-gray-100 px-4 py-2 rounded-full shadow-sm hover:bg-gray-200 transition-all">
              #zleceniadlafirm
              {removePolishSignsAndSpaces(content?.genitive.toLowerCase())}
            </li>
            <li className="text-black bg-gray-100 px-4 py-2 rounded-full shadow-sm hover:bg-gray-200 transition-all">
              #zleceniadlafreelancerow
              {removePolishSignsAndSpaces(content?.genitive.toLowerCase())}
            </li>
            <li className="text-black bg-gray-100 px-4 py-2 rounded-full shadow-sm hover:bg-gray-200 transition-all">
              #ilezarabia
              {removePolishSignsAndSpaces(
                content?.informal_title_singular.toLowerCase()
              )}
            </li>

            <li className="text-black bg-gray-100 px-4 py-2 rounded-full shadow-sm hover:bg-gray-200 transition-all">
              #
              {removePolishSignsAndSpaces(
                content?.informal_title_singular.toLowerCase()
              )}
              freelance
            </li>
            <li className="text-black bg-gray-100 px-4 py-2 rounded-full shadow-sm hover:bg-gray-200 transition-all">
              #zarobki
              {removePolishSignsAndSpaces(
                content?.informal_title_plural.toLowerCase()
              )}
            </li>
            <li className="text-black bg-gray-100 px-4 py-2 rounded-full shadow-sm hover:bg-gray-200 transition-all">
              #
              {removePolishSignsAndSpaces(
                content?.informal_title_plural.toLowerCase()
              )}
            </li>
            <li className="text-black bg-gray-100 px-4 py-2 rounded-full shadow-sm hover:bg-gray-200 transition-all">
              #znajdzprace
            </li>
            <li className="text-black bg-gray-100 px-4 py-2 rounded-full shadow-sm hover:bg-gray-200 transition-all">
              #rekrutacja
            </li>
            <li className="text-black bg-gray-100 px-4 py-2 rounded-full shadow-sm hover:bg-gray-200 transition-all">
              #pracazdalna
            </li>
            <li className="text-black bg-gray-100 px-4 py-2 rounded-full shadow-sm hover:bg-gray-200 transition-all">
              #freelancer
            </li>
            <li className="text-black bg-gray-100 px-4 py-2 rounded-full shadow-sm hover:bg-gray-200 transition-all">
              #jobboards
            </li>
            <li className="text-black bg-gray-100 px-4 py-2 rounded-full shadow-sm hover:bg-gray-200 transition-all">
              #joboffers
            </li>
            <li className="text-black bg-gray-100 px-4 py-2 rounded-full shadow-sm hover:bg-gray-200 transition-all">
              #ofertypracy
            </li>
            <li className="text-black bg-gray-100 px-4 py-2 rounded-full shadow-sm hover:bg-gray-200 transition-all">
              #ogloszeniaoprace
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

// Metadata generation
export async function generateMetadata(props: { params: Promise<any> }) {
  const params = await props.params;
  const jobs = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/jobs?tubylytylkofigi=${process.env.API_SECRET_KEY}`
  ).then((res) => res.json());
  const category = jobs
    .flatMap((service: any) =>
      service.data.flatMap((subItem: any) => ({ category: subItem.title }))
    )
    .find(
      (item: any) => polishToEnglish(item.category) === params.category
    ).category;
  const title = `${category} Oferty Pracy Zdalnej Zlecenia Freelancerzy`;
  const description = `Przeglądaj nasze oferty pracy w kategorii ${category}. Zrealizuj swój projekt z Quixy!`;
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
