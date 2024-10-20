"use client";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { app, auth } from "@/firebase";
import { collection, getFirestore, onSnapshot } from "firebase/firestore";
import { useRouter } from "next/navigation";
import ChatHeaderNoConversation from "./ChatHeaderNoConversation";
import ChatRoomNoConversation from "./ChatRoomNoConversation";
import ServicesList from "./ServicesList";
import ChatHeader from "./ChatHeader";
import ChatRoom from "./ChatRoom";
import ChatList from "./ChatList";
import { useDispatch, useSelector } from "react-redux";
import { set_modals } from "@/redux/slices/modalsopen";

export default function Chat() {
  const [currentConversation, setCurrentConversation] = useState<any>();
  const [chat, setChat] = useState<any>();
  const [source, setSource] = useState<any>();
  const [user, loading] = useAuthState(auth);
  const router = useRouter();
  useEffect(() => {
    if (currentConversation) {
      const ref = collection(getFirestore(app), currentConversation);
      const unsub = onSnapshot(ref, (querySnapshot: any) => {
        const snapshotData: any[] = [];
        querySnapshot.forEach((doc: any) => {
          snapshotData.push(doc.data());
        });
        setChat(snapshotData.find((item) => item?.id === currentConversation));
      });
      return () => {
        unsub();
      };
    }
  }, [currentConversation]);
  useEffect(() => {
    const ref = collection(getFirestore(app), "users");
    const unsub = onSnapshot(ref, (querySnapshot: any) => {
      const snapshotData: any[] = [];
      querySnapshot.forEach((doc: any) => {
        snapshotData.push(doc.data());
      });
      setSource(snapshotData.find((item) => item?.uid === user?.uid));
    });
    return () => {
      unsub();
    };
  }, [loading]);
  const dispatch = useDispatch();
  const { modals } = useSelector((state: any) => state.modals);
  const [chatListOpen, setChatListOpen] = useState(false);

  return (
    <>
      <div>
        <button
          onClick={() => dispatch(set_modals({ ...modals, currentChat: "" }))}
          className={`z-[10001] fixed left-0 top-0 h-full w-full ${
            modals.currentChat !== "" && modals.currentChat !== null
              ? "scale-y-100 bg-black/70 duration-500 hover:bg-black/50"
              : "scale-y-0"
          }`}
        ></button>
        <div
          className={`${
            modals.currentChat !== "" && modals.currentChat !== null
              ? "translate-y-[0vh] duration-700"
              : "translate-y-[100vh]"
          } lg:w-[50vw] z-[10002] fixed left-1/2 -translate-x-1/2 w-full bottom-0`}
        >
          {modals.currentChat !== "" && modals.currentChat !== null && (
            <ChatRoom
              chat={chat}
              authorId={user?.uid}
              clickedUserData={modals.currentChat}
              source={source}
            />
          )}
        </div>
        {/* <ChatList
          source={source}
          chatListOpen={chatListOpen}
          setChatListOpen={setChatListOpen}
        /> */}
      </div>
    </>
  );
}
