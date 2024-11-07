"use client";
import { FaCog, FaCogs, FaUser } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import { useEffect, useState } from "react";
import QuixiesModule from "./QuixiesModule";
import Link from "next/link";
import { signOut } from "firebase/auth";
import { auth } from "@/firebase";
import { setUser } from "@/redux/slices/user";
import Settings from "./Settings/Settings";
import { set_modals } from "@/redux/slices/modalsopen";
import UserPanel from "../UserPanel";
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
            (modals.quixies || modals.currentChat !== "") && "hidden"
          } py-2 w-full mx-auto bg-gradient-to-r shadow-sm bg-slate-800 shadow-black relative z-[99999999999999999999999999999999999] lg:hidden ${
            showHeader || menuShow ? "translate-y-0" : "-translate-y-24"
          } duration-100`}
        >
          <div className="px-6 h-full flex items-center w-full justify-between">
            <div className="flex justify-between md:flex-row items-center h-full">
              <div className="flex items-center w-full mr-2">
                <button
                  style={{ boxShadow: "0px 0px 4px #000" }}
                  onClick={() => {
                    setMenuShow(!menuShow);
                  }}
                  title="Burger menu"
                  className={`${
                    menuShow && "opened"
                  } rounded-lg bg-gradient-to-r from-primary to-cta p-1  z-50 w-max text-sm sm:text-base drop-shadow-sm duration-100 cursor-default font-bold`}
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
              </div>
            </div>
            <button
              onClick={() => dispatch(set_modals({ ...modals, config: true }))}
              className="shadow-sm shadow-zinc-700 p-2 relative w-max bg-gradient-to-br from-primary to-cta text-white hover:from-cta hover:to-cta rounded-lg"
            >
              <div className="flex items-center justify-center relative">
                <div className="text-white opacity-50 mr-2">
                  <FaCog className="text-2xl" />
                </div>
                <div className="mt-px z-50 relative text-center font-bold">
                  MÓJ PROFIL
                </div>
              </div>
            </button>
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
      >
        <div className={`font-coco w-full mt-24 lg:mt-0 relative`}>
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
          </div>
        </div>
        <div className="flex flex-col px-6 group mt-3">
          <div className="flex items-start bg-white h-max relative w-full">
            <button
              onClick={() => dispatch(set_modals({ ...modals, config: true }))}
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
            {!user?.configured && (user?.seek === "ask" || !user?.seek) && (
              <div className="pl-4 pt-4">
                <h2 className="text-white bg-gradient-to-r from-primary to-cta w-max rounded-xl px-2 font-gotham font-bold">
                  Nie skonfigurowano profilu
                </h2>
                <p className="text-black font-light max-w-lg font-coco my-1 text-sm">
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
                  className={`text-lg sm:text-xl font-coco font-bold ${
                    user?.name ? "text-black" : "text-primary"
                  }`}
                >
                  {user?.name ? user?.name : "Nie podano"}
                </h3>
                <h3 className="text-black text-sm sm:text-lg font-coco font-bold">
                  {user?.title && user?.title}
                </h3>
                <h3 className="text-black text-sm sm:text-lg font-light font-coco">
                  {user?.pseudo && user?.pseudo}
                </h3>
              </div>
            )}{" "}
          </div>
        </div>
        <UserPanel />
        <div className={`pt-12 p-6 font-coco flex items-center`}>
          <button
            className="mt-2 text-black drop-shadow-xl"
            onClick={() => {
              signOut(auth);
              dispatch(setUser(null));
            }}
          >
            Wyloguj
          </button>
          <Link
            href="/terms-of-use"
            target="_blank"
            className="mt-2 text-black drop-shadow-xl ml-2"
          >
            Regulamin
          </Link>
        </div>
      </div>
    </div>
  );
}
