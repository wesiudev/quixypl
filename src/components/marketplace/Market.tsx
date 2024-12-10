"use client";
import { IProject } from "@/types";
import MarketCategorySelector from "./MarketCategorySelector";
import { useState } from "react";
import MarketResults from "./MarketResults";
import { BiCategory } from "react-icons/bi";
export default function Market({ leads }: { leads: IProject[] }) {
  const [tagsOpenLevel, setTagsOpenLevel] = useState(false);
  const [configurationOpen, setConfigurationOpen] = useState(false);
  const [slug, setSlug] = useState<any>("");
  const [category, setCategory] = useState<any>("");
  const [job, setJob] = useState<any>("");
  const [showResults, setShowResults] = useState(false);
  return (
    <div className="pb-12">
      <div>
        <MarketCategorySelector
          slug={slug}
          setSlug={setSlug}
          setConfigurationOpen={setConfigurationOpen}
          setCategory={setCategory}
          category={category}
          setJob={setJob}
          job={job}
          leads={
            slug &&
            leads.filter((lead) =>
              lead.tags.some(
                (tag: any) =>
                  tag.slugTitle === slug &&
                  (!category || tag.categoryTitle === category) &&
                  (!job || tag.title === job)
              )
            ).length
          }
          setShowResults={setShowResults}
          showResults={showResults}
          configurationOpen={configurationOpen}
        />
        {showResults && (
          <MarketResults
            leads={
              slug
                ? leads.filter((lead) =>
                    lead.tags.some(
                      (tag: any) =>
                        tag.slugTitle === slug &&
                        (!category || tag.categoryTitle === category) &&
                        (!job || tag.title === job)
                    )
                  )
                : leads
            }
            slug={slug}
            category={category}
            job={job}
          />
        )}
        {slug === "" && (
          <div className="mt-3 py-6 bg-gradient-to-r from-primary/30 to-cta/30 px-6 pb-6 text-black text-center items-center justify-center h-full w-full">
            {" "}
            <div className="bg-gradient-to-r from-primary to-cta rounded-full aspect-square mx-auto w-32 flex items-center justify-center">
              <BiCategory className="text-white text-4xl" />
            </div>
            <div className="bg-white p-3 text-center max-w-sm mx-auto mt-4">
              {/* Reduced padding */}
              <p className="font-coco font-light max-w-sm mx-auto">
                Wybierz kategorię i przeglądaj usługi naszych użytkowników.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
