"use client";
import { auth } from "@/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import InitUser from "./InitUser";
import Nav from "./Nav";
import { useState } from "react";
import Settings from "@/components/Dashboard/Settings/Settings";
import { useSelector } from "react-redux";
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isNavOpen, setNavOpen] = useState(true);
  const [user, loading] = useAuthState(auth);
  const userData = useSelector((state: any) => state.user);
  return (
    <div className="w-full relative z-[9999] bg-primary">
      {user && <InitUser user={user} />}
      {userData && (
        <div>
          <Nav setNavOpen={setNavOpen} isNavOpen={isNavOpen} />
          {/* <Settings /> */}
          <div
            className={`${
              isNavOpen
                ? "lg:pl-[300px] ml-[300px] lg:ml-0 duration-300 lg:scale-[0.9]"
                : "lg:pl-0 ml-0 duration-300 scale-100"
            } min-w-full min-h-screen bg-primary`}
          >
            {children}
          </div>
        </div>
      )}
    </div>
  );
}
