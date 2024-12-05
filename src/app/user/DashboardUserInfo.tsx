import Viewer from "@/components/AddJobOffer/Viewer";
import { set_modals } from "@/redux/slices/modalsopen";
import Image from "next/image";
import { useState } from "react";

import { FaClipboard, FaCoins, FaUser } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
async function sendVerificationEmail(email: string, verificationCode: string) {
  const data = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/sendVerificationEmail?email=${email}&verificationCode=${verificationCode}`,
    { cache: "no-store" }
  );
  return data;
}
export default function DashboardUserInfo() {
  const { user } = useSelector((state: any) => state.user);
  const dispatch = useDispatch();
  const { modals } = useSelector((state: any) => state.modals);
  function copyToClipboard(text: string) {
    navigator?.clipboard?.writeText(text);
  }
  const [sent, setSent] = useState(false);
  function sendEmail(email: string, uid: string) {
    sendVerificationEmail(email, uid);
    setSent(true);
    toast.success(
      "Wiadomość aktywacyjna została wysłana na podany adres e-mail.",
      {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
      }
    );
  }
  return (
    <div>
      <div className="flex flex-row">
        <button
          onClick={() => dispatch(set_modals({ ...modals, config: true }))}
          className=""
        >
          {user?.photoURL && (
            <div className="rounded-full w-24 aspect-square overflow-hidden relative">
              <Image
                style={{ boxShadow: "inset 0px 0px 8px black" }}
                src={user?.photoURL}
                width={256}
                height={256}
                alt=""
                className="shadow-sm shadow-black rounded-full bg-white absolute inset-0 object-cover w-full h-full"
              />
            </div>
          )}
          {!user?.photoURL && (
            <div
              style={{ boxShadow: "inset 0px 0px 8px black" }}
              className="rounded-full bg-gradient-to-r from-primary to-cta w-24 aspect-square text-white flex items-center justify-center"
            >
              <FaUser className="text-3xl lg:text-5xl" />
            </div>
          )}
        </button>
        {!user?.configured && (user?.seek === "ask" || !user?.seek) && (
          <div className="pl-4 pt-4">
            <h2 className="text-white bg-gradient-to-r from-zinc-800 via-gray-700 to-zinc-950 w-max rounded-xl px-2 font-extrabold">
              Nie skonfigurowano profilu
            </h2>
            <p className="text-black max-w-lg font-coco my-1 text-sm">
              Określ typ profilu w zakładce <b className="italic">MÓJ PROFIL</b>
              , by rozpocząć swoją przygodę w Quixy
            </p>
          </div>
        )}
        {user?.configured && user?.seek !== "ask" && (
          <div className="flex flex-col h-max px-3">
            {!user?.name && (
              <h2 className="text-sm text-black drop-shadow-lg font-bold font-coco italic">
                {user?.seek && "Imię (lub imię i nazwisko)"}
                {(!user?.seek || user?.seek === "ask") &&
                  "Nazwa firmy/dane rekrutera"}
              </h2>
            )}
            <h3 className={`text-lg sm:text-xl font-extrabold text-black`}>
              {user?.name ? user?.name : "Nie podano"}
            </h3>
            <h3 className="text-black">{user?.title && user?.title}</h3>
            <h3 className="text-black text-sm">
              {user?.pseudo && user?.pseudo}
            </h3>
            <button
              onClick={() => dispatch(set_modals({ ...modals, quixies: true }))}
              className="flex items-center mt-1"
            >
              <div className="gap-2 flex items-center justify-center px-2 py-1.5 h-8 bg-gradient-to-r from-primary to-cta rounded-lg">
                <FaCoins className="text-lg text-white" />
                <div className="font-extrabold text-white font-coco">
                  {user?.tokens?.toFixed(2)}
                </div>
              </div>
            </button>
          </div>
        )}{" "}
      </div>
      <div>
        {!user?.emailVerified && (
          <div className="border-l-4 py-2 mt-3 bg-gray-100 border-cta px-3 w-max max-w-full text-black">
            Wysłaliśmy wiadomość aktywującą konto na podany adres e-mail -{" "}
            <button
              disabled={sent}
              className="font-extrabold disabled:cursor-not-allowed"
              onClick={() => sendEmail(user?.email, user?.uid)}
            >
              {!sent && "Wyślij ponownie"}
              {sent && "Wysłano"}
            </button>
          </div>
        )}
        <div>
          {(user?.seek || !user?.seek) && user?.seek !== "ask" && (
            <div className="mt-3">
              {!user?.title && (
                <div>
                  {user?.seek && user?.seek !== "ask" && (
                    <h2 className="font-extrabold text-lg text-black">Tytuł</h2>
                  )}
                  <h3 className={`text-black`}>
                    {user?.title ? user?.title : "Nie podano..."}
                  </h3>
                </div>
              )}
              <div className="mt-3">
                <h2 className="font-extrabold text-lg text-black">
                  Unikalny link
                </h2>
                {!user?.pseudo && (
                  <h3 className={`text-black mt-1`}>Nie skonfigurowano...</h3>
                )}
              </div>

              <div className="text-black font-bold mt-1">
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
                        dispatch(set_modals({ ...modals, config: true }))
                      }
                    >
                      Idź do ustawień
                    </button>{" "}
                  </div>
                )}
                {!user?.pseudo && (!user?.seek || user?.seek === "ask") && (
                  <div>
                    <button
                      className="text-black underline font-bold"
                      onClick={() =>
                        dispatch(set_modals({ ...modals, config: true }))
                      }
                    >
                      Idź do ustawień
                    </button>{" "}
                  </div>
                )}
              </div>

              <h2 className="text-lg text-black font-extrabold mt-3">
                Specjalizacje
              </h2>
              <div className="w-full -ml-1 flex flex-wrap items-center">
                {user?.tags?.map((item: any, i: any) => (
                  <div className="text-sm" key={i}>
                    <div className="text-xs sm:text-sm lg:text-base bg-gradient-to-r from-primary to-cta p-2 text-white ml-1 mt-1 duration-100 flex items-center px-2 py-0.5">
                      {item.title}
                    </div>
                  </div>
                ))}
                {!user?.tags?.length && (
                  <h3 className="text-black ml-1">
                    Brak podanych specjalizacji...
                  </h3>
                )}
              </div>
              <h2 className="text-lg font-extrabold text-black mt-3">
                Dostępność
              </h2>
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
                        className={`text-xs sm:text-sm lg:text-base bg-gradient-to-r from-primary to-cta p-2 text-white ml-1 mt-1 duration-100 flex items-center px-2 py-0.5`}
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
                        className={`text-xs sm:text-sm lg:text-base bg-gradient-to-r from-primary to-cta p-2 text-white ml-1 mt-1 duration-100 flex items-center px-2 py-0.5`}
                      >
                        {item}
                      </h3>
                    ))
                  ) : (
                    <h3 className="text-white ml-1">Uzupełnij dane...</h3>
                  )}
                </div>
              )}
              <h2 className="font-extrabold text-lg text-black mt-3">Opis</h2>
              <h3 className={`text-black`}>
                {user?.description ? (
                  <div className="mt-3">
                    <Viewer value={user?.description} />
                  </div>
                ) : (
                  "Brak..."
                )}
              </h3>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
