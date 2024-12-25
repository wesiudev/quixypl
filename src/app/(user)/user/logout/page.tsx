"use client";

import { auth } from "@/firebase";
import { setUser } from "@/redux/slices/user";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export default function Logout() {
  const router = useRouter();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setUser({}));
    signOut(auth).then(() => router.push("/login"));
  }, []);
  return;
}
