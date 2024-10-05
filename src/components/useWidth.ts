"use client";
import { useState, useEffect } from "react";

/**
 * Returns an object with the innerWidth and innerHeight of the window.
 * @returns {{width: number, height: number}}
 */
function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
}

export default function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState({
    width: 0,
    height: 0,
  }); // <-- don't invoke here

  useEffect(() => {
    function handleResize() {
      if (typeof window !== "undefined") {
        setWindowDimensions(getWindowDimensions());
      }
    }

    handleResize(); // <-- invoke this on component mount
    if (typeof window !== "undefined") {
      window.addEventListener("resize", handleResize);
    }

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("resize", handleResize);
      }
    };
  }, []);

  return windowDimensions;
}
