"use client";
import { toast } from "react-toastify";
import { InputField } from "./InputField";
import CategorySelector from "./CategorySelector";
import JobPreferencesHandler from "../JobOfferPreferencesHandler";
import "react-quill-new/dist/quill.snow.css";
import dynamic from "next/dynamic";
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
  const addPreference = (preference: any) =>
    setFormData((prev: any) => ({
      ...prev,
      preferences: (prev.preferences || []).concat(preference),
    }));

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
          ? "-translate-y-[0] duration-300"
          : "translate-y-[-100vh] duration-300 h-px overflow-hidden"
      } w-full relative z-50`}
    >
      <InputField
        id="title"
        label="Tytuł"
        value={formData.title}
        onChange={handleChange}
        placeholder="Tytuł ogłoszenia"
      />
      <div className="w-full">
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
        <div className="mt-2"></div>
        <p
          onClick={() => console.log(formData.description)}
          className="text-black font-extrabold mb-2"
        >
          Treść oferty
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
          source={user}
        />
        <div className="w-full flex items-end justify-end">
          <button
            type="button"
            onClick={() => {
              if (
                category &&
                slug &&
                job &&
                formData?.description &&
                formData?.title &&
                formData?.preferences?.length
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
            className="font-bold p-3 bg-gradient-to-r from-primary to-cta py-1.5 text-white "
          >
            Następny krok
          </button>
        </div>
      </div>
    </div>
  );
}
