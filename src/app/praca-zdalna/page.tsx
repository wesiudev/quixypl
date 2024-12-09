import Link from "next/link";
import jobs from "../../../public/14.09.2024.json";
import "../../styles/globals.css";
import { Metadata } from "next";
import Header from "@/components/Header";
import FAQ from "@/components/Faq";
import OpinionsForm from "@/components/OpinionsForm";
import { FaRocket, FaUsers, FaCogs } from "react-icons/fa";
import MainFooter from "@/components/MainFooter";
import Image from "next/image";
import { FaArrowRightLong } from "react-icons/fa6";
import Market from "@/components/marketplace/Market";
import { getDocuments } from "@/firebase";

// Główna strona
export default async function Page() {
  const leads: any = await getDocuments("services");
  return (
    <div className="w-full h-full bg-white">
      <Header jobsList={jobs} />
      <div className="">
        <HeroSection />
      </div>
      <main className="">
        <div className="container mx-auto">
          <CallToActionSection />
        </div>
        <div className="container mx-auto">
          <WhyChooseQuixySection />
        </div>
        <div className="mt-12">
          <SpecialistsCategoriesSection />
        </div>
        <div className="container mx-auto">
          <WhatMakesUsUniqueSection />
        </div>
        <div className="container mx-auto px-4 lg:px-12" id="search">
          <Market leads={leads} />
        </div>
        <div className="container mx-auto px-4 lg:px-12">
          <FAQ faqItems={faqItems} />
        </div>
        <OpinionsForm />
      </main>
      <FunnyComponent />
      <MainFooter jobsList={jobs} />
    </div>
  );
}

function HeroSection() {
  return (
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
      <div className="relative z-50 mx-auto container p-4 lg:p-12">
        <Breadcrumbs />
        <h1
          style={{ lineHeight: 1.5 }}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-3 leading-snug w-full text-white"
        >
          Przeglądaj oferty pracy lub utwórz portfolio
        </h1>
        <p className="lg:text-lg font-coco text-white max-w-3xl">
          Opublikuj swoje usługi na naszej platformie i rozpocznij pozyskiwanie
          klientów już dziś!
        </p>
        <div className="mt-5"></div>

        <JoinButton />
      </div>
    </section>
  );
}

// Komponent Breadcrumbs
function Breadcrumbs() {
  return (
    <div className="!text-white breadcrumbs relative z-50">
      <ul className="flex flex-wrap font-light">
        <li>
          <Link title="home" href={`/`}>
            hello!
          </Link>
        </li>
        <li>
          <Link title="praca zdalna" href={`/praca-zdalna`}>
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
      className="hover:scale-110 duration-100 rounded-r-xl bg-gradient-to-r from-transparent to-cta text-white hover:bg-opacity-90 py-2 px-4 font-extrabold w-max mx-auto relative z-50"
      href="/register"
    >
      Zarejestruj się
    </Link>
  );
}

function WhyChooseQuixySection() {
  return (
    <section className="px-6 lg:px-12 text-left flex flex-col-reverse lg:flex-row lg:items-center">
      <h3 className="text-left lg:text-center font-bold">
        <Link
          className="rounded-xl w-max max-w-[100%] lg:mx-auto text-center p-3 flex lg:flex-col items-center justify-center bg-gradient-to-r from-primary to-cta hover:from-primary/80 hover:to-cta/80 text-white  lg: lg:h-max relative z-50 mt-6 lg:mt-0 lg:mb-0"
          href="/register"
        >
          <div className="mb-0 lg:mb-3 mr-3 lg:mr-0">
            <FaRocket className="lg:text-6xl text-xl" />
          </div>
          <div className="lg:w-[200px] lg:text-center">
            Dodaj ogłoszenie o pracę za darmo
          </div>
        </Link>
      </h3>
      <div className="flex flex-col w-full lg:pl-12">
        <h2 className="font-extrabold text-3xl mb-2 text-black mt-6 lg:mt-0">
          Dlaczego warto wybrać Quixy?
        </h2>
        <p className="text-black lg:max-w-3xl">
          Oferujemy połączenie z najlepszymi specjalistami w rozwoju
          oprogramowania, usługach IT, marketingu, designu, i nie tylko. Nasza
          platforma łączy klientów z doświadczonymi profesjonalistami, którzy
          dostarczają najwyższej jakości usługi.
        </p>
      </div>
    </section>
  );
}

