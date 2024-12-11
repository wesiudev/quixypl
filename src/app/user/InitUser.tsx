"use client";
import { getDocument } from "@/firebase";
import { setUser } from "@/redux/slices/user";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export default function InitUser({ user }: { user: any }) {
  const dispatch = useDispatch();
  useEffect(() => {
    if (user) {
      getDocument("users", user?.uid).then((data) => {
        dispatch(setUser(data));
      });
    }
  }, []);
  return <div></div>;
}
