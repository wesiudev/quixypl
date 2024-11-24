"use client";
import { Providers } from "@/redux/Provider";
import Link from "next/link";
import { getUser } from "../../../../utils/getUsers";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/firebase";
import Loading from "@/app/loading";
import Chat from "@/components/Dashboard/Chat/Chat";
import DashboardHeader from "@/components/Dashboard/DashboardHeader";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/slices/user";

export default function DashboardWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, loading] = useAuthState(auth);
  const dispatch = useDispatch();
  useEffect(() => {
    async function fetchData() {
      if (user?.uid) {
        const userData = await getUser(user.uid);
        dispatch(setUser(userData.data));
      }
    }
    fetchData();
  }, [user?.uid, loading]);

  return (
    <div>
      <Providers>
        {!user ? (
          <Loading />
        ) : (
          <>
            <Chat />
            <div className="sticky bottom-0 left-0 z-[999999]">
              <DashboardHeader />
            </div>
            <div className="lg:pl-[30rem]">{children}</div>
          </>
        )}
      </Providers>
    </div>
  );
}
