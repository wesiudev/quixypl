import Image from "next/image";
import Link from "next/link";
import { FaPlusCircle } from "react-icons/fa";
import { TfiFlagAlt } from "react-icons/tfi";

export default function DisplayTalentsOrInviter({ data }: { data: any }) {
  return (
    <div
      className={`${
        data.length > 0
          ? "w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
          : "flex flex-col items-center justify-center"
      }`}
    >
      {/* Wyświetlenie dostępnych talentów */}
      {data.length > 0 ? (
        data.map((talent: any, i: number) => (
          <Link
            key={talent?.pseudo || i}
            href={`/talent/${talent.pseudo}`}
            className="flex items-center p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition duration-200 hover:scale-[1.03]"
          >
            {/* Zdjęcie lub inicjały */}
            {talent?.photoURL ? (
              <div className="relative min-w-16 lg:min-w-20 h-16 lg:h-20 aspect-square rounded-full overflow-hidden shadow">
                <Image
                  src={talent.photoURL}
                  width={224}
                  height={224}
                  alt={`Zdjęcie talentu ${talent?.name || talent?.pseudo}`}
                  className="absolute inset-0 object-cover duration-500"
                />
              </div>
            ) : (
              <span className="min-w-16 lg:min-w-20 h-16 lg:h-20 aspect-square rounded-full flex items-center justify-center text-4xl font-extrabold text-primary bg-gray-100 shadow">
                {talent?.name
                  ? talent.name[0]?.toUpperCase()
                  : talent?.pseudo[0]?.toUpperCase()}
              </span>
            )}

            {/* Informacje o talencie */}
            <div className="px-4 flex flex-col">
              <h2 className="text-lg font-extrabold text-black">
                {talent?.name}
              </h2>
              <h3 className="text-sm xl:text-base">
                <span
                  style={{ lineHeight: 1.8 }}
                  className="text-white bg-gradient-to-r from-primary to-cta rounded-md px-2 py-1 w-max max-w-full"
                >
                  {talent?.title}
                </span>
              </h3>
              <h3 className="text-sm text-gray-700">{talent?.city}</h3>
            </div>
          </Link>
        ))
      ) : (
        /* Gdy brak danych */
        <div className="flex flex-col items-center justify-center text-center my-6">
          <div className="bg-gradient-to-r from-primary to-cta rounded-full w-32 h-32 flex items-center justify-center">
            <TfiFlagAlt className="text-white text-4xl" />
          </div>
          <p className="mt-4 max-w-md text-gray-700">
            Brak specjalistów - skonfiguruj profil i wyświetl się jako
            pierwszy/a.
          </p>
          <Link
            href="/register"
            className="mt-4 text-sm bg-cta font-bold text-white px-4 py-2 rounded-md shadow-md transition duration-200 hover:bg-opacity-80 focus:ring focus:ring-cta/50"
          >
            Przejdź do panelu
          </Link>
        </div>
      )}

      {/* Sekcja z wolnym miejscem */}
      {data.length > 0 && (
        <Link
          href="/register"
          className="flex items-center p-4 bg-gradient-to-r from-primary to-cta rounded-lg shadow-md hover:shadow-lg transition duration-200 hover:scale-[1.03]"
        >
          <FaPlusCircle className="text-white text-5xl w-16 h-16" />
          <div className="px-4 text-white">
            <h2 className="text-lg font-extrabold">Wolne miejsce</h2>
            <p className="text-sm">
              Skonfiguruj profil na naszej platformie i wyświetlaj swoje usługi.
            </p>
          </div>
        </Link>
      )}
    </div>
  );
}
