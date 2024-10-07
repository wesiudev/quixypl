import Image from "next/image";
import Link from "next/link";
import {
  FaEdit,
  FaLongArrowAltRight,
  FaStar,
  FaUpload,
  FaUser,
} from "react-icons/fa";

import HomePageGenerator from "@/components/HomePageGenerator";
import UserSearchWrapper from "@/components/HomeUnderHero/UserSearchWrapper";
import SearchJobs from "@/components/HomeUnderHero/SearchJobs";
import Opportunities from "@/components/HomeUnderHero/Opportunities";
import OpenableOpportunity from "@/components/HomeUnderHero/OpenableOpportunity";
import jobs from "../../public/14.09.2024.json";
import MainFooter from "@/components/MainFooter";
import { Metadata } from "next";
import { sendGenerateIdeaRequest } from "../../utils/sendGenerateIdeaRequest";
import Header from "@/components/Header";
import FAQ from "@/components/Faq";

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
  title: "Quixy Praca Zdalna - Szukaj Pracy - Zatrudnij Talent",
  description:
    "Nasi eksperci czekają na Ciebie! Prowadzisz rekrutację lub szukasz pracy? Quixy to idealne połączenie tych dwóch rzeczy.",
  openGraph: {
    type: "website",
    url: "https://quixy.pl",
    title: "Quixy Praca Zdalna - Szukaj Pracy - Zatrudnij Talent",
    description:
      "Nasi eksperci czekają na Ciebie! Prowadzisz rekrutację lub szukasz pracy? Quixy to idealne połączenie tych dwóch rzeczy.",
    siteName: "quixy.pl",
  },
};

