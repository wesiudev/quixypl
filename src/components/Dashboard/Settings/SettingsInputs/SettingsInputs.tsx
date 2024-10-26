"use client";
import { useState } from "react";
import TagsHandler from "../SettingsTagsHandler";
import PreferencesHandler from "../SettingsPreferencesHandler";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/slices/user";
import Image from "next/image";
import EssentialUserInfo from "./EssentialUserInfo";
import SettingsHeader from "./SettingsHeader";
import PortfolioItems from "./PortfolioItems";

export default function UserEditDashboard({
  source,
  changesWereMade,
  setChangesWereMade,
  setSource,
  setError,
  scrollIntoView,
}: {
  source: any;
  changesWereMade: any;
  setChangesWereMade: any;
  setSource: any;
  setError: any;
  scrollIntoView: any;
}) {
  const dispatch = useDispatch();
  const [isNewProject, setIsNewProject] = useState(false);

  const addPreference = (preference: any) => {
    const newPreferences = source?.preferences
      ? [...source?.preferences, preference]
      : [preference];
    setSource({ ...source, preferences: newPreferences });
    dispatch(setUser({ ...source, preferences: newPreferences }));
    setChangesWereMade(true);
  };

  const removePreference = (preference: any) => {
    const newPreferences = source?.preferences.filter(
      (item: string) => item !== preference
    );
    setSource({ ...source, preferences: newPreferences });
    dispatch(setUser({ ...source, preferences: newPreferences }));
    setChangesWereMade(true);
  };
  const [isUploading, setUploading] = useState(false);
  const [uploadCount, setUploadCount] = useState();
  const [project, setProject] = useState<any>({
    images: [],
    days: 1,
    price: 24.41,
  });
  return (
    <>
      {isUploading && (
        <div className="z-[500] flex items-center justify-center text-center sticky left-0 top-0 bg-black bg-opacity-75 w-full h-screen font-bold text-xl text-white">
          Dodawanie {uploadCount} obrazów...
        </div>
      )}
      <div className="relative">
        <SettingsHeader
          setError={setError}
          changesWereMade={changesWereMade}
          user={source}
        />
        {!source?.configured && (
          <ChooseAccountType
            source={source}
            setChangesWereMade={setChangesWereMade}
          />
        )}
        {source?.configured && source?.seek !== "ask" && (
          <>
            <EssentialUserInfo
              source={source}
              setChangesWereMade={setChangesWereMade}
            />
            {source?.seek !== "ask" && (
              <>
                <TagsHandler />
                <PreferencesHandler
                  addPreference={addPreference}
                  removePreference={removePreference}
                  source={source}
                />
                <PortfolioItems
                  source={source}
                  isNewProject={isNewProject}
                  setIsNewProject={setIsNewProject}
                  scrollIntoView={scrollIntoView}
                  setProject={setProject}
                  project={project}
                  setUploading={setUploading}
                  setUploadCount={setUploadCount}
                />
              </>
            )}
          </>
        )}
      </div>
    </>
  );
}

const ChooseAccountType = (props: any) => {
  const dispatch = useDispatch();
  const { source, setChangesWereMade } = props;
  return (
    <div className={`relative w-full bg-white p-6 lg:p-12`}>
      <div className="flex flex-col">
        <div>
          <label className="text-lg font-semibold text-black ">
            Rodzaj konta
          </label>
          <p className="font-gotham font-light text-black">
            Twoje konto nie jest jeszcze w pełni skonfigurowane. Wybierz jaki
            rodzaj konta chcesz prowadzić.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-7 my-6">
            <button
              onClick={() => {
                dispatch(setUser({ ...source, seek: false }));
                setChangesWereMade(true);
              }}
              className={`hover:bg-opacity-80 hover:shadow-sm hover:shadow-primary duration-300 p-3 flex flex-col py-5 border-gray-300 border hover:border-primary ${
                !source?.seek &&
                source?.seek !== "ask" &&
                "bg-opacity-80 shadow-primary shadow-sm border-primary"
              }`}
            >
              <div className="flex flex-row justify-between items-start w-full">
                <Image
                  src="/assets/artist.png"
                  width={100}
                  height={100}
                  alt=""
                  className="w-12 h-12"
                />
                <div className="relative flex items-center justify-center border-gray-300 rounded-full h-5 w-5 border-[2px]">
                  <div
                    className={`${
                      (!source?.seek || source?.seek === "ask") &&
                      "border-[10px] duration-75 border-primary"
                    } w-0 h-0 bg-primary rounded-full`}
                  ></div>
                  <div
                    className={`${
                      (!source?.seek || source?.seek === "ask") &&
                      "border duration-75 border-white"
                    } w-2.5 h-2.5 rounded-full absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2`}
                  ></div>
                </div>
              </div>
              <span className="text-left font-gotham font-light text-black mt-4">
                Dołączam jako klient, chcę zatrudnić talent lub grupę
              </span>
            </button>

            <button
              onClick={() => {
                dispatch(setUser({ ...source, seek: true }));
                setChangesWereMade(true);
              }}
              className={`hover:bg-opacity-80 hover:shadow-sm hover:shadow-primary duration-300 p-3 flex flex-col py-5 border-gray-300 border hover:border-primary ${
                source?.seek === true &&
                source?.seek !== "ask" &&
                "bg-opacity-80 shadow-primary shadow-sm border-primary"
              }`}
            >
              <div className="flex flex-row justify-between items-start w-full">
                <Image
                  src="/assets/client.png"
                  width={100}
                  height={100}
                  alt=""
                  className="w-12 h-12"
                />
                <div className="relative flex items-center justify-center border-gray-300 rounded-full h-5 w-5 border-[2px]">
                  <div
                    className={`${
                      source?.seek === true &&
                      source?.seek !== "ask" &&
                      "border-[10px] duration-75 border-primary"
                    } w-0 h-0 bg-primary  rounded-full`}
                  ></div>
                  <div
                    className={`${
                      source?.seek === true &&
                      source?.seek !== "ask" &&
                      "border duration-75 border-white"
                    } w-2.5 h-2.5 rounded-full absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2`}
                  ></div>
                </div>
              </div>
              <span className="text-left font-gotham font-light text-black mt-4">
                Szukam pracy zdalnej, chcę realizować projekty sam lub w grupie
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
