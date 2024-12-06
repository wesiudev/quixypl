import { useState, useEffect } from "react";
import { IoCheckmarkCircle, IoCloseCircle } from "react-icons/io5";
import { updateUser } from "@/firebase"; // Assuming updateUser is imported from "@/firebase"
import Confetti from "react-confetti"; // Assuming react-confetti is installed
import { setUser } from "@/redux/slices/user";
import { useDispatch, useSelector } from "react-redux";
import { set_modals } from "@/redux/slices/modalsopen";

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
  const { modals } = useSelector((state: any) => state.modals);
  return (
    <div className={`bg-white w-full mb-6`}>
      {isAnimating && (
        <div className="z-50 w-full h-screen fixed left-0 top-0">
          <Confetti />
        </div>
      )}
      <div
        className={`${
          user?.access === true && "hidden"
        } bg-gradient-to-r from-primary/20 to-cta/20 p-3 rounded-xl mt-1`}
      >
        <h2 className="font-extrabold text-2xl text-black">
          Ukończ konfigurację konta
        </h2>
        <p className="text-black">
          Po pomyślnej weryfikacji Twoje konto zostanie wyświetlone w
          odpowiednich kategoriach.
        </p>
        <button
          onClick={() => dispatch(set_modals({ ...modals, config: true }))}
          className="w-full text-center text-xl text-white bg-cta px-2 py-1 mt-3 rounded-xl"
        >
          Uruchom ustawienia
        </button>

        <div className="space-y-3 p-3 lg:p-6">
          <StepItem
            step={2}
            title="Rodzaj profilu"
            isCompleted={(seek === true || seek === false) && seek !== "ask"}
            completedText={seek ? "Talent" : "Klient"}
            incompleteText="Wybierz typ profilu"
          />
          <StepItem
            step={1}
            title="Konfiguracja"
            isCompleted={configured && seek !== "ask"}
            completedText="Proces rozpoczęty"
            incompleteText="Rozpocznij konfigurację"
          />
          <StepItem
            step={4}
            title="E-mail"
            isCompleted={emailVerified}
            completedText="Pomyślnie ukończono"
            incompleteText="Zweryfikuj E-mail"
          />
          <StepItem
            step={5}
            title="Nazwa profilu"
            isCompleted={pseudo}
            completedText={pseudo}
            incompleteText="Ustaw unikalną nazwę"
          />
          <StepItem
            step={3}
            title="Przedstaw się"
            isCompleted={name}
            completedText="Pomyślnie ukończono"
            incompleteText={`Imię/nazwisko lub nazwa firmy`}
          />
        </div>
        <div className="p-3 bg-gradient-to-r from-cta/50 to-primary/50 rounded-xl mt-3">
          <p className="text-sm text-center text-white bg-gradient-to-r from-primary to-cta rounded-lg mb-3 p-1.5">
            Uzupełnij swój profil, aby rozpocząć pozyskiwanie klientów lub
            poszukiwanie pracy.
          </p>
          <div className="relative w-full h-6 bg-white rounded-full mb-3">
            <div
              className="h-full bg-gradient-to-r from-primary to-cta rounded-full transition-all duration-500 ease-in-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className="text-center text-sm text-white rounded-xl px-2 mx-auto w-max bg-gradient-to-r from-primary to-cta">
            {progress}% ukończono
          </p>
        </div>
        {progress === 100 && (
          <button
            onClick={handleAccessClick}
            className="mt-6 bg-gradient-to-r from-primary to-cta text-white py-2 px-4 rounded-lg font-coco font-bold"
          >
            Wpisz się! (0.00💎)
          </button>
        )}
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
