import { useState } from "react";
import { InputField } from "./InputField";
import ReactConfetti from "react-confetti";
import { addJobOffer, updateUser } from "@/firebase";
import { toast } from "react-toastify";
import { v4 as uuid } from "uuid";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { IProject, JobPosting } from "@/types";
import { setUser } from "@/redux/slices/user";
import { set_modals } from "@/redux/slices/modalsopen";
import Link from "next/link";
import { FaChevronRight } from "react-icons/fa6";
import { FaSave } from "react-icons/fa";
export default function StepThree({
  formData,
  handleChange,
  currentStep,
  prevStep,
  nextStep,
  setFormData,
  user,
  InitialData,
  isAnimating,
  setIsAnimating,
  isSent,
  setIsSent,
  slug,
  category,
  job,
}: {
  formData: any;
  handleChange: any;
  currentStep: number;
  prevStep: any;
  nextStep: any;
  setFormData: any;
  user: any;
  InitialData: any;
  isAnimating: any;
  setIsAnimating: any;
  isSent: any;
  setIsSent: any;
  slug: any;
  category: any;
  job: any;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const handleRecruitmentStart = async () => {
    try {
      if (doesOfferExist()) {
        // Update existing job offer
        await updateJobOffers();
      } else {
        // Add new job offer
        await addJobOfferToUser();
      }
      showToastSuccess("Pomyślnie zapisano ofertę pracy!");
      setIsAnimating(true);
    } catch (error) {
      showToastError("Nie udało się zapisać oferty pracy.");
    }
  };

  const doesOfferExist = () => {
    return user?.job_offers?.some(
      (offer: JobPosting) => offer.slug === formData.slug || offer.slug === slug
    );
  };

  const updateJobOffers = async () => {
    try {
      setIsLoading(true);

      // Create the updated job offer
      const updatedJobOffer: JobPosting = {
        ...formData,
        id:
          user.job_offers.find(
            (offer: JobPosting) => offer.slug === formData.slug
          )?.id || uuid(),
        creationTime: Date.now(),
        authorId: user.uid,
        slug: slug || formData.slug,
        category: category || formData.slug,
        job: job || formData.slug,
      };

      // Update the job offer in the user's job_offers
      const updatedJobOffers = user.job_offers.map((offer: JobPosting) =>
        offer.slug === formData.slug ? updatedJobOffer : offer
      );

      // Update the user in the database
      await updateUser(user.uid, { job_offers: updatedJobOffers });

      // Dispatch updated user state to Redux
      dispatch(
        setUser({
          ...user,
          job_offers: updatedJobOffers,
        })
      );
    } finally {
      setIsLoading(false);
    }
  };

  const addJobOfferToUser = async () => {
    try {
      setIsLoading(true);

      const jobOfferId = uuid();
      const newJobOffer: JobPosting = {
        ...formData,
        id: jobOfferId,
        creationTime: Date.now(),
        authorId: user.uid,
        slug: slug || formData.slug,
        category: category || formData.slug,
        job: job || formData.slug,
      };

      const updatedJobOffers = user.job_offers
        ? [...user.job_offers, newJobOffer]
        : [newJobOffer];

      // Update the user in the database
      await updateUser(user.uid, { job_offers: updatedJobOffers });
      await addJobOffer(newJobOffer);

      // Dispatch updated user state to Redux
      dispatch(
        setUser({
          ...user,
          job_offers: updatedJobOffers,
        })
      );
    } finally {
      setIsLoading(false);
    }
  };

  const { modals } = useSelector((state: any) => state.modals);
  // Open token modal for insufficient tokens

  const openTokenModal = () => {
    dispatch(set_modals({ ...modals, quixies: true }));
  };

  // Helper functions to show toast notifications
  const showToastSuccess = (message: string) => {
    toast.success(message);
  };

  const showToastError = (message: string) => {
    toast.error(message);
  };

  return (
    <div>
      {isAnimating && <ReactConfetti />}
      {currentStep === 3 && (
        <div>
          <InputField
            id="website"
            label="Strona internetowa"
            value={formData.website}
            onChange={handleChange}
            placeholder="Dodaj stronę internetową (opcjonalnie)"
          />

          <div className="flex justify-between mt-4">
            <button
              type="button"
              onClick={prevStep}
              className="p-2 bg-black text-white  hover:bg-cta"
            >
              Powrót
            </button>

            {isSent && (
              <Link
                className="p-2 bg-gradient-to-r from-primary via-cta to-primary py-0.5 text-white  flex items-center"
                href="/user/job_offers"
              >
                Już dodano, przeglądaj oferty <FaChevronRight />
              </Link>
            )}
            {!isSent && (
              <button
                disabled={isSent}
                onClick={async () => {
                  setIsAnimating(true);
                  setIsSent(true);
                  await handleRecruitmentStart();
                }}
                className="font-bold font-coco animate-pulse text-xl flex items-center px-2 py-1 rounded-lg bg-gradient-to-r from-primary via-cta to-primary text-white "
              >
                <FaSave className="text-3xl mr-2" />{" "}
                {isLoading ? "Wczytywanie..." : "Zapisz zmiany"}
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
