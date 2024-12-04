// ProjectList.js
import React from "react";
import { useSelector } from "react-redux";
import ServiceCard from "./ServiceCard";
import { useRouter } from "next/navigation";

const ServiceList = ({ projects }: { projects: any }) => {
  const { user } = useSelector((state: any) => state.user);
  const router = useRouter();
  return (
    <div className="bg-white h-max w-full py-3">
      <h2 className="w-full text-2xl text-black font-extrabold">
        Twoje usługi
      </h2>
      {projects?.length === 0 ? (
        <div className="text-black pb-3 lg:pt-1">
          Nie dodano żadnych usług. Możesz dodać nową usługę{" "}
          <button
            onClick={() => router.push("/user/new_service")}
            className="text-cta font-bold"
          >
            tutaj
          </button>
        </div>
      ) : (
        <div className="pt-3 grid grid-cols-1 lg:grid-cols-2 gap-3">
          {projects?.map((project: any, i: any) => (
            <ServiceCard key={i} project={project} user={user} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ServiceList;
