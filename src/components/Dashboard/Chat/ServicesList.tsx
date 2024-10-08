// components/dashboard/chat/ServicesList.tsx
import React from "react";
import Link from "next/link";
import { FaTrophy } from "react-icons/fa";
import Image from "next/image";

export default function ServicesList({ source }: { source: any }) {
  return (
    <div className="z-[100001] w-[25rem] fixed h-screen top-0 right-0 bg-white overflow-y-scroll scrollbarChat">
      <div className="bg-[#fff] h-24 w-full flex items-center justify-center sticky top-0 left-0 z-[100002]"></div>
      <div className="grid grid-cols-1 w-full">
        <Link href="/chat">Czat online</Link>
        <Link href="/dashboard/zarabiaj">Zarabiaj</Link>
        <Link href="/dashboard/modelki">Znajdź modelkę</Link>
        <Link href="/premium">Kup premium</Link>
        <Link href="/dashboard/influencerzy">Dla influencerów</Link>
      </div>
    </div>
  );
}
