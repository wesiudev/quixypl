"use client";
import Chat from "@/components/Dashboard/Chat/Chat";
import { Providers } from "@/redux/Provider";
import DashboardHeader from "@/components/Dashboard/DashboardHeader";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, getUsers } from "@/firebase";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { setUsers } from "@/redux/slices/users";
import { setUser } from "@/redux/slices/user";
import Loading from "@/app/loading";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [user, loading] = useAuthState(auth);
  const dispatch = useDispatch();
  const router = useRouter();
  useEffect(() => {
    if (user && !loading) {
      const fetchUsers = async () => {
        if (user && !loading) {
          try {
            const users = await getUsers();
            dispatch(setUsers(users));
            const currentUser = users.find(
              (anyUser) => anyUser?.uid === user?.uid
            );
            dispatch(setUser(currentUser));
          } catch (error) {
            if (error) return;
          }
        }
      };
      fetchUsers();
    }
  }, [loading]);
  useEffect(() => {
    if (!user && !loading) {
      router.push(`${process.env.NEXT_PUBLIC_URL}/login`);
    }
  }, [loading, user, router]);
  return (
    <>
      {!user ? (
        <Loading />
      ) : (
        <div className="bg-[#126b91]">
          <Providers>
            <Chat />
            <div className="sticky top-0 left-0 z-[999999]">
              <DashboardHeader />
            </div>
            <div className="lg:pl-[30rem]">{children}</div>
          </Providers>
        </div>
      )}
    </>
  );
}
