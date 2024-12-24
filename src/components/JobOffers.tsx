import Link from "next/link";
import JobOfferCard from "./JobOfferCard";
import { JobOffer } from "@/types";
import { polishToEnglish } from "../../utils/polishToEnglish";
import { AiFillThunderbolt } from "react-icons/ai";
export default function JobOffers({
  offers,
  content,
}: {
  offers: JobOffer[];
  content: any;
}) {
  return (
    <div>
      {offers?.length === 0 && (
        <div className="rounded-lg p-3 bg-gradient-to-r from-primaryHoverStart/30 to-primaryHoverEnd/30 mt-6 w-full mx-auto">
          {/* Ikona w centrum */}
          <div
            style={{ boxShadow: "0px 1px 10px rgba(0,0,0,0.8)" }}
            className="bg-gradient-to-b from-primaryStart to-primaryEnd rounded-full aspect-square mx-auto w-24 flex items-center justify-center"
          >
            <AiFillThunderbolt className="text-white text-4xl" />
          </div>

          {/* Treść komponentu */}
          <div className="mt-4 flex flex-col items-center justify-center max-w-xs mx-auto">
            <p className="font-coco font-light text-gray-700 text-center text-base">
              Brak aktywnych ofert pracy w kategorii {content?.title}
            </p>
            <Link
              href="/register"
              className="mt-4 text-sm bg-gradient-to-b from-ctaStart to-ctaEnd font-bold text-white px-4 py-2 rounded-md shadow-md hover:scale-105 duration-200"
            >
              Opublikuj ogłoszenie
            </Link>
          </div>
        </div>
      )}
      {offers?.length > 0 && (
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-3 mt-3">
          {offers.map((offer: JobOffer, i: any) => (
            <div className="overflow-hidden" key={i}>
              <JobOfferCard job={offer} />
            </div>
          ))}
        </section>
      )}
    </div>
  );
}
