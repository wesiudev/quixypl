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
      href: "/dashboard",
      icon: <FaHome className="text-5xl" />,
    },
    {
      text: "Znajdź pracę",
      href: "/job_offers",
      icon: <FaRocket className="text-5xl" />,
    },
    {
      text: "Generator Obrazów",
      href: "/dashboard/image-generator",
      icon: <FaImages className="text-5xl" />,
    },
    // {
    //   text: "Rynek",
    //   href: "/marketplace",
    //   icon: <FaDollarSign className="text-5xl" />,
    // },
    {
      text: "Moje leady",
      href: "/dashboard/leads",
      icon: <FaUsers className="text-5xl" />,
    },
    {
      text: "Dodaj ofertę pracy",
      href: "/dashboard/add_job_offer",
      icon: <FaPlus className="text-5xl" />,
    },
    {
      text: "Moje oferty pracy",
      href: "/dashboard/my-postings",
      icon: <FaList className="text-5xl" />,
    },
    {
      text: "Szukaj Freelancerów",
      href: "/search?type=talent",
      icon: <FaUserNinja className="text-5xl" />,
    },
    {
      text: "Generator Biznesu",
      href: "/dashboard/idea-generator",
      icon: <FaLightbulb className="text-5xl" />,
    },
  ];
  return (
    <div>
      <div className={`w-full grid grid-cols-1 gap-1.5 z-50 px-6 pt-6`}>
        {linksData.map((link, index) => (
          <div key={index}>
            {index === 0 && (
              <div className="mb-12 pl-2 relative w-full bg-gradient-to-br from-zinc-800 via-purple-800 to-zinc-600 text-white hover:from-cta hover:to-cta rounded-xl">
                <button
                  onClick={() =>
                    dispatch(set_modals({ ...modals, config: true }))
                  }
                  className="w-full"
                >
                  <div className="flex items-center justify-center relative py-3">
                    <div className="text-white mr-3">
                      <FaUserNinja className="text-3xl" />
                    </div>
                    <div className="italic py-2 z-50 relative text-center text-3xl font-extrabold">
                      MÓJ PROFIL
                    </div>
                  </div>
                </button>
              </div>
            )}
            <button
              className={`pl-2 relative w-full font-gotham bg-gradient-to-br from-primary to-cta text-white hover:from-cta hover:to-cta rounded-xl`}
              onClick={() => {
                router.push(link.href);
              }}
              rel="noopener noreferrer"
            >
              <div className="flex items-center justify-center relative py-3">
                <div className="text-white mr-3 ">{link.icon}</div>
                <div className="italic py-2 z-50 relative text-center text-lg font-extrabold">
                  {link.text.toUpperCase()}
                </div>
              </div>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
