"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  FaUserTie,
  FaBriefcase,
  FaCheckCircle,
  FaHandsHelping,
  FaRocket,
  FaCogs,
} from "react-icons/fa";

export default function AboutQuixyTalent() {
  const [content, setContent] = useState("client");

  return (
    <div className="font-coco py-12">
      <div className="relative z-50 rounded-t-xl  mx-auto">
        <div className="mb-8">
          <h2 className="text-3xl font-gotham text-black">
            Twoja Platforma Pracy Zdalnej
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-3 mt-6 font-gotham">
          <button
            style={{ textShadow: "2px 2px 2px black" }}
            onClick={() => setContent("client")}
            className={`lg:text-xl border-[6px]   rounded-xl flex items-center justify-center p-4  ${
              content === "talent"
                ? "border-primary text-white bg-primary"
                : "border-cta text-white bg-cta"
            }`}
          >
            <FaUserTie className="mr-2" />
            KLIENT
          </button>
          <button
            onClick={() => setContent("talent")}
            style={{ textShadow: "2px 2px 2px black" }}
            className={`lg:text-xl border-[6px]  rounded-xl flex items-center justify-center p-4  ${
              content === "client"
                ? "border-primary text-white bg-primary"
                : "border-cta text-white bg-cta"
            }`}
          >
            <FaBriefcase className="mr-2" />
            TALENT
          </button>
        </div>

        {content === "client" && (
          <div className="mt-8 p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-3xl font-bold text-black flex items-center">
              <div className="rounded-full bg-cta p-4 aspect-square flex items-center justify-center mr-3">
                <FaHandsHelping className=" text-white w-[30px]" />
              </div>
              Jak Quixy.pl pomaga klientom?
            </h2>
            <p className="text-lg mt-4 text-black">
              Korzystając z naszych usług otrzymujesz{" "}
              <strong>łatwy dostęp</strong> do najlepszych ekspertów z różnych
              dziedzin. Zatrudnij <strong>specjalistów</strong> IT, marketingu,
              web developmentu, bezpieczeństwa IT, czy projektowania
              graficznego. Współpracuj z talentami, które pomogą Ci zrealizować
              twoje cele.
            </p>
            <ul className="list-none my-12 space-y-3 text-black">
              <li className="relative">
                <FaCheckCircle className="absolute left-3 top-1/2 -translate-y-1/2 w-6 h-6 opacity-80 z-0 text-green-500 mr-2" />{" "}
                <div className="pl-[52px] max-w-lg">
                  Łatwo przeglądaj profile ekspertów i znajdź specjalistów
                  odpowiadających Twoim potrzebom.
                </div>
              </li>
              <li className="relative mt-3">
                <FaCheckCircle className="absolute left-3 top-1/2 -translate-y-1/2 w-6 h-6 opacity-80 z-0 text-green-500 mr-2" />{" "}
                <div className="pl-[52px] max-w-lg">
                  Zlecaj projekty w branżach takich jak IT, marketing, animacja,
                  i wiele więcej.
                </div>
              </li>
              <li className="relative mt-3">
                <FaCheckCircle className="absolute left-3 top-1/2 -translate-y-1/2 w-6 h-6 opacity-80 z-0 text-green-500 mr-2" />{" "}
                <div className="pl-[52px] max-w-lg">
                  Korzystamy z technologii <b>CCRM</b>, by maksymalizować
                  współpracę między klientami.
                </div>
              </li>
              <li className="relative mt-3">
                <FaCheckCircle className="absolute left-3 top-1/2 -translate-y-1/2 w-6 h-6 opacity-80 z-0 text-green-500 mr-2" />{" "}
                <div className="pl-[52px] max-w-lg">
                  Skoncentruj się na swoim biznesie, podczas gdy eksperci
                  dostarczą <b> jakość</b>, którą gwarantujemy.
                </div>
              </li>
            </ul>
            <Link
              href="/register"
              style={{ textShadow: "2px 2px 2px black" }}
              className="text-white bg-[#14A800] font-gotham py-1.5 px-2 rounded-lg w-max hover:bg-opacity-90 h-max"
            >
              Otwórz konto klienta
            </Link>
            <Image
              src="/assets/client-banner.png"
              width={512}
              height={512}
              alt=""
              className="mt-6 w-full sm:max-w-xl rounded-3xl"
            />
          </div>
        )}

        {content === "talent" && (
          <div className="mt-8 p-6 bg-white rounded-lg shadow-lg">
            <div className="mb-6 grid grid-cols-1 lg:grid-cols-2">
              <div className="lg:pr-6">
                <h2 className="text-3xl font-bold text-black flex items-center">
                  <div className="rounded-full bg-cta p-4 aspect-square flex items-center justify-center mr-3">
                    <FaRocket className=" text-white w-[30px]" />
                  </div>
                  Chcesz zostać talentem w Quixy.pl?
                </h2>
                <p className="text-lg mt-4 mb-4 text-black">
                  Jako talent w Quixy, możesz pracować nad projektami, które{" "}
                  <strong>pasują do twoich umiejętności</strong>. Współpracuj z
                  klientami, rozwijaj swoje <strong>portfolio</strong> i
                  zdobywaj <strong>nowe doświadczenia</strong> w dynamicznie
                  rosnących branżach.
                </p>
                <Link
                  href="/register"
                  style={{ textShadow: "2px 2px 2px black" }}
                  className="text-white bg-[#14A800] font-gotham py-1.5 px-2 rounded-lg w-max hover:bg-opacity-90 h-max"
                >
                  Otwórz konto talentu
                </Link>
                <ul className="list-none mt-12 space-y-3 text-black mb-7">
                  <li className="relative mt-3">
                    <FaCogs className="absolute left-3 top-1/2 -translate-y-1/2 w-6 h-6 opacity-80 z-0 text-cta mr-2" />

                    <div className="pl-[52px] max-w-lg">
                      Zarejestruj się, aby znaleźć klientów i zacząć pracować
                      nad ekscytującymi projektami.
                    </div>
                  </li>
                  <li className="relative mt-3">
                    <FaCogs className="absolute left-3 top-1/2 -translate-y-1/2 w-6 h-6 opacity-80 z-0 text-cta mr-2" />

                    <div className="pl-[52px] max-w-lg">
                      Otrzymuj oferty pracy w IT, e-commerce, marketingu,
                      animacji, i wielu innych branżach.
                    </div>
                  </li>
                  <li className="relative mt-3">
                    <FaCogs className="absolute left-3 top-1/2 -translate-y-1/2 w-6 h-6 opacity-80 z-0 text-cta mr-2" />

                    <div className="pl-[52px] max-w-lg">
                      Korzystaj z <b>Quixy AI™</b>, by generować unikalne
                      pomysły na biznes i projekty.
                    </div>
                  </li>
                  <li className="relative mt-3">
                    <FaCogs className="absolute left-3 top-1/2 -translate-y-1/2 w-6 h-6 opacity-80 z-0 text-cta mr-2" />

                    <div className="pl-[52px] max-w-lg">
                      Zarabiaj, sprzedając gotowe prace, aplikacje, strony
                      internetowe i wiele więcej.
                    </div>
                  </li>
                </ul>
              </div>
              <Image
                src="/assets/talent-banner.png"
                width={512}
                height={512}
                alt=""
                className="w-full lg:max-w-2xl rounded-3xl md:pl-12"
              />
            </div>

            <p className="text-lg mt-6 text-black">
              Z nami możesz rozwijać swoją karierę, pracować nad niesamowitymi
              projektami, i współpracować z najlepszymi klientami.
              <span className="font-bold ml-1">
                Otwórz drzwi do nowych możliwości!
              </span>
            </p>
          </div>
        )}
        <p className="mt-6 text-lg bg-primary bg-opacity-80 rounded-xl p-3 text-white font-light max-w-3xl">
          Nasz system CCRM umożliwia firmom nawiązywanie współpracy, dzielenie
          się zasobami i wspólne tworzenie innowacyjnych rozwiązań. To podejście
          oparte na partnerstwie oraz wzajemnym wsparciu pozwala na dynamiczny
          rozwój zarówno naszych klientów, jak i całego ekosystemu biznesowego,
          w którym operują.
        </p>
        <p className="text-lg mt-6 text-black mb-3">
          Zaufaj nam, tak jak to zrobiło 97% naszych klientów, w tym takie marki
          jak
        </p>
        <div className="mt-3 flex items-center flex-wrap w-full -ml-6 justify-center sm:justify-start">
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
  );
}
