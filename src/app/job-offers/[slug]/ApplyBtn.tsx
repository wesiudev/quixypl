"use client";

import { JobPosting } from "@/types";

export default function ApplyBtn({ offer }: { offer: JobPosting }) {
  return (
    <button
      onClick={() => console.log(offer.authorId)}
      className="bg-cta text-white font-extrabold text-xl px-3 py-2 mt-3"
    >
      Złóż aplikację
    </button>
  );
}
