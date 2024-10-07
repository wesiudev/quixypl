import Link from "next/link";
import jobs from "../../../../public/14.09.2024.json";
import "../../../styles/globals.css";
import { Metadata } from "next";
import Header from "@/components/Header";
import FAQ from "@/components/Faq";
import OpinionsForm from "@/components/OpinionsForm";
import { FaRocket, FaUsers, FaRegLightbulb } from "react-icons/fa";
import MainFooter from "@/components/MainFooter";
import Hero from "@/components/Hero";
import Image from "next/image";
import ContactForm from "@/components/ContactForm";

function HeroSection() {
  return (
    <header className="text-center py-16 bg-black overflow-hidden text-white relative">
      <Hero />
      <h1
        style={{ lineHeight: 1.5 }}
        className="text-4xl font-bold mb-4 leading-snug relative z-50 w-[90%] sm:max-w-[50rem] mx-auto"
      >
        <b className="text-primary">Rozwijaj Projekty</b> z Najlepszymi
        Ekspertami IT, Marketingu i Designu
        <b className="text-primary px-3 py-1 rounded-md shadow-lg">
          Praca Zdalna
        </b>
        z Quixy Talent™
      </h1>
      <Breadcrumbs />
      <JoinButton />
    </header>
  );
}

// Komponent Breadcrumbs
function Breadcrumbs() {
  return (
    <div className="mb-4 px-6 sm:px-12 breadcrumbs text-sm bg-transparent mx-auto relative z-50">
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
      className="bg-[#126b91] text-white hover:bg-[#468CA9] py-1.5 px-2 font-gotham rounded-lg w-max mx-auto relative z-50"
      href="/register"
    >
      Rejestracja
    </Link>
  );
}

