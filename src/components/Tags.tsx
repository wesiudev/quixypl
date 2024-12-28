"use client";
import Link from "next/link";
import { polishToEnglish } from "../../utils/polishToEnglish";
import { useState } from "react";

export default function Tags({ talent }: { talent: any }) {
  const [showMore, setShowMore] = useState<any>(false);

  return (
    <>
      <div className="flex flex-wrap">
        {talent?.tags
          .slice(0, showMore ? talent?.tags?.length : 10)
          .map((item: any, i: any) => (
            <div key={i}>
              <h3 className="">
                <Link
                  href={`/praca-zdalna/${item?.slugUrl}/${item?.categoryUrl}/${
                    item?.url
                  }/${talent?.city ? polishToEnglish(talent?.city) : ""}`}
                  className="rounded-md text-xs sm:text-sm lg:text-base bg-gradient-to-b from-primaryHoverStart to-primaryHoverEnd hover:from-primaryHoverStart/80 hover:to-primaryHoverEnd/80 px-[0.7rem] text-white ml-1 mt-1 duration-100 flex items-center py-[0.5rem]"
                >
                  {item.title}
                </Link>
              </h3>
            </div>
          ))}
        {talent?.tags?.length > 10 && (
          <button
            type="button"
            className="rounded-md text-xs sm:text-sm lg:text-base bg-gradient-to-b from-ctaStart to-primaryHoverEnd hover:from-ctaStart/80 hover:to-primaryHoverEnd/80 px-[1rem] text-white ml-1 mt-1 duration-100 flex items-center py-[0.5rem]"
            onClick={() => setShowMore(!showMore)}
          >
            {showMore ? "Ukryj" : `Pokaż więcej (${talent?.tags?.length - 10})`}
          </button>
        )}
      </div>
    </>
  );
}
