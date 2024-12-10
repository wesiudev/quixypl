"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FaCheckCircle } from "react-icons/fa";

export default function AboutQuixyTalent() {
  const [content, setContent] = useState("talent");

  return (
    <div className="mt-12">
      <div className="relative mx-auto">
        <div className="flex gap-4 mt-6">
          <button
            onClick={() => setContent("client")}
            className={`text-sm sm:text-base font-bold py-2 px-6 rounded-lg transition-all duration-300 shadow-md ${
              content === "client"
                ? "bg-gradient-to-r from-primary to-cta text-white shadow-lg transform scale-105"
                : "bg-gray-100 text-black hover:bg-gray-200"
            }`}
          >
            FIRMA
          </button>
          <button
            onClick={() => setContent("talent")}
            className={`text-sm sm:text-base font-bold py-2 px-6 rounded-lg transition-all duration-300 shadow-md ${
              content === "talent"
                ? "bg-gradient-to-r from-primary to-cta text-white shadow-lg transform scale-105"
                : "bg-gray-100 text-black hover:bg-gray-200"
            }`}
          >
            FREELANCER
          </button>
        </div>

        {content === "client" && (
          <div className="mt-8">
            <div className="mb-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="lg:pr-6">
                <h2 className="text-xl lg:text-3xl font-extrabold flex items-center text-black">
                  Jak Quixy pomaga firmom?
                </h2>
                <p className="mt-3 text-black">
                  Korzystając z naszej platformy otrzymujesz łatwy dostęp do
                  najlepszych funkcji i narzędzi, które pomogą Ci zoptymalizować
                  proces rekrutacji. Opublikuj swoje usługi i pozyskuj nowe
                  zlecenia.
                </p>

                <Link
                  href="/register"
                  className="rounded-md block text-white bg-gradient-to-r from-primary to-cta font-gotham py-3 px-6 mt-4 w-max hover:scale-105 duration-100"
                >
                  Otwórz konto firmy
                </Link>
                <ul className="list-none mt-6 space-y-4 text-black mb-7">
                  <li className="relative">
                    <FaCheckCircle className="absolute left-3 top-1/2 -translate-y-1/2 w-6 h-6 z-0 text-cta mr-2" />{" "}
                    <div className="pl-[52px] max-w-lg bg-gradient-to-r from-transparent to-primary/10 rounded-r-xl pr-3 py-3">
                      Łatwo przeglądaj profile ekspertów i znajdź specjalistów
                      odpowiadających Twoim potrzebom.
                    </div>
                  </li>
                  <li className="relative mt-3">
                    <FaCheckCircle className="absolute left-3 top-1/2 -translate-y-1/2 w-6 h-6 z-0 text-cta mr-2" />{" "}
                    <div className="pl-[52px] max-w-lg bg-gradient-to-r from-transparent to-primary/10 rounded-r-xl pr-3 py-3">
                      Zlecaj projekty w branżach takich jak IT, marketing,
                      animacja, i wiele więcej.
                    </div>
                  </li>
                  <li className="relative mt-3">
                    <FaCheckCircle className="absolute left-3 top-1/2 -translate-y-1/2 w-6 h-6 z-0 text-cta mr-2" />{" "}
                    <div className="pl-[52px] max-w-lg bg-gradient-to-r from-transparent to-primary/10 rounded-r-xl pr-3 py-3">
                      Korzystamy z technologii <b>CCRM</b>, by maksymalizować
                      współpracę między klientami.
                    </div>
                  </li>
                  <li className="relative mt-3">
                    <FaCheckCircle className="absolute left-3 top-1/2 -translate-y-1/2 w-6 h-6 z-0 text-cta mr-2" />{" "}
                    <div className="pl-[52px] max-w-lg bg-gradient-to-r from-transparent to-primary/10 rounded-r-xl pr-3 py-3">
                      Skoncentruj się na swoim biznesie, podczas gdy eksperci
                      dostarczą <b>jakość</b>, którą gwarantujemy.
                    </div>
                  </li>
                </ul>
              </div>
              <div className="w-full lg:flex lg:justify-end">
                <div className="p-1 bg-gradient-to-r from-primary to-cta w-full h-auto lg:w-max lg:max-w-full lg:h-max lg:max-h-full">
                  <Image
                    src="/assets/client-banner.png"
                    width={1024}
                    height={1024}
                    quality={75}
                    placeholder="blur"
                    blurDataURL="data:image/webp;base64,UklGRiIAAABXRUJQVlA4WAoAAAAQAAAfAADuwH/xAAfAQADAAQAAAAAAQAvAQADAAQAAAAAAQAvAQA"
                    alt="Współpraca zdalna z perspektywy klienta"
                    className=" bg-white w-full lg:max-w-xl"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {content === "talent" && (
          <div className="mt-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="lg:pr-6">
                <h2 className="text-xl lg:text-3xl font-extrabold flex items-center text-black">
                  Zostań talentem w Quixy!
                </h2>
                <p className="mt-3 text-black">
                  Jako talent w Quixy, możesz pracować nad projektami,{" "}
                  <strong>wyświetlać swoje usługi</strong> i pozyskiwać
                  klientów. Współpracuj z firmami – rozwiń swoje{" "}
                  <strong>portfolio</strong> i zdobywaj{" "}
                  <strong>nowe doświadczenia</strong> w dynamicznie rosnących
                  branżach.
                </p>

                <Link
                  href="/register"
                  className="rounded-md block text-white bg-gradient-to-r from-primary to-cta font-gotham py-3 px-6 mt-4 w-max hover:scale-105 duration-100"
                >
                  Otwórz konto talentu
                </Link>
                <ul className="list-none mt-6 space-y-4 text-black mb-7">
                  <li className="relative mt-3">
                    <FaCheckCircle className="absolute left-3 top-1/2 -translate-y-1/2 w-6 h-6 z-0 text-cta mr-2" />
                    <div className="pl-[52px] max-w-lg bg-gradient-to-r from-transparent to-primary/10 rounded-r-xl pr-3 py-3">
                      Zarejestruj się, aby znaleźć klientów i zacząć pracować
                      nad ekscytującymi projektami.
                    </div>
                  </li>
                  <li className="relative mt-3">
                    <FaCheckCircle className="absolute left-3 top-1/2 -translate-y-1/2 w-6 h-6 z-0 text-cta mr-2" />
                    <div className="pl-[52px] max-w-lg bg-gradient-to-r from-transparent to-primary/10 rounded-r-xl pr-3 py-3">
                      Otrzymuj oferty pracy w IT, e-commerce, marketingu,
                      animacji, i wielu innych branżach.
                    </div>
                  </li>
                  <li className="relative mt-3">
                    <FaCheckCircle className="absolute left-3 top-1/2 -translate-y-1/2 w-6 h-6 z-0 text-cta mr-2" />
                    <div className="pl-[52px] max-w-lg bg-gradient-to-r from-transparent to-primary/10 rounded-r-xl pr-3 py-3">
                      Korzystaj z <b>Quixy AI™</b>, by generować unikalne
                      pomysły na biznes i projekty.
                    </div>
                  </li>
                  <li className="relative mt-3">
                    <FaCheckCircle className="absolute left-3 top-1/2 -translate-y-1/2 w-6 h-6 z-0 text-cta mr-2" />
                    <div className="pl-[52px] max-w-lg bg-gradient-to-r from-transparent to-primary/10 rounded-r-xl pr-3 py-3">
                      Zarabiaj, sprzedając gotowe prace, aplikacje, strony
                      internetowe i wiele więcej.
                    </div>
                  </li>
                </ul>
              </div>
              <div className="w-full lg:flex lg:justify-end">
                <div className=" p-1 bg-gradient-to-r from-primary to-cta w-full h-auto lg:w-max lg:max-w-full lg:h-max lg:max-h-full">
                  <Image
                    src="/assets/talent-banner.png"
                    width={1024}
                    height={1024}
                    quality={75}
                    placeholder="blur"
                    blurDataURL="data:image/webp;base64,UklGRiIAAABXRUJQVlA4WAoAAAAQAAAfAADuwH/xAAfAQADAAQAAAAAAQAvAQADAAQAAAAAAQAvAQA"
                    alt="Współpraca zdalna z perspektywy klienta"
                    className=" bg-white w-full lg:max-w-xl"
                  />
                </div>
              </div>
            </div>
            <p className="text-black mt-2">
              W Quixy możesz rozwijać swoją karierę, pracować nad niesamowitymi
              projektami, i współpracować z najlepszymi klientami.
              <span className="font-bold ml-1">
                Nie bój się zmian i otwórz drzwi do nowych możliwości!
              </span>
            </p>
          </div>
        )}
        <p className="mt-3 bg-gradient-to-r from-primary to-cta bg  p-3 text-white max-w-3xl rounded-md">
          Nasz system CCRM umożliwia nawiązywanie współpracy i wspólne tworzenie
          innowacyjnych rozwiązań. To podejście oparte na partnerstwie oraz
          wzajemnym wsparciu pozwala na dynamiczny rozwój zarówno naszych
          klientów, jak i całego ekosystemu biznesowego, w którym operują.
        </p>
      </div>
    </div>
  );
}
