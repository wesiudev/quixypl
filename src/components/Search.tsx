"use client";
import { useState } from "react";
import CategorySelector from "@/components/AddJobOffer/CategorySelector";
import { Metadata } from "next";
export default function Search() {
  const [tagsOpenLevel, setTagsOpenLevel] = useState(false);
  const [tagDeletion, setTagDeletion] = useState(false);
  const [selectedTag, setSelectedTag] = useState("");
  const [configurationOpen, setConfigurationOpen] = useState(false);
  const [slug, setSlug] = useState("");
  const [category, setCategory] = useState("");
  const [formData, setFormData] = useState({});
  return (
    <div>
      {/* <CategorySelector
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
      /> */}
    </div>
  );
}
