"use client";
import dynamic from "next/dynamic";
import Link from "next/link";
import { FaChevronDown, FaHome, FaPlusCircle, FaTag } from "react-icons/fa";
import { useState } from "react";
import {
  FaBriefcase,
  FaChevronLeft,
  FaCoins,
  FaLightbulb,
  FaList,
  FaPowerOff,
  FaUser,
} from "react-icons/fa6";
import { AiFillThunderbolt } from "react-icons/ai";
import { usePathname, useRouter } from "next/navigation";
import { set_modals } from "@/redux/slices/modalsopen";
import { useDispatch, useSelector } from "react-redux";
import { setLight } from "@/redux/slices/lightSlice";
import { signOut } from "firebase/auth";
import { auth } from "@/firebase";
import { setUser } from "@/redux/slices/user";
export default function Nav({
  isNavOpen,
  setNavOpen,
}: {
  isNavOpen: any;
  setNavOpen: any;
}) {
  const [expandedItems, setExpandedItems] = useState([]);
  const router = useRouter();
  const navItems = [
    { title: "Przegląd", href: `/user`, icon: <FaHome /> },
    {
      title: "Moje leady",
      href: `/user/leads`,
      icon: <AiFillThunderbolt />,
    },
    {
      title: "Praca zdalna",
      href: `/praca-zdalna`,
      expandable: true,
      icon: <FaBriefcase />,
      subItems: [
        {
          title: "Dodaj ofertę",
          href: `/user/add_job_offer`,
          icon: <FaPlusCircle />,
        },
        {
          title: "Moje ogłoszenia",
          href: `/user/job_offers`,
          icon: <FaList />,
        },
      ],
    },
    {
      expandable: true,
      title: "Rynek",
      href: ``,
      icon: <FaTag />,
      subItems: [
        {
          title: "Dodaj usługę",
          href: `/user/new_service`,
          icon: <FaPlusCircle />,
        },
        {
          title: "Moje usługi",
          href: `/user/services`,
          icon: <FaList />,
        },
      ],
    },
  ];
  const pathname = usePathname();
  const dispatch = useDispatch();
  const { modals } = useSelector((state: any) => state.modals);
  const { light } = useSelector((state: any) => state.light);
  function logout() {
    dispatch(setUser(""));
    signOut(auth).then(() => {
      router.push("/login");
    });
  }
  return (
    <>
      <div className="h-full">
        <div
          className={`z-[150] lg:py-6 lg:px-6 h-full fixed scrollbar ${
            light ? "text-black" : "text-white"
          } ${
            isNavOpen
              ? "translate-x-[0] duration-300"
              : "-translate-x-[300px] lg:-translate-x-0 duration-300"
          }`}
        >
          <div className="relative flex flex-col gap-12 h-full">
            <button
              onClick={() => setNavOpen(!isNavOpen)}
              className="lg:hidden absolute -right-[38px] w-[38px] h-[38px] top-1/2 -translate-y-1/2 rounded-r-lg bg-gradient-to-b from-accentStart to-accentEnd duration-200 text-white flex items-center justify-center"
            >
              <FaChevronLeft
                className={`lg:hidden text-xl ${
                  isNavOpen ? "rotate-0" : "rotate-180"
                }`}
              />
            </button>
            <div
              className={`relative flex flex-col justify-between h-full w-[300px] ${
                light ? "bg-white duration-150" : "bg-[#222430] duration-150"
              } lg:rounded-lg`}
            >
              <div className="absolute bottom-0 w-full left-0">
                <button
                  onClick={() => dispatch(setLight(!light))}
                  className={`${
                    light ? "bg-primaryEnd" : "bg-white"
                  } lg:rounded-bl-lg duration-300 rounded-tr-3xl w-16 h-16 flex items-center justify-center`}
                >
                  <FaLightbulb
                    className={`rotate-45 text-3xl ${
                      light ? "text-white" : "text-accentStart"
                    }`}
                  />
                </button>
              </div>
              <div>
                <Link
                  href="/"
                  className="text-lg font-sans font-bold flex flex-row items-center py-2 px-6 !text-white bg-gradient-to-b from-primaryStart to-primaryEnd rounded-br-3xl lg:rounded-tl-lg w-max max-w-full"
                >
                  <div className="">Panel administracyjny</div>
                </Link>

                <div className="mt-4 font-sans">
                  <div className="flex flex-col flex-wrap justify-between w-full px-4 gap-2">
                    {navItems.map((item, index) => (
                      <div
                        key={index}
                        className={`w-full ${
                          item.expandable ? "relative" : ""
                        }`}
                      >
                        {index === 1 && (
                          <button
                            onClick={() => {
                              dispatch(
                                set_modals({
                                  ...modals,
                                  quixies: false,
                                  config: !modals.config,
                                })
                              );
                              setNavOpen(!isNavOpen);
                            }}
                            className={`${
                              modals.config
                                ? `border-primaryStart ${
                                    light ? "bg-gray-200" : "bg-[#2F313C]"
                                  }`
                                : `border-transparent ${
                                    light
                                      ? "hover:bg-gray-200"
                                      : "hover:bg-[#2F313C]"
                                  }  `
                            } border-l-2 mb-2 flex items-center py-2 px-4 w-full rounded-md`}
                          >
                            <FaUser className="mr-2" />
                            Portfolio
                          </button>
                        )}
                        {index === 1 && (
                          <button
                            onClick={() => {
                              dispatch(
                                set_modals({
                                  ...modals,
                                  quixies: !modals.quixies,
                                  config: false,
                                })
                              );
                              setNavOpen(!isNavOpen);
                            }}
                            className={`${
                              modals.quixies
                                ? `border-primaryStart ${
                                    light ? "bg-gray-200" : "bg-[#2F313C]"
                                  }`
                                : `border-transparent ${
                                    light
                                      ? "hover:bg-gray-200"
                                      : "hover:bg-[#2F313C]"
                                  }`
                            } border-l-2 mb-2 flex items-center py-2 px-4 w-full rounded-md`}
                          >
                            <FaCoins className="mr-2" />
                            Sklep
                          </button>
                        )}

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
                              setNavOpen(!isNavOpen);
                            }
                          }}
                          className={`${
                            pathname === item.href
                              ? `${
                                  light ? "bg-gray-200" : "bg-[#2F313C]"
                                } border-primaryStart`
                              : `${
                                  light
                                    ? "hover:bg-gray-200"
                                    : "hover:bg-[#2F313C]"
                                } border-transparent`
                          } border-l-2 ${
                            item.expandable ? "cursor-pointer" : ""
                          } ${
                            expandedItems.includes(index as never) &&
                            `${
                              light
                                ? "bg-gray-200 hover:bg-gray-200"
                                : "bg-[#2F313C] hover:bg-[#3B3D47]"
                            }`
                          } flex items-center justify-between py-2 px-4 w-full rounded-md`}
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
                              className={`${
                                light
                                  ? "lg:hover:bg-gray-200"
                                  : "hover:bg-[#3B3D47]"
                              } rounded-md p-1`}
                            >
                              <FaChevronDown
                                className={`duration-150 ${
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
                            <div
                              className={`py-2 px-4 w-full gap-2 flex flex-col`}
                            >
                              {item.subItems.map((subItem, subIndex) => (
                                <div key={subIndex}>
                                  <button
                                    onClick={() => {
                                      router.push(subItem.href);
                                      setNavOpen(!isNavOpen);
                                    }}
                                    className={`flex items-center py-2 px-4 w-full ${
                                      subItem.href === pathname
                                        ? `border-primaryStart ${
                                            light
                                              ? "bg-gray-200"
                                              : "bg-[#2F313C]"
                                          }`
                                        : `border-transparent ${
                                            light
                                              ? "hover:bg-gray-200"
                                              : "hover:bg-[#2F313C]"
                                          }`
                                    } border-l-2 rounded-md`}
                                  >
                                    {subItem.icon}
                                    <div className="ml-2">{subItem.title}</div>
                                  </button>
                                </div>
                              ))}
                            </div>
                          )}
                        {index + 1 === navItems.length && (
                          <button
                            onClick={() => {
                              logout();
                              setNavOpen(!isNavOpen);
                            }}
                            className={`mt-2 ${
                              modals.quixies
                                ? `border-primaryStart ${
                                    light ? "bg-gray-200" : "bg-[#2F313C]"
                                  }`
                                : `border-transparent ${
                                    light
                                      ? "hover:bg-gray-200"
                                      : "hover:bg-[#2F313C]"
                                  }`
                            } border-l-2 mb-2 flex items-center py-2 px-4 w-full rounded-md`}
                          >
                            <FaPowerOff className="mr-2" />
                            Wyloguj
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
