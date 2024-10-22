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
      showToastError("Doładuj Quixies!");
      showToastSuccess("Pomyślnie zapisano ofertę pracy!");
      openTokenModal();
    }
    await updateJobOffers();
  };
  const [saved, setSaved] = useState(false);
  const router = useRouter();
  const updateJobOffers = async () => {
    try {
      setIsLoading(true);

      // Check if the user has enough tokens
      const hasEnoughTokens = user.tokens >= formData.price;

      // Create new job offer
      const jobOfferId = uuid();
      const newJobOffer = {
        ...formData,
        isPaid: hasEnoughTokens, // Set isPaid based on user's token balance
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
        tokens: updatedTokens,
      }).then(() => {
        router.push("/dashboard/my_postings");
      });

      // Dispatch updated user state to Redux
      dispatch(
        setUser({
          ...user,
          job_offers: updatedJobOffers,
          tokens: updatedTokens,
        })
      );

      setIsAnimating(true);
    } catch (error) {
      console.error("Error", error);
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
            id="email"
            label="Email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Wpisz email"
          />
          <InputField
            id="phone"
            label="Phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Wpisz numer telefonu (opcjonalnie)"
          />
          <InputField
            id="website"
            label="Website"
            value={formData.website}
            onChange={handleChange}
            placeholder="Dodaj stronę internetową (opcjonalnie)"
          />
          {formData.email && (
            <div className="sticky bottom-0 flex flex-col bg-white py-2 rounded-xl">
              <div className="bg-gradient-to-r from-primary via-cta to-primary text-white rounded-xl p-4 lg:p-6">
                <label htmlFor="days-range" className="font-bold">
                  Przez jaki okres czasu oferta ma być wyświetlana? (
                  {formData.days} dni)
                </label>
                <input
                  id="days-range"
                  type="range"
                  min="1"
                  max="30"
                  value={formData?.days || 1}
                  onChange={(e: any) =>
                    setFormData({
                      ...formData,
                      days: e.target.value,
                      price: 15.99 + e.target.value * 8.42,
                    })
                  }
                  className="w-full mt-2"
                />
                <div className="text-lg font-semibold mt-2">
                  💎{formData.price?.toFixed(2)}
                </div>
              </div>
            </div>
          )}
          <div className="flex justify-between mt-4">
            <button
              type="button"
              onClick={prevStep}
              className="p-2 bg-black text-white rounded-md hover:bg-cta"
            >
              Powrót
            </button>

            {isSent && (
              <Link
                className="p-2 bg-gradient-to-r from-primary via-cta to-primary py-0.5 text-white rounded-md flex items-center"
                href="/dashboard/applications"
              >
                Już dodano, przejdź do aplikacji <FaChevronRight />
              </Link>
            )}
            {!isSent && (
              <button
                onClick={async () => {
                  setIsAnimating(true);
                  setIsSent(true);
                  await handleRecruitmentStart();
                }}
                className="p-2 bg-gradient-to-r from-primary via-cta to-primary py-0.5 text-white rounded-md"
              >
                {isLoading ? "Wczytywanie..." : "Dodaj ofertę pracy"}
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
