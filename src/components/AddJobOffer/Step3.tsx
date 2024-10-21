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
}) {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const [hasErrors, setHasErrors] = useState(false);

  const handleRecruitmentStart = async () => {
    const hasEnoughTokens = user.tokens >= formData.price;
    if (!hasEnoughTokens) {
      showToastError("Doładuj Quixies!");
      showToastSuccess("Zapisano pomyślnie kopię oferty pracy!");

      openTokenModal();
      return;
    }

    // Proceed to update the job offers
    await updateJobOffers();
  };
  const [saved, setSaved] = useState(false);
  const router = useRouter();
  // Helper function to handle updating the job offers and user tokens
  const updateJobOffers = async () => {
    try {
      setIsLoading(true);

      // Create new job offer
      const jobOfferId = uuid();
      const newJobOffer = {
        ...formData,
        isPaid: true,
        id: jobOfferId,
        expirationTime: moment().add(formData.days, "days").valueOf(),
        creationTime: Date.now(),
      };
      setSaved(true);
      // Update job offers list for the user
      const updatedJobOffers = user.job_offers
        ? [...user.job_offers, newJobOffer]
        : [newJobOffer];

      // Deduct tokens
      const updatedTokens = user.tokens - formData.price;

      // Update user in the database
      await updateUser(user.uid, {
        job_offers: updatedJobOffers,
        tokens: updatedTokens,
      }).then(() => {
        router.push("/dashboard/my_postings");
      });

      // Dispatch updated user state
      dispatch({
        type: "SET_USER",
        payload: {
          ...user,
          job_offers: updatedJobOffers,
          tokens: updatedTokens,
        },
      });

      showToastSuccess("Job offer added successfully!");
      setIsAnimating(true);
    } catch (error) {
      console.error("Error updating job offers:", error);
      showToastError("Failed to update job offers.");
    } finally {
      setIsLoading(false);
    }
  };

  // Open token modal for insufficient tokens
  const openTokenModal = () => {
    dispatch({ type: "OPEN_MODAL", payload: { modalType: "TOKEN_MODAL" } });
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
            placeholder="Enter contact email"
          />
          <InputField
            id="phone"
            label="Phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Enter phone number"
          />
          <InputField
            id="website"
            label="Website"
            value={formData.website}
            onChange={handleChange}
            placeholder="Enter website (optional)"
          />
          {formData.website && formData.phone && formData.email && (
            <div className="sticky bottom-0 flex flex-col bg-white py-2 rounded-xl">
              <div className="bg-gradient-to-r from-primary to-cta text-white rounded-xl p-4 lg:p-6">
                <label htmlFor="days-range" className="font-bold">
                  For how many days do you want to post the job? (
                  {formData.days} days)
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
                  Price: 💎{formData.price?.toFixed(2)}
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
              Back
            </button>
            <button
              disabled={isLoading}
              onClick={async () => {
                setIsAnimating(true);
                await handleRecruitmentStart();
              }}
              className="p-2 bg-gradient-to-r from-primary to-cta py-0.5 text-white rounded-md"
            >
              {isLoading ? "Loading..." : "Add Job Offer"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
