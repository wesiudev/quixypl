import jobs from "../../../public/14.09.2024.json";
import { FaChevronCircleLeft, FaChevronLeft } from "react-icons/fa";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { IoClose, IoCloseCircle } from "react-icons/io5";
import { v4 as uuidv4 } from "uuid";
export default function MarketCategorySelector({
  setConfigurationOpen,
  configurationOpen,
  slug,
  setSlug,
  category,
  setCategory,
  setJob,
  job,
  setShowResults,
  leads,
  showResults,
}: {
  setConfigurationOpen: any;
  configurationOpen: any;
  slug: any;
  setSlug: any;
  category: any;
  setCategory: any;
  setJob: any;
  job: any;
  setShowResults: any;
  leads: any;
  showResults: any;
}) {
  return (
    <div className="bg-white">
      <h3 className="text-2xl font-extrabold text-black">Wyszukiwarka usług</h3>

      {!slug && <div className="my-1.5 font-bold text-black">Kategoria</div>}
      {slug !== "" && category === "" && (
        <div className="text-black flex flex-col mt-1">
          <div className="font-bold mb-1 bg-gradient-to-r from-primary to-cta p-1 px-2 text-white w-max max-w-[100%]">
            {slug}
          </div>
          <div className="font-bold">Wybierz podkategorię</div>
        </div>
      )}
      {slug !== "" && category !== "" && (
        <div className="text-black flex flex-col mt-1">
          <div className="font-bold mb-1 bg-gradient-to-r from-primary to-cta p-1 px-2 text-white w-max max-w-[100%]">
            {slug}
          </div>
          <div className="font-bold">Podkategoria</div>
        </div>
      )}
      {slug !== "" && category !== "" && (
        <div className="flex flex-col mt-1">
          <div className="font-bold mb-1 bg-gradient-to-r from-primary to-cta p-1  px-2 text-white w-max max-w-[100%]">
            {category}
          </div>
          <div className="font-bold text-black">Wybierz kategorię</div>
        </div>
      )}

      <div className="flex flex-row items-start w-full gap-0.5">
        {slug !== "" && category !== "" && job === "" && (
          <button
            onClick={() => {
              setCategory("");
              setShowResults(false);
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
              setShowResults(false);
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
              setShowResults(false);
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
                className=" bg-[#126b91] hover:bg-opacity-90 duration-100  text-white font-extralight p-2"
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
                  <div className="gap-0.5 flex flex-wrap">
                    {item.data.map((cat: any, j: any) => (
                      <button
                        onClick={() => setCategory(cat.title)}
                        className="bg-[#126b91] hover:bg-opacity-90 duration-100  text-white font-extralight p-2"
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
                          <div className="gap-0.5 flex flex-wrap">
                            {cat.data.map((j: any, i: any) => (
                              <button
                                onClick={() => {
                                  setJob(j.title);
                                }}
                                className={`${
                                  slug !== "" &&
                                  category !== "" &&
                                  job === j.title
                                    ? "bg-gradient-to-r from-primary to-cta"
                                    : "bg-[#126b91]"
                                }  hover:bg-opacity-90 duration-100  text-white font-extralight p-2`}
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
      {slug !== "" && (
        <button
          onClick={() => {
            if (slug !== "" && leads && !showResults) {
              setShowResults(true);
            } else {
              setShowResults(false);
              setSlug("");
              setCategory("");
              setJob("");
            }
          }}
          className="p-3 mt-3 bg-gradient-to-r from-primary to-cta text-white font-extralight font-coco text-xl flex items-center gap-2"
        >
          {!showResults && leads ? (
            <>
              {" "}
              <FaMagnifyingGlass /> Znalezione usługi: <b>{leads}</b>
            </>
          ) : (
            <>
              {" "}
              <IoCloseCircle /> Zakończ wyszukiwanie
            </>
          )}
        </button>
      )}
      {slug && !leads && (
        <div className="p-3 mt-3 bg-gradient-to-r from-primary to-cta text-white flex items-center gap-2">
          Brak aktywnych usług w przeglądanej kategorii - dodaj swoje usługi i
          rozpocznij pozyskiwanie klientów!
        </div>
      )}
    </div>
  );
}
