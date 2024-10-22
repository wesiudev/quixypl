"use client";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { collection, addDoc } from "firebase/firestore";
import Link from "next/link";
import { addJobOffer, updateUser } from "@/firebase";
import { toast } from "react-toastify";
import { FaChevronLeft } from "react-icons/fa";
import jobs from "../../../public/14.09.2024.json";
import StepThree from "./Step3";
import StepTwo from "./Step2";
import StepOne from "./Step";
import { JobListing } from "@/types";
import { useRouter } from "next/navigation";
import ReactConfetti from "react-confetti";
import { v4 as uuid } from "uuid";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "@/redux/slices/user";
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
  const [slug, setSlug] = useState({ title: "", url: "" });
  const [category, setCategory] = useState({ title: "", url: "" });
  const [tagsOpenLevel, setTagsOpenLevel] = useState(0);
  const [tagDeletion, setTagDeletion] = useState(false);
  const [selectedTag, setSelectedTag] = useState<any>({});
  const [isAnimating, setIsAnimating] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const jobOffer = {
      ...formData,
      createdAt: Date.now(),
      authorId: user?.uid,
    };

    try {
      await addJobOffer({
        ...formData,
        expirationTime: moment().add(formData?.days, "days").valueOf(),
        authorId: user?.uid,
        id: uuid(),
        isPaid: user?.tokens >= formData?.price,
      });
      await updateUser(user?.uid, {
        job_offers: user?.job_offers
          ? [
              ...user.job_offers,
              {
                ...formData,
                expirationTime: moment().add(formData?.days, "days").valueOf(),
                authorId: user?.uid,
                id: uuid(),
                isPaid: user?.tokens >= formData?.price,
              },
            ]
          : [
              {
                ...formData,
                expirationTime: moment().add(formData?.days, "days").valueOf(),
                authorId: user?.uid,
                id: uuid(),
                isPaid: user?.tokens >= formData?.price,
              },
            ],
      });
      dispatch(
        setUser({ ...user, job_offers: [...user.job_offers, formData] })
      );
      toast.success("Oferta pracy dodana pomyślnie!");
      router.push("/dashboard/my_postings");
    } catch (error: any) {
      toast.error("Wystąpił błąd podczas dodawania oferty.");
    }
  };

  const nextStep = () => setCurrentStep((prev) => prev + 1);
  const prevStep = () => setCurrentStep((prev) => prev - 1);

  return (
    <div className="relative overflow-hidden min-h-screen w-full flex flex-col bg-gradient-to-r from-primary to-cta items-center">
      {isAnimating && <ReactConfetti />}

      <div
        style={{ boxShadow: "0px 0px 5px black" }}
        className="w-[100%] max-w-[55rem] h-max bg-white z-50 relative p-6 lg:p-10 my-12 rounded-xl"
      >
        <h1 className="text-xl md:text-3xl font-gotham text-zinc-800">
          Dodaj ofertę pracy
        </h1>
        <p className="mt-2 text-sm font-coco">
          Podaj najważniejsze informacje dotyczące rekrutacji. Możesz uwzględnić
          zdjęcia oraz filmy.
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
            slug={slug}
            setSlug={setSlug}
            category={category}
            setCategory={setCategory}
            jobs={jobs}
            user={user}
            setFormData={setFormData}
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
            handleSubmit={handleSubmit}
            setIsAnimating={setIsAnimating}
            isAnimating={isAnimating}
            isSent={isSent}
            setIsSent={setIsSent}
          />
        </div>
        <Link
          href="/dashboard"
          className="mt-4 p-2 bg-primary text-white rounded-md hover:bg-primary-dark flex items-center justify-center"
        >
          <FaChevronLeft className="mr-2" />
          Powrót do panelu
        </Link>
      </div>
    </div>
  );
}
