// components/dashboard/chat/ChatList.tsx
import React, { useEffect, useState } from "react";
import { collection, getFirestore, onSnapshot } from "firebase/firestore";
import { app } from "@/firebase";
import ChatListElement from "./ChatListElement";
import Image from "next/image";
import { useSelector } from "react-redux";
import { FaChevronRight } from "react-icons/fa6";
interface ChatListProps {
  source: any;
  chatListOpen: any;
  setChatListOpen: any;
}

export default function ChatList({
  source,
  chatListOpen,
  setChatListOpen,
}: ChatListProps) {
  const { modals } = useSelector((state: any) => state.modals);
  return (
    <div
      className={`z-[100001] ${
        chatListOpen
          ? "-translate-x-0"
          : "-translate-x-[100%] lg:-translate-x-0 duration-500"
      } w-screen ${
        chatListOpen ? "lg:w-screen duration-500" : "lg:w-[50vw] duration-500"
      }  fixed h-screen top-0 left-0 bg-white overflow-y-scroll scrollbarChat ${
        modals.currentChat === "" && "hidden"
      }`}
    >
      <div className="bg-[#fff] h-24 w-full flex items-center justify-center sticky top-0 left-0 z-[100002]">
        <Image
          src="/assets/quixy-logo.png"
          width={224}
          height={224}
          alt=""
          className="h-[80%] w-auto"
        />
      </div>
      <div className={`grid grid-cols-1 w-full relative`}>
        <button
          onClick={() => {
            setChatListOpen(!chatListOpen);
          }}
          className="p-3 bg-gradient-to-r from-primary to-cta text-white text-lg absolute right-0 top-0 flex items-center justify-center z-[10000000000]"
        >
          <FaChevronRight />
        </button>
        <h2 className="font-gotham text-3xl lg:text-5xl text-white bg-gradient-to-r from-primary to-cta mb-12 text-center w-max mx-auto  p-2">
          Czatuj
        </h2>

        {source?.relatedUsers?.length === 0 && (
          <div className="text-center max-w-[90%] sm:max-w-lg text-sm font-light mt-2 bg-gradient-to-r from-primary to-cta text-white font-gotham">
            Jeszcze z nikim nie pisałeś/aś, przeglądaj firmy lub współpracuj z
            talentami.
          </div>
        )}
        {source?.relatedUsers?.map((user: any, i: any) => (
          <>
            {user?.pseudo &&
              source.relatedUsers.includes(user?.pseudo)(
                <ChatListElement key={i} value={user} source={source} />
              )}
          </>
        ))}
      </div>
    </div>
  );
}
