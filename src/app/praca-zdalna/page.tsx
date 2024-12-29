import Link from "next/link";
import dynamic from "next/dynamic";
import { Metadata } from "next";
const FAQ = dynamic(() => import("@/components/Faq"));
const OpinionsForm = dynamic(() => import("@/components/OpinionsForm"));
const Market = dynamic(() => import("@/components/marketplace/Market"));
import { FaRocket, FaUsers } from "react-icons/fa";
import Image from "next/image";
import { FaArrowRightLong, FaChevronRight } from "react-icons/fa6";
import HeroImage from "../../../public/happy.webp";
import gif from "../../../public/assets/gif/giremotework.webp";
import rozwoj from "../../../public/slug/rozwoj-oprogramowania.webp";
import ecommerce from "../../../public/slug/e-commerce.webp";
import marketing from "../../../public/slug/marketing.webp";
import uslugi from "../../../public/slug/uslugi-it.webp";
import biznesowe from "../../../public/slug/uslugi-biznesowe.webp";
import projektowanie from "../../../public/slug/projektowanie.webp";
import AiImage from "../../../public/assets/AI-Image.png";
import { getServices } from "@/lib/getServices";
import { Suspense } from "react";
import Loadinger from "./loading";
// Główna strona
export default async function Page() {
  const opinions = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/opinions?tubylytylkofigi=${process.env.API_SECRET_KEY}`
  ).then((res) => res.json());
  const services = await getServices();
  return (
    <Suspense fallback={<Loadinger />}>
      <div className="w-full h-full bg-white">
        <div className="">
          <HeroSection />
        </div>
        <main className="">
          <div className="container mx-auto">
            <CallToActionSection />
          </div>
          <div className="mt-12">
            <SpecialistsCategoriesSection />
          </div>
          <div className="container mx-auto">
            <WhatMakesUsUniqueSection />
          </div>
          <div className="container mx-auto px-4 lg:px-12" id="search">
            <Market services={services} />
          </div>
          <div className="container mx-auto px-4 lg:px-12">
            <FAQ faqItems={faqItems} />
          </div>
          <div className="mt-12">
            <OpinionsForm opinions={opinions} />
          </div>
        </main>
        <FunnyComponent />
      </div>
    </Suspense>
  );
}

function HeroSection() {
  return (
    <section
      className="py-12 text-left overflow-hidden relative bg-gradient-to-r from-primaryStart to-primaryEnd"
      style={{ boxShadow: "inset 0px 0px 10px rgba(0, 0, 0)" }}
    >
      <div className="absolute left-0 top-0 w-full h-auto">
        <Image
          priority
          src={AiImage}
          alt="Praca Zdalna Quixy"
          className="w-full h-full object-cover opacity-15"
          blurDataURL="data:image/webp;base64,UklGRiIAAABXRUJQVlA4WAoAAAAQAAAfAADuwH/xAAfAQADAAQAAAAAAQAvAQADAAQAAAAAAQAvAQA"
          placeholder="blur"
        />
      </div>
      <div className="relative z-50 mx-auto container px-4 lg:px-12">
        <Breadcrumbs />
        <h1
          style={{ lineHeight: 1.5 }}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-3 leading-snug w-full text-white"
        >
          Przeglądaj oferty pracy lub utwórz portfolio
        </h1>
        <p className="lg:text-lg  text-white max-w-3xl">
          Opublikuj swoje usługi na naszej platformie i rozpocznij pozyskiwanie
          klientów już dziś!
        </p>
        <div className="mt-5"></div>

        <div className="flex items-center gap-3">
          <Link
            className="block hover:underline text-white py-2 pr-4 w-max relative z-50"
            href="/register"
          >
            Utwórz konto
          </Link>
          <JoinButton />
        </div>
      </div>
    </section>
  );
}

// Komponent Breadcrumbs
function Breadcrumbs() {
  return (
    <div className="!text-white breadcrumbs relative z-50">
      <ul className="flex flex-wrap">
        <li>
          <Link title="home" href={`/`}>
            hello!
          </Link>
        </li>
        <li>
          <Link
            className="text-accentStart"
            title="praca zdalna"
            href={`/praca-zdalna`}
          >
            praca-zdalna
          </Link>
        </li>
      </ul>
    </div>
  );
}

// Przycisk dołączenia jako talent
function JoinButton() {
  return (
    <Link
      className="block hover:scale-105 duration-100 rounded-md bg-gradient-to-b from-ctaStart to-ctaEnd text-white py-2 px-4 w-max  relative z-50"
      href="/register"
    >
      Dodaj ofertę
    </Link>
  );
}

// Sekcja kategorii specjalistów
function SpecialistsCategoriesSection() {
  return (
    <section className="py-12 mb-12 w-full bg-gradient-to-r from-primaryStart to-primaryEnd">
      <div className="mb-12 px-4 lg:px-12 container mx-auto">
        <h2 className="text-3xl font-extrabold text-white">
          Nasze kategorie pracy
        </h2>
        <p className="text-white max-w-lg">
          Poszukujesz specjalistów do wykonania zlecenia? Wybierz kategorię i
          znajdź odpowiednich kandydatów!
        </p>
      </div>
      <div className="flex flex-col mt-3 lg:mt-0 px-4 lg:px-12 container mx-auto">
        {links.map((link, index) => (
          <Link
            key={index}
            href={link.href}
            className={`${
              index > 0 && "mt-6"
            } group overflow-hidden flex flex-col lg:flex-row w-full items-center justify-start sm:hover:bg-gradient-to-r sm:hover:from-white/20 sm:hover:to-white/20 bg-gradient-to-r from-white/10 to-white/10 rounded-xl`}
          >
            <div className="relative w-full lg:w-max h-full">
              <Image
                src={link.imageSrc}
                alt={link.imageAlt}
                className="w-full lg:w-[250px] h-auto rounded-md"
                blurDataURL="data:image/webp;base64,UklGRiIAAABXRUJQVlA4WAoAAAAQAAAfAADuwH/xAAfAQADAAQAAAAAAQAvAQADAAQAAAAAAQAvAQA"
                placeholder="blur"
              />
            </div>
            <div className="w-full">
              <div className="px-4 lg:px-12 py-3 pr-3">
                <h2 className="lg:mt-0 text-2xl font-extrabold text-white">
                  {link.title}
                </h2>
                <p className="mb-3  text-white mt-2">{link.description}</p>
                <div
                  className="w-full text-white group-hover:underline font-bold"
                  aria-label={link.goTo}
                >
                  <span className="px-4 py-2 justify-center w-max bg-gradient-to-b from-accentStart to-accentEnd flex items-center rounded-md">
                    {link.goTo}
                    <FaArrowRightLong className="scale-100 group-hover:scale-110 ml-2 duration-150" />
                  </span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

function WhatMakesUsUniqueSection() {
  return (
    <section className="my-12 px-4 lg:px-12">
      <h2 className="text-3xl mb-6 text-black font-extrabold">
        Co nas wyróżnia?
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-8 text-center">
        <HighlightCard
          icon={<FaRocket className="text-white text-5xl" />}
          title="Kreator portfolio"
          description="Zaprezentuj swoje usługi na rynku i zdobądź zlecenia."
          linkTitle="Utwórz profil"
        />
        <HighlightCard
          icon={<FaRocket className="text-white text-5xl" />}
          title="Oferty pracy"
          description="Dodaj ofertę pracy i przyśpiesz proces rekrutacji."
          linkTitle="Dodaj ofertę"
        />
        <HighlightCard
          icon={<FaUsers className="text-white text-5xl" />}
          title="Dostępni eksperci"
          description="Współpracujemy z doświadczonymi firmami oraz freelancerami."
          linkTitle="Szukaj pracy"
        />
        {/* <HighlightCard
          icon={<FaCogs className="text-white text-5xl" />}
          title="Usługi AI"
          description="Sprawdź za darmo generator obrazów"
          linkTitle="Wypróbuj"
        /> */}
      </div>
    </section>
  );
}

// Komponent HighlightCard do wyróżnienia cech
function HighlightCard({
  icon,
  title,
  description,
  linkTitle,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  linkTitle: string;
}) {
  return (
    <div className="p-3 relative bg-gradient-to-r from-primaryStart/30 to-primaryEnd/30 rounded-lg flex items-center justify-center flex-col">
      <div className="shadow-lg bg-gradient-to-b from-primaryStart to-primaryEnd text-white rounded-full aspect-square w-32 flex items-center justify-center mx-auto">
        {icon}
      </div>
      <h3 className="text-xl font-extrabold text-black mb-2 mt-4">{title}</h3>
      <p className="text-black">{description}</p>

      <Link
        className="hover:scale-105 duration-100 block mt-4 w-max max-w-full mx-auto rounded-md shadow-md bg-gradient-to-b from-ctaStart to-ctaEnd text-white px-4 py-2"
        href="/register"
        title={linkTitle}
      >
        {linkTitle}
      </Link>
      <div className="mb-3"></div>
    </div>
  );
}
function CallToActionSection() {
  return (
    <section className="flex flex-col lg:flex-row lg:my-12 text-left mx-auto">
      <div className="px-4 lg:pl-12 overflow-hidden h-full mt-12 lg:mt-0">
        <Image
          src={HeroImage}
          blurDataURL="data:image/webp;base64,UklGRiIAAABXRUJQVlA4WAoAAAAQAAAfAADuwH/xAAfAQADAAQAAAAAAQAvAQADAAQAAAAAAQAvAQA"
          placeholder="blur"
          alt="Logo serwisu quixy.pl"
          className="max-w-full lg:max-w-[600px] h-auto rounded-md"
          priority
        />
      </div>
      <div className="px-4 lg:pl-6 lg:pr-12">
        <div className="flex flex-col w-full">
          <h2 className="font-extrabold text-3xl mb-2 text-black mt-6 lg:mt-0">
            Znajdziesz pracę zdalną!
          </h2>
          <p className="text-black lg:max-w-3xl">
            Quixy to najskuteczniejsza platforma z pracą zdalną w Polsce.
            Technologia z której korzystamy jest szybka i niezawodna. Stwórz
            portfolio w którym zaprezentujesz swoje usługi.
          </p>
          <Link
            href="/register"
            title="Zarejestruj się w jedynej takiej polskiej platformie dla freelancerów i firm"
            className="hover:scale-105 duration-100 w-max max-w-full flex items-center gap-3 text-white mt-3 px-4 py-2 rounded-md bg-gradient-to-b from-ctaStart to-ctaEnd text"
          >
            Dołącz teraz <FaChevronRight />
          </Link>
        </div>
      </div>
    </section>
  );
}

// Zabawny komponent
function FunnyComponent() {
  return (
    <div className="relative mx-auto w-full bg-white container px-4 lg:px-12 my-24">
      <div className="flex flex-col md:flex-row md:items-start text-black text-lg lg:text-xl">
        <Image
          src={gif}
          layout="responsive"
          width={512}
          height={512}
          alt="Praca zdalna w biurze"
          title="Praca zdalna w biurze"
          className="w-full md:max-w-[300px] rounded-md h-auto mt-4 lg:mt-0"
        />
        <div className="md:px-6 mt-4 lg:mt-0 flex-1">
          <h2 className="text-2xl lg:text-3xl font-extrabold text-black mb-4">
            Potrzebujesz chwili wytchnienia?
          </h2>
          <p className="text-black mb-4">
            Praca zdalna może być intensywna, ale kto powiedział, że nie może
            być zabawnie?
          </p>

          <p className="bg-gradient-to-b from-accentStart to-accentEnd p-2 text-lg lg:text-xl text-white w-max max-w-full rounded-md">
            „Zatrudnij mnie, zanim zrobi to ktoś inny! 🤖” – Najnowsza AI
          </p>
          <p className="mt-4 text-xs lg:text-sm text-black">
            *Tylko żart, obiecujemy, że nie zatrudniamy robotów... jeszcze.*
          </p>
        </div>
      </div>
    </div>
  );
}

// Optymalizacja metadanych
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
  openGraph: {
    type: "website",
    siteName: "Quixy",
    images: [
      {
        url: "https://quixy.pl/favicons/android-chrome-512x512.png",
        type: "image/png",
      },
    ],
  },
  twitter: {
    site: "@ZZRPWiS",
    images: {
      url: "https://quixy.pl/favicons/android-chrome-512x512.png",
    },
  },
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
  title: "Praca Zdalna Zlecenia dla Freelancerów | Freelancer Job Boards",
  description:
    "Znajdź klientów i realizuj projekty zdalnie na naszej platformie. Oferty w IT, e-commerce, marketingu, animacji i więcej! Zarejestruj się i zacznij już dziś.",
};

const faqItems = [
  {
    question: "Czy oferujecie gwarancję jakości?",
    answer:
      "Każdy nasz specjalista jest weryfikowany, aby zapewnić najwyższą jakość usług.",
  },
  {
    question: "Jak mogę się skontaktować z zespołem wsparcia?",
    answer:
      "Możesz skontaktować się z nami poprzez formularz, email lub telefon, dostępny na naszej stronie kontaktowej.",
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
      "Dodanie usługi do naszej platformy wiąże się z jednorazową opłatą.",
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
      "Tak, nasze podstrony oraz oferty dostępne na rynku są promowane m.in. za pośrednictwem Google.",
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
];
const links = [
  {
    href: "/praca-zdalna/rozwoj-oprogramowania",
    imageSrc: rozwoj,
    imageAlt: "Zatrudnij ekspertów od Rozwoju Oprogramowania",
    title: "Specjaliści rozwoju oprogramowania",
    description:
      "Nasza platforma łączy Cię z doświadczonymi programistami, którzy dostosują i stworzą oprogramowanie odpowiadające Twoim potrzebom biznesowym.",
    goTo: "Rozwój oprogramowania",
  },
  {
    href: "/praca-zdalna/e-commerce",
    imageSrc: ecommerce,
    imageAlt: "Wdrożenie Sklepów Internetowych z naszymi ekspertami",
    title: "Programiści sklepów internetowych",
    description:
      "Nasza platforma oferuje dostęp do specjalistów od e-commerce, którzy pomogą Ci maksymalizować sprzedaż i poprawić doświadczenia użytkowników.",
    goTo: "E-Commerce",
  },
  {
    href: "/praca-zdalna/marketing",
    imageSrc: marketing,
    imageAlt: "Zatrudnij specjalistów od Marketingu",
    title: "Specjaliści marketingu",
    description:
      "Potrzebujesz skutecznej promocji? Skorzystaj z wiedzy naszych doświadczonych marketerów online.",
    goTo: "Marketing",
  },
  {
    href: "/praca-zdalna/uslugi-it",
    imageSrc: uslugi,
    imageAlt: "Zatrudnij ekspertów od Wsparcia IT",
    title: "Specjaliści Wsparcia IT",
    description:
      "Specjaliści IT, którzy zapewnią wsparcie techniczne, zarządzanie infrastrukturą, a także optymalizację Twoich systemów.",
    goTo: "Usługi IT",
  },
  {
    href: "/praca-zdalna/uslugi-biznesowe",
    imageSrc: biznesowe,
    imageAlt: "Zatrudnij doradców biznesowych",
    title: "Doradcy biznesowi",
    description:
      "Skorzystaj z doświadczenia naszych specjalistów, aby przyspieszyć rozwój i zwiększyć efektywność swojego przedsięwzięcia biznesowego.",
    goTo: "Usługi biznesowe",
  },
  {
    href: "/praca-zdalna/projektowanie",
    imageSrc: projektowanie,
    imageAlt: "Zatrudnij Projektantów dla Twojego Biznesu",
    title: "Projektanci i designerzy",
    description:
      "Czy potrzebujesz profesjonalnego projektu graficznego lub strony internetowej? Połączymy Cię z doświadczonymi projektantami, którzy przekształcą Twoje wizje w rzeczywistość.",
    goTo: "Projektowanie",
  },
];
