"use client";
import { FaUsers, FaHome, FaPlusCircle } from "react-icons/fa";
import { FaCoins, FaList } from "react-icons/fa6";
import { set_modals } from "@/redux/slices/modalsopen";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { AiFillThunderbolt } from "react-icons/ai";
import { useState } from "react";
import { toast } from "react-toastify";

export default function UserPanel() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { modals } = useSelector((state: any) => state.modals);
  const linksData = [
    {
      text: "Panel",
      href: "/user",
      icon: <FaHome />,
    },
    {
      text: "Zlecenia",
      href: "/user/leads",
      icon: <FaUsers />,
    },
    {
      text: "Dodaj usługę",
      href: "/user/new_service",
      icon: <AiFillThunderbolt />,
    },
    {
      text: "Dodaj ofertę",
      href: "/user/add_job_offer",
      icon: <FaPlusCircle />,
    },
    {
      text: "Twoje oferty",
      href: "/user/job_offers/",
      icon: <FaList />,
    },
    // {
    //   text: "Generator Obrazów",
    //   href: "/user/image-generator",
    //   icon: <FaImages />,
    // },
  ];
  return (
    <div className="p-4 lg:p-6 !pb-0 bg-white">
      <div className="gap-1.5 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
        {linksData.map((link, index) => (
          <button
            key={index}
            className="rounded-lg bg-cta hover:bg-cta/70 relative text-white text-center"
            onClick={() => {
              router.push(link.href);
            }}
            rel="noopener noreferrer"
          >
            <div className="flex items-center justify-center relative px-3">
              <div className="text-2xl mr-2">{link.icon}</div>
              <div className="py-2 z-50 relative text-center">{link.text}</div>
            </div>
          </button>
        ))}

        <button
          className="rounded-lg bg-cta hover:bg-cta/70 relative text-white text-center"
          onClick={() => {
            dispatch(set_modals({ ...modals, quixies: true }));
          }}
          rel="noopener noreferrer"
        >
          <div className="flex items-center justify-center relative px-3">
            <div className="text-2xl mr-2">
              <FaCoins />
            </div>
            <div className="py-2 z-50 relative text-center">Sklep</div>
          </div>
        </button>
      </div>
    </div>
  );
}
