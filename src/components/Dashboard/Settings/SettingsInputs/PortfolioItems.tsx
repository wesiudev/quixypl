"use client";
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
import { useState } from "react";
import { v4 as uuid } from "uuid";
import { addDocument, storage, updateUser } from "@/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { InputField } from "@/components/AddJobOffer/InputField";
import { FaStar } from "react-icons/fa6";
import ReactQuill from "react-quill-new";
import { TOOLBAR_OPTIONS } from "@/components/AddJobOffer/Step";

export default function PortfolioItems({
  source,
  project,
  setProject,
  setUploading,
  setUploadCount,
}: {
  source: any;
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
  const proceedWithProjectUpdate = async (isPaid: boolean) => {
    const uniqId = uuid();
    const updatedProjects = updateProjectsList(source.projects, project, {
      ...project,
      isPaid: isPaid,
      creationTime: Date.now(),
      pseudo: source?.pseudo,
      id: uniqId,
    });

    const updatedTokens = isPaid ? source.tokens - 10 : source.tokens;
    await addDocument("services", uniqId, {
      ...project,
      id: uniqId,
    });

    await updateUser(source.uid, {
      tokens: updatedTokens,
      projects: updatedProjects,
    });
    dispatch(
      setUser({ ...source, tokens: updatedTokens, projects: updatedProjects })
    );
    showToastSuccess("Pomyślnie dodano projekt!");
  };
  const updateProjectsList = (
    existingProjects: any,
    project: IProject,
    additionalProps: any
  ) => {
    const newProject = {
      ...project,
      creationTime: Date.now(),
      ...additionalProps,
    };

    return existingProjects ? [...existingProjects, newProject] : [newProject];
  };
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
  const handleRecruitmentStart = async () => {
    const hasEnoughTokens = source?.tokens >= project?.price;
    const isProjectValid = isProjectDataValid(project);

    if (!isProjectValid) {
      return showToastError("Uzupełnij dane!");
    }
    await proceedWithProjectUpdate(hasEnoughTokens);

    if (!hasEnoughTokens) {
      showToastError("Nie posiadasz wystarczającej ilości Quixies!");
      openTokenModal();
    }
  };
  const isProjectDataValid = (project: IProject) => {
    return project.name && project.time && project.desc;
  };
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
    <div className={`px-6 mt-3`}>
      <div className="font-extrabold text-lg flex items-center text-black">
        <div className="bg-gradient-to-r from-primary to-cta w-24 rounded-xl h-12 flex items-center justify-center mr-2">
          <FaStar className="text-white text-3xl" />
        </div>
        Rozwiń swoje portfolio usług aby zdobywać nowych klientów!
      </div>
      <p className="text-sm text-black my-2">
        Dodaj nową usługę do naszego rynku z usługami.
      </p>

      <>
        <div className="rounded-xl p-3 bg-gradient-to-r from-primary to-cta mt-3">
          <span className="text-xl text-white font-extrabold">
            Dodajesz nową usługę
          </span>

          <div className="bg-white rounded-xl p-3 mt-3">
            <h1 className="text-base font-bold text-black font-coco">
              Kategorie
            </h1>
            <p className=" text-black font-coco sm:text-base">
              Twoje usługi trafią do poszczególnych widoków naszej aplikacji
            </p>

            <div className="mt-2 font-bold text-sm text-black ">
              {project?.tags?.length === 0 && "Wybierz kategorie"}{" "}
              {project?.tags?.length > 0 && "Wybrane kategorie"}
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
              <div className="mb-3">
                <h3 className="font-extrabold text-xl text-black my-2">
                  Nazwa usługi
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
                  placeholder="Wpisz nazwę..."
                  className="border border-primary p-2 text-black font-coco w-full"
                />
              </div>
              <div className="mb-3">
                <h3 className="font-extrabold text-xl text-black my-2">
                  Opis usługi
                </h3>
                <ReactQuill
                  theme="snow"
                  placeholder="Wpisz tekst"
                  className="text-black"
                  modules={{
                    toolbar: {
                      container: TOOLBAR_OPTIONS,
                    },
                  }}
                  value={project.desc}
                  onChange={(e) => {
                    setProject({
                      ...project,
                      desc: e,
                    });
                  }}
                />
              </div>
              {/* <div>
                <h3 className="font-extrabold text-xl text-black mt-1">Link</h3>
                <input
                  type="text"
                  value={project.link}
                  onChange={(e) => {
                    setProject({
                      ...project,
                      link: e.target.value,
                    });
                  }}
                  placeholder=""
                  className="border border-primary p-2 text-black font-coco w-full duration-300 ease-in-out"
                  aria-label="Link to project"
                />
              </div> */}
              {/* {!source?.seek && source?.seek !== "ask" && (
                <div className="">
                  <div className="my-3">
                    <h3 className="font-extrabold text-xl text-black">
                      Typ wynagrodzenia
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
                      <option value="Nie podano">Nie wybrano...</option>
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
                    placeholder="Wpisz wynagrodzenie..."
                  />
                </div>
              )} */}
            </div>

            {/* <div className="mt-3">
              <InputField
                id="duration"
                label="Czas wykonania"
                value={project.duration}
                onChange={(e) =>
                  setProject({
                    ...project,
                    duration: e.target.value,
                  })
                }
                placeholder="Czas wykonania usługi"
              />
            </div> */}

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
              disabled={source?.tokens < 10}
              onClick={() => {
                if (project.name && project.time && project.desc) {
                  updateUser(source.uid, {
                    ...source,
                    projects: source?.projects
                      ? [
                          ...source.projects,
                          { ...project, isPaid: source?.tokens >= 10 },
                        ]
                      : [{ ...project, isPaid: source?.tokens >= 10 }],
                  });
                  dispatch(
                    setUser({
                      ...source,
                      projects: source?.projects
                        ? [
                            ...source.projects,
                            { ...project, isPaid: source?.tokens >= 10 },
                          ]
                        : [{ ...project, isPaid: source?.tokens >= 10 }],
                    })
                  );
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
                async () => {
                  await handleRecruitmentStart().then(() =>
                    setProject({
                      images: [],
                      name: "",
                      time: "",
                      desc: "",
                    })
                  );
                };
              }}
              className="disabled:from-red-500 disabled:via-red-500 disabled:to-red-500 disabled:cursor-not-allowed w-max text-xl left-0 bg-gradient-to-r from-primary via-cta to-primary text-white font-extrabold px-2 py-1.5"
            >
              Dodaj usługę (10,00💎)
            </button>
            {source?.tokens > 10 && (
              <div className="text-green-500 text-sm mt-2 font-extrabold">
                Twoje saldo wynosi {source?.tokens}
              </div>
            )}
            {source?.tokens < 10 && (
              <div className="flex flex-col gap-2">
                <div className="text-red-500 text-sm mt-2">
                  Niewystarczająca ilość Quixies
                </div>
                <button
                  onClick={() =>
                    dispatch(set_modals({ ...modals, quixies: true }))
                  }
                  className="text-white bg-gradient-to-r from-primary to-cta px-1 py-0.5"
                >
                  Doładuj tutaj
                </button>
              </div>
            )}
            <h3 className="font-coco text-black drop-shadow-lg mt-1.5 mb-3">
              Możesz uwzględnić kilka obrazów usługi (np. logo, stronę
              główną...)
            </h3>
            <ImagePicker handler={uploadImages} user={source} />
          </div>
        </div>
      </>
    </div>
  );
}
