"use client";
import React, { useState } from "react";
import { updateUser } from "@/firebase/";
import { IoSend } from "react-icons/io5";

interface MessageInputProps {
  source: any;
  value: any;
}

const MessageInput: React.FC<MessageInputProps> = ({ source, value }) => {
  const [sent, setSent] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const handleSendMessage = async (source: any, value: any) => {
    await updateUser(source?.uid, {
      leads: source?.leads ? [...source?.leads, { message }] : [{ message }],
    });
  };
  return (
    <div className="w-full flex flex-col bg-white shadow-md">
      <input type="text" placeholder="Numer telefonu" className="mb-2" />
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Treść oferty"
        autoFocus
        className={`text-black p-3 h-24 w-full resize-none outline-none `}
        disabled={!value?.access || sent}
      />
      <div className="">
        <button
          onClick={() => handleSendMessage(source, value)}
          className="rounded-bl-xl rounded-tr-xl mt-2 py-1 w-full bg-cta text-white font-bold flex items-center justify-center"
        >
          Wyślij zapytanie
          <IoSend className="ml-2" />
        </button>
      </div>
    </div>
  );
};

export default MessageInput;
