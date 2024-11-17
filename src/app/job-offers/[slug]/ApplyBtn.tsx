"use client";

import { JobPosting } from "@/types";

export default function ApplyBtn({ offer }: { offer: JobPosting }) {
  return (
    <button
      onClick={() => console.log(offer.authorId)}
      className="bg-cta text-white font-extrabold text-xl p-3 rounded-xl mt-3"
    >
      Aplikuj do pracy
    </button>
  );
}
