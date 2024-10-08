"use client";
import { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import { addJobOffer, storage, updateUser } from "@/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "@/redux/slices/user";
import Image from "next/image";
import { toast } from "react-toastify";
import {
  FaChevronLeft,
  FaChevronRight,
  FaImage,
  FaMinusCircle,
  FaPlus,
} from "react-icons/fa";
import { set_modals } from "@/redux/slices/modalsopen";
import jobs from "../../public/14.09.2024.json";
import { IProject } from "@/types";
import moment from "moment";
import { useRouter } from "next/navigation";
import Loading from "@/app/loading";
import ImagePicker from "@/components/Dashboard/Settings/SettingsInputs/ImagePicker";
import ProjectCard from "@/components/Dashboard/ImageGenerator/dashboard/ProjectCard";
import { polishToEnglish } from "../../utils/polishToEnglish";

export default function Postings() {
  const { user } = useSelector((state: any) => state.user);
  const router = useRouter();
  useEffect(() => {
    if (user?.seek === "ask" || user?.seek) {
      router.push("/dashboard/job_search");
    }
  }, []);
  const dispatch = useDispatch();
  const [isNewProject, setIsNewProject] = useState(false);
  const [days, setDays] = useState(1);
  const [price, setPrice] = useState(15.99);
  const [configurationOpen, setConfigurationOpen] = useState(false);
  const [slug, setSlug] = useState({ title: "", url: "" });
  const [category, setCategory] = useState({ title: "", url: "" });
  const [tagsOpenLevel, setTagsOpenLevel] = useState(0);
  const [tagDeletion, setTagDeletion] = useState(false);
  const [selectedTag, setSelectedTag] = useState<any>({});
  const addPreference = (preference: any) => {
    const newPreferences = user?.preferences
      ? [...user?.preferences, preference]
      : [preference];
    dispatch(setUser({ ...user, preferences: newPreferences }));
    dispatch(setUser({ ...user, preferences: newPreferences }));
    // setChangesWereMade(true);
  };
  // Aktualizacja ceny w oparciu o liczbę dni
  const handleDaysChange = (e: any) => {
    const selectedDays = e.target.value;
    setDays(selectedDays);
    // Przykładowe przeliczenie ceny: baza + 0.5 jednostki za każdy dzień
    setPrice(15.99 + selectedDays * 8.42);
  };

  const handleRecruitmentStart = async () => {
    const hasEnoughTokens = user?.tokens >= price;
    const isProjectValid = isProjectDataValid(project);

    if (!isProjectValid) {
      return showToastError("Uzupełnij dane!");
    }

    if (!hasEnoughTokens) {
      await saveDraftProject();
      showToastError("Nie posiadasz wystarczająco Quixies!");
      openTokenModal();
    } else {
      await proceedWithRecruitment();
    }
  };

  // Helper function to check if the project is valid
  const isProjectDataValid = (projectL: IProject) => {
    return (
      project.name &&
      project.time &&
      project.desc &&
      project?.images?.length > 0
    );
  };

  // Helper function to save the project as a draft
  const saveDraftProject = async () => {
    const updatedProjects = updateProjectsList(user?.projects, project, {
      ...project,
      isPaid: false,
      isRecruitment: true,
      expirationTime: moment().add(days, "days").valueOf(),
    });
    console.log(updatedProjects);

    await updateUser(user?.uid, { projects: updatedProjects });
    dispatch(setUser({ ...user, projects: updatedProjects }));

    resetProjectForm();
    showToastSuccess("Zapisano wersję roboczą!");
  };

  // Helper function to proceed with the recruitment when user has enough tokens
  const proceedWithRecruitment = async () => {
    const updatedProjects = updateProjectsList(user?.projects, project, {
      ...project,
      isPaid: true,
      isRecruitment: true,
      expirationTime: moment().add(project.days, "days").valueOf(),
      type: "quick",
      companySize: getCompanySize(),
    });
    const updatedTokens = user?.tokens - price;

    await addJobOffer({
      ...project,
      expirationTime: getExpirationTime(project.days),
      type: "quick",
      companySize: getCompanySize(),
    });
    await updateUser(user?.uid, {
      tokens: updatedTokens,
      projects: updatedProjects,
    });
    dispatch(
      setUser({ ...user, tokens: updatedTokens, projects: updatedProjects })
    );

    showToastSuccess("Pomyślnie dodano ofertę!");
  };

  // Helper function to handle project list update
  const updateProjectsList = (
    existingProjects: any,
    project: IProject,
    additionalProps: any
  ) => {
    const newProject = {
      ...project,
      expirationTime: getExpirationTime(project.days),
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
    return user?.preferences?.length > 0
      ? user?.preferences[0]
      : "Brak danych...";
  };

  // Helper function to reset the project form
  const resetProjectForm = () => {
    setIsNewProject(false);
    setProject({
      days: 1,
      images: [],
      desc: "",
      name: "",
      time: "",
    });
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

  // Helper function to open the token modal
  const openTokenModal = () => {
    dispatch(set_modals({ ...modals, quixies: true }));
  };
  const removePreference = (preference: any) => {
    const newPreferences = user?.preferences.filter(
      (item: string) => item !== preference
    );
    dispatch(setUser({ ...user, preferences: newPreferences }));
    dispatch(setUser({ ...user, preferences: newPreferences }));
    // setChangesWereMade(true);
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
  const { modals } = useSelector((state: any) => state.modals);
  const [isImageDescriptionOpen, setImageDescriptionOpen] = useState(-1);
  return (
    <div className="lg:pl-[30rem] p-4 bg-white">
      <h1 className="text-3xl w-max max-w-[100%] mx-auto text-black font-coco drop-shadow shadow-black">
        TWOJE OFERTY PRACY
      </h1>
      {!user && <Loading />}
      {user?.projects?.length > 0 && (
        <div>
          {user?.projects?.map((project: IProject, i: any) => (
            <ProjectCard key={i} project={project} />
          ))}
        </div>
      )}
      {!user?.projects && (
        <div className="p-4 lg:p-6 mt-6 font-coco">
          {user?.seek && user?.seek !== "ask" && (
            <div className="font-bold text-3xl lg:text-5xl text-black font-gotham">
              Projekty
            </div>
          )}
          {!user?.seek && user?.seek !== "ask" && (
            <div className="font-bold text-3xl lg:text-5xl text-black font-gotham">
              Szybka Rekrutacja
            </div>
          )}
          {user?.seek && (
            <p className="text-sm sm:text-base text-black mb-2 mt-4">
              Brałeś/aś udział w jakichś projektach? Pochwal się tym swoim
              portfolio. Możesz uwzględnić linki, obrazy i opis projektu.
            </p>
          )}
          {!user?.seek && (
            <p className="text-sm sm:text-base text-black mb-2 mt-4">
              Rekrutujesz do projektu? Przeprowadź ⚡<b>Szybką Rekrutację</b>!
              Pozwól talentom aplikować na Twoją ofertę!
            </p>
          )}
          {!isNewProject && (
            <>
              <button
                onClick={() => {
                  setIsNewProject(true);
                }}
                style={{ textShadow: "2px 2px 2px black" }}
                className="bg-cta text-white font-gotham p-2 rounded-md"
              >
                {user?.seek && user?.seek !== "ask" && "Dodaj projekt"}
                {!user?.seek && user?.seek !== "ask" && "Rozpocznij rekrutację"}
              </button>
              {user?.projects?.map((project: any, i: number) => (
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
                        className="rounded-lg h-[100px] w-auto bg-white border-2 border-cta"
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
              <div className="p-6 lg:p-12 2xl:p-16 bg-gray-200 rounded-xl mt-3 font-coco">
                {user?.seek && user?.seek !== "ask" && (
                  <span className="text-3xl lg:text-5xl text-black font-gotham font-light mb-4">
                    Dodajesz projekt do profilu
                  </span>
                )}
                {!user?.seek && user?.seek !== "ask" && (
                  <span className="underline text-3xl lg:text-5xl text-black font-gotham font-light">
                    Rekrutuj
                  </span>
                )}
                {project?.tags?.length > 0 && (
                  <>
                    {" "}
                    <h1 className="text-base font-bold text-black ">
                      Stanowiska
                    </h1>
                    <p className=" text-black font-gotham font-light sm:text-base">
                      Przełączaj pomiędzy widokami struktury na której wyświetli
                      się Twój profil
                    </p>
                    <div className="mt-2 w-full grid grid-cols-2 sm:grid-cols-3 gap-2 text-white font-bold text-sm md:text-lg">
                      <button
                        onClick={() => setTagsOpenLevel(0)}
                        className={`bg-[#126b91] ${
                          tagsOpenLevel === 0 ? "bg-[#126b91]" : "bg-opacity-80"
                        } px-2 py-1.5 rounded-md`}
                      >
                        Prosty
                      </button>
                      <button
                        onClick={() => setTagsOpenLevel(1)}
                        className={`bg-[#126b91] ${
                          tagsOpenLevel === 1 ? "bg-[#126b91]" : "bg-opacity-80"
                        } px-2 py-1.5 rounded-md`}
                      >
                        Rozszerzony
                      </button>
                      <button
                        onClick={() => setTagsOpenLevel(2)}
                        className={`bg-[#126b91] ${
                          tagsOpenLevel === 2 ? "bg-[#126b91]" : "bg-opacity-80"
                        } px-2 py-1.5 rounded-md`}
                      >
                        Całość
                      </button>
                    </div>
                  </>
                )}
                <div className="mt-2 font-bold text-sm text-black ">
                  {project?.tags?.length === 0 &&
                    !user?.seek &&
                    user?.seek !== "ask" &&
                    "Kogo szukasz?"}{" "}
                  {project?.tags?.length > 0 &&
                    tagsOpenLevel === 0 &&
                    "Wybrane Stanowiska"}
                  {project?.tags?.length > 0 &&
                    tagsOpenLevel === 1 &&
                    "Kategorie Stanowisk"}
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
                          <div
                            className="text-sm mt-4 bg-slate-300 rounded-xl p-2"
                            key={i}
                          >
                            <div className="-mt-2 w-full flex flex-wrap items-center font-gotham font-light">
                              <div className="bg-[#126b91] rounded-lg p-1 text-white mt-2">
                                {item.slugTitle}
                              </div>
                              <div className="flex items-center">
                                <FaChevronRight className="mx-1 mt-2" />
                                <div className="bg-[#126b91] rounded-lg p-1 text-white mt-2">
                                  {item.title}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))
                      : tagsOpenLevel === 2
                      ? project?.tags?.map((item: any, i: any) => (
                          <div
                            className="text-sm mt-4 bg-slate-300 rounded-xl p-2"
                            key={i}
                          >
                            <div className="-mt-2 w-full flex flex-wrap items-center font-gotham font-light">
                              <div className="flex items-center">
                                <div className="bg-[#126b91] rounded-lg p-1 text-white mt-2">
                                  {item.slugTitle}
                                </div>
                              </div>
                              <div className="flex items-center">
                                <FaChevronRight className="mx-1 mt-2" />
                                <div className="bg-[#126b91] rounded-lg p-1 text-white mt-2">
                                  {item.categoryTitle}
                                </div>
                              </div>
                              <div className="flex items-center font-bold">
                                <FaChevronRight className="mx-1 mt-2" />
                                <div className="bg-[#126b91] rounded-lg p-1 text-white mt-2">
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
                                selectedTag.title === item.title
                                  ? "flex-col"
                                  : ""
                              } bg-[#126b91] rounded-lg flex items-center p-1`}
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
                              {tagDeletion &&
                                selectedTag.title === item.title && (
                                  <div className="flex flex-col w-[90%] my-2 sticky left-0 top-0 bg-black bg-opacity-60 p-3 rounded-md">
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
                                        className="bg-red-500 text-white px-3 py-1 rounded-md"
                                      >
                                        Usuń
                                      </button>
                                      <button
                                        onClick={() => {
                                          setTagDeletion(false);
                                          setSelectedTag({});
                                        }}
                                        className="bg-green-500 text-white px-3 py-1 rounded-md"
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
                {!user?.seek && user?.seek !== "ask" && (
                  <div className="gap-3 mt-12">
                    <p className="text-sm text-[green] mb-2"></p>
                    {!configurationOpen && (
                      <>
                        <div className="font-gotham font-bold text-black">
                          Dodaj stanowisko(a)
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
                        <div className="font-bold mb-1 bg-[#126b91] p-1 rounded-md px-2 text-white w-max max-w-[100%]">
                          {slug.title}
                        </div>
                        <div className="font-bold">Wybierz podkategorię</div>
                      </div>
                    )}
                    {slug?.title !== "" && category?.title !== "" && (
                      <div className="text-black font-gotham flex flex-col">
                        <div className="font-bold mb-1 bg-[#126b91] p-1 rounded-md px-2 text-white w-max max-w-[100%]">
                          {category.title}
                        </div>
                        <div className="font-bold"></div>Wybierz stanowisko
                      </div>
                    )}
                    <div className="-ml-0.5 flex flex-row items-start w-full">
                      {!configurationOpen && slug.title === "" && (
                        <button
                          onClick={() => setConfigurationOpen(true)}
                          className="ml-1 mr-0.5 mt-0.5 text-lg w-max bg-[#126b91] rounded-lg hover:bg-opacity-90 duration-100 text-white flex flex-row items-center justify-center outline-none h-[40px] aspect-square"
                        >
                          <FaPlus />
                        </button>
                      )}
                      {configurationOpen &&
                        slug.title !== "" &&
                        category.title !== "" && (
                          <button
                            onClick={() => setCategory({ title: "", url: "" })}
                            className="ml-1 mr-0.5 mt-0.5 text-lg w-max bg-[#126b91] rounded-lg hover:bg-opacity-90 duration-100 text-white flex flex-row items-center justify-center outline-none h-[40px] aspect-square"
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
                            className="ml-1 mr-0.5 mt-0.5 text-lg w-max bg-[#126b91] rounded-lg hover:bg-opacity-90 duration-100 text-white flex flex-row items-center justify-center outline-none h-[40px] aspect-square"
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
                              className="m-0.5 bg-[#126b91] rounded-lg text-white font-light p-2"
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
                                      className="m-0.5 bg-[#126b91] rounded-lg text-white font-light p-2"
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
                                                        categoryUrl:
                                                          polishToEnglish(
                                                            category.title
                                                          ),
                                                        categoryTitle:
                                                          category.title,
                                                        slugUrl:
                                                          polishToEnglish(
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
                                              className="m-0.5 bg-[#126b91] rounded-lg text-white font-light p-2"
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

                    {!user?.seek && user?.seek !== "ask" && (
                      <div>
                        <h3 className="font-gotham font-light text-black drop-shadow-lg mt-1.5">
                          Nazwa Firmy/Działalności/Imię rekrutera
                        </h3>
                        <input
                          className="border border-primary rounded-md p-2 text-black font-light w-full"
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
                    {!user?.seek && user?.seek !== "ask" && (
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
                          className="border border-primary rounded-md p-2 text-black font-light w-full"
                        >
                          <option value="Nie podano">
                            Rodzaj wynagrodzenia
                          </option>
                          <option value="Stawka godzinowa">
                            Stawka godzinowa
                          </option>
                          <option value="Stawka miesięczna">
                            Stawka miesięczna
                          </option>
                          <option value="Per Milestone">Per Milestone</option>
                          <option value="Prowizja">Prowizja</option>
                          <option value="Akcje i udziały">
                            Akcje i udziały
                          </option>
                          <option value="Inne">Inne</option>
                        </select>
                      </div>
                    )}
                  </div>
                )}
                {user?.seek && user?.seek !== "ask" && (
                  <div>
                    <h3 className="font-gotham font-light  text-black drop-shadow-lg mt-1.5">
                      Czas trwania
                    </h3>
                    <select
                      value={project.time}
                      onChange={(e) =>
                        setProject({
                          ...project,
                          time: e.target.value,
                        })
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
                      <option value="powyżej 4 lat">powyżej 4 lat</option>
                    </select>
                  </div>
                )}
                {user?.seek && user?.seek !== "ask" && (
                  <div>
                    <h3 className="font-gotham font-light  text-black drop-shadow-lg mt-1.5">
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
                      className="border border-primary rounded-md p-2 text-black  font-light w-full"
                    />
                  </div>
                )}
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
                    placeholder={`${
                      user?.seek && user?.seek !== "ask"
                        ? "Jaka była twoja rola w projekcie?"
                        : "Opisz obowiązki stanowisk na które rekrutujesz..."
                    }`}
                    className="border border-primary rounded-md p-2 text-black  font-light w-full"
                  />
                </div>
                <h3 className="font-gotham font-light text-black drop-shadow-lg mt-1.5 mb-3">
                  Zdjęcia projektu
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
                )}
                <ImagePicker handler={uploadImages} user={user} />
              </div>
              {user?.seek && user?.seek !== "ask" && (
                <button
                  onClick={() => {
                    if (project.name && project.time && project.desc) {
                      updateUser(user?.uid, {
                        ...user,
                        projects: user?.projects
                          ? [...user?.projects, project]
                          : [project],
                      });
                      dispatch(
                        setUser({
                          ...user,
                          projects: user?.projects
                            ? [...user?.projects, project]
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
                  style={{ textShadow: "2px 2px 2px black" }}
                  className="w-full mx-auto sticky bottom-3 rounded-3xl left-0 bg-cta hover:bg-opacity-90 text-white font-gotham text-lg px-2 py-1.5"
                >
                  ZATWIERDŹ PROJEKT
                </button>
              )}
              <>
                {project?.name &&
                  project?.time &&
                  project?.desc &&
                  project?.images?.length > 0 && (
                    <div className="w-full sticky bottom-0 flex flex-col bg-white p-4 rounded-xl">
                      <div
                        className="w-full mb-4 bg-primary text-white rounded-xl p-4 lg:p-6"
                        style={{ textShadow: "2px 2px 2px black" }}
                      >
                        <label htmlFor="days-range" className="font-bold">
                          Na ile dni chcesz dodać ofertę pracy? ({days} dni)
                        </label>
                        <div className="px-4">
                          <input
                            id="days-range"
                            type="range"
                            min="1"
                            max="30"
                            value={days}
                            onChange={handleDaysChange}
                            className="w-full mt-2"
                          />
                        </div>
                        <div className="text-lg font-semibold mt-2">
                          Cena: 💎{price.toFixed(2)}
                        </div>
                      </div>

                      <button
                        onClick={() => {
                          handleRecruitmentStart();
                          setProject({
                            images: [],
                            name: "",
                            time: "",
                            desc: "",
                          });
                        }}
                        style={{ textShadow: "2px 2px 2px black" }}
                        className="w-full sticky bottom-3 rounded-3xl left-0 bg-cta hover:bg-opacity-90 text-white font-gotham text-lg px-2 py-1.5"
                      >
                        ROZPOCZNIJ REKRUTACJĘ{" "}
                        {project?.name &&
                          project?.time &&
                          project?.desc &&
                          project?.images?.length > 0 && (
                            <div>(💎{price.toFixed(2)})</div>
                          )}
                      </button>
                    </div>
                  )}
              </>
            </>
          )}
        </div>
      )}
    </div>
  );
}
