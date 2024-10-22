import { JobPosting } from "@/types";
import Link from "next/link";
import { polishToEnglish } from "../../../utils/polishToEnglish";

export default function JobOfferCard({
  jobOfferData,
}: {
  jobOfferData: JobPosting;
}) {
  return (
    <Link
      href={`/job_offers/${polishToEnglish(jobOfferData.title)}-${
        jobOfferData.creationTime
      }`}
    >
      <div className="block p-6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
        <h5 className="text-lg font-semibold tracking-tight mb-2 dark:text-white">
          {jobOfferData.title}
        </h5>
        {/* <p className="font-normal text-gray-700 dark:text-gray-400">
          {jobOfferData.description}
        </p> */}
      </div>
    </Link>
  );
}
