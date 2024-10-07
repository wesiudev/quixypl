"use client";
import { IProject } from "@/types";
import Image from "next/image";
import { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

export default function ProjectCard({ project }: { project: IProject }) {
  const [projectImages, setProjectImages] = useState<any>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  return (
    <>
      <button
        onClick={() => setProjectImages([])}
        className={`${
          projectImages?.length > 0 ? "scale-100" : "scale-0"
        } bg-black bg-opacity-80 duration-500 fixed w-screen h-screen left-0 top-0 z-[99999999999999999999] hover:bg-opacity-60`}
      ></button>
      {projectImages?.length > 0 && (
        <div>
          {projectImages?.map((item: any, i: any) => (
            <div
              key={i}
              className="w-max justify-center rotate-90 scale-110 sm:rotate-0 sm:scale-100 fixed left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 z-[99999999999999]"
            >
              <div className="relative w-max mx-auto max-w-[100%]">
                {item?.desc && (
                  <div
                    className={`${
                      currentIndex === i ? "opacity-100" : "opacity-0"
                    } flex flex-col absolute left-6 bottom-6 bg-primary text-white p-3 rounded-xl text-xl`}
                  >
                    <div className="font-gotham">{item?.desc}</div>
                  </div>
                )}
                <Image
                  src={item?.src}
                  width={1024}
                  height={1024}
                  alt={item?.desc}
                  className={`${
                    currentIndex === i
                      ? "opacity-100 duration-200"
                      : "opacity-0 duration-200"
                  } rounded-xl mx-auto`}
                />
                <div className="flex items-center space-x-4 mt-3 mx-auto w-full px-6 justify-between absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2">
                  <button
                    onClick={() =>
                      setCurrentIndex(
                        currentIndex > 0
                          ? currentIndex - 1
                          : projectImages.length - 1
                      )
                    }
                    className="bg-black bg-opacity-50 rounded-full p-3 text-white"
                  >
                    <FaChevronLeft className="text-3xl" />
                  </button>
                  <button
                    onClick={() =>
                      setCurrentIndex(
                        currentIndex < projectImages.length - 1
                          ? currentIndex + 1
                          : 0
                      )
                    }
                    className="bg-black bg-opacity-50 rounded-full p-3 text-white"
                  >
                    <FaChevronRight className="text-3xl" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      <div className="hover:bg-gray-300 text-black p-4 sm:p-8 xl:p-12 flex flex-row items-start rounded-xl w-full relative">
        {project?.images[0]?.src && (
          <Image
            style={{ boxShadow: "0px 0px 16px #334155" }}
            src={project?.images[0]?.src}
            width={224}
            height={224}
            alt={project?.images[0]?.desc || "Zdjęcie projektu"}
            className="bg-white w-[100px] sm:w-[125px] md:w-[150px] h-auto rounded-lg sticky top-[93px] lg:top-24"
          />
        )}
        <div className="px-3 flex flex-col items-start justify-start text-left">
          <h2 className="font-gotham text-3xl text-orange-500">
            {project?.name}
          </h2>
          <div className="p-3">
            <div className="text-lg font-gotham">Czas trwania</div>
            <span className=" font-light">{project?.time}</span>
            <div className="text-lg font-gotham mt-2">Rola w projekcie</div>
            <p className="max-w-lg font-gotham font-light">{project?.desc}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {project?.images?.map((image: any, i: any) => (
              <button
                onClick={() => {
                  setProjectImages(project?.images || []);
                  setCurrentIndex(i);
                }}
                key={i}
                className="relative"
              >
                <Image
                  style={{ boxShadow: "0px 0px 16px #334155" }}
                  src={image?.src}
                  width={1024}
                  height={1024}
                  alt={image?.desc || "zdjęcie projektu"}
                  className="rounded-xl"
                />
                {image?.desc && (
                  <div className="text-white bg-primary text-sm absolute left-0 bottom-0 max-w-[100%] w-max p-3 rounded-bl-xl rounded-tr-xl">
                    {image?.desc}
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
