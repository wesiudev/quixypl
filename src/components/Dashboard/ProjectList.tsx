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
    <div className="bg-white h-max w-full py-3">
      <h2 className="w-full px-3 lg:px-6 text-2xl text-black font-bold drop-shadow-lg">
        Twoje usługi
      </h2>
      {projects?.length === 0 ? (
        <div className="text-lg text-black px-3 lg:px-6 pb-3 lg:pt-3">
          Nie dodano żadnych usług. Możesz tego dokonać{" "}
          <button
            onClick={() => dispatch(set_modals({ ...modals, config: true }))}
            className="text-cta font-bold"
          >
            klikając tutaj
          </button>
        </div>
      ) : (
        <div className="px-3 grid grid-cols-1">
          {projects?.map((project: any, i: any) => (
            <ServiceCard key={i} project={project} user={user} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ServiceList;
