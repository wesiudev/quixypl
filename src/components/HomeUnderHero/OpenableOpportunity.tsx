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
      className={`font-gotham p-3 flex flex-col rounded-lg bg-gray-200 shadow-black !text-zinc-800`}
    >
      <div
        className={`
         ease-in-out w-full text-left`}
      >
        <div className="font-bold flex items-center">
          {" "}
          <FaStar className="text-orange-500 mr-1" />
          <h2 className="text-lg">{opportunity.title}</h2>
        </div>
        <div className={`flex flex-row flex-wrap items-center mt-1 -ml-3 `}>
          {opportunity.data.map((subcategory: any, i: any) => (
            <Link
              href={`/praca-zdalna/${polishToEnglish(
                opportunity.title
              )}/${polishToEnglish(subcategory.title)}`}
              key={i}
              className={`${i !== 0 && "ml-3"} ml-3 hover:underline font-light`}
            >
              {subcategory.title}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
