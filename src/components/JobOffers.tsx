import Link from "next/link";
import JobOfferCard from "./Dashboard/JobOfferCard";
import { JobPosting } from "@/types";
import { polishToEnglish } from "../../utils/polishToEnglish";
import { TfiFlagAlt } from "react-icons/tfi";
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
        <div className="">
          <div className=" p-6 bg-gradient-to-r from-primary/20 to-cta/20 mx-auto my-6">
            <div className="bg-gradient-to-r from-primary to-cta rounded-full aspect-square mx-auto w-32 flex items-center justify-center">
              <TfiFlagAlt className="text-white text-4xl animate-bounce" />
            </div>

            <p className="bg-white font-coco font-light text-black text-base p-3 mt-3 text-center max-w-xl mx-auto">
              Brak aktywnych ofert pracy zdalnej dla specjalistów w branży{" "}
              {content?.genitive}
            </p>
            <h3 className="flex flex-col text-white p-2 font-gotham font-light text-center mx-auto max-w-[332px] group">
              <Link
                href="/register"
                className=" bg-[#14a800] p-2 duration-100 group-hover:bg-opacity-80"
              >
                Dodaj darmowe ogłoszenie
              </Link>
              <Link
                href="/register"
                className=" bg-[#14a800] w-max max-w-[100%] mx-auto p-2  duration-100 group-hover:bg-opacity-80"
              >
                o pracę już dziś!
              </Link>
            </h3>
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
