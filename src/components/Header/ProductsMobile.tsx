import Link from "next/link";
import { polishToEnglish } from "../../../utils/polishToEnglish";

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
          productsOpen ? "pt-[74px] opacity-100 z-[500]" : "z-[-10] opacity-0"
        } scrollbar lg:hidden`}
      >
        <div className="w-full py-4 px-3 sm:px-5 flex items-center justify-between z-[200] border-b-[4px]">
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
        <div className="mt-3 flex items-center justify-start mx-auto flex-wrap px-3 sm:px-5">
          <Link
            href="/business-ideas"
            style={{ textShadow: "2px 2px 2px black" }}
            className="ml-1.5 p-1 rounded-lg text-base drop-shadow-sm shadow-black text-white bg-cta mt-1.5"
          >
            Pomysły AI&trade;
          </Link>
          <Link
            href="/register"
            style={{ textShadow: "2px 2px 2px black" }}
            className="ml-1.5 p-1 rounded-lg text-base drop-shadow-sm shadow-black text-white bg-cta mt-1.5"
          >
            Obrazy AI&trade;
          </Link>
          <Link
            href="/marketplace"
            style={{ textShadow: "2px 2px 2px black" }}
            className="ml-1.5 p-1 rounded-lg text-base drop-shadow-sm shadow-black text-white bg-cta mt-1.5"
          >
            Rynek projektów&trade;
          </Link>
          <Link
            href="/about"
            style={{ textShadow: "2px 2px 2px black" }}
            className="ml-1.5 p-1 rounded-lg text-base drop-shadow-sm shadow-black text-white bg-cta mt-1.5"
          >
            O nas
          </Link>
          <Link
            href="/talent"
            style={{ textShadow: "2px 2px 2px black" }}
            className="ml-1.5 p-1 rounded-lg text-base drop-shadow-sm shadow-black text-white bg-cta mt-1.5"
          >
            Quixy Talent&trade;
          </Link>
          <Link
            href="/blog"
            style={{ textShadow: "2px 2px 2px black" }}
            className="ml-1.5 p-1 rounded-lg text-base drop-shadow-sm shadow-black text-white bg-cta mt-1.5"
          >
            O nas
          </Link>
          <Link
            href="/contact"
            style={{ textShadow: "2px 2px 2px black" }}
            className="ml-1.5 p-1 rounded-lg text-base drop-shadow-sm shadow-black text-white bg-cta mt-1.5"
          >
            Kontakt
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full px-3 sm:px-5 pt-10 pb-20">
          {jobs.map((job: any, i: any) => (
            <div className="flex flex-col" key={i}>
              <Link
                className={`bg-black bg-opacity-10 w-full flex mb-3 flex-col text-lg text-black text-left p-3`}
                href={`/praca-zdalna/${polishToEnglish(job.title)}`}
                key={i}
                title={`Dodaj ofertę pracy`}
              >
                <h2 className="text-primary">{job.title}</h2>
                <span className="text-sm !font-light">kategoria</span>
              </Link>
              <div className="flex flex-col">
                {job.data.map((item: any, i: any) => (
                  <>
                    <Link
                      href={`/praca-zdalna/${polishToEnglish(
                        job.title
                      )}/${polishToEnglish(item.title)}`}
                      title={`Zobacz oferty pracy zdalnej ${item.title}`}
                      style={{ textShadow: "3px 3px 3px black" }}
                      className="my-3 w-full text-cta font-gotham text-3xl"
                      key={i}
                    >
                      <h3>{item.title}</h3>
                    </Link>
                    <div className="">
                      {item.data.map((offer: any, i: any) => (
                        <Link
                          href={`/praca-zdalna/${polishToEnglish(
                            job.title
                          )}/${polishToEnglish(item.title)}/${polishToEnglish(
                            offer.title
                          )}`}
                          title={`Zobacz oferty pracy zdalnej ${offer.title}`}
                          className="w-full text-black font-coco text-lg py-2"
                          key={i}
                        >
                          <h4>{offer.title}</h4>
                        </Link>
                      ))}
                    </div>
                  </>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div
        className={`fixed w-screen h-screen overflow-y-scroll pb-20 top-[0px] left-0 bg-gray-300 xl:space-x-3 xl:-ml-3 font-semibold shadow-black ${
          menuShow ? "pt-[74px] opacity-100 z-[500]" : "z-[-10] opacity-0"
        }  pb-7 scrollbar xl:hidden`}
      >
        <div className="w-full sticky top-0 left-0 py-4 px-3 sm:px-5 flex items-center justify-between z-[203] bg-white border-b-[4px] border-primary">
          <h2 className="text-black drop-shadow-md shadow-black sm:text-lg lg:text-xl  font-bold">
            Wypróbuj Quixy Talent&trade;
          </h2>
          <button
            onClick={() => {
              setMenuShow(false);
              setProductsOpen(false);
            }}
            style={{ boxShadow: "0px 0px 5px black" }}
            className="text-white p-2 rounded-md bg-[#126b91] text-sm"
          >
            Zamknij
          </button>
        </div>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 h-max p-3">
          {secondMenuItems.map((item: any, i: any) => (
            <div key={i} className="w-full">
              {item && (
                <Link
                  title="Wypróbuj Quixy Talent&trade;"
                  style={{
                    backgroundColor: item.color,
                    boxShadow: "0px 0px 3px rgb(0, 0, 0)",
                  }}
                  className={`aspect-square rounded-lg group w-full h-max text-white font-bold text-sm sm:text-lg text-center relative overflow-hidden flex flex-col items-center justify-center`}
                  href={item.url}
                  key={i}
                  onClick={() => {
                    setMenuShow(false);
                    setProductsOpen(false);
                  }}
                >
                  <div className="bg-black bg-opacity-10  absolute top-0 left-0 w-full h-full z-[200]"></div>
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
                    className="bg-black bg-opacity-50 font-gotham text-white font-bold sticky bottom-0 left-0 w-full drop-shadow-xl shadow-black z-[202] text-xs sm:text-sm 2xl:text-base py-2"
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
