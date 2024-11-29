"use client";
import React, { useEffect } from "react";
import ChatMessage from "./ChatMessage";
import MessageInput from "./MessageInput";
import Image from "next/image";
interface ChatRoomProps {
  clickedUserData: any;
  source: any;
}

export default function ChatRoom({ clickedUserData, source }: ChatRoomProps) {
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
  }, []);
  return (
    <div className="bg-white overflow-hidden">
      {clickedUserData && (
        <div className="h-full">
          <div className="w-full px-6 pb-6 mt-6">
            <h2 className="bg-gradient-to-r from-primary to-cta p-3 lg:p-6 text-xl font-extrabold text-white">
              Wyślij zapytanie do {clickedUserData?.name}
            </h2>{" "}
            <MessageInput value={clickedUserData} source={source} />
          </div>
        </div>
      )}
    </div>
  );
}
