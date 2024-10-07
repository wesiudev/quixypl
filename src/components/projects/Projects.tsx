"use client";
import { IProject } from "@/types";
import { useState } from "react";

export default function Projects({ projects }: { projects: IProject[] }) {
  const [projectOpen, setProjectOpen] = useState<any>(false);

  return (
    <div>
      {/* <ProjectCard project={} /> */}
      {projectOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 p-4">
          <div className="bg-white p-4 rounded-lg">
            <h2 className="text-2xl">{projectOpen.name}</h2>
            <p>{projectOpen.desc}</p>
            <p>Czas trwania: {projectOpen.time}</p>
            <p>Rola w projekcie: {projectOpen.role}</p>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-lg"
              onClick={() => setProjectOpen(false)}
            >
              Zamknij
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
