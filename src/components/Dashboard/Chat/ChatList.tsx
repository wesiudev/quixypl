// components/dashboard/chat/ChatList.tsx
import React, { useEffect, useState } from "react";
import { collection, getFirestore, onSnapshot } from "firebase/firestore";
import { app } from "@/firebase";
import ChatListElement from "./ChatListElement";
import Link from "next/link";
import { FaTrophy } from "react-icons/fa";
import Image from "next/image";
interface ChatListProps {
  userId: any;
  source: any;
  setCurrentConversation: any;
  clickedUserData: any;
  setClickedUserData: any;
  currentConversation: any;
}

export default function ChatList({
  userId,
  source,
  setCurrentConversation,
  clickedUserData,
  setClickedUserData,
  currentConversation,
}: ChatListProps) {
  const [allUsers, setChatRooms] = useState<any[]>([]);
  const [userClicked, setUserClicked] = useState<any>();
  useEffect(() => {
    const ref = collection(getFirestore(app), "users");
    const unsub = onSnapshot(ref, (querySnapshot: any) => {
      const snapshotData: any[] = [];
      querySnapshot.forEach((doc: any) => {
        snapshotData.push(doc.data());
      });
      setChatRooms(snapshotData);
    });
    return () => {
      unsub(); // Wyrejestrowanie nasłuchiwacza
    };
  }, []);
  const usersOnline = allUsers.filter(
    (room) => room?.status === "online"
  ).length;
  const usersOffline = allUsers.filter(
    (room) => room?.status === "offline" || !room.status
  ).length;

  return (
    <div className="z-[100001] w-[25rem] fixed h-screen top-0 left-0 bg-white overflow-y-scroll scrollbarChat">
      <div className="bg-[#fff] h-24 w-full flex items-center justify-center sticky top-0 left-0 z-[100002]">
        <Image
          src="/sexflix-logo.png"
          width={224}
          height={224}
          alt=""
          className="h-[80%] w-auto"
        />
      </div>
      <div className="grid grid-cols-1 w-full">
        {allUsers.map((user, i) => (
          <ChatListElement
            key={i}
            setCurrentConversation={setCurrentConversation}
            value={user}
            source={source}
            setClickedUserData={setClickedUserData}
          />
        ))}
      </div>
    </div>
  );
}
