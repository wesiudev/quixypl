import {
  FaBriefcase,
  FaRocket,
  FaUserNinja,
  FaLightbulb,
  FaImages,
  FaDollarSign,
  FaUsers,
} from "react-icons/fa";
import Link from "next/link";
import { FaList } from "react-icons/fa6";

const UserPanel = ({ userData }: { userData: any }) => {
  const linksData = [
    {
      text: "Szukaj pracy",
      href: "/search?type=talent",
      icon: <FaBriefcase className="text-3xl" />,
    },
    {
      text: "Dodaj ofertę",
      href: "/dashboard/add_job_offer",
      icon: <FaRocket className="text-3xl" />,
    },
    {
      text: "Zatrudnij talent",
      href: "/search?type=client",
      icon: <FaUserNinja className="text-3xl" />,
    },
    {
      text: "Pomysły AI",
      href: "/dashboard/idea_generator",
      icon: <FaLightbulb className="text-3xl" />,
    },
    {
      text: "Obrazy AI",
      href: "/dashboard/image_generator",
      icon: <FaImages className="text-3xl" />,
    },
    {
      text: "Rynek",
      href: "/marketplace",
      icon: <FaDollarSign className="text-3xl" />,
    },
    {
      text: "Moje aplikacje",
      href: "/dashboard/applications",
      icon: <FaUsers className="text-3xl" />,
    },
    {
      text: "Moje oferty",
      href: "/dashboard/my_postings",
      icon: <FaList className="text-3xl" />,
    },
  ];
  return (
    <div>
      <div className="mb-3 mt-6 grid grid-cols-3 lg:grid-cols-4 md:grid-cols-6 2xl:grid-cols-8 gap-3 sm:p-3 rounded-xl sm:bg-white">
        {linksData.map((link, index) => (
          <Link
            key={index}
            className={`relative rounded-md p-12 w-full flex items-center flex-col h-full justify-center text-xs sm:text-sm font-gotham aspect-square sm:rounded-xl bg-gradient-to-br from-primary to-cta text-white hover:scale-105 duration-200`}
            href={link.href}
            rel="noopener noreferrer"
          >
            <div className="flex  flex-col items-center justify-center text-center">
              {link.icon}
              {link.text.toUpperCase()}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default UserPanel;
