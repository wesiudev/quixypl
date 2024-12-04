"use client";

import { auth } from "@/firebase";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Logout() {
  const router = useRouter();
  useEffect(() => {
    signOut(auth).then(() => router.push("/login"));
  }, []);
  return;
}
