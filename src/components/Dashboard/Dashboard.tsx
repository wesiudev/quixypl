"use client";
import "moment/locale/pl";
import moment from "moment";
import Loading from "../../app/loading";
import { useDispatch, useSelector } from "react-redux";
import AccountHistory from "./ImageGenerator/dashboard/AccountHistory";
import Image from "next/image";
import { FaCog, FaUser, FaUserCog } from "react-icons/fa";
import { set_modals } from "@/redux/slices/modalsopen";
import { useState } from "react";
import Link from "next/link";
import ProjectCard from "./ImageGenerator/dashboard/ProjectCard";
import { IProject } from "@/types";
import { FaCoins } from "react-icons/fa6";

export default function Dashboard() {
  moment.locale("pl");
  const dispatch = useDispatch();
  const { user } = useSelector((state: any) => state.user);
  const { modals } = useSelector((state: any) => state.modals);
  const [emailInfo, setEmailInfo] = useState(false);
  return (
    <>
      {user ? (
        <div className="relative p-4 bg-gradient-to-br from-slate-800 to-primary via-primaryHover sm:p-6 md:p-8 lg:p-6 xl:p-16 2xl:p-24">
          <div className="grid grid-cols-1 h-max font-coco relative w-full mx-auto">
            <div>
              <div className="">
                <div className="flex flex-col">
                  <h1 className="text-3xl sm:text-5xl text-white font-gotham mb-4">
                    Panel Użytkownika
                  </h1>
                  {!user?.verified && (
                    <div className="bg-[#126b91] text-white p-3 font-gotham font-light mb-4 rounded-xl w-max max-w-[100%]">
                      Witaj w Quixy!🔥 Wysłaliśmy wiadomość aktywującą konto na
                      podany adres e-mail - {user?.email}{" "}
                      <button
                        onClick={() => setEmailInfo(true)}
                        className="underline"
                      >
                        zamknij
                      </button>
                    </div>
                  )}
                  <div
                    className="p-3 flex items-start bg-white rounded-xl h-max"
                    style={{ boxShadow: "inset 0px 0px 5px black" }}
                  >
                    <button
                      onClick={() => dispatch(set_modals({ config: true }))}
                      className="hover:opacity-80 duration-200 group"
                    >
                      {user.photoURL && (
                        <div className="rounded-full h-24 w-24 overflow-hidden relative">
                          <Image
                            src={user?.photoURL}
                            width={256}
                            height={256}
                            alt=""
                            style={{ boxShadow: "inset 0px 0px 5px black" }}
                            className="absolute inset-0 object-cover w-full h-full group-hover:scale-110 duration-200"
                          />
                        </div>
                      )}
                      {!user.photoURL && (
                        <div
                          style={{ boxShadow: "inset 0px 0px 8px black" }}
                          className="bg-[#126b91] rounded-full h-24 w-24 text-white flex items-center justify-center"
                        >
                          <FaUser className="text-3xl lg:text-5xl group-hover:scale-110 duration-200" />
                        </div>
                      )}
                    </button>
                    {!user?.configured &&
                      (user?.seek === "ask" || !user?.seek) && (
                        <div className="pl-4">
                          <h2 className="text-black font-gotham text-xl lg:text-2xl">
                            Twoje konto wymaga konfiguracji
                          </h2>
                          <p className="text-black font-light max-w-lg font-coco my-1">
                            Określ typ konta, by rozpocząć swoją przygodę w
                            Quixy
                          </p>
                          <button
                            onClick={() =>
                              dispatch(set_modals({ ...modals, config: true }))
                            }
                            className="flex items-center text-black"
                          >
                            <FaCog className="text-xl mr-1" />
                            Moje konto
                          </button>
                        </div>
                      )}
                    {user?.configured && user?.seek !== "ask" && (
                      <div className="flex flex-col h-max px-3">
                        {!user?.name && (
                          <h2 className="text-sm text-black drop-shadow-lg font-bold font-coco italic">
                            Imię (lub imię i nazwisko)
                          </h2>
                        )}
                        <h3 className="text-primary text-xl font-gotham font-bold">
                          {user?.name ? user?.name : "Nie podano"}
                        </h3>
                        <h3 className="text-black text-lg">
                          {user?.title && user?.title}
                        </h3>
                        <h3 className="text-black text-lg">
                          {user?.pseudo && user?.pseudo}
                        </h3>

                        <h3 className="text-black text-xs sm:text-base">
                          {user?.email &&
                            !user?.pseudo &&
                            !user?.title &&
                            user?.email}
                          {!user?.email && "Nie podano"}
                        </h3>
                        <button
                          onClick={() =>
                            dispatch(set_modals({ ...modals, config: true }))
                          }
                          className="flex items-center text-black mt-2"
                        >
                          <FaCog className="text-primary text-2xl mr-1" />
                          Moje konto
                        </button>
                      </div>
                    )}
                  </div>
                </div>
                {user?.seek !== "ask" && (
                  <div
                    style={{ boxShadow: "inset 0px 0px 5px black" }}
                    className={`bg-white p-5 lg:p-10 2xl:p-12 mt-6 mb-3 rounded-xl ${
                      !user?.configured && (user?.seek === "ask" || !user?.seek)
                        ? "hidden"
                        : ""
                    }`}
                  >
                    <h2 className="text-3xl lg:text-5xl text-black  drop-shadow-lg font-gotham mb-3">
                      Informacje
                    </h2>
                    {!user?.configured && (
                      <div className="text-black font-gotham font-light text-lg">
                        Skonfiguruj typ konta w ustawieniach
                      </div>
                    )}
                    {!user?.title && (
                      <div>
                        {user?.seek && user?.seek !== "ask" && (
                          <h2 className="text-xl text-black drop-shadow-lg font-gotham mt-6">
                            Tytuł
                          </h2>
                        )}
                        {(!user?.seek || user?.seek === "ask") && (
                          <h2 className="text-xl text-black drop-shadow-lg font-gotham mt-6">
                            Nazwa firmy lub działalności
                          </h2>
                        )}
                        <h3
                          className={`text-black text-lg font-gotham font-light`}
                        >
                          {user?.title ? user?.title : "Brak..."}
                        </h3>
                      </div>
                    )}
                    {!user?.title && (
                      <div>
                        <h2 className="text-xl text-black drop-shadow-lg font-gotham mt-6">
                          Unikalny link
                        </h2>

                        <h3
                          className={`text-black text-lg font-gotham font-light`}
                        >
                          {user?.pseudo ? user?.pseudo : "Brak..."}
                        </h3>
                      </div>
                    )}
                    <h2 className="text-xl text-black drop-shadow-lg font-gotham mt-6">
                      Unikalna nazwa
                    </h2>
                    <h3 className="text-black text-lg font-gotham font-light">
                      {user?.pseudo && (
                        <Link
                          className="text-primary"
                          href={`https://quixy.pl/${
                            user?.seek && user?.seek !== "ask"
                              ? "talent"
                              : "client"
                          }/${user?.pseudo}`}
                        >
                          {user?.pseudo &&
                            `https://quixy.pl/${
                              user?.seek && user?.seek !== "ask"
                                ? "talent"
                                : "client"
                            }/${user?.pseudo}`}
                        </Link>
                      )}
                      {!user?.pseudo && user?.seek && (
                        <div>
                          <button
                            className="text-primary font-bold"
                            onClick={() =>
                              dispatch(set_modals({ ...modals, config: true }))
                            }
                          >
                            Ustaw swoją unikalną nazwę talentu,
                          </button>{" "}
                          aby otrzymać unikalny link, dzięki któremu dotrzesz do
                          pracodawców.
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
                              Ustaw swoją unikalną nazwę klienta,
                            </button>{" "}
                            aby otrzymać unikalny link, dzięki któremu dotrzesz
                            do ekspertów poszukujących pracy.
                          </div>
                        )}
                    </h3>
                    {user?.seek && user?.seek !== "ask" && (
                      <h2 className="text-xl text-black font-gotham mt-6">
                        Specjalizacje
                      </h2>
                    )}
                    {!user?.seek && user?.seek !== "ask" && (
                      <h2 className="text-xl text-black font-gotham mt-6">
                        Specjalizacje firmy
                      </h2>
                    )}
                    <div className="w-full -ml-1 mt-1 flex flex-wrap items-center font-coco font-light text-white">
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
                      <h2 className="text-xl text-black drop-shadow-lg font-gotham mt-6">
                        Dostępność
                      </h2>
                    )}
                    {!user?.seek && user?.seek !== "ask" && (
                      <h2 className="text-xl text-black drop-shadow-lg font-gotham mt-6">
                        Wielkość firmy
                      </h2>
                    )}
                    {user?.seek && user?.seek !== "ask" && (
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
                      <h2 className="text-xl text-black drop-shadow-lg font-gotham mt-6">
                        Opis użytkownika
                      </h2>
                    )}
                    {!user?.seek && user?.seek !== "ask" && (
                      <h2 className="text-xl text-black drop-shadow-lg font-gotham mt-6">
                        Opis firmy
                      </h2>
                    )}
                    <h3 className={`text-black text-lg font-gotham font-light`}>
                      {user?.bio ? user?.bio : "Brak..."}
                    </h3>
                  </div>
                )}
              </div>
            </div>
            {user?.seek !== "ask" && (
              <div
                style={{ boxShadow: "inset 0px 0px 5px black" }}
                className={`${
                  !user?.configured && (user?.seek === "ask" || !user?.seek)
                    ? "hidden"
                    : ""
                } bg-white p-5 lg:p-10 2xl:p-12 mt-6 mb-3 rounded-xl h-max w-full`}
              >
                <h2
                  className={`${
                    user?.projects?.length > 0 ? "ml-3" : ""
                  } text-3xl lg:text-5xl text-black drop-shadow-lg font-gotham mb-3`}
                >
                  {user?.seek && user?.seek !== "ask" && "Projekty"}
                  {!user?.seek && user?.seek !== "ask" && "Oferty pracy"}
                </h2>
                {user?.projects?.length === 0 &&
                  user?.seek !== "ask" &&
                  user?.seek && (
                    <div className="text-lg text-black font-light">
                      Nie dodano żadnych projektów - możesz tego dokonać{" "}
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
                {user?.projects?.length === 0 &&
                  user?.seek !== "ask" &&
                  !user?.seek && (
                    <div className="text-lg text-black font-light">
                      Nie dodano żadnych ofert pracy - przeprowadź ⚡
                      <b>Szybką Rekrutację</b>{" "}
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
                {user?.projects?.length > 0 && (
                  <div>
                    {user?.projects?.map((project: IProject, i: any) => (
                      <ProjectCard key={i} project={project} />
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
          <div
            style={{ boxShadow: "inset 0px 0px 5px black" }}
            className="grid grid-cols-1 mt-6 2xl:grid-cols-2 bg-white p-5 lg:p-10 2xl:p-12  rounded-xl"
          >
            <div className="pr-6 h-full w-full">
              <h2 className="text-3xl font-gotham text-black flex items-center">
                <Image
                  src="/assets/quixy-logo.png"
                  width={224}
                  height={224}
                  alt="Logo serwisu quixy.pl"
                  className="mr-6 w-12 h-auto"
                />
                Twoje konto{" "}
              </h2>
              <div className="mt-3 text-xl font-light text-black ">
                Witaj{", "}
                {user?.name
                  ? `${user?.name} - Co chcesz dziś zrobić?`
                  : `${user?.email} - Skonfiguruj swoje konto!`}
              </div>
              {/* component for the future  */}
              {/* <h2 className="text-3xl font-gotham text-black  mt-6">
                Skrzynka odbiorcza
              </h2>
              {!user?.conversations?.length && (
                <div className="text-black italic font-light">
                  Nowe wiadomości (0)
                </div>
              )} */}
              {/* <Link
                href="/chat"
                className="font-gotham underline text-primary text-lg"
              >
                Przejdź do czatu
              </Link> */}
              <button
                onClick={() =>
                  dispatch(set_modals({ ...modals, quixies: true }))
                }
                className="flex items-center text-black font-coco mt-4 text-lg"
              >
                <FaCoins className="mr-2 text-primary text-2xl" />
                Doładuj Quixies
              </button>
              <button
                onClick={() =>
                  dispatch(set_modals({ ...modals, config: true }))
                }
                className="flex items-center text-black font-coco mt-1 text-lg"
              >
                <FaCog className="mr-2 text-primary text-2xl" />
                Ustawienia konta
              </button>
            </div>
            <AccountHistory />
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
}
