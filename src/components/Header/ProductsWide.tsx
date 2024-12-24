"use client";
import Link from "next/link";
import { polishToEnglish } from "../../../utils/polishToEnglish";
import { FaFacebook, FaTiktok } from "react-icons/fa6";

export default function ProductsWide({
  width,

  hovered,
  handleMouseEnter,
  handleMouseLeave,
  jobs,
  secondMenuItems,

  setProductsOpen,
}: {
  width: number;

  hovered: string;
  handleMouseEnter: any;
  handleMouseLeave: any;
  jobs: any;
  secondMenuItems: any;

  setProductsOpen: any;
}) {
  function resetHeader() {
    handleMouseLeave();
  }
  return (
    <div
      onMouseEnter={() => {
        width >= 1024 && handleMouseEnter("cat");
      }}
      onMouseLeave={() => {
        width >= 1024 && handleMouseLeave();
      }}
      className={`z-[9999] fixed w-full max-h-[80vh] overflow-y-scroll top-0 left-0 bg-white shadow-black ${
        hovered === "cat"
          ? "translate-y-[116px] lg:translate-y-[84px]"
          : "-translate-y-[100vh] opacity-0"
      } hidden lg:grid shadow-sm`}
    >
      <div className="relative mt-12">
        <div className="sticky top-0 left-0 flex flex-col z-[500] px-12">
          <div className="gap-4 grid grid-cols-3">
            {jobs.map((job: any, i: any) => (
              <div className={` flex flex-col font-extrabold`} key={i}>
                <Link
                  href={`/praca-zdalna/${polishToEnglish(job.title)}`}
                  title={`Praca Zdalna ${job.title}`}
                  className={`border-2 border-white text-center rounded-lg flex flex-col bg-gradient-to-b from-primaryHoverStart to-primaryHoverEnd hover:scale-105 duration-100`}
                  key={i}
                  onClick={resetHeader}
                >
                  <span
                    style={{ textShadow: "2px 2px 5px gray" }}
                    className="text-white text-xl p-2"
                  >
                    {job.title}
                  </span>
                </Link>
                <div className="flex flex-col mt-3">
                  {job.data.map((item: any, i: any) => (
                    <div key={i} className="relative group w-max">
                      <div
                        title={`Praca zdalna ${job.title} / ${item.title}`}
                        className="group-hover:text-white duration-150 group-hover:bg-gradient-to-r group-hover:from-accentStart group-hover:to-accentEnd p-1 text-base text-black"
                      >
                        {item.title}
                      </div>

                      {/* Hover dropdown */}
                      <div className="mt-[4px] flex flex-col absolute left-0 top-0 group-hover:-translate-y-0 -translate-y-[1000%] opacity-0 group-hover:opacity-100 z-50">
                        <Link
                          onClick={resetHeader}
                          title={`Praca Zdalna ${item.title}`}
                          className="py-3.5 text-white font-bold w-full text-left text-base"
                          href={`/praca-zdalna/${polishToEnglish(
                            job.title
                          )}/${polishToEnglish(item.title)}`}
                        ></Link>
                        <div className="flex flex-col xl:flex-row xl:flex-wrap xl:w-[420px] w-[210px] overflow-hidden">
                          {item.data.map((subcategory: any, i: any) => (
                            <Link
                              onClick={() => resetHeader()}
                              title={`Szukaj pracy w ${job.title}/${item.title}/${subcategory.title}`}
                              key={i}
                              style={{ boxShadow: "inset 0px 0px 3px black" }}
                              className={`hover:underline bg-gradient-to-r from-primaryHoverStart to-primaryHoverEnd font-normal p-2 text-white w-[210px] xl:min-w-[210px] max-w-[420px] ${
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
      <div className="py-12 mt-12 relative flex flex-col px-12 bg-gradient-to-r from-primaryHoverStart to-primaryHoverEnd">
        <div className="flex items-center flex-wrap gap-4">
          <Link
            title="Zobacz TikTok Quixy - Biznes, Pomysły, Rady"
            target="_blank"
            href="https://www.tiktok.com/@biznespomysly"
            className="flex items-center"
          >
            <FaTiktok className="text-2xl text-white" />
          </Link>
          <Link
            title="Zobacz Facebook Quixy - Biznes, Pomysły, Rady"
            href="https://www.facebook.com/profile.php?id=61561855721397"
            target="_blank"
            className="flex items-center"
          >
            <FaFacebook className="text-2xl text-white" />
          </Link>
          <Link
            title="Zobacz Zakładkę Praca Zdalna"
            href="/praca-zdalna"
            target="_blank"
            className="ml-3 text-white text-lg"
          >
            /praca-zdalna
          </Link>
        </div>
        <div className="mt-6 grid lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 h-max">
          {secondMenuItems.map((item: any, i: number) => (
            <article key={i} className="w-full justify-between">
              {item && (
                <Link
                  title={`Wypróbuj ${item.urlLabel}`}
                  aria-label={item.urlLabel}
                  href={item.url}
                  className={`hover:underline border-2 border-white py-4 text-white rounded-lg bg-gradient-to-b from-primaryStart to-primaryEnd hover:from-accentStart hover:to-accentEnd group w-full font-bold relative overflow-hidden flex items-center justify-center gap-3`}
                >
                  <div className="flex relative z-[201]">
                    <item.icon className="drop-shadow-sm shadow-black text-4xl" />
                  </div>
                  <h4 className="font-extrabold drop-shadow-xl shadow-black z-[202] text-base xl:text-lg 2xl:text-xl">
                    {item.urlLabel}
                  </h4>
                </Link>
              )}
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
