"use client";
import { auth } from "@/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import LoginPage from "./LoginPage";

import Loading from "./loading";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import InitUser from "./InitUser";
import Nav from "./Nav";
import { useState } from "react";
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isNavOpen, setNavOpen] = useState(true);
  const [user, loading] = useAuthState(auth);
  if (loading) {
    return <Loading />;
  } else
    return (
      <div className="w-full  relative z-[9999] bg-white">
        {user ? (
          <>
            <InitUser user={user} />
            {/* <Nav setNavOpen={setNavOpen} isNavOpen={isNavOpen} /> */}
            <div className="pl-[300px] min-w-full min-h-screen bg-[#222430]">
              {children}
            </div>
          </>
        ) : (
          <LoginPage />
        )}
      </div>
    );
}
