import Link from "next/link";
import { useState, useEffect } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { IoCheckmarkCircle, IoClose, IoCloseCircle } from "react-icons/io5";

// MultiStepVerification Component
export default function MultiStepVerification({
  name,
  emailVerified,
  seek,
  configured,
  pseudo,
}: {
  name: any;
  emailVerified: any;
  seek: any;
  configured: any;
  pseudo: any;
}) {
  // State to track progress percentage
  const [progress, setProgress] = useState(0);

  // Function to calculate the percentage completion
  const calculateProgress = () => {
    let completion = 0;

    // Add points for each completed step
    if (name) completion += 20; // 20% for name
    if (emailVerified) completion += 20; // 20% for email verification
    if (pseudo) completion += 20; // 20% for having ideas
    if (seek === true || seek === false) completion += 20; // 20% if seek is true/false
    if (configured) completion += 20; // 20% if configured

    return completion;
  };

  // Update progress whenever the component mounts or data changes
  useEffect(() => {
    setProgress(calculateProgress());
  }, [name, emailVerified, seek, configured, pseudo]);

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg w-full mx-auto font-coco">
      <h2 className="text-xl font-bold text-gray-800 mb-6 text-left">
        Weryfikacja przed wyświetlaniem na stronie
      </h2>

      {/* Progress Bar */}
      <div className="relative w-full h-6 bg-gray-300 rounded-full mb-6">
        <div
          className="h-full bg-gradient-to-r from-primary to-cta rounded-full transition-all duration-500 ease-in-out"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <p className="text-center text-sm text-gray-600 mb-4">
        {progress}% ukończono
      </p>

      {/* Steps List */}
      <div className="space-y-4">
        <StepItem
          step={3}
          title="Imię"
          isCompleted={!!name}
          completedText="Podane"
          incompleteText={`Imię/nazwisko lub nazwa firmy`}
        />
        <StepItem
          step={4}
          title="E-mail zweryfikowany"
          isCompleted={emailVerified}
          completedText="Zweryfikowany"
          incompleteText="Zweryfikuj adres e-mail"
        />
        <StepItem
          step={2}
          title="Jesteś klientem?"
          isCompleted={(seek === true || seek === false) && seek !== "ask"}
          completedText={seek ? "Klient" : "Talent"}
          incompleteText="Wybierz typ profilu"
        />
        <StepItem
          step={5}
          title="Nazwa profilu"
          isCompleted={!!pseudo}
          completedText="Tak"
          incompleteText="Ustaw unikalną nazwe profilu"
        />
        <StepItem
          step={1}
          title="Rozpocznij konfigurację"
          isCompleted={configured && seek !== "ask"}
          completedText="Rozpoczęto proces"
          incompleteText="Otwórz panel konfiguracji"
        />
      </div>
    </div>
  );
}

// Step Item Component for reusability and cleaner code
function StepItem({
  step,
  title,
  isCompleted,
  completedText,
  incompleteText,
}: {
  step: number;
  title: string;
  isCompleted: boolean;
  completedText: string;
  incompleteText: string;
}) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center">
        <div className="flex">
          {isCompleted ? (
            <IoCheckmarkCircle className="text-3xl aspect-square text-green-500 mr-2" />
          ) : (
            <IoCloseCircle className="text-3xl aspect-square  text-red-500 mr-2" />
          )}
        </div>
        <p className="text-sm sm:text-base font-coco font-medium text-gray-800">
          {title}
        </p>
      </div>
      <p className="text-sm text-gray-600 text-right">
        {isCompleted ? completedText : incompleteText}
      </p>
    </div>
  );
}
