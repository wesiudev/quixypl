"use client";
import { auth, getDocument } from "@/firebase";
import { setUser } from "@/redux/slices/user";
import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useDispatch } from "react-redux";

export default function InitUser() {
  const [user, loading] = useAuthState(auth);
  const dispatch = useDispatch();
  useEffect(() => {
    if (user) {
      getDocument("users", user?.uid).then((data) => {
        dispatch(setUser(data));
      });
    }
  }, [loading]);
  return <div></div>;
}
