"use client";
import { updateDocument } from "@/firebase";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function VerifyEmail({ userId }: { userId: any }) {
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();
  const sendMail = async () => {
    try {
      await updateDocument(["emailVerified"], [true], "users", userId).then(
        () => {
          router.push("/dashboard");
          setIsMounted(true);
        }
      );
    } catch (error) {
      return;
    }
  };

  useEffect(() => {
    if (!isMounted) {
      setIsMounted(true);
      sendMail().catch((error) => {
        return;
      });
    }
  }, [isMounted]);

  return null;
}
