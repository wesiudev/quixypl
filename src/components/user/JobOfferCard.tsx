"use client";
import { JobPosting } from "@/types";
import Link from "next/link";
import { polishToEnglish } from "../../../utils/polishToEnglish";
import Viewer from "../AddJobOffer/Viewer";
import moment from "moment";

export default function JobOfferCard({
  offer,
  href,
}: {
  offer: JobPosting;
  href: string;
}) {
  return (
    <Link className="p-1.5" href={`${href}`}>
      <div className="flex-wrap bg-gradient-to-r from-primary to-cta font-bold text-white w-full flex justify-between p-3 rounded-xl">
        <h3 className="">{offer.title}</h3>
        <h3>{moment(offer.creationTime).format("DD-MM-YYYY")}</h3>
      </div>
    </Link>
  );
}
