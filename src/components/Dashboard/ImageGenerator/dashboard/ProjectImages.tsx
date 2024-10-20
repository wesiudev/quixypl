"use client";
import { IProject, IProjectImage } from "@/types";
import Image from "next/image";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { set_modals } from "@/redux/slices/modalsopen";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";

export default function ProjectImages({
  project,
  currentIndex,
  setCurrentIndex,
}: {
  project: IProject;
  currentIndex: number;
  setCurrentIndex: Function;
}) {
  const [touchStart, setTouchStart] = useState({ x: 0, y: 0 });
  const [touchEnd, setTouchEnd] = useState({ x: 0, y: 0 });

  const onTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    setTouchStart({ x: touch.clientX, y: touch.clientY });
  };

  const onTouchMove = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    setTouchEnd({ x: touch.clientX, y: touch.clientY });
  };

  const onTouchEnd = () => {
    const deltaX = touchStart.x - touchEnd.x;
    const deltaY = touchStart.y - touchEnd.y;

    if (Math.abs(deltaX) > 50 && Math.abs(deltaY) < 50) {
      if (deltaX > 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }

    setTouchStart({ x: 0, y: 0 });
    setTouchEnd({ x: 0, y: 0 });
  };

  function handleNext() {
    setCurrentIndex(
      currentIndex + 1 === project.images.length ? 0 : currentIndex + 1
    );
  }

  function handlePrev() {
    setCurrentIndex(
      currentIndex === 0 ? project.images.length - 1 : currentIndex - 1
    );
  }

  const { modals } = useSelector((state: any) => state.modals);
  const dispatch = useDispatch();

  return (
    <>
      {modals.isProjectOpen && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-75 z-[99999999999999999999999999999999999]">
          <button
            onClick={() =>
              dispatch(set_modals({ ...modals, isProjectOpen: false }))
            }
            className="absolute top-4 right-4 text-white text-2xl"
          >
            ✕
          </button>
          <div className="container fixed flex items-center justify-center top-1/2 -translate-y-1/2 z-[9999999999999999999999999999] mx-auto p-4">
            <div className="relative h-max max-h-[80%] w-full sm:w-3/5 lg:w-3/4 group">
              {project.images.map((image: IProjectImage, i: number) => (
                <div
                  onTouchStart={onTouchStart}
                  onTouchMove={onTouchMove}
                  onTouchEnd={onTouchEnd}
                  className={`w-full ${
                    i === 0 ? "top-16" : "left-0 top-0 absolute"
                  } ${
                    currentIndex === i
                      ? "opacity-100 duration-500"
                      : "opacity-0 duration-150"
                  }`}
                  key={i}
                >
                  <Image
                    src={image.src}
                    width={1024}
                    height={1024}
                    alt={image.desc}
                    className="h-full w-auto"
                  />
                  <h1 className="text-4xl font-bold text-white">
                    {image.desc}
                  </h1>
                </div>
              ))}
              <div className="sm:hidden sm:group-hover:block w-max mx-auto absolute left-0 top-0 bg-gradient-to-r from-primary to-cta text-white font-coco px-4 py-2">
                {currentIndex + 1} / {project.images.length}
              </div>
              <button
                onClick={() => handlePrev()}
                className="opacity-0 sm:opacity-100 sm:hidden sm:group-hover:block bg-gradient-to-r from-primary to-cta text-white text-lg p-3 absolute left-0 top-1/2 -translate-y-1/2"
              >
                <FaChevronLeft />
              </button>
              <button
                onClick={() => handleNext()}
                className="opacity-0 sm:opacity-100 sm:hidden sm:group-hover:block bg-gradient-to-r from-primary to-cta text-white text-lg p-3 absolute right-[42px] top-1/2 -translate-y-1/2"
              >
                <FaChevronRight />
              </button>
              {project.images && (
                <div className="max-w-full overflow-x-auto whitespace-nowrap space-x-2 pt-2 group-hover:bg-black/50 px-3 scrollbar-thin scrollbar-thumb-gray-700">
                  {project.images.map((image: IProjectImage, i: number) => (
                    <button
                      onClick={() => setCurrentIndex(i)}
                      key={i}
                      className={`relative h-[50px] w-auto border-2 ${
                        currentIndex === i
                          ? "border-white"
                          : "border-transparent"
                      }`}
                    >
                      <Image
                        src={image.src}
                        width={300}
                        height={300}
                        alt={image.desc}
                        className="h-full w-auto"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
