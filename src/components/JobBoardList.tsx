"use client";
import React, { useState } from "react";
import Pagination from "./pagination/Pagination";
import DisplayTalentsOrInviter from "./DisplayTalentsOrInviter";
import DisplayCompaniesOrInviter from "./DisplayCompaniesOrInviter";

export default function JobBoardList({
  talents,
  companies,
  content,
}: {
  talents: any;
  companies: any;
  content: any;
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6); // Initially, 6 items per page
  const [searchType, setSearchType] = useState("talents");
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleShowMore = () => {
    setItemsPerPage((prev) => prev + 6); // Load 6 more talents each time the button is clicked
  };

  const indexOfLastIdea = currentPage * itemsPerPage;
  return (
    <div className="">
      <h2
        style={{ lineHeight: 1.5 }}
        className="text-white font-extrabold text-xl lg:text-3xl"
      >
        {content?.informal_title_plural}{" "}
      </h2>{" "}
      <p className="mb-4 text-white">Czego szukasz tym razem?</p>
      <div className="mx-auto font-gotham rounded-xl">
        <div className="flex items-center flex-wrap gap-3">
          <button
            onClick={() => setSearchType("talents")}
            className={`${
              searchType === "talents"
                ? "shadow-cta shadow-md"
                : "hover:shadow-cta hover:shadow-md"
            } text-black flex items-center gap-2 p-2 rounded-md border border-gray-500/30 duration-200 hover:scale-[1.03] bg-white`}
          >
            Freelancerzy
          </button>
          <button
            onClick={() => setSearchType("companies")}
            className={`${
              searchType === "companies"
                ? "shadow-cta shadow-md"
                : "hover:shadow-cta hover:shadow-md"
            } text-black flex items-center gap-2 p-2 rounded-md border border-gray-500/30 duration-200 hover:scale-[1.03] bg-white`}
          >
            Firmy
          </button>
        </div>
        {searchType === "talents" && <DisplayTalentsOrInviter data={talents} />}
        {searchType === "companies" && (
          <DisplayCompaniesOrInviter data={companies} />
        )}

        {/* Render Pagination Component */}
        {talents.length > 0 && (
          <Pagination
            onShowMore={handleShowMore}
            totalItems={talents?.length}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        )}
      </div>
    </div>
  );
}
