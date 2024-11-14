import { getDocuments } from "@/firebase";
import Market from "./Market";
import { IProject } from "@/types";
export const revalidate = 60;
export default async function Page() {
  const leads: any = await getDocuments("services");
  return (
    <div>
      <Market leads={leads} />
    </div>
  );
}
