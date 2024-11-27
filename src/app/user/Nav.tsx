"use client";
import Link from "next/link";
import {
  FaChevronDown,
  FaEdit,
  FaHome,
  FaShoppingCart,
  FaSignOutAlt,
  FaTag,
  FaUpload,
} from "react-icons/fa";
import { useState } from "react";
import Image from "next/image";
import { FaBriefcase, FaList, FaPlus } from "react-icons/fa6";
import { AiFillThunderbolt } from "react-icons/ai";
import { usePathname, useRouter } from "next/navigation";
import { set_modals } from "@/redux/slices/modalsopen";
import { useDispatch, useSelector } from "react-redux";
export default function Nav() {
  const [expandedItems, setExpandedItems] = useState([]);
  const router = useRouter();
  const navItems = [
    { title: "Przegląd", href: `/user`, icon: <FaHome /> },
    {
      title: "Moje Zlecenia",
      href: `/user/leads`,
      icon: <AiFillThunderbolt />,
    },
    {
      title: "Praca Zdalna",
      href: `/praca-zdalna`,
      expandable: true,
      icon: <FaBriefcase />,
      subItems: [
        {
          title: "Dodaj ogłoszenie",
          href: `/user/add_job_offer`,
          icon: <FaPlus />,
        },
        {
          title: "Moje ogłoszenia",
          href: `/user/my_postings`,
          icon: <FaList />,
        },
      ],
    },
    {
      expandable: true,
      title: "Usługi",
      href: ``,
      icon: <FaTag />,
      subItems: [
        {
          title: "Dodaj usługę",
          href: `/user/add_service`,
          icon: <FaUpload />,
        },
        {
          title: "Kopie robocze",
          href: `/admin/products/drafts`,
          icon: <FaEdit />,
        },
        {
          title: "Wszystkie produkty",
          href: `/admin/products`,
          icon: <FaShoppingCart />,
        },
      ],
    },
    {
      title: "Wyloguj",
      href: `/admin/logout`,
      icon: <FaSignOutAlt />,
    },
  ];
  const pathname = usePathname();
  const dispatch = useDispatch();
  const { modals } = useSelector((state: any) => state.modals);
  const { user } = useSelector((state: any) => state.user);
  return (
    <div className="fixed scrollbar !text-white">
      <div className="flex flex-col gap-12">
        <div className="flex flex-col justify-between h-screen w-[300px] border-r-[1px] border-[#303345] bg-[#222430]">
          <div>
            <div className="text-white py-4 px-3">
              <h1 className="text-base font-bold  flex flex-row items-center ">
                <Image
                  src="/favicons/favicon-32x32.png"
                  width={36}
                  height={36}
                  alt="Agencja Reklamowa W Grudziądzu Grudziądz"
                  className="w-8 h-8 mr-2"
                />
                Panel administracyjny
              </h1>
            </div>
            <div className="mt-4 px-2">
              <div className="mb-3 relative w-full bg-gradient-to-r from-primary to-cta text-white hover:from-cta hover:to-cta rounded-xl">
                <button
                  onClick={() =>
                    dispatch(set_modals({ ...modals, config: true }))
                  }
                  className="w-full"
                >
                  <div className="flex items-center relative py-3">
                    <div className="text-center italic z-50 relative w-full font-extrabold">
                      MÓJ PROFIL
                    </div>
                  </div>
                </button>
              </div>
            </div>
            <div className="mt-4">
              <ul className="flex flex-col flex-wrap justify-between w-full px-2">
                {navItems.map((item, index) => (
                  <li
                    key={index}
                    className={`w-full ${item.expandable ? "relative" : ""}  `}
                  >
                    <button
                      onClick={() => {
                        if (item.expandable) {
                          if (expandedItems.includes(index as never)) {
                            setExpandedItems(
                              expandedItems.filter((i) => i !== index)
                            );
                          } else {
                            setExpandedItems([
                              ...expandedItems,
                              index as never,
                            ]);
                          }
                        } else {
                          router.push(item.href);
                        }
                      }}
                      className={`${
                        pathname === item.href
                          ? "border-blue-500"
                          : "border-transparent hover:bg-[#2F313C]"
                      } border-l-2 ${
                        item.expandable ? "cursor-pointer" : ""
                      } flex items-center justify-between py-2 px-4  w-full  ${
                        expandedItems.includes(index as never) ? "" : ""
                      }`}
                    >
                      <div className="flex flex-row items-center">
                        <div className="mr-2">{item.icon}</div>
                        {item.title}
                      </div>
                      {item.expandable && (
                        <div
                          onClick={(event) => {
                            event.preventDefault();
                            event.stopPropagation();
                            if (item.expandable) {
                              if (expandedItems.includes(index as never)) {
                                setExpandedItems(
                                  expandedItems.filter((i) => i !== index)
                                );
                              } else {
                                setExpandedItems([
                                  ...expandedItems,
                                  index as never,
                                ]);
                              }
                            }
                          }}
                          className={`hover:bg-[#3B3D47] p-1 lg:p-2`}
                        >
                          <FaChevronDown
                            className={`duration-300 ${
                              expandedItems.includes(index as never)
                                ? "rotate-180"
                                : "rotate-0"
                            }`}
                          />
                        </div>
                      )}
                    </button>

                    {item.expandable &&
                      expandedItems.includes(index as never) && (
                        <ul className={`bg-[#222430]  py-2 px-4 w-full`}>
                          {item.subItems.map((subItem, subIndex) => (
                            <li key={subIndex}>
                              <button
                                onClick={() => {
                                  router.push(subItem.href);
                                }}
                                className={`flex items-center py-2 px-4  hover:bg-[#2F313C] w-full  ${
                                  subItem.href === pathname
                                    ? "border-blue-500 bg-[#2F313C]"
                                    : "border-transparent hover:bg-[#2F313C]"
                                } border-l-2`}
                              >
                                {subItem.icon}
                                <div className="ml-2">{subItem.title}</div>
                              </button>
                            </li>
                          ))}
                        </ul>
                      )}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex justify-start items-start">
              <button
                onClick={() =>
                  dispatch(set_modals({ ...modals, quixies: true }))
                }
                className=""
              >
                Sklep
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