function WhyChooseQuixySection() {
  return (
    <section className="text-left flex lg:items-center rounded-3xl flex-col-reverse lg:flex-row">
      <h3 className="text-left lg:text-center font-bold">
        <Link
          className="p-3 flex lg:flex-col items-center justify-center bg-[#126b91] text-white hover:bg-[#468CA9] rounded-lg lg:rounded-3xl lg:h-full lg:aspect-square relative z-50 mt-6 lg:mt-0 lg:mb-0"
          href="/register"
        >
          <div className="mb-0 lg:mb-3 mr-3 lg:mr-0">
            <FaRocket className="lg:text-6xl text-xl" />
          </div>
          Zarejestruj się by dodać ofertę pracy
        </Link>
      </h3>
      <div className="flex flex-col lg:p-6 w-full bg-white rounded-xl lg:mx-8">
        <h2 className="text-3xl lg:text-5xl font-bold text-black  font-coco">
          Dlaczego warto wybrać Quixy?
        </h2>
        <p className="text-lg text-black">
          Oferujemy dostęp do najlepszych specjalistów w dziedzinach takich jak{" "}
          rozwój oprogramowania, IT, marketing, desig, i wiele więcej. Nasza
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
    <section className="lg:mt-8 mb-16 font-gotham rounded-xl w-full">
      <h2 className="text-3xl w-full sm:max-w-[40rem] font-bold text-black  text-left">
        Oferty pracy zdalnej, najlepsze projekty i specjaliści
      </h2>
      <div className="mt-8 flex flex-col space-y-8">
        <Link
          href="/praca-zdalna/rozwoj-oprogramowania"
          className="rounded-3xl overflow-hidden flex flex-col lg:flex-row w-full"
          style={{ boxShadow: "inset 0px 0px 4px black" }}
        >
          <div
            className="relative h-full  
          flex items-center"
          >
            <Image
              src="/slug/rozwoj-oprogramowania.webp"
              width={1366}
              height={1366}
              alt="Zatrudnij ekspertów od Rozwoju Oprogramowania"
              className="rounded-t-lg lg:rounded-tr-none lg:rounded-l-lg h-full"
            />
            <h2 className="lg:hidden rounded-lg absolute bottom-3 w-[90%] left-1/2 -translate-x-1/2 bg-[#126b91] bg-opacity-80 text-2xl font-bold text-white p-3 !font-gotham">
              Najlepsi specjaliści od rozwoju oprogramowania
            </h2>
          </div>
          <div className="p-6 lg:min-w-[85%]">
            <h2 className="hidden lg:block text-2xl font-bold text-black  !font-gotham">
              Zatrudnij ekspertów od rozwoju oprogramowania
            </h2>
            <p className="mt-2 font-light text-black">
              Poszukujesz doświadczonych programistów? Nasza platforma łączy Cię
              z profesjonalistami, którzy dostosują i stworzą oprogramowanie
              idealnie odpowiadające Twoim potrzebom biznesowym. Skorzystaj z
              naszej sieci talentów, by przyspieszyć rozwój swojego projektu IT.
            </p>
            <div
              className="text-primary mt-4 block hover:underline"
              aria-label="Dowiedz się więcej o tworzeniu aplikacji"
            >
              Dowiedz się więcej
            </div>
          </div>
        </Link>
        <Link
          href="/praca-zdalna/e-commerce"
          className="rounded-3xl overflow-hidden flex flex-col lg:flex-row w-full"
          style={{ boxShadow: "inset 0px 0px 4px black" }}
        >
          <div className="relative h-full ">
            <Image
              src="/slug/e-commerce.webp"
              width={1366}
              height={1366}
              alt="Wdrożenie Sklepów Internetowych z naszymi ekspertami"
              className="rounded-t-lg lg:rounded-tr-none lg:rounded-l-lg min-h-full w-auto"
            />
            <h2 className="lg:hidden rounded-lg absolute bottom-3 w-[90%] left-1/2 -translate-x-1/2 bg-[#126b91] bg-opacity-80 text-2xl font-bold text-white p-3 !font-gotham">
              Wdroż sklep internetowy z najlepszymi ekspertami
            </h2>
          </div>
          <div className="p-6 lg:min-w-[85%]">
            <h2 className="hidden lg:block text-2xl font-bold text-black  !font-gotham">
              Wdróż sklep internetowy z najlepszymi specjalistami
            </h2>
            <p className="mt-2 font-light text-black">
              Chcesz stworzyć lub zoptymalizować swój sklep online? Nasza
              platforma oferuje dostęp do specjalistów od e-commerce, którzy
              pomogą Ci maksymalizować sprzedaż i poprawić doświadczenia
              użytkowników. Zatrudnij naszych ekspertów i przekształć swoje
              cyfrowe przedsięwzięcia w sukces.
            </p>
            <div
              className="text-primary mt-4 block hover:underline"
              aria-label="Dowiedz się więcej o tworzeniu aplikacji"
            >
              Dowiedz się więcej
            </div>
          </div>
        </Link>
        <Link
          href="/praca-zdalna/marketing"
          className="rounded-3xl overflow-hidden flex flex-col lg:flex-row w-full"
          style={{ boxShadow: "inset 0px 0px 4px black" }}
        >
          <div className="relative h-full ">
            <Image
              src="/slug/marketing.webp"
              width={1366}
              height={1366}
              alt="Zatrudnij specjalistów od Marketingu"
              className="rounded-t-lg lg:rounded-tr-none lg:rounded-l-lg min-h-full w-auto"
            />
            <h2 className="lg:hidden rounded-lg absolute bottom-3 w-[90%] left-1/2 -translate-x-1/2 bg-[#126b91] bg-opacity-80 text-2xl font-bold text-white p-3 !font-gotham">
              Najlepsi specjaliści od marketingu
            </h2>
          </div>
          <div className="p-6 lg:min-w-[85%]">
            <h2 className="hidden lg:block text-2xl font-bold text-black  !font-gotham">
              Zatrudnij specjalistów od marketingu
            </h2>
            <p className="mt-2 font-light text-black">
              Potrzebujesz skutecznej promocji? Skorzystaj z wiedzy naszych
              ekspertów marketingowych, którzy zaplanują i zrealizują kampanie
              reklamowe, które zwiększą Twoją rozpoznawalność i sprzedaż. Nasza
              platforma umożliwia łatwe i szybkie zatrudnianie doświadczonych
              marketerów online.
            </p>
            <div
              className="text-primary mt-4 block hover:underline"
              aria-label="Dowiedz się więcej o tworzeniu aplikacji"
            >
              Dowiedz się więcej
            </div>
          </div>
        </Link>
        <Link
          href="/praca-zdalna/uslugi-it"
          className="rounded-3xl overflow-hidden flex flex-col lg:flex-row w-full"
          style={{ boxShadow: "inset 0px 0px 4px black" }}
        >
          <div className="relative h-full ">
            <Image
              src="/slug/uslugi-it.webp"
              width={1366}
              height={1366}
              alt="Zatrudnij ekspertów od Wsparcia IT"
              className="rounded-t-lg lg:rounded-tr-none lg:rounded-l-lg min-h-full w-auto"
            />
            <h2 className="lg:hidden rounded-lg absolute bottom-3 w-[90%] left-1/2 -translate-x-1/2 bg-[#126b91] bg-opacity-80 text-2xl font-bold text-white p-3 !font-gotham">
              Najlepsi specjaliści od wsparcia IT
            </h2>
          </div>
          <div className="p-6 lg:min-w-[85%]">
            <h2 className="hidden lg:block text-2xl font-bold text-black  !font-gotham">
              Zatrudnij ekspertów od wsparcia IT
            </h2>
            <p className="mt-2 font-light text-black">
              Nasza platforma oferuje szybki dostęp do specjalistów IT, którzy
              zapewnią wsparcie techniczne, zarządzanie infrastrukturą, a także
              optymalizację Twoich systemów. Zatrudnij naszych ekspertów, by
              utrzymać ciągłość i efektywność Twojej działalności
              technologicznej.
            </p>
            <div
              className="text-primary mt-4 block hover:underline"
              aria-label="Dowiedz się więcej o tworzeniu aplikacji"
            >
              Dowiedz się więcej
            </div>
          </div>
        </Link>
        <Link
          href="/praca-zdalna/uslugi-biznesowe"
          className="rounded-3xl overflow-hidden flex flex-col lg:flex-row w-full"
          style={{ boxShadow: "inset 0px 0px 4px black" }}
        >
          <div className="relative h-full ">
            <Image
              src="/slug/uslugi-biznesowe.webp"
              width={1366}
              height={1366}
              alt="Zatrudnij doradców biznesowych"
              className="rounded-t-lg lg:rounded-tr-none lg:rounded-l-lg min-h-full w-auto"
            />
            <h2 className="lg:hidden rounded-lg absolute bottom-3 w-[90%] left-1/2 -translate-x-1/2 bg-[#126b91] bg-opacity-80 text-2xl font-bold text-white p-3 !font-gotham">
              Najlepsi doradcy biznesowi
            </h2>
          </div>
          <div className="p-6 lg:min-w-[85%]">
            <h2 className="hidden lg:block text-2xl font-bold text-black  !font-gotham">
              Zatrudnij doradców biznesowych
            </h2>
            <p className="mt-2 font-light text-black">
              Nasza platforma umożliwia łatwe znalezienie i zatrudnienie
              ekspertów, którzy pomogą w optymalizacji procesów, planowaniu
              strategicznym i zarządzaniu. Skorzystaj z doświadczenia naszych
              specjalistów, aby przyspieszyć rozwój i zwiększyć efektywność
              swojego przedsięwzięcia biznesowego.
            </p>
            <div
              className="text-primary mt-4 block hover:underline"
              aria-label="Dowiedz się więcej o tworzeniu aplikacji"
            >
              Dowiedz się więcej
            </div>
          </div>
        </Link>
        <Link
          href="/praca-zdalna/projektowanie"
          className="rounded-3xl overflow-hidden flex flex-col lg:flex-row w-full"
          style={{ boxShadow: "inset 0px 0px 4px black" }}
        >
          <div className="relative h-full">
            <Image
              src="/slug/projektowanie.webp"
              width={1366}
              height={1366}
              alt="Zatrudnij Projektantów dla Twojego Biznesu"
              className="rounded-t-lg lg:rounded-tr-none lg:rounded-l-lg min-h-full w-auto"
            />
            <h2 className="lg:hidden rounded-lg absolute bottom-3 w-[90%] left-1/2 -translate-x-1/2 bg-[#126b91] bg-opacity-80 text-2xl font-bold text-white p-3 !font-gotham">
              Najlepsi specjaliści dla Twojego Biznesu
            </h2>
          </div>
          <div className="p-6 lg:min-w-[85%]">
            <h2 className="hidden lg:block text-2xl font-bold text-black  !font-gotham">
              Zatrudnij Projektantów dla Twojego Biznesu
            </h2>
            <p className="mt-2 font-light text-black">
              Czy potrzebujesz profesjonalnego projektu graficznego lub strony
              internetowej? Nasza platforma łączy Cię z doświadczonymi
              projektantami, którzy przekształcą Twoje wizje w rzeczywistość.
              Wybierz naszych specjalistów i daj się zauważyć dzięki unikalnym i
              efektownym projektom.
            </p>
            <div
              className="text-primary mt-4 block hover:underline"
              aria-label="Dowiedz się więcej o tworzeniu aplikacji"
            >
              Dowiedz się więcej
            </div>
          </div>
        </Link>
      </div>
    </section>
  );
}

