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
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <h2 className="text-2xl font-extrabold text-black">
            {opportunity.title}
          </h2>
        </div>
        <Link
          href={`/praca-zdalna/${polishToEnglish(opportunity.title)}`}
          className="text-cta text-sm font-bold hover:underline"
        >
          Zobacz więcej
        </Link>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-4">
        {opportunity.data.map((subcategory: any, i: any) => (
          <Link
            key={i}
            href={`/praca-zdalna/${polishToEnglish(
              opportunity.title
            )}/${polishToEnglish(subcategory.title)}`}
            className="text-black hover:underline"
          >
            {subcategory.title}
          </Link>
        ))}
      </div>
    </div>
  );
}
