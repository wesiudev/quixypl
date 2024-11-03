"use client";
import { auth, getUsers } from "@/firebase";
import { setUser } from "@/redux/slices/user";
import { setUsers } from "@/redux/slices/users";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../loading";
export default function DashboardUser() {
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
  return <div></div>;
}
