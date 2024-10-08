import { setUser } from "@/redux/slices/user";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

export default function PreferencesHandler({
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

  const companySize = [
    "1-10 pracowników",
    "11-50 pracowników",
    "51-200 pracowników",
    "201-500 pracowników",
    "501-1000 pracowników",
    "1001-5000 pracowników",
    "5001-10,000 pracowników",
    "10,001+ pracowników",
  ];

  // Render preference buttons
  const renderPreferences = (items: string[], limit: number) =>
    items.slice(0, expand ? items.length : limit).map((item) => (
      <button
        key={item}
        className={`duration-200 text-white px-1.5 py-1 ml-1 mt-1 text-sm rounded-md ${
          source?.preferences?.includes(item) ? "bg-cta" : "bg-gray-400"
        }`}
        onClick={() => handlePreferenceToggle(item)}
      >
        {item}
      </button>
    ));
  const { user } = useSelector((state: any) => state.user);
  const dispatch = useDispatch();
  // Toggle preferences depending on whether it's seek or company size
  const handlePreferenceToggle = (item: string) => {
    if (user?.preferences?.includes(item) || user?.preferences?.length > 0) {
      dispatch(
        setUser({
          ...user,
          preferences: user?.preferences.filter((i: any) => i !== item),
        })
      );
      return;
    }
    if (!user?.seek && user?.seek !== "ask") {
      // Multiple preferences allowed for talent items
      addPreference(item);
    } else if (!user?.seek && user?.seek !== "ask") {
      // Only one company size allowed, so replace existing preference
      if (user?.preferences?.length > 0) {
        return toast.error("Już podano ilość pracowników");
      }
      addPreference(item);
    }
  };

  // Determine the title and description based on source.seek
  const getTitleAndDescription = () => {
    if (source?.seek && source?.seek !== "ask") {
      return {
        title: "Czas pracy",
        description: "Ile czasu możesz poświęcać tygodniowo?",
      };
    } else {
      return {
        title: "Liczba pracowników",
        description: "Podaj przybliżoną liczbę pracowników.",
      };
    }
  };

  const { title, description } = getTitleAndDescription();

  return (
    <div className="flex flex-col w-full px-4 sm:px-6">
      <div className="mt-3 font-bold text-3xl lg:text-5xl text-black">
        {title}
      </div>
      <p className="text-sm text-black mb-2 mt-4">{description}</p>
      <div className="-ml-1 -mt-1 flex flex-wrap items-center w-full">
        {source?.seek && source?.seek !== "ask"
          ? renderPreferences(itemsForTalent, 6)
          : renderPreferences(companySize, 6)}

        {/* Show expand/collapse button if more than 6 options */}
        {(source?.seek && itemsForTalent.length > 6) ||
        (!source?.seek && companySize.length > 6) ? (
          <button
            className="bg-[#126b91] text-white text-sm sm:text-base p-1 ml-1 mt-1 rounded-md"
            onClick={() => setExpand(!expand)}
          >
            {expand ? "Pokaż mniej" : "Pokaż więcej"}
          </button>
        ) : null}
      </div>
    </div>
  );
}
