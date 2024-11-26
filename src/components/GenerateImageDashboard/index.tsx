"use client";
import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import GenerateButton from "../user/ImageGenerator/backpack/empty/GenerateButton";
import FirstGenerationPopup from "../user/ImageGenerator/backpack/empty/FirstGenerationPopup";
import Image from "next/image";
export default function GenerateImageDashboard() {
  const [isGenerationPending, setIsGenerationPending] =
    useState<boolean>(false);
  const [userPrompt, setUserPrompt] = useState("");
  const [hasImage, setHasImage] = useState(false);
  const [imageResponse, setImageResponse] = useState("");
  const [isError, setIsError] = useState<boolean | string>("");
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isGenerationTriggered, setIsGenerationTriggered] = useState(false);
  const [styles, setStyles] = useState<string[]>([]);
  const displayError = (errorMessage: any) => {
    toast.error(errorMessage, {
      onClose: () => (setIsError(false), setIsGenerationTriggered(false)),
    });
  };
  return (
    <>
      <div className="z-50 relative">
        <div className="text-white font-gotham text-3xl lg:text-5xl h-max w-full flex flex-col text-left">
          <div className="flex flex-col w-full">
            <span>Generator Obrazów</span>
            <span className="text-base mt-3 sm:text-xl font-light">
              Dzięki temu narzędziu wyrenderujesz obraz dla rozrywki, na social
              media, lub do postów na bloga. Ostrożnie!
            </span>
          </div>
          <div className="flex flex-col w-full">
            <div className="flex flex-row h-max mt-5">
              <textarea
                placeholder="Shine Bright Like a Diamond"
                className="placeholder:font-light z-20 w-full p-4  text-xl lg:text-xl min-h-[25vh] bg-white text-black border-2 border-primary outline-none"
                value={userPrompt}
                onChange={(e) => setUserPrompt(e.target.value)}
              />
            </div>
            <h2 className="font-bold text-left text-white text-3xl lg:text-5xl mt-6">
              Dobierz style
            </h2>
            <div className="flex flex-row flex-wrap -ml-3 h-max mt-3">
              {styleVariants.map((style: any, i: any) => (
                <button
                  onClick={() =>
                    setStyles((prev) =>
                      prev.includes(style.name)
                        ? prev.filter((s) => s !== style.name)
                        : prev.length < 3
                        ? [...prev, style.name]
                        : [style.name, ...prev.slice(0, 2)]
                    )
                  }
                  key={i}
                  className={`text-base font-light py-1.5 px-2 ml-2 mt-2  text-white duration-200 ${
                    styles.includes(style.name)
                      ? "scale-[1.06] hover:scale-[1.04] bg-[#126b91]"
                      : "hover:scale-[0.95] bg-[#126b91] hover:bg-[#468CA9]"
                  }`}
                >
                  {style.name}
                </button>
              ))}
            </div>
            <GenerateButton
              setIsGenerationPending={setIsGenerationPending}
              setImageLoaded={setImageLoaded}
              setImageResponse={setImageResponse}
              setHasImage={setHasImage}
              setIsError={setIsError}
              prompt={`${userPrompt} + styles = ${styles.join(", ")}}`}
              hasImage={hasImage}
              isGenerationPending={isGenerationPending}
              imageResponse={imageResponse}
              setIsGenerationTriggered={setIsGenerationTriggered}
              displayError={displayError}
              isError={isError}
              styles={styles}
            />
          </div>
          {!isError && hasImage && (
            <div className="fixed left-0 top-0 bg-black bg-opacity-50 w-full h-full z-[500]">
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
            </div>
          )}
        </div>

        <div className="flex items-center justify-center z-0 absolute top-0 lg:-top-12 -right-6 h-[60px] w-[60px] rotate-45 -hue-rotate-60">
          <Image
            src="/assets/quixy-logo.png"
            width={224}
            height={224}
            alt="Logo serwisu quixy.pl"
            className="w-[80%] h-auto"
          />
        </div>
      </div>
    </>
  );
}
const styleVariants = [
  { name: "Cartoon", image: "/assets/img/cartoon.png" },
  { name: "Watercolor", image: "/assets/img/watercolor.png" },
  { name: "Pixel Art", image: "/assets/img/pixelart.png" },
  { name: "Sketch", image: "/assets/img/sketch.png" },
  { name: "Realism", image: "/assets/img/realism.png" },
  { name: "Fantasy", image: "/assets/img/fantasy.png" },
  { name: "Abstract", image: "/assets/img/abstract.png" },
  { name: "Pop Art", image: "/assets/img/popart.png" },
  { name: "Comic Book", image: "/assets/img/comicbook.png" },
  { name: "Cyberpunk", image: "/assets/img/cyberpunk.png" },
  { name: "Steampunk", image: "/assets/img/steampunk.png" },
  { name: "Low Poly", image: "/assets/img/lowpoly.png" },
  { name: "Oil Painting", image: "/assets/img/oilpainting.png" },
  { name: "Neon", image: "/assets/img/neon.png" },
  { name: "Vintage", image: "/assets/img/vintage.png" },
  { name: "Minimalist", image: "/assets/img/minimalist.png" },
  { name: "Surrealism", image: "/assets/img/surrealism.png" },
  { name: "Manga", image: "/assets/img/manga.png" },
  { name: "3D Render", image: "/assets/img/3drender.png" },
];
