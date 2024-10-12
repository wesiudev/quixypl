import Link from "next/link";
import jobs from "../../../../public/14.09.2024.json";
import "../../../styles/globals.css";
import { Metadata } from "next";
import Header from "@/components/Header";
import FAQ from "@/components/Faq";
import OpinionsForm from "@/components/OpinionsForm";
import { FaRocket, FaUsers, FaRegLightbulb, FaCogs } from "react-icons/fa";
import MainFooter from "@/components/MainFooter";
import Hero from "@/components/Hero";
import Image from "next/image";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa6";

function HeroSection() {
  return (
    <header className="text-center py-16 overflow-hidden text-white relative bg-black">
      <Hero />
      <h1
        style={{ lineHeight: 1.7 }}
        className="text-xl lg:text-4xl font-bold mb-4 leading-snug w-[90%] sm:max-w-lg lg:max-w-4xl mx-auto z-50 relative"
      >
        Dodaj ofertę lub szukaj pracy w{" "}
        <span className="p-[4px] lg:p-[7px] text-white bg-gradient-to-r from-primary to-cta">
          IT, projektowaniu, księgowości, czy E-Commerce!
        </span>
      </h1>
      <Breadcrumbs />
      <JoinButton />
    </header>
  );
}

// Komponent Breadcrumbs
function Breadcrumbs() {
  return (
    <div className="!text-white mb-2 px-6 sm:px-12 breadcrumbs text-sm bg-transparent mx-auto relative z-50">
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
      className="bg-cta text-white hover:bg-opacity-90 py-1.5 px-2 font-gotham font-light rounded-lg w-max mx-auto relative z-50"
      href="/register"
    >
      Rejestracja
    </Link>
  );
}

