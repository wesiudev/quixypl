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
  const items = [
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
  return (
    <div className="flex flex-col w-full px-4 sm:px-6">
      <div className="mt-3 font-bold text-lg text-black ">Perspektywa</div>
      <p className="text-sm text-[green] mb-2">
        Ile czasu możesz poświęcać tygodniowo?
      </p>
      <div className="-ml-1 -mt-1 flex flex-wrap items-center w-full">
        {items.slice(0, expand ? items.length : 6).map((item) => (
          <button
            key={item}
            className={`duration-200 text-white px-3 py-2 ml-1 mt-1 rounded-md ${
              source?.preferences?.includes(item) ? "bg-[green]" : "bg-gray-400"
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
        {items.length > 6 && (
          <button
            className="bg-orange-500 text-white px-3 py-2 ml-1 mt-1 rounded-md"
            onClick={() => setExpand(!expand)}
          >
            {expand ? "Pokaż mniej" : "Pokaż więcej"}
          </button>
        )}
      </div>
    </div>
  );
}
