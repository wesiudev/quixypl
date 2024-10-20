"use client";
import React, { useState } from "react";
import { BiSend } from "react-icons/bi";
import {
  addConversation,
  addMessageToConversation,
  getDocument,
} from "@/firebase/";
import { updateUser } from "@/firebase/";
import { set_modals } from "@/redux/slices/modalsopen";
import { useDispatch, useSelector } from "react-redux";

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
      if (source?.messages > 0) {
        handleSendMessage();
        if (source?.messages > 0 && !source?.chat) {
          updateUser(source?.uid, {
            ...source,
            messages: source?.messages - 1,
          });
        }
      }
    }
  };
  // Retrieve the modals state from the Redux store
  const { modals } = useSelector((state: any) => state.modals);
  const dispatch = useDispatch();

  // Handles creating or opening a conversation
  const handleConversation = async () => {
    // Prevent creating a chat with yourself
    if (value?.uid === source?.uid) return;

    // If the user is not already in the related users list
    if (!source?.relatedUsers?.some((u: any) => u?.uid === value?.uid)) {
      // Add a new conversation between the two users
      const newConversation = await addConversation([
        {
          email: source?.email,
          uid: source?.uid,
          photoURL: source?.photoURL || "",
        },
        {
          email: value?.email,
          uid: value?.uid,
          photoURL: value?.photoURL || "",
        },
      ]);

      // Update modals to set the current chat
      dispatch(set_modals({ ...modals, currentChat: newConversation.pseudo }));

      // Get user data for both users and update related users list
      const [userData, clickedUserData] = await Promise.all([
        getDocument("users", source?.uid),
        getDocument("users", value?.uid),
      ]);

      const userRelatedUsers = Array.isArray(userData?.relatedUsers)
        ? userData?.relatedUsers
        : [];
      const clickedUserRelatedUsers = Array.isArray(
        clickedUserData?.relatedUsers
      )
        ? clickedUserData?.relatedUsers
        : [];

      // Update the related users list for both the source and clicked user
      const userRelatedUsersArray = Array.isArray(userRelatedUsers)
        ? userRelatedUsers
        : [];
      const clickedUserRelatedUsersArray = Array.isArray(
        clickedUserRelatedUsers
      )
        ? clickedUserRelatedUsers
        : [];
      if (!userRelatedUsersArray.includes(value?.uid)) {
        updateUser(source?.uid, {
          relatedUsers: [
            ...userRelatedUsersArray,
            {
              email: value?.email,
              uid: value?.uid,
              photoURL: value?.photoURL || "",
            },
          ],
        });
      }

      if (!clickedUserRelatedUsersArray.includes(source?.uid)) {
        updateUser(value?.uid, {
          relatedUsers: [
            ...clickedUserRelatedUsersArray,
            {
              email: source?.email,
              uid: source?.uid,
              photoURL: source?.photoURL || "",
            },
          ],
        });
      }

      // Update the current user in the modals state
      const clickedUserDataUpdated = await getDocument("users", value?.uid);
      dispatch(set_modals({ ...modals, currentUser: clickedUserDataUpdated }));
    } else {
      // If the conversation already exists, just update the current user
      const sortedParticipantIds = [source, value].map((p) => p.uid).sort();
      const conversationId = sortedParticipantIds.join("_");

      const clickedUserData = await getDocument("users", value?.uid);
      dispatch(set_modals({ ...modals, currentUser: clickedUserData }));
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
