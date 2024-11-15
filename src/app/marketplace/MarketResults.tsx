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
    <div className={`p-6 lg:p-12 bg-white mt-6 rounded-xl`}>
      <div className="text-black font-extrabold mb-3 text-3xl">
        Znalezione usługi {`(${leads?.length})`}
      </div>
      <div className="text-white font-extrabold bg-gradient-to-r from-primary to-cta p-3 rounded-xl mb-3">
        {slug} {slug && "->"} {category} {category && "->"} {job}
      </div>
      <div className="grid gap-3 grid-cols-2 lg:grid-cols-3">
        {leads.map((lead: IProject, index: number) => (
          <div
            key={`${lead?.creationTime}-${index}`}
            className={`p-4 bg-zinc-800 rounded-xl border-zinc-800 hover:bg-gray-800`}
          >
            <h2 className="text-white text-3xl font-extrabold">{lead?.name}</h2>
            <div className="max-h-[25vh] overflow-hidden my-3 p-3 bg-white rounded-xl">
              <Viewer value={lead?.desc} />
            </div>
            <div className="flex flex-wrap">
              <h3 className="text-white">Czas wykonania: </h3>
              <p className="ml-1 text-purple-500 font-extrabold">
                {lead?.duration}
              </p>
            </div>
            <div className="flex flex-wrap">
              <h3 className="text-white">Rodzaj wynagrodzenia: </h3>
              <p className="ml-1 text-green-500 font-extrabold">{lead?.time}</p>
            </div>
            <div className="flex flex-wrap">
              <h3 className="text-white">Wynagrodzenie: </h3>
              <p className="ml-1 text-green-500 font-extrabold">
                {lead?.salaryValue}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
