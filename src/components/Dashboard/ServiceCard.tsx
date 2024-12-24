import { addDocument, updateUser } from "@/firebase";
import { setUser } from "@/redux/slices/user";
import { IProject } from "@/types";
import Link from "next/link";
import { FaArrowRightLong, FaCircleXmark } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Viewer from "../AddJobOffer/Viewer";
import Image from "next/image";
import ProjectImages from "./ImageGenerator/dashboard/ProjectImages";
import { useState } from "react";
import { set_modals } from "@/redux/slices/modalsopen";

export default function ServiceCard({
  project,
  user,
}: {
  project: IProject;
  user: any;
}) {
  const dispatch = useDispatch();
  async function bid() {
    if (user?.tokens < 10) {
      return toast.error("Niewystarczająca ilość Quixies", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
      });
    }
    const updatedTokens = user?.tokens - 10;
    const updatedProjects = user?.projects.map((p: IProject) =>
      p.id === project.id ? { ...p, isPaid: true } : p
    );
    await updateUser(user?.uid, {
      tokens: updatedTokens,
      projects: updatedProjects,
    });
    const uniqueId = Date.now().toString();
    await addDocument("services", uniqueId, {
      ...project,
      isPaid: true,
    });
    dispatch(
      setUser({ ...user, tokens: updatedTokens, projects: updatedProjects })
    );
    toast.success("Pomyślnie dodano usługę!", {
      position: "top-right",
      autoClose: 5000,
    });
  }
  const [currentIndex, setCurrentIndex] = useState(0);
  const { modals } = useSelector((state: any) => state.modals);
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <div className="block p-6 bg-gray-800 hover:bg-zinc-800 rounded-xl">
        <div className="flex flex-col sm:flex-row gap-3">
          <div>
            <h5 className="mb-3 text-3xl font-extrabold tracking-tight text-blue-500">
              {project.name}
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
            <div className="mt-2 gap-3 grid grid-cols-5">
              {project.images.map((image: any, i: any) => (
                <button
                  onClick={() => {
                    setCurrentIndex(i);
                    dispatch(set_modals({ ...modals, isProjectOpen: true }));
                    setIsOpen(true);
                  }}
                  key={i}
                >
                  <Image
                    src={image.src}
                    width={250}
                    height={250}
                    alt={image.desc || ""}
                    className="w-full h-auto rounded-md"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>

        <Link
          href={`/user/leads`}
          className="flex items-center gap-2 text-white font-extrabold bg-gradient-to-b from-accentStart to-accentEnd w-max max-w-full p-1.5 mt-3 rounded-lg"
        >
          Wszystkie zlecenia <FaArrowRightLong />
        </Link>
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
    </>
  );
}
