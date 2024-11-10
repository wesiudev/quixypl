import Link from "next/link";
import jobs from "../../../public/14.09.2024.json";
import "../../styles/globals.css";
import { Metadata } from "next";
import Header from "@/components/Header";
import FAQ from "@/components/Faq";
import OpinionsForm from "@/components/OpinionsForm";
import { FaRocket, FaUsers, FaRegLightbulb, FaCogs } from "react-icons/fa";
import MainFooter from "@/components/MainFooter";
import Image from "next/image";
import {
  FaChevronRight,
  FaChevronLeft,
  FaArrowRightLong,
} from "react-icons/fa6";
import TalentList from "@/components/JobBoardList";

function HeroSection() {
  return (
    <header className="px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20 py-16 text-center overflow-hidden relative bg-gradient-to-r from-primary to-cta">
      <div className="py-6 relative z-50 bg-white mx-auto w-full max-w-[95%] sm:max-w-[80%] lg:max-w-[70%] xl:max-w-[60%]">
        <h1 className="px-4 pt-6 lg:pt-8 text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold mb-6 leading-snug w-full text-center mx-auto bg-gradient-to-r from-primary to-cta text-transparent bg-clip-text">
          Znajdź pracę lub pozyskuj zlecenia
        </h1>
        <p className="sm:text-lg lg:text-xl text-black px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto">
          Opublikuj swoje usługi, przeprowadź rekrutację lub pozyskuj zlecenia.
          Dołącz do platformy Quixy i wypróbuj nasze funkcje.
        </p>
        <div className="mt-5"></div>
        <JoinButton />
      </div>
    </header>
  );
}

// Komponent Breadcrumbs
function Breadcrumbs() {
  return (
    <div className="!text-white px-6 sm:px-12 breadcrumbs text-xs bg-transparent mx-auto relative z-50 not-italic">
      <ul className="flex items-center justify-center flex-wrap font-light">
        <li>
          <Link title="home" href={`/`}>
            home
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
      className="bg-gradient-to-r from-primary to-cta text-white hover:bg-opacity-90 py-2 px-3 font-gotham font-light  w-max mx-auto relative z-50"
      href="/register"
    >
      Zarejestruj się
    </Link>
  );
}

function WhyChooseQuixySection() {
  return (
    <section className="text-left flex flex-col-reverse lg:flex-row lg:items-center">
      <h3 className="pl-6 text-left lg:text-center font-bold">
        <Link
          className="rounded-xl w-max max-w-[100%] lg:mx-auto text-center p-3 flex lg:flex-col items-center justify-center bg-gradient-to-r from-primary to-cta hover:from-primary/80 hover:to-cta/80 text-white  lg: lg:h-max relative z-50 mt-6 lg:mt-0 lg:mb-0"
          href="/register"
        >
          <div className="mb-0 lg:mb-3 mr-3 lg:mr-0">
            <FaRocket className="lg:text-6xl text-xl" />
          </div>
          <div className="lg:w-[200px] lg:text-center">
            Zarejestruj się by dodać ofertę pracy
          </div>
        </Link>
      </h3>
      <div className="flex flex-col px-6 w-full lg:mx-8">
        <h2 className="font-extrabold text-3xl mb-2 text-black mt-6 lg:mt-0">
          Dlaczego warto wybrać Quixy?
        </h2>
        <p className="text-lg text-black font-gotham font-light lg:max-w-3xl">
          Oferujemy połączenie z najlepszymi specjalistami w rozwoju
          oprogramowania, usługach IT, marketingu, designu, i nie tylko. Nasza
          platforma łączy firmy z doświadczonymi profesjonalistami, którzy
          dostarczają najwyższej jakości usługi, zawsze na czas i zgodnie z
          wymaganiami.
        </p>
      </div>
    </section>
  );
}

