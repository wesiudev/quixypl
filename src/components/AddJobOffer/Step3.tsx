import { useState } from "react";
import { InputField } from "./InputField";
import ReactConfetti from "react-confetti";
import { addJobOffer, updateUser } from "@/firebase";
import { toast } from "react-toastify";
import { v4 as uuid } from "uuid";
import { useRouter } from "next/navigation";
import moment from "moment";
export default function StepThree({
  formData,
  handleChange,
  currentStep,
  prevStep,
  nextStep,
  setFormData,
  user,
  InitialData,
}: {
  formData: any;
  handleChange: any;
  currentStep: number;
  prevStep: any;
  nextStep: any;
  setFormData: any;
  user: any;
  InitialData: any;
}) {
  const [isAnimating, setIsAnimating] = useState(false);
  const [send, sent] = useState(false);
  const router = useRouter();
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
            placeholder="Wpisz email kontaktowy"
          />
          <InputField
            id="phone"
            label="Telefon"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Wpisz numer telefonu"
          />
          <InputField
            id="website"
            label="Strona internetowa"
            value={formData.website}
            onChange={handleChange}
            placeholder="Wpisz link (opcjonalnie)"
          />
          {formData.website && formData.phone && formData.email && (
            <div className="w-full sticky bottom-0 flex flex-col bg-white py-2 rounded-xl">
              <div
                className="w-full mb-4 bg-gradient-to-r from-primary to-cta text-white rounded-xl p-4 lg:p-6"
                style={{ textShadow: "2px 2px 2px black" }}
              >
                <label htmlFor="days-range" className="font-bold">
                  Na ile dni chcesz dodać ofertę pracy? ({formData?.days} dni)
                </label>
                <div className="py-4 bg-gradient-to-r from-primary to-cta">
                  <input
                    id="days-range"
                    type="range"
                    min="1"
                    max="30"
                    value={formData?.days || 1}
                    onChange={(e: any) => {
                      setFormData({
                        ...formData,
                        days: e.target.value,
                        price: 15.99 + e.target.value * 8.42,
                      });
                    }}
                    className="w-full mt-2"
                  />
                </div>
                <div className="text-lg font-semibold mt-2">
                  Cena: 💎{formData?.price?.toFixed(2)}
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
              Wstecz
            </button>
            <button
              disabled={send}
              onClick={async () => {
                if (formData.days === 0) {
                  return toast.error(
                    "Nie możesz dodać oferty pracy na 0 dni!",
                    {
                      position: "top-right",
                      autoClose: 5000,
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: true,
                      progress: undefined,
                    }
                  );
                }

                try {
                  await addJobOffer({
                    ...formData,
                    expirationTime: moment()
                      .add(formData?.days, "days")
                      .valueOf(),
                    authorId: user?.uid,
                    id: uuid(),
                    isPaid: user?.tokens >= formData?.price,
                  });
                  await updateUser(user?.uid, {
                    tokens: user?.isPaid
                      ? (user?.tokens ?? 0) - formData?.price
                      : user?.tokens ?? 0,
                    job_offers: user?.job_offers
                      ? [...user.job_offers, formData]
                      : [formData],
                  });
                  sent(true);
                  setTimeout(() => {
                    router.replace("/dashboard/my_postings");
                  }, 5000);
                } catch (error) {
                  toast.error(
                    `Wystąpił błąd podczas dodawania oferty. ${error?.toString()}`
                  );
                }
                setIsAnimating(true);
                setTimeout(() => {
                  setIsAnimating(false);
                }, 5000);
              }}
              className="disabled:bg-cta p-2 bg-gradient-to-r from-primary to-cta py-0.5 text-white rounded-md"
            >
              Dodaj ofertę
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
