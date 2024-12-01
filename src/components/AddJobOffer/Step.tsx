"use client";
import { toast } from "react-toastify";
import { InputField } from "./InputField";
import CategorySelector from "./CategorySelector";
import "react-quill-new/dist/quill.snow.css";
import dynamic from "next/dynamic";
import JobPreferencesHandler from "../JobOfferPreferencesHandler";
export interface EditorContentChanged {
  html: string;
  markdown: string;
}

export interface EditorProps {
  value?: any;
  setSource?: any;
  source?: any;
  setChangesWereMade?: any;
}

export const ReactQuill = dynamic(() => import("react-quill-new"), {
  ssr: false,
});

export const TOOLBAR_OPTIONS = [
  [{ header: [1, 2, 3, false] }],
  ["bold", "italic", "underline", "strike", "blockquote", "link"],
  [{ list: "ordered" }, { list: "bullet" }],
  [{ indent: "-1" }, { indent: "+1" }],
  ["clean"],
];

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
  job,
  setJob,
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
  job: any;
  setJob: any;
}) {
  function addPreference(preference: any) {
    setFormData((prevFormData: any) => ({
      ...prevFormData,
      preferences: [...(prevFormData?.preferences || []), preference],
    }));
  }

  function removePreference(preference: any) {
    setFormData((prevFormData: any) => ({
      ...prevFormData,
      preferences:
        prevFormData?.preferences?.filter((p: any) => p !== preference) || [],
    }));
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
        {!formData?.job && (
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
            job={job}
            setJob={setJob}
          />
        )}
        {formData?.job && (
          <div className="">
            <p
              onClick={() => console.log(formData.description)}
              className="text-black font-extrabold text-lg mb-2"
            >
              Kategoria:
            </p>
            <div className="text-white bg-gradient-to-r from-primary to-cta w-max max-w-full p-2">
              {formData.job}
            </div>
          </div>
        )}
        <div className="mt-2"></div>
        <p
          onClick={() => console.log(formData.description)}
          className="text-black font-extrabold text-lg mb-2"
        >
          Treść oferty:
        </p>
        <ReactQuill
          theme="snow"
          placeholder="Wpisz tekst"
          className="text-black"
          modules={{
            toolbar: {
              container: TOOLBAR_OPTIONS,
            },
          }}
          value={formData.description}
          onChange={(e) => {
            setFormData({
              ...formData,
              description: e,
            });
          }}
        />
        <JobPreferencesHandler
          addPreference={addPreference}
          removePreference={removePreference}
          formData={formData}
          setFormData={setFormData}
        />
        <button
          type="button"
          onClick={() => {
            if (
              (formData?.category || category) &&
              (formData?.slug || slug) &&
              (formData?.job || job) &&
              formData?.description &&
              formData?.title &&
              formData?.preferences.length
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
