"use client";
// wesiudev entertainment
import React, { useState } from "react";
import { BiSend, BiTrophy } from "react-icons/bi";
import { addMessageToConversation } from "@/firebase/";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FaUsers } from "react-icons/fa6";
import { updateUser } from "@/firebase/";

interface MessageInputProps {
  authorId: string;
  participants: string[];
  source: any;
}

const MessageInput: React.FC<MessageInputProps> = ({
  authorId,
  participants,
  source,
}) => {
  const [message, setMessage] = useState<string>("");
  const router = useRouter();
  const handleSendMessage = () => {
    if (message.trim() !== "") {
      addMessageToConversation(message, authorId, participants);
      if (source?.messages > 0 && !source?.chat) {
        updateUser(source?.uid, {
          ...source,
          messages: source?.messages - 1,
        });
      }
      setMessage("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault(); // Prevent new line on Enter key press
      if (source?.chat || source?.messages > 0) {
        handleSendMessage();
        if (source?.messages > 0 && !source?.chat) {
          updateUser(source?.uid, {
            ...source,
            messages: source?.messages - 1,
          });
        }
      } else {
        router.push("/premium");
      }
    }
  };
  return (
    <div className="flex items-center sticky bottom-0 left-0 bg-white shadow-md">
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder={
          !source?.bio || !source?.name || !source?.age
            ? "Uzupełnij profil..."
            : source?.chat || source?.messages > 0
            ? "Wpisz wiadomość..."
            : "Kup premium lub doładuj profil..."
        }
        autoFocus
        onKeyDown={handleKeyPress}
        className={`${
          (!source?.chat ||
            !source?.bio ||
            !source?.name ||
            !source?.age ||
            !source?.premium ||
            !source?.chat) &&
          source?.messages === 0 &&
          "placeholder:text-[red] font-bold"
        } p-3 h-24 w-full resize-none focus:outline-none text-xl`}
        disabled={
          (!source?.chat || !source?.bio || !source?.name || !source?.age) &&
          source?.messages === 0
        }
      />
      {(source?.chat || source?.messages > 0) && (
        <button
          onClick={() => handleSendMessage()}
          className="w-24 aspect-square h-24 text-2xl p-3 bg-[#A6152D] text-white font-bold flex items-center justify-center"
        >
          <BiSend />
        </button>
      )}
      {source?.bio &&
        source?.name &&
        source?.age &&
        !source?.chat &&
        source?.messages === 0 && (
          <Link
            href="/premium"
            className="h-24 text-sm p-3 bg-[#A6152D] text-white font-bold flex items-center justify-center"
          >
            <BiTrophy className="text-yellow-400 mr-2" />{" "}
            <div className="w-max">Wykup Dostęp</div>
          </Link>
        )}
      {(!source?.bio || !source?.name || !source?.age) && (
        <button className="h-24 w-max text-sm p-3 bg-[#A6152D] text-white font-bold flex items-center justify-center">
          <FaUsers className="text-yellow-400 mr-2" />
          <div className="w-max">Uzupełnij profil</div>
        </button>
      )}
    </div>
  );
};

export default MessageInput;
