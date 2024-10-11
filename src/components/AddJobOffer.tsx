"use client";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { collection, addDoc } from "firebase/firestore";
import Link from "next/link";
import { auth, db } from "@/firebase";
import { toast } from "react-toastify";
import {
  FaChevronLeft,
  FaChevronRight,
  FaMinusCircle,
  FaPlus,
  FaSave,
} from "react-icons/fa";
import Hero from "./Hero";
import { polishToEnglish } from "../../utils/polishToEnglish";
import jobs from "../../public/14.09.2024.json";
export default function AddJobOffer() {
  const [user, loading] = useAuthState(auth);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    requirements: "",
    category: "",
    location: "",
    salary: "",
    email: "",
    phone: "",
    website: "",
  });
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };
  const [configurationOpen, setConfigurationOpen] = useState(false);
  const [slug, setSlug] = useState({ title: "", url: "" });
  const [category, setCategory] = useState({ title: "", url: "" });
  const [tagsOpenLevel, setTagsOpenLevel] = useState(0);
  const [tagDeletion, setTagDeletion] = useState(false);
  const [selectedTag, setSelectedTag] = useState<any>({});
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const jobOffer = {
      ...formData,
      createdAt: Date.now(),
      authorId: user?.uid,
    };

    try {
      await addDoc(collection(db, "offers"), jobOffer);
      setFormData({
        title: "",
        description: "",
        requirements: "",
        category: "",
        location: "",
        salary: "",
        email: "",
        phone: "",
        website: "",
      });
      toast.success("Oferta pracy dodana pomyślnie!");
    } catch (error: any) {
      toast.error(error.message || "Wystąpił błąd podczas dodawania oferty.");
    }
  };

  const nextStep = () => setCurrentStep((prev) => prev + 1);
  const prevStep = () => setCurrentStep((prev) => prev - 1);

  if (loading) {
    return <p>Ładowanie...</p>;
  }

  if (!user) {
    return <p>Proszę się zalogować, aby dodać ofertę pracy.</p>;
  }

  return (
    <div className="relative overflow-hidden min-h-screen flex flex-col justify-center items-center p-6 bg-gray-200">
      <div
        style={{ boxShadow: "0px 0px 5px black" }}
        className="w-[100%] max-w-[40rem] h-max bg-white p-6 z-50 relative"
      >
        <h1 className="text-3xl font-gotham text-black">Dodaj ofertę pracy</h1>
        <div
          //   onSubmit={handleSubmit}
          className="flex flex-col w-full font-coco"
        >
          <StepOne
            nextStep={nextStep}
            formData={formData}
            handleChange={handleChange}
            currentStep={currentStep}
          />
          <StepTwo
            tagsOpenLevel={tagsOpenLevel}
            prevStep={prevStep}
            nextStep={nextStep}
            formData={formData}
            handleChange={handleChange}
            currentStep={currentStep}
            user={user}
            tagDeletion={tagDeletion}
            setSelectedTag={setSelectedTag}
            setTagDeletion={setTagDeletion}
            selectedTag={selectedTag}
            setFormData={setFormData}
            configurationOpen={configurationOpen}
            setConfigurationOpen={setConfigurationOpen}
            slug={slug}
            setSlug={setSlug}
            category={category}
            setCategory={setCategory}
          />
          <StepThree
            prevStep={prevStep}
            nextStep={nextStep}
            formData={formData}
            handleChange={handleChange}
            currentStep={currentStep}
          />
        </div>
        <Link
          href="/dashboard"
          className="mt-4 p-2 bg-primary text-white rounded-md hover:bg-primary-dark flex items-center justify-center"
        >
          <FaChevronLeft className="mr-2" />
          Powrót do panelu
        </Link>
      </div>
    </div>
  );
}

interface InputFieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
  isTextArea?: boolean;
  options?: { value: string; label: string }[];
  type?: string;
  placeholder: string;
}

