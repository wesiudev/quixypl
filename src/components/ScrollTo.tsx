"use client";
import * as Scroll from "react-scroll";
import { polishToEnglish } from "../../utils/polishToEnglish";

import { FaLink } from "react-icons/fa";

/**
 * @description
 * A component that creates a link to a particular section of the page.
 * The link is absolute positioned at the top left of the page.
 * The link is only visible on hover.
 * The link is a grey background with a white text.
 * The link is a flex container with a left positioned icon.
 * The link is a smooth scroll to the section.
 * The link offset is 50px from the top of the page.
 * The link duration is 500ms.
 *
 * @param section {Object} - The section that the link should point to.
 * @param section.title {string} - The title of the section.
 * @returns {ReactNode} - A React component that renders a link to the section.
 */

export default function ScrollTo({ section }: { section: any }) {
  let ScrollTo = Scroll.Link;

  return (
    <ScrollTo
      title={section.title}
      className=" text-black  flex flex-row items-center cursor-pointer hover:bg-gray-300 p-2 duration-150 absolute left-0 top-0 z-20 h-full w-full"
      to={`${polishToEnglish(section.title)}`}
      spy={true}
      smooth={true}
      offset={50}
      duration={500}
    >
      <FaLink className="text-zinc-800 mr-2 min-w-[25px]" /> {section.title}
    </ScrollTo>
  );
}
