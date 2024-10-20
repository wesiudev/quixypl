"use client";
import "moment/locale/pl";
import moment from "moment";
import Loading from "../../app/loading";
import { useDispatch, useSelector } from "react-redux";
import AccountHistory from "./ImageGenerator/dashboard/AccountHistory";
import Image from "next/image";
import { FaClipboard, FaCog, FaCogs, FaUser } from "react-icons/fa";
import { set_modals } from "@/redux/slices/modalsopen";
import ProjectCard from "./ImageGenerator/dashboard/ProjectCard";
import { IProject } from "@/types";
import { toast } from "react-toastify";
import UserPanel from "../UserPanel";
import MultiStepVerification from "./Settings/SettingsInputs/MultiStepVerification";

export default function Dashboard() {
  moment.locale("pl");
  const dispatch = useDispatch();
  const { user } = useSelector((state: any) => state.user);
  const { modals } = useSelector((state: any) => state.modals);

  function copyToClipboard(text: string) {
    navigator.clipboard.writeText(text);
  }
  return (
    <>
      {user ? (
        <div className="relative p-4 bg-gray-300 sm:p-6 md:p-8 lg:p-6 xl:p-12 ">
          <div className="grid grid-cols-1 h-max font-coco relative w-full mx-auto">
            <div>
              <div className="">
                <div className="flex flex-col">
                  <h1 className="text-3xl sm:text-5xl text-zinc-800 font-gotham">
                    Panel Użytkownika
                  </h1>
                  <UserPanel userData={user} />

                  <div
                    className={`grid grid-cols-1  gap-3 w-full ${
                      !user?.seek &&
                      !user?.pseudo &&
                      !user?.name &&
                      !user?.emailVerified &&
                      !user?.configured
                        ? "xl:grid-cols-2"
                        : "xl:grid-cols-1"
                    }`}
                  >
                    <div className="flex flex-col">
                      <div className="flex items-start bg-white rounded-xl h-max relative w-full">
                        <button
                          onClick={() =>
                            dispatch(set_modals({ ...modals, config: true }))
                          }
                          className="pl-4 pt-4 pb-4 hover:opacity-80 duration-200 group"
                        >
                          {user?.photoURL && (
                            <div className="rounded-lg w-24 aspect-square sm:w-40 overflow-hidden relative">
                              <Image
                                src={user?.photoURL}
                                width={256}
                                height={256}
                                alt=""
                                className="bg-white absolute inset-0 object-cover w-full h-full group-hover:scale-110 duration-200"
                              />
                            </div>
                          )}
                          {!user?.photoURL && (
                            <div
                              style={{ boxShadow: "inset 0px 0px 8px black" }}
                              className="bg-[#126b91] rounded-l-xl w-24 aspect-square sm:w-40 text-white flex items-center justify-center"
                            >
                              <FaUser className="text-3xl lg:text-5xl group-hover:scale-110 duration-200" />
                            </div>
                          )}
                        </button>
                        {!user?.configured &&
                          (user?.seek === "ask" || !user?.seek) && (
                            <div className="pl-4 pt-4">
                              <h2 className="text-black font-gotham">
                                Twoje konto wymaga konfiguracji
                              </h2>
                              <p className="text-black font-light max-w-lg font-coco my-1 text-sm">
                                Określ typ konta, by rozpocząć swoją przygodę w
                                Quixy
                              </p>
                              <button
                                onClick={() =>
                                  dispatch(
                                    set_modals({ ...modals, config: true })
                                  )
                                }
                                className="flex items-center text-black"
                              >
                                {user?.seek && user?.seek !== "ask" && (
                                  <>
                                    <FaCogs className="text-xl mr-1 text-primary" />
                                    Moje konto
                                  </>
                                )}
                                {!user?.seek && user?.seek !== "ask" && (
                                  <>
                                    <FaCogs className="text-xl mr-1 text-primary" />
                                    Panel Klienta
                                  </>
                                )}
                                {user?.seek === "ask" && (
                                  <>
                                    <FaCogs className="text-xl mr-1 text-primary" />
                                    Skonfiguruj konto
                                  </>
                                )}
                              </button>
                            </div>
                          )}
                        {user?.configured && user?.seek !== "ask" && (
                          <div className="flex flex-col h-max p-3">
                            {!user?.name && (
                              <h2 className="text-sm text-black drop-shadow-lg font-bold font-coco italic">
                                {user?.seek && "Imię (lub imię i nazwisko)"}
                                {(!user?.seek || user?.seek === "ask") &&
                                  "Nazwa firmy/dane rekrutera"}
                              </h2>
                            )}
                            <h3
                              className={`text-lg sm:text-xl font-coco font-bold ${
                                user?.name ? "text-black" : "text-primary"
                              }`}
                            >
                              {user?.name ? user?.name : "Nie podano"}
                            </h3>
                            <h3 className="text-black text-sm sm:text-lg font-coco font-bold">
                              {user?.title && user?.title}
                            </h3>
                            <h3 className="text-black text-sm sm:text-lg font-light font-coco">
                              {user?.pseudo && user?.pseudo}
                            </h3>
                            {user.configured &&
                              (!user.name || !user.pseudo || !user?.title) && (
                                <button
                                  onClick={() =>
                                    dispatch(
                                      set_modals({ ...modals, config: true })
                                    )
                                  }
                                  className="flex items-center text-black"
                                >
                                  <FaCogs className="text-xl mr-1 text-primary" />
                                  Dokończ konfigurację
                                </button>
                              )}
                          </div>
                        )}{" "}
                      </div>
                      {!user?.emailVerified && (
                        <div className="bg-white text-black p-3 font-coco my-3 rounded-xl w-full">
                          <b>Witaj w Quixy!</b>🔥 Wysłaliśmy wiadomość
                          aktywującą konto na podany adres e-mail -{" "}
                          {user?.email}{" "}
                        </div>
                      )}
                    </div>

                    {!user?.seek &&
                      !user?.pseudo &&
                      !user?.name &&
                      !user?.emailVerified &&
                      !user?.configured && (
                        <MultiStepVerification
                          seek={user?.seek}
                          pseudo={user?.pseudo}
                          name={user?.name}
                          emailVerified={user?.emailVerified}
                          configured={user?.configured}
                        />
                      )}
                  </div>
                </div>

                <div className="grid grid-cols-1 mt-3 2xl:grid-cols-2 bg-white p-3 lg:p-6 rounded-xl">
                  <div className="pr-6 h-full w-full">
                    <h2 className="text-3xl font-gotham text-zinc-800 flex items-center">
                      Twoje konto{" "}
                    </h2>
                    <div className="mt-3 text-xl font-light text-black">
                      Witaj{", "}
                      {user?.name
                        ? `${user?.name} - Co chcesz dziś zrobić?`
                        : `${user?.email} - Skonfiguruj swoje konto!`}
                    </div>

                    <h2 className="text-3xl font-gotham text-zinc-800 mt-3">
                      Skrzynka odbiorcza
                    </h2>
                    {!user?.conversations?.length && (
                      <div className="text-black italic font-light">
                        Nowe wiadomości (0)
                      </div>
                    )}
                    <button
                      onClick={() =>
                        dispatch(set_modals({ ...modals, currentChat: null }))
                      }
                      className="font-gotham underline text-cta text-sm"
                    >
                      Przejdź do czatu
                    </button>
                  </div>
                  <AccountHistory />
                </div>

                {user?.seek !== "ask" && (
                  <div
                    className={`bg-white my-3 rounded-xl ${
                      !user?.configured && (user?.seek === "ask" || !user?.seek)
                        ? "hidden"
                        : ""
                    }`}
                  >
                    <h2 className="w-full px-3 lg:px-6 py-3 bg-gradient-to-r from-primary to-cta text-3xl lg:text-5xl text-white drop-shadow-lg font-gotham rounded-t-xl">
                      Informacje
                    </h2>
                    <div className="p-6 !pt-3">
                      {!user?.configured && (
                        <div className="text-black font-gotham font-light text-lg mt-3">
                          Skonfiguruj typ konta w ustawieniach
                        </div>
                      )}
                      {!user?.title && (
                        <div>
                          {user?.seek && user?.seek !== "ask" && (
                            <h2 className="text-xl text-black drop-shadow-lg font-gotham mt-3">
                              Tytuł
                            </h2>
                          )}
                          {(!user?.seek || user?.seek === "ask") && (
                            <h2 className="text-xl text-black drop-shadow-lg font-gotham mt-3">
                              Nazwa firmy lub działalności
                            </h2>
                          )}
                          <h3
                            className={`text-black text-lg font-gotham font-light mt-3`}
                          >
                            {user?.title ? user?.title : "Brak..."}
                          </h3>
                        </div>
                      )}

                      <div>
                        <h2 className="text-xl text-black drop-shadow-lg font-gotham mt-3">
                          Unikalny link
                        </h2>
                        {!user?.pseudo && (
                          <h3
                            className={`text-black text-lg font-gotham font-light`}
                          >
                            Nie skonfigurowano...
                          </h3>
                        )}
                      </div>

                      <div className="text-black text-sm font-coco font-bold">
                        {user?.pseudo && (
                          <div className="flex flex-col">
                            <button
                              onClick={() => {
                                copyToClipboard(
                                  `https://quixy.pl/${
                                    user?.seek && user?.seek !== "ask"
                                      ? "talent"
                                      : "client"
                                  }/${user?.pseudo}`
                                );
                                toast.success("Skopiowano pomyślnie!", {
                                  position: "top-right",
                                  autoClose: 5000,
                                  hideProgressBar: false,
                                  closeOnClick: true,
                                  pauseOnHover: true,
                                  draggable: true,
                                  progress: undefined,
                                });
                              }}
                              className="relative flex items-center"
                              title="Skopiuj"
                            >
                              <div className="p-2 rounded-lg bg-cta mr-2">
                                <FaClipboard className="text-white w-5 h-5" />
                              </div>
                              {user?.pseudo &&
                                `https://quixy.pl/${
                                  user?.seek && user?.seek !== "ask"
                                    ? "talent"
                                    : "company"
                                }/${user?.pseudo}`}
                            </button>
                          </div>
                        )}
                        {!user?.pseudo && user?.seek && (
                          <div>
                            <button
                              className="text-primary font-bold"
                              onClick={() =>
                                dispatch(
                                  set_modals({ ...modals, config: true })
                                )
                              }
                            >
                              Ustaw swoją nazwę talentu,
                            </button>{" "}
                            aby otrzymać unikalny link, dzięki któremu dotrzesz
                            do pracodawców.
                          </div>
                        )}
                        {!user?.pseudo &&
                          (!user?.seek || user?.seek === "ask") && (
                            <div>
                              <button
                                className="text-primary font-bold"
                                onClick={() =>
                                  dispatch(
                                    set_modals({ ...modals, config: true })
                                  )
                                }
                              >
                                Ustaw swoją nazwę klienta,
                              </button>{" "}
                              aby otrzymać unikalny link, dzięki któremu
                              dotrzesz do ekspertów poszukujących pracy.
                            </div>
                          )}
                      </div>
                      {user?.seek && user?.seek !== "ask" && (
                        <h2 className="text-xl text-black font-gotham mt-3">
                          Specjalizacje
                        </h2>
                      )}
                      {!user?.seek && user?.seek !== "ask" && (
                        <h2 className="text-xl text-black font-gotham mt-3">
                          Specjalizacje firmy
                        </h2>
                      )}
                      <div className="w-full -ml-1 flex flex-wrap items-center font-coco font-light text-white">
                        {user?.tags?.map((item: any, i: any) => (
                          <div className="text-sm" key={i}>
                            <div className="ml-1 mt-1 rounded-xl bg-[#126b91] flex items-center px-2 py-0.5">
                              {item.title}
                            </div>
                          </div>
                        ))}
                        {!user?.tags?.length && (
                          <h3 className="text-black text-lg font-gotham font-light ml-1">
                            Brak podanych specjalizacji...
                          </h3>
                        )}
                      </div>
                      {user?.seek && user?.seek !== "ask" && (
                        <h2 className="text-xl text-black drop-shadow-lg font-gotham mt-3">
                          Dostępność
                        </h2>
                      )}
                      {!user?.seek && user?.seek !== "ask" && (
                        <h2 className="text-xl text-black drop-shadow-lg font-gotham mt-3">
                          Wielkość firmy
                        </h2>
                      )}
                      {user?.seek && user?.seek !== "ask" && (
                        <div className="-ml-1 flex items-center flex-wrap">
                          {user?.preferences?.length === 0 && (
                            <div className="ml-1 text-lg text-black font-light font-gotham">
                              Brak danych...
                            </div>
                          )}
                          {user?.preferences ? (
                            user?.preferences?.map((item: any, i: any) => (
                              <h3
                                key={i}
                                className={`ml-1 mt-1 rounded-xl bg-[#126b91] flex items-center px-2 py-0.5 text-sm font-coco font-light text-white`}
                              >
                                {item}
                              </h3>
                            ))
                          ) : (
                            <h3 className="text-black text-lg font-gotham font-light ml-1">
                              Brak danych o dostępności...
                            </h3>
                          )}
                        </div>
                      )}
                      {!user?.seek && user?.seek !== "ask" && (
                        <div className="-ml-1 flex items-center flex-wrap">
                          {user?.preferences ? (
                            user?.preferences?.map((item: any, i: any) => (
                              <h3
                                key={i}
                                className={`ml-1 mt-1 rounded-xl bg-[#126b91] flex items-center px-2 py-0.5 text-sm font-coco font-light text-white`}
                              >
                                {item}
                              </h3>
                            ))
                          ) : (
                            <h3 className="text-black text-lg font-gotham font-light ml-1">
                              Brak danych o liczbie pracowników...
                            </h3>
                          )}
                        </div>
                      )}

                      {user?.seek && user?.seek !== "ask" && (
                        <h2 className="text-xl text-black drop-shadow-lg font-gotham mt-3">
                          Opis użytkownika
                        </h2>
                      )}
                      {!user?.seek && user?.seek !== "ask" && (
                        <h2 className="text-xl text-black drop-shadow-lg font-gotham mt-3">
                          Opis firmy
                        </h2>
                      )}
                      <h3
                        className={`text-black text-lg font-gotham font-light`}
                      >
                        {user?.bio ? user?.bio : "Brak..."}
                      </h3>
                    </div>
                  </div>
                )}
              </div>
            </div>
            {user?.seek !== "ask" && (
              <div
                className={`${
                  !user?.configured && (user?.seek === "ask" || !user?.seek)
                    ? "hidden"
                    : ""
                } bg-white mb-3 rounded-xl h-max w-full`}
              >
                <h2 className="w-full px-3 lg:px-6 py-3 bg-gradient-to-r from-primary to-cta text-3xl lg:text-5xl text-white  drop-shadow-lg font-gotham mb-3 rounded-t-xl">
                  {user?.seek && user?.seek !== "ask" && "Portfolio"}
                  {!user?.seek && user?.seek !== "ask" && "Twoje oferty pracy"}
                </h2>
                {user?.projects?.length === 0 &&
                  user?.seek !== "ask" &&
                  user?.seek && (
                    <div className="text-lg text-black px-3 lg:px-6 pb-3 lg:pb-6 lg:pt-3">
                      Nie dodano żadnych projektów do portfolio - możesz tego
                      dokonać{" "}
                      <button
                        onClick={() =>
                          dispatch(set_modals({ ...modals, config: true }))
                        }
                        className="text-primary hover:no-underline underline"
                      >
                        klikając tutaj
                      </button>{" "}
                    </div>
                  )}
                {!user?.projects?.length &&
                  user?.seek !== "ask" &&
                  !user?.seek && (
                    <div className="text-lg text-black font-light font-coco px-3 lg:px-6 pb-3 lg:pb-6">
                      Nie dodano żadnych ofert pracy - przeprowadź ⚡
                      <b>Szybką Rekrutację</b>
                      <button
                        onClick={() =>
                          dispatch(set_modals({ ...modals, config: true }))
                        }
                        className="text-primary font-bold hover:no-underline underline flex items-center"
                      >
                        {user?.seek && user?.seek !== "ask" && (
                          <>
                            <FaCog className="text-xl mr-1 text-primary" />
                            Moje konto
                          </>
                        )}
                        {!user?.seek && user?.seek !== "ask" && (
                          <>
                            <FaUser className="text-xl mr-1 text-primary" />
                            Panel Klienta
                          </>
                        )}
                        {user?.seek === "ask" && (
                          <>
                            <FaCogs className="text-xl mr-1 text-primary" />
                            Skonfiguruj konto
                          </>
                        )}
                      </button>{" "}
                    </div>
                  )}
                {user?.projects?.length > 0 && (
                  <div className="px-3">
                    {user?.projects?.map((project: IProject, i: any) => (
                      <ProjectCard key={i} project={project} />
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
}
