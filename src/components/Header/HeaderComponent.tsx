"use client";
import Image from "next/image";
import Link from "next/link";
import { FaChevronDown } from "react-icons/fa";
export default function HeaderComponent({
  showHeader,
  menuShow,
  hovered,
  productsOpen,
  setProductsOpen,
  handleMouseEnter,
  handleMouseLeave,
  width,
  setMenuShow,
}: {
  showHeader: boolean;
  menuShow: boolean;
  hovered: string;
  productsOpen: boolean;
  setProductsOpen: Function;
  handleMouseEnter: Function;
  handleMouseLeave: Function;
  width: number;
  setMenuShow: Function;
}) {
  return (
    <>
      <div className="w-full h-[65px] lg:h-[92px]"></div>
      <div
        style={{ boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)" }}
        className={`fixed left-0 top-0 z-[10000] px-4 bg-white flex flex-row items-center justify-center w-full ${
          showHeader || menuShow || hovered === "cat" || productsOpen
            ? "-translate-y-0"
            : "-translate-y-[100%]"
        } duration-300 font-coco`}
      >
        {/* Header Content */}
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center">
            <div className={`mr-1 w-max group lg:hidden`}>
              <button
                onClick={() => {
                  if (!menuShow) {
                    if (productsOpen) {
                      setProductsOpen(false);
                    } else {
                      setProductsOpen(true);
                    }
                  } else {
                    setProductsOpen(false);
                    setMenuShow(false);
                  }
                }}
                title="Menu z Pracą Zdalną"
                className={`${
                  (menuShow || productsOpen) && "opened"
                } flex items-center h-full w-max text-sm sm:text-base drop-shadow-sm duration-100 cursor-pointer font-bold`}
              >
                <svg width="65" height="65" viewBox="0 0 100 100">
                  <path
                    className="line line1"
                    d="M 20,29.000046 H 80.000231 C 80.000231,29.000046 94.498839,28.817352 94.532987,66.711331 94.543142,77.980673 90.966081,81.670246 85.259173,81.668997 79.552261,81.667751 75.000211,74.999942 75.000211,74.999942 L 25.000021,25.000058"
                  />
                  <path className="line line2" d="M 20,50 H 80" />
                  <path
                    className="line line3"
                    d="M 20,70.999954 H 80.000231 C 80.000231,70.999954 94.498839,71.182648 94.532987,33.288669 94.543142,22.019327 90.966081,18.329754 85.259173,18.331003 79.552261,18.332249 75.000211,25.000058 75.000211,25.000058 L 25.000021,74.999942"
                  />
                </svg>
              </button>
            </div>
            <Link
              title="Platforma internetowa pracy zdalnej Quixy"
              href="/"
              className="flex flex-col font-light w-[60px]"
            >
              <Image
                src="/assets/quixy-logo.png"
                width={224}
                height={224}
                alt="Poszukujesz pracy zdalnej?"
                title="Zajmij się pracą zdalną!"
                className="w-full"
              />
            </Link>
          </div>
          <div className="lg:flex items-center w-full hidden">
            <div
              onMouseEnter={() => {
                width >= 1024 && handleMouseEnter("cat");
              }}
              onMouseLeave={() => {
                width >= 1024 && handleMouseLeave();
              }}
              className={`w-max h-full py-5 group`}
            >
              <Link
                href="/praca-zdalna"
                onClick={() => {
                  setProductsOpen(true);
                  setMenuShow(false);
                }}
                title="Firmy, Freelancerzy, Oferty Pracy Zdalnej, Zlecenia, Usługi Quixy"
                className={`flex text-black items-center ml-3 sm:ml-12 w-max py-[10px] px-[10px] drop-shadow-sm duration-500 relative text-base cursor-pointer`}
              >
                <span
                  className={`relative z-50 ${
                    hovered === "cat" &&
                    "bg-gradient-to-r from-primaryHoverStart to-primaryHoverEnd text-white"
                  } rounded-md px-1.5 py-1`}
                >
                  Kategorie
                </span>
                <FaChevronDown
                  className={`${
                    hovered === "cat" ? "rotate-180" : ""
                  } ml-1 duration-200 font-light`}
                />
              </Link>
            </div>

            <Link
              href="/marketplace"
              className="rounded-md group text-base drop-shadow-sm shadow-black text-black px-2 py-1 bg-gradient-to-r hover:from-primaryHoverStart hover:to-primaryHoverEnd hover:text-white relative pr-6"
            >
              <span className="relative z-50">Rynek usług</span>
              <div className="group-hover:text-white absolute right-[4px] -top-[1px] px-1 rounded-full text-black text-[10px] font-extrabold">
                TM
              </div>
            </Link>
            <Link
              href="/about"
              className="rounded-md text-base drop-shadow-sm shadow-black text-black px-2 py-1 bg-gradient-to-r hover:from-primaryHoverStart hover:to-primaryHoverEnd hover:text-white "
            >
              O nas
            </Link>
            <Link
              href="/contact"
              className="rounded-md text-base drop-shadow-sm shadow-black text-black px-2 py-1 bg-gradient-to-r hover:from-primaryHoverStart hover:to-primaryHoverEnd hover:text-white "
            >
              Kontakt
            </Link>
            <Link
              href="/news"
              className="rounded-md text-base drop-shadow-sm shadow-black text-black px-2 py-1 bg-gradient-to-r hover:from-primaryHoverStart hover:to-primaryHoverEnd hover:text-white "
            >
              Aktualności
            </Link>
          </div>
          <Link
            href="/register"
            className={`py-[2px] px-[10px] text-lg  bg-gradient-to-r from-ctaStart to-ctaEnd rounded-md hover:bg-opacity-90 text-white cursor-pointer font-coco`}
          >
            Rejestracja
          </Link>
        </div>
      </div>
    </>
  );
}
