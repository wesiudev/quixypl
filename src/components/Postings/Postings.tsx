"use client";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { FaPlus } from "react-icons/fa6";
import { IoCloseCircle } from "react-icons/io5";
import { JobPosting } from "@/types";
import { updateJobOffer, updateUser } from "@/firebase";
import { useState } from "react";
import { setUser } from "@/redux/slices/user";

interface IProjectImage {
  src: string;
  desc: string;
}

export interface IProject {
  name: string;
  desc: string;
  images: IProjectImage[];
  url: string;
  time: string;
  isRecruitment: boolean;
  price: any;
  isPaid: boolean;
  days: number;
  type: "quick" | "normal";
  id: string;
  expirationTime: number;
  companySize: string;
  creationTime: number;
  extraDays: number;
  link: string;
}

const getExpirationColor = (expirationTime: number, extraDays: number) => {
  const expirationDate = moment(expirationTime).add(extraDays, "days");
  return expirationDate.isBefore(moment()) ? "text-red-500" : "text-cta";
};
const JobOfferList = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state: any) => state.user);
  const [loading, setLoading] = useState(false);
  const pay = (jobOffer: JobPosting) => {
    setLoading(true);
    if (user?.tokens < jobOffer.price) return setLoading(false);
    updateJobOffer(jobOffer.id, { isPaid: true });
    updateUser(user.uid, {
      tokens: user.tokens - jobOffer.price,
      job_offers: user.job_offers.map((offer: any) =>
        offer.id === jobOffer.id ? { ...offer, isPaid: true } : offer
      ),
    });
    dispatch(
      setUser({
        ...user,
        tokens: user.tokens - jobOffer.price,
        job_offers: user.job_offers.map((offer: any) =>
          offer.id === jobOffer.id ? { ...offer, isPaid: true } : offer
        ),
      })
    );
  };

  if (!user?.job_offers || user?.job_offers?.length === 0) {
    return (
      <div className="h-screen flex items-center justify-center bg-gradient-to-r from-primary to-cta flex-col">
        <IoCloseCircle className="text-8xl mb-3 text-white" />
        <p className="text-lg font-light italic text-white font-coco px-4 text-center">
          Nie znaleziono aktywnych ofert pracy. Dodaj nową ofertę,
          <br /> aby rozpocząć!
        </p>
        <Link href="/dashboard/add_job_offer" className="mt-2">
          <div className="flex items-center justify-center bg-gradient-to-r from-cta to-primary text-white font-bold py-2 px-4 rounded">
            <FaPlus className="mr-2" />
            Dodaj ofertę pracy
          </div>
        </Link>
      </div>
    );
  }
  return (
    <div className="flex flex-col w-full">
      <h2 className="shadow-sm sticky top-0 text-black p-3 px-6 lg:p-6 bg-white font-bold font-coco text-lg sm:text-3xl">
        Twoje Oferty Pracy
      </h2>
      <div className="bg-gray-200 min-h-screen grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-6 p-6">
        {user?.job_offers?.map((jobOffer: JobPosting, i: number) => (
          <div
            key={i}
            className="bg-white rounded-lg shadow-md p-4 h-max font-coco"
          >
            <h3 className="text-lg font-bold text-black mb-2">
              {jobOffer.name}
            </h3>
            <h2 className="text-lg mt-2 text-black font-light">
              Opis stanowiska
            </h2>
            <p className="text-sm text-zinc-800 mb-4">{jobOffer.description}</p>
            <h2 className="text-lg mt-2 text-black font-light">Wymagania</h2>
            <p className="text-sm text-zinc-800 mb-4">
              {jobOffer.requirements}
            </p>

            <div className="flex flex-col font-gotham mb-4 text-black">
              {jobOffer.creationTime && (
                <>
                  <h2 className="font-semibold">Dzień dodania</h2>
                  <span className="text-primary">
                    {moment(jobOffer.creationTime).format(
                      "DD.MM.YYYY hh:mm:ss"
                    )}
                  </span>
                </>
              )}
              {jobOffer.expirationTime && (
                <>
                  <h2 className="font-semibold mt-2">Dzień wygaśnięcia</h2>
                  {jobOffer.expirationTime && (
                    <span
                      className={getExpirationColor(jobOffer.expirationTime, 0)}
                    >
                      {moment(jobOffer.creationTime)
                        .add(jobOffer.days, "days")
                        .add(0, "days")
                        .format("DD.MM.YYYY hh:mm:ss")}
                    </span>
                  )}
                </>
              )}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2 text-black">
              {jobOffer.phone && (
                <p className="text-sm col-span-1">
                  <strong>Telefon:</strong> <br /> {jobOffer.phone}
                </p>
              )}
              {jobOffer.email && (
                <p className="text-xs col-span-1">
                  <strong>Email:</strong> <br /> {jobOffer.email}
                </p>
              )}
              <p className="text-sm col-span-1">
                <strong>Wynagrodzenie:</strong> <br /> {jobOffer.salary} (
                {jobOffer.salaryValue})
              </p>
              <div className="text-sm col-span-1">
                <strong>Cena:</strong> <br /> {jobOffer.price} 💎
                <p
                  className={`${
                    jobOffer.isPaid ? "text-green-500" : "text-red-500"
                  } text-sm mb-2`}
                >
                  {jobOffer.isPaid ? "Opłacono" : "Nie opłacono"}
                </p>
                {!jobOffer.isPaid && (
                  <button
                    disabled={loading}
                    onClick={() => pay(jobOffer)}
                    className="bg-gradient-to-r from-primary to-cta px-2 py-0.5 rounded-md text-white"
                  >
                    Opublikuj{" "}
                    {loading && (
                      <div className="loading-lg loading-infinity"></div>
                    )}
                  </button>
                )}
                {jobOffer.isPaid && (
                  <Link
                    href="/dashboard/applications"
                    className="bg-gradient-to-r from-primary to-cta px-2 py-0.5 rounded-md text-white"
                  >
                    Przeglądaj aplikacje
                  </Link>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobOfferList;
