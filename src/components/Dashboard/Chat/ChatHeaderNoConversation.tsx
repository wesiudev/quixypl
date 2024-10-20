// components/dashboard/chat/ChatHeader.tsx
import { set_modals } from "@/redux/slices/modalsopen";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaTrophy } from "react-icons/fa";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";

interface ChatHeaderNoConverastionProps {
  source: any;
}

export default function ChatHeaderNoConversation({
  source,
}: ChatHeaderNoConverastionProps) {
  const dispatch = useDispatch();
  const { modals } = useSelector((state: any) => state.modals);

  return (
    <>
      <div className="z-[100100] bg-[#fff] flex items-center justify-between px-6 2xl:px-10 h-24 fixed w-full lg:w-[50vw] right-0 top-0 lg:border-r-[4px] lg:border-[#3f3f3f]">
        <div className="flex items-center text-black font-bold text-2xl">
          <button
            onClick={() => {
              dispatch(set_modals({ ...modals, currentChat: "" }));
            }}
            className="scale-x-110 mr-2"
          >
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
          <div className="flex items-center h-max my-auto">
            <div
              style={{ boxShadow: "0px 0px 5px #000000" }}
              className="rounded-full w-10 h-10 lg:w-14 lg:h-14 relative overflow-hidden mr-3"
            >
              {source?.photoURL && (
                <Image
                  src={source?.photoURL}
                  width={124}
                  height={124}
                  style={{ boxShadow: "0px 0px 5px #000000" }}
                  alt={`Zdjęcie główne użytkownika ${
                    source?.name || source?.pseudo
                  }`}
                  className="absolute inset-0 object-cover w-full h-full"
                />
              )}
              {!source?.photoURL && (
                <>
                  <div className="flex items-center justify-center text-2xl p-3 w-full h-full text-white rounded-full bg-[#fff] mr-4">
                    {source?.pseudo[0].toUpperCase()}{" "}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
