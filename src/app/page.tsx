import Image from "next/image";
import Link from "next/link";
import { FaChevronRight } from "react-icons/fa";
import SearchJobs from "@/components/HomeUnderHero/SearchJobs";
import OpenableOpportunity from "@/components/HomeUnderHero/OpenableOpportunity";
import jobs from "../../public/14.09.2024.json";
import MainFooter from "@/components/MainFooter";
import { Metadata } from "next";
import Header from "@/components/Header";
import FAQ from "@/components/Faq";
import Regions from "@/components/Regions";
import AboutQuixyTalent from "@/components/AboutQuixyTalent";
import heroImg from "../../public/assets/heroimg.png";
export default function Page() {
  const itCategories = jobs.flatMap((job) => [
    { title: job.title, data: job.data.map((subItem) => subItem) },
  ]);
  return (
    <div className="flex flex-col bg-white">
      <Header jobsList={itCategories} />
      <div className="">
        <div className="mx-auto px-4 w-full max-w-[1366px] flex flex-col lg:items-center lg:grid lg:grid-cols-2 relative z-50 py-12">
          <div className="group relative flex flex-col">
            <h2 className="lg:max-w-lg font-extrabold text-3xl lg:text-5xl text-zinc-800">
              Twoja platforma z pracą zdalną
            </h2>
            <p className="max-w-[100%] sm:max-w-sm lg:max-w-lg text-black mt-3">
              Pierwsza platforma napędzana technologią{" "}
              <Link href="/about#ccrm" className="italic">
                CCRM
              </Link>
              , która łączy freelancerów i firmy z klientami!
            </p>
            <div className="flex items-center gap-2 sm:gap-3 lg:gap-4 w-full mt-2">
              <Link
                href="/praca-zdalna"
                title="Rekrutuj do pracy zdalnej na panelu Quixy"
                className="font-gotham font-light bg-primary hover:bg-opacity-90 duration-100 text-white text-sm sm:text-base p-2 py-1.5 text-center"
              >
                <h2 className="w-max mx-auto">Jestem klientem</h2>
              </Link>
              <Link
                href="/praca-zdalna?talent"
                title="Szukaj pracy zdalnej na panelu Quixy"
                className="font-gotham font-light bg-cta hover:bg-opacity-90 duration-100 text-white text-sm sm:text-base p-2 py-1.5 text-center"
              >
                <h2 className="w-max mx-auto">Jestem freelancerem</h2>
              </Link>
            </div>
            <Regions />
          </div>
          <div className="flex flex-col items-center justify-center w-full h-full mx-auto mt-12 lg:mt-0 overflow-hidden relative">
            <Image
              src={heroImg}
              alt="Quixy Praca Zdalna"
              className="w-full h-full"
              blurDataURL="data:image/webp;base64,UklGRiIAAABXRUJQVlA4WAoAAAAQAAAfAADuwH/xAAfAQADAAQAAAAAAQAvAQADAAQAAAAAAQAvAQA"
              placeholder="blur"
            />
            <Link
              href="/register"
              className="pb-2 px-2 py-1.5 absolute bottom-3 left-3 w-[90%] container z-50 text-white bg-gradient-to-r from-primary to-cta"
            >
              <h2 className="text-xl font-extrabold">
                Promuj swoje usługi z Quixy!
              </h2>
              <p className="font-coco text-sm">
                Quixy.pl to rozwiązanie zarówno dla freelancerów jak i dla firm.
                Pokaż swoje usługi nowym klientom!
              </p>
            </Link>
          </div>
        </div>
      </div>
      <div className="infinite-bg p-3 sm:px-12 py-8 lg:py-16 h-max">
        <div className="flex flex-col justify-center items-center">
          <div className="flex flex-row">
            <h2
              style={{ textShadow: "1px 2px 3px black" }}
              className="font-coco w-full md:max-w-[50rem] xl:max-w-[1024px] text-xl md:text-2xl lg:text-3xl xl:text-4xl text-white text-center"
            >
              Wyobraź sobie wymarzony biznes, pomnożony przez maksymalizację
              efektywności
            </h2>
          </div>
        </div>
      </div>
      <div className="my-12 container mx-auto px-4">
        <div className="flex flex-col-reverse md:flex-row text-black">
          <Image
            src="/assets/gif/gihome.webp"
            width={512}
            height={512}
            alt="Praca zdalna za darmo"
            title="Praca zdalna za darmo"
            className="mt-4 md:mt-0 md:mr-12 w-full md:max-w-[300px]"
          />
          <div className="flex flex-col">
            <h2 className="text-2xl font-extrabold flex items-center">
              Dołącz do nas za darmo!
            </h2>
            <p className="text-left max-w-[40rem] mb-3 mt-2">
              Zapoznaj się z naszymi tablicami ofert dla klientów! Wyświetlaj
              swoje usługi jako freelancer lub firma.
            </p>
            <div className="w-full">
              <Link
                href="/register"
                className="w-max font-gotham bg-gradient-to-r from-primary to-cta hover:bg-opacity-90 duration-100 text-white p-2 py-1.5 text-center"
              >
                Skonfiguruj konto!
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="py-12 h-max bg-gradient-to-r from-primary to-cta">
        <div className="container mx-auto px-4">
          <SearchJobs />
          <div className="grid grid-cols-1 lg:grid-cols-2 mt-6 gap-4">
            {jobs.map((opportunity: any, i: any) => (
              <OpenableOpportunity key={i} opportunity={opportunity} i={i} />
            ))}
          </div>
        </div>
      </div>
      <div className="mx-auto px-4 sm:px-0 mb-12 container">
        <AboutQuixyTalent />
      </div>

      <div className="container mx-auto h-max">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
          <div className="h-full w-full md:p-3 lg:p-0 lg:bg-white md:bg-[#f7faf7]  ">
            <Image
              src="/assets/happy-woman.webp"
              width={1024}
              height={1024}
              alt="Praca zdalna Quixy Talent"
              className=""
            />
          </div>
          <div className="flex flex-col justify-center px-3 md:pl-3 lg:pl-12 text-black">
            <h2
              style={{ lineHeight: 1.325 }}
              className="text-4xl font-extrabold drop-shadow-md shadow-black"
            >
              Realizuj projekty z freelancerami
            </h2>
            <div className="my-3">
              <div className="flex items-start">
                <span className="text-2xl mt-1">🤝</span>
                <div className="ml-1.5 flex flex-col">
                  <h3 className="font-bold text-lg lg:text-xl">
                    Zatrudniaj za darmo!
                  </h3>
                  <p className="text-black text-sm ">
                    Zanurz się w świecie biznesu! Zarejestruj się, odkrywaj
                    projekty i planuj koncepty.{" "}
                  </p>
                </div>
              </div>
              <div className="flex mt-3 items-start">
                <span className="text-2xl mt-1">🌍</span>
                <div className="ml-1.5 flex flex-col">
                  <h3 className="font-bold text-lg lg:text-xl text-black">
                    Dodaj ofertę i zatrudnij eksperta{" "}
                  </h3>
                  <p className="text-black text-sm ">
                    Znajdź utalentowane osoby, skontaktuj się i rozpocznijcie
                    współpracę.
                  </p>
                </div>
              </div>
              <div className="flex mt-3 items-start">
                <span className="text-2xl mt-1">🚀</span>
                <div className="ml-1.5 flex flex-col">
                  <h3 className="font-bold text-lg lg:text-xl">
                    Pracuj z najlepszymi
                  </h3>
                  <p className="text-black text-sm">
                    Z <b className="italic">Quixy Talent&trade;</b> znajdziesz
                    najlepszych zawodowców, którzy ci pomogą.
                  </p>
                </div>
              </div>
            </div>
            <div className="flex flex-row mt-6">
              <Link
                className=" p-1.5 px-12 bg-gradient-to-r from-primary to-cta text-white"
                href={`${process.env.NEXT_PUBLIC_URL}/register`}
              >
                Rejestracja
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="relative container mx-auto mt-12 bg-cover bg-center lg:bg-right-bottom p-4 h-screen bg-woman-pc">
        <div className="absolute left-0 top-0  bg-black bg-opacity-50 w-full h-full z-0"></div>
        <div className="absolute left-4 lg:left-6 top-4 lg:top-6 font-extrabold text-2xl text-white">
          Dla klientów
        </div>
        <div className="flex flex-col justify-end relative z-10 h-full w-full">
          <h2 className="text-4xl lg:text-5xl font-extrabold text-white font-gotham">
            Poszukujesz specjalisty do współpracy?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 font-coco gap-2 md:gap-4 mt-4">
            <Link
              href={`${process.env.NEXT_PUBLIC_URL}/praca-zdalna/rozwoj-oprogramowania/web-development`}
              className="group flex flex-col  bg-black/50 text-white group p-3"
            >
              <h3 className="group-hover:underline md:mb-3 text-2xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold">
                Zamów stronę internetową
              </h3>
              <div className="flex flex-row items-center font-light">
                Przeglądaj specjalistów Web Developmentu
              </div>
            </Link>
            <Link
              href={`${process.env.NEXT_PUBLIC_URL}/praca-zdalna/marketing/marketing-cyfrowy/seo`}
              className="group flex flex-col  bg-black/50 text-white group p-3"
            >
              <h3 className="group-hover:underline md:mb-3 text-2xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold">
                Zamów SEO
              </h3>
              <div className="flex flex-row items-center font-light">
                Przeglądaj specjalistów marketingu
              </div>
            </Link>
            <Link
              href={`${process.env.NEXT_PUBLIC_URL}/praca-zdalna/projektowanie/web-design`}
              className="group flex flex-col  bg-black/50 text-white group p-3"
            >
              <h3 className="group-hover:underline md:mb-3 text-2xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold">
                Zamów design
              </h3>
              <div className="flex flex-row items-center font-light">
                Przeglądaj specjalistów designu
              </div>
            </Link>
            <Link
              href={`${process.env.NEXT_PUBLIC_URL}/praca-zdalna`}
              className="group flex flex-col  bg-black/50 text-white p-3"
            >
              <h3 className="group-hover:underline md:mb-3 text-2xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold">
                Zobacz więcej...
              </h3>
              <div className="flex flex-row items-center font-light">
                Chcesz znaleźć firmę lub freelancera?
              </div>
            </Link>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 mt-12 flex flex-col md:flex-row md:space-x-6 ">
        <div className="md:w-[45%] w-full h-full relative md:flex-col flex flex-row">
          <div className="flex flex-col w-full">
            <h3 className="text-2xl font-extrabold text-black">
              Lider platform z pracą zdalną
            </h3>
            <div className="flex items-center mt-3 px-3">
              <span className="text-2xl">🏆</span>
              <div className="ml-3 flex flex-col">
                <h3 className="text-lg lg:text-2xl font-bold text-black">
                  4.95/5
                </h3>
                <p className="text-black text-xs sm:text-sm md:text-base font-coco">
                  Według opinii naszych klientów
                </p>
              </div>
            </div>
            <div className="flex items-center mt-3 px-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-7 w-7"
                viewBox="0 0 48 48"
              >
                <defs>
                  <path
                    id="a"
                    d="M44.5 20H24v8.5h11.8C34.7 33.9 30.1 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 4.1 29.6 2 24 2 11.8 2 2 11.8 2 24s9.8 22 22 22c11 0 21-8 21-22 0-1.3-.2-2.7-.5-4z"
                  />
                </defs>
                <clipPath id="b">
                  <use href="#a" overflow="visible" />
                </clipPath>
                <path clipPath="url(#b)" fill="#FBBC05" d="M0 37V11l17 13z" />
                <path
                  clipPath="url(#b)"
                  fill="#EA4335"
                  d="M0 11l17 13 7-6.1L48 14V0H0z"
                />
                <path
                  clipPath="url(#b)"
                  fill="#34A853"
                  d="M0 37l30-23 7.9 1L48 0v48H0z"
                />
                <path
                  clipPath="url(#b)"
                  fill="#4285F4"
                  d="M48 48L17 24l-4-3 35-10z"
                />
              </svg>
              <div className="ml-3 flex flex-col">
                <h3 className="text-lg lg:text-2xl font-bold text-black -mt-1">
                  5/5
                </h3>
                <p className="text-black text-xs sm:text-sm md:text-base font-coco">
                  Korzystamy z niezawodnej technologii
                </p>
              </div>
            </div>
            <Link
              href="/register"
              className="w-max mt-3 px-2 py-1.5 bg-gradient-to-r from-primary to-cta  font-gotham font-light text-white"
            >
              Zarejestruj się
            </Link>
          </div>
          <div className="w-[33%] sm:w-full h-auto flex justify-center relative md:hidden">
            <Image
              src={"/assets/ninja.png"}
              width={224}
              height={224}
              alt="Pracuj zdalnie jak samuraj programowania!"
              className="mx-auto absolute inset-0 w-full h-auto"
            />
          </div>
        </div>
        <div className="mt-3 md:mt-0 md:w-[55%] w-full text-black">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 mx-auto">
            <div className="flex flex-row">
              <span className="text-2xl">💎</span>
              <div className="ml-3 flex flex-col">
                <h3 className="font-bold text-lg lg:text-2xl -mt-1 font-gotham">
                  Darmowe Quixies na start
                </h3>
                <p className=" text-sm md:text-lg w-3/4 font-coco">
                  Na początku przygody otrzymasz od nas bonus.
                </p>
              </div>
            </div>
            <div className="flex flex-row">
              <span className="text-2xl">⭐</span>
              <div className="ml-3 flex flex-col">
                <h3 className="font-bold text-lg lg:text-2xl -mt-1 font-gotham">
                  Wyświetlaj swoje usługi
                </h3>
                <p className=" text-sm md:text-lg w-3/4 font-coco">
                  Zdobywaj zlecenia jako freelancer lub firma.
                </p>
              </div>
            </div>
            <div className="flex flex-row">
              <span className="text-2xl">✔️</span>
              <div className="ml-3 flex flex-col">
                <h3 className="font-bold text-lg lg:text-2xl -mt-1 font-gotham">
                  Zapewnimy bezpieczeństwo
                </h3>
                <p className=" text-sm md:text-lg w-3/4 font-coco">
                  Jesteśmy dostępni 24/7 by ci pomóc.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* just a component for the future 🤷‍♀️ */}
      <div className=" relative container mx-auto mt-12 h-max bg-gradient-to-r from-primary/20 to-cta/20">
        <div className="grid grid-cols-1 md:grid-cols-2 w-full h-full relative">
          <div className="bg-guitar-man bg-center rounded-b-none h-[80vh]"></div>
          <div className="p-4 lg:p-6 text-black w-full md:h-full grid grid-cols-1">
            <div>
              <span className="text-lg font-extrabold">Dla freelancerów</span>
              <h2 className="text-black text-2xl lg:text-4xl font-extrabold mt-6">
                Szukaj zleceń lub pracy zdalnej
              </h2>
              <p className="text-base lg:text-lg my-3 lg:my-6 lg:mb-3 font-coco">
                Przeglądaj zlecenia klientów, szukaj pracy zdalnej lub
                sprzedawaj gotowe strony internetowe, aplikacje lub projekty.
              </p>
              <Link
                className="bg-gradient-to-r from-primary to-cta px-2 py-1.5  font-gotham font-light text-white"
                href="/register"
              >
                Znajdź klientów
              </Link>
            </div>
            <div className="flex items-end font-coco text-base md:text-sm lg:text-base xl:text-lg">
              <div className="w-full grid grid-cols-2 gap-3 pt-3 mt-12 border-t border-white">
                <h4 className="bg-white p-2 ">
                  Wysyłaj aplikacje do pracodawców
                </h4>
                <h4 className="bg-white p-2 ">Znajduj zlecenia dla siebie</h4>
                <h4 className="bg-white p-2 ">Sprzedawaj gotowe projekty</h4>
                <h4 className="bg-white p-2 ">Dołącz do projektu</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-12 container mx-auto bg-white relative h-max pb-12">
        <FAQ faqItems={faqItems} />
      </div>
      <div className="relative">
        <MainFooter jobsList={itCategories} />
      </div>
    </div>
  );
}

