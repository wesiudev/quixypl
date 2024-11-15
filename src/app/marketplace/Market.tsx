"use client";
import CategorySelector from "@/components/AddJobOffer/CategorySelector";
import { IProject } from "@/types";
import MarketCategorySelector from "./MarketCategorySelector";
import { useState } from "react";
import Viewer from "@/components/AddJobOffer/Viewer";

export default function Market({ leads }: { leads: IProject[] }) {
  const [tagsOpenLevel, setTagsOpenLevel] = useState(false);
  const [tagDeletion, setTagDeletion] = useState(false);
  const [selectedTag, setSelectedTag] = useState("");
  const [configurationOpen, setConfigurationOpen] = useState(false);
  const [slug, setSlug] = useState<any>("");
  const [category, setCategory] = useState<any>("");
  const [formData, setFormData] = useState("");
  console.log(leads[0].tags);
  console.log(slug);
  return (
    <div className="bg-gray-800">
      <div className="p-6 lg:p-12 bg-gradient-to-r from-primary to-cta">
        <h1 className="mb-6 text-3xl font-extrabold text-white">
          Market usług zdalnych
        </h1>
        <MarketCategorySelector
          tagsOpenLevel={tagsOpenLevel}
          slug={slug}
          setSlug={setSlug}
          setConfigurationOpen={setConfigurationOpen}
          setCategory={setCategory}
          configurationOpen={configurationOpen}
          category={category}
          setFormData={setFormData}
          formData={formData}
        />
      </div>
      <div className="grid gap-3 grid-cols-2 lg:grid-cols-3 p-6 lg:p-12 bg-white">
        {leads.map((lead: IProject, i: any) => (
          <div
            key={i}
            className={`p-4 bg-zinc-800 rounded-xl border-zinc-800 hover:bg-gray-800 ${
              lead.tags.filter((tag: any) => tag.slugTitle === slug.title)
                .length > 0 || !slug.title
                ? "block"
                : "hidden"
            }`}
          >
            <h2 className="text-white text-3xl font-extrabold">{lead?.name}</h2>
            <div className="max-h-[25vh] overflow-hidden my-3 p-3 bg-white rounded-bl-xl rounded-tr-xl">
              <Viewer value={lead?.desc} />
            </div>
            <div className="flex flex-wrap">
              <h3 className="text-white">Czas wykonania: </h3>
              <p className="ml-1 text-purple-500 font-extrabold">
                {" "}
                {lead?.duration}
              </p>
            </div>
            <div className="flex flex-wrap">
              <h3 className="text-white">Rodzaj wynagrodzenia: </h3>
              <p className="ml-1 text-green-500 font-extrabold">
                {" "}
                {lead?.time}
              </p>
            </div>
            <div className="flex flex-wrap">
              <h3 className="text-white">Wynagrodzenie: </h3>
              <p className="ml-1 text-green-500 font-extrabold">
                {" "}
                {lead?.salaryValue}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
