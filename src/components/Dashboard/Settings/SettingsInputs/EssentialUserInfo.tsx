import { setUser } from "@/redux/slices/user";
import { useDispatch } from "react-redux";
import { polishToEnglish } from "../../../../../utils/polishToEnglish";
import { useState } from "react";
import { toast } from "react-toastify";
import { isPseudoAvailable } from "../../../../../utils/isPseudoAvailable";

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
  return (
    <div>
      <div className="w-full px-6 pt-6 text-black  font-light">
        Email: <strong>{source?.email}</strong>
      </div>
      {source?.seek !== "ask" && (
        <div className={`relative w-full bg-white px-4 sm:px-6`}>
          <div className="grid grid-cols-2 mt-6 gap-4">
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
                  !source?.seek && "Project Manager"
                }`}
              />
            </div>
          </div>

          {!source?.pseudo && (
            <>
              <div className="flex flex-col mt-2">
                <label className="text-lg text-black">
                  Unikalna nazwa konta
                </label>
                <div className="font-gotham font-light text-black">
                  {!localPseudo &&
                    "Unikalna nazwa konta jest warunkiem wyświetlania profilu w zakładce pracy zdalnej."}
                  {localPseudo && pseudoWasChanged && pseudoIsAvailable && (
                    <div className="">
                      To będzie Twój Unikalny Link w Quixy.pl, dzięki któremu
                      pracodawcy łączą się z talentami!{" "}
                      <strong className="text-primary">
                        quixy.pl/{source?.seek ? "talent" : "client"}/
                        {localPseudo}
                      </strong>
                    </div>
                  )}
                </div>
                {hasAnswer && !pseudoIsAvailable && (
                  <div className="mb-2 text-red-500 font-light font-gotham">
                    Pseudonim {localPseudo} jest zajęty...
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
                        className="disabled:cursor-not-allowed w-max rounded-md disabled:bg-[#126b91] disabled:duration-500 duration-100 px-2 py-1.5 bg-[#126b91] text-white font-gotham mt-2"
                      >
                        {!isLoading && "Sprawdź dostępność"}
                        {isLoading && "Sprawdzam..."}
                      </button>
                    )}
                  {pseudoWasChanged && pseudoIsAvailable && (
                    <div className="flex flex-col">
                      <div className="font-gotham font-bold text-green-500">
                        Pseudonim dostępny.
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
                        Zmien pseudonim
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </>
          )}

          <textarea
            value={source?.bio}
            onChange={(e) => {
              handleReduxUserState(e.target.value, "bio");
              setChangesWereMade(true);
            }}
            rows={4}
            maxLength={2000}
            className="border border-primary rounded-lg p-2 mt-3 w-full text-black  font-light"
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
