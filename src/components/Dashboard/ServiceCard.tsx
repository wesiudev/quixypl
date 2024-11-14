import { addDocument, updateUser } from "@/firebase";
import { setUser } from "@/redux/slices/user";
import { IProject } from "@/types";
import moment from "moment";
import Link from "next/link";
import { FaArrowRightLong } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import Viewer from "../AddJobOffer/Viewer";

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
  return (
    <div className="mt-4 block p-6 bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-zinc-800 dark:hover:bg-zinc-800">
      {/* Title with prominent visual hierarchy */}
      <h5 className="mb-3 text-3xl font-extrabold tracking-tight text-blue-500 dark:text-blue-400">
        {project.name}
      </h5>
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
      <div className="bg-white p-3 rounded-xl">
        <Viewer value={project?.desc} />
      </div>

      {/* Cost section with distinct styling */}
      <div className="flex flex-col my-2 text-md font-medium text-gray-900 dark:text-gray-100">
        {project?.isPaid ? (
          <div className="text-green-500">Opłacono</div>
        ) : (
          <button
            onClick={() => bid()}
            className="text-white bg-gradient-to-r from-primary to-cta p-2 rounded-bl-xl rounded-tr-xl"
          >
            Nie opłacono - kliknij by ponowić płatność
            <br />({project.price}💎)
          </button>
        )}
      </div>

      {/* Duration with icons for visual cues */}
      <p className="mb-2 text-md font-medium text-gray-900 dark:text-gray-100">
        <span className="text-sm font-bold text-indigo-600 dark:text-indigo-400">
          Dodano na:
        </span>{" "}
        {project.days} msc.
      </p>

      {/* Creation date */}
      <p className="mb-1 text-sm text-gray-600 dark:text-gray-400">
        <span className="font-bold">Data utworzenia:</span>{" "}
        {moment(project.creationTime).format("DD MMM YYYY")}
      </p>

      {/* Expiry date with subtle differentiation */}
      <p className="text-sm text-red-600 dark:text-red-400 font-semibold">
        Wygasa:{" "}
        {moment(project.creationTime)
          .add(project?.days, "months")
          .format("DD MMM YYYY")}
      </p>
      <Link
        href={`/dashboard/leads`}
        className="flex items-center gap-2 text-white font-extrabold bg-gradient-to-r from-primary to-cta w-max max-w-full p-1.5 mt-2 rounded-bl-xl rounded-tr-xl"
      >
        do sekcji leadów <FaArrowRightLong />
      </Link>
    </div>
  );
}
