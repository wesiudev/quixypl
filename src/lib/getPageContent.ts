import { getDocument } from "@/firebase";

export async function getPageContent(id: string) {
  const content = await getDocument("content", id);
  return content;
}
