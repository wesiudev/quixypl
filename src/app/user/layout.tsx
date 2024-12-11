"use client";
import { auth } from "@/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import InitUser from "./InitUser";
import Nav from "./Nav";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import Loading from "../loading";
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isNavOpen, setNavOpen] = useState(true);
  const [user, loading] = useAuthState(auth);
  const userData = useSelector((state: any) => state.user);
  const router = useRouter();
  useEffect(() => {
    if (!user && !loading) {
      router.push("/login");
    }
  }, [loading]);
  return (
    <div className="w-full relative z-[9999] bg-primary">
      {loading && <Loading />}
      {user && <InitUser user={user} />}
      {userData && (
        <div>
          <Nav setNavOpen={setNavOpen} isNavOpen={isNavOpen} />
          <div
            className={`${
              isNavOpen ? "ml-[300px] duration-300" : "ml-0 duration-300"
            } min-w-full min-h-screen bg-primary`}
          >
            {children}
          </div>
        </div>
      )}
    </div>
  );
}