function WhatMakesUsUniqueSection() {
  return (
    <section className="my-16">
      <h2 className="text-3xl font-bold mb-6 text-black  font-gotham">
        Co nas wyróżnia?
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
        <HighlightCard
          icon={<FaRocket className="text-primary text-5xl" />}
          title="Szybka rekrutacja"
          description="Proces rekrutacji jest szybki i efektywny, pozwalając Ci skupić się na rozwoju projektu."
          linkTitle="Quixy Talent™"
        />
        <HighlightCard
          icon={<FaUsers className="text-primary text-5xl" />}
          title="Najlepsi eksperci"
          description="Współpracujemy z doświadczonymi ekspertami, aby zapewnić najwyższą jakość usług."
          linkTitle="Quixy Talent™"
        />
        <HighlightCard
          icon={<FaRegLightbulb className="text-primary text-5xl" />}
          title="Innowacyjne pomysły"
          description="Nasze narzędzia i porady pomogą Ci stworzyć unikalne i skuteczne strategie biznesowe."
          linkTitle="Pomysły Quixy™"
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
    <div
      className="font-coco p-6 rounded-xl bg-[#126b91] shadow-lg"
      style={{ boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.25)" }}
    >
      <div className="bg-white rounded-full aspect-square w-32 flex items-center justify-center mx-auto">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-white mb-2 mt-4">{title}</h3>
      <p className="text-gray-200">{description}</p>
      <div className="mt-6" />
      <Link
        className="font-bold bg-white hover:bg-opacity-90 duration-100 underline text-primary p-3 rounded-lg"
        href="/register"
        title={linkTitle}
      >
        {linkTitle}
      </Link>
    </div>
  );
}

// Sekcja Call to Action
// Komponent formularza kontaktowego
function ContactFormComponent() {
  return (
    <div className="bg-blue-100 p-6 rounded-lg shadow-lg my-12 max-w-lg mx-auto">
      <h2 className="text-2xl font-bold text-blue-600 mb-4">
        Skontaktuj się z nami!
      </h2>
      <p className="text-gray-700 mb-6">
        Poszukujemy ludzi do pomocy w rozwoju <b>Quixy.pl</b>. To wersja beta
        aplikacji, a Twoje wsparcie może być kluczowe.
      </p>
      <ContactForm />
    </div>
  );
}

function CallToActionSection() {
  return (
    <section className="flex flex-col lg:flex-row my-16 font-gotam text-left">
      <div className="overflow-hidden h-full rounded-tl-[80px] rounded-3xl">
        <Image
          src="/happy.jpg"
          width={500}
          height={500}
          alt="Logo serwisu quixy.pl"
          className=""
        />
      </div>
      <div className="lg:p-6">
        <h2 className="text-3xl font-semibold mb-6 text-black mt-6 lg:mt-0">
          Znajdź wolne stanowisko pracy zdalnej!
        </h2>
        <p className="mb-3 text-lg text-black max-w-2xl">
          Quixy.pl to najlepsza platforma z pracą zdalną w Polsce. Technologia z
          której korzystamy jest szybka i niezawodna. Zapraszamy do
          przeprowadzania rekrutacji, tworzenia wspólnych projektów i poszukiwań
          pracy na naszej platformie.
        </p>
        <Link
          href="/register"
          title="Dołącz do Quixy"
          className="bg-[#126b91] text-white py-1.5 px-2 rounded-lg hover:bg-orange-600 transition font-gotham font-light"
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
        <FunnyComponent />
      </main>
      <MainFooter
        heading={
          "Zatrudnij Specjalistów IT, Marketingu i Designu w Quixy Talent™"
        }
        category={"praca-zdalna"}
        jobsList={jobs}
      />
    </div>
  );
}

// Zabawny komponent
function FunnyComponent() {
  return (
    <div className="flex flex-col lg:flex-row lg:justify-between font-coco bg-[#126b91] p-6 rounded-lg shadow-lg my-12">
      <div className="">
        <h2 className="text-3xl lg:text-5xl font-bold text-white mb-4">
          Potrzebujesz chwili wytchnienia?
        </h2>
        <p className="text-white mb-4">
          Praca zdalna może być intensywna, ale kto powiedział, że nie może być
          zabawnie?
        </p>

        <p className="bg-white rounded-xl p-3 text-xl text-black font-bold italic w-max max-w-[100%]">
          „Zatrudnij mnie, zanim zrobi to ktoś inny! 🤖” – Najnowsza AI
        </p>
        <p className="mt-4 text-sm text-white">
          *Tylko żart, obiecujemy, że nie zatrudniamy robotów... jeszcze.*
        </p>
        <div className="my-3" />
        <Link
          href="/register"
          title="Zarejestruj się w platformie z pracą zdalną"
          className="mb-3 bg-white text-primary py-1.5 px-2 rounded-lg hover:bg-opacity-90 durtion-100 font-bold"
        >
          Zarejestruj
        </Link>
      </div>
      <Image
        src="https://media.giphy.com/media/Wv9kcISbTN0B2/giphy.gif"
        width={512}
        height={512}
        alt="Zabawny GIF"
        className="rounded-lg w-[300px]"
      />
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
