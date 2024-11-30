"use client";
import PortfolioItems from "@/components/Dashboard/Settings/SettingsInputs/PortfolioItems";
import Link from "next/link";
import { useState } from "react";
import { FaChevronLeft } from "react-icons/fa6";
import { useSelector } from "react-redux";
export const dynamic = "force-dynamic";
export default function Page() {
  const [project, setProject] = useState<any>({
    images: [],
    days: 1,
    price: 24.41,
  });
  const [isUploading, setUploading] = useState(false);
  const [uploadCount, setUploadCount] = useState();
  const { user } = useSelector((state: any) => state.user);
  return (
    <div className="w-full min-h-screen bg-gray-600">
      <div className="w-full justify-between bg-gradient-to-r from-primary to-cta py-3 px-6 text-white font-bold text-lg flex items-center">
        <Link href="/user" className="flex items-center">
          <FaChevronLeft className="mr-2 text-xl" />
          Powrót
        </Link>
        <div className="flex flex-col text-white pl-12">
          <h2 className="font-extrabold">Sekcja Leadów</h2>
          <p className="text-xs font-coco">
            Znajdziesz tutaj wszystkie swoje leady, zlecenia oraz kandydatów.
          </p>
        </div>
      </div>
      <div className="flex items-center justify-center py-12">
        <div className="bg-white rounded-xl p-3 lg:p-6 w-full lg:w-[40rem]">
          <PortfolioItems
            source={user}
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
