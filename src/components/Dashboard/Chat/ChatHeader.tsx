// components/dashboard/chat/ChatHeader.tsx
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaCog, FaList, FaTrophy } from "react-icons/fa";
import { FaArrowLeftLong } from "react-icons/fa6";

interface ChatHeaderProps {
  closeChat: any;
  chattingWith: string;
  clickedUserData: any;
  source: any;
}
export default function ChatHeader({
  closeChat,
  chattingWith,
  clickedUserData,
  source,
}: ChatHeaderProps) {
  return (
    <>
      <div className="bg-[#A6152D] flex items-center justify-between h-24 px-6 2xl:px-10 sticky left-0 top-0 lg:border-r-[4px] lg:border-[#3f3f3f]">
        <div className="flex items-center text-white font-bold text-2xl">
          <button onClick={closeChat} className="scale-x-110 mr-2">
            <FaArrowLeftLong />
          </button>
        </div>
        <div
          className={`${
            !source?.chat
              ? "flex-col-reverse sm:flex-row-reverse sm:justify-between sm:w-full sm:pr-12 items-start"
              : "items-center"
          } flex px-6`}
        >
          {!source?.chat && (
            <div className="flex flex-col text-left sm:px-7 lg:px-12">
              <div className="text-gray-200 text-sm sm:text-lg font-bold mt-2">
                Dostępne wiadomości: {source?.messages ? source?.messages : 0}
              </div>
              <div className="lg:max-w-[40rem] text-justify text-xs sm:text-base flex flex-row flex-wrap text-gray-300">
                Jeśli chcesz odblokować nielimitowane wiadomości i wszystie inne
                funkcje{" "}
                <Link
                  href="/premium"
                  title="kup premium"
                  className=" text-[green] font-bold"
                >
                  Kup premium
                </Link>
              </div>
            </div>
          )}
          <div className="flex items-center h-max my-auto">
            <div
              style={{ boxShadow: "0px 0px 5px #000000" }}
              className="rounded-full w-10 h-10 lg:w-14 lg:h-14 relative overflow-hidden mr-3"
            >
              {clickedUserData?.photoURL && (
                <Image
                  src={clickedUserData?.photoURL}
                  width={124}
                  height={124}
                  style={{ boxShadow: "0px 0px 5px #000000" }}
                  alt={`Zdjęcie główne użytkownika ${
                    clickedUserData?.name || clickedUserData?.login
                  }`}
                  className="absolute inset-0 object-cover w-full h-full"
                />
              )}
              {!clickedUserData?.photoURL && (
                <>
                  <div className="flex items-center justify-center text-2xl p-3 w-full h-full text-white rounded-full bg-[#A6152D] mr-4">
                    {clickedUserData?.login[0].toUpperCase()}{" "}
                  </div>
                </>
              )}
            </div>
            <div className="text-white font-light flex items-center">
              {clickedUserData?.login}
              <div
                className={`w-4 h-4 rounded-full ml-2 ${
                  clickedUserData?.status === "online"
                    ? "bg-[green]"
                    : "bg-[gray]"
                }`}
              ></div>
            </div>
          </div>
        </div>
      </div>
      <div className="font-bold flex items-center bg-white text-black p-6">
        {clickedUserData?.photoURL && (
          <div className="rounded-full w-16 h-16 relative overflow-hidden mr-3">
            <Image
              src={clickedUserData?.photoURL}
              width={124}
              height={124}
              style={{ boxShadow: "0px 0px 5px #000000" }}
              alt={`Zdjęcie główne użytkownika ${
                clickedUserData?.name || clickedUserData?.login
              }`}
              className="absolute inset-0 object-cover w-full h-full"
            />
          </div>
        )}
        {!clickedUserData?.photoURL && (
          <div
            style={{ boxShadow: "0px 0px 5px #000000" }}
            className="flex items-center justify-center text-2xl p-3 w-16 h-16 text-white rounded-full bg-[#A6152D] mr-4"
          >
            {clickedUserData?.login[0].toUpperCase()}
          </div>
        )}
        Czatujesz z
        <div className="flex items-center ml-1 text-center">
          {clickedUserData?.name || clickedUserData?.login}{" "}
          {clickedUserData?.premium && (
            <div title="VIP" className="text-yellow-500 text-xl ml-3">
              <FaTrophy />
            </div>
          )}
          {clickedUserData?.premium && (
            <div title="PREMIUM" className="text-[#A6152D] text-xl ml-3">
              <FaTrophy />
            </div>
          )}
        </div>
      </div>
    </>
  );
}