const InputField: React.FC<InputFieldProps> = ({
  id,
  label,
  value,
  onChange,
  isTextArea = false,
  options,
  type = "text",
  placeholder,
}) => {
  return (
    <div>
      <label
        className="font-gotham font-light text-black drop-shadow-lg"
        htmlFor={id}
      >
        {label}
      </label>
      {isTextArea ? (
        <textarea
          id={id}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="p-2 border-2 border-primary text-black rounded-md w-full"
        />
      ) : options ? (
        <select
          id={id}
          value={value}
          onChange={onChange}
          className="p-2 border-2 border-primary text-black rounded-md w-full"
        >
          <option value="">Wybierz</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          type={type}
          id={id}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="p-2 border-2 border-primary text-black rounded-md w-full font-gotham font-light"
        />
      )}
    </div>
  );
};

function StepOne({
  formData,
  handleChange,
  nextStep,
  currentStep,
}: {
  formData: any;
  handleChange: any;
  nextStep: any;
  currentStep: number;
}) {
  return (
    <div>
      {currentStep === 1 && (
        <div>
          <InputField
            id="title"
            label="Tytuł"
            placeholder="Wpisz tytuł ogłoszenia"
            value={formData.title}
            onChange={handleChange}
          />
          <InputField
            id="description"
            label="Opis"
            placeholder="Opisz stanowisko"
            value={formData.description}
            onChange={handleChange}
            isTextArea
          />
          <InputField
            id="requirements"
            label="Wymagania"
            placeholder="Opisz wymagania i obowiązki stanowiska"
            value={formData.requirements}
            onChange={handleChange}
            isTextArea
          />
          <button
            type="button"
            onClick={() => {
              if (
                formData.title &&
                formData.description &&
                formData.requirements
              ) {
                nextStep();
              } else {
                return toast.error("Uzupełnij dane!", {
                  position: "top-right",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                });
              }
            }}
            className="p-2 bg-cta hover:bg-opacity-80 text-white rounded-md hover:bg-primary-dark"
          >
            Następny krok
          </button>
        </div>
      )}
    </div>
  );
}
function StepTwo({
  formData,
  handleChange,
  currentStep,
  prevStep,
  nextStep,
  tagsOpenLevel,
  setTagDeletion,
  selectedTag,
  setSelectedTag,
  tagDeletion,
  setFormData,
  user,
  configurationOpen,
  setConfigurationOpen,
  slug,
  setSlug,
  category,
  setCategory,
}: {
  formData: any;
  handleChange: any;
  currentStep: number;
  prevStep: any;
  nextStep: any;
  tagsOpenLevel: any;
  setTagDeletion: any;
  selectedTag: any;
  setSelectedTag: any;
  tagDeletion: any;
  setFormData: any;
  user: any;
  configurationOpen: any;
  setConfigurationOpen: any;
  slug: any;
  setSlug: any;
  category: any;
  setCategory: any;
}) {
  return (
    <div>
      {currentStep === 2 && (
        <div>
          {formData?.tags?.length === 0 && (
            <h1 className="text-base font-bold text-black">Stanowiska</h1>
          )}

          <div className="font-bold text-sm text-black flex flex-col">
            <div className="flex flex-row items-center flex-wrap">
              {formData?.tags?.length === 0 &&
                !user?.seek &&
                user?.seek !== "ask" &&
                "Wybierz kategorie stanowisk"}{" "}
              {formData?.tags?.length > 0 &&
                tagsOpenLevel === 0 &&
                "Wybrane Stanowiska"}
              {formData?.tags?.length > 0 &&
                tagsOpenLevel === 1 &&
                "Kategorie Stanowisk"}
              {formData?.tags?.length > 0 &&
                tagsOpenLevel === 2 &&
                "Twoja oferta w strukturze strony"}
              <div className={`${tagsOpenLevel === 0 ? "flex flex-col" : ""}`}>
                {formData?.tags && tagsOpenLevel === 1
                  ? formData?.tags?.map((item: any, i: any) => (
                      <div className="text-sm bg-slate-300 rounded-xl" key={i}>
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
                  ? formData?.tags?.map((item: any, i: any) => (
                      <div className="text-sm bg-slate-300 rounded-xl" key={i}>
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
                  : formData?.tags?.map((item: any, i: any) => (
                      <div
                        key={i}
                        className={`w-max max-w-[100%] ${
                          i > 0 && "ml-2"
                        } mt-2 flex flex-wrap items-center font-gotham font-light text-white`}
                      >
                        <div
                          className={`${
                            selectedTag.title === item.title ? "flex-col" : ""
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
                          {tagDeletion && selectedTag.title === item.title && (
                            <div className="flex flex-col w-[90%] my-2 sticky left-0 top-0 bg-black bg-opacity-60 p-3 rounded-md">
                              <h2>Usunąć {selectedTag?.title}?</h2>
                              <div className="grid grid-cols-2 gap-3 mt-3">
                                <button
                                  onClick={() => {
                                    const newTags = formData?.tags?.filter(
                                      (tag: any) =>
                                        tag.title !== selectedTag.title
                                    );
                                    setFormData({
                                      ...formData,
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
                <div className="gap-3">
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
                                                formData?.tags?.find(
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
                                                setFormData({
                                                  ...formData,
                                                  tags: [
                                                    ...(formData?.tags || []),
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
                      <h3 className="font-gotham font-light text-black drop-shadow-lg">
                        Nazwa Firmy/Działalności/Imię rekrutera
                      </h3>
                      <input
                        className="border border-primary rounded-md p-2 text-black font-light w-full"
                        value={formData?.name}
                        onChange={(e) => {
                          setFormData({
                            ...formData,
                            name: e.target.value,
                          });
                        }}
                        placeholder="Kto dodaje ofertę?"
                      />
                    </div>
                  )}
                  <InputField
                    id="location"
                    label="Lokalizacja"
                    placeholder="Lokalizacja biura (opcjonalnie)"
                    value={formData.location}
                    onChange={handleChange}
                  />
                  {!user?.seek && user?.seek !== "ask" && (
                    <div>
                      <h3 className="font-gotham font-light text-black drop-shadow-lg">
                        Wynagrodzenie
                      </h3>
                      <select
                        value={formData.salary}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            salary: e.target.value,
                          })
                        }
                        className="border border-primary rounded-md p-2 text-black font-light w-full"
                      >
                        <option value="Nie podano">Rodzaj wynagrodzenia</option>
                        <option value="Stawka godzinowa">
                          Stawka godzinowa
                        </option>
                        <option value="Stawka miesięczna">
                          Stawka miesięczna
                        </option>
                        <option value="Per Milestone">Per Milestone</option>
                        <option value="Prowizja">Prowizja</option>
                        <option value="Akcje i udziały">Akcje i udziały</option>
                        <option value="Inne">Inne</option>
                      </select>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <InputField
            id="salary"
            label="Wynagrodzenie"
            value={formData.salary}
            onChange={handleChange}
            placeholder="Wpisz wynagrodzenie"
          />
          <div className="flex justify-between">
            <button
              type="button"
              onClick={prevStep}
              className="p-2 bg-black text-white rounded-md hover:bg-cta"
            >
              Wstecz
            </button>
            <button
              type="button"
              onClick={() => {
                if (formData.category && formData.salary) {
                  nextStep();
                } else {
                  return toast.error("Uzupełnij dane!", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                  });
                }
              }}
              className="p-2 bg-cta hover:bg-opacity-80 text-white rounded-md hover:bg-primary-dark"
            >
              Następny krok
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function StepThree({
  formData,
  handleChange,
  currentStep,
  prevStep,
  nextStep,
}: {
  formData: any;
  handleChange: any;
  currentStep: number;
  prevStep: any;
  nextStep: any;
}) {
  return (
    <div>
      {currentStep === 3 && (
        <div>
          <InputField
            id="email"
            label="Email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Wpisz email kontaktowy"
          />
          <InputField
            id="phone"
            label="Telefon"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Wpisz numer telefonu"
          />
          <InputField
            id="website"
            label="Strona internetowa"
            value={formData.website}
            onChange={handleChange}
            placeholder="Podaj link do strony"
          />
          <div className="flex justify-between mt-4">
            <button
              type="button"
              onClick={prevStep}
              className="p-2 bg-black text-white rounded-md hover:bg-cta"
            >
              Wstecz
            </button>
            <button
              type="submit"
              className="p-2 bg-cta hover:bg-opacity-80 text-white rounded-md hover:bg-primary-dark flex items-center justify-center"
            >
              <FaSave className="mr-2 text-xl" />
              Dodaj ofertę
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
