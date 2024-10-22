import { toast } from "react-toastify";
import { InputField } from "./InputField";
import { useState } from "react";

export default function StepTwo({
  formData,
  handleChange,
  currentStep,
  prevStep,
  nextStep,
  setFormData,
  user,
}: {
  setFormData: any;
  user: any;
  formData: any;
  handleChange: any;
  currentStep: number;
  prevStep: any;
  nextStep: any;
}) {
  return (
    <div className="w-full">
      {currentStep === 2 && (
        <div className="w-full mt-2">
          <div className="font-bold text-sm text-black flex flex-col">
            <div className="flex flex-row items-center flex-wrap">
              <div className={"mb-2 flex items-center flex-wrap w-full"}>
                <div className="w-full">
                  <div>
                    <h3 className="font-gotham font-light text-black drop-shadow-lg mt-2">
                      Nazwa Firmy/Działalności/Imię rekrutera
                    </h3>
                    <input
                      className="border border-primary rounded-md p-2 text-black font-light w-full"
                      value={formData?.name}
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          name: e.target.value,
                        });
                      }}
                      placeholder="Kto dodaje ofertę?"
                    />
                  </div>

                  <div className="mt-3"></div>

                  <div>
                    <h3 className="font-gotham font-light text-black drop-shadow-lg">
                      Rodzaj Wynagrodzenia
                    </h3>
                    <select
                      value={formData?.salary || ""}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          salary: e.target.value,
                        })
                      }
                      className="border border-primary rounded-md p-2 text-black w-full !font-gotham font-light"
                    >
                      <option value="Nie podano">Rodzaj wynagrodzenia</option>
                      <option value="Stawka godzinowa">Stawka godzinowa</option>
                      <option value="Stawka miesięczna">
                        Stawka miesięczna
                      </option>
                      <option value="Per Milestone">Per Milestone</option>
                      <option value="Prowizja">Prowizja</option>
                      <option value="Akcje i udziały">Akcje i udziały</option>
                      <option value="Inne">Inne</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="!font-gotham font-light text-gray-800">
            <InputField
              id="salaryValue"
              label="Wynagrodzenie"
              value={formData.salaryValue}
              onChange={handleChange}
              placeholder="Opisz wynagrodzenie"
            />
          </div>
          <div className="flex justify-between mt-4">
            <button
              type="button"
              onClick={prevStep}
              className="p-2 bg-black text-white rounded-md hover:bg-cta"
            >
              Wstecz
            </button>
            <button
              type="button"
              onClick={() => {
                if (
                  formData.tags &&
                  formData.salary &&
                  formData.name &&
                  formData.salaryValue
                ) {
                  nextStep();
                } else {
                  console.log(formData);
                  toast.error("Uzupełnij dane!", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                  });
                }
              }}
              className="p-2 bg-gradient-to-r from-primary to-cta py-0.5 text-white rounded-md"
            >
              Następny krok
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
