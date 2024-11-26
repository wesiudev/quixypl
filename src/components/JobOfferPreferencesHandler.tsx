import { setUser } from "@/redux/slices/user";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

export default function JobPreferencesHandler({
  addPreference,
  removePreference,
  source,
}: {
  addPreference: (item: string) => void;
  removePreference: (item: string) => void;
  source: { seek?: string; preferences: string[] };
}) {
  const [expand, setExpand] = useState(false);

  const itemsForTalent = [
    "1-9 Godzin tygodniowo",
    "20-29 Godzin tygodniowo",
    "30-39 Godzin tygodniowo",
    "powyżej 40 godzin tygodniowo",
    "Jednorazowe zlecenie",
    "Kontrakt",
    "UoP",
    "B2B",
    "Hybrydowo",
    "Zdalnie",
    "Na pełen etat",
    "Na pół etatu",
    "Umowa zlecenie",
    "Umowa o dzieło",
    "Staż",
    "Praktyki",
    "Praca tymczasowa",
    "Praca na zmianę",
    "Praca dorywcza",
    "Freelance",
    "Praca w weekendy",
    "Elastyczne godziny pracy",
    "Praca na wezwanie",
    "Praca sezonowa",
  ];

  // Render preference buttons
  const renderPreferences = (items: string[], limit: number) =>
    items.slice(0, expand ? items.length : limit).map((item) => (
      <button
        key={item}
        className={`font-coco duration-200 text-white px-1.5 py-1 ml-1 mt-1 text-sm  ${
          source?.preferences?.includes(item)
            ? "bg-gradient-to-r from-primary to-cta"
            : "bg-gradient-to-r from-gray-500 to-gray-500"
        }`}
        onClick={() => {
          handlePreferenceToggle(item);
        }}
      >
        {item}
      </button>
    ));

  const { user } = useSelector((state: any) => state.user);
  const dispatch = useDispatch();

  // Toggle preferences depending on seek status
  const handlePreferenceToggle = (item: string) => {
    // If user already has the item selected, remove it
    if (user?.preferences?.includes(item)) {
      dispatch(
        setUser({
          ...user,
          preferences: user?.preferences.filter((i: string) => i !== item),
        })
      );
      removePreference(item);
      return;
    }
    addPreference(item);
    dispatch(
      setUser({
        ...user,
        preferences: [...(user?.preferences || []), item],
      })
    );
  };

  return (
    <div className="flex flex-col w-full mb-6">
      <div className="mt-2 text-black font-extrabold">Rodzaj współpracy</div>
      <p className="text-sm text-black">
        Jaki rodzaj współpracy oferujesz? Możesz wybrać więcej niż jedną opcję.
      </p>
      <div className="-ml-1 flex flex-wrap items-center w-full">
        {renderPreferences(itemsForTalent, 6)}
        {itemsForTalent.length > 6 && (
          <button
            className="bg-[#126b91] text-white text-sm p-1 px-2 ml-1 mt-1 font-coco"
            onClick={() => setExpand(!expand)}
          >
            {expand ? "Pokaż mniej" : "Pokaż więcej"}
          </button>
        )}
      </div>
    </div>
  );
}
