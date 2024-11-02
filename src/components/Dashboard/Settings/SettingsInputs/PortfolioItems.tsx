import {
  FaChevronLeft,
  FaChevronRight,
  FaMinusCircle,
  FaPlus,
  FaTimes,
} from "react-icons/fa";
import { polishToEnglish } from "../../../../../utils/polishToEnglish";
import jobs from "../../../../../public/14.09.2024.json";
import { toast } from "react-toastify";
import Image from "next/image";
import { setUser } from "@/redux/slices/user";
import ImagePicker from "./ImagePicker";
import { useDispatch, useSelector } from "react-redux";
import { set_modals } from "@/redux/slices/modalsopen";
import { IProject } from "@/types";
import moment from "moment";
import { useState } from "react";
import { v4 as uuid } from "uuid";
import { addJobOffer, storage, updateUser } from "@/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { InputField } from "@/components/AddJobOffer/InputField";
export default function PortfolioItems({
  source,
  isNewProject,
  setIsNewProject,
  scrollIntoView,
  project,
  setProject,
  setUploading,
  setUploadCount,
}: {
  source: any;
  isNewProject: any;
  setIsNewProject: any;
  scrollIntoView: any;
  project: any;
  setProject: any;
  setUploading: any;
  setUploadCount: any;
}) {
  const [configurationOpen, setConfigurationOpen] = useState(false);
  const [slug, setSlug] = useState({ title: "", url: "" });
  const [category, setCategory] = useState({ title: "", url: "" });
  const [tagsOpenLevel, setTagsOpenLevel] = useState(0);
  const [tagDeletion, setTagDeletion] = useState(false);
  const [selectedTag, setSelectedTag] = useState<any>({});
  const [isImageDescriptionOpen, setImageDescriptionOpen] = useState(-1);
  const { modals } = useSelector((state: any) => state.modals);
  const dispatch = useDispatch();

  // Helper function to proceed with the project update
  const proceedWithProjectUpdate = async (isPaid: boolean) => {
    const jobOfferId = uuid();
    const updatedProjects = updateProjectsList(source.projects, project, {
      ...project,
      isPaid: isPaid,
      isRecruitment: true,
      expirationTime: moment().add(project.days, "days").valueOf(),
      type: "quick",
      creationTime: Date.now(),
      id: jobOfferId,
    });

    const updatedTokens = isPaid
      ? source.tokens - project?.price
      : source.tokens;
    await addJobOffer({
      ...project,
      expirationTime: getExpirationTime(project.days),
      type: "quick",
      companySize: getCompanySize(),
      id: jobOfferId,
    });

    await updateUser(source.uid, {
      tokens: updatedTokens,
      projects: updatedProjects,
    });

    dispatch(
      setUser({ ...source, tokens: updatedTokens, projects: updatedProjects })
    );

    showToastSuccess("Pomyślnie zaktualizowano projekt!");
  };

  // Helper function to handle project list update
  const updateProjectsList = (
    existingProjects: any,
    project: IProject,
    additionalProps: any
  ) => {
    const newProject = {
      ...project,
      expirationTime: moment().add(project?.days, "days").valueOf(),
      creationTime: Date.now(),
      companySize: getCompanySize(),
      ...additionalProps,
    };

    return existingProjects ? [...existingProjects, newProject] : [newProject];
  };

  // Helper function to calculate the expiration time based on project days
  const getExpirationTime = (days: number) => {
    return Date.now() + days * 24 * 60 * 60 * 1000;
  };

  // Helper function to get the company size or fallback
  const getCompanySize = () => {
    return source?.preferences?.length > 0
      ? source?.preferences[0]
      : "Brak danych...";
  };

  // Helper function to show success toast
  const showToastSuccess = (message: string) => {
    toast.success(message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  // Helper function to show error toast
  const showToastError = (message: string) => {
    toast.error(message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  // Main function to handle the project submission
  const handleRecruitmentStart = async () => {
    const hasEnoughTokens = source?.tokens >= project?.price;
    const isProjectValid = isProjectDataValid(project);

    if (!isProjectValid) {
      return showToastError("Uzupełnij dane!");
    }

    // Update projects array with isPaid true/false based on token quantity
    await proceedWithProjectUpdate(hasEnoughTokens);

    if (!hasEnoughTokens) {
      showToastError("Nie posiadasz wystarczającej ilości Quixies!");
      openTokenModal();
    }
  };

  // Helper function to check if the project is valid
  const isProjectDataValid = (project: IProject) => {
    return project.name && project.time && project.desc;
  };

  // Helper function to open the token modal
  const openTokenModal = () => {
    dispatch(set_modals({ ...modals, quixies: true }));
  };
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
  return (
    <div className={`px-6 font-coco mt-3`}>
      <div className="font-bold text-lg text-black font-gotham">Usługi</div>
      <p className="text-sm text-black mb-2">
        Dodaj nową usługę do swojego profilu
      </p>
      {!isNewProject && (
        <>
          <button
            onClick={() => {
              if (!source?.seek) {
                toast.error("Podaj informację o profilu aby rozpocząć");
                if (!source?.pseudo) {
                  toast.error("Podaj unikalną nazwę profilu aby rozpocząć");
                } else if (!source?.name) {
                  toast.error("Przedstaw się aby rozpocząć");
                } else if (!source?.emailVerified) {
                  toast.error("Zweryfikuj swój adres e-mail aby rozpocząć");
                } else if (!source?.configured) {
                  toast.error("Ukończ konfigurację profilu aby rozpocząć");
                } else {
                  setIsNewProject(true);
                  scrollIntoView();
                }
              }
            }}
            className="bg-cta text-white font-gotham p-2  mb-4 sm:mb-6"
          >
            Dodaj usługę
          </button>
        </>
      )}
      {isNewProject && (
        <button
          onClick={() => {
            setIsNewProject(false);
          }}
          className="hover:bg-red-400 bg-red-500 text-white p-2 "
        >
          Anuluj
        </button>
      )}
      {isNewProject && (
        <>
          <div className="p-3 lg:p-6 2xl:p-12 bg-gray-200  mt-3 font-coco">
            <span className="text-xl text-black font-gotham font-light mb-4">
              Dodajesz nową usługę
            </span>

            {project?.tags?.length > 0 && (
              <>
                {" "}
                <h1 className="text-base font-bold text-black font-coco">
                  Kategorie
                </h1>
                <p className=" text-black font-coco sm:text-base">
                  Twoje usługi trafią do poszczególnych widoków naszej aplikacji
                </p>
                <div className="mt-2 w-full grid grid-cols-2 sm:grid-cols-3 gap-2 text-white font-bold text-sm md:text-lg">
                  <button
                    onClick={() => {
                      setTagsOpenLevel(0);
                      console.log(project);
                    }}
                    className={`bg-[#126b91] ${
                      tagsOpenLevel === 0
                        ? "bg-[#126b91]"
                        : "bg-opacity-80 hover:bg-opacity-95"
                    } px-2 py-1.5 `}
                  >
                    Prosty
                  </button>
                  <button
                    onClick={() => setTagsOpenLevel(1)}
                    className={`bg-[#126b91] ${
                      tagsOpenLevel === 1
                        ? "bg-[#126b91]"
                        : "bg-opacity-80 hover:bg-opacity-95"
                    } px-2 py-1.5 `}
                  >
                    Rozszerzony
                  </button>
                  <button
                    onClick={() => setTagsOpenLevel(2)}
                    className={`bg-[#126b91] ${
                      tagsOpenLevel === 2
                        ? "bg-[#126b91]"
                        : "bg-opacity-80 hover:bg-opacity-95"
                    } px-2 py-1.5 `}
                  >
                    Całość
                  </button>
                </div>
              </>
            )}
            <div className="mt-2 font-bold text-sm text-black ">
              {project?.tags?.length === 0 && "Wybierz kategorie"}{" "}
              {project?.tags?.length > 0 && "Wybrane kategorie"}
              {project?.tags?.length > 0 &&
                tagsOpenLevel === 1 &&
                "Twoja oferta w strukturze strony"}
              {project?.tags?.length > 0 &&
                tagsOpenLevel === 2 &&
                "Twoja oferta w strukturze strony"}
              <div
                className={`${
                  tagsOpenLevel === 0 ? "flex flex-row flex-wrap -ml-2" : ""
                }`}
              >
                {project?.tags && tagsOpenLevel === 1
                  ? project?.tags?.map((item: any, i: any) => (
                      <div className="text-sm mt-4 bg-slate-300  p-2" key={i}>
                        <div className="-mt-2 w-full flex flex-wrap items-center font-gotham font-light">
                          <div className="bg-[#126b91]  p-1 text-white mt-2">
                            {item.slugTitle}
                          </div>
                          <div className="flex items-center">
                            <FaChevronRight className="mx-1 mt-2" />
                            <div className="bg-[#126b91]  p-1 text-white mt-2">
                              {item.title}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  : tagsOpenLevel === 2
                  ? project?.tags?.map((item: any, i: any) => (
                      <div className="text-sm mt-4 bg-slate-300  p-2" key={i}>
                        <div className="-mt-2 w-full flex flex-wrap items-center font-gotham font-light">
                          <div className="flex items-center">
                            <div className="bg-[#126b91]  p-1 text-white mt-2">
                              {item.slugTitle}
                            </div>
                          </div>
                          <div className="flex items-center">
                            <FaChevronRight className="mx-1 mt-2" />
                            <div className="bg-[#126b91]  p-1 text-white mt-2">
                              {item.categoryTitle}
                            </div>
                          </div>
                          <div className="flex items-center font-bold">
                            <FaChevronRight className="mx-1 mt-2" />
                            <div className="bg-[#126b91]  p-1 text-white mt-2">
                              {item.title}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  : project?.tags?.map((item: any, i: any) => (
                      <div
                        key={i}
                        className="w-max max-w-[100%] ml-2 mt-2 flex flex-wrap items-center font-gotham font-light text-white"
                      >
                        <div
                          className={`${
                            selectedTag.title === item.title ? "flex-col" : ""
                          } bg-[#126b91]  flex items-center p-1`}
                        >
                          <div className="flex flex-row items-center">
                            {item.title}
                            <button
                              onClick={() => {
                                setTagDeletion(true);
                                setSelectedTag(item);
                              }}
                              className=""
                            >
                              <FaMinusCircle className="ml-2 text-white" />
                            </button>
                          </div>
                          {tagDeletion && selectedTag.title === item.title && (
                            <div className="flex flex-col w-[90%] my-2 sticky left-0 top-0 bg-black bg-opacity-60 p-3 ">
                              <h2>Usunąć {selectedTag?.title}?</h2>
                              <div className="grid grid-cols-2 gap-3 mt-3">
                                <button
                                  onClick={() => {
                                    const newTags = project?.tags?.filter(
                                      (tag: any) =>
                                        tag.title !== selectedTag.title
                                    );
                                    setProject({
                                      ...project,
                                      tags: newTags,
                                    });
                                    toast.success(
                                      `Usunięto widok oferty w "${selectedTag.title}"`,
                                      {
                                        position: "top-right",
                                        autoClose: 5000,
                                        hideProgressBar: false,
                                        closeOnClick: true,
                                        pauseOnHover: true,
                                        draggable: true,
                                        progress: undefined,
                                      }
                                    );
                                    setTagDeletion(false);
                                    setSelectedTag({});
                                  }}
                                  className="bg-red-500 text-white px-3 py-1 "
                                >
                                  Usuń
                                </button>
                                <button
                                  onClick={() => {
                                    setTagDeletion(false);
                                    setSelectedTag({});
                                  }}
                                  className="bg-green-500 text-white px-3 py-1 "
                                >
                                  Nie
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
              </div>
            </div>

            <div className="gap-3">
              <p className="text-sm text-[green] mb-2"></p>
              {!configurationOpen && (
                <>
                  <div className="font-gotham font-bold text-black">
                    Wybierz kategorię
                  </div>
                </>
              )}
              {configurationOpen && !slug?.title && (
                <div className="font-gotham font-bold text-black">
                  Wybierz kategorię
                </div>
              )}
              {slug?.title !== "" && category?.title === "" && (
                <div className="text-black font-gotham flex flex-col">
                  <div className="font-bold mb-1 bg-[#126b91] p-1  text-white w-max max-w-[100%]">
                    {slug.title}
                  </div>
                  <div className="font-bold">Wybierz podkategorię</div>
                </div>
              )}
              {slug?.title !== "" && category?.title !== "" && (
                <div className="text-black font-coco flex flex-col">
                  <div className="font-bold mb-1 bg-[#126b91] p-1 text-white w-max max-w-[100%]">
                    {category.title}
                  </div>
                  <div className="font-bold">Dodaj usługę do</div>
                </div>
              )}
              <div className="-ml-0.5 flex flex-row items-start w-full">
                {!configurationOpen && slug.title === "" && (
                  <button
                    onClick={() => setConfigurationOpen(true)}
                    className="ml-1 mr-0.5 mt-0.5 text-lg w-max bg-[#126b91] hover:bg-opacity-80  duration-100 text-white flex flex-row items-center justify-center outline-none h-[28px] sm:h-[32px] aspect-square"
                  >
                    <FaPlus />
                  </button>
                )}
                {configurationOpen &&
                  slug.title !== "" &&
                  category.title !== "" && (
                    <button
                      onClick={() => setCategory({ title: "", url: "" })}
                      className="ml-1 mr-0.5 mt-0.5 text-lg w-max bg-[#126b91] hover:bg-opacity-80  duration-100 text-white flex flex-row items-center justify-center outline-none h-[28px] sm:h-[32px] aspect-square"
                    >
                      <FaChevronLeft />
                    </button>
                  )}
                {configurationOpen &&
                  slug.title !== "" &&
                  category.title === "" && (
                    <button
                      onClick={() => {
                        setSlug({ title: "", url: "" }),
                          setConfigurationOpen(false);
                      }}
                      className="ml-1 mr-0.5 mt-0.5 text-lg w-max bg-[#126b91] hover:bg-opacity-80  duration-100 text-white flex flex-row items-center justify-center outline-none h-[28px] sm:h-[32px] aspect-square"
                    >
                      <FaChevronLeft />
                    </button>
                  )}
                {configurationOpen && slug.title === "" && (
                  <div>
                    {jobs.map((item: any, i: any) => (
                      <button
                        onClick={() =>
                          setSlug({
                            title: item.title,
                            url: polishToEnglish(item.title),
                          })
                        }
                        className="hover:bg-opacity-80 duration-100 text-sm sm:text-base m-0.5 bg-[#126b91]  text-white font-light p-1"
                        key={i}
                      >
                        {item.title}
                      </button>
                    ))}
                  </div>
                )}
                {configurationOpen && category.title === "" && (
                  <div>
                    {jobs.map((item: any, i: any) => (
                      <>
                        {item.title === slug.title && (
                          <>
                            {item.data.map((cat: any, i: any) => (
                              <button
                                onClick={() =>
                                  setCategory({
                                    title: cat.title,
                                    url: polishToEnglish(cat.title),
                                  })
                                }
                                className="hover:bg-opacity-80 duration-100 text-sm sm:text-base m-0.5 bg-[#126b91]  text-white font-light p-1"
                                key={i}
                              >
                                {cat.title}
                              </button>
                            ))}
                          </>
                        )}
                      </>
                    ))}
                  </div>
                )}
                {configurationOpen && category.title !== "" && (
                  <div>
                    {jobs.map((item: any, i: any) => (
                      <>
                        {item.title === slug.title && (
                          <>
                            {item.data.map((cat: any, i: any) => (
                              <>
                                {cat.title === category.title && (
                                  <>
                                    {cat.data.map((job: any, i: any) => (
                                      <button
                                        onClick={() => {
                                          if (
                                            project?.tags?.find(
                                              (tag: any) =>
                                                tag.url ===
                                                polishToEnglish(job.title)
                                            )
                                          ) {
                                            return (
                                              toast.error(
                                                `Oferta w ${category.title} i ${job.title} już się wyświetla.`,
                                                {
                                                  position: "top-right",
                                                  autoClose: 5000,
                                                  hideProgressBar: false,
                                                  closeOnClick: true,
                                                  pauseOnHover: true,
                                                  draggable: true,
                                                  progress: undefined,
                                                }
                                              ),
                                              setConfigurationOpen(false),
                                              setCategory({
                                                title: "",
                                                url: "",
                                              }),
                                              setSlug({
                                                title: "",
                                                url: "",
                                              })
                                            );
                                          } else {
                                            setProject({
                                              ...project,
                                              tags: [
                                                ...(project?.tags || []),
                                                {
                                                  url: polishToEnglish(
                                                    job.title
                                                  ),
                                                  categoryUrl: polishToEnglish(
                                                    category.title
                                                  ),
                                                  categoryTitle: category.title,
                                                  slugUrl: polishToEnglish(
                                                    slug.title
                                                  ),
                                                  slugTitle: slug.title,
                                                  title: job.title,
                                                },
                                              ],
                                            });
                                            toast.success(
                                              `Oferta wyświetli się w ${category.title} oraz ${job.title}.`,
                                              {
                                                position: "top-right",
                                                autoClose: 5000,
                                                hideProgressBar: false,
                                                closeOnClick: true,
                                                pauseOnHover: true,
                                                draggable: true,
                                                progress: undefined,
                                              }
                                            );

                                            setConfigurationOpen(false);
                                            setCategory({
                                              title: "",
                                              url: "",
                                            });
                                            setSlug({
                                              title: "",
                                              url: "",
                                            });
                                          }
                                        }}
                                        className="hover:bg-opacity-80 duration-100 text-sm sm:text-base m-0.5 bg-[#126b91]  text-white font-light p-1"
                                        key={i}
                                      >
                                        {job.title}
                                      </button>
                                    ))}
                                  </>
                                )}
                              </>
                            ))}
                          </>
                        )}
                      </>
                    ))}
                  </div>
                )}
              </div>
              {!source?.seek && source?.seek !== "ask" && (
                <div>
                  <h3 className="font-gotham font-light text-black drop-shadow-lg mt-1.5">
                    Nazwa Firmy/Działalności/Imię rekrutera
                  </h3>
                  <input
                    className="border border-primary  p-2 text-black font-light w-full"
                    value={project?.name}
                    onChange={(e) => {
                      setProject({
                        ...project,
                        name: e.target.value,
                      });
                    }}
                    placeholder="Kto dodaje ofertę?"
                  />
                </div>
              )}
              {!source?.seek && source?.seek !== "ask" && (
                <div>
                  <h3 className="font-coco text-black drop-shadow-lg mt-1.5">
                    Formularz zewnętrzny (opcjonalnie)
                  </h3>
                  <input
                    type="text"
                    value={project.link}
                    onChange={(e) =>
                      setProject({
                        ...project,
                        link: e.target.value,
                      })
                    }
                    placeholder="Wpisz link do formularza"
                    className="border border-primary  p-2 text-black font-coco w-full"
                  />
                </div>
              )}
              {!source?.seek && source?.seek !== "ask" && (
                <div className="">
                  <div>
                    <h3 className="font-gotham font-light text-black drop-shadow-lg mt-1.5">
                      Wynagrodzenie
                    </h3>
                    <select
                      value={project.time}
                      onChange={(e) =>
                        setProject({
                          ...project,
                          time: e.target.value,
                        })
                      }
                      className="border border-primary  p-2 text-black font-light w-full"
                    >
                      <option value="Nie podano">Rodzaj wynagrodzenia</option>
                      <option value="Stawka godzinowa">Stawka godzinowa</option>
                      <option value="Stawka miesięczna">
                        Stawka miesięczna
                      </option>
                      <option value="Per Milestone">Per Milestone</option>
                      <option value="Prowizja">Prowizja</option>
                      <option value="Akcje i udziały">Akcje i udziały</option>
                      <option value="Inne">Inne</option>
                    </select>
                  </div>
                  <InputField
                    id="salaryValue"
                    label="Wynagrodzenie"
                    value={project.salaryValue}
                    onChange={(e) =>
                      setProject({
                        ...project,
                        salaryValue: e.target.value,
                      })
                    }
                    placeholder="Wpisz wynagrodzenie"
                  />
                </div>
              )}
            </div>

            <div>
              <h3 className="font-coco text-black drop-shadow-lg mt-1.5">
                Czas wykonania
              </h3>
              <select
                value={project.time}
                onChange={(e) =>
                  setProject({
                    ...project,
                    time: e.target.value,
                  })
                }
                className="border border-primary  p-2 text-black font-coco w-full"
              >
                <option value="Nie podano">Ile trwa wykonanie usługi?</option>
                <option value="1-3 mies.">1-3 mies.</option>
                <option value="3-6 mies.">3-6 mies.</option>
                <option value="6-12 mies.">6-12 mies.</option>
                <option value="1-2 lata">1-2 lata</option>
                <option value="2-4 lata">2-4 lata</option>
                <option value="powyżej 4 lat">powyżej 4 lat</option>
              </select>
            </div>

            <div>
              <h3 className="font-coco text-black drop-shadow-lg mt-1.5">
                Nazwa
              </h3>
              <input
                type="text"
                value={project.name}
                onChange={(e) =>
                  setProject({
                    ...project,
                    name: e.target.value,
                  })
                }
                placeholder="Podaj nazwę projektu"
                className="border border-primary  p-2 text-black font-coco w-full"
              />
            </div>

            <div>
              <h3 className="font-coco text-black drop-shadow-lg mt-1.5">
                Link do projektu (opcjonalnie)
              </h3>
              <input
                type="text"
                value={project.link}
                onChange={(e) => {
                  setProject({
                    ...project,
                    link: e.target.value,
                  });
                }}
                placeholder="Link projektu (opcjonalnie)"
                className="border border-primary  p-2 text-black font-coco w-full duration-300 ease-in-out"
                aria-label="Link to project"
              />
            </div>

            <div>
              <h3 className="font-coco text-black drop-shadow-lg mt-1.5">
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
                placeholder={`${
                  source?.seek && source?.seek !== "ask"
                    ? "Jaka była twoja rola w projekcie?"
                    : "Opisz obowiązki stanowisk na które rekrutujesz..."
                }`}
                className="border border-primary  p-2 text-black font-coco w-full"
              />
            </div>
            <h3 className="font-coco text-black drop-shadow-lg mt-1.5 mb-3">
              Możesz uwzględnić kilka obrazów projektu (np. logo, stronę
              główną...)
            </h3>
            {project?.images?.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                {project?.images?.map((item: any, i: any) => (
                  <div key={i}>
                    <div className="relative flex flex-col">
                      <Image
                        src={item?.src}
                        width={1920}
                        height={1920}
                        alt="image"
                        className=" w-full h-auto border-[2px] border-primary"
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
                            className="w-full py-2  bg-[#126b91] text-white"
                            onClick={() => {
                              setImageDescriptionOpen(-1);
                              toast.success("Pomyślnie dodano opis!", {
                                position: "top-right",
                                autoClose: 5000,
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: true,
                              });
                            }}
                          >
                            Ok
                          </button>
                        </>
                      )}
                      <button
                        className="absolute top-1 right-1 bg-[#126b91] rounded-full p-2 text-white"
                        onClick={() => {
                          setProject({
                            ...project,
                            images: project.images.filter(
                              (item: any, index: any) => index !== i
                            ),
                          });
                          toast.success("Pomyślnie usunięto obraz!", {
                            position: "top-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                          });
                        }}
                      >
                        <FaTimes />
                      </button>
                    </div>

                    {isImageDescriptionOpen !== i && (
                      <button
                        onClick={() => setImageDescriptionOpen(i)}
                        className="w-full bg-[#126b91]  text-white"
                      >
                        Opisz obraz
                      </button>
                    )}
                  </div>
                ))}
              </div>
            )}

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
              className="mt-3 w-full mx-auto  left-0 bg-gradient-to-r from-primary via-cta to-primary text-white font-gotham text-lg px-2 py-1.5"
            >
              ZATWIERDŹ PROJEKT
            </button>

            <ImagePicker handler={uploadImages} user={source} />
          </div>

          <>
            {project?.name &&
              !source?.seek &&
              project?.time &&
              project?.desc && (
                <div className="w-full sticky bottom-0 flex flex-col bg-white p-4 ">
                  <div
                    className="w-full mb-4 bg-primary text-white  p-4 lg:p-6"
                    style={{ textShadow: "2px 2px 2px black" }}
                  >
                    <label htmlFor="days-range" className="font-bold">
                      Na ile dni chcesz dodać ofertę pracy? ({project?.days}{" "}
                      dni)
                    </label>
                    <div className="px-4">
                      <input
                        id="days-range"
                        type="range"
                        min={1}
                        max={30}
                        value={project?.days || 1}
                        onChange={(e: any) =>
                          setProject({
                            ...project,
                            days: e.target.value,
                            price: 15.99 + e.target.value * 8.42,
                          })
                        }
                        className="w-full mt-2"
                      />
                    </div>
                    <div className="text-lg font-semibold mt-2">
                      Cena: 💎{project?.price?.toFixed(2)}
                    </div>
                  </div>

                  <button
                    onClick={async () => {
                      await handleRecruitmentStart().then(() =>
                        setProject({
                          images: [],
                          name: "",
                          time: "",
                          desc: "",
                        })
                      );
                    }}
                    style={{ textShadow: "2px 2px 2px black" }}
                    className="w-full sticky bottom-3  left-0 bg-gradient-to-r from-primary to-cta hover:bg-opacity-90 text-white font-gotham text-lg px-2 py-1.5"
                  >
                    ROZPOCZNIJ REKRUTACJĘ
                  </button>
                </div>
              )}
          </>
        </>
      )}
    </div>
  );
}
