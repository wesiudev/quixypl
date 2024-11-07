"use client";
import { useEffect, useState } from "react";
import useWindowDimensions from "../useWidth";
import ProductsWide from "./ProductsWide";
import ProductsMobile from "./ProductsMobile";
import HeaderComponent from "./HeaderComponent";
import { FaFileSignature, FaImages, FaList, FaUsers } from "react-icons/fa";
import { IoSparkles } from "react-icons/io5";
import { FaFileArrowUp, FaLightbulb } from "react-icons/fa6";

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
    </>
  );
}
const secondMenuItems = [
  {
    urlLabel: "Wygeneruj pomysł",
    url: "/business-ideas",
    color: "#A6BFFD",
    icon: FaLightbulb,
  },
  {
    urlLabel: "Wygeneruj obraz",
    url: "/register",
    color: "#F97316",
    icon: FaImages,
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
    urlLabel: "Usługi w Quixy",
    url: "/marketplace",
    color: "#468CA9",
    icon: FaFileSignature,
  },
  {
    urlLabel: "Dodaj usługę",
    url: "/marketplace",
    color: "red",
    icon: FaFileArrowUp,
  },
];
