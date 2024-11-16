"use client";
import CategorySelector from "@/components/AddJobOffer/CategorySelector";
import { IProject } from "@/types";
import MarketCategorySelector from "./MarketCategorySelector";
import { useState } from "react";
import Viewer from "@/components/AddJobOffer/Viewer";
import MarketResults from "./MarketResults";

export default function Market({ leads }: { leads: IProject[] }) {
  const [tagsOpenLevel, setTagsOpenLevel] = useState(false);
  const [configurationOpen, setConfigurationOpen] = useState(false);
  const [slug, setSlug] = useState<any>("");
  const [category, setCategory] = useState<any>("");
  const [job, setJob] = useState<any>("");
  const [showResults, setShowResults] = useState(false);
  return (
    <div className="">
      <div className="">
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
      </div>
    </div>
  );
}
