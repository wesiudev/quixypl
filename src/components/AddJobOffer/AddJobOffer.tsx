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
import DashboardProviders from "../DashboardProviders";
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
  const { user } = useSelector((state: any) => state?.user);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<JobListing>(InitialData);
  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) {
    const { id, value } = e?.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  }
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
    <div className="relative overflow-hidden min-h-screen w-full flex flex-col bg-gray-600 items-center">
      <DashboardProviders />
      <div className="w-full justify-between bg-gradient-to-r from-primary to-cta py-3 px-6 text-white font-bold text-lg flex items-center">
        <Link href="/user" className="flex items-center">
          <FaChevronLeft className="mr-2 text-xl" />
          Powrót
        </Link>
        <div className="flex flex-col text-white pl-12">
          <h2 className="font-extrabold">Nowe ogłoszenie</h2>
          <p className="text-xs font-coco">
            Zarządzaj ustawieniami oferty o pracę.
          </p>
        </div>
      </div>
      <div className="py-12"></div>
      <div className="max-w-[40rem] rounded-xl bg-white z-50 relative p-6 lg:p-10 overflow-hidden">
        {isAnimating && <ReactConfetti />}
        <h1 className="text-xl md:text-3xl font-gotham text-zinc-800">
          Dodaj darmową ofertę pracy
        </h1>
        <p className="mt-2 text-sm font-coco text-black">
          Podaj najważniejsze informacje dotyczące rekrutacji.
        </p>
        <div className="mt-2"></div>
        <div className="flex flex-col w-full font-coco">
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
          />
          <StepThree
            prevStep={prevStep}
            formData={formData}
            handleChange={handleChange}
            currentStep={currentStep}
            user={user}
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
  );
}
