"use client";
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
      <h2 className="text-3xl mb-6 text-black">
        FAQ: Najczęściej Zadawane Pytania
      </h2>
      <ul className="space-y-4 text-lg text-black">
        {faqItems.slice(0, visibleItems).map((faq, index) => (
          <li
            key={index}
            className="!font-coco border-x-[12px] rounded-xl border-primary p-3 border-y-2 bg-primary bg-opacity-80 text-white"
          >
            <strong style={{ textShadow: "2px 2px 2px black" }}>
              {faq.question}
            </strong>
            <p className="font-light">{faq.answer}</p>
          </li>
        ))}
      </ul>

      {visibleItems < faqItems.length && (
        <div className="text-center mt-8">
          <button
            onClick={handleShowMore}
            style={{ textShadow: "2px 2px 2px black" }}
            className="bg-[#126b91] text-white py-2 px-4 rounded-lg hover:bg-cta transition"
          >
            Pokaż więcej
          </button>
        </div>
      )}
    </div>
  );
};

export default FAQ;
