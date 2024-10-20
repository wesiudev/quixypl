"use client";
import StripeButton from "@/components/StripeButton";
import { set_modals } from "@/redux/slices/modalsopen";
import Image from "next/image";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
export default function QuixiesModule({ userCoins }: { userCoins: number }) {
  const dispatch = useDispatch();
  const { modals } = useSelector((state: any) => state.modals);
  return (
    <>
      <button
        onClick={() => dispatch(set_modals({ ...modals, quixies: false }))}
        className={`disabled:cursor-not-allowed fixed left-0 top-0 w-full h-full ${
          modals.quixies
            ? "z-[99999] bg-opacity-80 translate-y-0"
            : "z-[-99999] bg-opacity-0 translate-x-[100vw]"
        }  bg-black hover:bg-opacity-60`}
      />
      <div
        className={`sm:rounded-xl w-screen sm:w-[90%] lg:max-w-[50rem] xl:max-w-[60rem] h-screen sm:h-[80vh] fixed overflow-y-scroll scrollbar  ${
          modals.quixies
            ? "z-[9999999999] opacity-100 left-0 top-0 sm:left-1/2 sm:-translate-x-1/2 sm:top-1/2 sm:-translate-y-1/2"
            : "z-[-1000] opacity-0 -translate-y-[150vh]"
        }`}
      >
        <div
          onClick={(e: any) => e.stopPropagation()}
          className="flex flex-wrap w-full my-auto mx-auto bg-white sm:rounded-xl p-3 lg:p-6 relative"
        >
          <div className="flex flex-row sm:justify-between w-full font-gotham text-3xl">
            <div className="flex flex-col">
              <h2 className="text-zinc-800">Doładuj Quixies</h2>
              <p className="text-sm font-normal text-gray-700">
                Wybierz odpowiedni pakiet Quixies dla swoich potrzeb
              </p>
            </div>

            <div className="h-max text-zinc-800 font-gotham w-max flex flex-row items-center">
              💎
              <div>{userCoins?.toFixed(2)}</div>
            </div>
          </div>
          {/* <Image
            style={{ boxShadow: "0 0 16px 0 cyan" }}
            src="/assets/quixies5.png"
            width={1024}
            height={1024}
            alt="Quixies"
            className="w-full h-auto rounded-xl mb-6"
          /> */}
          <div className="rounded-xl grid grid-cols-2 sm:grid-cols-3 gap-3 w-full mt-3 sm:mt-6">
            {shopProducts?.map((item: any, i: any) => (
              <div
                key={i}
                className={`${
                  i === 2 || i === 3
                    ? "bg-gradient-to-r from-primary/75 to-cta/75 hover:from-primary/85 hover:to-cta/85"
                    : "bg-primary/75 hover:bg-primary/90"
                } group relative w-full h-full flex justify-between items-center flex-col transition rounded-lg shadow-sm shadow-zinc-800`}
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
                    style={{ textShadow: "1px 1px 1px black" }}
                    className={`font-coco font-bold text-center text-white bg-primary rounded-tl-lg rounded-br-lg px-1.5 lg:px-3 py-1 lg:py-2 absolute top-0 left-0 text-sm sm:text-lg shadow-sm shadow-zinc-800`}
                  >
                    {item.price}
                    ,99 PLN
                  </p>
                </div>
                <div className="absolute bottom-0 left-0 w-full flex flex-col items-center mt-4">
                  <h2
                    style={{ textShadow: "1px 1px 1px black" }}
                    className="text-white font-semibold font-gotham text-sm sm:text-lg"
                  >
                    {item.name}
                  </h2>
                  {i === 2 && (
                    <div
                      style={{
                        boxShadow: "0px 0px 5px black",
                        textShadow: "1px 1px 1px black",
                      }}
                      className="sticky bottom-0 top-0 left-0 bg-yellow-500 text-white font-bold px-2 py-1 rounded-3xl text-sm lg:text-base"
                    >
                      Najczęściej wybierany
                    </div>
                  )}

                  <StripeButton item={item} />
                </div>
                {item.discount > 0 && (
                  <div
                    style={{ textShadow: "1px 1px 1px black" }}
                    className="shadow-sm shadow-zinc-800 w-max absolute top-0 right-0 bg-yellow-500 text-white text-sm sm:text-lg font-coco font-bold px-1.5 lg:px-3 py-1 lg:py-2 rounded-tr-lg rounded-bl-lg"
                  >
                    {item.discountSize}%
                  </div>
                )}
              </div>
            ))}
          </div>
          <button
            onClick={() => dispatch(set_modals({ ...modals, quixies: false }))}
            className="sm:hidden font-coco mt-12 sticky left-0 bottom-0 w-full px-3 py-1.5 bg-red-500 hover:bg-red-400 duration-200 text-white z-50 rounded-lg"
          >
            Zamknij okno
          </button>
          <QuixiesInfo />
        </div>{" "}
      </div>
    </>
  );
}

