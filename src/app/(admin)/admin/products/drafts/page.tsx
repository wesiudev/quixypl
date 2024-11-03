import Drafts from "@/components/AdminComponents/Drafts";

export default async function Page() {
  return (
    <div className="pt-24">
      <Drafts source="drafts" />
    </div>
  );
}