const faqItems = [
  {
    question: "Czym jest Quixy?",
    answer:
      "Quixy to platforma, która łączy klientów z firmami i freelancerami.",
  },
  {
    question: "Czy dołączenie do Quixy jest darmowe?",
    answer:
      "Tak, dołączenie do naszej platformy jest w pełni darmowe. Możesz dodawać oferty pracy oraz zatrudniać freelancerów za darmo.",
  },
  {
    question: "Jak działa rynek usług?",
    answer:
      "Nasza platforma prezentuje oferty usług wszystkich użytkowników, umożliwiając klientom łatwe dotarcie do profilu dostawcy, który świadczy interesującą ich usługę.",
  },
  {
    question: "Czy mogę ustawić różne ceny dla różnych usług?",
    answer:
      "Tak, możesz dostosować cenę oraz preferowany sposób płatności indywidualnie dla każdej dodawanej usługi.",
  },
  {
    question: "Jak klienci kontaktują się ze mną po znalezieniu mojej oferty?",
    answer:
      "Klienci mogą skorzystać z przycisku *Wyślij zapytanie* dostępnego na Twoim profilu.",
  },
  {
    question: "Czy istnieje opłata za korzystanie z platformy?",
    answer:
      "Dodanie usługi na naszej platformie wiąże się z jednorazową opłatą w wysokości 10 Quixies.",
  },
  {
    question: "Ile kosztuje 1 Quixie?",
    answer:
      "Aktualny cennik jest dostępny w panelu użytkownika po zalogowaniu się na platformę.",
  },
  {
    question: "Jakie rodzaje usług są najczęściej poszukiwane przez klientów?",
    answer:
      "Najczęściej wyszukiwane usługi to: tworzenie stron internetowych, aplikacje mobilne, marketing, projektowanie graficzne, księgowość oraz usługi biznesowe.",
  },
  {
    question: "Czy platforma oferuje wsparcie w promowaniu moich usług?",
    answer:
      "Tak, oferty dostępne na naszym rynku są promowane m.in. za pośrednictwem Google.",
  },
  {
    question:
      "Jakie informacje powinienem umieścić w swoim profilu, aby przyciągnąć klientów?",
    answer:
      "Zadbaj o szczegółowy opis swoich usług, profesjonalne zdjęcia, referencje od klientów oraz jasne warunki współpracy.",
  },
  {
    question: "Czy platforma zapewnia ochronę płatności za świadczone usługi?",
    answer:
      "Płatności są ustalane bezpośrednio między klientami a dostawcami usług. Platforma nie pośredniczy w rozliczeniach.",
  },
  {
    question: "Jak mogę znaleźć pracę zdalną na Quixy?",
    answer:
      "Aby znaleźć pracę zdalną, przejdź do sekcji 'Kategorie' na naszej stronie. Możesz przeglądać dostępne oferty pracy, filtrować je według kategorii oraz aplikować bezpośrednio przez platformę.",
  },
  {
    question: "Jak mogę zatrudnić talent na Quixy?",
    answer:
      "Jeśli szukasz ekspertów do swojego projektu, przejdź do sekcji 'Szukaj'. Możesz przeglądać profile specjalistów, sprawdzać ich doświadczenie i umiejętności oraz nawiązywać współpracę bezpośrednio przez platformę.",
  },
  {
    question: "Czy Quixy zapewnia bezpieczeństwo moich danych?",
    answer:
      "Tak, bezpieczeństwo naszych użytkowników jest dla nas priorytetem. Korzystamy z niezawodnych technologii zabezpieczających dane oraz oferujemy wsparcie 24/7, aby zapewnić Ci bezpieczne i komfortowe korzystanie z platformy.",
  },
  {
    question: "Jakie korzyści oferuje Quixy nowym użytkownikom?",
    answer:
      "Nowi użytkownicy otrzymują darmowe Quixies na start, które mogą wykorzystać do korzystania z różnych funkcji platformy. To nasz sposób na powitanie Cię w społeczności Quixy i wsparcie Cię w rozpoczęciu Twojej przygody z nami.",
  },
  {
    question: "Jak mogę dodać ogłoszenie o pracę na Quixy?",
    answer:
      "Aby dodać ogłoszenie o pracę, zaloguj się na swoje konto, przejdź do sekcji 'Dodaj ofertę pracy' i wypełnij formularz z informacjami o ofercie pracy. Twoje ogłoszenie zostanie natychmiast opublikowane na platformie, aby przyciągnąć odpowiednich kandydatów.",
  },
  {
    question: "Gdzie mogę znaleźć opinie innych użytkowników o Quixy?",
    answer:
      "Opinie naszych klientów znajdziesz w sekcji 'Praca zdalna'. Z dumą prezentujemy oceny i recenzje, które świadczą o wysokiej jakości naszych usług oraz zaufaniu, jakim obdarzyli nas użytkownicy.",
  },
];

export const metadata: Metadata = {
  icons: [
    {
      url: "/favicons/favicon-32x32.png",
      sizes: "32x32",
      type: "image/png",
    },
    {
      url: "/favicon.ico",
      sizes: "48x48",
      type: "image/x-icon",
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
  publisher: "wesiu.dev",
  manifest: "/manifest.json",
  authors: [
    {
      name: "wesiudev",
      url: "https://wesiudev.com",
    },
  ],

  verification: {
    google: "google85185d3abec28326.html",
  },
  title: "Oferty Pracy Zdalnej | Praca Zdalna dla Freelancerów | Quixy.pl",
  description:
    "Nasi freelancerzy czekają na Ciebie! Prowadzisz rekrutację lub szukasz pracy? Quixy to idealne połączenie tych dwóch rzeczy.",
  openGraph: {
    type: "website",
    url: "https://quixy.pl",
    title: "Oferty Pracy Zdalnej | Praca Zdalna dla Freelancerów | Quixy.pl",
    description:
      "Nasi freelancerzy czekają na Ciebie! Prowadzisz rekrutację lub szukasz pracy? Quixy to idealne połączenie tych dwóch rzeczy.",
    siteName: "quixy.pl",
  },
};
