import Link from "next/link";
import { useState } from "react";
import { polishToEnglish } from "../../../../../utils/polishToEnglish";

export default function CitiesPicker({
  source,
  handleReduxUserState,
  setChangesWereMade,
}: {
  source: any;
  handleReduxUserState: any;
  setChangesWereMade: any;
}) {
  const [cities, setCities] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  async function openCitySelector(province: any) {
    setLoading(true);
    if (province) {
      const response = await fetch(
        `${
          process.env.NEXT_PUBLIC_URL
        }/api/cities/getCityByProvince?province=${polishToEnglish(province)}`
      );
      const cities = await response.json();
      setCities(cities);
    }
    setLoading(false);
  }
  const [inputCity, setInputCity] = useState("");
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:mt-3">
      <div className="flex flex-col mt-3 sm:mt-0">
        <label className="font-bold text-black">Województwo</label>
        <select
          value={source?.region}
          onChange={(e) => {
            handleReduxUserState(e.target.value, "region");
            openCitySelector(e.target.value);
            setChangesWereMade(true);
          }}
          className="border border-primary  p-2 text-black  font-light"
        >
          <option value="">Wybierz</option>
          {[
            "Lubelskie",
            "Mazowieckie",
            "Podlaskie",
            "Świętokrzyskie",
            "Wielkopolskie",
            "Małopolskie",
            "Kujawsko-Pomorskie",
            "Łódzkie",
            "Śląskie",
            "Warmińsko-Mazurskie",
            "Pomorskie",
            "Podkarpackie",
            "Dolnośląskie",
            "Opolskie",
            "Zachodniopomorskie",
            "Lubuskie",
          ].map((region) => (
            <option key={region} value={region}>
              {region}
            </option>
          ))}
        </select>
      </div>
      {source?.region && (
        <div className="flex flex-col">
          <label className="text-black font-bold" htmlFor="cities">
            Miasto
          </label>
          <input
            disabled={loading}
            list="cities"
            className={` disabled:bg-primary/50 text-black disabled:cursor-not-allowed disabled:font-bold disabled:text-white border border-primary  p-2 font-light`}
            value={inputCity === "" ? source?.city : inputCity}
            onClick={() => {
              if (!cities.length && source?.region) {
                handleReduxUserState("", "city");
                openCitySelector(source?.region);
              }
            }}
            onChange={(e) => {
              const value = e.target.value;
              if (value === "") {
                handleReduxUserState("", "city");
                setInputCity("");
              } else if (cities.find((city: any) => city.Name === value)) {
                handleReduxUserState(value, "city");
                setInputCity(value);
                setChangesWereMade(true);
              } else {
                setInputCity(value);
              }
            }}
            placeholder={`${loading ? "Wczytywanie..." : "Wpisz miasto..."}`}
          />
          <datalist id="cities">
            {cities.map((city: any, i: number) => (
              <option key={i} value={city.Name} />
            ))}
          </datalist>
        </div>
      )}
    </div>
  );
}