export default async function Page() {
  const itCategories = jobs.flatMap((job) => [
    { title: job.title, data: job.data.map((subItem) => subItem) },
  ]);
  return (
    <div className="flex flex-col bg-white">
      <Header jobsList={itCategories} />
      <div className="flex flex-col items-center md:flex-row sm:mx-8 lg:mx-[7vw] 2xl:mx-[12vw]">
        <div className="mt-48 md:mt-0 py-12 sm:py-24 lg:py-0 md:h-[80vh] flex md:justify-end items-center">
          <div className="group relative flex flex-col">
            <div className="z-[10] md:hidden absolute left-1/2 -translate-x-1/2 sm:-translate-x-0 -top-24 p-3 sm:left-0 h-[90px] w-auto">
              <Image
                src="/assets/quixy-logo.png"
                width={123}
                height={123}
                alt="Pracuj Zdalnie Z Quixy Talent"
                title="Pracuj Zdalnie Z Quixy Talent"
                className="h-full w-auto"
              />
            </div>
            <h2
              style={{
                lineHeight: 1,
                letterSpacing: "-2px",
                textShadow: "0px 0px 2px black",
              }}
              className="scale-90 sm:scale-100 font-gotham text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-black font-bold lg:max-w-[40rem] sm:pr-12 text-center sm:text-left leading-relaxed drop-shadow-3xl shadow-black max-w-sm mx-auto sm:mx-0"
            >
              Twoja platforma pracy zdalnej
            </h2>
            <h2 className="scale-90 sm:scale-100 px-3 sm:pl-1 font-light text-black mt-6 font-gotham lg:text-lg xl:text-xl sm:pr-8 lg:pr-12 2xl:pr-[10vw] text-center sm:text-left">
              Pierwszy polski serwis łączący{" "}
              <b className="text-black">ekspertów</b> {" z "}
              <b className="text-black">pracodawcami</b> technologią{" "}
              <Link href="/about#ccrm">
                <b>CCRM!</b>
              </Link>
            </h2>
            <div className="flex items-center gap-2 sm:gap-3 lg:gap-4 w-full justify-center mt-2 sm:justify-start">
              <Link
                href="/praca-zdalna"
                title="Rekrutuj do pracy zdalnej na panelu Quixy"
                className="font-gotham rounded-md bg-primary hover:bg-opacity-90 duration-100 text-white font-bold text-sm lg:text-base p-2 py-1.5 text-center"
              >
                <h2 className="w-max mx-auto">Zatrudnij talent</h2>
              </Link>
              <Link
                href="/praca-zdalna"
                title="Szukaj pracy zdalnej na panelu Quixy"
                className="font-gotham rounded-md bg-cta hover:bg-opacity-90 duration-100 text-white font-bold text-sm lg:text-base p-2 py-1.5 text-center"
              >
                <h2 className="w-max mx-auto">Pracuj zdalnie</h2>
              </Link>
            </div>
            <div className="mt-4 text-base font-gotham text-black font-light text-center sm:text-left max-w-xl ">
              Zaufało nam 97% klientów
            </div>
            <div className="mt-6 flex items-center flex-wrap w-full -ml-6 justify-center sm:justify-start">
              <Image
                src="/assets/google.png"
                width={224}
                height={224}
                alt="google nam zaufało"
                className="max-h-[32px] w-auto ml-6 mt-6"
              />
              <Image
                src="/assets/deviant.png"
                width={224}
                height={224}
                alt="deviant nam zaufał"
                className="max-h-[32px] w-auto ml-6 mt-6"
              />
              <Image
                src="/assets/pinterest.png"
                width={224}
                height={224}
                alt="pinterest nam zaufał"
                className="max-h-[32px] w-auto ml-6 mt-6"
              />
            </div>
          </div>
        </div>
        <div className="md:h-[45vh] w-1/2 rounded-3xl overflow-hidden items-center hidden md:flex 2xl:pl-[10vw] relative">
          <Image
            src="/assets/heroimg.png"
            width={1500}
            height={1028}
            alt="Quixy Hero Image"
            className="absolute inset-0 object-cover w-full h-full group-hover:scale-110 duration-500"
          />
        </div>
      </div>
      <div className="infinite-bg mx-4 sm:mx-8 lg:mx-12 2xl:mx-[15vw] p-3 sm:px-12 py-6 rounded-2xl h-max">
        <div className="flex flex-col justify-center items-center">
          <div className="flex flex-row">
            <h2
              style={{
                lineHeight: 1.325,
                textShadow: "0px 2px 2px rgba(0, 0, 0, 0.6)",
              }}
              className="w-full md:max-w-[50rem] font-gotham font-light text-lg  md:text-xl lg:text-2xl xl:text-3xl text-white text-center"
            >
              Wyobraź sobie swój wymarzony biznes, pomnożony przez
              maksymalizację efektywności💎
            </h2>
          </div>
        </div>
      </div>
      <div className="w-full rounded-3xl mx-4 sm:mx-8 lg:mx-12 2xl:mx-[15vw] mt-16 mb-4">
        <div className="flex flex-col md:flex-row mx-auto text-black text-xl">
          <div className="flex flex-col w-full">
            <h2 className="font-gotham mb-3 text-2xl sm:text-4xl  font-bold flex items-center">
              Darmowy wstęp
            </h2>
            <p className="font-gotham font-light flex text-left max-w-[40rem] pr-6">
              Dołączenie do naszej platformy pracy jest w pełni darmowe!
              Zapraszamy do dodawania ofert pracy oraz zatrudnienia talentów.
            </p>
            <Link
              href="/register"
              className="text-white bg-[#14A800] font-gotham py-1.5 px-2 rounded-md w-max mt-2 font-light hover:bg-opacity-90"
            >
              Rejestracja
            </Link>
          </div>
          <div className="w-full">
            <Image
              src="https://media.giphy.com/media/U2O50cAkpmTjG/giphy.gif"
              width={512}
              height={512}
              alt=""
              className="mt-4 md:mt-0 rounded-2xl max-w-[300px]"
            />
          </div>
        </div>
      </div>
      <UserSearchWrapper>
        <SearchJobs />
        <Opportunities>
          {jobs.map((opportunity: any, i: any) => (
            <OpenableOpportunity key={i} opportunity={opportunity} i={i} />
          ))}
        </Opportunities>
      </UserSearchWrapper>
      <div
        id="generator"
        className="mb-24 py-12 px-4 sm:px-8 lg:px-12 2xl:px-[15vw] bg-[#2E3C56]"
      >
        <div className="flex flex-col mb-12">
          <h2 className="font-gotham text-2xl md:text-3xl lg:text-4xl font-bold text-white drop-shadow-md shadow-black">
            Wygeneruj nowy pomysł z{" "}
            <b className="font-bold text-cta">Quixy AI&trade;</b>
          </h2>
          <p className="max-w-[40rem] text-white mt-6 mb-3">
            Burza mózgów, dzięki której stworzysz pomysły na biznes internetowy
            lub in-person. Stworzone z myślą o Twoich potrzebach.
          </p>
          <Link
            href="/business-ideas"
            className="text-white bg-cta font-gotham py-1.5 px-2 rounded-md w-max font-light hover:bg-opacity-90"
          >
            Zobacz wszystkie pomysły
          </Link>
        </div>
        <HomePageGenerator sendGenerateIdeaRequest={sendGenerateIdeaRequest} />
      </div>
      <div className="mx-4 sm:mx-8 lg:mx-12 2xl:mx-[15vw] h-max">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="h-full w-full md:p-3 lg:p-0 lg:bg-white md:bg-[#f7faf7] rounded-xl rounded-tl-[80px]">
            <Image
              src="/assets/happy-woman.webp"
              width={1024}
              height={1024}
              alt="Praca zdalna Quixy Talent"
              style={{ boxShadow: "0px 0px 5px black" }}
              className="rounded-t-2xl rounded-b-2xl rounded-tl-[80px]"
            />
          </div>
          <div className="flex flex-col px-3 md:pl-6 lg:pl-12 font-coco text-black">
            <h2
              style={{ lineHeight: 1.325 }}
              className="font-gotham text-3xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold  drop-shadow-md shadow-black mb-6 mt-6 md:mt-0"
            >
              Realizuj projekty z najlepszymi.
            </h2>
            <div className="flex">
              <FaEdit className="h-8 w-8 font-bold text-cta" />
              <div className="ml-3 flex flex-col">
                <h3 className="font-bold text-lg lg:text-xl">
                  Wstęp jest darmowy
                </h3>
                <p className="text-black text-sm ">
                  Zanurz się w świecie biznesu! Zarejestruj się, odkrywaj
                  projekty i planuj koncepty.{" "}
                </p>
              </div>
            </div>
            <div className="flex mt-3">
              <FaUpload className="h-8 w-8 font-bold text-cta" />
              <div className="ml-3 flex flex-col">
                <h3 className="font-bold text-lg lg:text-xl text-black">
                  Dodaj ofertę i zatrudnij eksperta{" "}
                </h3>
                <p className="text-black text-sm ">
                  Znajdź utalentowane osoby, skontaktuj się i rozpocznijcie
                  współpracę.
                </p>
              </div>
            </div>
            <div className="flex mt-3">
              <FaStar className="h-8 w-8 font-bold text-cta" />
              <div className="ml-3 flex flex-col">
                <h3 className="font-bold text-lg lg:text-xl">
                  Pracuj z najlepszymi
                </h3>
                <p className="text-black text-sm">
                  Z <b className="italic">Quixy Talent&trade;</b> znajdziesz
                  najlepszych zawodowców, którzy ci pomogą.
                </p>
              </div>
            </div>
            <div className="flex flex-row">
              <Link
                className="rounded-md p-1.5 px-12 bg-cta mt-6 text-white font-bold"
                href={`${process.env.NEXT_PUBLIC_URL}/register`}
              >
                Rejestracja
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="relative mx-4 sm:mx-8 lg:mx-12 2xl:mx-[15vw] mt-24 bg-cover bg-center lg:bg-right-bottom p-4 lg:p-8 h-max bg-woman-pc rounded-xl">
        <div className="absolute left-0 top-0 rounded-xl bg-black bg-opacity-50 w-full h-full z-0"></div>
        <div className="absolute left-4 lg:left-6 top-4 lg:top-6 font-coco text-lg lg:text-xl text-white">
          Quixy Talent&trade;
        </div>
        <div className="flex flex-col justify-end relative z-10 h-full w-full mt-[30vh]">
          <h2 className="text-4xl md:text-5xl lg:text-6xl text-white font-bold font-gotham">
            Znajdź i zatrudnij specjalistę
          </h2>
          <p className="text-white text-base my-6 lg:w-1/2">
            Przeglądaj specjalistów i zleć wykonanie projektu.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 font-gotham gap-4">
            <Link
              href={`${process.env.NEXT_PUBLIC_URL}/praca-zdalna`}
              className="flex flex-col rounded-xl bg-[#126b91] hover:bg-opacity-100 bg-opacity-70 text-white p-3 duration-300"
            >
              <h3 className="md:mb-3 text-xl sm:text-xl md:text-2xl lg:text-3xl font-bold">
                Zatrudnij talent
              </h3>
              <div className="flex flex-row items-center font-light">
                Chcesz znaleźć pomoc eksperta?
                <FaLongArrowAltRight className="ml-2" />
              </div>
            </Link>
            <Link
              href={`${process.env.NEXT_PUBLIC_URL}/register`}
              className="flex flex-col hover:bg-opacity-100 bg-opacity-70 rounded-xl text-white bg-[#126b91] group p-3 duration-300"
            >
              <h3 className="md:mb-3 text-xl sm:text-xl md:text-2xl lg:text-3xl font-bold">
                Generator pomysłów
              </h3>
              <div className="flex flex-row items-center font-light">
                Wygeneruj pomysł na biznes i zleć wykonanie ekspertowi Quixy
                Talent&trade;
                <FaLongArrowAltRight className="ml-2" />
              </div>
            </Link>
            <Link
              href={`${process.env.NEXT_PUBLIC_URL}/praca-zdalna/rozwoj-oprogramowania/web-development`}
              className="flex flex-col rounded-xl bg-[#126b91] text-white hover:bg-opacity-100 bg-opacity-70 group p-3 duration-300"
            >
              <h3 className="md:mb-3 text-xl sm:text-xl md:text-2xl lg:text-3xl font-bold">
                Zamów stronę internetową
              </h3>
              <div className="flex flex-row items-center font-light">
                Stwórz oprogramowanie z Quixy Talent&trade;
                <FaLongArrowAltRight className="ml-2" />
              </div>
            </Link>
          </div>
        </div>
      </div>
      <div className="mx-4 md:mx-8 lg:mx-12 2xl:mx-[15vw] mt-24 flex-col flex md:flex-row md:space-x-6">
        <div className="md:w-[66%] w-full  text-black rounded-t-xl p-4 lg:p-6">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-coco">
            Dlaczego warto wybrać Quixy?
          </h2>
          <div className="flex flex-col space-y-3 mt-6">
            <div className="flex flex-row mt-3">
              <span className="text-2xl">⭐</span>
              <div className="ml-3 flex flex-col">
                <h3 className="font-bold text-lg lg:text-2xl -mt-1">
                  Gwarancja jakości
                </h3>
                <p className=" text-sm md:text-lg w-3/4">
                  Korzystamy z własnych rozwiązań
                </p>
              </div>
            </div>
            <div className="flex flex-row">
              <span className="text-2xl">💎</span>
              <div className="ml-3 flex flex-col">
                <h3 className="font-bold text-lg lg:text-2xl -mt-1">
                  Darmowe Quixies na start
                </h3>
                <p className=" text-sm md:text-lg w-3/4">
                  Na początku przygody otrzymasz od nas bonus.
                </p>
              </div>
            </div>
            <div className="flex flex-row">
              <span className="text-2xl">✔️</span>
              <div className="ml-3 flex flex-col">
                <h3 className="font-bold text-lg lg:text-2xl -mt-1">
                  Zapewnimy bezpieczeństwo
                </h3>
                <p className=" text-sm md:text-lg w-3/4">
                  Skoncentruj się na swojej pracy. Jesteśmy dostępni 24/7 by ci
                  pomóc.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="rounded-2xl md:w-[33%] w-full bg-[#126b91] lg:bg-transparent relative md:rounded-xl md:flex-col grid grid-cols-2 md:flex md:justify-end p-4 md:p-6">
          <div className="h-full flex flex-col justify-end">
            <h3 className="max-w-[250px] text-base sm:text-2xl lg:text-3xl font-gotham mb-3 text-white lg:text-black">
              Wszyscy asystenci w jednym miejscu
            </h3>
            <div className="flex flex-row items-start bg-white md:bg-gray-200 p-2 rounded-xl w-full">
              <FaStar className="ml-2 min-w-[60px] h-auto max-w-[60px] font-bold text-cta" />
              <div className="ml-3 flex flex-col">
                <h3 className="text-lg lg:text-2xl text-black  font-bold -mt-1">
                  4.95/5
                </h3>
                <p className="text-black text-xs sm:text-sm md:text-base font-coco">
                  Według opinii naszych klientów
                </p>
              </div>
            </div>
            <div className="flex flex-row items-start bg-white md:bg-gray-200 p-2 rounded-xl mt-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="ml-2 min-w-[60px] max-w-[60px]"
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
                <h3 className="text-lg lg:text-2xl text-black font-bold -mt-1">
                  5/5
                </h3>
                <p className="text-black text-xs sm:text-sm md:text-base font-coco">
                  Korzystamy z niezawodnej technologii
                </p>
              </div>
            </div>
          </div>
          <Image
            src="/assets/ninja.png"
            width={222}
            height={222}
            alt="Gwarancja jakości Quixy"
            className="relative md:absolute -right-6 -top-24 md:-left-44 md:-top-6 h-auto mx-auto md:mx-0 md:scale-75"
          />
        </div>
      </div>
      {/* just a component for the future 🤷‍♀️ */}
      <div className="relative md:mx-8 lg:mx-12 2xl:mx-[15vw] mt-24 h-max md:h-[70vh] rounded-xl mb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 w-full h-full relative">
          <div className="bg-guitar-man bg-center md:rounded-l-xl h-[50vh] md:h-full"></div>
          <div className="p-4 lg:p-6 text-white bg-[#126b91] md:rounded-r-xl w-full md:h-full grid grid-cols-1">
            <div>
              <span className="text-lg font-coco">Quixy Talent&trade;</span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-gotham mt-6">
                Szukaj zleceń lub pracy zdalnej
              </h2>
              <p className="text-base md:text-lg my-6 font-coco">
                Przeglądaj zlecenia klientów, szukaj pracy zdalnej lub
                sprzedawaj gotowe strony internetowe, aplikacje lub projekty.
              </p>
              <Link
                className="button !bg-white hover:!bg-gray-300 duration-300 !text-primary w-max h-max"
                href="/register"
              >
                Znajdź klientów
              </Link>
            </div>
            <div className="flex items-end font-coco text-base md:text-sm lg:text-base xl:text-lg">
              <div className="w-full grid grid-cols-2 lg:grid-cols-3 gap-5 md:gap-3 lg:gap-5 xl:gap-6 pt-3 mt-12 border-t border-white">
                <h4>Znajduj odpowiednie zlecenia dla siebie</h4>
                <h4>Sprzedawaj swoje gotowe prace</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mx-4 bg-white relative md:mx-8 lg:mx-12 2xl:mx-[15vw] h-max rounded-xl mb-20">
        <FAQ faqItems={faqItems} />
      </div>
      <MainFooter jobsList={itCategories} />
    </div>
  );
}

