"use client";
import { addJobOffer, updateUser } from "@/firebase";
import { IProject } from "@/types";
import moment from "moment";
import Image from "next/image";
import { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import ProjectImages from "./ProjectImages";

import { useRouter } from "next/navigation";
import Viewer from "@/components/AddJobOffer/Viewer";
import HireButton from "@/components/HireButton/HireButton";
import { polishToEnglish } from "../../../../../utils/polishToEnglish";
import Link from "next/link";

export default function ProjectCard({
  project,
  isSlug,
  slug,
}: {
  project: IProject;
  isSlug?: boolean;
  slug?: any;
}) {
  const { user } = useSelector((state: any) => state.user);
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
      router.push("/user/my_listings");
    });
  }

  return (
    <div
      className={`z-[99999999999] ${
        project.isPaid ? "" : "hidden"
      } bg-zinc-800 rounded-xl p-3 mt-3`}
    >
      <ProjectImages
        project={project}
        currentIndex={currentIndex}
        setCurrentIndex={setCurrentIndex}
      />
      <div className={`flex flex-row items-start w-full relative px-3 py-2`}>
        <div className="flex flex-col sm:flex-row gap-3">
          {project?.images?.length > 0 && (
            <Image
              src={project?.images[0].src}
              width={250}
              height={250}
              alt={project?.images[0].desc}
              className="rounded-xl w-auto sm:h-[250px]"
            />
          )}

          <div className="flex flex-col gap-2">
            <h5 className="mb-3 text-3xl font-extrabold tracking-tight text-blue-500 dark:text-blue-400">
              {project.name}
            </h5>
            <div className="flex items-center flex-wrap gap-2">
              {project?.tags?.map((tag: any, i: any) => (
                <Link
                  href={`/praca-zdalna/${polishToEnglish(
                    tag.slugTitle
                  )}/${polishToEnglish(tag.categoryTitle)}/${polishToEnglish(
                    tag.title
                  )}`}
                  target="_blank"
                  aria-label={tag.title}
                  key={i}
                  className="badge badge-neutral bg-gradient-to-r from-primary to-cta text-white"
                >
                  {tag.title}
                </Link>
              ))}
            </div>
            <p className="mb-2 text-md font-medium text-gray-900 dark:text-gray-100">
              <span className="text-sm font-bold text-indigo-600 dark:text-indigo-400">
                Typ wynagrodzenia:
              </span>{" "}
              {project.time}
            </p>
            <p className="mb-2 text-md font-medium text-gray-900 dark:text-gray-100">
              <span className="text-sm font-bold text-indigo-600 dark:text-indigo-400">
                Wynagrodzenie:
              </span>{" "}
              {project.salaryValue}
            </p>
            <p className="text-md font-medium text-gray-900 dark:text-gray-100 mb-2">
              <span className="text-sm font-bold text-indigo-600 dark:text-indigo-400">
                Czas wykonania:
              </span>{" "}
              {project.duration}
            </p>
            {isSlug && <HireButton talentSlugData={slug} />}
          </div>
        </div>
      </div>
      <div className="px-3">
        <div className="bg-white p-3 rounded-xl my-3">
          <Viewer value={project?.desc} />
        </div>
        <div className="gap-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 2xl:grid-cols-2">
          {project.images.map((image: any, i: any) => (
            <Image
              key={i}
              src={image.src}
              width={250}
              height={250}
              alt={image.desc}
              className={`${
                i > 0 ? "block" : "hidden"
              } rounded-xl w-full h-auto`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
