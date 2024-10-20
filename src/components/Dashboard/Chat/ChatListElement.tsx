"use client";

import { addConversation, getDocument, updateUser } from "@/firebase/";
import { set_modals } from "@/redux/slices/modalsopen";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";

// ChatListElement component that represents a user in the chat list
export default function ChatListElement({
  source, // Current user object
  value, // User object for the chat list element
}: {
  source: any;
  value: any;
}) {
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
      if (!userRelatedUsers?.includes(value?.uid)) {
        updateUser(source?.uid, {
          relatedUsers: [
            ...userRelatedUsers,
            {
              email: value?.email,
              uid: value?.uid,
              photoURL: value?.photoURL || "",
            },
          ],
        });
      }

      if (!clickedUserRelatedUsers?.includes(source?.uid)) {
        updateUser(value?.uid, {
          relatedUsers: [
            ...clickedUserRelatedUsers,
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
    <div key={value?.uid} className="bg-white w-full relative">
      <div
        className="flex items-center w-full p-2"
        style={{ boxShadow: "0 0 10px 0 rgba(0,0,0,0.25)" }}
      >
        <button
          onClick={handleConversation}
          className="flex items-center w-full"
        >
          {value?.photoURL ? (
            // If the user has a photo, display it
            <div
              className="w-12 aspect-square rounded-full relative"
              style={{ boxShadow: "0px 0px 5px #000000" }}
            >
              <Image
                src={value?.photoURL}
                width={50}
                height={50}
                alt=""
                className="rounded-full absolute inset-0 object-cover w-full h-full group-hover:scale-110 duration-500"
              />
            </div>
          ) : (
            // If no photo, display the first letter of the user's email
            <div
              style={{ boxShadow: "0px 0px 5px #000000" }}
              className="aspect-square flex items-center justify-center text-2xl w-12 text-black rounded-full bg-[#fff]"
            >
              {value?.email[0].toUpperCase()}
            </div>
          )}
          <div className="text-black font-bold ml-3 flex items-center justify-between w-full overflow-hidden text-clip">
            <div className="pr-6 w-max">
              {value?.pseudo !== source?.pseudo ? value?.pseudo : "You"}
            </div>
          </div>
        </button>
      </div>
    </div>
  );
}
