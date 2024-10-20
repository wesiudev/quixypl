"use client";
import moment from "moment";
import Link from "next/link";
import { useSelector } from "react-redux";
import "moment/locale/pl";
export default function Page() {
  const { user } = useSelector((state: any) => state.user);

  return <div className="flex flex-col lg:pl-[30rem]"></div>;
}
