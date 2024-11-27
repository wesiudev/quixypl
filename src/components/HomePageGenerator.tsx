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
            router.push(`${process.env.NEXT_PUBLIC_URL}/user`);
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
        // setGeneratedIdea(JSON.parse(res?.choices[0]?.text));
        setGeneratorPopup(true);
        setThinking(false);
      });
    }
  }

  return <div className="w-full flex flex-col md:flex-row"></div>;
}
