"use client";
import { useState } from "react";
import CategorySelector from "@/components/AddJobOffer/CategorySelector";
import Postings from "@/components/Postings/Postings";
import { Metadata } from "next";
export default function Page() {
  const [tagsOpenLevel, setTagsOpenLevel] = useState(false);
  const [tagDeletion, setTagDeletion] = useState(false);
  const [selectedTag, setSelectedTag] = useState("");
  const [configurationOpen, setConfigurationOpen] = useState(false);
  const [slug, setSlug] = useState("");
  const [category, setCategory] = useState("");

  const [formData, setFormData] = useState({});

  return (
    <div>
      <CategorySelector
        setTagsOpenLevel={setTagsOpenLevel}
        tagsOpenLevel={tagsOpenLevel}
        setTagDeletion={setTagDeletion}
        selectedTag={selectedTag}
        setSelectedTag={setSelectedTag}
        tagDeletion={tagDeletion}
        configurationOpen={configurationOpen}
        setConfigurationOpen={setConfigurationOpen}
        slug={slug}
        setSlug={setSlug}
        category={category}
        setCategory={setCategory}
        formData={formData}
        setFormData={setFormData}
      />
    </div>
  );
}
export const metadata: Metadata = {
  publisher: "quixy.pl",
  manifest: "/manifest.json",
  authors: [
    {
      name: "quixy",
      url: "https://quixy.pl",
    },
  ],
  verification: {
    google: "google85185d3abec28326.html",
  },
  title: `Twoje Oferty Pracy - Panel Użytkownika`,
  description:
    "Zatrudnij ekspertów z branży IT, marketingu, designu i innych dziedzin. Znajdź specjalistów w Quixy Talent™ i rozwijaj swój biznes już dziś!",
};
