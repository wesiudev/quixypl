"use client";
import {
  FaCog,
  FaCogs,
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
import { useEffect, useState } from "react";
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
  const [showHeader, setShowHeader] = useState(true);

  useEffect(() => {
    let previousScrollPosition = window.scrollY;

    const scrollListener = () => {
      const currentScrollPosition = window.scrollY;
      const isScrolledDown = previousScrollPosition < currentScrollPosition;
      previousScrollPosition = currentScrollPosition;

      setShowHeader(
        isScrolledDown && currentScrollPosition > 100 ? false : true
      );
    };

    window.addEventListener("scroll", scrollListener);

    return () => window.removeEventListener("scroll", scrollListener);
  }, []);
  return (
    <div>
      <Settings source={user} setSource={setUserData} data={userData} />
      <QuixiesModule userCoins={user?.tokens} />
      <div className="">
        <div
          className={`${
            (modals.quixies || modals.config || modals.currentChat !== "") &&
            "hidden"
          } py-2 w-full mx-auto bg-white relative z-[9999999999999999999] lg:hidden ${
            showHeader ? "translate-y-0" : "-translate-y-24"
          } duration-100`}
        >
          <div className="px-6 h-full flex flex-col items-center w-full">
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
                  } bg-gradient-to-r from-primary to-cta p-1 rounded-lg z-50 w-max text-sm sm:text-base drop-shadow-sm duration-100 cursor-default font-bold`}
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
                    className="w-12 h-auto"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className={`${
          modals.currentChat !== "" && "hidden"
        } fixed left-0 top-0 h-screen w-full lg:w-[30rem] overflow-y-scroll overflow-x-hidden ${
          menuShow
            ? "translate-x-0 bg-white"
            : "-translate-x-[100vw] lg:translate-x-0 bg-white"
        } w-screen`}
        style={{
          boxShadow: "0px 0px 5px black",
        }}
      >
        <div className={`font-coco w-full mt-24 lg:mt-0`}>
          <div className="px-6 w-full">
            <div className="mt-8 w-full flex flex-row justify-between items-start">
              <button
                onClick={() =>
                  dispatch(set_modals({ ...modals, quixies: true }))
                }
                className="pr-6"
              >
                <Image
                  src="/assets/quixies.png"
                  width={500}
                  height={500}
                  alt=""
                  className="w-full h-auto rounded-lg transition-all duration-[0.2s] cursor-pointer"
                />
              </button>
              <h2 className="text-3xl flex w-full justify-end items-end">
                <div className="flex flex-col items-end">
                  <div className="text-black font-light text-sm sm:text-base text-right w-max">
                    Panel Użytkownika
                  </div>
                  <div className="mt-3 lg:mt-0 text-black font-gotham text-2xl sm:text-3xl">
                    💎{user?.tokens?.toFixed(2)}
                  </div>
                </div>
              </h2>
            </div>
            <div className="text-3xl text-black font-gotham mt-6">
              Nawigacja
            </div>
            <Link
              href="/dashboard"
              onClick={() => setMenuShow(false)}
              className="flex items-center text-xl text-black drop-shadow-xl mt-3"
            >
              <FaHome className="mr-2 text-primary" />
              Panel użytkownika
            </Link>
            <Link
              href="/dashboard/image_generator"
              onClick={() => setMenuShow(false)}
              className="flex items-center text-xl text-black drop-shadow-xl mt-3"
            >
              <FaImage className="mr-2 text-primary" />
              Obrazy Quixy&trade;
            </Link>
            <Link
              href="/dashboard/idea_generator"
              onClick={() => setMenuShow(false)}
              className="flex items-center text-xl text-black drop-shadow-xl mt-3"
            >
              <FaLightbulb className="mr-2 text-primary" />
              Pomysły Quixy&trade;
            </Link>
          </div>
        </div>
        <div className="font-coco px-6 mt-12">
          <h2 className="text-3xl text-black font-gotham">Praca Zdalna</h2>
          {user?.seek && (
            <div>
              <Link
                href="/dashboard/job_search"
                onClick={() => setMenuShow(false)}
                className="flex items-center text-xl text-black drop-shadow-xl mt-3"
              >
                <FaMagnifyingGlass className="mr-2 text-primary" /> Szukaj pracy
              </Link>
              <Link
                href="/dashboard/applications"
                onClick={() => setMenuShow(false)}
                className="flex items-center text-xl text-black drop-shadow-xl mt-3"
              >
                <FaList className="mr-2 text-primary" /> Moje aplikacje
              </Link>
            </div>
          )}
          {!user?.seek && (
            <>
              <Link
                href="/dashboard/add_job_offer"
                onClick={() => setMenuShow(false)}
                className="flex items-center text-xl text-black drop-shadow-xl mt-3"
              >
                <FaPlus className="mr-2 text-primary" /> Dodaj ofertę pracy
              </Link>
              <Link
                href="/dashboard/my_postings"
                onClick={() => setMenuShow(false)}
                className="flex items-center text-xl text-black drop-shadow-xl mt-3"
              >
                <FaRocket className="mr-2 text-primary" /> Moje oferty pracy
              </Link>
            </>
          )}
        </div>
        <div className="font-coco px-6 mt-12 w-full">
          <h2 className="text-3xl text-black font-gotham">Marketplace</h2>
          <p className="font-coco text-lg text-left max-w-[30rem] mt-3 text-gray-600">
            Kup lub sprzedaj swoją aplikację, stronę internetową lub projekt.
            Już wkrótce!
          </p>
          {!user?.seek && (
            <Link
              href="/marketplace"
              onClick={() => setMenuShow(false)}
              className="flex items-center text-xl text-black drop-shadow-xl mt-3"
            >
              <FaDollarSign className="mr-2 text-primary" /> Kup projekt
            </Link>
          )}
          {user?.seek && (
            <Link
              href="/marketplace"
              onClick={() => setMenuShow(false)}
              className="flex items-center text-xl text-black drop-shadow-xl mt-3"
            >
              <FaDollarSign className="mr-2 text-primary" /> Sprzedaj projekt
            </Link>
          )}
        </div>
        <div className={`pt-12 p-6 font-coco`}>
          <h2 className="text-3xl text-black font-gotham">
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
                {user?.seek === "ask" && "Zainteresowany AI"}
                {!user?.seek && user?.seek !== "ask" && "Klient"}
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
            <FaCoins className="mr-2 text-primary text-2xl" />
            Doładuj Quixies
          </button>
          <button
            onClick={() => dispatch(set_modals({ ...modals, config: true }))}
            className="flex items-center text-black font-coco mt-1 text-lg"
          >
            {user?.seek && user?.seek !== "ask" && (
              <>
                <FaCog className="text-2xl mr-2 text-primary" />
                Moje konto
              </>
            )}
            {!user?.seek && user?.seek !== "ask" && (
              <>
                <FaUser className="text-2xl mr-2 text-primary" />
                Panel Klienta
              </>
            )}
            {user?.seek === "ask" && (
              <>
                <FaCogs className="text-2xl mr-2 text-primary" />
                Skonfiguruj konto
              </>
            )}
          </button>
          <button
            className="mt-2 text-black drop-shadow-xl"
            onClick={() => {
              signOut(auth);
              dispatch(setUser(null));
            }}
          >
            Wyloguj
          </button>
        </div>
      </div>
    </div>
  );
}
