"use client";
import React, { useState } from "react";
import { updateUser } from "@/firebase/";
import { toast } from "react-toastify";
import { IoSend } from "react-icons/io5";

interface MessageInputProps {
  source: any;
  value: any;
}

const MessageInput: React.FC<MessageInputProps> = ({ source, value }) => {
  const [sent, setSent] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");

  const validatePhoneNumber = (phoneNumber: string) => {
    const regex = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/;
    return (
      regex.test(phoneNumber) &&
      (phoneNumber.length === 9 ||
        phoneNumber.length === 11 ||
        phoneNumber.length === 12)
    );
  };

  const handleSendMessage = async (source: any, value: any) => {
    if (message.trim() === "") {
      toast.error("Treść zapytania jest wymagana");
      return;
    }
    if (!validatePhoneNumber(phoneNumber)) {
      toast.error("Numer telefonu jest nieprawidłowy");
      return;
    }
    await updateUser(value?.uid, {
      leads: value?.leads
        ? [...value?.leads, { message, phoneNumber }]
        : [{ message, phoneNumber }],
    });
    setSent(true);
  };

  return (
    <div className="w-full flex flex-col bg-white shadow-md">
      <>
        <input
          value={phoneNumber}
          onChange={(e: any) => {
            setPhoneNumber(e.target.value);
          }}
          type="text"
          placeholder="Numer telefonu"
          className={`my-2 text-black ${
            sent ? "border-green-500" : "border-transparent"
          } border-2`}
        />
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Wpisz treść zapytania"
          autoFocus
          className={`${
            sent ? "border-green-500" : "border-transparent"
          } border-2 text-black p-3 h-24 w-full resize-none outline-none `}
          disabled={!value?.access || sent}
        />
        <div className="p-3 text-green-500 font-bold">
          Zapytanie zostało wysłane!
        </div>
        <div className="">
          <button
            onClick={() => handleSendMessage(source, value)}
            className="mt-2 py-1 w-full bg-cta text-white font-bold flex items-center justify-center"
          >
            Wyślij zapytanie
            <IoSend className="ml-2" />
          </button>
        </div>
      </>
    </div>
  );
};

export default MessageInput;
