"use client";
import { useEffect, useState } from "react";
import useWindowDimensions from "../useWidth";
import ProductsWide from "./ProductsWide";
import ProductsMobile from "./ProductsMobile";
import HeaderComponent from "./HeaderComponent";
import {
  FaFileSignature,
  FaList,
  FaPlus,
  FaRobot,
  FaUsers,
} from "react-icons/fa";
import { FaFileArrowUp } from "react-icons/fa6";
export const destinations = [
  {
    title: "FIRMA",
    href: "/o-firmie",
  },
  {
    title: "KONTAKT",
    href: "/kontakt",
  },
];

export default function Header({ jobsList }: { jobsList: any[] }) {
  const { width } = useWindowDimensions();
  const [helperNeeded, setHelperNeeded] = useState(true);
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
  return (
    <>
      {/* PRODUCTS TAB ON SHOWN HOVER -> xl devices */}

      <ProductsWide
        width={width}
        setHovered={setHovered}
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
        destinations={destinations}
        showHeader={showHeader}
        menuShow={menuShow}
        hovered={hovered}
        productsOpen={productsOpen}
        setProductsOpen={setProductsOpen}
        handleMouseEnter={handleMouseEnter}
        handleMouseLeave={handleMouseLeave}
        width={width}
        setHelperNeeded={setHelperNeeded}
        helperNeeded={helperNeeded}
        setMenuShow={setMenuShow}
        setHovered={setHovered}
      />
    </>
  );
}
const secondMenuItems = [
  {
    urlLabel: "Wygeneruj pomysł",
    url: "/register",
    color: "#A6BFFD",
    icon: FaRobot,
  },
  {
    urlLabel: "Dodaj ogłoszenie",
    url: "/register",
    color: "#F97316",
    icon: FaPlus,
  },
  {
    urlLabel: "Szukaj pracy",
    url: "/register",
    color: "#74B901",
    icon: FaUsers,
  },
  {
    urlLabel: "Przeglądaj zlecenia",
    url: "/register",
    color: "#F59BBB",
    icon: FaList,
  },
  {
    urlLabel: "Kup projekt",
    url: "/marketplace",
    color: "green",
    icon: FaFileSignature,
  },
  {
    urlLabel: "Sprzedaj projekt",
    url: "/marketplace",
    color: "red",
    icon: FaFileArrowUp,
  },
];