const shopProducts = [
  {
    quantity: 25,
    price: 9,
    discount: 0,
    discountSize: 0,
    image: "/assets/quixies1.png",
    name: "Small Business",
    plainName: "smallBusiness",
  },
  {
    quantity: 100,
    price: 24,
    discount: 0,
    discountSize: 0,
    image: "/assets/quixies2.png",
    name: "Medium Business",
    plainName: "mediumBusiness",
  },
  {
    quantity: 300,
    price: 54, // Adjusted price
    discount: 0.1,
    discountSize: 110,
    image: "/assets/quixies3.png",
    name: "Business",
    plainName: "business",
  },
  {
    quantity: 750,
    price: 99,
    discount: 0.2,
    discountSize: 120,
    image: "/assets/quixies4.png",
    name: "Big Business",
    plainName: "bigBusiness",
  },
];
const QuixiesInfo = () => {
  return (
    <div className="mx-auto bg-white mt-6">
      <h1 className="text-3xl font-gotham text-zinc-800 mb-4">
        Czym są Quixies?
      </h1>
      <p className="text-black font-light font-gotham text-lg mb-6">
        Quixies to wirtualna waluta wykorzystywana na naszej platformie,
        umożliwiająca dostęp do różnorodnych funkcji i usług. Dzięki Quixies
        możesz w pełni korzystać z zaawansowanych narzędzi oraz funkcji
        wspierających rozwój Twojej kariery lub biznesu.
      </p>

      <h2 className="text-2xl font-gotham text-zinc-800 mb-4">
        Co możesz zrobić za Quixies?
      </h2>
      <ul className="list-none text-black text-lg mb-6">
        <li className="mb-3">
          <strong
            className="text-white bg-gradient-to-r from-primary to-cta p-1 rounded-md px-2 text-xl font-coco"
            style={{ textShadow: "1px 1px 1px black" }}
          >
            Usługi AI
          </strong>{" "}
          <br />
          <p className="font-gotham font-light mt-1 text-base py-3 pl-1">
            Wykorzystaj Quixies, aby uzyskać dostęp do usług sztucznej
            inteligencji, które pomogą Ci w optymalizacji procesów, tworzeniu
            treści oraz automatyzacji zadań.
          </p>
        </li>
        <li className="mb-3">
          <strong
            className="text-white bg-gradient-to-r from-primary to-cta p-1 rounded-md px-2 text-xl font-coco"
            style={{ textShadow: "1px 1px 1px black" }}
          >
            Dodawanie ofert pracy
          </strong>{" "}
          <br />
          <p className="font-gotham font-light mt-1 text-base py-3 pl-1">
            Wystaw własne ogłoszenia rekrutacyjne, aby dotrzeć do szerokiego
            grona specjalistów z różnych branż. To idealna okazja, by szybko
            znaleźć odpowiednich kandydatów na wolne stanowiska.
          </p>
        </li>
        <li className="mb-3">
          <strong
            className="text-white bg-gradient-to-r from-primary to-cta p-1 rounded-md px-2 text-xl font-coco"
            style={{ textShadow: "1px 1px 1px black" }}
          >
            Aplikowanie na oferty
          </strong>{" "}
          <br />
          <p className="font-gotham font-light mt-1 text-base py-3 pl-1">
            Dzięki Quixies możesz ubiegać się o atrakcyjne oferty pracy i
            projekty tworzone przez innych użytkowników.
          </p>
        </li>
      </ul>

      {/* <h2 className="text-2xl font-gotham text-black mb-4">
        Jak zdobyć Quixies?
      </h2>
      <ul className="list-none text-black text-lg">
        <li className="mb-3">
          <strong
            className="text-white bg-gradient-to-r from-primary to-cta p-1 rounded-md px-2 text-xl font-coco"
            style={{ textShadow: "1px 1px 1px black" }}
          >
            Aktywne korzystanie z platformy
          </strong>{" "}
          <br />
          <p className="font-gotham font-light mt-1 text-base">
            -Użytkownicy otrzymują Quixies za regularne wykonywanie określonych
            zadań i interakcje w obrębie platformy.
          </p>
        </li>
        <li className="mb-3">
          <strong
            className="text-white bg-gradient-to-r from-primary to-cta p-1 rounded-md px-2 text-xl font-coco"
            style={{ textShadow: "1px 1px 1px black" }}
          >
            Zakup
          </strong>{" "}
          <br />
          <p className="font-gotham font-light mt-1 text-base">
            -Quixies możesz również szybko i wygodnie kupić w naszym sklepie,
            wybierając odpowiedni pakiet zgodny z Twoimi potrzebami.
          </p>
        </li>
      </ul> */}

      <div className="mt-3 mb-6 text-cta text-center font-gotham underline hover:no-underline">
        <Link href="/contact" title="Otrzymaj pomoc" target="_blank">
          Masz problem z doładowaniem?
        </Link>
      </div>
    </div>
  );
};
