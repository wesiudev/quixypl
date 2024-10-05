"use client";
import GenerateButton from "./empty/GenerateButton";
import { useState } from "react";
import FirstGenerationPopup from "./empty/FirstGenerationPopup";
import { toast } from "react-toastify";
import Image from "next/image";
import Link from "next/link";
export default function BackpackEmpty({ user }: { user: any }) {
  const [isGenerationPending, setIsGenerationPending] =
    useState<boolean>(false);
  const [userPrompt, setUserPrompt] = useState("");
  const [hasImage, setHasImage] = useState(false);
  const [imageResponse, setImageResponse] = useState("");
  const [isError, setIsError] = useState<boolean | string>("");
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isGenerationTriggered, setIsGenerationTriggered] = useState(false);
  const displayError = (errorMessage: any) => {
    toast.error(errorMessage, {
      onClose: () => (setIsError(false), setIsGenerationTriggered(false)),
    });
  };
  return (
    <>
      <div className="relative font-gotham">
        <div className="lg:w-full min-h-screen w-full flex flex-col">
          <div className="h-full w-full flex relative pb-12">
            <div className="z-50 flex flex-col justify-evenly drop-shadow-md shadow-black">
              <h2 className="text-3xl sm:text-5xl text-white mb-6">
                Generator Obrazów
              </h2>
              {/* <div className="text-xl sm:text-2xl text-white bg-orange-500 rounded-xl p-3 w-max max-w-[100%]">
                Cześć, {user?.name || user?.email || user?.pseudo}!
              </div> */}
              <div className="mt-2 text-white text-xl sm:text-2xl">
                Wygląda na to, że Twój Plecak jest pusty
              </div>
              <p className="mt-3 font-light lg:text-left text-xl sm:text-2xl lg:text-2xl text-gray-50 w-full sm:w-4/5 lg:w-4/5">
                Określ scenariusz dla <strong>AI</strong> - powiedz mu, co
                chciałbyś zobaczyć na swojej pierwszej{" "}
                <strong>generacji</strong>
              </p>
            </div>
          </div>
          <div className="flex flex-col relative z-[50]">
            <div className="text-white text-2xl font-gotham">
              <div className="mr-2 text-orange-500">Krok 1.</div> Wygeneruj swój
              pierwszy obraz
            </div>
            <div className="w-full mt-6">
              <div className="flex flex-row w-full relative">
                <textarea
                  onChange={(e) => setUserPrompt(e.target.value)}
                  value={userPrompt}
                  placeholder="Napisz co chcesz zobaczyć, aby wygenerować swój pierwszy obraz"
                  maxLength={300}
                  className="text-black placeholder:text-black font-light z-20 w-full p-4 rounded-2xl text-xl lg:text-xl min-h-[25vh] bg-white outline-none resize-none"
                />
              </div>
              <GenerateButton
                setIsGenerationPending={setIsGenerationPending}
                setImageLoaded={setImageLoaded}
                setImageResponse={setImageResponse}
                setHasImage={setHasImage}
                setIsError={setIsError}
                prompt={userPrompt}
                hasImage={hasImage}
                isGenerationPending={isGenerationPending}
                imageResponse={imageResponse}
                setIsGenerationTriggered={setIsGenerationTriggered}
                displayError={displayError}
                isError={isError}
              />
              <div className="text-gray-100 my-4 text-base font-light">
                1. Wprowadź opis obrazu, który chcesz wygenerować, w polu
                tekstowym. <br />
                2. Kliknij przycisk &quot;Generuj&quot;, aby stworzyć swój
                pierwszy obraz. <br />
                3. Obejrzyj wygenerowany obraz w oknie wyskakującym.
              </div>
              <Link
                target="_blank"
                className="pb-12"
                href="https://wesiudev.com/pl"
              >
                wesiudev
                <Image
                  src="/assets/quixy-logo.png"
                  width={224}
                  height={224}
                  alt="Logo serwisu quixy.pl"
                  className="h-16 w-auto"
                />
              </Link>
            </div>
          </div>
        </div>
        {!isError && (
          <FirstGenerationPopup
            isGenerationTriggered={isGenerationTriggered}
            setIsGenerationTriggered={setIsGenerationTriggered}
            isLoading={isGenerationPending}
            hasImage={hasImage}
            imageResponse={imageResponse}
            userPrompt={userPrompt}
            imageLoaded={imageLoaded}
            setImageLoaded={setImageLoaded}
            displayError={displayError}
            setHasImage={setHasImage}
          />
        )}
      </div>
    </>
  );
}
