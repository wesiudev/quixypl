import { setUser } from "@/redux/slices/user";
import { useDispatch } from "react-redux";
import { polishToEnglish } from "../../../../../utils/polishToEnglish";
import { useState } from "react";
import { toast } from "react-toastify";
import { isPseudoAvailable } from "../../../../../utils/isPseudoAvailable";
import CitiesPicker from "./CitiesPicker";
import Image from "next/image";
import { FaUser } from "react-icons/fa6";
import { v4 as uuid } from "uuid";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "@/firebase";
import UserSocialLinksAdder from "./UserSocialLinksAdder";
export default function EssentialUserInfo({
  source,
  setChangesWereMade,
}: {
  source: any;
  setChangesWereMade: any;
}) {
  const dispatch = useDispatch();
  function handleReduxUserState(value: any, key: string) {
    dispatch(setUser({ ...source, [key]: value }));
  }
  const [isLoading, setIsLoading] = useState(false);
  const [triesCount, setTriesCount] = useState(0);
  const [localPseudo, setLocalPseudo] = useState(source?.pseudo);
  const [pseudoWasChanged, setPseudoWasChanged] = useState(false);
  const [pseudoIsAvailable, setPseudoIsAvailable] = useState(false);
  const [hasAnswer, setHasAnswer] = useState(false);
  async function check() {
    setIsLoading(true),
      await isPseudoAvailable(localPseudo).then((res: any) => {
        if (res.error) {
          return toast.error("Wystąpił błąd, spróbuj ponownie później.");
        }
        setTriesCount(triesCount + 1);
        setPseudoIsAvailable(res.available);
        setIsLoading(false);
        setHasAnswer(true);
      });
    setPseudoWasChanged(true);
  }
  const [loading, setLoading] = useState(false);
  async function upload(file: any) {
    setLoading(true);

    const randId = uuid();
    const imageRef = ref(storage, randId);

    await uploadBytes(imageRef, file);
    const url = await getDownloadURL(imageRef);
    dispatch(
      setUser({
        ...source,
        photoURL: url,
      })
    );

    setLoading(false);
  }

  return (
    <div className="relative">
      <div className="flex flex-col lg:flex-row pt-4 sm:pt-6">
        <label
          htmlFor="uploader2"
          className="cursor-pointer pl-3 lg:pl-6 relative h-max group w-max mb-3 lg:mb-0"
        >
          {source?.photoURL && (
            <div className="bg-gradient-to-r from-primary to-cta p-1 rounded-t-xl">
              <div className="rounded-t-lg relative w-max group-hover:bg-gray-200 duration-150">
                <Image
                  src={source?.photoURL}
                  width={256}
                  height={256}
                  alt=""
                  className="p-1 rounded-t-lg mb-0 w-20 sm:w-40 bg-white group-hover:bg-gray-200"
                />
              </div>
            </div>
          )}
          {!source?.photoURL && (
            <div
              style={{ boxShadow: "0px 0px 5px black" }}
              className="bg-[#126b91] h-full rounded-t-xl aspect-square text-white flex items-center justify-center w-20 sm:w-40 relative duration-150"
            >
              <FaUser className="text-5xl" />
            </div>
          )}
          <div className="font-coco z-50 relative w-full text-center bg-gradient-to-r from-primary to-cta rounded-b-xl text-white py-1">
            Zmień
          </div>
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={(e: any) => {
            const file = e.target.files[0];
            if (!file) return;
            const validType = file.type.startsWith("image/");
            const validSize = file.size <= 5 * 1024 * 1024;

            if (!validType || !validSize) {
              toast.error(
                "Tylko zdjęcia o rozmiarze do 5MB są dozwolone (kwadratowe lub 16:9)",
                {
                  position: "top-center",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                }
              );
              return;
            }
            upload(file);
          }}
          id="uploader2"
          className="text-white hidden"
        />
        <div className="pl-3 lg:pl-6 grid lg:grid-cols-2 sm:gap-x-3 font-coco">
          <div className="flex flex-col lg:pt-0">
            <div className="text-white py-1 px-2 rounded-md bg-gradient-to-r from-primary to-cta w-max">
              Email
            </div>{" "}
            <strong className="text-black mt-2 text-sm sm:text-base">
              {source?.email}
            </strong>
          </div>
          {source?.pseudo && (
            <div className="flex flex-col lg:pt-0">
              <div className="text-white py-1 px-2 rounded-md bg-gradient-to-r from-primary to-cta w-max mt-2 lg:mt-0">
                Unikalna nazwa
              </div>{" "}
              <strong className="text-black mt-2 text-sm sm:text-base">
                {source?.pseudo}
              </strong>
            </div>
          )}
          {source?.region && (
            <div className="flex flex-col lg:pt-0">
              <div className="text-white py-1 px-2 rounded-md bg-gradient-to-r from-primary to-cta w-max mt-2 lg:mt-0">
                Województwo
              </div>{" "}
              <strong className="text-black mt-2 text-sm sm:text-base">
                {source?.region}
              </strong>
            </div>
          )}
          {source?.city && (
            <div className="flex flex-col lg:pt-0">
              <div className="text-white py-1 px-2 rounded-md bg-gradient-to-r from-primary to-cta w-max mt-2 lg:mt-0">
                Miasto
              </div>{" "}
              <strong className="text-black mt-2 text-sm sm:text-base">
                {source?.city}
              </strong>
            </div>
          )}
        </div>
      </div>
      {source?.seek !== "ask" && (
        <div className={`relative w-full bg-white px-4 sm:px-6 font-coco`}>
          <div className="mt-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="flex flex-col">
                <label className="text-lg text-black">
                  {source?.seek && "Imię"}
                  {!source?.seek && "Nazwa Firmy"}
                </label>
                <input
                  type="text"
                  value={source?.name}
                  onChange={(e) => {
                    handleReduxUserState(e.target.value, "name");
                    setChangesWereMade(true);
                  }}
                  className="border border-primary rounded-md p-2 text-black  font-light"
                  placeholder="Imię lub imię i nazwisko"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-lg text-black">Tytuł</label>
                <input
                  type="text"
                  value={source?.title}
                  onChange={(e) => {
                    handleReduxUserState(e.target.value, "title");
                    setChangesWereMade(true);
                  }}
                  className="border border-primary rounded-md p-2 text-black  font-light"
                  placeholder={`np. ${source?.seek ? "Młodszy Księgowy" : ""}${
                    !source?.seek ? "Project Manager" : ""
                  }`}
                />
              </div>
            </div>
            <CitiesPicker
              source={source}
              setChangesWereMade={setChangesWereMade}
              handleReduxUserState={handleReduxUserState}
            />
          </div>
          {/* <UserSocialLinksAdder
            source={source}
            setChangesWereMade={setChangesWereMade}
            handleReduxUserState={handleReduxUserState}
          /> */}
          {!source?.pseudo && (
            <>
              <div className="flex flex-col mt-2">
                <label className="text-lg text-black">Unikalna nazwa</label>
                <div className="font-gotham font-light text-black">
                  {!localPseudo &&
                    "Wartość ta pozwala na wyświetlanie profilu w zakładce pracy zdalnej."}
                  {localPseudo && pseudoWasChanged && pseudoIsAvailable && (
                    <div className="">
                      To będzie Twój Unikalny Link w Quixy.pl, dzięki któremu
                      pracodawcy łączą się z talentami!{" "}
                      <strong className="text-primary">
                        quixy.pl/{source?.seek ? "talent" : "company"}/
                        {localPseudo}
                      </strong>
                    </div>
                  )}
                </div>
                {hasAnswer && !pseudoIsAvailable && (
                  <div className="mb-2 text-red-500 font-light font-gotham">
                    Nazwa {localPseudo} jest zajęta...
                  </div>
                )}
                <input
                  type="text"
                  value={localPseudo}
                  onChange={(e) => {
                    setLocalPseudo(polishToEnglish(e.target.value));
                    setPseudoWasChanged(true);
                    setHasAnswer(false);
                    setPseudoIsAvailable(false);
                  }}
                  className={`border ${
                    hasAnswer &&
                    !pseudoIsAvailable &&
                    "bg-red-500 text-white !font-bold"
                  } border-primary rounded-md p-2 text-black font-light`}
                  placeholder="np. jan345"
                />
                <div className="grid grid-cols-2 gap-3">
                  {pseudoWasChanged &&
                    !pseudoIsAvailable &&
                    localPseudo?.length > 0 && (
                      <button
                        onClick={check}
                        disabled={isLoading}
                        className="bg-gradient-to-r from-primary to-cta disabled:cursor-not-allowed w-max rounded-md disabled:bg-[#126b91] disabled:duration-500 duration-100 px-2 py-1.5 bg-[#126b91] text-white font-gotham mt-2"
                      >
                        {!isLoading && "Sprawdź dostępność"}
                        {isLoading && "Sprawdzam..."}
                      </button>
                    )}
                  {pseudoWasChanged && pseudoIsAvailable && (
                    <div className="flex flex-col">
                      <div className="font-gotham font-bold text-green-500">
                        Nazwa dostępna
                      </div>
                      <button
                        disabled={
                          isLoading ||
                          !pseudoIsAvailable ||
                          localPseudo === "" ||
                          !pseudoWasChanged
                        }
                        onClick={() => {
                          setChangesWereMade(true);
                          handleReduxUserState(localPseudo, "pseudo");
                          setPseudoIsAvailable(false);
                          setLocalPseudo("");
                          setHasAnswer(false);
                          setPseudoWasChanged(false);
                        }}
                        className="disabled:cursor-not-allowed disabled:bg-[#126b91] disabled:duration-500 duration-100 px-2 py-1.5 bg-green-500 text-white font-gotham mt-2"
                      >
                        Zmien nazwę
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
          {source?.seek && source?.seek !== "ask" && (
            <div className="w-full mt-3">
              <div className="flex flex-col">
                <label
                  htmlFor="hourRate"
                  className="text-black text-lg font-coco"
                >
                  Stawka godzinowa
                </label>
                <div className="grid grid-cols-2">
                  <div className="relative w-full">
                    <input
                      onClick={() => console.log(source?.hourRate)}
                      id="hourRate"
                      className="w-full border border-primary rounded-md p-2 text-black font-light"
                      placeholder={`np. ${source?.seek ? "100" : ""}`}
                      type="text"
                      value={source?.hourRate}
                      onChange={(e) => {
                        const value = e.target.value;

                        // Allow only numbers
                        if (/^\d*$/.test(value)) {
                          setChangesWereMade(true);
                          handleReduxUserState(e.target.value, "hourRate");
                        }
                      }}
                    />
                    <div className="flex items-center justify-center absolute right-0 top-0 h-full bg-gradient-to-r from-primary to-cta text-white font-coco px-3 rounded-r-md">
                      zł/h
                    </div>
                  </div>
                  <div className=""></div>
                </div>
              </div>
            </div>
          )}
          <textarea
            value={source?.bio}
            onChange={(e) => {
              handleReduxUserState(e.target.value, "bio");
              setChangesWereMade(true);
            }}
            rows={4}
            maxLength={2000}
            className="border border-primary rounded-lg p-2 mt-3 w-full text-black"
            placeholder={
              source?.seek
                ? "Jakie usługi wykonujesz? Opisz szczegółowo to, co możesz zeoferować w zespole lub dla klienta."
                : "Czym zajmuje się Twoja firma? Jesteś klientem indywidualnym? - Krótko opisz swoją działalność."
            }
          />
        </div>
      )}
    </div>
  );
}
