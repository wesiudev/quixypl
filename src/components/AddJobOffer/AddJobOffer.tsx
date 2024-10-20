"use client";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { collection, addDoc } from "firebase/firestore";
import Link from "next/link";
import { auth, db } from "@/firebase";
import { toast } from "react-toastify";
import { FaChevronLeft } from "react-icons/fa";
import jobs from "../../../public/14.09.2024.json";
import StepThree from "./Step3";
import StepTwo from "./Step2";
import StepOne from "./Step";
import Loading from "@/app/loading";
import { JobListing } from "@/types";
import { useRouter } from "next/navigation";
export default function AddJobOffer() {
  const [user, loading] = useAuthState(auth);
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
  const router = useRouter();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const jobOffer = {
      ...formData,
      createdAt: Date.now(),
      authorId: user?.uid,
    };

    try {
      await addDoc(collection(db, "offers"), jobOffer).then(() => {
        setFormData(InitialData);
        router.replace("/dashboard/my_postings");
      });
      toast.success("Oferta pracy dodana pomyślnie!");
    } catch (error: any) {
      toast.error(error.message || "Wystąpił błąd podczas dodawania oferty.");
    }
  };

  const nextStep = () => setCurrentStep((prev) => prev + 1);
  const prevStep = () => setCurrentStep((prev) => prev - 1);

  if (loading) {
    return <Loading />;
  }

  if (!user) {
    return <p>Proszę się zalogować, aby dodać ofertę pracy.</p>;
  }

  return (
    <div className="relative overflow-hidden min-h-screen w-full flex flex-col bg-gray-200 rounded-lg hover:shadow-md shadow-cyan items-center">
      <div className="w-[100%] max-w-[40rem] h-max bg-white z-50 relative p-6 lg:p-10 mt-12 ">
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
