import { useState } from "react";
import { InputField } from "./InputField";
import ReactConfetti from "react-confetti";
import { addJobOffer, updateUser } from "@/firebase";
import { toast } from "react-toastify";
import { v4 as uuid } from "uuid";
import { useRouter } from "next/navigation";
import moment from "moment";
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
    await updateJobOffers().then(() => {
      showToastSuccess("Pomyślnie zapisano ofertę pracy!");
    });
    setIsAnimating(true);
  };
  const router = useRouter();
  const updateJobOffers = async () => {
    try {
      setIsLoading(true);

      // Check if the user has enough tokens
      const hasEnoughTokens = true;

      // Create new job offer
      const jobOfferId = uuid();
      const newJobOffer: JobPosting = {
        ...formData,
        isPaid: hasEnoughTokens,
        id: jobOfferId,
        creationTime: Date.now(),
        authorId: user.uid,
        slug: slug,
        category: category,
        job: job,
      };

      // Update job offers list for the user
      const updatedJobOffers = user.job_offers
        ? [...user.job_offers, newJobOffer]
        : [newJobOffer];

      // Calculate updated tokens if user has enough
      const updatedTokens = hasEnoughTokens
        ? user.tokens - formData.price
        : user.tokens;

      // Update user in the database
      await updateUser(user.uid, {
        job_offers: updatedJobOffers,
        // tokens: updatedTokens,
      });
      await addJobOffer(newJobOffer);
      // Dispatch updated user state to Redux
      dispatch(
        setUser({
          ...user,
          job_offers: updatedJobOffers,
          // tokens: updatedTokens,
        })
      );

      setIsAnimating(false);
    } catch (error: any) {
      showToastError(error.toString());
    } finally {
      setIsLoading(false);
      setTimeout(() => {
        router.push("/user/my_postings");
      }, 5000);
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
    <>
      <div className="relative z-50">
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
                  href="/user/my_postings"
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

      {isAnimating && (
        <div className="fixed left-0 top-0 w-full h-screen z-0">
          <ReactConfetti />
        </div>
      )}
    </>
  );
}
