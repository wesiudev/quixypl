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
    <div className="bg-white rounded-t-xl">
      {clickedUserData && (
        <div className="h-full">
          <h2 className="rounded-t-xl bg-gradient-to-r from-primary to-cta font-gotham p-3 lg:p-6 lg:text-xl text-white">
            Napisz do {clickedUserData.name || clickedUserData.pseudo}
          </h2>{" "}
          <div
            id="chat"
            style={{ scrollBehavior: "smooth" }}
            className="w-full flex flex-col p-3 sm:p-6 lg:p-12 overflow-y-scroll"
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
                      className="absolute inset-0 object-cover w-full h-full"
                    />
                  </div>
                )}
                {!clickedUserData?.photoURL && (
                  <div className="flex items-center justify-center text-2xl p-3 w-[124px] h-[124px] aspect-square mb-3 text-white rounded-full bg-[#fff]">
                    {clickedUserData?.login[0].toUpperCase()}
                  </div>
                )}
                <div className="flex flex-col items-center justify-center font-coco text-center">
                  <div className="mb-3 font-gotham">
                    {clickedUserData?.name || clickedUserData?.pseudo}
                  </div>
                  Brak wiadomości
                  <div className="text-black mt-2">{clickedUserData?.bio}</div>
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
          <div className="w-full">
            <MessageInput
              value={clickedUserData}
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
