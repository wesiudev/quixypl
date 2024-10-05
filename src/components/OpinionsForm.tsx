"use client";
import React, { useState, useEffect } from "react";
import { addOpinion, app, getOpinions } from "@/firebase/";
import { collection, getFirestore, onSnapshot } from "firebase/firestore";
import { toast } from "react-toastify";
import { FaStar, FaUser } from "react-icons/fa";

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
    <div className="my-16 rounded-lg !font-gotham">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col-reverse md:flex-row justify-start items-start space-y-12"
      >
        <div className="h-full w-full">
          <h2 className="w-full text-xl lg:text-3xl font-bold text-black drop-shadow-md shadow-black text-left mb-2">
            Podziel się swoją opinią
          </h2>
          <div className="flex flex-col justify-between w-full h-full">
            <div className="">
              <div className="">
                <label htmlFor="name" className="text-black font-light">
                  Przedstaw się
                </label>
                <input
                  type="text"
                  id="name"
                  placeholder="Imię lub nazwa firmy"
                  value={name}
                  maxLength={30}
                  onChange={(e) => setName(e.target.value)}
                  className="placeholder:text-white placeholder:font-light input input-bordered w-full py-3 px-4 rounded-lg shadow-sm mb-2 text-white border border-gray-300"
                />
              </div>
              <div className="">
                <label htmlFor="opinion" className="text-black font-light">
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
                  className="h-full placeholder:text-white placeholder:font-light input input-bordered w-full py-3 px-4 rounded-lg shadow-sm mb-2 text-white border border-gray-300"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={sent}
              className={`w-full sm:w-full mx-auto py-3 px-6 rounded-lg font-semibold text-white transition-colors duration-300 ${
                sent
                  ? "bg-orange-300 cursor-not-allowed"
                  : "bg-orange-500 hover:bg-orange-400"
              }`}
            >
              {sent ? "Opinia wysłana" : "Wyślij opinię"}
            </button>
          </div>
        </div>

        <div className="md:ml-3 opinions-list py-6  rounded-bl-lg  rounded-t-lg rounded-tr-lg rounded-br-lg max-h-[50vh] overflow-y-scroll w-full">
          <h3 className="text-2xl font-bold mb-4 text-gray-800 flex items-center">
            <FaStar className="text-orange-500 mr-2" /> Opinie naszych klientów
          </h3>
          <ul className="space-y-6">
            {opinions?.map((opinion, index) => (
              <li
                key={index}
                className="flex flex-col lg:flex-row lg:items-center text-lg text-gray-600 italic border-b border-orange-300 pb-2 font-light"
              >
                <div className="flex items-center font-semibold text-gray-800 lg:mr-2 not-italic">
                  <FaUser className="mr-1" /> {opinion.name}:
                </div>
                &quot;{opinion.feedback}&quot;
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
