import {
  FaBriefcase,
  FaRocket,
  FaUserNinja,
  FaLightbulb,
  FaImages,
  FaDollarSign,
  FaUsers,
  FaHome,
  FaCog,
} from "react-icons/fa";
import Link from "next/link";
import { FaList } from "react-icons/fa6";
import { useState } from "react";
import { set_modals } from "@/redux/slices/modalsopen";
import { useDispatch, useSelector } from "react-redux";

const UserPanel = ({ userData }: { userData: any }) => {
  const dispatch = useDispatch();
  const { modals } = useSelector((state: any) => state.modals);
  const linksData = [
    {
      text: "Panel użytkownika",
      href: "/dashboard",
      icon: <FaHome className="text-5xl" />,
    },
    {
      text: "Znajdź pracę",
      href: "/search?type=talent",
      icon: <FaRocket className="text-5xl" />,
    },
    {
      text: "Dodaj ofertę pracy",
      href: "/dashboard/add_job_offer",
      icon: <FaBriefcase className="text-5xl" />,
    },
    {
      text: "Zatrudnij talent",
      href: "/search?type=client",
      icon: <FaUserNinja className="text-5xl" />,
    },
    {
      text: "Generator Biznesu",
      href: "/dashboard/idea_generator",
      icon: <FaLightbulb className="text-5xl" />,
    },
    {
      text: "Generator Obrazów",
      href: "/dashboard/image_generator",
      icon: <FaImages className="text-5xl" />,
    },
    // {
    //   text: "Rynek",
    //   href: "/marketplace",
    //   icon: <FaDollarSign className="text-5xl" />,
    // },
    {
      text: "Moje zlecenia",
      href: "/dashboard/applications",
      icon: <FaUsers className="text-5xl" />,
    },
    {
      text: "Moje oferty",
      href: "/dashboard/my_postings",
      icon: <FaList className="text-5xl" />,
    },
  ];
  return (
    <div>
      <div className={`w-full grid grid-cols-1 gap-1.5 z-50 px-6 pt-6`}>
        {linksData.map((link, index) => (
          <>
            <Link
              key={index}
              className={`pl-2 relative w-full font-gotham bg-gradient-to-br from-primary to-cta text-white hover:from-cta hover:to-cta rounded-xl`}
              href={link.href}
              rel="noopener noreferrer"
            >
              <div className="flex items-center justify-center relative py-3">
                <div className="text-white opacity-30 mr-2 absolute left-3 top-1/2 -translate-y-1/2">
                  {link.icon}
                </div>
                <div className="py-2 z-50 relative text-center">
                  {link.text.toUpperCase()}
                </div>
              </div>
            </Link>
            {index === 0 && (
              <button
                onClick={() =>
                  dispatch(set_modals({ ...modals, config: true }))
                }
                className="pl-2 relative w-full font-gotham bg-gradient-to-br from-primary to-cta text-white hover:from-cta hover:to-cta rounded-xl"
              >
                <div className="flex items-center justify-center relative py-3">
                  <div className="text-white opacity-30 mr-2 absolute left-3 top-1/2 -translate-y-1/2">
                    <FaCog className="text-5xl" />
                  </div>
                  <div className="py-2 z-50 relative text-center">
                    MÓJ PROFIL
                  </div>
                </div>
              </button>
            )}
          </>
        ))}
      </div>
    </div>
  );
};

export default UserPanel;
