"use client";
import { FaUser, FaUserNinja } from "react-icons/fa";
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
import { useAuthState } from "react-firebase-hooks/auth";
export default function DashboardHeader() {
  const [user, loading] = useAuthState(auth);
  const [userData, setUserData] = useState<any>();
  const [menuShow, setMenuShow] = useState(false);
  const dispatch = useDispatch();
  const { modals } = useSelector((state: any) => state.modals);
  const [showHeader, setShowHeader] = useState(true);
  useEffect(() => {
    if (user) {
    }
  }, [user, loading]);
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
      <QuixiesModule userCoins={userData?.tokens} />
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
                  <FaUserNinja className="text-2xl" />
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
                    💎{userData?.tokens?.toFixed(2)}
                  </div>
                </div>
              </h2>
            </div>
          </div>
        </div>

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
