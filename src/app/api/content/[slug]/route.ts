import { getDocuments } from "@/firebase";
import { NextResponse } from "next/server";
import { polishToEnglish } from "../../../../../utils/polishToEnglish";

export async function GET(params: any, req: any) {
  const { slug } = await req.params;
  const content = await getDocuments("content");
  const data = content.find((c: any) => polishToEnglish(c?.title) === slug);
  return NextResponse.json(data);
}
