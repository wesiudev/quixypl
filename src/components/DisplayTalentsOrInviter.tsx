import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FaPlusCircle } from "react-icons/fa";
import { TfiFlagAlt } from "react-icons/tfi";
import Pagination from "./pagination/Pagination";

export default function DisplayTalentsOrInviter({ data }: { data: any }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6); // Initially, 6 items per page
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleShowMore = () => {
    setItemsPerPage((prev) => prev + 6); // Load 6 more talents each time the button is clicked
  };
  return (
    <>
      <div
        className={`w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4`}
      >
        {/* Wyświetlenie dostępnych talentów */}
        {data.map((talent: any, i: number) => (
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
                  className="absolute inset-0 object-cover w-full h-full"
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
            <div className="px-2 sm:px-4 flex flex-col">
              <h2 className="sm:text-lg font-extrabold text-black">
                {talent?.name}
              </h2>
              <h3 className="text-xs sm:text-sm xl:text-base mt-0.5">
                <span
                  style={{ lineHeight: 1.8 }}
                  className="text-white bg-gradient-to-b from-primaryHoverStart to-primaryHoverEnd rounded-md px-2 py-1 w-max max-w-full"
                >
                  {talent?.title}
                </span>
              </h3>
              <h3 className="text-sm text-gray-700">{talent?.city}</h3>
            </div>
          </Link>
        ))}
        {/* Sekcja z wolnym miejscem */}

        <Link
          href="/register"
          className="flex items-center p-4 bg-gradient-to-b from-ctaStart to-ctaEnd rounded-lg shadow-md hover:shadow-lg transition duration-200 hover:scale-105"
        >
          <FaPlusCircle className="text-white text-5xl min-w-16 lg:min-w-20 h-16 lg:h-20" />
          <div className="px-4 text-white">
            <h2 className="text-lg font-extrabold">Wolne miejsce</h2>
            <p className="text-sm">
              Skonfiguruj profil na naszej platformie i wyświetlaj swoje usługi.
            </p>
          </div>
        </Link>
      </div>
      {data.length > 0 && (
        <div className="">
          <Pagination
            onShowMore={handleShowMore}
            totalItems={data?.length}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </>
  );
}
