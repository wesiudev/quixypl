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
  const [optionsOpen, setOptionsOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [applicationsOpen, setApplicationsOpen] = useState(false);
  const [deleteMenu, setDeleteMenu] = useState(false);
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
      setOptionsOpen(false);
      setDeleteMenu(false);
    } catch (error) {
      toast.error("Przepraszamy! Wystąpił błąd.");
    }
  };
  return (
    <div className="h-[50vh] overflow-y-scroll bg-white shadow-md">
      <div className="p-4 relative">
        <OfferOptionsOpened
          setDeleteMenu={setDeleteMenu}
          deleteMenu={deleteMenu}
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
        <div className="mt-6">
          <Viewer value={jobOffer?.description} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2 text-black">
          <p className="col-span-1">
            <strong>Wynagrodzenie:</strong> <br /> {jobOffer.salary} (
            {jobOffer.salaryValue})
          </p>
        </div>
      </div>
    </div>
  );
}
