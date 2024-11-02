"use client";
import "moment/locale/pl";
import moment from "moment";
import Loading from "../../app/loading";
import { useDispatch, useSelector } from "react-redux";
import AccountHistory from "./ImageGenerator/dashboard/AccountHistory";
import { FaBriefcase, FaClipboard, FaPlusCircle } from "react-icons/fa";
import { set_modals } from "@/redux/slices/modalsopen";
import ProjectCard from "./ImageGenerator/dashboard/ProjectCard";
import { IProject } from "@/types";
import { toast } from "react-toastify";
import MultiStepVerification from "./Settings/SettingsInputs/MultiStepVerification";
import { useState } from "react";
import ReactConfetti from "react-confetti";
import Link from "next/link";
import ProjectList from "./ProjectsList";
import JobOfferList from "./JobOfferList";
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
  const [sent, setSent] = useState(false);
  function copyToClipboard(text: string) {
    navigator.clipboard.writeText(text);
  }
  const [isAnimating, setIsAnimating] = useState(false);
  return (
    <>
      {isAnimating && <ReactConfetti />}

      {user ? (
        <div className="relative pb-3 lg:pb-6 bg-white">
          <div className="grid grid-cols-1 h-max relative w-full mx-auto">
            <div>
              <div className="">
                <div className="flex flex-col bg-white">
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
                      <div className="bg-gradient-to-r from-primary to-cta text-white p-3 w-full">
                        <b>Witaj w Quixy!</b>🔥 Wysłaliśmy wiadomość aktywującą
                        konto na podany adres e-mail - {user?.email}{" "}
                        <button
                          disabled={sent}
                          onClick={() => {
                            sendVerificationEmail(user?.email, user?.uid);
                            setSent(true);
                          }}
                        >
                          E-mail nie dotarł?
                        </button>
                      </div>
                    )}
                    <div className="grid grid-cols-1 2xl:grid-cols-2 bg-white p-3 lg:p-6">
                      <div className="pr-6 h-full w-full">
                        <h2 className="font-bold text-3xl text-zinc-800 flex items-center">
                          Twoje konto{" "}
                        </h2>
                        <div className=" text-black">
                          Witaj{", "}
                          {user?.name
                            ? `${user?.name} - Co chcesz dziś zrobić?`
                            : `${user?.email} - Skonfiguruj swoje konto!`}
                        </div>

                        <h2 className="text-3xl font-bold text-zinc-800 mt-3">
                          Twoje zlecenia
                        </h2>
                        <div className="py-2">
                          {!user?.conversations?.length && (
                            <div className="text-black">
                              Wszystkie ({user?.conversations?.length || 0})
                            </div>
                          )}
                          {!user?.conversations?.length && (
                            <div className="text-black">
                              Nowe ({user?.conversations?.length || 0})
                            </div>
                          )}
                          {!user?.conversations?.length && (
                            <div className="text-black">
                              Sprawdzone ({user?.conversations?.length || 0})
                            </div>
                          )}
                        </div>
                        <Link
                          title="Zobacz wszystkie zlecenia"
                          href="/dashboard/leads"
                          className="font-bold w-max text-white bg-gradient-to-r from-primary to-cta text-lg flex items-center px-2 py-1.5 rounded-lg mt-1"
                        >
                          Zobacz wszystkie
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
                    className={`bg-gradient-to-r from-primary to-cta ${
                      !user?.configured && (user?.seek === "ask" || !user?.seek)
                        ? "hidden"
                        : ""
                    }`}
                  >
                    <h2 className="w-full px-3 lg:px-6 py-3 text-3xl font-bold text-white drop-shadow-lg">
                      Informacje
                    </h2>
                    {!user?.configured && (
                      <div className="text-black text-lg mt-3">
                        Skonfiguruj typ konta w ustawieniach
                      </div>
                    )}
                    {(user?.seek || !user?.seek) && user?.seek !== "ask" && (
                      <div className="px-3 lg:px-6 !pt-0 pb-3 lg:pb-3">
                        {!user?.title && (
                          <div>
                            {user?.seek && user?.seek !== "ask" && (
                              <h2 className="font-bold text-xl text-white drop-shadow-lg ">
                                Tytuł
                              </h2>
                            )}
                            {(!user?.seek || user?.seek === "ask") && (
                              <h2 className="font-bold text-xl text-white drop-shadow-lg ">
                                Nazwa firmy lub działalności
                              </h2>
                            )}
                            <h3 className={`text-white`}>
                              {user?.title ? user?.title : "Brak..."}
                            </h3>
                          </div>
                        )}

                        <div>
                          <h2 className="font-bold text-xl text-white drop-shadow-lg mt-3">
                            Unikalny link
                          </h2>
                          {!user?.pseudo && (
                            <h3 className={`text-white`}>
                              Nie skonfigurowano...
                            </h3>
                          )}
                        </div>

                        <div className="text-white font-bold">
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
                                className="text-white underline font-bold"
                                onClick={() =>
                                  dispatch(
                                    set_modals({ ...modals, config: true })
                                  )
                                }
                              >
                                Idź do ustawień
                              </button>{" "}
                            </div>
                          )}
                          {!user?.pseudo &&
                            (!user?.seek || user?.seek === "ask") && (
                              <div>
                                <button
                                  className="text-white underline font-bold"
                                  onClick={() =>
                                    dispatch(
                                      set_modals({ ...modals, config: true })
                                    )
                                  }
                                >
                                  Idź do ustawień
                                </button>{" "}
                              </div>
                            )}
                        </div>
                        {user?.seek && user?.seek !== "ask" && (
                          <h2 className="text-xl text-white font-bold mt-3">
                            Specjalizacje
                          </h2>
                        )}
                        {!user?.seek && user?.seek !== "ask" && (
                          <h2 className="text-xl text-white font-bold mt-3">
                            Specjalizacje
                          </h2>
                        )}
                        <div className="w-full -ml-1 flex flex-wrap items-center">
                          {user?.tags?.map((item: any, i: any) => (
                            <div className="text-sm" key={i}>
                              <div className="ml-1 mt-1 badge badge-neutral bg-white badge-outline flex items-center px-2 py-0.5">
                                {item.title}
                              </div>
                            </div>
                          ))}
                          {!user?.tags?.length && (
                            <h3 className="text-white ml-1">
                              Brak podanych specjalizacji...
                            </h3>
                          )}
                        </div>
                        {user?.seek && user?.seek !== "ask" && (
                          <h2 className="text-xl font-bold text-white drop-shadow-lg mt-3">
                            Dostępność
                          </h2>
                        )}
                        {!user?.seek && user?.seek !== "ask" && (
                          <h2 className="font-bold text-lg text-white drop-shadow-lg mt-3">
                            Ilość współpracowników
                          </h2>
                        )}
                        {user?.seek && user?.seek !== "ask" && (
                          <div className="-ml-1 flex items-center flex-wrap">
                            {user?.preferences?.length === 0 && (
                              <div className="ml-1 text-lg text-white">
                                Brak danych...
                              </div>
                            )}
                            {user?.preferences ? (
                              user?.preferences?.map((item: any, i: any) => (
                                <h3
                                  key={i}
                                  className={`ml-1 mt-1  badge badge-neutral badge-outline flex items-center px-2 py-0.5`}
                                >
                                  {item}
                                </h3>
                              ))
                            ) : (
                              <h3 className="text-white ml-1">
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
                                  className={`ml-1 mt-1  badge badge-neutral bg-white badge-outline flex items-center px-2 py-0.5 text-white`}
                                >
                                  {item}
                                </h3>
                              ))
                            ) : (
                              <h3 className="text-white ml-1">
                                Uzupełnij dane...
                              </h3>
                            )}
                          </div>
                        )}

                        {(user?.seek || user?.seek === "ask") && (
                          <h2 className="font-bold text-xl text-white drop-shadow-lg mt-3">
                            Opis użytkownika
                          </h2>
                        )}
                        {!user?.seek && user?.seek !== "ask" && (
                          <h2 className="font-bold text-xl text-white drop-shadow-lg mt-3">
                            Opis firmy
                          </h2>
                        )}
                        <h3 className={`text-white`}>
                          {user?.bio ? user?.bio : "Brak..."}
                        </h3>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
            <div className={`bg-white h-max w-full`}>
              <ProjectList projects={user?.projects} />

              <JobOfferList job_offers={user?.job_offers} />
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
                  <div className="text-black px-3 lg:px-6 pt-3">
                    Nie dodano żadnych ogłoszeń o pracę - przeprowadź{" "}
                    <strong>Szybką Rekrutację</strong>⚡
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
                <div className="px-3 lg:px-6 mt-3 lg:mt-6">
                  <Link
                    href="/dashboard/my-postings"
                    className="text-2xl text-center justify-center font-bold text-white bg-gradient-to-r from-primary to-cta flex items-center px-2 py-1 rounded-lg"
                  >
                    <FaBriefcase className="text-3xl lg:text-5xl mr-3" /> Zobacz
                    oferty pracy
                  </Link>
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
