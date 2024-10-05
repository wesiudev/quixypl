"use client";
import { useState } from "react";
import { addDocument, auth } from "@/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { toast } from "react-toastify";
import { toastUpdate } from "@/components/Toast/ToastUpdate";
import { useRouter } from "next/navigation";
import { errorCatcher } from "../../utils/errorCatcher";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { IoIosClose } from "react-icons/io";
import GenerateIdeaInputs from "./GenerateIdeaInputs";
import { cutSentence } from "@/lib/cutSentence";
import RegisterPopup from "./RegisterPopup";
import { FaCheck } from "react-icons/fa";

/**
 * Sends verification email to the given email address
 * @param {string} email The email address of the user
 * @param {string} verificationCode The verification code to be sent
 * @returns {Promise<Response>} The response from the server
 */
async function sendVerificationEmail(email: string, verificationCode: string) {
  const data = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/sendVerificationEmail?email=${email}&verificationCode=${verificationCode}`,
    { cache: "no-store" }
  );
  return data;
}
export default function HomePageGenerator({
  sendGenerateIdeaRequest,
}: {
  sendGenerateIdeaRequest: Function;
}) {
  const [config, setConfig] = useState({
    place: "",
    product: "",
    target: "",
    additional: "",
    terms: "",
    investment: "",
  });
  const [generatedIdea, setGeneratedIdea] = useState<any>();
  const router = useRouter();
  const [user, loading] = useAuthState(auth);
  const [isThinking, setThinking] = useState(false);
  const [registerPopupOpen, setRegisterPopupOpen] = useState(false);
  const [view, setView] = useState("register");
  const [generatorPopup, setGeneratorPopup] = useState(false);
  const [userData, setUserData] = useState({
    password: "",
    repeatPassword: "",
    email: "",
    tokens: 3,
    emailVerified: false,
    sessionId: "",
    ideas: [],
    terms: true,
  });
  function createAccount() {
    setThinking(true);
    const id = toast.loading(<span>Tworzę konto...</span>, {
      position: "bottom-right",
    });
    if (config.terms !== "accepted") {
      setThinking(false);
      toastUpdate("Prosimy zaakceptować regulamin", id, "error");
      return;
    }
    if (userData.password !== userData.repeatPassword) {
      setThinking(false);
      toastUpdate("Hasła nie są takie same", id, "error");
      return;
    }
    if (userData.password?.length < 6) {
      setThinking(false);
      toastUpdate("Hasło jest za krótkie (minimum 6 znaków)", id, "error");
      return;
    }
    if (!userData.email) {
      setThinking(false);
      toastUpdate("Proszę wpisać email", id, "error");
      return;
    }

    (async () => {
      try {
        await createUserWithEmailAndPassword(
          auth,
          userData.email,
          userData.password
        ).then((res) => {
          addDocument("users", res.user.uid, {
            uid: res.user.uid,
            name: "",
            email: res.user.email,
            photoURL: "",
            totalSpent: 0,
            totalReceived: 0,
            tokens: 3,
            isPremium: false,
            emailVerified: false,
            ideas: [{ ...generatedIdea, creationTime: Date.now() }],
            jobOffers: [],
            groups: [],
            profileComments: [],
            generatedImages: [],
            projects: [],
            history: [
              {
                creationTime: Date.now(),
                action: `Dołączył/a do Quixy! Witamy na pokładzie i zapraszamy do konfiguracji profilu.`,
              },
              {
                creationTime: Date.now(),
                action: `Wygenerowano pomysł "${generatedIdea?.name}", Koszt: 💎0.00`,
              },
            ],
            seek: "ask",
          });
          toastUpdate("Sukces!", id, "success");

          sendVerificationEmail(userData.email, res.user.uid).then(() => {
            router.push(`${process.env.NEXT_PUBLIC_URL}/dashboard`);
          });
        });
      } catch (err: any) {
        const errorMsg = errorCatcher(err);
        toastUpdate(errorMsg, id, "error");
        setThinking(false);
      }
    })();
  }
  function signIn() {
    setThinking(true);
    const id = toast.loading(<span>Loguję...</span>, {
      position: "bottom-right",
    });
    (async () => {
      try {
        await signInWithEmailAndPassword(
          auth,
          userData.email,
          userData.password
        ).then((userCredential) => {
          toastUpdate("Sukces!", id, "success");
          setThinking(false);
          router.push(`${process.env.NEXT_PUBLIC_URL}/dashboard`);
        });
      } catch (err: any) {
        const errorMsg = errorCatcher(err);
        toastUpdate(errorMsg, id, "error");
        setThinking(false);
      }
    })();
  }
  function handleGenerateIdea() {
    if (generatedIdea?.content) {
      setGeneratorPopup(true);
      return;
    }
    if (user) {
      router.push(`${process.env.NEXT_PUBLIC_URL}/dashboard`);
    } else {
      if (!config.investment) {
        toast.error("Uzupełnij pole 'Inwestycja'", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
        });
      }
      if (!config.product) {
        toast.error("Uzupełnij pole 'Produkt'", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
        });
      }

      if (!config.place) {
        toast.error("Uzupełnij pole 'Miejsce'", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
        });
      }
      if (!config.place || !config.product || !config.investment) {
        return;
      }
      const id = toast.loading("Generuję nowy pomysł...", {
        position: "bottom-right",
      });
      setThinking(true);

      sendGenerateIdeaRequest(
        config.additional,
        config.place,
        config.product,
        config.investment
      ).then((res: any) => {
        toastUpdate("Sukces!", id, "success");
        setGeneratedIdea(JSON.parse(res.choices[0].text));
        setGeneratorPopup(true);
        setThinking(false);
      });
    }
  }

  return (
    <div className="w-full flex flex-col md:flex-row">
      <div
        className="rounded-xl text-zinc-800 h-full bg-white w-full"
        style={{ boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px" }}
      >
        <div className="flex flex-row w-full">
          <div className="flex flex-col md:flex-row w-full">
            <div className="flex flex-col w-full md:w-3/5 lg:w-4/5">
              <h2 className="font-cardo text-3xl text-zinc-800 font-bold drop-shadow-xl shadow-black p-6 lg:p-12">
                Twój nowy, <b className="text-orange-500">unikalny</b> pomysł na
                biznes!
              </h2>
              <GenerateIdeaInputs setConfig={setConfig} config={config} />
            </div>

            <div
              style={{ boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px" }}
              className="rounded-3xl p-6 lg:p-12 2xl:p-16 bg-gray-200 w-full h-full flex flex-col justify-between md:w-2/5"
            >
              <div className="h-full flex flex-col">
                <h2 className="font-cardo text-2xl text-black font-bold drop-shadow-xl shadow-black">
                  Generuj nowy pomysł na biznes
                </h2>
                <p className="mt-3 font-gotham text-lg font-light text-black">
                  Pomysły Quixy&trade; to rozwiązanie AI, które wygeneruje
                  pomysł i przedstawi biznesplan, a eksperci z Quixy
                  Talent&trade; zrealizują go od A do Z!
                </p>
              </div>
              <button
                disabled={isThinking ? true : false}
                className="disabled:cursor-not-allowed disabled:bg-orange-300 disabled:opacity-80 group rounded-xl p-3 w-full h-max bg-orange-500 hover:bg-orange-400 duration-150 text-white font-bold mt-3 relative"
                onClick={handleGenerateIdea}
              >
                <div className="w-[250px] cursor-default absolute left-1/2 -translate-x-1/2 -top-[170%] p-2 rounded-2xl text-white bg-blue-500 font-bold -translate-y-[50px] group-hover:-translate-y-[0px] z-[-10] group-hover:z-[25] select-none opacity-0 group-hover:opacity-100 duration-150 ease-in-out">
                  Wygeneruj pomysł na biznes, utwórz konto i odbierz 3💎
                </div>
                <div className="absolute left-1/2 -translate-x-1/2 w-5 h-5 rotate-45 bg-blue-500 -top-[57%] cursor-default -translate-y-[50px] group-hover:-translate-y-[0px] z-[-10] group-hover:z-[24] select-none opacity-0 group-hover:opacity-100 duration-150 ease-in-out" />
                Wypróbuj za darmo
                {!isThinking && generatedIdea?.content && generatorPopup && (
                  <div className="flex items-center justify-center">
                    <FaCheck className="mr-2 text-green-500" />
                    Pomysł gotowy
                  </div>
                )}
                {(loading || isThinking) && "Proszę czekać"}
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* popups */}
      <button
        onClick={() => {
          setRegisterPopupOpen(false);
          setGeneratorPopup(false);
        }}
        style={{ boxShadow: "0 0 16px 0 white" }}
        className={`fixed z-[9999] border border-black bg-white bg-opacity-5 text-white text-4xl top-5 right-5 p-2 rounded-xl w-10 h-10 flex items-center justify-center ${
          registerPopupOpen || generatorPopup
            ? "translate-x-0 duration-[1000ms]"
            : "translate-x-[100vw]"
        }`}
      >
        <IoIosClose className="w-8 h-8 text-gray-400" />{" "}
      </button>
      <button
        onClick={() => {
          setRegisterPopupOpen(false);
          setGeneratorPopup(false);
        }}
        className={`bg-[#202020] ${
          registerPopupOpen || generatorPopup
            ? "z-[30] w-full h-full fixed left-0 top-0 duration-500 delay-500 bg-opacity-80"
            : "fixed -z-[25] bg-opacity-0"
        }`}
      ></button>
      <div
        onClick={() => {
          setRegisterPopupOpen(false);
          setGeneratorPopup(false);
        }}
        className={`fixed left-0 top-0 w-full h-full flex justify-center items-center z-[999999999999999] ${
          generatorPopup ? "flex" : "hidden"
        } ease-in-out duration-500`}
      >
        <div
          onClick={(e: any) => {
            e.stopPropagation();
          }}
          className="bg-white rounded-lg flex flex-col w-[90%] sm:max-w-[40rem] h-[50vh] relative bg-opacity-90"
        >
          <h2 className="bg-orange-500 rounded-t-lg p-4 md:p-6 font-gotham text-2xl text-white font-bold drop-shadow-xl shadow-black sticky top-0">
            Twój nowy pomysł jest gotowy!
          </h2>
          <div className="w-full p-4 md:p-6 flex flex-col h-full overflow-y-scroll">
            <div className="text-zinc-800 text-xl font-bold">
              Wygenerowany pomysł:
            </div>
            <p className="text-gray-800 text-justify mt-3">
              {cutSentence(generatedIdea?.content)}
            </p>
            <div className="mt-3 text-sm text-gray-500 ">
              Zaloguj się by odebrać{" "}
              <b className="text-orange-500">nowy pomysł na biznes</b> oraz 3💎
              na start
            </div>
          </div>
          <button
            onClick={(e: any) => {
              setRegisterPopupOpen(true);
              setGeneratorPopup(false);
              e.stopPropagation();
            }}
            className="py-3 mx-auto rounded-b-lg bg-green-500 font-bold text-white w-full sticky bottom-0 left-0"
          >
            Dołącz teraz
          </button>
        </div>
      </div>
      <RegisterPopup
        view={view}
        registerPopupOpen={registerPopupOpen}
        setView={setView}
        userData={userData}
        setUserData={setUserData}
        isThinking={isThinking}
        config={config}
        setConfig={setConfig}
        createAccount={createAccount}
        signIn={signIn}
      />
    </div>
  );
}
