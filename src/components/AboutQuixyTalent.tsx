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
                ? "bg-ctaStart text-white shadow-lg transform scale-105"
                : "bg-gray-200 text-black hover:bg-gray-200"
            }`}
          >
            FIRMA
          </button>
          <button
            onClick={() => setContent("talent")}
            className={`text-sm sm:text-base font-bold py-2 px-6 rounded-lg transition-all duration-300 shadow-md ${
              content === "talent"
                ? "bg-ctaStart text-white shadow-lg transform scale-105"
                : "bg-gray-200 text-black hover:bg-gray-200"
            }`}
          >
            FREELANCER
          </button>
        </div>

        {content === "client" && (
          <div className="mt-8">
            <div className="mb-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="">
                <h2 className="text-3xl 2xl:text-5xl font-lato font-bold flex items-center text-black">
                  Dodaj swoją firmę
                </h2>
                <p className="mt-6 2xl:mt-8 text-black">
                  Utwórz profil firmy aby zaprezentować swoje usługi zdalne
                </p>

                <Link
                  href="/register"
                  className="rounded-md block text-white bg-gradient-to-r from-ctaStart to-ctaEnd font-extrabold py-2 px-4 mt-6 w-max hover:scale-105 duration-100"
                >
                  Dołącz jako firma
                </Link>
                <ul className="list-none mt-6 flex flex-col gap-2 text-black">
                  <li className="relative">
                    <FaCheckCircle className="absolute left-3 top-1/2 -translate-y-1/2 w-6 h-6 z-0 text-ctaStart mr-2" />{" "}
                    <div className="pl-[52px] max-w-lg bg-gradient-to-r from-transparent pr-3">
                      Łatwo przeglądaj profile ekspertów i znajdź specjalistów
                      odpowiadających Twoim potrzebom.
                    </div>
                  </li>
                  <li className="relative">
                    <FaCheckCircle className="absolute left-3 top-1/2 -translate-y-1/2 w-6 h-6 z-0 text-ctaStart mr-2" />{" "}
                    <div className="pl-[52px] max-w-lg bg-gradient-to-r from-transparent pr-3">
                      Zlecaj projekty w branżach takich jak IT, marketing,
                      animacja, i wiele więcej.
                    </div>
                  </li>
                  <li className="relative">
                    <FaCheckCircle className="absolute left-3 top-1/2 -translate-y-1/2 w-6 h-6 z-0 text-ctaStart mr-2" />{" "}
                    <div className="pl-[52px] max-w-lg bg-gradient-to-r from-transparent pr-3">
                      Skorzystaj z naszego rozwiązania generowania leadów dla
                      firm.
                    </div>
                  </li>
                  <li className="relative">
                    <FaCheckCircle className="absolute left-3 top-1/2 -translate-y-1/2 w-6 h-6 z-0 text-ctaStart mr-2" />{" "}
                    <div className="pl-[52px] max-w-lg bg-gradient-to-r from-transparent pr-3">
                      Korzystamy z technologii <b>CCRM</b>, by maksymalizować
                      współpracę między klientami i firmami.
                    </div>
                  </li>
                  <li className="relative">
                    <FaCheckCircle className="absolute left-3 top-1/2 -translate-y-1/2 w-6 h-6 z-0 text-ctaStart mr-2" />{" "}
                    <div className="pl-[52px] max-w-lg bg-gradient-to-r from-transparent pr-3">
                      Skoncentruj się na swoim biznesie, podczas gdy
                      freelancerzy dostarczą jakościowe rozwiązania.
                    </div>
                  </li>
                </ul>
              </div>
              <div className="w-full lg:flex lg:justify-end">
                <div className="rounded-l-xl p-1 bg-gradient-to-r from-ctaStart to-transparent w-full h-auto lg:w-max lg:max-w-full lg:h-max lg:max-h-full">
                  <Image
                    src="/assets/client-banner.png"
                    width={1024}
                    height={1024}
                    quality={75}
                    placeholder="blur"
                    blurDataURL="data:image/webp;base64,UklGRiIAAABXRUJQVlA4WAoAAAAQAAAfAADuwH/xAAfAQADAAQAAAAAAQAvAQADAAQAAAAAAQAvAQA"
                    alt="Współpraca zdalna z perspektywy klienta"
                    className=" rounded-l-lg bg-white w-full lg:max-w-xl"
                  />
                </div>
              </div>
            </div>
          </div>
        )}
        {content === "talent" && (
          <div className="mt-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="">
                <h2 className="text-3xl 2xl:text-5xl font-lato font-bold flex items-center text-black">
                  Utwórz portfolio
                </h2>
                <p className="mt-6 2xl:mt-8 text-black">
                  Znajdź pracę lub jednorazowe zlecenia od klientów
                </p>

                <Link
                  href="/register"
                  className="rounded-md block text-white bg-gradient-to-r from-ctaStart to-ctaEnd font-extrabold py-2 px-4 mt-6 w-max hover:scale-105 duration-100"
                >
                  Dołącz bez firmy
                </Link>
                <ul className="list-none mt-6 flex flex-col gap-2 text-black">
                  <li className="relative">
                    <FaCheckCircle className="absolute left-3 top-1/2 -translate-y-1/2 w-6 h-6 z-0 text-ctaStart mr-2" />
                    <div className="pl-[52px] max-w-lg bg-gradient-to-r from-transparent pr-3">
                      Zarejestruj się, aby znaleźć klientów i zacząć
                      pozyskiwanie zleceń.
                    </div>
                  </li>
                  <li className="relative">
                    <FaCheckCircle className="absolute left-3 top-1/2 -translate-y-1/2 w-6 h-6 z-0 text-ctaStart mr-2" />
                    <div className="pl-[52px] max-w-lg bg-gradient-to-r from-transparent pr-3">
                      Otrzymuj oferty pracy w IT, e-commerce, marketingu,
                      animacji, i wielu innych branżach.
                    </div>
                  </li>
                  <li className="relative">
                    <FaCheckCircle className="absolute left-3 top-1/2 -translate-y-1/2 w-6 h-6 z-0 text-ctaStart mr-2" />
                    <div className="pl-[52px] max-w-lg bg-gradient-to-r from-transparent pr-3">
                      Korzystaj z <b>Quixy AI™</b>, by generować unikalny
                      kontent i obrazy.{" "}
                      <span className="text-gray-500"> (już niedługo!)</span>
                    </div>
                  </li>
                  <li className="relative">
                    <FaCheckCircle className="absolute left-3 top-1/2 -translate-y-1/2 w-6 h-6 z-0 text-ctaStart mr-2" />
                    <div className="pl-[52px] max-w-lg bg-gradient-to-r from-transparent pr-3">
                      Zarabiaj, wystawiając gotowe prace, aplikacje, strony
                      internetowe i usługi do naszego rynku.
                    </div>
                  </li>
                </ul>
              </div>
              <div className="w-full lg:flex lg:justify-end">
                <div className="rounded-l-xl p-1 bg-gradient-to-r from-ctaStart to-transparent w-full h-auto lg:w-max lg:max-w-full lg:h-max lg:max-h-full">
                  <Image
                    src="/assets/talent-banner.png"
                    width={1024}
                    height={1024}
                    quality={75}
                    placeholder="blur"
                    blurDataURL="data:image/webp;base64,UklGRiIAAABXRUJQVlA4WAoAAAAQAAAfAADuwH/xAAfAQADAAQAAAAAAQAvAQADAAQAAAAAAQAvAQA"
                    alt="Współpraca zdalna z perspektywy klienta"
                    className=" rounded-l-lg bg-white w-full lg:max-w-xl"
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
