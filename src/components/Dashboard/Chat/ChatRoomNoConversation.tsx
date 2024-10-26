"use client";
import React from "react";

export default function ChatRoomNoConversation({ source }: { source: any }) {
  return (
    <div className="z-[10099] bg-gray-300 text-black w-full lg:w-[50vw] h-screen fixed top-0 lg:left-[50vw] pt-[96px]">
      <div className="text-white w-max max-w-full mx-auto mt-3 bg-gradient-to-r from-primary via-cta to-primary p-2  px-4">
        <strong>Cześć! Co chcesz dziś zrobić?</strong>
      </div>
    </div>
  );
}