// Sekcja kategorii specjalistów
function SpecialistsCategoriesSection() {
  return (
    <section className="py-12 mb-12 w-full bg-gradient-to-r from-primary to-cta">
      <div className="mb-12 px-4 lg:px-12 container mx-auto">
        <h2 className="text-3xl font-extrabold text-white">
          Kategorie pracy zdalnej
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
            } group overflow-hidden flex flex-col lg:flex-row w-full items-center justify-start sm:hover:bg-gradient-to-r sm:hover:from-transparent sm:hover:to-white/10 rounded-xl`}
          >
            <div className="relative w-full lg:w-max h-full">
              <Image
                src={link.imageSrc}
                width={1024}
                height={1024}
                loading="lazy"
                quality={75}
                alt={link.imageAlt}
                className="w-full lg:w-[250px] h-auto rounded-xl"
              />
            </div>
            <div className="w-full">
              <div className="lg:pl-12 py-3 pr-3">
                <h2 className="mt-6 lg:mt-0 text-2xl font-extrabold text-white">
                  {link.title}
                </h2>
                <p className="mb-3 font-coco text-white mt-2">
                  {link.description}
                </p>
                <div
                  className="w-full text-white group-hover:underline font-light"
                  aria-label={link.goTo}
                >
                  <span className="justify-center w-max bg-cta p-2 flex items-center rounded-xl">
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
          title="Portfolio usług"
          description="Zaprezentuj swoje usługi na rynku i zdobądź zlecenia."
          linkTitle="Utwórz konto"
        />
        <HighlightCard
          icon={<FaRocket className="text-white text-5xl" />}
          title="Oferty pracy"
          description="Dodaj darmową ofertę pracy i przyśpiesz proces rekrutacji."
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
    <div className="p-3 relative bg-gradient-to-r from-primary/30 to-cta/30 rounded-xl">
      <div className="shadow-lg bg-gradient-to-r from-primary to-cta text-white rounded-full aspect-square w-32 flex items-center justify-center mx-auto">
        {icon}
      </div>
      <h3 className="text-xl font-extrabold text-black mb-2 mt-4">{title}</h3>
      <p className="text-black">{description}</p>
      <div className="mt-6" />
      <Link
        className="rounded-xl shadow-md bg-cta duration-100 text-white px-3 py-2 "
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
    <section className="flex flex-col-reverse lg:flex-row lg:my-12 text-left mx-auto">
      <div className="px-6 lg:pr-0 lg:pl-12 overflow-hidden h-full mt-12 lg:mt-0">
        <Image
          src="/happy.webp"
          width={500}
          height={500}
          loading="lazy"
          quality={75}
          blurDataURL="data:image/webp;base64,UklGRiIAAABXRUJQVlA4WAoAAAAQAAAfAADuwH/xAAfAQADAAQAAAAAAQAvAQADAAQAAAAAAQAvAQA"
          placeholder="blur"
          alt="Logo serwisu quixy.pl"
          className="w-full h-auto"
        />
      </div>
      <div className="px-6 lg:px-12">
        <h2 className="font-extrabold text-3xl mb-2 text-black mt-6 lg:mt-0">
          Znajdziesz wolne stanowisko pracy zdalnej!
        </h2>
        <p className="mb-3 text-black max-w-2xl">
          Quixy to najskuteczniejsza platforma z pracą zdalną w Polsce.
          Technologia z której korzystamy jest szybka i niezawodna. Stwórz
          portfolio w którym zaprezentujesz swoje usługi.
        </p>
        <Link
          href="/register"
          title="Dołącz do Quixy"
          className="bg-gradient-to-r from-primary to-cta text-white py-2 px-3 hover:bg-opacity-80 transition font-gotham font-light"
        >
          Dołącz za darmo!
        </Link>
      </div>
    </section>
  );
}

// Zabawny komponent
function FunnyComponent() {
  return (
    <div className="relative mx-auto w-full bg-white container px-4 lg:px-12 my-24">
      <div className="absolute left-[50%] top-[50%] -translate-x-[50%] -translate-y-[50%] text-[20vw] text-primary/10 italic font-extrabold">
        QUIXY
      </div>
      <div className="flex flex-col md:flex-row md:items-start text-black text-xl max-w-xl">
        <Image
          src="/assets/gif/giremotework.webp"
          width={512}
          height={512}
          alt="Praca zdalna w biurze"
          title="Praca zdalna w biurze"
          className="w-auto h-full mt-4 lg:mt-0"
        />
        <div className="md:px-6 mt-4 lg:mt-0">
          <h2 className="text-3xl font-extrabold text-black mb-4">
            Potrzebujesz chwili wytchnienia?
          </h2>
          <p className="text-black mb-4">
            Praca zdalna może być intensywna, ale kto powiedział, że nie może
            być zabawnie?
          </p>

          <p className="bg-gradient-to-r from-primary to-cta p-2 text-xl text-white italic w-max max-w-full">
            „Zatrudnij mnie, zanim zrobi to ktoś inny! 🤖” – Najnowsza AI
          </p>
          <p className="mt-4 text-sm text-black">
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
  title:
    "Praca, Oferty dla Freelancerów | Portfolio | IT, Marketing, E-commerce",
  description:
    "Znajdź klientów i realizuj projekty zdalnie na naszej platformie. Oferty w IT, e-commerce, marketingu, animacji i więcej! Zarejestruj się i zacznij już dziś.",
};

const faqItems = [
  {
    question: "Jakie są koszty zatrudnienia?",
    answer: "Możesz dodać ofertę pracy za darmo.",
  },
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
];

const links = [
  {
    href: "/praca-zdalna/rozwoj-oprogramowania",
    imageSrc: "/slug/rozwoj-oprogramowania.webp",
    imageAlt: "Zatrudnij ekspertów od Rozwoju Oprogramowania",
    title: "Specjaliści rozwoju oprogramowania",
    description:
      "Nasza platforma łączy Cię z doświadczonymi programistami, którzy dostosują i stworzą oprogramowanie odpowiadające Twoim potrzebom biznesowym.",
    goTo: "Rozwój oprogramowania",
  },
  {
    href: "/praca-zdalna/e-commerce",
    imageSrc: "/slug/e-commerce.webp",
    imageAlt: "Wdrożenie Sklepów Internetowych z naszymi ekspertami",
    title: "Programiści sklepów internetowych",
    description:
      "Nasza platforma oferuje dostęp do specjalistów od e-commerce, którzy pomogą Ci maksymalizować sprzedaż i poprawić doświadczenia użytkowników.",
    goTo: "E-Commerce",
  },
  {
    href: "/praca-zdalna/marketing",
    imageSrc: "/slug/marketing.webp",
    imageAlt: "Zatrudnij specjalistów od Marketingu",
    title: "Specjaliści marketingu",
    description:
      "Potrzebujesz skutecznej promocji? Skorzystaj z wiedzy naszych doświadczonych marketerów online.",
    goTo: "Marketing",
  },
  {
    href: "/praca-zdalna/uslugi-it",
    imageSrc: "/slug/uslugi-it.webp",
    imageAlt: "Zatrudnij ekspertów od Wsparcia IT",
    title: "Specjaliści Wsparcia IT",
    description:
      "Specjaliści IT, którzy zapewnią wsparcie techniczne, zarządzanie infrastrukturą, a także optymalizację Twoich systemów.",
    goTo: "Usługi IT",
  },
  {
    href: "/praca-zdalna/uslugi-biznesowe",
    imageSrc: "/slug/uslugi-biznesowe.webp",
    imageAlt: "Zatrudnij doradców biznesowych",
    title: "Doradcy biznesowi",
    description:
      "Skorzystaj z doświadczenia naszych specjalistów, aby przyspieszyć rozwój i zwiększyć efektywność swojego przedsięwzięcia biznesowego.",
    goTo: "Usługi biznesowe",
  },
  {
    href: "/praca-zdalna/projektowanie",
    imageSrc: "/slug/projektowanie.webp",
    imageAlt: "Zatrudnij Projektantów dla Twojego Biznesu",
    title: "Projektanci i designerzy",
    description:
      "Czy potrzebujesz profesjonalnego projektu graficznego lub strony internetowej? Połączymy Cię z doświadczonymi projektantami, którzy przekształcą Twoje wizje w rzeczywistość.",
    goTo: "Projektowanie",
  },
];
