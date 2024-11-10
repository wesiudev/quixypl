import Link from "next/link";
import { toast } from "react-toastify";
import { polishToEnglish } from "../../../utils/polishToEnglish";
import {
  FaChevronLeft,
  FaChevronRight,
  FaMinusCircle,
  FaPlus,
} from "react-icons/fa";

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
  jobs: any;
  user: any;
  formData: any;
  setFormData: any;
  setTagsOpenLevel: any;
}) {
  return (
    <>
      {formData?.tags?.length === 0 && (
        <h1 className="text-base font-bold text-black mt-2 font-coco">
          Stanowiska
        </h1>
      )}
      <div className="text-black mt-2 text-sm font-coco">
        {formData?.tags?.length === 0 &&
          !user?.seek &&
          user?.seek !== "ask" && (
            <p className="font-coco text-sm">
              Dodaj układ stanowisk. (możesz wybrać ich wiele dla jednego
              ogłoszenia)
            </p>
          )}
        {formData?.tags?.length > 0 && tagsOpenLevel === 0 && "Wybrane"}
        {formData?.tags?.length > 0 && tagsOpenLevel === 1 && "Kategorie"}
        {formData?.tags?.length > 0 &&
          tagsOpenLevel === 2 &&
          "Twoja oferta w strukturze strony"}
      </div>

      {formData?.tags && tagsOpenLevel === 1
        ? formData?.tags?.map((item: any, i: any) => (
            <div className="text-sm bg-slate-300  px-2 pb-2" key={i}>
              <div className="mt-2 w-full flex flex-wrap items-center font-gotham font-light">
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
        ? formData?.tags?.map((item: any, i: any) => (
            <div className="text-sm bg-slate-300  px-2 pb-2" key={i}>
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
      {configurationOpen && !slug?.title && (
        <div className="my-1.5 font-coco font-bold text-black">
          Wybierz kategorię
        </div>
      )}
      {slug?.title !== "" && category?.title === "" && (
        <div className="text-black font-coco flex flex-col mt-1">
          <div className="font-bold mb-1 bg-[#126b91] p-1  px-2 text-white w-max max-w-[100%]">
            {slug.title}
          </div>
          <div className="font-bold">Wybierz podkategorię</div>
        </div>
      )}
      {slug?.title !== "" && category?.title !== "" && (
        <div className="text-black font-coco flex flex-col mt-1">
          <div className="font-bold mb-1 bg-[#126b91] p-1  px-2 text-white w-max max-w-[100%]">
            {category.title}
          </div>
          <div className="font-bold">Wybierz stanowisko</div>
        </div>
      )}
      <div className=" flex flex-row items-start w-full">
        {!configurationOpen && slug.title === "" && (
          <button
            onClick={() => setConfigurationOpen(true)}
            className="ml-0.5 mr-0.5 my-2 text-lg w-max bg-[#126b91]  hover:bg-opacity-90 duration-100 text-white flex flex-row items-center justify-center outline-none h-[40px] aspect-square"
          >
            <FaPlus />
          </button>
        )}
        {configurationOpen && slug.title !== "" && category.title !== "" && (
          <button
            onClick={() => setCategory({ title: "", url: "" })}
            className="mr-0.5 mt-0.5 text-lg w-max bg-[#126b91]  hover:bg-opacity-90 duration-100 text-white flex flex-row items-center justify-center outline-none h-[40px] aspect-square"
          >
            <FaChevronLeft />
          </button>
        )}
        {configurationOpen && slug.title !== "" && category.title === "" && (
          <button
            onClick={() => {
              setSlug({ title: "", url: "" }), setConfigurationOpen(false);
            }}
            className="ml-0.5 mr-0.5 mt-0.5 text-lg w-max bg-[#126b91]  hover:bg-opacity-90 duration-100 text-white flex flex-row items-center justify-center outline-none h-[40px] aspect-square"
          >
            <FaChevronLeft />
          </button>
        )}
        {configurationOpen && slug.title === "" && (
          <div className="-ml-0.5 -mt-0.5 space-y-0.5">
            {jobs.map((item: any, i: any) => (
              <button
                onClick={() =>
                  setSlug({
                    title: item.title,
                    url: polishToEnglish(item.title),
                  })
                }
                className="ml-0.5 bg-[#126b91]  text-white font-light p-2"
                key={i}
              >
                {item.title}
              </button>
            ))}
          </div>
        )}
        {configurationOpen && category.title === "" && (
          <div className="-ml-0.5 space-y-0.5">
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
                        className="ml-0.5 bg-[#126b91]  text-white font-light p-2"
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
          <div className="-ml-0.5 space-y-0.5">
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
                                        tag.url === polishToEnglish(job.title)
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
                                          url: polishToEnglish(job.title),
                                          categoryUrl: polishToEnglish(
                                            category.title
                                          ),
                                          categoryTitle: category.title,
                                          slugUrl: polishToEnglish(slug.title),
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
                                className="ml-0.5 bg-[#126b91]  text-white font-light p-2"
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
