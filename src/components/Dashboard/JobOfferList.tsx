// JobOfferList.js
import React from "react";
import Link from "next/link";
import { FaPlusCircle } from "react-icons/fa";
import JobOfferCard from "./JobOfferCard";
import { JobPosting } from "@/types";

const JobOfferList = ({ job_offers }: { job_offers: JobPosting[] }) => {
  return (
    <div className="px-3 lg:px-6 bg-white h-max w-full">
      <h2 className="w-full  text-2xl text-black font-bold drop-shadow-lg">
        Twoje oferty pracy
      </h2>
      {job_offers?.length === 0 ? (
        <div className="text-lg text-black  pt-3">
          Nie dodano żadnych ogłoszeń o pracę - przeprowadź
          <strong>Szybką Rekrutację</strong>⚡
          <Link
            href="/dashboard/add_job_offer"
            className="w-max text-white bg-gradient-to-r from-primary to-cta hover:no-underline underline flex items-center px-2 py-1 rounded-lg mt-1"
          >
            <FaPlusCircle className="text-lg mr-2" />
            Dodaj ofertę pracy
          </Link>
        </div>
      ) : (
        <div className="mt-3 lg:mt-6">
          {job_offers?.map((offer: JobPosting, i: number) => (
            <div key={i} className="h-[40vh] overflow-hidden">
              <JobOfferCard href="/dashboard/my-postings" offer={offer} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default JobOfferList;
