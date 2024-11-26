"use client";
import { useSelector } from "react-redux";
import Backpack from "./user/ImageGenerator/backpack/Backpack";
import Loading from "@/app/loading";

export default function ImageGenerator() {
  const { user } = useSelector((state: any) => state.user);
  return (
    <div>
      {user && <Backpack user={user} />}
      {!user && <Loading />}
    </div>
  );
}
