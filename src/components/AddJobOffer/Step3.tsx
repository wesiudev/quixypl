import { useState } from "react";
import { InputField } from "./InputField";
import ReactConfetti from "react-confetti";
import { addJobOffer, updateUser } from "@/firebase";
import { toast } from "react-toastify";
import { v4 as uuid } from "uuid";
import { useRouter } from "next/navigation";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { IProject } from "@/types";
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
  handleSubmit,
  isSent,
  setIsSent,
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
  handleSubmit: any;
  isSent: any;
  setIsSent: any;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const handleRecruitmentStart = async () => {
    const hasEnoughTokens = user.tokens >= formData.price;
    if (!hasEnoughTokens) {
      showToastSuccess("Pomyślnie zapisano ofertę pracy!");
      await updateJobOffers();

      setIsAnimating(true);
      setTimeout(() => {
        router.push("/dashboard/my-postings");
      }, 5000);
    }
  };
  const router = useRouter();
  const updateJobOffers = async () => {
    try {
      setIsLoading(true);

      // Check if the user has enough tokens
      const hasEnoughTokens = true;

      // Create new job offer
      const jobOfferId = uuid();
      const newJobOffer = {
        ...formData,
        isPaid: hasEnoughTokens,
        id: jobOfferId,
        expirationTime: moment().add(formData.days, "days").valueOf(),
        creationTime: Date.now(),
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
      }).then(() => {
        setTimeout(() => {
          router.push("/dashboard/my-postings");
        }, 5000);
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

      setIsAnimating(true);
    } catch (error) {
      showToastError("Failed to add job offer.");
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
                href="/dashboard/my-postings"
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
