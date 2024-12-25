"use client";
import { auth, getDocument } from "@/firebase";
import { setUser } from "@/redux/slices/user";
import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useDispatch, useSelector } from "react-redux";

export default function InitializeUser() {
  const [user, loading] = useAuthState(auth);
  const dispatch = useDispatch();
  const userData = useSelector((state: any) => state.user.user);
  useEffect(() => {
    if (!userData && user) {
      getDocument("users", user?.uid).then((data) => {
        dispatch(setUser(data));
      });
    }
  }, [user, loading]);
  return <div></div>;
}
