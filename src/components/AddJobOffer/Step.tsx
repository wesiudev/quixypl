"use client";
import { toast } from "react-toastify";
import { useState } from "react";
import { InputField } from "./InputField";
import CategorySelector from "./CategorySelector";

import Editor, { EditorContentChanged } from "./Editor";
import Viewer from "./Viewer";

const initialMarkdownContent = "";
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
  const [editorHtmlValue, setEditorHtmlValue] = useState<string>("");
  const [editorMarkdownValue, setEditorMarkdownValue] = useState<string>("");

  const onEditorContentChanged = (content: EditorContentChanged) => {
    setEditorHtmlValue(content.html);
    setEditorMarkdownValue(content.markdown);
  };

  return (
    <div
      className={`${
        currentStep === 1
          ? "-translate-y-[0] duration-500"
          : "translate-y-[-500vh] duration-500 h-px overflow-hidden"
      }`}
    >
      <div>
        <InputField
          id="title"
          label="Tytuł ogłoszenia"
          placeholder="Wpisz tytuł ogłoszenia"
          value={formData.title}
          onChange={handleChange}
        />
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
        <p className="text-black text-lg mb-2">Treść:</p>
        <Editor
          value={initialMarkdownContent}
          onChange={onEditorContentChanged}
        />
        <button
          type="button"
          onClick={() => {
            if (
              formData.title &&
              formData?.tags?.length > 0 &&
              editorMarkdownValue
            ) {
              setFormData({ ...formData, description: editorMarkdownValue });
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
          className="mt-3 p-2 bg-gradient-to-r from-primary to-cta py-0.5 text-white rounded-md"
        >
          Następny krok
        </button>
      </div>
    </div>
  );
}
