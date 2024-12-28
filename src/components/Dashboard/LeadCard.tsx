import Link from "next/link";
import ProjectImages from "./ImageGenerator/dashboard/ProjectImages";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import Viewer from "../AddJobOffer/Viewer";
import { set_modals } from "@/redux/slices/modalsopen";

export default function LeadCard({ project }: { project: any }) {
  const dispatch = useDispatch();

  const [currentIndex, setCurrentIndex] = useState(0);
  const { modals } = useSelector((state: any) => state.modals);
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <div className="block p-6 bg-gray-800 rounded-md">
        <div className="flex flex-col gap-3">
          <div>
            <h5 className="mb-3 text-3xl font-extrabold tracking-tight text-blue-500">
              {project.name.charAt(0).toUpperCase() + project.name.slice(1)}
            </h5>
            <p className="mb-2 text-white">
              <span className="text-sm font-bold text-white">Płatność:</span>{" "}
              {project.time}
            </p>
            <p className="mb-2 text-white">
              <span className="text-sm font-bold text-white">Cena:</span>{" "}
              {project.salaryValue}
            </p>
            <p className="mb-2 text-white">
              <span className="text-sm font-bold text-white">
                Czas wykonania:
              </span>{" "}
              {project.duration}
            </p>
            <div className="bg-white p-2 my-3 rounded-md">
              <Viewer value={project?.desc} />
            </div>
            <Link
              className="text-white px-[1rem] py-[0.5rem] bg-gradient-to-r from-ctaStart to-primaryStart rounded-md my-2 block w-max "
              href={`/${project?.userType}/${project?.pseudo}`}
            >
              Kontakt
            </Link>

            <div className="mt-2 gap-3 grid grid-cols-2 w-full">
              {project.images.map((image: any, i: any) => (
                <button
                  onClick={() => {
                    setCurrentIndex(i);
                    dispatch(set_modals({ ...modals, isProjectOpen: true }));
                    setIsOpen(true);
                  }}
                  key={i}
                  className="relative aspect-square w-full"
                >
                  <Image
                    src={image.src}
                    width={250}
                    height={250}
                    alt={image?.desc || "Obraz usługi"}
                    className="w-full h-full rounded-md absolute inset-0 object-cover group-hover:scale-110 duration-500"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div
        className={`fixed left-0 top-0 ${isOpen ? "block" : "hidden"} z-[9999]`}
      >
        <ProjectImages
          project={project}
          currentIndex={currentIndex}
          setCurrentIndex={setCurrentIndex}
          setIsOpen={setIsOpen}
        />
      </div>
    </div>
  );
}
