"use client";
import QuixiesModule from "@/components/Dashboard/QuixiesModule";
import Nav from "@/components/Nav";
import { useState } from "react";
import { useSelector } from "react-redux";

export default function DashboardProviders() {
  const [isNavOpen, setNavOpen] = useState(false);
  const { modals } = useSelector((state: any) => state.modals);
  return (
    <div>
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
  );
}
