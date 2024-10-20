import { toast } from "react-toastify";
import { InputField } from "./InputField";
import CategorySelector from "./CategorySelector";

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
  return (
    <div>
      {currentStep === 1 && (
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
          <InputField
            id="description"
            label="Opis"
            placeholder="Opisz stanowisko"
            value={formData.description}
            onChange={handleChange}
            isTextArea
          />
          <InputField
            id="requirements"
            label="Wymagania"
            placeholder="Opisz wymagania i obowiązki stanowiska"
            value={formData.requirements}
            onChange={handleChange}
            isTextArea
          />
          <button
            type="button"
            onClick={() => {
              if (
                formData.title &&
                formData.description &&
                formData.requirements &&
                formData?.tags?.length > 0
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
            className="p-2 bg-gradient-to-r from-primary to-cta py-0.5 text-white rounded-md"
          >
            Następny krok
          </button>
        </div>
      )}
    </div>
  );
}