function WhyChooseQuixySection() {
  return (
    <section className="text-left flex lg:items-start rounded-3xl flex-col-reverse lg:flex-row">
      <h3 className="text-left lg:text-center font-bold">
        <Link
          className="w-max max-w-[100%] lg:mx-auto text-center p-3 flex lg:flex-col items-center justify-center bg-gradient-to-r from-primary to-cta hover:from-primary/80 hover:to-cta/80 text-white rounded-lg lg:rounded-3xl lg:h-max relative z-50 mt-6 lg:mt-0 lg:mb-0"
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
      <div className="flex flex-col lg:px-6 w-full  rounded-xl lg:mx-8">
        <h2 className="mb-4 text-3xl lg:text-5xl text-zinc-800 font-gotham">
          Dlaczego warto wybrać Quixy?
        </h2>
        <p className="text-lg text-black font-gotham font-light lg:max-w-3xl">
          Oferujemy połączenie z najlepszymi specjalistami w rozwoju
          oprogramowania, usługach IT, marketing, designu, i wiele więcej.{" "}
          <br />
          Nasza platforma łączy firmy z doświadczonymi profesjonalistami, którzy
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
    <section className="lg:mt-8 mb-16 font-gotham rounded-xl w-full p-3 lg:p-6">
      <h2 className="lg:flex lg:items-start lg:justify-between text-black text-3xl font-gotham text-left">
        <span className="border-b-2 border-primary/30">
          Oferty pracy zdalnej, gotowe projekty i profile specjalistów!
        </span>
      </h2>
      <div className="flex flex-col mt-3 lg:mt-0">
        {links.map((link, index) => (
          <Link
            key={index}
            href={link.href}
            className="rounded-xl lg:py-6 group hover:bg-primary hover:bg-opacity-20 overflow-hidden flex flex-col lg:flex-row w-full items-start justify-start lg:px-6"
          >
            <div className="relative h-full p-3 lg:p-0">
              <Image
                src={link.imageSrc}
                width={1366}
                height={1366}
                alt={link.imageAlt}
                style={{ boxShadow: "0px 0px 3px black" }}
                className="rounded-xl w-full lg:w-[250px] h-auto"
              />
              <div
                className="lg:hidden absolute left-0 bottom-3 w-full px-3 text-white group-hover:underline font-light"
                aria-label={link.goTo}
              >
                <span className="mx-auto justify-center text-sm italic w-max max-w-full bg-gradient-to-r from-primary to-cta p-1.5 rounded-lg flex items-center">
                  <FaChevronLeft className="mr-2" />
                  {link.goTo}
                  <FaChevronRight className="ml-2" />
                </span>
              </div>
            </div>
            <div className="lg:ml-6 w-3/4 p-3 lg:p-6 rounded-lg group-hover:bg-white">
              <h2 className="hidden lg:block text-2xl font-bold text-black !font-gotham">
                {link.title}
              </h2>
              <p className="mt-2 lg:mb-3 font-light text-black">
                {link.description}
              </p>
              <div
                className="w-full text-white lg:mt-0 group-hover:underline font-light"
                aria-label={link.goTo}
              >
                <span className="justify-center text-sm italic w-max max-w-full bg-gradient-to-r from-primary to-cta p-1.5 rounded-lg flex items-center">
                  <FaChevronLeft className="group-hover:translate-x-[2px] group-hover:scale-100 scale-125 mr-1 duration-150" />
                  {link.goTo}
                  <FaChevronRight className="group-hover:translate-x-[-2px] group-hover:scale-100 scale-125 ml-1 duration-150" />
                </span>
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
    <section className="my-16">
      <h2 className="text-3xl mb-6 text-zinc-800  font-gotham">
        Co nas wyróżnia?
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-4 gap-8 text-center">
        <HighlightCard
          icon={<FaRocket className="text-white text-5xl" />}
          title="Szybka rekrutacja"
          description="Proces rekrutacji jest szybki i efektywny, pozwalając Ci skupić się na rozwoju projektu."
          linkTitle="Dodaj ofertę"
        />
        <HighlightCard
          icon={<FaCogs className="text-white text-5xl" />}
          title="Nasze Usługi AI"
          description="Sprawdź za darmo generator obrazów oraz pomysłów na biznes"
          linkTitle="Sprawdź za darmo"
        />
        <HighlightCard
          icon={<FaUsers className="text-white text-5xl" />}
          title="Najlepsze firmy"
          description="Współpracujemy z doświadczonymi firmami, aby zapewnić najwyższą jakość ogłoszeń."
          linkTitle="Szukaj pracy"
        />
        <HighlightCard
          icon={<FaRegLightbulb className="text-white text-5xl" />}
          title="Innowacyjne pomysły"
          description="Nasze narzędzia i pomogą Ci stworzyć unikalne i skuteczne strategie biznesowe."
          linkTitle="Zarejestruj"
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
    <div className="font-gotham p-3 rounded-xl relative bg-gradient-to-r from-primary/10 to-cta/10">
      <div className="bg-primary/75 rounded-full aspect-square w-32 flex items-center justify-center mx-auto">
        {icon}
      </div>
      <h3 className="text-xl  text-black mb-2 mt-4">{title}</h3>
      <p className="text-black text-sm font-coco">{description}</p>
      <div className="mt-6" />
      <Link
        className=" font-light bg-cta hover:bg-cta/80 duration-100 text-white px-2 py-1.5 rounded-lg"
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
    <section className="flex flex-col lg:flex-row my-24 font-gotham text-left">
      <div
        style={{ boxShadow: "0px 0px 5px black" }}
        className="overflow-hidden h-full rounded-tl-[80px] rounded-3xl"
      >
        <Image
          src="https://firebasestorage.googleapis.com/v0/b/reklamy-figurscy.appspot.com/o/happy.jpg?alt=media&token=c276d324-5abd-4f96-ad26-d9271f3942a8"
          width={500}
          height={500}
          alt="Logo serwisu quixy.pl"
          className="w-full h-auto"
        />
      </div>
      <div className="lg:px-6">
        <h2 className="text-3xl mb-6 text-zinc-800 mt-6 lg:mt-0">
          Znajdziesz wolne stanowisko pracy zdalnej!
        </h2>
        <p className="mb-3 text-lg text-black max-w-2xl font-gotham font-light">
          Quixy.pl to najlepsza platforma z pracą zdalną w Polsce. Technologia z
          której korzystamy jest szybka i niezawodna. Zapraszamy do
          przeprowadzania rekrutacji, tworzenia wspólnych projektów i poszukiwań
          pracy na naszej platformie.
        </p>
        <Link
          href="/register"
          title="Dołącz do Quixy"
          className="bg-cta text-white py-1.5 px-2 rounded-lg hover:bg-opacity-80 transition font-gotham font-light"
        >
          Zarejestruj
        </Link>
      </div>
    </section>
  );
}

// Główna strona
export default function Page() {
  return (
    <div className="w-full h-full bg-white">
      <Header jobsList={jobs} />
      <HeroSection />
      <main className="container mx-auto px-6 py-10">
        <WhyChooseQuixySection />
        <CallToActionSection />
        <SpecialistsCategoriesSection />
        <WhatMakesUsUniqueSection />
        <FAQ faqItems={faqItems} />
        <OpinionsForm />
      </main>
      {/* <FunnyComponent /> */}
      <MainFooter
        heading={"Szukaj pracy lub dodaj ofertę"}
        category={""}
        jobsList={jobs}
      />
    </div>
  );
}

// Zabawny komponent
function FunnyComponent() {
  return (
    <div className="mx-auto w-full bg-gradient-to-r from-primary/20 to-cta/20 p-3 lg:p-6">
      <div className="flex flex-col-reverse md:flex-row md:items-center mx-auto text-black text-xl max-w-xl">
        <Image
          src="/assets/gif/giremotework.webp"
          width={512}
          height={512}
          alt="Praca zdalna w biurze"
          title="Praca zdalna w biurze"
          style={{ boxShadow: "0px 0px 5px black" }}
          className="rounded-xl w-auto h-full mt-4 lg:mt-0"
        />
        <div className="md:pl-6">
          <h2 className="max-w-lg text-3xl lg:text-5xl font-bold text-black mb-4">
            Potrzebujesz chwili wytchnienia?
          </h2>
          <p className="text-black mb-4">
            Praca zdalna może być intensywna, ale kto powiedział, że nie może
            być zabawnie?
          </p>

          <p className="bg-gradient-to-r from-primary to-cta rounded-xl p-2 text-xl text-white italic w-max max-w-[100%]">
            „Zatrudnij mnie, zanim zrobi to ktoś inny! 🤖” – Najnowsza AI
          </p>
          <p className="mt-4 text-sm text-black">
            *Tylko żart, obiecujemy, że nie zatrudniamy robotów... jeszcze.*
          </p>
          <div className="my-3" />
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
  title: "Pracy Zdalna - Znajdź pracę lub zatrudnij Talent",
  description:
    "Zatrudnij ekspertów z branży IT, marketingu, designu i innych dziedzin. Znajdź specjalistów w Quixy Talent™ i rozwijaj swój biznes już dziś!",
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
    question: "Jak mogę stworzyć biznesplan przy pomocy Quixy?",
    answer:
      "Po wygenerowaniu pomysłu możesz rozszerzyć go o szczegółowy biznesplan, korzystając z opcji rozwijania planu za pomocą Quixies. Funkcje te pozwalają na analizę rynku, oszacowanie kosztów i prognozy zysków.",
  },
  {
    question: "Czy mogę uzyskać porady marketingowe?",
    answer:
      "Tak, możesz odblokować specjalistyczne porady marketingowe przy pomocy Quixies, które pomogą Ci w tworzeniu skutecznych kampanii reklamowych i strategii sprzedażowych. Im więcej Quixies wykorzystasz, tym bardziej zaawansowane porady otrzymasz.",
  },
  {
    question: "Jakie błędy najczęściej popełniają początkujący przedsiębiorcy?",
    answer:
      "Najczęściej popełniane błędy to zbyt optymistyczne prognozy sprzedaży, niedoszacowanie kosztów oraz brak elastyczności w modelu biznesowym. Quixy oferuje rozwijane poradniki, które pomogą Ci uniknąć tych błędów, dostępne po odblokowaniu za pomocą Quixies.",
  },
  {
    question: "Czy mogę uzyskać indywidualne porady od ekspertów?",
    answer:
      "Tak, korzystając z Quixies, możesz odblokować dostęp do konsultacji z ekspertami, którzy pomogą Ci dostosować Twój pomysł do realiów rynkowych. Eksperci mogą doradzić w kwestiach związanych z zarządzaniem, finansami oraz marketingiem.",
  },
  {
    question:
      "Jak mogę zainwestować w rozwój mojego biznesu poprzez platformę?",
    answer:
      "Quixy umożliwia rozwijanie biznesu poprzez zakup dodatkowych zasobów za pomocą Quixies. Możesz zainwestować w takie elementy jak marketing, doradztwo, a także zlecić wykonanie stron internetowych i aplikacji mobilnych.",
  },
  {
    question:
      "Czy Quixies można wykorzystać do uzyskania pomocy w tworzeniu kampanii reklamowej?",
    answer:
      "Tak, za pomocą Quixies możesz odblokować narzędzia i poradniki, które pomogą Ci zaplanować skuteczną kampanię reklamową, uwzględniającą takie elementy jak SEO, social media i kampanie płatne.",
  },
  {
    question: "Jak mogę monitorować postępy mojego biznesplanu?",
    answer:
      "Korzystając z Quixy, możesz regularnie aktualizować i rozwijać swój biznesplan. Quixies umożliwiają Ci dostęp do dodatkowych funkcji monitorowania, takich jak prognozy finansowe, analiza rynku oraz porównanie z konkurencją.",
  },
  {
    question:
      "Czy mogę zapisać i wrócić do mojego pomysłu na biznes w późniejszym czasie?",
    answer:
      "Tak, każdy wygenerowany pomysł jest zapisywany na Twoim profilu. Możesz powrócić do niego w dowolnym momencie i rozwijać go, korzystając z dodatkowych zasobów dostępnych za Quixies.",
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
      "Poszukujesz doświadczonych programistów? Nasza platforma łączy Cię z profesjonalistami, którzy dostosują i stworzą oprogramowanie idealnie odpowiadające Twoim potrzebom biznesowym. Skorzystaj z naszej sieci talentów, by przyspieszyć rozwój swojego projektu IT.",
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
