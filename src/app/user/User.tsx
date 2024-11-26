"use client";

import { set_modals } from "@/redux/slices/modalsopen";
import moment from "moment";
import { Metadata } from "next";
import Link from "next/link";
import { useState } from "react";
import { FaClipboard } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Loading from "../loading";
import MultiStepVerification from "@/components/user/Settings/SettingsInputs/MultiStepVerification";
import ServiceList from "@/components/user/ProjectList";
import AccountHistory from "@/components/user/ImageGenerator/user/AccountHistory";
async function sendVerificationEmail(email: string, verificationCode: string) {
  const data = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/sendVerificationEmail?email=${email}&verificationCode=${verificationCode}`,
    { cache: "no-store" }
  );
  return data;
}

export default function User() {
  const { user } = useSelector((state: any) => state.user);
  moment.locale("pl");
  const dispatch = useDispatch();
  const { modals } = useSelector((state: any) => state.modals);
  const [sent, setSent] = useState(false);

  function copyToClipboard(text: string) {
    navigator.clipboard.writeText(text);
  }
  const [isAnimating, setIsAnimating] = useState(false);
  return (
    <div className="">
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
                      <div className="bg-primary text-white p-3 w-full">
                        <b>Witaj w Quixy!</b>Wysłaliśmy wiadomość aktywującą
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

                    {(user?.seek === "ask" ||
                      !user?.pseudo ||
                      !user?.name ||
                      !user?.emailVerified ||
                      !user?.configured ||
                      !user?.access) && (
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
                    className={`${
                      !user?.configured && (user?.seek === "ask" || !user?.seek)
                        ? "hidden"
                        : ""
                    }`}
                  >
                    <h2 className="w-full px-3 lg:px-6 py-3 text-3xl font-extrabold text-black">
                      Szczegóły
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
                              <h2 className="font-bold text-xl text-black ">
                                Tytuł
                              </h2>
                            )}
                            {(!user?.seek || user?.seek === "ask") && (
                              <h2 className="font-bold text-xl text-black ">
                                Nazwa firmy lub działalności
                              </h2>
                            )}
                            <h3 className={`text-black`}>
                              {user?.title ? user?.title : "Brak..."}
                            </h3>
                          </div>
                        )}

                        <div>
                          <h2 className="font-bold text-xl text-black mt-3">
                            Unikalny link
                          </h2>
                          {!user?.pseudo && (
                            <h3 className={`text-black`}>
                              Nie skonfigurowano...
                            </h3>
                          )}
                        </div>

                        <div className="text-black font-bold">
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
                                <div className="p-2 bg-gradient-to-r from-primary to-cta mr-2 rounded-xl">
                                  <FaClipboard className="text-white w-5 h-5" />
                                </div>
                                <div className="text-left text-xs">
                                  {user?.pseudo &&
                                    `https://quixy.pl/${
                                      user?.seek && user?.seek !== "ask"
                                        ? "talent"
                                        : "company"
                                    }/${user?.pseudo}`}
                                </div>
                              </button>
                            </div>
                          )}
                          {!user?.pseudo && user?.seek && (
                            <div>
                              <button
                                className="text-black underline font-bold"
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
                                  className="text-black underline font-bold"
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
                          <h2 className="text-xl text-black font-bold mt-3">
                            Specjalizacje
                          </h2>
                        )}
                        {!user?.seek && user?.seek !== "ask" && (
                          <h2 className="text-xl text-black font-bold mt-3">
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
                          <h2 className="text-xl font-bold text-black mt-3">
                            Dostępność
                          </h2>
                        )}
                        {!user?.seek && user?.seek !== "ask" && (
                          <h2 className="font-bold text-lg text-black mt-3">
                            Ilość pracowników
                          </h2>
                        )}
                        {user?.seek && user?.seek !== "ask" && (
                          <div className="-ml-1 flex items-center flex-wrap">
                            {user?.preferences?.length === 0 && (
                              <div className="ml-1 text-lg text-black">
                                Brak danych...
                              </div>
                            )}
                            {user?.preferences ? (
                              user?.preferences?.map((item: any, i: any) => (
                                <h3
                                  key={i}
                                  className={`ml-1 mt-1 bg-white badge badge-neutral badge-outline flex items-center px-2 py-0.5`}
                                >
                                  {item}
                                </h3>
                              ))
                            ) : (
                              <h3 className="text-black ml-1">
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
                                  className={`ml-1 mt-1 badge badge-neutral bg-white badge-outline flex items-center px-2 py-0.5 text-white`}
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
                          <h2 className="font-bold text-xl text-black mt-3">
                            Opis użytkownika
                          </h2>
                        )}
                        {!user?.seek && user?.seek !== "ask" && (
                          <h2 className="font-bold text-xl text-black mt-3">
                            Opis firmy
                          </h2>
                        )}
                        <h3 className={`text-black`}>
                          {user?.bio ? user?.bio : "Brak..."}
                        </h3>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
            <div className={`bg-white h-max w-full`}>
              <ServiceList projects={user?.projects} />
            </div>
            <AccountHistory />
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
}
