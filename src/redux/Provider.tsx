"use client";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, getUsers } from "@/firebase";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { setUsers } from "@/redux/slices/users";
import { setUser } from "@/redux/slices/user";
import { Provider } from "react-redux";
import { store } from "./store";
export function Providers({ children }: { children: React.ReactNode }) {
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
  return <Provider store={store}>{children}</Provider>;
}
