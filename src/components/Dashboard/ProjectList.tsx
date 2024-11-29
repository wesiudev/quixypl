// ProjectList.js
import React from "react";
import ProjectCard from "./ProjectCard";
import { set_modals } from "@/redux/slices/modalsopen";
import { useDispatch, useSelector } from "react-redux";
import ServiceCard from "./ServiceCard";

const ServiceList = ({ projects }: { projects: any }) => {
  const { modals } = useSelector((state: any) => state.modals);
  const { user } = useSelector((state: any) => state.user);
  const dispatch = useDispatch();
  return (
    <div className="bg-white h-max w-full py-3 px-4 lg:px-6">
      <h2 className="w-full text-xl text-black font-extrabold">Twoje usługi</h2>
      {projects?.length === 0 ? (
        <div className="text-lg text-black">
          Nie dodano żadnych usług. Możesz tego dokonać{" "}
          <button
            onClick={() => dispatch(set_modals({ ...modals, config: true }))}
            className="text-cta font-bold"
          >
            klikając tutaj
          </button>
        </div>
      ) : (
        <div className="pt-3 px-3 grid grid-cols-1 gap-3">
          {projects?.map((project: any, i: any) => (
            <ServiceCard key={i} project={project} user={user} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ServiceList;
