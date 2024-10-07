import Link from "next/link";
import Discord from "./Discord";
import Image from "next/image";
import { polishToEnglish } from "../../utils/polishToEnglish";
import Hero from "./Hero";

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
    <div className="bg-white flex flex-col px-6 lg:px-12 p-6 py-12 font-gotham overflow-hidden">
      <div className="flex flex-col z-50 relative">
        <div className="mb-12">
          <h2
            className="text-4xl font-bold text-black"
            style={{ lineHeight: 1.35 }}
          >
            Przeglądasz {footerTitle}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
            {jobsList.map((item: any, i: any) => (
              <div key={i} className="flex flex-col mt-8">
                <h2 className="group">
                  <Link
                    href={`/praca-zdalna${
                      title !== "praca-zdalna" && `/${polishToEnglish(title)}`
                    }/${polishToEnglish(item.title)}`}
                    title={item.h1}
                    className="w-max flex items-center text-cta text-2xl font-bold"
                  >
                    {item.title}
                  </Link>
                </h2>
                {item.data.map((cat: any, i: any) => (
                  <h3
                    key={i}
                    className="group mt-2 hover:underline underline-offset-2"
                  >
                    <Link
                      href={`/praca-zdalna/${polishToEnglish(
                        title
                      )}/${polishToEnglish(item.title)}/${polishToEnglish(
                        cat.title
                      )}`}
                      className="flex items-center text-black font-light"
                    >
                      {cat.title}
                    </Link>
                  </h3>
                ))}
              </div>
            ))}
          </div>
        </div>
        <div className="p-3 lg:p-6 bg-zinc-600 rounded-xl">
          <div className="text-white text-lg drop-shadow-lg shadow-black italic mb-3">
            Powered by
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col">
              <div className="w-full grid grid-cols-2 justify-center space-x-6 items-center h-max bg-gradient-to-r from-blue-300 to-[#5865F2] p-4 rounded-md">
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
              <div className="w-full grid grid-cols-2 justify-center space-x-6 items-center h-max bg-gradient-to-r from-blue-300 to-[#5865F2] p-4 rounded-md">
                <Link
                  href="https://wesiudev.com/"
                  target="_blank"
                  title="wesiudev"
                  className="duration-200 group flex items-center justify-center"
                >
                  <Image
                    src="/assets/wesiudev3.png"
                    width={100}
                    height={100}
                    alt="autor"
                    className="group-hover:scale-105 duration-200"
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
              <Discord />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
