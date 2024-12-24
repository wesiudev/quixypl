import Viewer from "@/components/AddJobOffer/Viewer";
import { IProject } from "@/types";
import Link from "next/link";
import { FaChevronRight } from "react-icons/fa6";

export default function MarketResults({
  leads,
  slug,
  category,
  job,
}: {
  leads: any;
  slug: any;
  category: any;
  job: any;
}) {
  return (
    <div className="flex flex-col z-[99999999] overflow-auto h-full">
      <div
        className={`text-center font-extrabold mt-6 text-xl text-white px-4 py-2 rounded-md bg-gradient-to-b from-primaryStart to-primaryEnd`}
      >
        Znalezione usługi {`(${leads?.length})`}
      </div>
      <div
        className={`${
          leads?.length > 0 && slug !== "" ? "block" : "hidden"
        } rounded-md p-3 bg-gradient-to-r from-primaryHoverStart/30 to-primaryHoverEnd/30 w-full mt-3`}
      >
        <div
          className={`w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5 gap-2`}
        >
          {" "}
          {/* Changed grid to column flex */}
          {leads.map((lead: IProject, index: number) => (
            <Link
              href={`/${lead?.userType}/${lead?.pseudo}`}
              key={`${lead?.creationTime}-${index}`}
              className={`p-2 bg-white rounded-md`} // Reduced padding
            >
              <h2 className="text-lg font-extrabold text-black">
                {" "}
                {/* Smaller font size */}
                {lead?.name}
              </h2>
              <p className="text-sm text-black font-bold">
                {" "}
                {/* Smaller font size */}
                <span className="font-bold text-black">Płatność:</span>{" "}
                {lead.time}
              </p>
              <p className="text-sm text-black font-bold">
                {" "}
                {/* Smaller font size */}
                <span className="font-bold text-black">Cena:</span>{" "}
                {lead.salaryValue}
              </p>
              <p className="text-sm text-black font-bold">
                {" "}
                {/* Smaller font size */}
                <span className="font-bold text-black">
                  Czas wykonania:
                </span>{" "}
                {lead.duration}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
