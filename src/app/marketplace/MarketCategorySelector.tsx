import jobs from "../../../public/14.09.2024.json";
import { FaChevronLeft } from "react-icons/fa";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { v4 as uuidv4 } from "uuid";
export default function MarketCategorySelector({
  setConfigurationOpen,
  slug,
  setSlug,
  category,
  setCategory,
  setJob,
}: {
  setConfigurationOpen: any;
  slug: any;
  setSlug: any;
  category: any;
  setCategory: any;
  setJob: any;
}) {
  return (
    <div className="bg-white rounded-xl p-3 lg:p-6">
      <h1 className="text-2xl font-extrabold text-black">
        Przeglądaj usługi naszych freelancerów oraz firm
      </h1>
      {!slug && (
        <div className="my-1.5 font-bold text-black">Wybierz kategorię</div>
      )}
      {slug !== "" && (
        <div className="my-1.5 font-bold text-black">Kategoria</div>
      )}
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
      <div className=" flex flex-row items-start w-full">
        {slug === "" && (
          <button
            onClick={() => setConfigurationOpen(true)}
            className="ml-0.5 mr-0.5 text-lg w-max bg-gradient-to-r from-primary to-cta hover:bg-opacity-90 duration-100 text-white flex flex-row items-center justify-center outline-none h-[40px] aspect-square"
          >
            <FaMagnifyingGlass />
          </button>
        )}
        {slug !== "" && category !== "" && (
          <button
            onClick={() => {
              setCategory(""), setJob("");
            }}
            className="mr-0.5 text-lg w-max bg-gradient-to-r from-primary to-cta hover:bg-opacity-90 duration-100 text-white flex flex-row items-center justify-center outline-none h-[40px] aspect-square"
          >
            <FaChevronLeft />
          </button>
        )}
        {slug !== "" && category === "" && (
          <button
            onClick={() => {
              setSlug(""), setConfigurationOpen(false);
            }}
            className="ml-0.5 mr-0.5 text-lg w-max bg-gradient-to-r from-primary to-cta hover:bg-opacity-90 duration-100 text-white flex flex-row items-center justify-center outline-none h-[40px] aspect-square"
          >
            <FaChevronLeft />
          </button>
        )}
        {slug === "" && (
          <div className="-ml-0.5">
            {jobs.map((item: any, k: any) => (
              <button
                onClick={() => setSlug(item.title)}
                className="ml-0.5 bg-[#126b91]  text-white font-light p-2"
                key={uuidv4()}
              >
                {item.title}
              </button>
            ))}
          </div>
        )}
        {category === "" && (
          <div className="-ml-0.5">
            {jobs.map((item: any, i: any) => (
              <div key={uuidv4()}>
                {item.title === slug && (
                  <div>
                    {item.data.map((cat: any, j: any) => (
                      <button
                        onClick={() => setCategory(cat.title)}
                        className="ml-0.5 bg-[#126b91]  text-white font-light p-2"
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
          <div className="-ml-0.5">
            {jobs.map((item: any, i: any) => (
              <div key={uuidv4()}>
                {item.title === slug && (
                  <div>
                    {item.data.map((cat: any, i: any) => (
                      <div key={uuidv4()}>
                        {cat.title === category && (
                          <div>
                            {cat.data.map((job: any, i: any) => (
                              <button
                                onClick={() => {
                                  setJob(job.title);
                                }}
                                className="ml-0.5 bg-[#126b91]  text-white font-light p-2"
                                key={uuidv4()}
                              >
                                {job.title}
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
    </div>
  );
}
