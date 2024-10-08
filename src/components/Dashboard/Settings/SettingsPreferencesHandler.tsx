"use client";

import { useState } from "react";

export default function PreferencesHandler({
  addPreference,
  removePreference,
  source,
}: {
  addPreference: any;
  removePreference: any;
  source: any;
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
  return (
    <div className="flex flex-col w-full px-4 sm:px-6">
      <div className="mt-3 font-bold text-3xl lg:text-5xl text-black">
        {source?.seek && source?.seek !== "ask" && "Czas pracy"}
        {!source?.seek && source?.seek !== "ask" && "Liczba pracowników"}
      </div>
      <p className="text-sm text-black mb-2 mt-4">
        {source?.seek &&
          source?.seek !== "ask" &&
          "Ile czasu możesz poświęcać tygodniowo?"}
        {!source?.seek &&
          source?.seek !== "ask" &&
          "Podaj przyblżoną liczbę pracowników."}
      </p>
      <div className="-ml-1 -mt-1 flex flex-wrap items-center w-full">
        {source?.seek &&
          source?.seek !== "ask" &&
          itemsForTalent
            .slice(0, expand ? itemsForTalent.length : 6)
            .map((item) => (
              <button
                key={item}
                className={`duration-200 text-white px-3 py-2 ml-1 mt-1 rounded-md ${
                  source?.preferences?.includes(item) ? "bg-cta" : "bg-gray-400"
                }`}
                onClick={() => {
                  if (source?.preferences?.includes(item)) {
                    removePreference(item);
                  } else {
                    addPreference(item);
                  }
                }}
              >
                {item}
              </button>
            ))}
        {!source?.seek &&
          source?.seek !== "ask" &&
          companySize.slice(0, expand ? companySize.length : 6).map((item) => (
            <button
              key={item}
              className={`duration-200 text-white px-3 py-2 ml-1 mt-1 rounded-md ${
                source?.preferences?.includes(item) ? "bg-cta" : "bg-gray-400"
              }`}
              onClick={() => {
                if (
                  !source?.preferences?.includes(item) &&
                  source?.preferences?.length === 0
                ) {
                  addPreference(item);
                } else {
                  removePreference(source?.preferences[0]);
                }
              }}
            >
              {item}
            </button>
          ))}
        {!source?.seek && source?.seek !== "ask" && companySize.length > 6 && (
          <button
            className="bg-[#126b91] text-white px-3 py-2 ml-1 mt-1 rounded-md"
            onClick={() => setExpand(!expand)}
          >
            {expand ? "Pokaż mniej" : "Pokaż więcej"}
          </button>
        )}
      </div>
    </div>
  );
}
