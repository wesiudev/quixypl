import jobs from "../../../public/14.09.2024.json";
import { toast } from "react-toastify";
import { polishToEnglish } from "../../../utils/polishToEnglish";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { FaMagnifyingGlass } from "react-icons/fa6";

export default function MarketCategorySelector({
  tagsOpenLevel,
  configurationOpen,
  setConfigurationOpen,
  slug,
  setSlug,
  category,
  setCategory,
  formData,
  setFormData,
}: {
  tagsOpenLevel: any;
  configurationOpen: any;
  setConfigurationOpen: any;
  slug: any;
  setSlug: any;
  category: any;
  setCategory: any;
  formData: any;
  setFormData: any;
}) {
  return (
    <div className="bg-white rounded-xl p-3">
      <h1 className="text-2xl font-extrabold text-black mt-2">
        Przeglądaj usługi naszych freelancerów oraz firm
      </h1>
      {formData?.tags && tagsOpenLevel === 1
        ? formData?.tags?.map((item: any, i: any) => (
            <div className="text-sm bg-slate-300 px-2 pb-2" key={i}>
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
              className={`pr-1 mt-1 flex flex-wrap items-center font-gotham font-light text-white`}
            ></div>
          ))}
      {!slug?.title && (
        <div className="my-1.5 font-bold text-black">Wybierz kategorię</div>
      )}
      {slug.title && (
        <div className="my-1.5 font-bold text-black">Kategoria</div>
      )}
      {slug?.title !== "" && category?.title === "" && (
        <div className="text-black flex flex-col mt-1">
          <div className="font-bold mb-1 bg-gradient-to-r from-primary to-cta p-1 px-2 text-white w-max max-w-[100%]">
            {slug.title}
          </div>
          <div className="font-bold">Wybierz podkategorię</div>
        </div>
      )}
      {slug?.title !== "" && category?.title !== "" && (
        <div className="text-black flex flex-col mt-1">
          <div className="font-bold mb-1 bg-gradient-to-r from-primary to-cta p-1 px-2 text-white w-max max-w-[100%]">
            {slug.title}
          </div>
          <div className="font-bold">Podkategoria</div>
        </div>
      )}
      {slug?.title !== "" && category?.title !== "" && (
        <div className="flex flex-col mt-1">
          <div className="font-bold mb-1 bg-gradient-to-r from-primary to-cta p-1  px-2 text-white w-max max-w-[100%]">
            {category.title}
          </div>
          <div className="font-bold text-black">Wybierz kategorię</div>
        </div>
      )}
      <div className=" flex flex-row items-start w-full">
        {slug.title === "" && (
          <button
            onClick={() => setConfigurationOpen(true)}
            className="ml-0.5 mr-0.5 text-lg w-max bg-gradient-to-r from-primary to-cta hover:bg-opacity-90 duration-100 text-white flex flex-row items-center justify-center outline-none h-[40px] aspect-square"
          >
            <FaMagnifyingGlass />
          </button>
        )}
        {slug.title !== "" && category.title !== "" && (
          <button
            onClick={() => setCategory({ title: "", url: "" })}
            className="mr-0.5 mt-0.5 text-lg w-max bg-gradient-to-r from-primary to-cta hover:bg-opacity-90 duration-100 text-white flex flex-row items-center justify-center outline-none h-[40px] aspect-square"
          >
            <FaChevronLeft />
          </button>
        )}
        {slug.title !== "" && category.title === "" && (
          <button
            onClick={() => {
              setSlug({ title: "", url: "" }), setConfigurationOpen(false);
            }}
            className="ml-0.5 mr-0.5 mt-0.5 text-lg w-max bg-gradient-to-r from-primary to-cta hover:bg-opacity-90 duration-100 text-white flex flex-row items-center justify-center outline-none h-[40px] aspect-square"
          >
            <FaChevronLeft />
          </button>
        )}
        {slug.title === "" && (
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
        {category.title === "" && (
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
        {category.title !== "" && (
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
    </div>
  );
}
