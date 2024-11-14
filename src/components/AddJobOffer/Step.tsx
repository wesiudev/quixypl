"use client";
import { toast } from "react-toastify";
import { useState } from "react";
import { InputField } from "./InputField";
import CategorySelector from "./CategorySelector";
import Editor, { EditorContentChanged } from "./Editor";
import JobPreferencesHandler from "../JobOfferPreferencesHandler";
export default function StepOne({
  formData,
  handleChange,
  nextStep,
  currentStep,
  tagsOpenLevel,
  setTagDeletion,
  selectedTag,
  setSelectedTag,
  tagDeletion,
  configurationOpen,
  setConfigurationOpen,
  slug,
  setSlug,
  category,
  setCategory,
  jobs,
  user,
  setFormData,
  setTagsOpenLevel,
}: {
  formData: any;
  handleChange: any;
  nextStep: any;
  currentStep: number;
  tagsOpenLevel: any;
  setTagDeletion: any;
  selectedTag: any;
  setSelectedTag: any;
  tagDeletion: any;
  configurationOpen: any;
  setConfigurationOpen: any;
  slug: any;
  setSlug: any;
  category: any;
  setCategory: any;
  jobs: any;
  user: any;
  setFormData: any;
  setTagsOpenLevel: any;
}) {
  const onEditorContentChanged = (content: EditorContentChanged) => {
    setFormData((prev: any) => ({ ...prev, description: content.html }));
  };
  function addPreference(preference: any) {
    if (!formData.preferences) {
      formData.preferences = [];
    }
    formData.preferences.push(preference);
    setFormData({ ...formData });
  }

  function removePreference(preference: any) {
    formData.preferences = formData.preferences.filter(
      (p: any) => p !== preference
    );
    setFormData({ ...formData });
  }
  return (
    <div
      className={`${
        currentStep === 1
          ? "-translate-y-[0] duration-500"
          : "translate-y-[-500vh] duration-500 h-px overflow-hidden"
      }`}
    >
      <InputField
        id="title"
        label="Tytuł"
        value={formData.title}
        onChange={handleChange}
        placeholder="Wpisz tytuł ogłoszenia o pracę..."
      />
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
          jobs={jobs}
          user={user}
          formData={formData}
          setFormData={setFormData}
        />
        <div className="mt-2"></div>
        <p className="text-black text-lg mb-2">Treść oferty pracy:</p>
        <Editor
          value={formData.description}
          onChange={onEditorContentChanged}
          setFormData={setFormData}
          formData={formData}
        />
        <JobPreferencesHandler
          addPreference={addPreference}
          removePreference={removePreference}
          source={user}
        />
        <button
          type="button"
          onClick={() => {
            if (
              formData?.tags?.length > 0 &&
              formData?.description &&
              formData?.title
            ) {
              nextStep();
            } else {
              return toast.error("Uzupełnij dane!", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
              });
            }
          }}
          className="mt-3 p-2 bg-gradient-to-r from-primary to-cta py-0.5 text-white "
        >
          Następny krok
        </button>
      </div>
    </div>
  );
}
