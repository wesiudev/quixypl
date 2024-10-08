"use client";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { addDocument, auth } from "@/firebase";
import { toast } from "react-toastify";
import { toastUpdate } from "@/components/Toast/ToastUpdate";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { errorCatcher } from "../../../../utils/errorCatcher";
import CreateAccountForm from "./CreateAccountForm";
import FirstStep from "./FirstStep";
import FirstStepButtons from "./FirstStepButtons";
export default function Register() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [userData, setUserData] = useState({
    phoneNumber: "",
    password: "",
    repeatPassword: "",
    email: "",
    type: "",
  });
  const [configured, setConfigured] = useState(false);
  const [seek, setSeek] = useState<any>(false);
  const [isLoading, setLoading] = useState(false);
  function createAccount() {
    setLoading(true);
    const id = toast.loading(<span>Sekundarnie...</span>, {
      position: "bottom-right",
      isLoading: true,
    });
    if (userData.password !== userData.repeatPassword) {
      setLoading(false);
      toastUpdate("Hasła nie są takie same", id, "error");
      return;
    }
    if (userData.password?.length < 6) {
      setLoading(false);
      toastUpdate("Hasło powinno składać się z minimum 6 znaków", id, "error");
      return;
    }
    if (!userData.email) {
      setLoading(false);
      toastUpdate("Prosimy wpisać email", id, "error");
      return;
    }

    (async () => {
      try {
        await createUserWithEmailAndPassword(
          auth,
          userData.email,
          userData.password
        ).then((userCredential) => {
          addDocument("users", userCredential.user.uid, {
            uid: userCredential.user.uid,
            name: "",
            email: userData.email,
            photoURL: "",
            totalSpent: 0,
            totalReceived: 0,
            tokens: 3,
            isPremium: false,
            emailVerified: false,
            ideas: [],
            jobOffers: [],
            groups: [],
            profileComments: [],
            generatedImages: [],
            projects: [],
            history: [
              {
                action: `Dołączył/a do Quixy! Witamy na pokładzie i zapraszamy do konfiguracji profilu.`,
                creationTime: Date.now(),
              },
            ],
            seek: seek === true || seek === false ? seek : "ask",
            configured: configured,
          });
          toastUpdate("Konto utworzone pomyślnie!", id, "success");
          router.push("/dashboard");
          setLoading(false);
        });
      } catch (err: any) {
        const errorMsg = errorCatcher(err);
        toastUpdate(errorMsg, id, "error");
        setLoading(false);
      }
    })();
  }

  return (
    <div className="font-sans w-full min-h-screen bg-center mx-auto relative flex flex-col-reverse md:flex-row bg-white">
      <div
        style={{ boxShadow: "inset 0 0 3px black" }}
        className="md:w-[33vw] lg:w-[50vw] xl:w-[50vw] h-screen bg-login sm:bg-register md:bg-login xl:bg-register bg-cover bg-bottom"
      ></div>
      <div className="px-6 w-full md:w-[67vw] lg:!w-[50vw] py-12 lg:px-6  border-gray-300 bg-white h-max md:my-auto mx-auto md:mx-6 lg:mx-12 flex items-center justify-center flex-col">
        {step < 2 && (
          <>
            <h2
              className={`text-black  text-left font-bold text-2xl xl:text-3xl drop-shadow-xl shadow-black font-gotham`}
            >
              Dołącz do najskuteczniejszej platformy z{" "}
              <Link title="praca zdalna biznes online" href="/praca-zdalna">
                pracą zdalną
              </Link>
            </h2>
            <FirstStep
              userData={userData}
              setUserData={setUserData}
              setStep={setStep}
              step={step}
              seek={seek}
              setSeek={setSeek}
              setConfigured={setConfigured}
            />
            <button
              onClick={() => {
                setStep(1);
                setSeek("ask");
              }}
              className={`text-cta mt-4 text-xl max-w-sm font-gotham ${
                seek === "ask" && "underline"
              }`}
              style={{ textShadow: "2px 2px 2px black" }}
            >
              Chcę skorzystać z usług AI
            </button>
          </>
        )}
        {step === 2 && (
          <>
            <CreateAccountForm
              userData={userData}
              step={step}
              setStep={setStep}
              setUserData={setUserData}
              createAccount={createAccount}
              loading={isLoading}
              setLoading={setLoading}
              seek={seek}
            />
          </>
        )}
        <div className="w-full flex flex-col justify-center items-center mt-12">
          {step === 0 && (
            <button
              style={{ borderRadius: "0px" }}
              disabled
              className="cursor-not-allowed button !bg-[#E3ECF0] !text-zinc-400 !font-normal !px-12"
            >
              Zarejestruj się
            </button>
          )}
          <FirstStepButtons
            userData={userData}
            setStep={setStep}
            step={step}
            seek={seek}
          />
          <div className="flex flex-row items-center flex-wrap mt-8 font-gotham text-black  font-light text-lg">
            Posiadasz już konto?{" "}
            <Link
              className="ml-2 text-[#126b91] underline hover:no-underline"
              href="/login"
            >
              Zaloguj się
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
