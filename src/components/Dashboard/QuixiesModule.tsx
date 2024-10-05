"use client";
import StripeButton from "@/components/StripeButton";
import { set_modals } from "@/redux/slices/modalsopen";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
export default function QuixiesModule({ userCoins }: { userCoins: number }) {
  const dispatch = useDispatch();
  const { modals } = useSelector((state: any) => state.modals);
  return (
    <>
      <button
        onClick={() => dispatch(set_modals({ ...modals, quixies: false }))}
        className={`disabled:cursor-not-allowed fixed z-[99999] left-0 top-0 w-full h-full ${
          modals.quixies
            ? "bg-opacity-80 lg:duration-500 translate-y-0"
            : "lg:duration-1000 bg-opacity-0 translate-x-[100vw]"
        }  bg-black hover:bg-opacity-60`}
      />
      <div
        className={`w-full lg:max-w-[50rem] xl:max-w-[60rem] lg:h-[80vh] h-full fixed overflow-y-scroll scrollbarChat left-1/2 -translate-x-1/2 top-0 ${
          modals.quixies
            ? "z-[99999999999999999] opacity-100 lg:duration-500 -translate-y-1/2 top-1/2"
            : "z-[-1000] opacity-0 lg:duration-500 -translate-y-[150vh] top-0"
        }`}
      >
        <div
          onClick={(e: any) => e.stopPropagation()}
          className="flex flex-wrap w-full my-auto mx-auto bg-orange-500 p-4 lg:p-12 relative"
        >
          <div className="flex flex-row items-center w-full justify-between mb-4 font-gotham text-3xl">
            <p className="text-white font-semibold">Sklep</p>
            <p className="text-white font-bold">💎{userCoins?.toFixed(2)}</p>
          </div>
          {/* <Image
            style={{ boxShadow: "0 0 16px 0 cyan" }}
            src="/assets/quixies5.png"
            width={1024}
            height={1024}
            alt="Quixies"
            className="w-full h-auto rounded-xl mb-6"
          /> */}
          <div className="p-12 rounded-xl bg-white grid sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
            {shopProducts?.map((item: any, i: any) => (
              <div
                key={i}
                className="group relative w-full h-full flex justify-between items-center flex-col bg-zinc-700 hover:bg-slate-700 transition lg:duration-300 rounded-xl"
              >
                <div className="relative w-full h-auto">
                  <Image
                    src={item.image}
                    width={1024}
                    height={1024}
                    alt={item.name}
                    className="rounded-t-xl w-full"
                  />
                  <p
                    className={`font-bold text-center text-white bg-green-500 rounded-tl-xl px-3 py-1 absolute top-0 left-0 text-sm shadow-md`}
                  >
                    {item.price}
                    ,99 PLN
                  </p>
                </div>
                <div className="w-full flex flex-col items-center mt-4">
                  <h2 className="text-white font-semibold text-lg">
                    {item.name}
                  </h2>
                  {i === 2 && (
                    <div className="sticky bottom-0 top-0 left-0 bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded-3xl">
                      Najczęściej wybierany
                    </div>
                  )}
                  {item.discount > 0 && (
                    <div className="italic w-max absolute top-0 right-0 bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded-tr-xl">
                      {item.discountSize}%
                    </div>
                  )}
                  <StripeButton item={item} />
                </div>
              </div>
            ))}
          </div>
          <button
            onClick={() => dispatch(set_modals({ ...modals, quixies: false }))}
            className="mt-12 sticky left-1/2 -translate-x-1/2 bottom-3 w-max px-3 py-1.5 bg-slate-700 text-white z-50 rounded-lg"
          >
            Zamknij okno
          </button>
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
