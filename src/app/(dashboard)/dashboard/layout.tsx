"use client";
import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, getUsers } from "@/firebase";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { setUsers } from "@/redux/slices/users";
import { setUser } from "@/redux/slices/user";
import { Providers } from "@/redux/Provider";
import DashboardHeader from "@/components/Dashboard/DashboardHeader";
import Loading from "@/app/loading";
import Chat from "@/components/Dashboard/Chat/Chat";
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
            console.error("Error fetching users: ", error);
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
  const { modals } = useSelector((state: any) => state.modals);
  return (
    <div className="bg-[#126b91]">
      <Providers>
        {!user && <Loading />}
        {modals?.currentChat?.pseudo && <Chat />}
        <div className="sticky top-0 left-0 z-[999999]">
          <DashboardHeader />
        </div>
        <div className="lg:pl-[30rem]">{user && children}</div>
      </Providers>
    </div>
  );
}
