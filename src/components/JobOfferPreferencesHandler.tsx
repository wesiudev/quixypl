"use client";
import { useState } from "react";

export default function JobPreferencesHandler({
  addPreference,
  removePreference,
  formData,
  setFormData,
}: {
  addPreference: any;
  removePreference: any;
  formData: any;
  setFormData: any;
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
          formData?.preferences?.includes(item) ? "bg-cta" : "bg-gray-400"
        }`}
        onClick={() => {
          formData?.preferences?.includes(item)
            ? removePreference(item)
            : addPreference(item);
        }}
      >
        {item}
      </button>
    ));

  // Toggle preferences depending on seek status
  const handlePreferenceToggle = (item: string) => {
    // If user already has the item selected, remove it
    if (formData?.preferences?.includes(item)) {
      removePreference(item);
    } else {
      addPreference(item);
    }
  };

  return (
    <div className="flex flex-col w-full mb-6">
      <div className="mt-3 text-lg text-black font-extrabold">
        Rodzaj współpracy
      </div>
      <p className="font-coco text-black mb-2">
        Jaki rodzaj współpracy oferujesz? Możesz wybrać więcej niż jedną opcję.
      </p>
      <div className="-ml-1 -mt-1 flex flex-wrap items-center w-full">
        {renderPreferences(itemsForTalent, 6)}
        {itemsForTalent.length > 6 && (
          <button
            className="bg-[#126b91] text-white text-sm p-1 px-2 ml-1 mt-1 "
            onClick={() => setExpand(!expand)}
          >
            {expand ? "Pokaż mniej" : "Pokaż więcej"}
          </button>
        )}
      </div>
    </div>
  );
}
