"use client";
import { auth } from "@/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import Nav from "./Nav";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import InitializeUser from "@/components/InitializeUser";
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isNavOpen, setNavOpen] = useState(true);
  const [user, loading] = useAuthState(auth);
  const router = useRouter();
  useEffect(() => {
    if (!user && !loading) {
      router.push("/login");
    }
  }, [loading]);
  const { light } = useSelector((state: any) => state.light);
  return (
    <div className="w-full relative z-[9999]">
      <InitializeUser />

      <div>
        <Nav setNavOpen={setNavOpen} isNavOpen={isNavOpen} />
        <div
          className={`duration-300 ${
            isNavOpen
              ? "ml-[300px] lg:ml-[0px] lg:pl-[300px]"
              : "ml-0 lg:pl-[300px]"
          } min-w-full min-h-screen ${
            light ? "bg-primaryHoverEnd/30" : "bg-primaryEnd/80"
          }`}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
