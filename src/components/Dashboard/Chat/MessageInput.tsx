"use client";
import React, { useState } from "react";
import { BiSend } from "react-icons/bi";
import { addMessageToConversation } from "@/firebase/";
import { useRouter } from "next/navigation";
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
    <div className="w-full flex bg-white shadow-md">
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Wpisz wiadomość"
        autoFocus
        onKeyDown={handleKeyPress}
        className={`p-3 h-24 w-full resize-none focus:outline-none text-xl font-gotham font-light`}
        disabled={
          (!source?.chat || !source?.bio || !source?.name || !source?.age) &&
          source?.messages === 0
        }
      />
      <div className="w-24 h-24">
        <button
          onClick={() => handleSendMessage()}
          className="h-full w-full text-2xl bg-cta text-white font-bold flex items-center justify-center"
        >
          <BiSend />
        </button>
      </div>
    </div>
  );
};

export default MessageInput;
