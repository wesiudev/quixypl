"use client";
import { setUser } from "@/redux/slices/user";
import Image from "next/image";
import { useDispatch } from "react-redux";

export default function ChooseAccountType(props: any) {
  const dispatch = useDispatch();
  const { user, setChangesWereMade } = props;
  return (
    <div className={`relative w-full bg-white p-6 lg:p-12`}>
      <div className="flex flex-col">
        <div>
          <label className="text-lg font-semibold text-black ">
            Rodzaj konta
          </label>
          <p className="font-gotham font-light text-black">
            Twoje konto nie jest jeszcze w pełni skonfigurowane. Wybierz rodzaj
            profilu
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-7 my-6">
            <button
              onClick={() => {
                dispatch(setUser({ ...user, seek: false }));
                setChangesWereMade(true);
              }}
              className={`hover:bg-opacity-80 hover:shadow-sm hover:shadow-primary duration-300 p-3 flex flex-col py-5 border-gray-300 border hover:border-primary ${
                !user?.seek &&
                user?.seek !== "ask" &&
                "bg-opacity-80 shadow-primary shadow-sm border-primary"
              }`}
            >
              <div className="flex flex-row justify-between items-start w-full">
                <Image
                  src="/assets/artist.png"
                  width={100}
                  height={100}
                  alt=""
                  className="w-12 h-12"
                />
                <div className="relative flex items-center justify-center border-gray-300 rounded-full h-5 w-5 border-[2px]">
                  <div
                    className={`${
                      (!user?.seek || user?.seek === "ask") &&
                      "border-[10px] duration-75 border-primary"
                    } w-0 h-0 bg-primary rounded-full`}
                  ></div>
                  <div
                    className={`${
                      (!user?.seek || user?.seek === "ask") &&
                      "border duration-75 border-white"
                    } w-2.5 h-2.5 rounded-full absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2`}
                  ></div>
                </div>
              </div>
              <span className="text-left font-gotham font-light text-black mt-4">
                Dołączam jako klient, chcę zatrudnić freelancera lub firmę
              </span>
            </button>

            <button
              onClick={() => {
                dispatch(setUser({ ...user, seek: true }));
                setChangesWereMade(true);
              }}
              className={`hover:bg-opacity-80 hover:shadow-sm hover:shadow-primary duration-300 p-3 flex flex-col py-5 border-gray-300 border hover:border-primary ${
                user?.seek === true &&
                user?.seek !== "ask" &&
                "bg-opacity-80 shadow-primary shadow-sm border-primary"
              }`}
            >
              <div className="flex flex-row justify-between items-start w-full">
                <Image
                  src="/assets/client.png"
                  width={100}
                  height={100}
                  alt=""
                  className="w-12 h-12"
                />
                <div className="relative flex items-center justify-center border-gray-300 rounded-full h-5 w-5 border-[2px]">
                  <div
                    className={`${
                      user?.seek === true &&
                      user?.seek !== "ask" &&
                      "border-[10px] duration-75 border-primary"
                    } w-0 h-0 bg-primary  rounded-full`}
                  ></div>
                  <div
                    className={`${
                      user?.seek === true &&
                      user?.seek !== "ask" &&
                      "border duration-75 border-white"
                    } w-2.5 h-2.5 rounded-full absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2`}
                  ></div>
                </div>
              </div>
              <span className="text-left font-gotham font-light text-black mt-4">
                Jestem firmą lub freelancerem, chcę zdobyć zlecenia lub znaleźć
                pracę
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
