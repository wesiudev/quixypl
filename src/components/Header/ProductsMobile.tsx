import Link from "next/link";
import { polishToEnglish } from "../../../utils/polishToEnglish";
import Image from "next/image";

export default function ProductsMobile({
  productsOpen,
  setProductsOpen,
  setMenuShow,
  jobs,
  menuShow,
  setHovered,
  secondMenuItems,
}: {
  productsOpen: boolean;
  setProductsOpen: Function;
  setMenuShow: Function;
  jobs: any;
  menuShow: boolean;
  setHovered: Function;
  secondMenuItems: any;
}) {
  return (
    <div className="font-gotham">
      <div
        className={`fixed w-screen h-full overflow-y-scroll left-0 bg-white xl:space-x-3 xl:-ml-3 font-semibold shadow-black ${
          productsOpen ? "pt-[65px] opacity-100 z-[500]" : "z-[-10] opacity-0"
        } scrollbar lg:hidden`}
      >
        <div className="w-full py-4 px-3 sm:px-5 flex items-center justify-between z-[200] sticky top-0 left-0 bg-white drop-shadow-lg shadow-zinc-800">
          <h2 className="text-black drop-shadow-md shadow-black sm:text-lg lg:text-xl font-bold">
            Dodaj ofertę lub szukaj pracy
          </h2>
          <button
            onClick={() => {
              setMenuShow(true);
              setProductsOpen(false);
            }}
            style={{ boxShadow: "0px 0px 5px black" }}
            className="text-white p-2 rounded-md bg-[#126b91] text-sm"
          >
            Więcej
          </button>
        </div>
        <div className="mt-2 flex items-center justify-start mx-auto flex-wrap">
          <Link
            href="/talent"
            className="ml-1.5 rounded-lg py-1 px-1.5 text-base drop-shadow-sm shadow-black text-white bg-primary hover:bg-primary/80 mt-1.5"
          >
            Zatrudnij talent
          </Link>
          <Link
            href="/client"
            className="ml-1.5 rounded-lg py-1 px-1.5 text-base drop-shadow-sm shadow-black text-white bg-primary hover:bg-primary/80 mt-1.5"
          >
            Przeglądaj Firmy
          </Link>
          <Link
            href="/about"
            className="ml-1.5 rounded-lg py-1 px-1.5 text-base drop-shadow-sm shadow-black text-white bg-primary hover:bg-primary/80 mt-1.5"
          >
            O nas
          </Link>
          <Link
            href="/contact"
            className="ml-1.5 rounded-lg py-1 px-1.5 text-base drop-shadow-sm shadow-black text-white bg-primary hover:bg-primary/80 mt-1.5"
          >
            Kontakt
          </Link>
          <Link
            href="/blog"
            className="ml-1.5 rounded-lg py-1 px-1.5 text-base drop-shadow-sm shadow-black text-white bg-primary hover:bg-primary/80 mt-1.5"
          >
            Blog
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-3 w-full pb-20">
          {jobs.map((job: any, i: any) => (
            <div className="mt-3 flex flex-col font-gotham" key={i}>
              <Link
                href={`/praca-zdalna/${polishToEnglish(job.title)}`}
                title={`${job.title} Oferty Pracy Zdalnej`}
                className={`flex flex-col mt-3`}
                key={i}
                onClick={() => setHovered(false)}
              >
                <Image
                  src={`/slug/${polishToEnglish(job.title)}1.webp`}
                  width={1024}
                  height={1024}
                  alt={`${polishToEnglish(job.title)} - Pracuj Zdalnie`}
                  style={{ boxShadow: "inset 0px 0px 6px black" }}
                />
              </Link>
              <div className="flex flex-col bg-gradient-to-r from-primary/50 to-cta/50">
                {job.data.map((item: any, i: any) => (
                  <div key={i} className="relative">
                    <div
                      title={`Pracuj zdalnie w ${item.title}`}
                      className="p-3 text-white font-bold bg-gradient-to-r from-primary to-cta w-full font-coco italic text-center text-3xl"
                    >
                      {item.title}
                    </div>

                    {/* Hover dropdown */}
                    <div className="flex items-center justify-center w-[90%] mx-auto flex-wrap my-3">
                      {item.data.map((subcategory: any, i: any) => (
                        <Link
                          title={`Pracuj zdalnie w ${subcategory.title}`}
                          key={i}
                          style={{ boxShadow: "1px 0px 4px black" }}
                          className="max-w-[300px] bg-[#126b91] hover:bg-[#468CA9] duration-75 font-light text-white text-sm p-2 w-max"
                          href={`/praca-zdalna/${polishToEnglish(
                            job.title
                          )}/${polishToEnglish(item.title)}/${polishToEnglish(
                            subcategory.title
                          )}`}
                        >
                          {subcategory.title}
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div
        className={`fixed w-screen h-screen overflow-y-scroll pb-20 top-[0px] left-0 bg-gray-300 xl:space-x-3 xl:-ml-3 font-semibold shadow-black ${
          menuShow ? "pt-[65px] opacity-100 z-[500]" : "z-[-10] opacity-0"
        }  pb-7 scrollbar xl:hidden`}
      >
        <div className="w-full sticky top-0 left-0 py-4 px-3 sm:px-5 flex items-center justify-between z-[203] bg-white border-b-[4px] border-primary">
          <h2 className="text-black drop-shadow-md shadow-black sm:text-lg lg:text-xl font-bold">
            Wypróbuj Quixy Talent&trade;
          </h2>
          <button
            onClick={() => {
              setMenuShow(false);
              setProductsOpen(false);
            }}
            className="text-white p-2 rounded-lg bg-[#126b91] text-sm"
          >
            Zamknij
          </button>
        </div>
        <div className="sticky top-0 grid grid-cols-2 md:grid-cols-3 h-max">
          {secondMenuItems.map((item: any, i: any) => (
            <div key={i} className="w-full">
              {item && (
                <Link
                  title="Wypróbuj Quixy Talent&trade;"
                  style={{
                    backgroundColor: item.color,
                    boxShadow: "0px 0px 3px rgb(0, 0, 0)",
                  }}
                  className={`relative aspect-square group w-full h-max text-white font-bold text-sm sm:text-lg text-center overflow-hidden flex flex-col items-center justify-center`}
                  href={item.url}
                  key={i}
                  onClick={() => {
                    setMenuShow(false);
                    setProductsOpen(false);
                  }}
                >
                  <div className="bg-black bg-opacity-10 absolute top-0 left-0 w-full h-full z-[200]" />
                  <div
                    className="absolute w-full h-full left-0 top-0 z-[50] opacity-100 hover:opacity-0 "
                    style={{ background: item.color }}
                  />
                  <div className="mx-auto my-auto h-full w-full flex items-center justify-center relative z-[201]">
                    <div className="flex items-center justify-center w-[50%] rounded-full bg-black bg-opacity-50 aspect-square">
                      {item.icon && (
                        <item.icon className="text-white xl:text-black text-4xl sm:text-4xl" />
                      )}
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
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
