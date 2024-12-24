"use client";
import { useEffect, useState } from "react";
import useWindowDimensions from "../useWidth";
import dynamic from "next/dynamic";
const ProductsWide = dynamic(() => import("./ProductsWide"));
const ProductsMobile = dynamic(() => import("./ProductsMobile"));
const HeaderComponent = dynamic(() => import("./HeaderComponent"));
import { AiFillThunderbolt, AiOutlineLogin } from "react-icons/ai";
import { MdOutlineDesignServices } from "react-icons/md";
import { FiUsers } from "react-icons/fi";
import { FaStore } from "react-icons/fa6";
import { usePathname } from "next/navigation";
export default function Header({ jobsList }: { jobsList: any[] }) {
  const { width } = useWindowDimensions();
  const [hovered, setHovered] = useState("");
  const [productsOpen, setProductsOpen] = useState(false);
  const handleMouseEnter = (target: string) => {
    setHovered(target);
  };
  const handleMouseLeave = () => {
    setHovered("");
  };

  const [menuShow, setMenuShow] = useState(false);
  const [showHeader, setShowHeader] = useState(true);

  useEffect(() => {
    let previousScrollPosition = window.scrollY;

    const scrollListener = () => {
      const currentScrollPosition = window.scrollY;
      const isScrolledDown = previousScrollPosition < currentScrollPosition;
      previousScrollPosition = currentScrollPosition;

      setShowHeader(
        isScrolledDown && currentScrollPosition > 100 ? false : true
      );
    };

    window.addEventListener("scroll", scrollListener);

    return () => window.removeEventListener("scroll", scrollListener);
  }, []);
  const pathname = usePathname();
  return (
    <div className={`${pathname.includes("user") && "hidden"}`}>
      <ProductsWide
        width={width}
        setProductsOpen={setProductsOpen}
        jobs={jobsList}
        hovered={hovered}
        handleMouseLeave={handleMouseLeave}
        handleMouseEnter={handleMouseEnter}
        secondMenuItems={secondMenuItems}
      />
      {/* PRODUCTS TAB OPENED MOBILE */}
      <ProductsMobile
        jobs={jobsList}
        menuShow={menuShow}
        setProductsOpen={setProductsOpen}
        setMenuShow={setMenuShow}
        productsOpen={productsOpen}
        setHovered={setHovered}
        secondMenuItems={secondMenuItems}
      />
      {/* HEADER */}
      <HeaderComponent
        showHeader={showHeader}
        menuShow={menuShow}
        hovered={hovered}
        productsOpen={productsOpen}
        setProductsOpen={setProductsOpen}
        handleMouseEnter={handleMouseEnter}
        handleMouseLeave={handleMouseLeave}
        width={width}
        setMenuShow={setMenuShow}
      />
    </div>
  );
}
const secondMenuItems = [
  {
    urlLabel: "Rejestracja",
    url: "/register",
    color: "#14A800",
    icon: AiOutlineLogin,
  },
  {
    urlLabel: "Freelancerzy",
    url: "/praca-zdalna",
    color: "blue",
    icon: FiUsers,
  },
  {
    urlLabel: "Praca zdalna",
    url: "/praca-zdalna",
    color: "#F59BBB",
    icon: AiFillThunderbolt,
  },
  {
    urlLabel: "Marketplace",
    url: "/marketplace",
    color: "#468CA9",
    icon: FaStore,
  },
  {
    urlLabel: "Kreator Portfolio",
    url: "/register",
    color: "blue",
    icon: MdOutlineDesignServices,
  },
];
