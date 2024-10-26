"use client";
import React from "react";

interface PaginationProps {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  onShowMore: () => void; // Add a function to handle "pokaż więcej talentów"
}

const Pagination: React.FC<PaginationProps> = ({
  totalItems,
  itemsPerPage,
  currentPage,
  onPageChange,
  onShowMore,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Function to handle "Pokaż więcej talentów"
  const handleShowMore = () => {
    onShowMore();
  };

  // Hide pagination if items > 6 and show "pokaż więcej talentów" button
  if (totalItems > 6) {
    return (
      <div className="flex justify-center mt-6">
        <button
          onClick={handleShowMore}
          className="px-4 py-2 bg-[#126b91] text-white rounded"
        >
          Pokaż więcej talentów
        </button>
      </div>
    );
  }

  // Render pagination only if totalItems <= 6
  const renderPageNumbers = () => {
    const pages = [];

    // Always show all pages if totalItems <= 6
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => onPageChange(i)}
          className={`px-4 py-2 ${
            currentPage === i ? "bg-[#126b91] text-white" : "bg-gray-200"
          }`}
        >
          {i}
        </button>
      );
    }

    return pages;
  };

  return (
    <div className="flex justify-center space-x-2 mt-6">
      {/* Previous button */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-4 py-2 ${
          currentPage === 1 ? "bg-gray-300 cursor-not-allowed" : "bg-gray-200"
        }`}
      >
        {"<"}
      </button>

      {/* Page numbers */}
      {renderPageNumbers()}

      {/* Next button */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`px-4 py-2 ${
          currentPage === totalPages
            ? "bg-gray-300 cursor-not-allowed"
            : "bg-gray-200"
        }`}
      >
        {">"}
      </button>
    </div>
  );
};

export default Pagination;
