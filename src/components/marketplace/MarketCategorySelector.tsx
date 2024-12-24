import Link from "next/link";
import jobs from "../../../public/14.09.2024.json";
import { FaChevronCircleLeft, FaChevronLeft } from "react-icons/fa";
import { FaCircleXmark, FaMagnifyingGlass } from "react-icons/fa6";
import { IoClose, IoCloseCircle } from "react-icons/io5";
import { v4 as uuidv4 } from "uuid";
import { AiFillThunderbolt } from "react-icons/ai";
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
    <div className="bg-white w-full">
      <h3 className="text-xl lg:text-3xl font-extrabold text-black">
        Wyszukiwarka usług
      </h3>

      <div className="my-1.5 font-bold text-black">Kategoria</div>
      {slug !== "" && category === "" && (
        <div className="text-black flex flex-col mt-1 w-full">
          <div className="font-bold mb-1 bg-gradient-to-b rounded-md from-primaryHoverStart to-primaryHoverEnd p-1 px-2 text-white w-max max-w-[100%]">
            {slug}
          </div>
          <div className="font-bold">Wybierz podkategorię</div>
        </div>
      )}
      {slug !== "" && category !== "" && (
        <div className="text-black flex flex-col mt-1 w-full">
          <div className="font-bold mb-1 bg-gradient-to-b rounded-md from-primaryHoverStart to-primaryHoverEnd p-1 px-2 text-white w-max max-w-[100%]">
            {slug}
          </div>
          <div className="font-bold">Podkategoria</div>
        </div>
      )}
      {slug !== "" && category !== "" && (
        <div className="flex flex-col mt-1 w-full">
          <div className="font-bold mb-1 bg-gradient-to-b rounded-md from-primaryHoverStart to-primaryHoverEnd p-1 px-2 text-white w-max max-w-[100%]">
            {category}
          </div>
          <div className="font-bold text-black">Wybierz kategorię</div>
        </div>
      )}

      <div className="flex flex-row items-start w-full gap-1">
        {slug !== "" && category !== "" && job === "" && (
          <button
            onClick={() => {
              setCategory("");
              setShowResults(false);
            }}
            className="rounded-md text-lg w-max bg-gradient-to-b from-accentStart to-accentEnd hover:bg-opacity-90 duration-100 text-white flex flex-row items-center justify-center outline-none h-[32px] aspect-square"
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
            className="rounded-md text-lg w-max bg-gradient-to-b from-accentStart to-accentEnd hover:bg-opacity-90 duration-100 text-white flex flex-row items-center justify-center outline-none h-[32px] aspect-square"
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
            className="rounded-md  text-lg w-max bg-gradient-to-b from-accentStart to-accentEnd hover:bg-opacity-90 duration-100 text-white flex flex-row items-center justify-center outline-none h-[32px] aspect-square"
          >
            <FaChevronLeft className="hover:scale-110" />
          </button>
        )}
        {slug === "" && (
          <div className="gap-1 flex flex-wrap">
            {jobs.map((item: any, k: any) => (
              <button
                onClick={() => setSlug(item.title)}
                className=" rounded-md bg-gradient-to-b from-primaryHoverStart to-primaryHoverEnd hover:bg-opacity-90 duration-100  text-white font-extralight p-1"
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
                  <div className="gap-1 flex flex-wrap">
                    {item.data.map((cat: any, j: any) => (
                      <button
                        onClick={() => setCategory(cat.title)}
                        className="rounded-md bg-gradient-to-b from-primaryHoverStart to-primaryHoverEnd hover:bg-opacity-90 duration-100  text-white font-extralight p-1"
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
                          <div className="gap-1 flex flex-wrap">
                            {cat.data.map((j: any, i: any) => (
                              <button
                                onClick={() => {
                                  setJob(j.title);
                                }}
                                className={`${
                                  slug !== "" &&
                                  category !== "" &&
                                  job === j.title
                                    ? "bg-gradient-to-b from-ctaStart to-ctaEnd"
                                    : "bg-gradient-to-b from-primaryHoverStart to-primaryHoverEnd"
                                } rounded-md hover:bg-opacity-90 duration-100  text-white font-extralight p-1`}
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
          className={`${
            !showResults && leads
              ? "from-ctaStart to-ctaEnd"
              : "from-red-400 to-red-500"
          } rounded-md px-4 py-2 mt-3 bg-gradient-to-b  to-cta text-white font-extralight font-coco text-xl flex items-center gap-2 hover:scale-105 duration-100`}
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
        <div className="flex-col font-coco text-center py-12 mt-3 bg-gradient-to-r from-primaryHoverStart/30 to-primaryHoverEnd/30 rounded-lg text-black flex items-center justify-center">
          <div
            style={{ boxShadow: "0px 1px 10px rgba(0,0,0,0.8)" }}
            className="rounded-full h-24 w-24 from-primaryStart to-primaryEnd bg-gradient-to-b flex items-center justify-center"
          >
            <AiFillThunderbolt className="text-4xl text-white" />
          </div>
          <p className="mt-4 max-w-xs text-gray-700">
            Brak aktywnych usług w przeglądanej kategorii
          </p>
          <Link
            href="/register"
            className="mt-2 text-sm bg-gradient-to-b from-ctaStart to-ctaEnd font-bold text-white px-4 py-2 rounded-md shadow-md hover:scale-105 duration-200"
          >
            Zarządzaj rynkiem
          </Link>
        </div>
      )}
    </div>
  );
}
