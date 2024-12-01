"use client";
import { getDocument } from "@/firebase";
import { setUser } from "@/redux/slices/user";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Nav from "./Nav";

export default function InitUser({ user }: { user: any }) {
  const [isNavOpen, setNavOpen] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    if (user) {
      getDocument("users", user?.uid).then((data) => {
        dispatch(setUser(data));
      });
    }
  }, []);
  return (
    <div>
      <Nav setNavOpen={setNavOpen} isNavOpen={isNavOpen} />
    </div>
  );
}
