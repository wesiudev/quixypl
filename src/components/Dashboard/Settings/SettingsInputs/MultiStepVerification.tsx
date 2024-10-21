import Link from "next/link";
import { useState, useEffect } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { IoCheckmarkCircle, IoCloseCircle } from "react-icons/io5";
import { updateUser } from "@/firebase"; // Assuming updateUser is imported from "@/firebase"
import Confetti from "react-confetti"; // Assuming react-confetti is installed
import { setUser } from "@/redux/slices/user";
import { useDispatch } from "react-redux";

// MultiStepVerification Component
export default function MultiStepVerification({
  name,
  emailVerified,
  seek,
  configured,
  pseudo,
  user,
  isAnimating,
  setIsAnimating,
}: {
  name: any;
  emailVerified: any;
  seek: any;
  configured: any;
  pseudo: any;
  user: any;
  isAnimating: any;
  setIsAnimating: any;
}) {
  const [progress, setProgress] = useState(0);

  const calculateProgress = () => {
    let completion = 0;
    if (name) completion += 20;
    if (emailVerified) completion += 20;
    if (pseudo) completion += 20;
    if (seek === true || seek === false) completion += 20;
    if (configured) completion += 20;
    return completion;
  };

  useEffect(() => {
    setProgress(calculateProgress());
  }, [name, emailVerified, seek, configured, pseudo]);
  const dispatch = useDispatch();
  const handleAccessClick = () => {
    updateUser(user?.uid, { access: true }); // Call the updateUser function
    setIsAnimating(true); // Show confetti
    setTimeout(() => {
      setIsAnimating(false);
      dispatch(setUser({ ...user, access: true }));
    }, 5000); // Hide confetti after 5 seconds
  };

  return (
    <div
      className={`${
        user?.access === true && "hidden"
      } p-6 bg-white shadow-lg rounded-lg w-full mx-auto font-coco`}
    >
      <h2 className="text-xl font-bold text-gray-800 mb-6 text-left">
        Weryfikacja przed wyświetlaniem na stronie
      </h2>

      <div className="relative w-full h-6 bg-gray-300 rounded-full mb-6">
        <div
          className="h-full bg-gradient-to-r from-primary to-cta rounded-full transition-all duration-500 ease-in-out"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <p className="text-center text-sm text-gray-600 mb-4">
        {progress}% ukończono
      </p>

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
          title="Typ profilu"
          isCompleted={(seek === true || seek === false) && seek !== "ask"}
          completedText={seek ? "Talent" : "Klient"}
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

      {progress === 100 && (
        <button
          onClick={handleAccessClick}
          className="mt-6 bg-blue-600 text-white py-2 px-4 rounded-lg font-bold"
        >
          Wpisz się!
        </button>
      )}
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
        {isCompleted ? (
          <IoCheckmarkCircle className="text-3xl aspect-square text-green-500 mr-2" />
        ) : (
          <IoCloseCircle className="text-3xl aspect-square text-red-500 mr-2" />
        )}
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
