"use client";
import { JobPosting } from "@/types";
import Link from "next/link";
import { polishToEnglish } from "../../../utils/polishToEnglish";
import Viewer from "../AddJobOffer/Viewer";

export default function JobOfferCard({
  offer,
  href,
}: {
  offer: JobPosting;
  href: string;
}) {
  return (
    <Link className="mt-3" href={`${href}`}>
      <div className="block w-full bg-white border border-gray-200 shadow-md hover:bg-gray-100">
        <h5 className="p-3 lg:p-6 bg-gradient-to-r from-primary to-cta font-bold text-white text-xl lg:text-3xl">
          {offer.title}
        </h5>
        <div className="mt-3 p-3 lg:p-6">
          <Viewer value={offer.description} />
        </div>
      </div>
    </Link>
  );
}
