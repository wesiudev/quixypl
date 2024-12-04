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
          addDocument("users", res.user?.uid, {
            uid: res.user?.uid,
            name: "",
            hourRate: "",
            email: res.user?.email,
            photoURL: "",
            totalSpent: 0,
            totalReceived: 0,
            tokens: 3,
            isPremium: false,
            emailVerified: false,
            ideas: [
              { ...generatedIdea, creationTime: Date.now(), seen: false },
            ],
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

          sendVerificationEmail(userData.email, res.user?.uid).then(() => {
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
          router.push(`${process.env.NEXT_PUBLIC_URL}/user`);
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
      router.push(`${process.env.NEXT_PUBLIC_URL}/user`);
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
      <button
        onClick={() => {
          setRegisterPopupOpen(false);
          setGeneratorPopup(false);
        }}
        className={`bg-[#202020] ${
          registerPopupOpen || generatorPopup
            ? "z-[30] w-full h-full fixed left-0 top-0 duration-500 bg-opacity-80 hover:bg-opacity-50 cursor-pointer"
            : "fixed -z-[25] bg-opacity-0"
        }`}
      ></button>
      <div
        onClick={() => {
          setRegisterPopupOpen(false);
          setGeneratorPopup(false);
        }}
        className={`w-max max-w-[90%] fixed left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 flex justify-center items-center z-[999999999999999] ${
          generatorPopup ? "flex" : "hidden"
        } ease-in-out duration-500`}
      >
        <div
          onClick={(e: any) => {
            e.stopPropagation();
          }}
          className="bg-white  flex flex-col w-full sm:max-w-[40rem] max-h-[90vh] relative"
        >
          <h2 className="bg-gradient-to-r from-primary to-cta  p-4 md:p-6 font-gotham text-2xl text-white font-bold drop-shadow-xl shadow-black sticky top-0">
            Twój nowy pomysł jest gotowy!
          </h2>
          <div className="w-full p-4 md:p-6 flex flex-col h-full overflow-y-scroll">
            <div className="text-black text-xl font-bold font-coco">
              Wygenerowany pomysł:
            </div>
            <div className="text-white text-justify mt-3">
              <span className="w-max max-w-full bg-gradient-to-r from-primary to-cta p-[2px]">
                {cutSentence(generatedIdea?.content)}
              </span>
            </div>
            <div className="text-sm text-gray-700 mt-24">
              Zaloguj się by odebrać{" "}
              <b className="text-primary">nowy pomysł na biznes</b> oraz 💎3 na
              start
            </div>
          </div>
          <button
            onClick={(e: any) => {
              setRegisterPopupOpen(true);
              setGeneratorPopup(false);
              e.stopPropagation();
            }}
            className="py-3 mx-auto  bg-primary font-bold text-white w-full"
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
