import FAQ from "@/components/Faq";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import { FaChevronRight } from "react-icons/fa";
interface ImageOpenProps {
  imageOpen: {
    src: string;
    prompt: string;
    author: string;
    creationTime: number;
  };
  setImageOpen: any;
}
export default function ImageOpen({ imageOpen, setImageOpen }: ImageOpenProps) {
  function downloadImage() {
    const link = document.createElement("a");
    link.href = imageOpen?.src;
    link.click();
  }
  return (
    <div>
      {imageOpen?.src !== "" && (
        <>
          <div className="w-full z-[500] bg-black">
            <div className="bg-white z-[506] fixed top-0 lg:left-[30rem] h-screen lg:w-[calc(100vw-30rem)] flex flex-col p-4 sm:p-8 lg:p-16 xl:p-24 overflow-y-scroll">
              <div className="flex flex-col w-full z-[505] relative">
                <h2 className="lg:mt-0 text-black text-3xl font-bold">
                  Wygenerowany obraz
                </h2>
                <Image
                  src={imageOpen?.src}
                  width={1920}
                  height={1080}
                  alt=""
                  className={`w-full lg:w-1/2 relative z-[505] bg-[#126b91] bg-opacity-70`}
                  blurDataURL="data:image/webp;base64,UklGRiIAAABXRUJQVlA4WAoAAAAQAAAfAADuwH/xAAfAQADAAQAAAAAAQAvAQADAAQAAAAAAQAvAQA"
                  placeholder="blur"
                />

                <div className="flex flex-col relative z-[505] h-full">
                  <div
                    style={{ boxShadow: "inset 0px 0px 5px black" }}
                    className=" p-3 lg:p-6 bg-white rounded-x-3xl"
                  >
                    <div className="text-2xl flex items-center text-black ">
                      Prompt
                      <FaChevronRight className="text-gray-500 mx-3" />
                      <div className="text-left text-2xl text-primary">
                        &quot;{imageOpen?.prompt}&quot;
                      </div>
                    </div>
                    <div className="text-left text-green-500 mt-2 text-sm">
                      Dodano:{" "}
                      {moment(imageOpen?.creationTime).format("DD-MM-yyyy")}
                    </div>
                    <div className="mt-3 grid grid-cols-2 gap-3">
                      <button
                        onClick={() => downloadImage()}
                        className="w-full bg-[#126b91] hover:bg-opacity-90 duration-100 text-white font-bold text-lg p-3"
                      >
                        Idź do źródła
                      </button>
                      <button
                        onClick={() => setImageOpen({ src: "" })}
                        className="w-full bg-[#126b91] hover:bg-opacity-90 duration-100 text-white font-bold text-lg p-3"
                      >
                        Wyjdź
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full mt-6">
                <h2 className="text-base text-black font-bold">
                  Brakuje Ci jakiejś funkcji, lub masz problem z generatorem?
                  Napisz do nas wiadomość poprzez zakładkę{" "}
                  <Link href="/contact" className="underline">
                    Kontakt
                  </Link>
                </h2>
              </div>
              <FAQ faqItems={faqItems} />
            </div>
          </div>
        </>
      )}
    </div>
  );
}

const faqItems = [
  {
    question: "Czym jest Plecak?",
    answer:
      "Plecak (Backpack) to Twoje miejsce na panelu użytkownika, w którym możesz trzymać wszystkie wygenerowane obrazy.",
  },
  {
    question: "Ile kosztuje wygenerowanie jednego obrazu?",
    answer: "Koszt generacji wynosi pomiędzy 0.28 a 0.68.",
  },
  {
    question: "Czy mogę pobrać obraz i wykorzystać go później?",
    answer:
      "Pobierz za darmo wygenerowany obraz i użyj go na swoim blogu, czy platformach społecznościowych.",
  },
  {
    question: "Czy inni użytkownicy widzą moje obrazy?",
    answer:
      "Pracujemy nad systemem interakcji międzyobrazowych między naszymi użytkownikami. Masz jakiś pomysł? Pisz do nas poprzez zakładkę kontakt!",
  },
  {
    question: "Jaki jest limit generowania obrazów?",
    answer:
      "Limit może różnić się w zależności od modelu, dla porównania dall-e-3 posiada limit 7 obrazów na minutę, natomiast dall-e-2 posiada limit 50 obrazów na minutę.",
  },
  {
    question: "Czy strona zarabia na generowaniu obrazów?",
    answer:
      "Tak, Quixy zarabia na generowaniu obrazów i dzięki temu może skupić się na rozwoju platformy z pracą zdalną.",
  },
];
