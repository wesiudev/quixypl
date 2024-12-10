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
  if (totalItems > itemsPerPage) {
    return (
      <div className="flex justify-center mt-6">
        <button
          onClick={handleShowMore}
          className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/80"
        >
          Wyświetl więcej
        </button>
      </div>
    );
  } else {
    return <div></div>;
  }
};

export default Pagination;
