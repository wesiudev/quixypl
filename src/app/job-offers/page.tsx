"use client";
import { auth } from "@/firebase";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

export default function Page() {
  const [user, loading] = useAuthState(auth);
  const router = useRouter();
  useEffect(() => {
    if (!loading) {
      if (user) {
        router.push("/dashboard/add_job_offer");
      }
      if (!user) {
        router.push("/register");
      }
    }
  }, [user, loading]);
  return <div>Wczytywanie...</div>;
}
