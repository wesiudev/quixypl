"use client";
import { addJobOffer, updateJobOffer, updateUser } from "@/firebase";
import { set_modals } from "@/redux/slices/modalsopen";
import { setUser } from "@/redux/slices/user";
import { IProject, IProjectImage } from "@/types";
import moment from "moment";
import Image from "next/image";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import ProjectImages from "./ProjectImages";
import { copyToClipboard } from "@/lib/copyToClipboard";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ProjectCard({
  project,
  isSlug,
}: {
  project: IProject;
  isSlug?: boolean;
}) {
  const dispatch = useDispatch();
  const { user } = useSelector((state: any) => state.user);
  const { modals } = useSelector((state: any) => state.modals);
  const [currentIndex, setCurrentIndex] = useState(0);
  const router = useRouter();
  async function finishUpQuickOffer() {
    toast.success("Pomyślnie dodano ofertę!", {
      position: "top-right",
      autoClose: 5000,
    });

    const updatedUser = {
      ...user,
      tokens: user?.tokens - project?.price,
      projects: user?.projects.map((p: IProject) =>
        p.id === project.id ? { ...p, isPaid: true } : p
      ),
    };

    await updateUser(user?.uid, updatedUser);
    await addJobOffer({
      ...project,
      expirationTime: moment().add(project.days, "days").valueOf(),
      isPaid: true,
      isRecruitment: true,
      type: "quick",
      creationTime: Date.now(),
      companySize: user?.preferences[0] ?? "Brak danych...",
    }).then(() => {
      router.push("/dashboard/my_listings");
    });
  }

  async function bid() {
    if (user?.tokens < 4.99) {
      return toast.error("Niewystarczająca ilość Quixies", {
        position: "top-right",
        autoClose: 5000,
      });
    }

    const updatedTokens = user?.tokens - 4.99;
    const updatedProjects = user?.projects.map((p: IProject) =>
      p.id === project.id ? { ...p, extraDays: (p.extraDays || 0) + 1 } : p
    );

    await updateUser(user?.uid, {
      tokens: updatedTokens,
      projects: updatedProjects,
    });
    await updateJobOffer(project?.id, {
      ...project,
      extraDays: project?.extraDays || 0 + 1,
    });

    dispatch(
      setUser({ ...user, tokens: updatedTokens, projects: updatedProjects })
    );

    toast.success("Pomyślnie podbito ofertę", {
      position: "top-right",
      autoClose: 5000,
    });
  }

  return (
    <div className="pb-3 z-[99999999999]">
      <ProjectImages
        project={project}
        currentIndex={currentIndex}
        setCurrentIndex={setCurrentIndex}
      />
      <div
        className={`${
          !isSlug && "md:hover:bg-primary/30"
        } text-black mt-6 md:mt-0 ${
          !isSlug && "md:p-6 lg:p-12"
        } flex flex-row items-start  w-full relative`}
      >
        <div className="flex flex-col items-start justify-start text-left">
          <h2 className="font-coco bg-gradient-to-r from-primary to-cta p-3  text-white text-3xl">
            {project?.name}
          </h2>

          {!project?.isRecruitment && (
            <div className="p-2 sm:px-3">
              <div className="text-lg font-gotham">Link</div>
              {!project?.link ? (
                <div className="text-base font-gotham font-light">
                  Nie podano...
                </div>
              ) : (
                <button
                  onClick={() => {
                    copyToClipboard(project?.link);
                    toast.success(
                      `Pomyślnie skopiowano link ${project?.link} do schowka.`
                    );
                  }}
                  className="text-primary font-gotham hover:no-underline underline text-right"
                >
                  {project?.link}
                </button>
              )}
            </div>
          )}

          <div>
            {!project?.isRecruitment && (
              <div className="text-lg font-gotham">Czas trwania</div>
            )}
            {project?.isRecruitment && (
              <>
                <div className="text-sm font-gotham font-light mt-2">
                  Szczegóły oferty pracy
                </div>
                <div className="flex flex-col mt-3">
                  <b className="font-gotham">Typ rekrutacji</b>
                  <span className="font-light">
                    {project?.type === "quick"
                      ? "⚡Szybka Rekrutacja"
                      : "⭐Pełna Rekrutacja"}
                  </span>
                </div>
                <div className="text-lg font-gotham mt-3">Wynagrodzenie</div>
              </>
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

          <div className="mt-3 grid grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-2">
            {project?.images?.map((image: IProjectImage, i: number) => (
              <button
                onClick={() =>
                  dispatch(set_modals({ ...modals, isProjectOpen: true }))
                }
                key={i}
                className="w-full cursor-pointer bg-white"
              >
                <Image
                  src={image.src}
                  width={420}
                  height={420}
                  alt={image.desc || "zdjęcie projektu"}
                  className="w-max max-w-full bg-white"
                />
              </button>
            ))}
            {project?.isRecruitment && project?.isPaid && (
              <div className="flex flex-col font-gotham mt-1">
                <h2>Oferta pracy wygasa</h2>
                <div className="flex items-center">
                  {project?.expirationTime && (
                    <span
                      style={{
                        color:
                          moment(project?.expirationTime)
                            .add(project?.extraDays || 0, "days")
                            .diff(moment(), "days") <= 3
                            ? "red"
                            : moment(project?.expirationTime)
                                .add(project?.extraDays || 0, "days")
                                .diff(moment(), "days") <= 7
                            ? "blue"
                            : "green",
                      }}
                    >
                      {moment(project?.creationTime)
                        .add(project?.days, "days")
                        .add(project?.extraDays || 0, "days")
                        .format("DD.MM.YYYY hh:mm:ss")}
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>

          {project?.isRecruitment &&
            project?.isPaid &&
            user?.uid ===
            (
              <Link
                href="/dashboard/applications"
                className="mt-4 text-white bg-gradient-to-r from-primary to-cta py-0.5 px-2 "
              >
                Przeglądaj aplikacje
              </Link>
            )}

          {!project?.isPaid && !isSlug && (
            <button
              onClick={() => {
                if (project?.price > user?.tokens) {
                  dispatch(set_modals({ ...modals, quixies: true }));
                  toast.error("Brak wystarczającej ilości Quixies", {
                    position: "top-right",
                    autoClose: 5000,
                  });
                } else {
                  finishUpQuickOffer();
                }
              }}
              className="bg-cta text-white text-2xl p-3 font-gotham mt-4  hover:bg-opacity-80"
              style={{ textShadow: "2px 2px 2px black" }}
            >
              Opublikuj (💎{project?.price?.toFixed(2)})
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
