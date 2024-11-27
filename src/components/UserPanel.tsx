"use client";
import {
  FaRocket,
  FaUserNinja,
  FaLightbulb,
  FaImages,
  FaUsers,
  FaHome,
} from "react-icons/fa";
import { FaList, FaPlus } from "react-icons/fa6";
import { set_modals } from "@/redux/slices/modalsopen";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";

export default function UserPanel() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { modals } = useSelector((state: any) => state.modals);
  const linksData = [
    {
      text: "Panel użytkownika",
      href: "/user",
      icon: <FaHome />,
    },
    {
      text: "Zlecenia i aplikacje",
      href: "/user/leads",
      icon: <FaUsers />,
    },
    {
      text: "Znajdź pracę",
      href: "/user/search?type=job",
      icon: <FaRocket />,
    },
    {
      text: "Znajdź Freelancera",
      href: "/user/search?type=talent",
      icon: <FaUserNinja />,
    },
    {
      text: "Dodaj ofertę pracy",
      href: "/user/add_job_offer",
      icon: <FaPlus />,
    },
    {
      text: "Twoje oferty pracy",
      href: "/user/my_postings",
      icon: <FaList />,
    },
    {
      text: "Generator Obrazów",
      href: "/user/image-generator",
      icon: <FaImages />,
    },
  ];
  return (
    <div className="px-4 lg:px-12 pt-12 pb-6 bg-white">
      <div className="gap-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {linksData.map((link, index) => (
          <button
            key={index}
            className="border-r-[1px] border-[#303345] bg-[#222430] relative text-white text-center"
            onClick={() => {
              router.push(link.href);
              dispatch(set_modals({ ...modals, config: false }));
            }}
            rel="noopener noreferrer"
          >
            <div className="flex items-center relative px-3">
              <div className="text-xl mr-4">{link.icon}</div>
              <div className="py-2 z-50 relative text-center font-extrabold">
                {link.text}
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
