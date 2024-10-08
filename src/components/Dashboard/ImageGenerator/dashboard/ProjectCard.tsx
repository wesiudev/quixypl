"use client";
import { addJobOffer, updateUser } from "@/firebase";
import { set_modals } from "@/redux/slices/modalsopen";
import { IProject, IProjectImage } from "@/types";
import moment from "moment";
import Image from "next/image";
import { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

export default function ProjectCard({ project }: { project: IProject }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [projectImages, setProjectImages] = useState([] as any);

  const handleImageClick = (index: number) => {
    setProjectImages(project?.images || []);
    setCurrentIndex(index);
  };
  const { user } = useSelector((state: any) => state.user);
  const dispatch = useDispatch();
  const { modals } = useSelector((state: any) => state.modals);
  async function finishUpQuickOffer() {
    toast.success("Pomyślnie dodano ofertę!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    updateUser(user?.uid, {
      ...user,
      tokens: user?.tokens - project?.price,
      projects: user?.projects.map((p: IProject) =>
        p.id === project.id ? { ...p, isPaid: true } : p
      ),
    }).then(() => {
      addJobOffer({
        ...project,
        expirationTime: Date.now() + project?.days * 24 * 60 * 60 * 1000,
        isPaid: true,
        isRecruitment: true,
        type: "quick",
        creationTime: Date.now(),
        companySize: user?.preferences[0]
          ? user?.preferences[0]
          : "Brak danych...",
      });
    });
  }
  return (
    <>
      {projectImages.length > 0 && (
        <div className="fixed w-screen h-screen left-0 top-0 z-[99999999999999999999]">
          <button
            onClick={() => setProjectImages([])}
            className="bg-black bg-opacity-80 hover:bg-opacity-60 duration-500 w-full h-full"
          ></button>
          {projectImages.map((item: IProjectImage, i: number) => (
            <div
              key={i}
              className="w-auto max-h-[90vh] justify-center rotate-90 scale-110 sm:rotate-0 sm:scale-100 fixed left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 z-[99999999999999]"
            >
              <div className="relative mx-auto w-[100%]">
                {item.desc && (
                  <div
                    className={`${
                      currentIndex === i ? "opacity-100" : "opacity-0"
                    } flex flex-col absolute left-6 top-6 bg-primary text-white p-3 rounded-xl text-xl`}
                  >
                    <div className="font-gotham">{item.desc}</div>
                  </div>
                )}
                <Image
                  src={item.src}
                  width={1024}
                  height={1024}
                  alt={item.desc || "zdjęcie projektu"}
                  className={`${
                    currentIndex === i
                      ? "opacity-100 duration-200"
                      : "opacity-0 duration-200"
                  } w-[100%] rounded-xl mx-auto bg-white`}
                />
                <button
                  onClick={() => setProjectImages([])}
                  className="absolute rounded-b-xl bottom-0 left-0 p-3 w-full bg-black text-white font-gotham text-xl z-[999999999999999]"
                >
                  Zamknij
                </button>
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
      <div className="hover:bg-gray-300 text-black p-2 sm:p-4 2xl:p-12 flex flex-row items-start rounded-xl w-full relative">
        {project?.images?.length > 0 && project?.images[0]?.src && (
          <Image
            src={project?.images[0]?.src}
            width={224}
            height={224}
            alt={project?.images[0]?.desc || "Zdjęcie projektu"}
            className="bg-white w-[100px] sm:w-[125px] md:w-[150px] h-auto rounded-lg border-2 border-primary sticky top-[93px] lg:top-24"
          />
        )}
        <div className="px-3 flex flex-col items-start justify-start text-left">
          <h2 className="font-gotham text-3xl text-primary">{project?.name}</h2>
          <div className="p-3">
            {!project?.isRecruitment && (
              <div className="text-lg font-gotham">Czas trwania</div>
            )}
            {project?.isRecruitment && (
              <div className="text-lg font-gotham">Szczegóły oferty pracy</div>
            )}
            {project?.isRecruitment && (
              <div className="flex flex-col mt-3">
                <b className="font-gotham">Typ rekrutacji</b>
                <span className="font-light">
                  {project?.type === "quick"
                    ? "⚡Szybka Rekrutacja"
                    : "⭐Pełna Rekrutacja"}
                </span>
              </div>
            )}
            {project?.isRecruitment && (
              <div className="font-light flex flex-col mt-3">
                <b className="font-gotham">Czas trwania</b>
                {project?.days} {project?.days === 1 ? "dzień" : "dni"}
              </div>
            )}
            {project?.isRecruitment && (
              <div className="text-lg font-gotham mt-3">Wynagrodzenie</div>
            )}
            <span className="font-light">{project?.time}</span>
            {!project?.isRecruitment && (
              <div className="text-lg font-gotham mt-2">Rola w projekcie</div>
            )}
            {project?.isRecruitment && (
              <div className="text-lg font-gotham mt-2">Opis stanowiska</div>
            )}
            <p className="max-w-lg font-gotham font-light">{project?.desc}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 2xl:grid-cols-2 gap-3">
            {project?.images?.map((image, i) => (
              <button
                onClick={() => handleImageClick(i)}
                key={i}
                className={`${i === 0 && "hidden"} relative`}
              >
                <Image
                  src={image.src}
                  width={224}
                  height={224}
                  alt={image.desc || "zdjęcie projektu"}
                  className="rounded-lg border-2 border-primary bg-white"
                />
                {image.desc && (
                  <div className="text-white bg-primary text-sm absolute left-0 bottom-0 max-w-[100%] w-max p-3 rounded-bl-xl rounded-tr-xl">
                    {image.desc}
                  </div>
                )}
              </button>
            ))}
            {project?.isRecruitment && project?.isPaid && (
              <div className="flex flex-col mt-3 font-gotham px-3">
                <h2>Oferta pracy ważna do</h2>
                {project?.expirationTime && (
                  <span>
                    {moment(project?.expirationTime).format("DD.MM.YYYY")}
                  </span>
                )}
              </div>
            )}
          </div>
          {project?.isRecruitment && !project?.isPaid && (
            <button
              onClick={() => {
                if (project?.price > user?.tokens) {
                  dispatch(set_modals({ ...modals, quixies: true }));
                  toast.error("Brak wystarczającej ilości Quixies", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                  });
                } else {
                  finishUpQuickOffer();
                }
              }}
              className="bg-cta text-white text-2xl p-3 font-gotham mt-4 rounded-xl hover:bg-opacity-80"
              style={{ textShadow: "2px 2px 2px black" }}
            >
              Opublikuj {project?.price?.toFixed(2)}💎
            </button>
          )}
        </div>
      </div>
    </>
  );
}
