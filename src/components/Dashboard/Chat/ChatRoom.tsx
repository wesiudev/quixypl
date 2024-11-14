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
    <div className="bg-white rounded-t-xl overflow-hidden">
      {clickedUserData && (
        <div className="h-full">
          <h2 className="bg-gradient-to-r from-primary to-cta p-3 lg:p-6 text-xl font-extrabold text-white">
            Wyślij zapytanie do {clickedUserData?.name}
          </h2>{" "}
          <div
            id="chat"
            style={{ scrollBehavior: "smooth" }}
            className="w-full flex flex-col p-6"
          >
            {!chat?.messages?.length && (
              <div className="text-black flex bg-gradient-to-r from-transparent to-black/10 rounded-r-xl pr-3 py-3">
                <div className="">
                  {clickedUserData?.photoURL && (
                    <div className="shadow-sm shadow-black rounded-full overflow-hidden w-20 h-20 relative">
                      <Image
                        src={clickedUserData?.photoURL}
                        width={128}
                        height={128}
                        alt={`Zdjęcie główne ${clickedUserData?.name}`}
                        className="absolute inset-0 object-cover w-full h-full"
                      />
                    </div>
                  )}
                  {!clickedUserData?.photoURL && (
                    <div className="shadow-black shadow-sm flex items-center justify-center text-2xl p-3 w-20 h-20 aspect-square text-white rounded-full bg-gradient-to-r from-primary to-cta">
                      {clickedUserData?.pseudo[0].toUpperCase()}
                    </div>
                  )}
                </div>
                <div className="flex flex-col pl-6">
                  <div className="font-extrabold">
                    {clickedUserData?.name || clickedUserData?.pseudo}
                  </div>
                  <div className="text-xl font-extrabold font-coco w-max max-w-full text-transparent bg-clip-text bg-gradient-to-r from-primary to-cta rounded-xl">
                    {clickedUserData?.title}
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
          <div className="w-full px-6 pb-6">
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
