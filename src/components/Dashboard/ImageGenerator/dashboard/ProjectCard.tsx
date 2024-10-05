"use client";
import { IProject } from "@/types";
import Image from "next/image";

export default function ProjectCard({
  project,
  place,
}: {
  project: IProject;
  place: "slug" | "dashboard";
}) {
  return (
    <button className="hover:bg-slate-800 bg-white text-black hover:text-white p-3 flex flex-row items-start rounded-xl w-full relative">
      {project?.images[0]?.src && (
        <Image
          src={project?.images[0]?.src}
          width={224}
          height={224}
          alt=""
          className="bg-white w-[100px] sm:w-[125px] md:w-[150px] h-auto rounded-lg sticky top-[93px] lg:top-3"
        />
      )}
      <div className="px-3 flex flex-col items-start justify-start text-left">
        <h2 className="font-gotham text-xl sm:text-3xl lg:text-xl xl:text-3xl">
          {project?.name}
        </h2>
        <div className="p-3">
          <div className="text-lg  font-gotham">Czas trwania</div>
          <span className=" font-light">{project?.time}</span>
          <div className="text-lg  font-gotham mt-2">Rola w projekcie</div>
          <p className="max-w-lg font-gotham  font-light">{project?.desc}</p>
        </div>
      </div>
    </button>
  );
}
