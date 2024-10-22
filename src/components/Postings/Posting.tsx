import { deleteJobOffer, updateUser } from "@/firebase";
import Link from "next/link";
import { FaClock, FaRocket, FaUserClock } from "react-icons/fa6";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import Viewer from "../AddJobOffer/Viewer";
import moment from "moment";
import { useState } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "@/redux/slices/user";
export default function Posting({
  jobOffer,
  loading,
  pay,
  setLoading,
}: {
  jobOffer: any;
  loading: any;
  pay: any;
  setLoading: any;
}) {
  const getExpirationColor = (expirationTime: number, extraDays: number) => {
    const expirationDate = moment(expirationTime).add(extraDays, "days");
    return expirationDate.isBefore(moment()) ? "text-red-500" : "text-cta";
  };
  const [deleteMenu, setDeleteMenu] = useState(false);
  const [optionsOpen, setOptionsOpen] = useState(false);
  const { user } = useSelector((state: any) => state.user);
  const dispatch = useDispatch();
  const handleDeleteJobOffer = async (jobOfferId: string) => {
    try {
      // Delete job offer from the collection
      await deleteJobOffer(jobOfferId);

      // Update the user's job offers by removing the deleted one
      const updatedJobOffers = user.job_offers.filter(
        (offer: any) => offer.id !== jobOfferId
      );

      // Update user in the database
      await updateUser(user.uid, { job_offers: updatedJobOffers });

      // Dispatch updated user state to Redux
      dispatch(
        setUser({
          ...user,
          job_offers: updatedJobOffers,
        })
      );

      toast.success("Pomyślnie usunięto ofertę.");
    } catch (error) {
      toast.error("Przepraszamy! Wystąpił błąd.");
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 h-max font-coco relative overflow-hidden">
      {optionsOpen && (
        <div className="w-full h-full absolute left-0 top-0 bg-black bg-opacity-50" />
      )}
      <div
        className={`px-2 z-50 rounded-lg absolute top-7 right-12 w-max h-max py-6 bg-zinc-800 flex flex-col items-start space-y-1 duration-500 ease-in-out ${
          !optionsOpen ? "-translate-y-[80px] scale-x-0" : "-translate-y-0"
        }`}
      >
        <button className="w-full px-4 py-1 text-white bg-white bg-opacity-10 rounded-lg duration-150 hover:bg-opacity-20">
          Edytuj
        </button>
        <button
          onClick={() => {
            if (!deleteMenu) {
              setDeleteMenu(true);
            } else {
              setDeleteMenu(false);
            }
          }}
          disabled={loading}
          className="w-full px-4 py-1 text-red-500 bg-white disabled:bg-red-400 bg-opacity-10 rounded-lg duration-150 hover:bg-opacity-20"
        >
          {loading && <div className="loading loading-spinner"></div>}{" "}
          {deleteMenu ? "Anuluj" : "Usuń"}
        </button>
        {deleteMenu && (
          <>
            <button
              disabled={loading}
              onClick={() => {
                setLoading(true);
                handleDeleteJobOffer(jobOffer.id).then(() => setLoading(false));
              }}
              className="disabled:bg-red-400 w-full px-4 py-1 text-white bg-red-500 bg-opacity-100 rounded-lg duration-150 hover:bg-opacity-90"
            >
              {loading && <div className="loading loading-spinner"></div>} Usuń
            </button>
          </>
        )}
      </div>
      <div className="flex w-full justify-between font-gotham mb-4 text-black">
        <div className="flex flex-col">
          <h3 className="font-coco text-lg sm:text-xl font-bold text-black mb-2 pr-6">
            {jobOffer.title}
          </h3>
          <div className="text-sm col-span-1 font-coco">
            <div className="flex flex-col">
              <div className="flex items-center font-bold">Do zapłaty</div> 💎
              {jobOffer.price}
            </div>
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
                {loading && <div className="loading-lg loading-infinity"></div>}
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

        <div className="flex flex-col">
          <div className="flex items-end justify-end">
            <button
              onClick={() => setOptionsOpen(!optionsOpen)}
              className={`w-max text-3xl text-white h-full px-2 bg-gradient-to-r from-primary to-cta hover:bg-opacity-20 rounded relative z-50 duration-200 `}
            >
              <HiOutlineDotsHorizontal
                className={`${
                  optionsOpen ? "scale-125 hover:scale-110" : "hover:scale-90"
                }`}
              />
            </button>
          </div>
          {jobOffer.creationTime && (
            <div className="mt-6 flex">
              <FaUserClock className="text-xl text-gray-600 mr-2 mt-1.5" />
              <div className="flex flex-col font-coco">
                <h2 className="font-bold">Dodano</h2>
                <div className="text-primary text-sm w-max">
                  {moment(jobOffer.creationTime).fromNow()}
                </div>
              </div>
            </div>
          )}
          {jobOffer.expirationTime && (
            <div className="flex mt-2">
              <FaClock className="text-xl text-gray-600 mr-2 mt-1.5" />
              <div className="flex flex-col font-coco">
                <h2 className="font-bold">Wygasa</h2>
                {jobOffer.expirationTime && (
                  <div
                    className={`${getExpirationColor(
                      jobOffer.expirationTime,
                      0
                    )} text-sm w-max`}
                  >
                    {moment(jobOffer.creationTime)
                      .add(jobOffer.days, "days")
                      .add(0, "days")
                      .fromNow()}
                  </div>
                )}
              </div>
            </div>
          )}

          <div className="flex mt-2">
            <FaRocket className="text-xl text-gray-600 mr-2 mt-1.5" />
            <div className="flex flex-col font-coco">
              <h2 className="font-bold">Status</h2>
              {jobOffer.expirationTime && (
                <div
                  className={`${
                    jobOffer.isPaid ? "text-green-500" : "text-red-500"
                  } text-sm w-max`}
                >
                  {jobOffer.isPaid ? "Aktywna" : "Nie opłacono"}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="viewer mt-6">
        <Viewer value={jobOffer.description} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2 text-black">
        <div className="flex flex-col">
          {jobOffer.phone && (
            <p className="text-sm col-span-1">
              <strong>Telefon:</strong> <br /> {jobOffer.phone}
            </p>
          )}
          {jobOffer.email && (
            <p className="text-sm col-span-1 mt-2">
              <strong>Email:</strong> <br /> {jobOffer.email}
            </p>
          )}
        </div>
        <p className="text-sm col-span-1">
          <strong>Wynagrodzenie:</strong> <br /> {jobOffer.salary} (
          {jobOffer.salaryValue})
        </p>
      </div>
    </div>
  );
}
