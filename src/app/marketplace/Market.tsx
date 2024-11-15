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
  return (
    <div className="min-h-screen bg-gradient-to-r from-primary to-cta">
      <div className="p-6 lg:p-12">
        <h1 className="mb-6 text-3xl font-extrabold text-white">
          Market usług zdalnych
        </h1>
        <MarketCategorySelector
          slug={slug}
          setSlug={setSlug}
          setConfigurationOpen={setConfigurationOpen}
          setCategory={setCategory}
          category={category}
          setJob={setJob}
        />
        <MarketResults
          leads={leads.filter((lead) =>
            lead.tags.some(
              (tag: any) =>
                tag.slugTitle === slug &&
                (!category || tag.categoryTitle === category) &&
                (!job || tag.title === job)
            )
          )}
          slug={slug}
          category={category}
          job={job}
        />
      </div>
    </div>
  );
}
