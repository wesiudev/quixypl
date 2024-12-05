"use client";
import PortfolioItems from "@/components/Dashboard/Settings/SettingsInputs/PortfolioItems";
import Link from "next/link";
import { useState } from "react";
import { FaChevronLeft } from "react-icons/fa6";
import { useSelector } from "react-redux";
export default function NewService() {
  const [project, setProject] = useState<any>({
    images: [],
    days: 1,
    price: 24.41,
  });
  const [isUploading, setUploading] = useState(false);
  const [uploadCount, setUploadCount] = useState(0);
  const { user } = useSelector((state: any) => state.user);
  return (
    <div className="w-full min-h-screen bg-gray-600">
      {isUploading && (
        <div className="fixed left-0 top-0 z-[99999999999999999999999] h-screen w-screen flex justify-center items-center bg-[#202020]/50 text-xl text-white">
          <div className="flex flex-col items-center justify-center">
            Dodawanie plików... ({uploadCount})
          </div>
        </div>
      )}
      <div className="w-full justify-between bg-gradient-to-r from-primary to-cta py-3 px-6 text-white font-bold text-lg flex items-center">
        <Link href="/user" className="flex items-center">
          <FaChevronLeft className="mr-2 text-xl" />
          Powrót
        </Link>
        <div className="flex flex-col text-white pl-12">
          <h2 className="font-extrabold">Zarządzaj rynkiem</h2>
          <p className="text-xs font-coco">
            Opublikuj swoje usługi na platformie Quixy i pozyskuj zlecenia
          </p>
        </div>
      </div>
      <div className="flex items-center justify-center pb-12">
        <div className="bg-white rounded-b-xl p-3 lg:p-6 w-full lg:w-[40rem]">
          <PortfolioItems
            user={user}
            setProject={setProject}
            project={project}
            setUploading={setUploading}
            setUploadCount={setUploadCount}
          />
        </div>
      </div>
    </div>
  );
}
