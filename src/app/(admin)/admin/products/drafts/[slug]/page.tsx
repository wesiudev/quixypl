import { getDraft } from "@/firebase";
import { redirect } from "next/navigation";
import ProductEdit from "@/components/AdminComponents/ProductEdit";

export default async function Page(
  props: {
    params: Promise<{ slug: string }>;
    searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
  }
) {
  const params = await props.params;
  const draft = await getDraft(params.slug);
  !draft && redirect("/admin/products/drafts");
  return (
    <div>
      <ProductEdit source={draft} place="drafts" />
    </div>
  );
}
