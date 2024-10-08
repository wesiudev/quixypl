import { getTalents } from "../../../../utils/getTalents";
import jobs from "../../../../public/14.09.2024.json";
import Link from "next/link";
export default async function Page({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  // const talents = await getTalents();
  return (
    <div>
      <div className="font-coco items-end flex justify-between text-sm bg-white !text-black relative z-50 container mx-auto">
        <div className="flex flex-col">
          <h1 className="bg-cta text-white text-5xl lg:text-7xl font-gotham max-w-[70%] ">
            NASZA MISJA - QUIXY – PRZYSZŁOŚĆ PRACY ZDALNEJ
          </h1>
          <div className="text-5xl font-gotham mt-12">
            <p className="text-zinc-700 drop-shadow-lg shadow-black bg-white p-6 lg:p-12 mt-12">
              QUIXY TO NIE TYLKO NARZĘDZIE, TO FILOZOFIA NOWOCZESNEGO BIZNESU, O
              KTÓREJ PRZYSZŁOŚĆ WALCZYMY KAŻDEGO DNIA. STWORZYLIŚMY PLATFORMĘ,
              KTÓRA ŁĄCZY MOŻLIWOŚCI PRACY ZDALNEJ Z MOCĄ SZTUCZNEJ
              INTELIGENCJI, ABYŚ MÓGŁ TWORZYĆ LEPSZĄ PRZYSZŁOŚĆ DLA SIEBIE I
              SWOJEJ FIRMY.
            </p>
            <p className="text-zinc-700 drop-shadow-lg shadow-black bg-white p-6 lg:p-12 mt-12">
              NIE CHODZI O TO, ABYŚ PODĄŻAŁ ZA TRENDAMI. CHODZI O TO, ABYŚ JE
              TWORZYŁ! DZIĘKI QUIXY, WSZYSTKIE TWOJE INNOWACYJNE POMYSŁY ZOSTANĄ
              ZREALIZOWANE, A TY BĘDZIESZ MIAŁ DOSTĘP DO NARZĘDZI, KTÓRE POMOGĄ
              CI WZBOGACIĆ TWOJE PRZEDSIĘBIORSTWO, NIEZALEŻNIE OD TEGO, GDZIE
              SIĘ ZNAJDUJESZ.
            </p>
            <p className="text-zinc-700 drop-shadow-lg shadow-black bg-white p-6 lg:p-12 mt-12">
              KAŻDY, KTO WIERZY W TO, ŻE PRZYSZŁOŚĆ BIZNESU TO ZARZĄDZANIE
              CZASEM I ZASOBAMI Z WYKORZYSTANIEM NAJNOWSZYCH TECHNOLOGII,
              POWINIEN BYĆ CZĘŚCIĄ SPOŁECZNOŚCI QUIXY. NASZ AI BUSINESS PLANNER,
              NASZE GENERATORY I NARZĘDZIA PRACY ZDALNEJ TO NIE TYLKO
              TECHNOLOGIA – TO KROK W KIERUNKU LEPSZEJ PRZYSZŁOŚCI.
            </p>
            <p className="text-zinc-700 drop-shadow-lg shadow-black bg-white p-6 lg:p-12 mt-12">
              NIE CZEKAJ NA LEPSZE JUTRO, ZACZNIJ TWORZYĆ JE JUŻ DZIŚ Z QUIXY!
              WSPÓLNIE ZBUDUJEMY PRZYSZŁOŚĆ, W KTÓREJ INNOWACJE SĄ DOSTĘPNE DLA
              KAŻDEGO. Z QUIXY OGRANICZENIA NIE ISTNIEJĄ.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
