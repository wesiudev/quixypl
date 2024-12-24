"use client";
import StripeButton from "@/components/StripeButton";
import { set_modals } from "@/redux/slices/modalsopen";
import Image from "next/image";
import Link from "next/link";
import { FaInfoCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
export default function QuixiesModule() {
  const dispatch = useDispatch();
  const { modals } = useSelector((state: any) => state.modals);
  const { user } = useSelector((state: any) => state.user);
  const { light } = useSelector((state: any) => state.light);
  return (
    <>
      <button
        onClick={() => dispatch(set_modals({ ...modals, quixies: false }))}
        className={`disabled:cursor-not-allowed fixed left-0 top-0 w-full h-full ${
          modals?.quixies
            ? "z-[99999999999999999] bg-opacity-80 translate-y-0"
            : "z-[-99999] bg-opacity-0 translate-x-[100vw]"
        } bg-gradient-to-b from-primaryStart/70 to-primaryEnd/70 hover:from-primaryStart/50 hover:to-primaryEnd/50`}
      />
      <div
        className={`w-screen sm:w-[90%] lg:max-w-[50rem] xl:max-w-[60rem] h-screen sm:h-[80vh] fixed overflow-y-scroll scrollbar ${
          modals?.quixies
            ? "z-[999999999999999999999999] opacity-100 left-0 top-0 sm:left-1/2 sm:-translate-x-1/2 sm:top-1/2 sm:-translate-y-1/2"
            : "z-[-1000] opacity-0 -translate-y-[150vh]"
        }`}
      >
        <div
          onClick={(e: any) => e.stopPropagation()}
          className={`${
            light ? "bg-white" : "bg-[#222430]"
          } flex flex-wrap w-full my-auto mx-auto relative px-3`}
        >
          <div className="font-sans sticky -top-px z-[100] flex flex-row justify-between w-full gap-6">
            <div className="flex flex-col bg-gradient-to-b from-primaryStart to-primaryEnd rounded-b-xl px-4 py-2">
              <h2 className="font-extrabold text-white text-xl lg:text-2xl">
                Doładuj Quixies
              </h2>
              <p className="font-normal text-white mt-1">
                Wybierz odpowiedni pakiet dla swoich potrzeb
              </p>
            </div>

            <div className="h-max text-white text-xl bg-gradient-to-b from-accentStart to-accentEnd rounded-b-xl px-3 py-2 font-gotham font-extrabold w-max flex items-center">
              💎<div>{user?.tokens?.toFixed(2)}</div>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 w-full mt-6">
            {shopProducts?.map((item: any, i: any) => (
              <div
                key={i}
                className={`bg-gradient-to-b from-primaryStart to-primaryEnd group relative w-full h-full flex justify-between items-center flex-col rounded-lg overflow-hidden`}
              >
                <div className="relative w-full h-full pt-6 pb-16 lg:pt-0 lg:pb-12 flex justify-center items-center">
                  <Image
                    src={item.image}
                    width={1024}
                    height={1024}
                    alt={item.name}
                    className="w-full"
                  />
                  <p
                    className={`rounded-b-3xl font-coco font-bold text-center text-white bg-gradient-to-b from-ctaStart to-ctaEnd px-3 py-1 absolute top-0 left-2 sm:left-3 text-sm sm:text-base`}
                    style={{ textShadow: "0px 1px 1px black" }}
                  >
                    {item.price}
                    ,99 PLN
                  </p>
                </div>
                {item.discount > 0 && (
                  <div
                    style={{ textShadow: "0px 1px 2px black" }}
                    className="w-max absolute top-0 right-2 sm:right-3 bg-gradient-to-b from-accentStart to-accentEnd text-white text-sm sm:text-base font-coco font-bold rounded-b-3xl px-4 py-1"
                  >
                    {item.discountSize}%
                  </div>
                )}
                <div className="absolute bottom-0 left-0 w-full flex flex-col items-center mt-4">
                  <h2
                    style={{ textShadow: "0px 1px 1px black" }}
                    className="text-white font-semibold font-gotham text-sm sm:text-lg"
                  >
                    {item.name}
                  </h2>
                  {i === 2 && (
                    <div
                      style={{ textShadow: "0px 1px 2px black" }}
                      className="font-sans rounded-md bottom-0 left-0 bg-gradient-to-b from-accentStart to-accentEnd text-white font-bold px-2 py-1 text-xs sm:text-sm lg:text-base"
                    >
                      Najczęściej wybierany
                    </div>
                  )}

                  <StripeButton item={item} />
                </div>
              </div>
            ))}
          </div>
          <button
            onClick={() => dispatch(set_modals({ ...modals, quixies: false }))}
            className="sm:hidden font-coco mt-6 sticky left-1/2 -translate-x-1/2 bottom-3 w-max rounded-md px-4 py-2 bg-red-500 hover:bg-red-400 duration-200 text-white z-50 "
          >
            Wyjście
          </button>
          <QuixiesInfo light={light} />
        </div>{" "}
      </div>
    </>
  );
}

const shopProducts = [
  {
    quantity: 50,
    price: 49,
    discount: 0,
    discountSize: 0,
    image: "/assets/quixies1.png",
    name: "Small Business",
    plainName: "smallBusiness",
  },
  {
    quantity: 125,
    price: 99,
    discount: 0,
    discountSize: 0,
    image: "/assets/quixies2.png",
    name: "Medium Business",
    plainName: "mediumBusiness",
  },
  {
    quantity: 500,
    price: 199,
    discount: 0.2,
    discountSize: 120, // 10% discount on the original price of 300
    image: "/assets/quixies3.png",
    name: "Business",
    plainName: "business",
  },
  {
    quantity: 1500,
    price: 499,
    discount: 0.3,
    discountSize: 130, // 20% discount on the original price of 625
    image: "/assets/quixies4.png",
    name: "Big Business",
    plainName: "bigBusiness",
  },
];

const QuixiesInfo = ({ light }: { light: any }) => {
  return (
    <div
      className={`font-sans p-3 rounded-lg mx-auto mt-6 mb-3 bg-gradient-to-r from-primaryHoverStart/30 to-primaryHoverEnd/30 ${
        light ? "text-black" : "text-white"
      }`}
    >
      <h1 className="text-xl font-extrabold mb-2">Czym są Quixies?</h1>
      <p className="font-light font-gotham text-lg mb-4">
        Quixies to wirtualna waluta wykorzystywana na naszej platformie. Dzięki
        tym tokenom możesz w pełni korzystać z naszych usług, jednocześnie
        wspierając rozwój naszej działalności.
      </p>
      <ul className="list-none">
        <li className="mb-4 flex flex-col">
          <strong className="rounded-md text-white bg-gradient-to-b from-ctaStart to-ctaEnd py-2 px-4 w-max text-xl font-extrabold">
            Wpisowe
          </strong>{" "}
          <p className="pt-2">
            Dokonaj jednorazowej płatności by wyświetlać profil na naszych
            podstronach
          </p>
        </li>
        <li className="mb-4 flex flex-col">
          <strong className="rounded-md text-white bg-gradient-to-b from-ctaStart to-ctaEnd py-2 px-4 w-max text-xl font-extrabold">
            Portfolio usług
          </strong>{" "}
          <p className="pt-2">
            Dodaj usługi do swojego profilu oraz naszego Marketplace&trade;
          </p>
        </li>
        <li className="mb-4 flex flex-col">
          <strong className="rounded-md text-white bg-gradient-to-b from-ctaStart to-ctaEnd py-2 px-4 w-max text-xl font-extrabold">
            Ogłoszenia
          </strong>{" "}
          <p className="pt-2">
            Wystaw własne ogłoszenia rekrutacyjne, aby dotrzeć do szerokiego
            grona specjalistów z różnych branż
          </p>
        </li>
        <li className="text-white bg-gradient-to-b from-primaryStart to-primaryEnd text-center w-max px-4 py-2 rounded-md">
          <Link
            href="/contact"
            className="flex items-center gap-3"
            title="Otrzymaj pomoc"
            target="_blank"
          >
            <FaInfoCircle />
            Masz problem z doładowaniem?
          </Link>
        </li>
        {/* <li className="mb-3">
          <strong
            className="text-white bg-gradient-to-r from-primary to-cta p-1  px-2 text-xl font-coco"
            style={{ textShadow: "1px 1px 1px black" }}
          >
            Aplikowanie na oferty
          </strong>{" "}
          <br />
          <p className="font-gotham font-light mt-1 text-base py-3 pl-1">
            Dzięki Quixies możesz ubiegać się o atrakcyjne oferty pracy i
            projekty tworzone przez innych użytkowników.
          </p>
        </li> */}
      </ul>
    </div>
  );
};