// Sekcja kategorii specjalistów
function SpecialistsCategoriesSection() {
  return (
    <section className="py-12 mb-12 w-full bg-gradient-to-r from-primary to-cta">
      <div className="flex flex-col mt-3 lg:mt-0 px-6 container mx-auto">
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
    <section className="my-12 px-6">
      <h2 className="text-3xl mb-6 text-black font-extrabold">
        Co nas wyróżnia?
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-4 gap-8 text-center">
        <HighlightCard
          icon={<FaRocket className="text-white text-5xl" />}
          title="Oferty pracy"
          description="Proces rekrutacji jest szybki i efektywny, pozwalając Ci skupić się na rozwoju projektu."
          linkTitle="Dodaj ofertę"
        />
        <HighlightCard
          icon={<FaUsers className="text-white text-5xl" />}
          title="Dostępni freelancerzy"
          description="Współpracujemy z doświadczonymi firmami oraz freelancerami, aby zapewnić najwyższą jakość usług."
          linkTitle="Szukaj pracy"
        />
        <HighlightCard
          icon={<FaRegLightbulb className="text-white text-5xl" />}
          title="Innowacyjne pomysły"
          description="Nasze narzędzia pomogą Ci stworzyć unikalne i skuteczne strategie biznesowe."
          linkTitle="Zarejestruj"
        />
        <HighlightCard
          icon={<FaCogs className="text-white text-5xl" />}
          title="Usługi AI"
          description="Sprawdź za darmo generator obrazów oraz pomysłów na biznes"
          linkTitle="Sprawdź za darmo"
        />
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
    <div className="p-3 relative bg-gradient-to-r from-primary to-cta rounded-xl">
      <div className="shadow-lg bg-primary rounded-full aspect-square w-32 flex items-center justify-center mx-auto">
        {icon}
      </div>
      <h3 className="text-xl font-extrabold text-white mb-2 mt-4">{title}</h3>
      <p className="text-white">{description}</p>
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
    <section className="flex flex-col lg:flex-row my-12 text-left">
      <div className="overflow-hidden h-full  ">
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
        <p className="mb-3 text-black max-w-2xl font-coco sm:text-lg">
          Quixy.pl to najlepsza platforma z pracą zdalną w Polsce. Technologia z
          której korzystamy jest szybka i niezawodna. Zapraszamy do
          przeprowadzania rekrutacji, tworzenia wspólnych projektów i poszukiwań
          pracy na naszej platformie.
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

// Główna strona
export default async function Page() {
  const talents = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/talents?tubylytylkofigi=${process.env.API_SECRET_KEY}`,
    {
      next: { revalidate: 60 },
    }
  ).then((res: any) => res.json());
  const categoryTalents = talents
    ?.map((item: any) => {
      const { email, ...talent } = item;
      return talent;
    })
    .filter(
      (item: any) =>
        item?.pseudo &&
        item?.seek &&
        item?.emailVerified &&
        item?.seek !== "ask" &&
        item?.tags?.length > 0
    );
  const categoryCompanies = talents?.filter(
    (item: any) => item?.pseudo && !item?.seek && item?.seek !== "ask"
  );
  return (
    <div className="w-full h-full bg-white">
      <Header jobsList={jobs} />
      <HeroSection />
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
        <div className="container mx-auto px-6">
          <FAQ faqItems={faqItems} />
        </div>
        <OpinionsForm />
      </main>
      <FunnyComponent />
      <MainFooter jobsList={jobs} />
    </div>
  );
}

// Zabawny komponent
function FunnyComponent() {
  return (
    <div className="relative mx-auto w-full bg-white p-12">
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

          <p className="bg-gradient-to-r from-primary to-cta p-2 text-xl text-white italic w-max">
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
    "Quixy.pl: Praca Zdalna i Oferty dla Freelancerów | IT, Marketing, E-commerce",
  description:
    "Znajdź klientów i realizuj projekty zdalnie na Quixy.pl. Oferty w IT, e-commerce, marketingu, animacji i więcej! Zarejestruj się i zacznij już dziś.",
};

const faqItems = [
  {
    question: "Jak szybko mogę zatrudnić specjalistę?",
    answer:
      "Proces rekrutacji jest zazwyczaj zakończony w ciągu kilku dni, w zależności od specyfikacji projektu oraz dostępności ekspertów.",
  },
  {
    question: "Jakie są koszty zatrudnienia?",
    answer:
      "Koszty oraz zyski na naszej stronie klienci oraz eksperci ustalają między sobą poprzez Quixy Talent™",
  },
  {
    question: "Czy oferujecie gwarancję jakości?",
    answer:
      "Każdy nasz specjalista jest weryfikowany, aby zapewnić najwyższą jakość usług, a klienci mogą zweryfikować metodę płatności.",
  },
  {
    question: "Jakie usługi oferujecie?",
    answer:
      "Oferujemy usługi z zakresu IT, marketingu, projektowania, oraz wsparcia biznesowego.",
  },
  {
    question: "Czy mogę anulować projekt po jego rozpoczęciu?",
    answer: "Tak, możesz anulować projekt na każdym etapie.",
  },
  {
    question: "Jak mogę się skontaktować z zespołem wsparcia?",
    answer:
      "Możesz skontaktować się z nami poprzez formularz, email lub telefon, dostępny na naszej stronie kontaktowej.",
  },
  {
    question: "Jak działa generator pomysłów na biznes?",
    answer:
      "Generator pomysłów na biznes tworzy unikalne koncepty w oparciu o wybrane kryteria, takie jak lokalizacja, budżet i dostępne zasoby. Możesz rozwijać swój pomysł, korzystając z dodatkowych funkcji, odblokowanych za pomocą Quixies.",
  },
  {
    question: "Jakie błędy najczęściej popełniają początkujący przedsiębiorcy?",
    answer:
      "Najczęściej popełniane błędy to zbyt optymistyczne prognozy sprzedaży, niedoszacowanie kosztów oraz brak elastyczności w modelu biznesowym. Quixy oferuje rozwijane poradniki, które pomogą Ci uniknąć tych błędów, dostępne po odblokowaniu za pomocą Quixies.",
  },
  {
    question:
      "Czy pomysł wygenerowany w Quixy można później zlecić komuś do realizacji?",
    answer:
      "Tak, pomysł wygenerowany w Quixy można zlecić do realizacji innym osobom lub zespołom, przypisując go jako zadanie lub projekt do wykonania.",
  },

  {
    question:
      "Czy mogę zapisać i wrócić do mojego pomysłu na biznes w późniejszym czasie?",
    answer:
      "Tak, każdy wygenerowany pomysł jest zapisywany na Twoim profilu. Możesz powrócić do niego w dowolnym momencie.",
  },
  {
    question: "Jak mogę zdobyć więcej Quixies?",
    answer: "Możesz zakupić Quixies bezpośrednio poprzez naszą platformę.",
  },
];

const links = [
  {
    href: "/praca-zdalna/rozwoj-oprogramowania",
    imageSrc: "/slug/rozwoj-oprogramowania.webp",
    imageAlt: "Zatrudnij ekspertów od Rozwoju Oprogramowania",
    title: "Specjaliści rozwoju oprogramowania",
    description:
      "Poszukujesz doświadczonych programistów? Nasza platforma łączy Cię z profesjonalistami, którzy dostosują i stworzą oprogramowanie idealnie odpowiadające Twoim potrzebom biznesowym. Skorzystaj z naszej sieci freelancerów, by przyspieszyć rozwój swojego projektu IT.",
    goTo: "Rozwój oprogramowania",
  },
  {
    href: "/praca-zdalna/e-commerce",
    imageSrc: "/slug/e-commerce.webp",
    imageAlt: "Wdrożenie Sklepów Internetowych z naszymi ekspertami",
    title: "Programiści sklepów internetowych",
    description:
      "Chcesz stworzyć lub zoptymalizować swój sklep online? Nasza platforma oferuje dostęp do specjalistów od e-commerce, którzy pomogą Ci maksymalizować sprzedaż i poprawić doświadczenia użytkowników. Zatrudnij naszych ekspertów i przekształć swoje cyfrowe przedsięwzięcia w sukces.",
    goTo: "E-Commerce",
  },
  {
    href: "/praca-zdalna/marketing",
    imageSrc: "/slug/marketing.webp",
    imageAlt: "Zatrudnij specjalistów od Marketingu",
    title: "Specjaliści marketingu",
    description:
      "Potrzebujesz skutecznej promocji? Skorzystaj z wiedzy naszych ekspertów marketingowych, którzy zaplanują i zrealizują kampanie reklamowe, które zwiększą Twoją rozpoznawalność i sprzedaż. Nasza platforma umożliwia łatwe i szybkie zatrudnianie doświadczonych marketerów online.",
    goTo: "Marketing",
  },
  {
    href: "/praca-zdalna/uslugi-it",
    imageSrc: "/slug/uslugi-it.webp",
    imageAlt: "Zatrudnij ekspertów od Wsparcia IT",
    title: "Specjaliści Wsparcia IT",
    description:
      "Nasza platforma oferuje szybki dostęp do specjalistów IT, którzy zapewnią wsparcie techniczne, zarządzanie infrastrukturą, a także optymalizację Twoich systemów. Zatrudnij naszych ekspertów, by utrzymać ciągłość i efektywność Twojej działalności technologicznej.",
    goTo: "Usługi IT",
  },
  {
    href: "/praca-zdalna/uslugi-biznesowe",
    imageSrc: "/slug/uslugi-biznesowe.webp",
    imageAlt: "Zatrudnij doradców biznesowych",
    title: "Doradcy biznesowi",
    description:
      "Nasza platforma umożliwia łatwe znalezienie i zatrudnienie ekspertów, którzy pomogą w optymalizacji procesów, planowaniu strategicznym i zarządzaniu. Skorzystaj z doświadczenia naszych specjalistów, aby przyspieszyć rozwój i zwiększyć efektywność swojego przedsięwzięcia biznesowego.",
    goTo: "Usługi biznesowe",
  },
  {
    href: "/praca-zdalna/projektowanie",
    imageSrc: "/slug/projektowanie.webp",
    imageAlt: "Zatrudnij Projektantów dla Twojego Biznesu",
    title: "Projektanci i designerzy",
    description:
      "Czy potrzebujesz profesjonalnego projektu graficznego lub strony internetowej? Nasza platforma łączy Cię z doświadczonymi projektantami, którzy przekształcą Twoje wizje w rzeczywistość. Wybierz naszych specjalistów i daj się zauważyć dzięki unikalnym i efektownym projektom.",
    goTo: "Projektowanie",
  },
];
