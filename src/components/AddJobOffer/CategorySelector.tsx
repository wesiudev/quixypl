import Link from "next/link";
import { toast } from "react-toastify";
import { polishToEnglish } from "../../../utils/polishToEnglish";
import {
  FaChevronCircleLeft,
  FaChevronLeft,
  FaChevronRight,
  FaMinusCircle,
  FaPlus,
} from "react-icons/fa";
import { v4 as uuidv4 } from "uuid";
export default function CategorySelector({
  tagsOpenLevel,
  setTagDeletion,
  selectedTag,
  setSelectedTag,
  tagDeletion,
  configurationOpen,
  setConfigurationOpen,
  slug,
  setSlug,
  category,
  setCategory,
  jobs,
  user,
  formData,
  setFormData,
  setTagsOpenLevel,
  job,
  setJob,
}: {
  tagsOpenLevel: any;
  setTagDeletion: any;
  selectedTag: any;
  setSelectedTag: any;
  tagDeletion: any;
  configurationOpen: any;
  setConfigurationOpen: any;
  slug: any;
  setSlug: any;
  category: any;
  setCategory: any;
  jobs?: any;
  user?: any;
  formData: any;
  setFormData: any;
  setTagsOpenLevel: any;
  job: any;
  setJob: any;
}) {
  return (
    <>
      <div className="mt-2 font-extrabold text-black">Kategoria</div>
      {slug !== "" && category === "" && (
        <div className="text-black flex flex-col mt-1">
          <div className="font-coco font-bold bg-gradient-to-r from-primary to-cta p-1 px-2 text-white w-max max-w-[100%]">
            {slug}
          </div>
          <div className="font-extrabold mt-2">Wybierz podkategorię</div>
        </div>
      )}
      {slug !== "" && category !== "" && (
        <div className="text-black flex flex-col mt-1">
          <div className="font-coco font-bold mb-1 bg-gradient-to-r from-primary to-cta p-1 px-2 text-white w-max max-w-[100%]">
            {slug}
          </div>
          <div className="font-extrabold">Podkategoria</div>
        </div>
      )}
      {slug !== "" && category !== "" && (
        <div className="flex flex-col mt-1">
          <div className="font-coco font-bold mb-1 bg-gradient-to-r from-primary to-cta p-1  px-2 text-white w-max max-w-[100%]">
            {category}
          </div>
          <div className="font-extrabold text-black">Wybierz kategorię</div>
        </div>
      )}

      <div className="flex flex-row items-start w-full gap-0.5">
        {slug !== "" && category !== "" && job === "" && (
          <button
            onClick={() => {
              setCategory("");
            }}
            className="text-lg w-max bg-gradient-to-r from-primary to-cta hover:bg-opacity-90 duration-100 text-white flex flex-row items-center justify-center outline-none h-[40px] aspect-square"
          >
            <FaChevronLeft className="hover:scale-110" />
          </button>
        )}
        {slug !== "" && category !== "" && job !== "" && (
          <button
            onClick={() => {
              setJob("");
            }}
            className="text-lg w-max bg-gradient-to-r from-primary to-cta hover:bg-opacity-90 duration-100 text-white flex flex-row items-center justify-center outline-none h-[40px] aspect-square"
          >
            <FaChevronCircleLeft className="hover:scale-110" />
          </button>
        )}
        {slug !== "" && category === "" && (
          <button
            onClick={() => {
              setSlug(""), setConfigurationOpen(false);
            }}
            className=" text-lg w-max bg-gradient-to-r from-primary to-cta hover:bg-opacity-90 duration-100 text-white flex flex-row items-center justify-center outline-none h-[40px] aspect-square"
          >
            <FaChevronLeft className="hover:scale-110" />
          </button>
        )}
        {slug === "" && (
          <div className="gap-0.5 flex flex-wrap">
            {jobs.map((item: any, k: any) => (
              <button
                onClick={() => setSlug(item.title)}
                className="font-coco bg-[#126b91] hover:bg-opacity-90 duration-100  text-white p-2"
                key={uuidv4()}
              >
                {item.title}
              </button>
            ))}
          </div>
        )}
        {category === "" && (
          <div>
            {jobs.map((item: any, i: any) => (
              <div key={uuidv4()}>
                {item.title === slug && (
                  <div className="gap-0.5 grid grid-cols-1">
                    {item.data.map((cat: any, j: any) => (
                      <button
                        onClick={() => setCategory(cat.title)}
                        className="font-coco bg-[#126b91] hover:bg-opacity-90 duration-100  text-white p-2"
                        key={uuidv4()}
                      >
                        {cat.title}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
        {category !== "" && (
          <div>
            {jobs.map((item: any, i: any) => (
              <div key={uuidv4()}>
                {item.title === slug && (
                  <div>
                    {item.data.map((cat: any, i: any) => (
                      <div key={uuidv4()}>
                        {cat.title === category && (
                          <div className="gap-0.5 grid grid-cols-1">
                            {cat.data.map((j: any, i: any) => (
                              <button
                                onClick={() => {
                                  setJob(j.title);
                                }}
                                className={`font-coco ${
                                  slug !== "" &&
                                  category !== "" &&
                                  job === j.title
                                    ? "font-extrabold bg-gradient-to-r from-primary to-cta"
                                    : "bg-[#126b91] "
                                } ${
                                  job && job !== j.title ? "hidden" : ""
                                } hover:bg-opacity-90 duration-100 text-white p-2`}
                                key={uuidv4()}
                              >
                                {j.title}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {formData?.tags && tagsOpenLevel === 1
        ? formData?.tags?.map((item: any, i: any) => (
            <div className="text-sm bg-slate-300 px-2 pb-2" key={i}>
              <div className="mt-2 w-full flex flex-wrap items-center font-gotham font-light">
                <div className="bg-gradient-to-r from-primary to-cta p-1 text-white mt-2">
                  {item.slugTitle}
                </div>
                <div className="flex items-center">
                  <FaChevronRight className="mx-1 mt-2" />
                  <div className="bg-gradient-to-r from-primary to-cta p-1 text-white mt-2">
                    {item.title}
                  </div>
                </div>
              </div>
            </div>
          ))
        : tagsOpenLevel === 2
        ? formData?.tags?.map((item: any, i: any) => (
            <div className="text-sm bg-slate-300 px-2 pb-2" key={i}>
              <div className="mt-2 w-full flex flex-wrap items-center font-gotham font-light">
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
        : formData?.tags?.map((item: any, i: any) => (
            <div
              key={i}
              className={`  pr-1 mt-1 flex flex-wrap items-center font-gotham font-light text-white`}
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
                          const newTags = formData?.tags?.filter(
                            (tag: any) => tag.title !== selectedTag.title
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

      {formData?.tags?.length > 0 && (
        <div className="">
          <h2 className="mt-2 text-black">Widok oferty</h2>
          <div className="mt-2 w-full grid grid-cols-2 sm:grid-cols-3 gap-2 text-white font-bold text-sm md:text-lg">
            <button
              onClick={() => setTagsOpenLevel(0)}
              className={`bg-[#126b91] ${
                tagsOpenLevel === 0
                  ? "bg-opacity-100 hover:bg-opacity-90"
                  : "bg-opacity-80 hover:bg-opacity-100"
              } px-2 py-1.5 `}
            >
              Prosty
            </button>
            <button
              onClick={() => setTagsOpenLevel(1)}
              className={`bg-[#126b91] ${
                tagsOpenLevel === 1
                  ? "bg-opacity-100 hover:bg-opacity-90"
                  : "bg-opacity-80 hover:bg-opacity-100"
              } px-2 py-1.5 `}
            >
              Rozszerzony
            </button>
            <button
              onClick={() => setTagsOpenLevel(2)}
              className={`bg-[#126b91] ${
                tagsOpenLevel === 2
                  ? "bg-opacity-100 hover:bg-opacity-90"
                  : "bg-opacity-80 hover:bg-opacity-100"
              } px-2 py-1.5 `}
            >
              Całość
            </button>
          </div>
        </div>
      )}
    </>
  );
}
