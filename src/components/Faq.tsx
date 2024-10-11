"use client";
import Link from "next/link";
import React, { useState } from "react";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQProps {
  faqItems: FAQItem[];
}

/**
 * FAQ component
 *
 * This component renders a list of FAQs, with a limit of {@link visibleItems} items
 * initially visible. Clicking the "Poka  wi cej" button will show 3 more items.
 *
 * @param {FAQProps} props
 * @prop {FAQItem[]} faqItems - List of FAQs to render
 * @returns {React.ReactElement} FAQ component
 */
const FAQ: React.FC<FAQProps> = ({ faqItems }) => {
  const [visibleItems, setVisibleItems] = useState(3);

  const handleShowMore = () => {
    setVisibleItems((prev) => prev + 3); // Show 3 more items on each click
  };

  return (
    <div className="font-gotham">
      <h2 className="z-50 py-3 text-xl sm:text-3xl w-full">
        <span className="p-3 text-white bg-gradient-to-r from-primary to-cta rounded-t-xl">
          Często zadawane pytania
        </span>
      </h2>
      <ul className="-mt-[2px] p-3 rounded-lg rounded-tl-none  cursor-default select-none lg:hover:bg-gradient-to-r lg:hover:from-primary/20 lg:hover:to-cta/20 bg-gradient-to-r from-primary/20 to-cta/20 text-lg text-black">
        {faqItems.slice(0, visibleItems).map((faq, index) => (
          <li
            key={index}
            className={`lg:hover:!text-white text-zinc-800 lg:hover:bg-gradient-to-r lg:hover:from-primary lg:hover:to-cta font-gotham p-3 ${
              index + 1 !== visibleItems && "border-primary/50 border-b-2"
            }`}
          >
            <h4 className="">{faq.question}</h4>
            <p className="font-light">{faq.answer}</p>
          </li>
        ))}
      </ul>

      {visibleItems < faqItems.length ? (
        <div className="mt-3 w-full flex items-start justify-start">
          <button
            onClick={handleShowMore}
            className="bg-[#126b91] text-white py-2 px-4 rounded-lg lg:hover:bg-cta transition"
          >
            Pokaż więcej
          </button>
        </div>
      ) : (
        <div className="mt-3 w-full flex items-start justify-start">
          <Link
            href="/contact"
            className="bg-gradient-to-r from-primary to-cta text-white py-2 px-4 rounded-lg lg:hover:bg-cta transition"
          >
            Masz inne pytanie?
          </Link>
        </div>
      )}
    </div>
  );
};

export default FAQ;
