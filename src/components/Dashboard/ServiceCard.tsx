import { IProject } from "@/types";
import moment from "moment";
import Link from "next/link";

export default function ServiceCard({ project }: { project: IProject }) {
  return (
    <Link href={`/dashboard/my_listings/${project.id}`}>
      <a className="block p-6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-zinc-800 dark:hover:bg-zinc-800">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {project.name}
        </h5>
        <p className="font-bold text-zinc-800">{project.desc}</p>
        <p className="font-bold text-zinc-800">Cena: {project.price}zł</p>
        <p className="font-bold text-zinc-800">
          Szacowany czas realizacji: {project.days} dni
        </p>
        <p className="font-bold text-zinc-800">
          Data utworzenia: {moment(project.creationTime).format("DD MMM YYYY")}
        </p>
      </a>
    </Link>
  );
}
