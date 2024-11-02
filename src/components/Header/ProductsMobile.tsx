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
  function resetHeader() {
    setMenuShow(false);
    setProductsOpen(false);
  }
  return (
    <div className="font-gotham">
      <div
        className={`fixed w-screen h-full overflow-y-scroll left-0 bg-white xl:space-x-3 xl:-ml-3 font-semibold shadow-black ${
          productsOpen ? "pt-[65px] opacity-100 z-[500]" : "z-[-10] opacity-0"
        } scrollbar lg:hidden`}
      >
        <div className="px-6 py-3 bg-gradient-to-r from-primary/20 to-cta/20 flex items-center justify-start mx-auto flex-wrap">
          <Link
            onClick={resetHeader}
            href="/praca-zdalna"
            style={{ boxShadow: "1px 0px 4px black" }}
            className="bg-[#126b91] hover:bg-[#468CA9] duration-75 text-white p-2 w-max font-coco"
          >
            Klient
          </Link>
          <Link
            onClick={resetHeader}
            href="/praca-zdalna?talent"
            style={{ boxShadow: "1px 0px 4px black" }}
            className="bg-[#126b91] hover:bg-[#468CA9] duration-75 text-white p-2 w-max font-coco"
          >
            Freelancer
          </Link>
          <Link
            onClick={resetHeader}
            href="/register"
            style={{ boxShadow: "1px 0px 4px black" }}
            className="bg-[#126b91] hover:bg-[#468CA9] duration-75 text-white p-2 w-max font-coco"
          >
            Dołącz za darmo
          </Link>
          <Link
            onClick={resetHeader}
            href="/about"
            style={{ boxShadow: "1px 0px 4px black" }}
            className="bg-[#126b91] hover:bg-[#468CA9] duration-75 text-white p-2 w-max font-coco"
          >
            O nas
          </Link>
          <Link
            onClick={resetHeader}
            href="/contact"
            style={{ boxShadow: "1px 0px 4px black" }}
            className="bg-[#126b91] hover:bg-[#468CA9] duration-75 text-white p-2 w-max font-coco"
          >
            Kontakt
          </Link>
          <Link
            onClick={resetHeader}
            href="/news"
            style={{ boxShadow: "1px 0px 4px black" }}
            className="bg-[#126b91] hover:bg-[#468CA9] duration-75 text-white p-2 w-max font-coco"
          >
            Blog
          </Link>
        </div>
        <div className="w-full py-4 px-3 sm:px-5 flex items-center justify-between z-[200] sticky top-0 left-0 bg-white drop-shadow-lg shadow-zinc-800">
          <h2 className="text-black drop-shadow-md shadow-black sm:text-lg lg:text-xl font-bold">
            Dodaj ofertę o pracę lub szukaj pracy zdalnej jako freelancer
          </h2>
          <button
            onClick={() => {
              setMenuShow(true);
              setProductsOpen(false);
            }}
            className="text-white px-2 py-1.5 bg-gradient-to-r from-primary to-cta text-sm"
          >
            Więcej
          </button>
        </div>
        <div className="grid grid-cols-1 w-full">
          {jobs.map((job: any, i: any) => (
            <div className="flex flex-col font-gotham" key={i}>
              <Image
                src={`/slug/${polishToEnglish(job.title)}1.webp`}
                width={1024}
                height={1024}
                alt={`${polishToEnglish(job.title)} - Pracuj Zdalnie`}
                style={{ boxShadow: "inset 0px 0px 6px black" }}
              />
              <div className="flex flex-col bg-gradient-to-r from-primary/20 to-cta/20">
                {job.data.map((item: any, i: any) => (
                  <div key={i} className="relative">
                    <div
                      title={`Pracuj zdalnie w ${item.title}`}
                      className="py-3 text-white font-bold bg-gradient-to-r from-primary to-cta w-full text-xl"
                    >
                      <div className="w-[90%] mx-auto">{item.title}</div>
                    </div>

                    {/* Hover dropdown */}
                    <div className="flex w-[90%] mx-auto flex-wrap my-3">
                      {item.data.map((subcategory: any, i: any) => (
                        <Link
                          title={`Pracuj zdalnie w ${subcategory.title}`}
                          key={i}
                          style={{ boxShadow: "1px 0px 4px black" }}
                          onClick={resetHeader}
                          className="max-w-[300px] bg-white hover:bg-gray-200 duration-75 text-black p-2 w-max"
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
            className="text-white px-2 py-1.5 bg-gradient-to-r from-primary to-cta text-sm"
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
                    style={{ textShadow: "1px 1px 1px black" }}
                    className="text-center absolute bg-opacity-50 font-coco italic text-white font-light bottom-[10%] left-1/2 -translate-x-1/2 h-max w-full drop-shadow-xl shadow-black z-[202] py-2 text-sm sm:text-lg lg:text-xl"
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
