import ServiceEditor from "@/components/Dashboard/Settings/SettingsInputs/ServiceEditor";
import Link from "next/link";
import { useState } from "react";
import { FaChevronLeft } from "react-icons/fa6";

export default function EditService({
  light,
  closeEdit,
  openedService,
  setOpenedService,
  user,
}: {
  light: any;
  closeEdit: any;
  openedService: any;
  setOpenedService: any;
  user: any;
}) {
  const [isUploading, setUploading] = useState(false);
  const [uploadCount, setUploadCount] = useState(0);
  return (
    <>
      <div className="font-sans relative overflow-hidden min-h-screen flex flex-col items-center mx-3 lg:mx-6 lg:ml-12 py-6">
        <div
          className={`${
            light ? "bg-white text-black" : "bg-[#222430] text-white"
          } rounded-lg w-full justify-between py-3 px-3 xl:px-6 font-bold text-lg flex items-center`}
        >
          <button onClick={closeEdit} className="flex items-center">
            <FaChevronLeft className="mr-2 text-xl" />
            Powrót
          </button>
          <div className="flex flex-col pl-12">
            <h2 className="font-extrabold">Edytuj usługę</h2>
            <p className="text-xs font-sans">Wprowadź zmiany i opublikuj</p>
          </div>
        </div>
        <div className="flex flex-col xl:flex-row-reverse w-full max-w-full mt-3">
          <div className="flex flex-col w-full">
            <div
              className={`${
                light ? "bg-white text-black" : "bg-[#222430] text-white"
              } flex items-center w-full rounded-lg mt-3 xl:mt-0`}
            >
              <div className="rounded-md z-50 relative p-3 xl:p-6 overflow-hidden">
                <h1 className="absolute left-0 top-0 rounded-tl-md rounded-br-3xl px-4 py-2 text-white bg-gradient-to-b from-primaryStart to-primaryEnd text-xl md:text-2xl font-gotham font-bold">
                  Edytujesz usługę
                </h1>
                <div className="flex flex-col w-full font-sans mt-10">
                  <ServiceEditor
                    user={user}
                    setUploading={setUploading}
                    setUploadCount={setUploadCount}
                    setProject={setOpenedService}
                    project={openedService}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
