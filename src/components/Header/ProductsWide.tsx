"use client";
import Link from "next/link";
import { polishToEnglish } from "../../../utils/polishToEnglish";

export default function ProductsWide({
  width,
  setHovered,
  hovered,
  handleMouseEnter,
  handleMouseLeave,
  jobs,
  secondMenuItems,
}: {
  width: number;
  setHovered: any;
  hovered: string;
  handleMouseEnter: any;
  handleMouseLeave: any;
  jobs: any;
  secondMenuItems: any;
}) {
  return (
    <div
      onMouseEnter={() => {
        width >= 1024 && handleMouseEnter("cat");
      }}
      onMouseLeave={() => {
        width >= 1024 && handleMouseLeave();
      }}
      className={`z-[210] fixed lg:grid-cols-2 w-full max-h-[80vh] overflow-y-scroll top-0 left-0 bg-white xl:space-x-3 shadow-black ${
        hovered === "cat"
          ? "translate-y-[116px] lg:translate-y-[84px]"
          : "-translate-y-[100vh] opacity-0"
      } hidden lg:grid shadow-sm`}
    >
      <div className="relative mt-12 pb-36">
        <div className="sticky top-0 left-0 flex flex-col z-[500] container pl-4">
          <div className="flex flex-wrap pb-8 pt-4 mx-auto justify-center">
            {jobs.map((job: any, i: any) => (
              <div className={`w-[300px] flex flex-col font-coco`} key={i}>
                <Link
                  href={`/praca-zdalna/${polishToEnglish(job.title)}`}
                  title={`Praca Zdalna ${job.title}`}
                  className={`flex flex-col mt-3`}
                  key={i}
                  onClick={() => setHovered(false)}
                >
                  <span
                    style={{ textShadow: "2px 2px 5px gray" }}
                    className="text-white bg-gradient-to-r from-primary to-cta text-xl p-2 rounded-xl w-max font-light italic"
                  >
                    {job.title}
                  </span>
                </Link>
                <div className="flex flex-col mt-3">
                  {job.data.map((item: any, i: any) => (
                    <div key={i} className="relative group w-max">
                      <span
                        title={`Praca zdalna w ${job.title} jako ${item.title}`}
                        className="p-1 font-light w-max text-base text-black"
                      >
                        {item.title}
                      </span>

                      {/* Hover dropdown */}
                      <div className="flex flex-col absolute left-0 top-0 group-hover:-translate-y-0 -translate-y-[1000%] opacity-0 group-hover:opacity-100 z-50">
                        <Link
                          title={`Pracuj Zdalnie jako ${item.title}`}
                          className="rounded-t-lg p-1 px-2 text-white font-bold bg-gradient-to-r group-hover:from-primary group-hover:to-cta w-full text-left text-base"
                          href={`/praca-zdalna/${polishToEnglish(
                            job.title
                          )}/${polishToEnglish(item.title)}`}
                        >
                          {item.title}
                        </Link>
                        <div className="flex flex-col xl:flex-row xl:flex-wrap xl:w-[420px] w-[210px] rounded-b-lg overflow-hidden">
                          {item.data.map((subcategory: any, i: any) => (
                            <Link
                              title={`Szukaj pracy w ${job.title}/${item.title}/${subcategory.title}`}
                              key={i}
                              style={{ boxShadow: "0px 0px 4px black" }}
                              className={`bg-primary hover:bg-[#468CA9] duration-75 font-light p-2 text-white w-[210px] xl:min-w-[210px] max-w-[420px] ${
                                item.data.length % 2 !== 0 &&
                                i + 1 === item.data.length &&
                                "rounded-b-lg"
                              }`}
                              href={`/praca-zdalna/${polishToEnglish(
                                job.title
                              )}/${polishToEnglish(
                                item.title
                              )}/${polishToEnglish(subcategory.title)}`}
                            >
                              {subcategory.title}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="sticky top-0 right-0 flex flex-col">
        <div className="grid grid-cols-2 h-max">
          {secondMenuItems.map((item: any, i: number) => (
            <article key={i} className="w-full">
              {item && (
                <Link
                  title={`Wypróbuj Quixy Talent™: ${item.urlLabel}`}
                  aria-label={`Link to ${item.urlLabel}`}
                  href={item.url}
                  className={`aspect-square group w-full h-max text-white font-bold text-sm sm:text-lg text-center relative overflow-hidden flex flex-col items-center justify-center`}
                  style={{
                    backgroundColor: item.color,
                    boxShadow: "0px 0px 3px rgb(0, 0, 0)",
                  }}
                >
                  <div className="bg-black bg-opacity-50 duration-500 absolute top-0 left-0 w-full h-full z-[200]"></div>
                  <div className="absolute w-full h-full left-0 top-0 z-[50] opacity-100 hover:opacity-0 duration-300" />
                  <div className="mx-auto my-auto h-full w-full flex items-center justify-center relative z-[201]">
                    <div
                      className="group-hover:scale-90 duration-300 flex items-center justify-center w-[40%] p-[10%] rounded-full bg-opacity-50"
                      style={{
                        backgroundColor: item.color,
                        boxShadow: "0px 0px 5px black",
                      }}
                    >
                      <item.icon className="text-white drop-shadow-sm shadow-black w-full h-auto" />
                    </div>
                  </div>
                  <h4
                    style={{ textShadow: "0px 4px 6px rgb(0, 0, 0)" }}
                    className="text-center absolute bg-opacity-50 font-gotham text-white font-bold bottom-[10%] left-1/2 -translate-x-1/2 h-max w-full drop-shadow-xl shadow-black z-[202] py-2 text-lg sm:text-xl"
                  >
                    {item.urlLabel}
                  </h4>
                </Link>
              )}
            </article>
          ))}
        </div>
        {/* <div className="flex flex-col py-4">
          <h3 className="text-2xl text-black ">Sprawdź nasze Social Media</h3>
          <div className="flex items-center flex-wrap -ml-3 mt-3">
            <Link
              title="Zobacz TikTok Quixy - Biznes, Pomysły, Rady"
              href="#tiktok"
              className="flex items-center mt-3 ml-3"
            >
              <div
                style={{ boxShadow: "2px 2px 3px black" }}
                className="p-3 rounded-full bg-[#126b91]"
              >
                <FaTiktok className="text-xl text-white" />
              </div>
              <p className="text-xl ml-1 text-black">TikTok</p>
            </Link>
            <Link
              title="Zobacz Facebook Quixy - Biznes, Pomysły, Rady"
              href="#facebook"
              className="flex items-center mt-3 ml-3"
            >
              <div
                style={{ boxShadow: "2px 2px 3px black" }}
                className="p-3 rounded-full bg-[#126b91]"
              >
                <FaFacebook className="text-xl text-white" />
              </div>
              <p className="text-xl ml-1 text-black">Facebook</p>
            </Link>
          </div>
        </div> */}
      </div>
    </div>
  );
}
