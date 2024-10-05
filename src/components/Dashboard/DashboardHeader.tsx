"use client";
import {
  FaCog,
  FaCoins,
  FaDollarSign,
  FaHome,
  FaImage,
  FaLightbulb,
  FaList,
  FaPlus,
  FaRocket,
  FaUser,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import { useState } from "react";
import QuixiesModule from "./QuixiesModule";
import { FaMagnifyingGlass } from "react-icons/fa6";
import Link from "next/link";
import { signOut } from "firebase/auth";
import { auth } from "@/firebase";
import { setUser } from "@/redux/slices/user";
import Settings from "./Settings/Settings";
import { set_modals } from "@/redux/slices/modalsopen";
export default function DashboardHeader() {
  const { user } = useSelector((state: any) => state.user);
  const [userData, setUserData] = useState<any>(user);
  const [menuShow, setMenuShow] = useState(false);
  const dispatch = useDispatch();
  const { modals } = useSelector((state: any) => state.modals);
  return (
    <>
      <Settings source={user} setSource={setUserData} data={userData} />
      <QuixiesModule userCoins={user?.tokens} />
      <div className="">
        <div
          style={{ boxShadow: "0px 0px 5px black" }}
          className="py-6 w-full mx-auto bg-white relative lg:hidden"
        >
          <div className="px-4 lg:px-6 h-full flex flex-col items-center w-full">
            <div className="flex flex-col justify-between md:flex-row items-center w-full h-full">
              <div className="flex items-center justify-between w-full">
                <button
                  style={{ boxShadow: "0px 0px 4px #000" }}
                  onClick={() => {
                    setMenuShow(!menuShow);
                  }}
                  title="Burger menu"
                  className={`${
                    menuShow && "opened"
                  } bg-orange-500 p-1 rounded-lg z-50 w-max text-sm sm:text-base drop-shadow-sm duration-100 cursor-default font-bold`}
                >
                  <svg width="30" height="30" viewBox="0 0 100 100">
                    <path
                      className="lineWhite line1"
                      d="M 20,29.000046 H 80.000231 C 80.000231,29.000046 94.498839,28.817352 94.532987,66.711331 94.543142,77.980673 90.966081,81.670246 85.259173,81.668997 79.552261,81.667751 75.000211,74.999942 75.000211,74.999942 L 25.000021,25.000058"
                    />
                    <path className="lineWhite line2" d="M 20,50 H 80" />
                    <path
                      className="lineWhite line3"
                      d="M 20,70.999954 H 80.000231 C 80.000231,70.999954 94.498839,71.182648 94.532987,33.288669 94.543142,22.019327 90.966081,18.329754 85.259173,18.331003 79.552261,18.332249 75.000211,25.000058 75.000211,25.000058 L 25.000021,74.999942"
                    />
                  </svg>
                </button>
                <div className="flex items-center">
                  <Image
                    src="/assets/quixy-logo.png"
                    width={224}
                    height={224}
                    alt="Logo serwisu quixy.pl"
                    className="w-16 h-auto"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className={`fixed left-0 top-0 h-screen w-full lg:w-[30rem] overflow-y-scroll overflow-x-hidden ${
          menuShow
            ? "translate-x-0 bg-white"
            : "-translate-x-[100vw] lg:translate-x-0 bg-white"
        } w-screen`}
        style={{
          boxShadow: "0px 0px 5px black",
        }}
      >
        <div className={`font-coco`}>
          <div className="px-6">
            <div className="mt-8 w-full flex flex-col lg:flex-row lg:justify-between lg:items-start items-end justify-end lg:mt-6">
              <button
                onClick={() =>
                  dispatch(set_modals({ ...modals, quixies: true }))
                }
              >
                <Image
                  src="/assets/quixies.png"
                  width={500}
                  height={500}
                  alt=""
                  className="w-[225px] lg:w-[350px] h-auto rounded-xl transition-all duration-[0.2s] cursor-pointer"
                />
              </button>
              <div className="w-full flex lg:flex-col-reverse lg:items-end justify-between items-start">
                <div className="text-black font-light text-base mt-6 lg:mt-0">
                  Panel Użytkownika
                </div>
                <div className="mt-6 lg:mt-0 text-black font-gotham text-3xl">
                  💎{user?.tokens?.toFixed(2)}
                </div>
              </div>
            </div>
            <h2 className="text-3xl flex w-full justify-between items-end mt-3">
              <div className="text-3xl text-orange-500 font-gotham">
                Nawigacja
              </div>
              <div className="flex items-end justify-end">
                <Image
                  src="/assets/quixy-logo.png"
                  width={224}
                  height={224}
                  alt="Logo serwisu quixy.pl"
                  className="w-24 h-auto"
                />
              </div>
            </h2>
            <Link
              href="/dashboard"
              onClick={() => setMenuShow(false)}
              className="flex items-center text-xl text-zinc-800 drop-shadow-xl mt-3"
            >
              <FaHome className="mr-2 text-orange-500" />
              Panel użytkownika
            </Link>
            <Link
              href="/dashboard/image_generator"
              onClick={() => setMenuShow(false)}
              className="flex items-center text-xl text-zinc-800 drop-shadow-xl mt-3"
            >
              <FaImage className="mr-2 text-orange-500" />
              Obrazy Quixy&trade;
            </Link>
            <Link
              href="/dashboard/idea_generator"
              onClick={() => setMenuShow(false)}
              className="flex items-center text-xl text-zinc-800 drop-shadow-xl mt-3"
            >
              <FaLightbulb className="mr-2 text-orange-500" />
              Pomysły Quixy&trade;
            </Link>
          </div>
        </div>
        <div className="font-coco px-6 mt-12">
          <h2 className="text-3xl text-orange-500 font-gotham">Praca Zdalna</h2>
          {user?.seek && (
            <div>
              <Link
                href="/dashboard/job_search"
                onClick={() => setMenuShow(false)}
                className="flex items-center text-xl text-zinc-800 drop-shadow-xl mt-3"
              >
                <FaMagnifyingGlass className="mr-2 text-orange-500" /> Szukaj
                pracy
              </Link>
              <Link
                href="/dashboard/applications"
                onClick={() => setMenuShow(false)}
                className="flex items-center text-xl text-zinc-800 drop-shadow-xl mt-3"
              >
                <FaList className="mr-2 text-orange-500" /> Moje aplikacje
              </Link>
            </div>
          )}
          {!user?.seek && (
            <>
              <Link
                href="/dashboard/add_job_offer"
                onClick={() => setMenuShow(false)}
                className="flex items-center text-xl text-zinc-800 drop-shadow-xl mt-3"
              >
                <FaPlus className="mr-2 text-orange-500" /> Dodaj ofertę pracy
              </Link>
              <Link
                href="/dashboard/my_postings"
                onClick={() => setMenuShow(false)}
                className="flex items-center text-xl text-zinc-800 drop-shadow-xl mt-3"
              >
                <FaRocket className="mr-2 text-orange-500" /> Moje oferty pracy
              </Link>
            </>
          )}
        </div>
        <div className="font-coco px-6 mt-12 w-full">
          <h2 className="text-3xl text-orange-500 font-gotham">Marketplace</h2>
          <p className="font-coco text-lg text-left max-w-[30rem] mt-3 text-gray-600">
            Kup lub sprzedaj swoją aplikację, stronę internetową lub projekt.
            Już wkrótce!
          </p>
          {!user?.seek && (
            <Link
              href="/marketplace"
              onClick={() => setMenuShow(false)}
              className="flex items-center text-xl text-zinc-800 drop-shadow-xl mt-3"
            >
              <FaDollarSign className="mr-2 text-orange-500" /> Kup projekt
            </Link>
          )}
          {user?.seek && (
            <Link
              href="/marketplace"
              onClick={() => setMenuShow(false)}
              className="flex items-center text-xl text-zinc-800 drop-shadow-xl mt-3"
            >
              <FaDollarSign className="mr-2 text-orange-500" /> Sprzedaj projekt
            </Link>
          )}
        </div>
        <div className={`pt-12 p-6 font-coco`}>
          <h2 className="text-3xl text-orange-500 font-gotham">
            <div className="">Ustawienia</div>
          </h2>

          <div
            className={`text-lg font-gotham flex text-black ${
              user?.configured && user?.seek !== "ask"
                ? "space-x-3"
                : "flex-col"
            }`}
          >
            <div className="">Typ konta:</div>{" "}
            {user?.configured && (
              <div className="font-light">
                {user?.seek === true && "Talent"}
                {user?.seek === "ask" && "Klient"}
                {!user?.seek && "Klient"}
              </div>
            )}
            {!user?.configured && (
              <div className="font-light">
                Nie skonfigurowano jeszcze typu konta
              </div>
            )}
          </div>
          {/* SETTINGS CTA */}
          <button
            onClick={() => dispatch(set_modals({ ...modals, quixies: true }))}
            className="flex items-center text-black font-coco mt-4 text-lg"
          >
            <FaCoins className="mr-2 text-orange-500 text-2xl" />
            Doładuj Quixies
          </button>
          <button
            onClick={() => dispatch(set_modals({ ...modals, config: true }))}
            className="flex items-center text-black font-coco mt-1 text-lg"
          >
            <FaCog className="mr-2 text-orange-500 text-2xl" />
            Ustawienia konta
          </button>
          <button
            className="mt-2 text-zinc-800 drop-shadow-xl"
            onClick={() => {
              signOut(auth);
              dispatch(setUser(null));
            }}
          >
            Wyloguj
          </button>
        </div>
      </div>
    </>
  );
}
