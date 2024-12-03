"use client";
import { set_modals } from "@/redux/slices/modalsopen";
import Image from "next/image";
import { FaCoins, FaUser } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";

export default function DashboardUnderMenu() {
  const dispatch = useDispatch();
  const { modals } = useSelector((state: any) => state.modals);
  const { user } = useSelector((state: any) => state.user);
  return (
    <div>
      <div className="flex flex-col group">
        <div className="flex items-start justify-between bg-white px-4 lg:px-6 pt-4 lg:pt-6 h-max relative w-full">
          <div className="flex">
            <div className="flex flex-col">
              <button
                onClick={() =>
                  dispatch(set_modals({ ...modals, config: true }))
                }
                className=""
              >
                {user?.photoURL && (
                  <div className="rounded-full w-24 aspect-square overflow-hidden relative">
                    <Image
                      style={{ boxShadow: "inset 0px 0px 8px black" }}
                      src={user?.photoURL}
                      width={256}
                      height={256}
                      alt=""
                      className="shadow-sm shadow-black rounded-full bg-white absolute inset-0 object-cover w-full h-full"
                    />
                  </div>
                )}
                {!user?.photoURL && (
                  <div
                    style={{ boxShadow: "inset 0px 0px 8px black" }}
                    className="rounded-full bg-gradient-to-r from-primary to-cta w-24 aspect-square text-white flex items-center justify-center"
                  >
                    <FaUser className="text-3xl lg:text-5xl" />
                  </div>
                )}
              </button>
              <button
                onClick={() =>
                  dispatch(set_modals({ ...modals, quixies: true }))
                }
                className="flex items-center mt-3"
              >
                <div className="gap-2 flex items-center justify-center px-2 py-1.5 h-8 bg-gradient-to-r from-primary to-cta rounded-lg">
                  <FaCoins className="text-lg text-white" />
                  <div className="font-extrabold text-white font-coco">
                    {user?.tokens?.toFixed(2)}
                  </div>
                </div>
              </button>
            </div>
            {!user?.configured && (user?.seek === "ask" || !user?.seek) && (
              <div className="pl-4 pt-4">
                <h2 className="text-white bg-gradient-to-r from-zinc-800 via-gray-700 to-zinc-950 w-max rounded-xl px-2 font-extrabold">
                  Nie skonfigurowano profilu
                </h2>
                <p className="text-black max-w-lg font-coco my-1 text-sm">
                  Określ typ profilu w zakładce{" "}
                  <b className="italic">MÓJ PROFIL</b>, by rozpocząć swoją
                  przygodę w Quixy
                </p>
              </div>
            )}
            {user?.configured && user?.seek !== "ask" && (
              <div className="flex flex-col h-max px-3">
                {!user?.name && (
                  <h2 className="text-sm text-black drop-shadow-lg font-bold font-coco italic">
                    {user?.seek && "Imię (lub imię i nazwisko)"}
                    {(!user?.seek || user?.seek === "ask") &&
                      "Nazwa firmy/dane rekrutera"}
                  </h2>
                )}
                <h3
                  className={`text-lg sm:text-xl font-extrabold ${
                    user?.name ? "text-black" : "text-primary"
                  }`}
                >
                  {user?.name ? user?.name : "Nie podano"}
                </h3>
                <h3 className="text-black">{user?.title && user?.title}</h3>
                <h3 className="text-black text-sm">
                  {user?.pseudo && user?.pseudo}
                </h3>
              </div>
            )}{" "}
          </div>
        </div>
      </div>
    </div>
  );
}
