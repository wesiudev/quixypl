import Image from "next/image";
import Link from "next/link";
import { FaChevronDown } from "react-icons/fa";
export default function HeaderComponent({
  destinations,
  showHeader,
  menuShow,
  hovered,
  productsOpen,
  setProductsOpen,
  handleMouseEnter,
  handleMouseLeave,
  width,
  setHelperNeeded,
  helperNeeded,
  setMenuShow,
  setHovered,
}: {
  destinations: any;
  showHeader: boolean;
  menuShow: boolean;
  hovered: string;
  productsOpen: boolean;
  setProductsOpen: Function;
  handleMouseEnter: Function;
  handleMouseLeave: Function;
  width: number;
  setHelperNeeded: Function;
  helperNeeded: boolean;
  setMenuShow: Function;
  setHovered: Function;
}) {
  return (
    <div
      style={{ boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)" }}
      className={`z-[500] sticky top-0 left-0 bg-white flex flex-row items-center w-full px-3 lg:px-12 ${
        showHeader || menuShow || hovered || productsOpen
          ? "-translate-y-0"
          : "-translate-y-[100%]"
      } duration-300 font-coco`}
    >
      {/* Header Content */}
      <div className="flex w-full items-center justify-between">
        <div className="flex items-center">
          <div className={`scale-[0.85] mr-1 w-max h-full group lg:hidden`}>
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
              title="Burger menu"
              className={`${
                (menuShow || productsOpen) && "opened"
              } w-max text-sm sm:text-base drop-shadow-sm duration-100 cursor-default font-bold`}
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
            title="Idź do Centrum Biznesu w Internecie Quixy"
            href="/"
            className="flex flex-col font-light w-[60px]"
          >
            <Image
              src="/assets/quixy-logo.png"
              width={224}
              height={224}
              alt="LOGO Centrum Biznesu w Internecie Quixy"
              className="w-full"
            />
          </Link>
        </div>
        <div className="lg:flex items-center w-full hidden">
          <div
            onMouseEnter={() => {
              width >= 1024 && handleMouseEnter("cat");
              setHelperNeeded(true);
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
              title="Lista specjalistów "
              className={`flex text-black items-center rounded-md ml-3 sm:ml-12 w-max py-[10px] px-[10px] drop-shadow-sm duration-500 cursor-default relative text-base`}
            >
              Praca zdalna
              <FaChevronDown
                className={`${
                  hovered === "cat" ? "rotate-180" : ""
                } ml-1 duration-200 font-light`}
              />
            </Link>{" "}
          </div>

          <Link
            href="/business-ideas"
            className="ml-3 text-base drop-shadow-sm shadow-black text-black "
          >
            Pomysły AI&trade;
          </Link>
          <Link
            href="/register"
            className="ml-3 text-base drop-shadow-sm shadow-black text-black "
          >
            Obrazy AI&trade;
          </Link>
          <Link
            href="/marketplace"
            className="ml-3 text-base drop-shadow-sm shadow-black text-black "
          >
            Rynek projektów&trade;
          </Link>
          <Link
            href="/about"
            className="ml-3 text-base drop-shadow-sm shadow-black text-black "
          >
            O nas
          </Link>
          <Link
            href="/contact"
            className="ml-3 text-base drop-shadow-sm shadow-black text-black "
          >
            Kontakt
          </Link>
        </div>
        <div className="w-max flex">
          <Link
            href="/register"
            className={`w-max ml-2 py-[2px] px-[10px] text-lg rounded-md bg-cta hover:bg-opacity-90 text-white drop-shadow-sm duration-100 cursor-default font-bold`}
          >
            Rejestracja
          </Link>{" "}
        </div>
      </div>
      <div className="flex flex-col items-end justify-center relative">
        {/* MENU SHOW SUSTAIN ON HOVER */}
        {hovered && helperNeeded && (
          <div
            onMouseEnter={() => {
              width >= 1280 && handleMouseEnter();
              setTimeout(() => {
                setHelperNeeded(false);
              }, 3500);
            }}
            className="absolute bottom-0 right-0 w-full h-[40%] z-[700] "
          ></div>
        )}
      </div>
    </div>
  );
}
