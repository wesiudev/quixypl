"use client";
import React from "react";

export default function ChatRoomNoConversation({ source }: { source: any }) {
  return (
    <div className="bg-gray-300 h-full sticky top-0 right-0">
      cześć {source?.login}
    </div>
  );
}
