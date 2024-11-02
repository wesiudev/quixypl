import Link from "next/link";
import Discord from "./Discord";
import Image from "next/image";
import { polishToEnglish } from "../../utils/polishToEnglish";

/**
 * @function SlugFooter
 * @description Renders the footer of a page with a slug (e.g. /praca-zdalna/remote-jobs)
 * @param {Object} props Component props
 * @param {any} props.jobsList List of jobs to be rendered in the footer
 * @param {string} props.title Title of the page
 * @param {string} props.footerTitle Title of the footer
 * @returns {JSX.Element} The rendered footer
 */
export default function SlugFooter({
  jobsList,
  title,
  footerTitle,
}: {
  jobsList: any;
  title: string;
  footerTitle: string;
}) {
  return (
    <div className="flex flex-col px-6 lg:px-12 p-6 py-12 bg-gradient-to-r from-zinc-800 via-gray-800 to-zinc-950 relative z-50 overflow-hidden font-gotham">
      <div className="flex flex-col z-50 relative">
        <div className="mb-12">
          <h2 className="text-4xl text-white" style={{ lineHeight: 1.35 }}>
            Przeglądasz {footerTitle}
          </h2>
          <div className="bg-black/50 p-3 lg:p-6 mt-12  grid grid-cols-1 md:grid-cols-2 md:gap-4 xl:grid-cols-3 2xl:grid-cols-4 w-full">
            {jobsList.map((item: any, i: any) => (
              <div key={i} className="flex flex-col w-full">
                <h2 className="pt-[9px] text-white w-max max-w-full font-coco font-light italic text-xl lg:text-2xl 2xl:text-xl">
                  <span className="p-[9px] bg-gradient-to-r from-primary to-cta ">
                    {item.title}
                  </span>
                </h2>
                <div className="flex flex-row flex-wrap w-full justify-start my-4">
                  {item.data.map((cat: any, i: any) => (
                    <h3 key={i} className="w-full lg:w-max max-w-full">
                      <Link
                        href={`/praca-zdalna/${
                          polishToEnglish(title)
                            ? `${polishToEnglish(title)}/`
                            : ""
                        }${polishToEnglish(item.title)}/${polishToEnglish(
                          cat.title
                        )}`}
                        className="hover:underline w-full lg:w-max max-w-full font-light text-white text-sm sm:text-base p-2"
                      >
                        {cat.title}
                      </Link>
                    </h3>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="p-3 lg:p-6 bg-zinc-600/50 ">
          <div className="text-white text-lg drop-shadow-lg shadow-black italic mb-3">
            Powered by
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col">
              <div className="w-full grid grid-cols-2 justify-center space-x-6 items-center h-max bg-gradient-to-r from-blue-300 to-[#5865F2] p-4 ">
                <Link
                  href="https://openai.com/"
                  target="_blank"
                  title="openai"
                  className="  duration-200 group flex items-center justify-center"
                >
                  <Image
                    src="/assets/openai2.png"
                    width={100}
                    height={100}
                    alt=""
                    className="group-hover:scale-105 duration-200"
                  />
                </Link>

                <Link
                  href="https://react.dev/"
                  target="_blank"
                  title="react"
                  className="duration-200 group flex items-center justify-center"
                >
                  <Image
                    src="/assets/react.png"
                    width={100}
                    height={100}
                    alt=""
                    className="group-hover:scale-105 duration-200"
                  />
                </Link>
              </div>
              <div className="text-white text-lg drop-shadow-lg shadow-black italic my-3">
                Dev by
              </div>
              <div className="w-full grid grid-cols-2 justify-center space-x-6 items-center h-max bg-gradient-to-r from-blue-300 to-[#5865F2] p-4 ">
                <Link
                  href="https://wesiudev.com/"
                  target="_blank"
                  title="wesiudev"
                  className="duration-200 group flex items-center justify-center"
                >
                  <Image
                    src="/assets/wesiudev3.png"
                    width={300}
                    height={300}
                    alt="autor"
                    className="group-hover:scale-105 duration-200 w-48 h-auto mx-auto"
                  />
                </Link>
                <Link
                  href="http://goodday.great-site.net/"
                  target="_blank"
                  title="autor"
                  className="duration-200 group flex items-center justify-center"
                >
                  <Image
                    src="/assets/mrd.png"
                    width={100}
                    height={100}
                    alt=""
                    className="group-hover:scale-105 duration-200"
                  />
                </Link>
              </div>
            </div>
            <div className="flex justify-center lg:justify-end w-full mt-6 md:mt-0">
              {/* <Discord /> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
