import { deleteJobOffer, updateUser } from "@/firebase";
import Viewer from "../AddJobOffer/Viewer";
import moment from "moment";
import { useState } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "@/redux/slices/user";
import OfferOptionsOpened from "./OfferOptionsOpened";
import JobOfferDetails from "./JobOfferDetails";
export default function Posting({
  jobOffer,
  loading,
  pay,
}: {
  jobOffer: any;
  loading: any;
  pay: any;
}) {
  const getExpirationColor = (expirationTime: number, extraDays: number) => {
    const expirationDate = moment(expirationTime).add(extraDays, "days");
    return expirationDate.isBefore(moment()) ? "text-red-500" : "text-cta";
  };
  const [deleteMenu, setDeleteMenu] = useState(false);
  const [optionsOpen, setOptionsOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [applicationsOpen, setApplicationsOpen] = useState(false);
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
    <div className="bg-white  shadow-md p-4 h-max font-coco relative overflow-hidden">
      {(optionsOpen || editOpen || applicationsOpen) && (
        <div className="w-full h-full absolute left-0 top-0 bg-black bg-opacity-50" />
      )}
      <OfferOptionsOpened
        optionsOpen={optionsOpen}
        setEditOpen={setEditOpen}
        setOptionsOpen={setOptionsOpen}
        setApplicationsOpen={setApplicationsOpen}
        handleDeleteJobOffer={handleDeleteJobOffer}
        jobOffer={jobOffer}
      />
      <JobOfferDetails
        setOptionsOpen={setOptionsOpen}
        pay={pay}
        optionsOpen={optionsOpen}
        loading={loading}
        jobOffer={jobOffer}
      />
      <div className="viewer mt-6">
        <Viewer value={jobOffer.description} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2 text-black">
        <p className="col-span-1">
          <strong>Wynagrodzenie:</strong> <br /> {jobOffer.salary} (
          {jobOffer.salaryValue})
        </p>
      </div>
    </div>
  );
}
