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

export default function Chat() {
  const [currentConversation, setCurrentConversation] = useState<any>();
  const [clickedUserData, setClickedUserData] = useState<any>();
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
  const closeChat = () => {
    setCurrentConversation(null);
    setClickedUserData(null);
  };
  return (
    <>
      <div>
        <div
          style={{ flex: 1, boxShadow: "0px 0px 5px #000000" }}
          className={`w-[calc(100%-50rem)] h-screen z-[10000] fixed left-[25rem] top-0`}
        >
          {clickedUserData && (
            <ChatHeader
              clickedUserData={clickedUserData}
              closeChat={closeChat}
              chattingWith={
                chat?.participants.find((item: any) => item.uid !== user?.uid)
                  .name
              }
              source={source}
            />
          )}
          {clickedUserData && (
            <ChatRoom
              chat={chat}
              authorId={user?.uid}
              clickedUserData={clickedUserData}
              source={source}
            />
          )}
          <ChatHeaderNoConversation source={source} />
          <ChatRoomNoConversation source={source} />
        </div>
        <ChatList
          clickedUserData={clickedUserData}
          setClickedUserData={setClickedUserData}
          userId={user?.uid}
          source={source}
          currentConversation={currentConversation}
          setCurrentConversation={setCurrentConversation}
        />
        <ServicesList source={source} />
      </div>
    </>
  );
}
