"use client";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { FaPlus } from "react-icons/fa6";
import { IoCloseCircle } from "react-icons/io5";
import { JobPosting } from "@/types";
import { updateJobOffer, updateUser } from "@/firebase";
import { useState } from "react";
import { setUser } from "@/redux/slices/user";
import "quill/dist/quill.snow.css";
import "moment/locale/pl";
import { toast } from "react-toastify";
import Posting from "./Posting";
import { set_modals } from "@/redux/slices/modalsopen";
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

const JobOfferList = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state: any) => state.user);
  const [loading, setLoading] = useState(false);
  const { modals } = useSelector((state: any) => state.modals);
  const pay = (jobOffer: JobPosting) => {
    setLoading(true);
    if (user?.tokens < jobOffer.price) {
      return (
        dispatch(set_modals({ ...modals, quixies: true })),
        setLoading(false),
        toast.error("Niewystarczająca ilość Quixies", {
          position: "top-right",
          autoClose: 5000,
        })
      );
    }
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
      <h2 className="z-50 shadow-sm sticky top-0 text-black p-3 px-6 lg:p-6 bg-white font-bold font-coco text-lg sm:text-3xl">
        Twoje Oferty Pracy
      </h2>
      <div className="bg-gray-200 min-h-screen grid grid-cols-1 2xl:grid-cols-2 gap-6 p-6">
        {user?.job_offers?.map((jobOffer: JobPosting, i: number) => (
          <Posting
            key={i}
            jobOffer={jobOffer}
            pay={pay}
            loading={loading}
            setLoading={setLoading}
          />
        ))}
      </div>
    </div>
  );
};

export default JobOfferList;
