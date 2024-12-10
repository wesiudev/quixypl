import Link from "next/link";
import JobOfferCard from "./Dashboard/JobOfferCard";
import { JobPosting } from "@/types";
import { polishToEnglish } from "../../utils/polishToEnglish";
import { TfiFlagAlt } from "react-icons/tfi";
import { FaBriefcase, FaPlus } from "react-icons/fa6";
export default function JobOffers({
  offers,
  content,
}: {
  offers: JobPosting[];
  content: any;
}) {
  return (
    <div>
      {offers?.length === 0 && (
        <div className="p-6 bg-gradient-to-r from-primary/20 to-cta/20 my-6 w-full mx-auto">
          {/* Ikona w centrum */}
          <div className="bg-gradient-to-r from-primary to-cta rounded-full aspect-square mx-auto w-32 flex items-center justify-center">
            <FaPlus className="text-white text-5xl" />
          </div>

          {/* Treść komponentu */}
          <div className="mt-6 bg-white rounded-lg shadow-md flex flex-col items-center justify-center p-6 max-w-xl mx-auto">
            <p className="font-coco font-light text-black text-center text-base">
              Brak aktywnych ofert pracy
            </p>
            <Link
              href="/register"
              className="mt-4 text-sm bg-cta font-bold text-white px-4 py-2 rounded-md shadow-md transition duration-200 hover:bg-opacity-80 focus:ring focus:ring-cta/50"
            >
              Opublikuj ogłoszenie
            </Link>
          </div>
        </div>
      )}
      {offers?.length > 0 && (
        <section className="grid grid-cols-1">
          {offers.map((offer: JobPosting, i: any) => (
            <div className="overflow-hidden my-3" key={i}>
              <JobOfferCard
                offer={offer}
                href={`/job-offers/${polishToEnglish(offer?.title)}-${
                  offer?.creationTime
                }`}
              />
            </div>
          ))}
        </section>
      )}
    </div>
  );
}
