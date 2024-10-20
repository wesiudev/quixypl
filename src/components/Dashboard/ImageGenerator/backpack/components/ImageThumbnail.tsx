"use client";
import Image from "next/image";
import React from "react";
import { FaImage } from "react-icons/fa";

interface BackpackThumbnail {
  image: any;
  setImageOpen: Function;
}

export default function BackpackImageThumbnail(props: BackpackThumbnail) {
  const [isLoading, setIsLoading] = React.useState(true);
  const { image, setImageOpen } = props;
  return (
    <button onClick={() => setImageOpen(image)} className="relative">
      <Image
        className={`select-none rounded-md ${
          isLoading ? "bg-[#126b91] animate-pulse" : ""
        }`}
        priority
        width={500}
        height={500}
        src={image?.src}
        alt=""
        blurDataURL="data:image/webp;base64,UklGRiIAAABXRUJQVlA4WAoAAAAQAAAfAADuwH/xAAfAQADAAQAAAAAAQAvAQADAAQAAAAAAQAvAQA"
        placeholder="blur"
        onLoad={() => setIsLoading(false)}
      />
      <div
        className={`rounded-md flex flex-col justify-center items-center w-full h-full ${
          isLoading ? "absolute h-12 w-12 text-white" : "hidden"
        }`}
      >
        <FaImage
          className={`rounded-md absolute left-[50%] -translate-x-[50%] top-[50%] -translate-y-[50%] h-12 w-12 text-white`}
        />
        <span className="pt-16 text-purple-200">Loading...</span>
      </div>
    </button>
  );
}
