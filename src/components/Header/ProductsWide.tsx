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
      style={{ boxShadow: "0px 0px 4px black" }}
      className={`z-[210] hidden fixed lg:block w-full max-h-[80vh] overflow-y-scroll top-0 rounded-xl left-0 bg-white xl:space-x-3 shadow-black ${
        hovered === "cat"
          ? "translate-y-[116px] lg:translate-y-[84px]"
          : "-translate-y-[100vh] opacity-0"
      }`}
    >
      <div className="relative mt-12 pb-36">
        <div className="sticky top-0 left-0 flex flex-col z-[500] pl-4">
          <div className="flex flex-wrap pb-8 pt-4 mx-auto">
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
                    className="text-white bg-gradient-to-r from-primary to-cta text-xl p-2  w-max font-light italic"
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
                          className=" p-1 px-2 text-white font-bold bg-gradient-to-r group-hover:from-primary group-hover:to-cta w-full text-left text-base"
                          href={`/praca-zdalna/${polishToEnglish(
                            job.title
                          )}/${polishToEnglish(item.title)}`}
                        >
                          {item.title}
                        </Link>
                        <div className="flex flex-col xl:flex-row xl:flex-wrap xl:w-[420px] w-[210px]  overflow-hidden">
                          {item.data.map((subcategory: any, i: any) => (
                            <Link
                              title={`Szukaj pracy w ${job.title}/${item.title}/${subcategory.title}`}
                              key={i}
                              style={{ boxShadow: "0px 0px 4px black" }}
                              className={`bg-primary hover:bg-[#468CA9] duration-75 font-light p-2 text-white w-[210px] xl:min-w-[210px] max-w-[420px] ${
                                item.data.length % 2 !== 0 &&
                                i + 1 === item.data.length &&
                                ""
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
    </div>
  );
}
