"use client";
import React, { useState } from "react";
import Link from "next/link";
import Pagination from "./pagination/Pagination";
import { polishToEnglish } from "../../utils/polishToEnglish";

interface Idea {
  name: string;
  creationTime: string;
}

interface IdeasProps {
  ideas: Idea[];
}

const IdeaListSlug: React.FC<IdeasProps> = ({ ideas }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; // Customize this value as needed

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const indexOfLastIdea = currentPage * itemsPerPage;
  const indexOfFirstIdea = indexOfLastIdea - itemsPerPage;
  const currentIdeas = ideas.slice(indexOfFirstIdea, indexOfLastIdea);

  return (
    <div
      style={{ boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px" }}
      className="py-12 px-6 mt-24 mx-auto font-gotham rounded-xl mb-12 lg:mb-24"
    >
      <h2 className="text-3xl max-w-2xl text-black">
        Zobacz wszystkie pomysły wygenerowane przez użytkowników Quixy&trade;!
      </h2>
      <p className="text-black max-w-2xl mt-6 mb-3">
        Przejrzyj listę pomysłów i dołącz do grupy, lub utwórz swój pomysł i
        niech inni dołączą do Ciebie!
      </p>
      <h3 className="text-primary">Zobacz listę pomysłów:</h3>
      <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {currentIdeas.map((idea: Idea, i: number) => (
          <Link
            key={i}
            href={`/business-ideas/${polishToEnglish(
              idea?.name
            )}${idea?.creationTime?.toString()}`}
            className="text-black flex flex-col justify-between p-6 border rounded-lg shadow-sm hover:shadow-lg hover:border-primary hover:shadow-primary hover:scale-105 duration-300"
          >
            {idea?.name}
          </Link>
        ))}
      </div>
      <Pagination
        totalItems={ideas.length}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default IdeaListSlug;
