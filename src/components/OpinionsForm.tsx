"use client";
import React, { useState } from "react";
import { addOpinion } from "@/firebase/";
import { toast } from "react-toastify";

interface Opinion {
  name: string;
  feedback: string;
}
export default function OpinionsForm({ data }: { data: any }) {
  const [name, setName] = useState<string>("");
  const [opinions, setOpinions] = useState<any[]>(data);
  const [feedback, setFeedback] = useState<string>("");
  const [sent, setSent] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addOpinion({ name, feedback });
    setSent(true);
    toast.success("Dziękujemy za Twoją opinię!", {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
    });
  };

  return (
    <div className="mt-12 bg-gradient-to-r from-primary to-cta p-6">
      <form
        onSubmit={handleSubmit}
        className="container mx-auto flex flex-col md:flex-row justify-start items-start space-y-12"
      >
        <div className="lg:px-6 h-full w-full">
          <h2 className="w-full text-3xl text-white drop-shadow-md shadow-black text-left mb-2 font-extrabold">
            Podziel się przemyśleniami
          </h2>
          <div className="flex flex-col justify-between w-full h-full">
            <div className="">
              <div className="">
                <label htmlFor="name" className="text-white font-light">
                  Przedstaw się
                </label>
                <input
                  type="text"
                  id="name"
                  placeholder="Imię lub nazwa firmy"
                  value={name}
                  maxLength={30}
                  onChange={(e) => setName(e.target.value)}
                  className="bg-gray-700 placeholder:text-white w-full py-3 px-4  shadow-sm mb-2 text-white border border-gray-300"
                />
              </div>
              <div className="">
                <label htmlFor="opinion" className="text-white font-light">
                  Twoja opinia
                </label>
                <textarea
                  maxLength={200}
                  cols={6}
                  rows={6}
                  id="opinion"
                  placeholder="Wpisz opinię"
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  className="bg-gray-700 h-full placeholder:text-white w-full py-3 px-4  shadow-sm mb-2 text-white border border-gray-300"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={sent}
              className={`w-full sm:w-full mx-auto py-3 px-6 text-white transition-colors duration-300 ${
                sent
                  ? "bg-zinc-500 cursor-not-allowed"
                  : "bg-cta hover:bg-cta/80"
              }`}
            >
              {sent ? "Dziękujemy!!" : "Wyślij opinię"}
            </button>
            <p className="text-white text-xs sm:text-sm font-coco text-justify py-3">
              Przesyłając opinię, wyrażasz zgodę na upublicznienie wprowadzonych
              danych na naszej stronie internetowej oraz potwierdzasz akceptację
              Regulaminu serwisu Quixy.pl. Przed opublikowaniem Twojej opinii,
              prosimy o zapoznanie się z treścią Regulaminu.
            </p>
          </div>
        </div>

        <div className="md:ml-3 overflow-hidden w-full">
          <h3 className="text-2xl font-extrabold py-4 text-white px-3">
            Co piszą inni
          </h3>
          <ul className="space-y-6 h-[50vh] overflow-y-scroll p-3">
            {opinions?.map((opinion, index) => (
              <li
                key={index}
                className="flex flex-col items-start text-lg border-b border-white pb-2 font-light"
              >
                <span className="flex items-center font-bold text-white">
                  {opinion.name}
                </span>
                <p className="text-white">{opinion.feedback}</p>
              </li>
            ))}
          </ul>
        </div>
      </form>

      {/* Display the list of opinions */}
    </div>
  );
}
