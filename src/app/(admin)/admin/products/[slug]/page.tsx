import ProductEdit from "@/components/AdminComponents/ProductEdit";
import { getProduct } from "@/firebase";
import { redirect } from "next/navigation";

export default async function Page(
  props: {
    params: Promise<{ slug: string }>;
    searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
  }
) {
  const params = await props.params;
  const product = await getProduct(params.slug);
  !product && redirect("/admin/products");
  return (
    <div>
      <ProductEdit source={product} place="products" />
    </div>
  );
}
