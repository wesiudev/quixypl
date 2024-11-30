"use client";
import { auth } from "@/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import Nav from "../../components/Nav";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import InitUser from "../../components/InitUser";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import QuixiesModule from "@/components/Dashboard/QuixiesModule";
import Loading from "../loading";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
export const dynamic = "force-dynamic";
export default function Layout({ children }: { children: React.ReactNode }) {
  const [isNavOpen, setNavOpen] = useState(false);
  const [user, loading] = useAuthState(auth);
  const { modals } = useSelector((state: any) => state.modals);
  const router = useRouter();
  useEffect(() => {
    if (!user && !loading) {
      router.push("/login");
      toast.error("Musisz się zalogować", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }, []);
  return (
    <div className="w-full relative z-[9999] bg-primary">
      {user ? (
        <div>
          <InitUser user={user} />
          {modals?.quixies && <QuixiesModule />}
          <Nav isNavOpen={isNavOpen} setNavOpen={setNavOpen} />
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
      ) : (
        <Loading />
      )}
    </div>
  );
}
