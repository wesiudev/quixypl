"use client";
import QuixiesModule from "@/components/Dashboard/QuixiesModule";
import InitUser from "@/components/InitUser";
import Nav from "@/components/Nav";
import { auth } from "@/firebase";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import Loading from "../app/loading";

export default function UserClient() {
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
    <div>
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
        ></div>
      </div>

      {loading && <Loading />}
    </div>
  );
}
