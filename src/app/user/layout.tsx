"use client";
import { auth } from "@/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import LoginPage from "./LoginPage";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import InitUser from "./InitUser";
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, loading] = useAuthState(auth);
  return (
    <div className="w-full relative z-[9999] bg-white">
      {user && (
        <div>
          <InitUser user={user} />
          <div className="pl-[300px] min-w-full min-h-screen bg-[#222430]">
            {children}
          </div>
        </div>
      )}
    </div>
  );
}
