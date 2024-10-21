"use client";
import React, { useState } from "react";
import { BiSend } from "react-icons/bi";
import { addMessageToConversation } from "@/firebase/";
import { updateUser } from "@/firebase/";

interface MessageInputProps {
  authorId: string;
  participants: string[];
  source: any;
  value: any;
}

const MessageInput: React.FC<MessageInputProps> = ({
  authorId,
  participants,
  source,
  value,
}) => {
  const [message, setMessage] = useState<string>("");

  const handleSendMessage = async () => {
    if (message.trim() !== "") {
      await addMessageToConversation(message, authorId, participants);
      if (source?.messages > 0 && !source?.chat) {
        await updateUser(source?.uid, {
          ...source,
          messages: source?.messages - 1,
        });
      }
      if (source?.messages > 0) {
        handleSendMessage();
        if (source?.messages > 0 && !source?.chat) {
          await updateUser(source?.uid, {
            ...source,
            messages: source?.messages - 1,
          });
        }
      } else {
        await handleConversation();
      }
      setMessage("");
    }
  };

  const handleKeyPress = async (
    e: React.KeyboardEvent<HTMLTextAreaElement>
  ) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (source?.messages > 0) {
        handleSendMessage();
        if (source?.messages > 0 && !source?.chat) {
          await updateUser(source?.uid, {
            ...source,
            messages: source?.messages - 1,
          });
        }
      }
    } else {
      await handleConversation();
    }
  };

  const handleConversation = async () => {
    await updateUser(value?.uid, {
      ...value,
      applications: [
        ...(source?.applications || []),
        {
          uid: source?.uid,
          message: message,
        },
      ],
    });
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
