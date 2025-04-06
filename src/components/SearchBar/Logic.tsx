/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { createLinkFromText } from "@/utils/createLinkFromText";
import { getCityQuery } from "@/utils/getCityQuery";
import { HomeMapInput } from "../HomeMapInput";
import { useMapConsts } from "@/utils/useMapConsts";
import PlaceDetails from "../PlaceDetails";
import Image from "next/image";

interface City {
  name: string;
  id: string;
}

export default function Logic({ slugCity }: { slugCity?: string }) {
  const pathname = usePathname();
  const [results, setResults] = useState([]);
  const [city, setCity] = useState<City>({
    name: "",
    id: "",
  });
  const [locationDetails, setLocationDetails] = useState({
    lng: 0,
    lat: 0,
    place: "",
  });
  const { isLoaded, loadError } = useMapConsts();
  const [isMapOpen, setMapOpen] = useState(false);
  const [currentCitiesArray, setCurrentCitiesArray] = useState<City[]>([]);
  const router = useRouter();
  // Debounce state updates
  const [debouncedCityName, setDebouncedCityName] = useState<string>(city.name);
  // Fetch cities
  const fetchCities = async (query: string) => {
    try {
      const cityLink = createLinkFromText(query);
      const data = await getCityQuery(cityLink);

      if (data.length > 0 && data[0].name === city.name) {
        setCity({
          name: data[0].name,
          id: data[0].id,
        });
      }
      setCurrentCitiesArray(data);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error.name !== "AbortError") {
        console.error("Error fetching cities:", error);
      }
    }
  };

  // Handle debounce logic
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedCityName(city.name), 300);
    return () => clearTimeout(handler);
  }, [city.name]);

  // Fetch cities when debouncedCityName changes
  useEffect(() => {
    if (!debouncedCityName) return;

    if (city.name.length > 2) {
      fetchCities(debouncedCityName);
    }
  }, [debouncedCityName]);

  const handleSearch = () => {
    if (city.name.trim().length > 0) {
      const searchParams = new URLSearchParams(window.location.search);
      searchParams.set("search", createLinkFromText(city.name));

      router.push(`${pathname}?${searchParams.toString()}`);
    } else {
      toast.error("Podaj miasto");
    }
  };
  const [openedResult, setOpenedResult] = useState<any>(null);
  return (
    <div className="flex flex-col mt-3 w-full relative">
      <div
        onClick={() => {
          setResults([]);
          setOpenedResult(null);
        }}
        className={`${
          results.length > 0 ? "block" : "hidden"
        } z-[125] h-screen w-screen flex justify-center fixed top-0 left-0 bg-black/50 overflow-y-scroll`}
      >
        <div className="relative bg-white rounded-xl p-3 w-full h-max">
          <ul
            onClick={(e) => e.stopPropagation()}
            className={`flex flex-col w-full ${
              !openedResult ? "-translate-x-0" : "-translate-x-[100vw]"
            } duration-500`}
          >
            {results?.map((place: any) => (
              <li key={place.place_id}>
                {place.photos && (
                  <PlaceDetails
                    place={place}
                    setOpenedResult={setOpenedResult}
                  />
                )}
              </li>
            ))}
          </ul>
          <div
            onClick={(e) => e.stopPropagation()}
            className={`flex flex-col items-start text-left overflow-y-scroll fixed left-0 top-0 h-screen w-screen ${
              !openedResult ? "translate-x-[100vw]" : "translate-x-0"
            } duration-500`}
          >
            <button
              onClick={() => setOpenedResult(null)}
              className="text-black text-4xl"
            >
              Powrót
            </button>

            <div className="text-left flex flex-col items-start p-1.5">
              <h3 className="text-xl font-semibold text-gray-800">
                {openedResult?.name}
              </h3>

              {openedResult?.rating && (
                <p className="text-gray-600">⭐ {openedResult?.rating} / 5</p>
              )}
              <p>{openedResult?.formatted_address}</p>
            </div>
            <div className="text-center">
              <a
                href={openedResult?.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-lg font-medium text-pink-600 hover:underline"
              >
                {openedResult?.website}
              </a>
            </div>
            <button onClick={() => console.log(openedResult)} className="">
              xxx
            </button>
            <div className="text-center">
              <a
                href={openedResult?.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-gray-500 hover:text-gray-700"
              >
                Jak dojechać?
              </a>
            </div>

            <div className="text-lg font-semibold text-gray-700">
              {openedResult?.phoneNumber}
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 w-full">
              {openedResult?.photos?.map((photo: any, i: any) => (
                <div
                  key={i}
                  className="rounded-xl overflow-hidden shadow-sm aspect-square"
                >
                  <Image
                    src={photo}
                    width={400}
                    height={400}
                    alt={`Salon photo ${i + 1}`}
                    className="object-cover w-full h-full"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center">
        <div className="relative h-max flex flex-row items-center">
          <div className="p-2 absolute left-0 z-[100] top-0 h-12 aspect-square rounded-l-lg bg-[#CFACAC]">
            <div className="bg-search bg-contain h-full bg-no-repeat" />
          </div>
          <input
            type="text"
            name="city"
            value={city.name}
            onChange={(e) => setCity({ ...city, name: e.target.value })}
            placeholder={slugCity || "Miasto"}
            className="pl-16 rounded-md md:min-w-[350px] max-w-[450px] bg-[#8F5B6A] placeholder:text-white z-[91] block px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
            autoComplete="off"
            list="no-autocomplete"
          />
        </div>

        <div className="space-x-3 flex items-center justify-center w-full">
          <button
            type="button"
            className="block mt-3 font-archivo z-[50] w-max max-w-full px-4 md:px-8 py-1.5 rounded-lg text-lg bg-[#CFACAC] text-white hover:bg-[#CFACAC]/80 disabled:bg-gray-300"
            onClick={() => setMapOpen(true)}
          >
            UŻYJ MAPY
          </button>
          <button
            type="button"
            className="block mt-3 font-archivo z-[50] w-max max-w-full px-4 md:px-8 py-1.5 rounded-lg text-lg bg-[#CFACAC] text-white hover:bg-[#CFACAC]/80 disabled:bg-gray-300"
            onClick={handleSearch}
          >
            SZUKAJ
          </button>
        </div>
      </div>
      {isMapOpen && (
        <div className="z-[60] absolute w-[100%] sm:w-[150%] overflow-y-auto left-1/2 -translate-x-1/2 top-[60px]">
          <HomeMapInput
            locationDetails={locationDetails}
            setLocationDetails={setLocationDetails}
            data={city}
            loadError={loadError}
            isLoaded={isLoaded}
            setData={setCity}
            setResults={setResults}
          />
        </div>
      )}

      {isMapOpen && (
        <div
          className="fixed bg-black/50 top-0 left-0 w-full h-full"
          onClick={() => setMapOpen(false)}
        ></div>
      )}
      {city.name !== currentCitiesArray[0]?.name &&
        currentCitiesArray.length > 0 && (
          <div
            className="fixed bg-black/50 top-0 left-0 w-full h-full"
            onClick={() => setCurrentCitiesArray([])}
          ></div>
        )}
      {city.name !== currentCitiesArray[0]?.name &&
        currentCitiesArray.length > 0 && (
          <ul className="z-[60] absolute w-full max-h-[300px] overflow-y-auto top-[60px]">
            {currentCitiesArray.map((c, index) => (
              <li
                key={index}
                className={`${
                  index % 2 === 0 ? "bg-slate-300" : "bg-slate-200"
                } px-4 py-2 hover:bg-blue-400 hover:text-white cursor-pointer`}
                onClick={() => {
                  setCity({ ...city, name: c.name, id: c.id });
                  setCurrentCitiesArray([]);
                }}
              >
                {c.name}
              </li>
            ))}
          </ul>
        )}
    </div>
  );
}
