import Link from "next/link";
import { polishToEnglish } from "../../../utils/polishToEnglish";
import { FaStar } from "react-icons/fa";

export default function OpenableOpportunity({
  opportunity,
  i,
}: {
  opportunity: any;
  i: any;
}) {
  return (
    <div
      key={i}
      className={`bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300 ease-in-out`}
    >
      <div className="flex justify-between">
        <h2 className=" sm:text-xl lg:text-2xl font-extrabold text-black">
          {opportunity.title}
        </h2>
        <Link
          href={`/praca-zdalna/${polishToEnglish(opportunity.title)}`}
          className="h-max bg-gradient-to-r from-accentStart to-accentEnd px-4 py-2 rounded-md text-white text-xs sm:text-sm duration-300"
        >
          <div className="w-max">Zobacz więcej</div>
        </Link>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-4 bg-gradient-to-r from-primaryStart/15 to-primaryStart/15 p-3 rounded-md">
        {opportunity.data.map((subcategory: any, i: any) => (
          <Link
            key={i}
            href={`/praca-zdalna/${polishToEnglish(
              opportunity.title
            )}/${polishToEnglish(subcategory.title)}`}
            className="text-sm sm:text-base text-black hover:underline"
          >
            {subcategory.title}
          </Link>
        ))}
      </div>
    </div>
  );
}
