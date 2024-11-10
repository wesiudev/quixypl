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
    <div className="">
      <div
        className={`fixed w-screen h-full overflow-y-scroll left-0 bg-white xl:space-x-3 xl:-ml-3 font-semibold shadow-black ${
          productsOpen ? "pt-[65px] opacity-100 z-[500]" : "z-[-10] opacity-0"
        } scrollbar lg:hidden`}
      >
        <div className="bg-primary grid grid-cols-3 mx-auto">
          <Link
            onClick={resetHeader}
            href="/praca-zdalna"
            className="bg-[#126b91] hover:bg-[#468CA9] duration-75 text-white p-2 text-center text-sm"
          >
            Strona główna
          </Link>
          <Link
            onClick={resetHeader}
            href="/marketplace"
            className="bg-[#126b91] hover:bg-[#468CA9] duration-75 text-white p-2 text-center text-sm"
          >
            Rynek
          </Link>
          <Link
            onClick={resetHeader}
            href="/contact"
            className="bg-[#126b91] hover:bg-[#468CA9] duration-75 text-white p-2 text-center text-sm"
          >
            Skontaktuj się
          </Link>
          <Link
            onClick={resetHeader}
            href="/praca-zdalna"
            className=" duration-75 text-white p-2 text-center text-sm"
          >
            Firma
          </Link>
          <Link
            onClick={resetHeader}
            href="/register"
            className="bg-cta duration-75 text-white p-2 text-center text-sm"
          >
            Dołącz za darmo
          </Link>
          <Link
            onClick={resetHeader}
            href="/praca-zdalna?talent"
            className=" duration-75 text-white p-2 text-center text-sm"
          >
            Freelancer
          </Link>
        </div>
        <div className="bg-white p-6 sm:p-12">
          <h2 className="text-2xl font-extrabold text-black pb-6">
            Chcesz wyświetlić swoje usługi w naszej aplikacji?
          </h2>
          <p className="text-black pb-6">
            Zarejestruj się i skonfiguruj wygodnie konto oraz usługi aby
            rozpocząć pozyskiwanie zleceń.
          </p>
          <div className="flex items-center">
            <Link
              onClick={resetHeader}
              href="/register"
              className="text-black font-coco py-3 mr-3"
            >
              Przeglądaj usługi
            </Link>
            <Link
              onClick={resetHeader}
              href="/register"
              className="font-coco text-white px-6 py-3 bg-gradient-to-r from-primary to-cta"
            >
              Skonfiguruj konto
            </Link>
          </div>
        </div>
        <div className="w-full py-4 px-3 sm:px-5 flex items-center justify-between z-[200] sticky top-0 left-0 bg-gradient-to-r from-primary to-cta drop-shadow-lg shadow-zinc-800">
          <div className="flex flex-col">
            <p className="font-extralight text-white">
              Szukasz pracy lub zleceń?
            </p>
            <h2 className="text-white sm:text-lg font-extrabold">
              Przeglądaj tablice pracy zdalnej
            </h2>
          </div>
          <button
            onClick={() => {
              setMenuShow(true);
              setProductsOpen(false);
            }}
            className="text-black px-2 py-1.5 bg-white text-sm"
          >
            WIĘCEJ
          </button>
        </div>
        <div className="grid grid-cols-1 w-full">
          {jobs.map((job: any, i: any) => (
            <div className="flex flex-col" key={i}>
              <Image
                src={`/slug/${polishToEnglish(job.title)}1.webp`}
                width={1024}
                height={1024}
                alt={`${polishToEnglish(job.title)} - Pracuj Zdalnie`}
              />
              <div className="flex flex-col bg-gradient-to-r from-primary/20 to-cta/20">
                {job.data.map((item: any, i: any) => (
                  <div key={i} className="relative">
                    <div
                      title={`Pracuj zdalnie w ${item.title}`}
                      className="flex flex-col py-3 text-white font-bold bg-gradient-to-r from-primary to-cta w-full text-xl"
                    >
                      <p className="px-6 font-extralight font-coco text-sm">
                        {job.title}
                      </p>
                      <h4 className="px-6 font-extrabold">{item.title}</h4>
                    </div>

                    {/* Hover dropdown */}
                    <div className="flex w-[90%] mx-auto flex-wrap my-3">
                      {item.data.map((subcategory: any, i: any) => (
                        <Link
                          title={`Pracuj zdalnie w ${subcategory.title}`}
                          key={i}
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
        className={`fixed w-screen h-screen overflow-y-scroll top-[0px] left-0 bg-gray-300 xl:space-x-3 xl:-ml-3 font-semibold shadow-black ${
          menuShow ? "pt-[65px] opacity-100 z-[500]" : "z-[-10] opacity-0"
        }  pb-7 scrollbar xl:hidden`}
      >
        <div className="w-full sticky top-0 left-0 py-4 px-3 sm:px-5 flex items-center justify-between z-[203] bg-gradient-to-r from-primary to-cta border-b-[4px] border-primary">
          <div className="flex flex-col">
            <p className="font-extralight text-white">
              Chcesz wypróbować Quixy?
            </p>
            <h2 className="text-white font-extrabold">
              Sprawdź nasze usługi i funkcje
            </h2>
          </div>
          <button
            onClick={() => {
              setMenuShow(false);
              setProductsOpen(false);
            }}
            className="text-black px-2 py-1.5 bg-white"
          >
            WYJŚCIE
          </button>
        </div>
        <div className="relative flex flex-col justify-center">
          <div className="sticky top-0 right-0 grid lg:grid-cols-2 gap-1.5 h-max py-12 px-6">
            {secondMenuItems.map((item: any, i: number) => (
              <article key={i} className="w-full justify-between">
                {item && (
                  <Link
                    title={`Wypróbuj Quixy Talent™: ${item.urlLabel}`}
                    aria-label={`Link to ${item.urlLabel}`}
                    href={item.url}
                    className={`p-4 rounded-xl bg-gradient-to-r  from-primary to-cta hover:from-primary hover:to-cta min-h-[100px] group w-full font-bold text-sm sm:text-lg relative overflow-hidden flex items-center justify-between`}
                  >
                    <h4 className="text-white bg-opacity-50 px-2 font-extrabold w-full drop-shadow-xl shadow-black z-[202] py-2 text-lg sm:text-xl">
                      {item.urlLabel}
                    </h4>
                    <div className="flex relative z-[201]">
                      <item.icon className="text-white group-hover:text-white drop-shadow-sm shadow-black text-4xl" />
                    </div>
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
    </div>
  );
}
