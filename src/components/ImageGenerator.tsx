"use client";
import { useSelector } from "react-redux";
import Loading from "@/app/loading";

export default function ImageGenerator() {
  const { user } = useSelector((state: any) => state.user);
  return <div>{!user && <Loading />}</div>;
}
