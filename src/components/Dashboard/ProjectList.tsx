// ProjectList.js
import React from "react";
import { useSelector } from "react-redux";
import ServiceCard from "./ServiceCard";
import { useRouter } from "next/navigation";

const ServiceList = ({ projects }: { projects: any }) => {
  const { user } = useSelector((state: any) => state.user);
  const { light } = useSelector((state: any) => state.light);
  const router = useRouter();
  return (
    <div
      className={`duration-300 ${
        light ? "bg-white" : "bg-[#222430]"
      } h-max relative mt-6 rounded-lg mx-3 lg:mx-6 lg:ml-12`}
    >
      <h2 className="px-[2.5rem] font-coco py-3 w-max rounded-tl-lg rounded-br-3xl bg-gradient-to-r text-white from-primaryStart to-primaryEnd">
        USŁUGI
      </h2>
      {!projects?.length ? (
        <div
          className={`${
            light ? "text-black" : "text-white"
          } p-[1.5rem] duration-300 font-sans`}
        >
          Nie dodano żadnych usług. Możesz dodać nową usługę{" "}
          <button
            onClick={() => router.push("/user/new_service")}
            className="text-blue-500 font-bold"
          >
            tutaj
          </button>
        </div>
      ) : (
        <div className="pt-3 grid grid-cols-1 lg:grid-cols-2 gap-3 mt-12">
          {projects?.map((project: any, i: any) => (
            <ServiceCard key={i} project={project} user={user} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ServiceList;
