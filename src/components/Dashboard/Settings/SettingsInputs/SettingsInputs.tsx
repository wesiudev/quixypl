"use client";
import { useState } from "react";
import { v4 as uuid } from "uuid";
import { storage, updateUser } from "@/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import ImagePicker from "./ImagePicker";
import TagsHandler from "../SettingsTagsHandler";
import PreferencesHandler from "../SettingsPreferencesHandler";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/slices/user";
import Image from "next/image";
import EssentialUserInfo from "./EssentialUserInfo";
import SettingsHeader from "./SettingsHeader";
import { toast } from "react-toastify";
import { FaImage } from "react-icons/fa";
import SetClientAccountType from "@/components/SetClientAccountType";
export default function UserEditDashboard({
  source,
  changesWereMade,
  setChangesWereMade,
  setSource,
  isFullscreen,
  setIsFullscreen,
  setError,
}: {
  source: any;
  changesWereMade: any;
  setChangesWereMade: any;
  setSource: any;
  isFullscreen: any;
  setIsFullscreen: any;
  setError: any;
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
  const [project, setProject] = useState<any>({ images: [] });
  async function uploadImages(files: any) {
    setUploadCount(files.length);
    setUploading(true);
    const localImagesArray: any = [];
    const uploadFile = async (file: any) => {
      const randId = uuid();
      const imageRef = ref(storage, randId);
      try {
        await uploadBytes(imageRef, file);
        const url = await getDownloadURL(imageRef);
        const data = {
          src: url,
        };
        localImagesArray.push(data);
      } catch (error) {
        return;
      }
    };
    const uploadPromises = files.map(uploadFile);
    try {
      await Promise.all(uploadPromises);
      const updatedImages = project?.images
        ? [...project?.images, ...localImagesArray]
        : localImagesArray;
      setProject({ ...project, images: updatedImages });
      setUploading(false);
    } catch (error) {
      setUploading(false);
      return;
    }
  }
  const [isImageDescriptionOpen, setImageDescriptionOpen] = useState(-1);
  return (
    <>
      {isUploading && (
        <div className="z-[500] flex items-center justify-center text-center sticky left-0 top-0 bg-black bg-opacity-75 w-full h-screen font-bold text-xl text-white">
          Dodawanie {uploadCount} obrazów...
        </div>
      )}
      <div className="relative">
        <SettingsHeader
          setIsFullscreen={setIsFullscreen}
          setError={setError}
          isFullscreen={isFullscreen}
          changesWereMade={changesWereMade}
        />
        {!source?.configured && (
          <ChooseAccountType
            source={source}
            setChangesWereMade={setChangesWereMade}
          />
        )}
        {source?.configured && source?.seek === "false" && (
          <SetClientAccountType
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
            {source?.seek === true && (
              <>
                <TagsHandler />
                <PreferencesHandler
                  addPreference={addPreference}
                  removePreference={removePreference}
                  source={source}
                />
                <div className="p-4 lg:p-6 bg-gray-200 mt-6 font-coco">
                  <div className="font-bold text-lg text-black font-gotham">
                    Projekty
                  </div>
                  <p className="text-sm text-[green] mb-2">
                    Brałeś/aś udział w jakichś projektach? Pochwal się tym swoim
                    portfolio. Możesz uwzględnić linki, obrazy i opis projektu.
                  </p>
                  {!isNewProject && (
                    <>
                      <button
                        onClick={() => {
                          setIsNewProject(true);
                        }}
                        className="bg-[#126b91] text-white p-2 rounded-md"
                      >
                        Dodaj projekt
                      </button>
                      {source?.projects?.map((project: any, i: number) => (
                        <div
                          key={i}
                          className="flex flex-row flex-wrap pb-4 bg-slate-300 mt-4 rounded-xl"
                        >
                          <div className="ml-3 mt-3">
                            {project?.images?.length > 0 && (
                              <Image
                                src={project?.images[0]?.src}
                                width={177}
                                height={100}
                                alt="image"
                                className="rounded-lg h-[100px] w-auto"
                              />
                            )}
                            {project?.images?.length === 0 && (
                              <div className="h-[100px] w-[177px] rounded-lg bg-slate-500 flex items-center justify-center">
                                <FaImage className="h-[50%] w-auto text-white" />
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </>
                  )}
                  {isNewProject && (
                    <button
                      onClick={() => {
                        setIsNewProject(false);
                      }}
                      className="hover:bg-red-400 bg-red-500 text-white p-2 rounded-md"
                    >
                      Anuluj
                    </button>
                  )}
                  {isNewProject && (
                    <>
                      <div className="p-6 lg:p-12 2xl:p-16 bg-white rounded-xl mt-3 font-coco">
                        <h1 className="text-black font-gotham font-light text-lg">
                          Dodajesz projekt do portfolio
                        </h1>
                        <div className="grid sm:grid-cols-2 gap-3">
                          <div>
                            <h3 className="font-gotham font-light  text-black drop-shadow-lg mt-1.5">
                              Nazwa
                            </h3>
                            <input
                              type="text"
                              value={project.name}
                              onChange={(e) =>
                                setProject({ ...project, name: e.target.value })
                              }
                              placeholder="Podaj nazwę projektu"
                              className="border border-primary rounded-md p-2 text-black  font-light w-full"
                            />
                          </div>
                          <div>
                            <h3 className="font-gotham font-light  text-black drop-shadow-lg mt-1.5">
                              Czas trwania
                            </h3>
                            <select
                              value={project.time}
                              onChange={(e) =>
                                setProject({ ...project, time: e.target.value })
                              }
                              className="border border-primary rounded-md p-2 text-black  font-light w-full"
                            >
                              <option value="Nie podano">
                                Ile trwał twój udział w projekcie?
                              </option>
                              <option value="1-3 mies.">1-3 mies.</option>
                              <option value="3-6 mies.">3-6 mies.</option>
                              <option value="6-12 mies.">6-12 mies.</option>
                              <option value="1-2 lata">1-2 lata</option>
                              <option value="2-4 lata">2-4 lata</option>
                              <option value="powyżej 4 lat">
                                powyżej 4 lat
                              </option>
                            </select>
                          </div>
                        </div>
                        <div>
                          <h3 className="font-gotham font-light  text-black drop-shadow-lg mt-1.5">
                            Stanowisko
                          </h3>
                          <textarea
                            cols={4}
                            rows={4}
                            maxLength={2000}
                            value={project.desc}
                            onChange={(e) =>
                              setProject({ ...project, desc: e.target.value })
                            }
                            placeholder="Jaka byla twoja rola w projekcie?"
                            className="border border-primary rounded-md p-2 text-black  font-light w-full"
                          />
                        </div>
                        <h3 className="font-gotham font-light text-black drop-shadow-lg mt-1.5 mb-3">
                          Zdjęcia projektu
                        </h3>
                        <div className="p-3 rounded-t-lg bg-slate-300 flex flex-col space-y-4">
                          {project?.images?.map((item: any, i: any) => (
                            <div key={i}>
                              <div className="relative flex flex-col">
                                <Image
                                  src={item?.src}
                                  width={1920}
                                  height={1920}
                                  alt="image"
                                  className="rounded-t-lg w-full h-auto border-[2px] border-primary"
                                />
                                {isImageDescriptionOpen === i && (
                                  <>
                                    <input
                                      type="text"
                                      value={project?.images[i]?.desc}
                                      placeholder="Co przedstawia obraz?"
                                      onChange={(e) => {
                                        setProject({
                                          ...project,
                                          images: project.images.map(
                                            (item: any, index: any) =>
                                              index === i
                                                ? {
                                                    ...item,
                                                    desc: e.target.value,
                                                  }
                                                : item
                                          ),
                                        });
                                      }}
                                      className="w-full border-x-[2px] border-primary text-black"
                                    />
                                    <button
                                      className="w-full py-2 rounded-b-xl bg-[#126b91] text-white"
                                      onClick={() => {
                                        setImageDescriptionOpen(-1);
                                        toast.success(
                                          "Pomyślnie dodano opis!",
                                          {
                                            position: "top-right",
                                            autoClose: 5000,
                                            hideProgressBar: false,
                                            closeOnClick: true,
                                            pauseOnHover: true,
                                          }
                                        );
                                      }}
                                    >
                                      Ok
                                    </button>
                                  </>
                                )}

                                {isImageDescriptionOpen !== i && (
                                  <button
                                    onClick={() => setImageDescriptionOpen(i)}
                                    className="w-full bg-[#126b91] rounded-b-lg text-white"
                                  >
                                    Opisz obraz
                                  </button>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                        <ImagePicker handler={uploadImages} user={source} />
                      </div>
                      <button
                        onClick={() => {
                          if (project.name && project.time && project.desc) {
                            updateUser(source.uid, {
                              ...source,
                              projects: source?.projects
                                ? [...source.projects, project]
                                : [project],
                            });
                            dispatch(
                              setUser({
                                ...source,
                                projects: source?.projects
                                  ? [...source.projects, project]
                                  : [project],
                              })
                            );
                            setIsNewProject(false);
                            setProject({
                              images: [],
                              desc: "",
                              name: "",
                              time: "",
                            });
                          } else {
                            toast.error("Uzupełnij wszystkie pola!", {
                              position: "top-right",
                              autoClose: 5000,
                              hideProgressBar: false,
                              closeOnClick: true,
                              pauseOnHover: true,
                              draggable: true,
                              progress: undefined,
                            });
                          }
                        }}
                        className="sticky bottom-0 w-full left-0 bg-green-500 text-white font-bold text-lg px-2 py-1.5 rounded-b-xl"
                      >
                        Zatwierdź projekt
                      </button>
                    </>
                  )}
                </div>
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
              className={`hover:bg-[#FFA50027] hover:shadow-sm hover:shadow-[#FFA500c5] duration-300 p-3 flex flex-col py-5 border-gray-300 border hover:border-[#FF8C00] ${
                !source?.seek &&
                source?.seek !== "ask" &&
                "bg-[#FFA50027] shadow-[#FFA500c5] shadow-sm border-[#FF8C00]"
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
                      "border-[10px] duration-75 border-[#FF8C00]"
                    } w-0 h-0 bg-[#FF8C00] rounded-full`}
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
              className={`hover:bg-[#FFA50027] hover:shadow-sm hover:shadow-[#FFA500c5] duration-300 p-3 flex flex-col py-5 border-gray-300 border hover:border-[#FF8C00] ${
                source?.seek === true &&
                source?.seek !== "ask" &&
                "bg-[#FFA50027] shadow-[#FFA500c5] shadow-sm border-[#FF8C00]"
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
                      "border-[10px] duration-75 border-[#FF8C00]"
                    } w-0 h-0 bg-[#FF8C00] rounded-full`}
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
