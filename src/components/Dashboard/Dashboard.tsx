"use client";
import "moment/locale/pl";
import moment from "moment";
import Loading from "../../app/loading";
import { useDispatch, useSelector } from "react-redux";
import AccountHistory from "./ImageGenerator/dashboard/AccountHistory";
import Image from "next/image";
import {
  FaClipboard,
  FaCog,
  FaCogs,
  FaPlusCircle,
  FaUser,
} from "react-icons/fa";
import { set_modals } from "@/redux/slices/modalsopen";
import ProjectCard from "./ImageGenerator/dashboard/ProjectCard";
import { IProject } from "@/types";
import { toast } from "react-toastify";
import MultiStepVerification from "./Settings/SettingsInputs/MultiStepVerification";
import { useState } from "react";
import ReactConfetti from "react-confetti";
import Link from "next/link";
import { FaBriefcase, FaEye } from "react-icons/fa6";
async function sendVerificationEmail(email: string, verificationCode: string) {
  const data = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/sendVerificationEmail?email=${email}&verificationCode=${verificationCode}`,
    { cache: "no-store" }
  );
  return data;
}
export default function Dashboard() {
  moment.locale("pl");
  const dispatch = useDispatch();
  const { user } = useSelector((state: any) => state.user);
  const { modals } = useSelector((state: any) => state.modals);

  function copyToClipboard(text: string) {
    navigator.clipboard.writeText(text);
  }
  const [isAnimating, setIsAnimating] = useState(false);

  return (
    <>
      {isAnimating && <ReactConfetti />}

      {user ? (
        <div className="relative">
          <div className="grid grid-cols-1 h-max font-coco relative w-full mx-auto">
            <div>
              <div className="">
                <div className="flex flex-col bg-white p-3">
                  <div
                    className={`grid grid-cols-1 w-full ${
                      !user?.seek &&
                      !user?.pseudo &&
                      !user?.name &&
                      !user?.emailVerified &&
                      !user?.configured
                        ? "xl:grid-cols-2"
                        : "xl:grid-cols-1"
                    }`}
                  >
                    {!user?.emailVerified && (
                      <div className="rounded-lg bg-gradient-to-r from-primary to-cta text-white p-3 font-coco w-full">
                        <b>Witaj w Quixy!</b>🔥 Wysłaliśmy wiadomość aktywującą
                        konto na podany adres e-mail - {user?.email}{" "}
                        <button
                          onClick={() =>
                            sendVerificationEmail(user?.email, user?.uid)
                          }
                          className="underline hover:no-underline"
                        >
                          E-mail nie dotarł?
                        </button>
                      </div>
                    )}
                    <div className="grid grid-cols-1 2xl:grid-cols-2 bg-white p-3 lg:p-6">
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
                          Twoje zlecenia
                        </h2>
                        <div className="py-2">
                          {!user?.conversations?.length && (
                            <div className="text-sm text-black">
                              Wszystkie Zlecenia (
                              {user?.conversations?.length || 0})
                            </div>
                          )}
                          {!user?.conversations?.length && (
                            <div className="text-sm text-black">
                              Nowe Zlecenia ({user?.conversations?.length || 0})
                            </div>
                          )}
                          {!user?.conversations?.length && (
                            <div className="text-sm text-black">
                              Zarchiwizowane zlecenia (
                              {user?.conversations?.length || 0})
                            </div>
                          )}
                        </div>
                        <Link
                          title="Zobacz wszystkie zlecenia"
                          href="/dashboard/applications"
                          className="w-max text-white bg-gradient-to-r from-primary to-cta hover:no-underline underline flex items-center px-2 py-1.5 rounded-lg mt-1"
                        >
                          <FaEye className="mr-2 text-lg" /> Zobacz wszystkie
                        </Link>
                      </div>
                      <AccountHistory />
                    </div>
                    {(!user?.seek ||
                      !user?.pseudo ||
                      !user?.name ||
                      !user?.emailVerified ||
                      !user?.configured) && (
                      <MultiStepVerification
                        seek={user?.seek}
                        pseudo={user?.pseudo}
                        name={user?.name}
                        emailVerified={user?.emailVerified}
                        configured={user?.configured}
                        user={user}
                        setIsAnimating={setIsAnimating}
                        isAnimating={isAnimating}
                      />
                    )}
                  </div>
                </div>

                {user?.seek !== "ask" && (
                  <div
                    className={`bg-white ${
                      !user?.configured && (user?.seek === "ask" || !user?.seek)
                        ? "hidden"
                        : ""
                    }`}
                  >
                    <h2 className="w-full px-3 lg:px-6 py-3 bg-gradient-to-r from-primary to-cta text-3xl lg:text-5xl text-white drop-shadow-lg font-gotham ">
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
                            className={`text-black text-lg font-gotham font-light`}
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
                                      : "company"
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
                              <div className="p-2  bg-cta mr-2">
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
                      <div className="w-full -ml-1 flex flex-wrap items-center font-coco font-light">
                        {user?.tags?.map((item: any, i: any) => (
                          <div className="text-sm" key={i}>
                            <div className="ml-1 mt-1  badge badge-primary badge-outline flex items-center px-2 py-0.5">
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
                                className={`ml-1 mt-1  badge badge-primary badge-outline flex items-center px-2 py-0.5 text-sm font-coco font-light`}
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
                                className={`ml-1 mt-1  badge badge-primary badge-outline flex items-center px-2 py-0.5 text-sm font-coco font-light text-white`}
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

                      {(user?.seek || user?.seek === "ask") && (
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
            <div className={`bg-white h-max w-full`}>
              <h2 className="w-full p-3 lg:p-6 bg-gradient-to-r from-primary to-cta text-3xl lg:text-5xl text-white drop-shadow-lg font-gotham ">
                {user?.seek && user?.seek !== "ask" && "Usługi"}
                {(!user?.seek || user?.seek === "ask") && "Twoje oferty pracy"}
              </h2>
              {user?.job_offers?.length === 0 &&
                (user?.seek === "ask" || !user?.seek) &&
                user?.seek && (
                  <div className="text-lg text-black px-3 lg:px-6 pb-3 lg:pb-6 lg:pt-3">
                    Nie dodano żadnych usług. Możesz tego dokonać{" "}
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
              {!user?.job_offers?.length &&
                (user?.seek === "ask" || !user?.seek) && (
                  <div className="text-lg text-black font-light font-coco p-3 lg:p-6">
                    Nie dodano żadnych ofert pracy - przeprowadź ⚡
                    <strong>Szybką Rekrutację</strong>
                    <Link
                      href="/dashboard/add_job_offer"
                      className="w-max text-white bg-gradient-to-r from-primary to-cta hover:no-underline underline flex items-center px-2 py-1 rounded-lg mt-1"
                    >
                      <FaPlusCircle className="text-lg mr-2" />
                      Dodaj ofertę pracy
                    </Link>{" "}
                  </div>
                )}
              {user?.job_offers?.length > 0 && (
                <div className="px-3">
                  {user?.projects?.map((project: IProject, i: any) => (
                    <ProjectCard key={i} project={project} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
}
