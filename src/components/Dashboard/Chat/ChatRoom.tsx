"use client";
import React, { useEffect } from "react";
import ChatMessage from "./ChatMessage";
import MessageInput from "./MessageInput";
import Image from "next/image";
interface ChatRoomProps {
  clickedUserData: any;
  chat: any;
  authorId: any;
  source: any;
}

export default function ChatRoom({
  chat,
  authorId,
  clickedUserData,
  source,
}: ChatRoomProps) {
  const scrollToBottom = () => {
    const element = document.getElementById("chat");
    setTimeout(() => {
      if (element) {
        element.scrollTop = element.scrollHeight;
      }
    }, 200);
  };
  useEffect(() => {
    scrollToBottom();
  }, [chat?.messages]);
  return (
    <div className="bg-gray-300 h-auto sticky top-0 right-0">
      {clickedUserData && (
        <div className="h-full">
          <div
            id="chat"
            style={{ scrollBehavior: "smooth" }}
            className="w-full flex flex-col mb-24 p-3 sm:p-6 lg:p-12 h-screen overflow-y-scroll"
          >
            {!chat?.messages?.length && (
              <div className="text-center text-black flex flex-col items-center justify-center">
                {clickedUserData?.photoURL && (
                  <div className="rounded-full overflow-hidden w-32 h-32 mb-3 relative">
                    <Image
                      src={clickedUserData?.photoURL}
                      width={122}
                      height={122}
                      alt={`Zdjęcie główne ${
                        clickedUserData?.name || clickedUserData?.login
                      }`}
                      className="absolute inset-0 object-cover w-full h-full group-hover:scale-110 duration-500"
                    />
                  </div>
                )}
                {!clickedUserData?.photoURL && (
                  <div
                    style={{ boxShadow: "0px 0px 5px #000000" }}
                    className="flex items-center justify-center text-2xl p-3 w-[124px] h-[124px] aspect-square mb-3 text-white rounded-full bg-[#fff]"
                  >
                    {clickedUserData?.login[0].toUpperCase()}
                  </div>
                )}
                <div className="flex flex-col items-center justify-center">
                  Brak wiadomości z{" "}
                  <div className="mb-3">
                    {clickedUserData?.name || clickedUserData?.login}
                  </div>
                  <div className="font-bold text-[#fff] text-center">
                    {clickedUserData?.bio}
                  </div>
                  <div className="font-bold text-gray-500 text-center">
                    Wiek {clickedUserData?.age}
                  </div>
                </div>
              </div>
            )}

            {chat?.messages?.map((message: any, i: number) => (
              <ChatMessage
                key={i}
                message={message}
                clickedUserData={clickedUserData}
                source={source}
              />
            ))}
          </div>
          <div className="sticky bottom-0 left-0">
            <MessageInput
              participants={chat?.participants}
              authorId={authorId}
              source={source}
            />
          </div>
        </div>
      )}
    </div>
  );
}
