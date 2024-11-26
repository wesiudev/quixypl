"use client";
import { useState } from "react";
import Link from "next/link";
import { FaChevronLeft } from "react-icons/fa";
import jobs from "../../../public/14.09.2024.json";
import StepThree from "./Step3";
import StepTwo from "./Step2";
import StepOne from "./Step";
import { JobListing } from "@/types";
import ReactConfetti from "react-confetti";
import { useSelector } from "react-redux";
export default function AddJobOffer() {
  const InitialData = {
    days: 1,
    description: "",
    email: "",
    isPaid: false,
    location: "",
    name: "",
    phone: "",
    price: 24.41,
    requirements: "",
    salary: "",
    salaryValue: "",
    tags: [],
    title: "",
    website: "",
  };
  const { user } = useSelector((state: any) => state.user);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<JobListing>(InitialData);
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };
  const [configurationOpen, setConfigurationOpen] = useState(false);
  const [slug, setSlug] = useState("");
  const [category, setCategory] = useState("");
  const [job, setJob] = useState("");
  const [tagsOpenLevel, setTagsOpenLevel] = useState(0);
  const [tagDeletion, setTagDeletion] = useState(false);
  const [selectedTag, setSelectedTag] = useState<any>({});
  const [isAnimating, setIsAnimating] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const nextStep = () => setCurrentStep((prev) => prev + 1);
  const prevStep = () => setCurrentStep((prev) => prev - 1);
  return (
    <>
      <div className="w-full justify-between bg-gradient-to-r from-primary to-cta py-3 px-6 text-white font-bold text-lg flex items-center">
        <Link href="/user" className="flex items-center">
          <FaChevronLeft className="mr-2 text-xl" />
          Powrót
        </Link>
        <div className="flex flex-col text-white pl-12">
          <h2 className="font-extrabold">Nowe ogłoszenie</h2>
          <p className="text-xs font-coco">
            Dodajesz ofertę pracy do naszej platformy
          </p>
        </div>
      </div>
      <h2 className="p-4 lg:p-12 font-extrabold text-2xl text-white">
        Dodaj darmową ofertę pracy
      </h2>
      <div className="relative overflow-hidden min-h-screen px-4 pb-4 lg:px-12 lg:pb-12 w-full flex flex-col bg-[#222430]">
        <div className="w-[100%]  h-max bg-white z-50 relative p-4 overflow-hidden">
          {isAnimating && <ReactConfetti />}

          <div className="mt-2"></div>
          <div className="flex flex-col w-full">
            <StepOne
              formData={formData}
              handleChange={handleChange}
              nextStep={nextStep}
              currentStep={currentStep}
              tagsOpenLevel={tagsOpenLevel}
              setTagsOpenLevel={setTagsOpenLevel}
              setTagDeletion={setTagDeletion}
              selectedTag={selectedTag}
              setSelectedTag={setSelectedTag}
              tagDeletion={tagDeletion}
              configurationOpen={configurationOpen}
              setConfigurationOpen={setConfigurationOpen}
              setSlug={setSlug}
              slug={slug}
              category={category}
              job={job}
              setCategory={setCategory}
              jobs={jobs}
              user={user}
              setFormData={setFormData}
              setJob={setJob}
            />
            <StepTwo
              setFormData={setFormData}
              prevStep={prevStep}
              nextStep={nextStep}
              formData={formData}
              handleChange={handleChange}
              currentStep={currentStep}
              user={user}
            />
            <StepThree
              prevStep={prevStep}
              nextStep={nextStep}
              formData={formData}
              handleChange={handleChange}
              currentStep={currentStep}
              setFormData={setFormData}
              user={user}
              InitialData={InitialData}
              setIsAnimating={setIsAnimating}
              isAnimating={isAnimating}
              isSent={isSent}
              setIsSent={setIsSent}
              slug={slug}
              category={category}
              job={job}
            />
          </div>
        </div>
      </div>
    </>
  );
}
