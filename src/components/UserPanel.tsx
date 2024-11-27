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
      icon: <FaHome />,
    },
    {
      text: "Zlecenia i aplikacje",
      href: "/dashboard/leads",
      icon: <FaUsers />,
    },
    {
      text: "Znajdź pracę",
      href: "/dashboard/search?type=job",
      icon: <FaRocket />,
    },
    {
      text: "Znajdź Freelancera",
      href: "/dashboard/search?type=talent",
      icon: <FaUserNinja />,
    },
    {
      text: "Dodaj ofertę pracy",
      href: "/dashboard/add_job_offer",
      icon: <FaPlus />,
    },
    {
      text: "Twoje oferty pracy",
      href: "/dashboard/my-postings",
      icon: <FaList />,
    },
    {
      text: "Generator Obrazów",
      href: "/dashboard/image-generator",
      icon: <FaImages />,
    },
  ];
  return (
    <div className="px-6 pt-6">
      <div className="mb-3 pl-2 relative w-full bg-gradient-to-r from-primary to-cta text-white hover:from-cta hover:to-cta rounded-xl">
        <button
          onClick={() => dispatch(set_modals({ ...modals, config: true }))}
          className="w-full"
        >
          <div className="flex items-center relative py-3">
            <div className="text-white mr-3">
              <FaUserNinja className="text-3xl" />
            </div>
            <div className="italic py-2 z-50 relative text-center text-3xl font-extrabold">
              MÓJ PROFIL
            </div>
          </div>
        </button>
      </div>

      <div className="gap-3 grid grid-cols-2">
        {linksData.map((link, index) => (
          <button
            key={index}
            className="bg-cta relative aspect-square text-white text-center rounded-xl"
            onClick={() => {
              router.push(link.href);
              dispatch(set_modals({ ...modals, config: false }));
            }}
            rel="noopener noreferrer"
          >
            {index === 1 && (
              <div className="absolute top-3 left-3 text-white font-extralight text-xl font-coco">
                Leads
              </div>
            )}
            {index === 2 && (
              <div className="absolute top-3 left-3 text-white font-extralight text-xl font-coco">
                Remote
              </div>
            )}
            {index === 6 && (
              <div className="absolute top-3 left-3 text-white font-extralight text-xl font-coco">
                AI
              </div>
            )}
            {index === 7 && (
              <div className="absolute top-3 left-3 text-white font-extralight text-xl font-coco">
                AI
              </div>
            )}
            <div className="flex-col flex items-center justify-center relative px-3">
              <div className="text-5xl">{link.icon}</div>
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