const faqItems = [
  {
    question: "Czym jest Quixy Talent™?",
    answer:
      "Quixy Talent™ to opcja na stronie, która łączy pracodawców z talentami, umożliwiając realizację projektów zdalnych. Dzięki naszym narzędziom możesz łatwo znaleźć odpowiednich specjalistów lub zaoferować swoje usługi.",
  },
  {
    question: "Jak mogę zarejestrować się na platformie Quixy?",
    answer:
      "Rejestracja na Quixy jest całkowicie darmowa. Wystarczy kliknąć przycisk 'Rejestracja' na stronie głównej, wypełnić formularz rejestracyjny i zweryfikować swój adres e-mail.",
  },
  {
    question: "Czy korzystanie z Quixy jest darmowe?",
    answer:
      "Tak, dołączenie do naszej platformy jest w pełni darmowe. Możesz dodawać oferty pracy, zatrudniać talenty oraz korzystać z generatora pomysłów używając Quixies.",
  },
  {
    question:
      "Jak działa generator pomysłów na biznes i w jaki sposób łączy pracodawcę z talentem?",
    answer:
      "Generator pomysłów Quixy pomaga w burzy mózgów, umożliwiając tworzenie koncepcji biznesowych zarówno dla działalności online, jak i offline. Nasi klienci korzystający z Generatora pomysłów często zamawiają strony internetowe, aplikacje, marketing i księgowość zdalną.",
  },
  {
    question: "Jak mogę znaleźć pracę zdalną na Quixy?",
    answer:
      "Aby znaleźć pracę zdalną, przejdź do sekcji 'Pracuj zdalnie' na naszej stronie. Możesz przeglądać dostępne oferty pracy, filtrować je według kategorii oraz aplikować bezpośrednio przez platformę.",
  },
  {
    question: "Jak mogę zatrudnić talent na Quixy?",
    answer:
      "Jeśli szukasz ekspertów do swojego projektu, przejdź do sekcji 'Zatrudnij talent'. Możesz przeglądać profile specjalistów, sprawdzać ich doświadczenie i umiejętności oraz nawiązywać współpracę bezpośrednio przez platformę.",
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
