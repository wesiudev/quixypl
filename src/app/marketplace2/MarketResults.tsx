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
        } p-3 lg:p-6 bg-white`}
      >
        <div className={`text-black font-extrabold mb-3 text-3xl`}>
          Znalezione usługi {`(${leads?.length})`}
        </div>
        <div
          className={`text-white font-extrabold bg-gradient-to-r from-primary to-cta p-3 rounded-xl mb-3`}
        >
          {slug} {category && "->"} {category} {job && "->"} {job}
        </div>
        <div className={`grid gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`}>
          {leads.map((lead: IProject, index: number) => (
            <div
              key={`${lead?.creationTime}-${index}`}
              className={`p-4 bg-zinc-800 rounded-xl border-zinc-800 hover:bg-gray-800`}
            >
              <h2 className="text-3xl font-extrabold text-blue-500">
                {lead?.name}
              </h2>
              <p className="mb-2 text-md font-medium text-gray-900 dark:text-gray-100">
                <span className="text-sm font-bold text-indigo-600 dark:text-indigo-400">
                  Typ wynagrodzenia:
                </span>{" "}
                {lead.time}
              </p>
              <p className="mb-2 text-md font-medium text-gray-900 dark:text-gray-100">
                <span className="text-sm font-bold text-indigo-600 dark:text-indigo-400">
                  Wynagrodzenie:
                </span>{" "}
                {lead.salaryValue}
              </p>
              <p className="mb-2 text-md font-medium text-gray-900 dark:text-gray-100">
                <span className="text-sm font-bold text-indigo-600 dark:text-indigo-400">
                  Czas wykonania:
                </span>{" "}
                {lead.duration}
              </p>
              <div className="max-h-[25vh] overflow-hidden my-3 p-3 bg-white rounded-xl">
                <Viewer value={lead?.desc} />
              </div>
            </div>
          ))}
        </div>
      </div>
      {!job && !slug && !category && (
        <div className="bg-white p-12 text-black text-center items-center justify-center h-full w-full">
          <h3 className=" text-3xl font-extrabold">
            Wybierz kategorię i wyświetlaj usługi
          </h3>
          <h3 className="font-coco">
            Wybierz kategorię poszukiwanych usług, by rozpocząć wyszukiwanie
            usług naszych użytkowników.
          </h3>
        </div>
      )}
    </div>
  );
}
