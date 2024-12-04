import Viewer from "@/components/AddJobOffer/Viewer";
import { set_modals } from "@/redux/slices/modalsopen";
import { useState } from "react";

import { FaClipboard } from "react-icons/fa6";
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
