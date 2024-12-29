import { IProject } from "@/types";
import LeadCard from "../Dashboard/LeadCard";

export default function MarketResults({
  services,
  slug,
  category,
  job,
}: {
  services: any;
  slug: any;
  category: any;
  job: any;
}) {
  return (
    <div className="flex flex-col z-[99999999] overflow-auto h-full">
      <div
        className={`${
          services?.length > 0 && slug !== "" ? "block" : "hidden"
        } rounded-lg bg-gradient-to-r from-primaryHoverStart/30 to-primaryHoverEnd/30 w-full mt-3`}
      >
        <div
          className={`text-center font-extrabold text-xl text-white px-4 py-2 rounded-t-lg bg-gradient-to-b from-primaryHoverStart to-primaryHoverEnd`}
        >
          Znalezione usługi {`(${services?.length})`}
        </div>
        <div
          className={`p-3 w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3`}
        >
          {" "}
          {/* Changed grid to column flex */}
          {services.map((service: IProject, index: number) => (
            <div key={`${service?.creationTime}-${index}`}>
              <LeadCard service={service} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
