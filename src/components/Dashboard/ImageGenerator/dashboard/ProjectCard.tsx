"use client";
import { addJobOffer, updateUser } from "@/firebase";
import { set_modals } from "@/redux/slices/modalsopen";
import { IProject, IProjectImage } from "@/types";
import moment from "moment";
import Image from "next/image";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import ProjectImages from "./ProjectImages";

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

  return (
    <div className={`pb-3 z-[99999999999] ${project?.isPaid ? "" : "hidden"}`}>
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

          <div>
            <span className="font-light">{project?.time}</span>

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
          </div>
        </div>
      </div>
    </div>
  );
}
