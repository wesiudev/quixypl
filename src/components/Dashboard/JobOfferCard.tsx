"use client";
import { JobPosting } from "@/types";
import Link from "next/link";
import moment from "moment";
export default function JobOfferCard({
  offer,
  href,
}: {
  offer: JobPosting;
  href: string;
}) {
  return (
    <div className="bg-white p-2">
      <Link className="" href={`${href}`}>
        <div className="flex-wrap w-full flex justify-between">
          <h3 className="text-2xl font-extrabold text-black">{offer.title}</h3>
          <span className="font-coco">
            {moment(offer.creationTime).format("DD-MM-YYYY")}
          </span>
        </div>
      </Link>
    </div>
  );
}
