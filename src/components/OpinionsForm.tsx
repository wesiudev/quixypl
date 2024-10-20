"use client";
import React, { useState, useEffect } from "react";
import { addOpinion, app, getOpinions } from "@/firebase/";
import { collection, getFirestore, onSnapshot } from "firebase/firestore";
import { toast } from "react-toastify";
import { FaChevronRight, FaStar, FaUser } from "react-icons/fa";

interface Opinion {
  name: string;
  feedback: string;
}

/**
 * Form for collecting opinions from customers.
 *
 * This component displays a form for customers to submit their opinions.
 * The form consists of two input fields: one for the customer's name and one
 * for the customer's feedback. The opinions are stored in the Firestore database
 * and can be displayed in the component.
 *
 * @example
 * <OpinionsForm />
 */
const OpinionsForm: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [opinions, setOpinions] = useState<Opinion[]>([]);
  const [feedback, setFeedback] = useState<string>("");
  const [sent, setSent] = useState<boolean>(false);

  useEffect(() => {
    const opinionsData = getOpinions();
  }, []);

  useEffect(() => {
    const ref = collection(getFirestore(app), "opinions");
    const unsub = onSnapshot(ref, (querySnapshot: any) => {
      const snapshotData: any[] = [];
      querySnapshot.forEach((doc: any) => {
        snapshotData.push(doc.data());
      });
      setOpinions(
        snapshotData.sort((a, b) => (b.createdAt > a.createdAt ? 1 : -1))
      );
    });
  }, []);

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
    <div className="my-16 rounded-xl font-gotham bg-gradient-to-r from-primary/50 to-cta/50 p-6">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col md:flex-row justify-start items-start space-y-12"
      >
        <div className="h-full w-full">
          <h2 className="w-full text-3xl text-white drop-shadow-md shadow-black text-left mb-2 italic">
            Napisz opinię lub coś od siebie
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
                  className="bg-gray-700 placeholder:text-white placeholder:font-light input input-bordered w-full py-3 px-4 rounded-lg shadow-sm mb-2 text-white border border-gray-300"
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
                  className="bg-gray-700 h-full placeholder:text-white placeholder:font-light input input-bordered w-full py-3 px-4 rounded-lg shadow-sm mb-2 text-white border border-gray-300"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={sent}
              className={`w-full sm:w-full mx-auto py-3 px-6 rounded-lg font-light font-gotham text-white transition-colors duration-300 ${
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

        <div
          className="bg-white md:ml-3 rounded-xl overflow-hidden w-full"
          style={{ boxShadow: "0px 0px 5px black" }}
        >
          <h3 className="bg-gradient-to-r from-primary to-cta text-2xl font-bold py-4 text-white flex items-center justify-center text-center italic drop-shadow-md">
            Wpisy
          </h3>
          <ul className="space-y-6 h-[50vh] overflow-y-scroll p-3">
            {opinions?.map((opinion, index) => (
              <li
                key={index}
                className="flex flex-col items-start text-lg border-b border-cta pb-2 font-light"
              >
                <span className="flex items-center font-semibold text-black">
                  {opinion.name}
                </span>
                <p className="text-black font-gotham font-light">
                  {opinion.feedback}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </form>

      {/* Display the list of opinions */}
    </div>
  );
};

export default OpinionsForm;
