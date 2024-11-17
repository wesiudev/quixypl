import Viewer from "@/components/AddJobOffer/Viewer";
import { IProject } from "@/types";

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
    <div className="flex items-center justify-center z-[99999999] overflow-auto h-full">
      <div
        className={`${
          leads?.length > 0 && slug !== "" ? "block" : "hidden"
        } p-2 lg:p-4 bg-white`}
      >
        <div className={`text-black font-bold mb-2 text-xl`}>
          {" "}
          {/* Reduced font size */}
          Znalezione usługi {`(${leads?.length})`}
        </div>
        <div
          className={`text-white font-bold bg-gradient-to-r from-primary to-cta p-2 rounded-lg mb-2`}
        >
          {slug} {category && "->"} {category} {job && "->"} {job}
        </div>
        <div className={`flex flex-col gap-2`}>
          {" "}
          {/* Changed grid to column flex */}
          {leads.map((lead: IProject, index: number) => (
            <div
              key={`${lead?.creationTime}-${index}`}
              className={`p-2 bg-zinc-800 rounded-lg border-zinc-700 hover:bg-gray-800`} // Reduced padding
            >
              <h2 className="text-lg font-bold text-blue-500">
                {" "}
                {/* Smaller font size */}
                {lead?.name}
              </h2>
              <p className="text-xs font-medium text-gray-900 dark:text-gray-100">
                {" "}
                {/* Smaller font size */}
                <span className="font-bold text-indigo-600 dark:text-indigo-400">
                  Typ wynagrodzenia:
                </span>{" "}
                {lead.time}
              </p>
              <p className="text-xs font-medium text-gray-900 dark:text-gray-100">
                {" "}
                {/* Smaller font size */}
                <span className="font-bold text-indigo-600 dark:text-indigo-400">
                  Wynagrodzenie:
                </span>{" "}
                {lead.salaryValue}
              </p>
              <p className="text-xs font-medium text-gray-900 dark:text-gray-100">
                {" "}
                {/* Smaller font size */}
                <span className="font-bold text-indigo-600 dark:text-indigo-400">
                  Czas wykonania:
                </span>{" "}
                {lead.duration}
              </p>
              <div className="max-h-[15vh] overflow-hidden my-2 p-2 bg-white rounded-lg">
                {" "}
                {/* Reduced size */}
                <Viewer value={lead?.desc} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
