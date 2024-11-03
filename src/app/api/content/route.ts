import { getUsers } from "@/firebase";
import { NextRequest, NextResponse } from "next/server";
import { polishToEnglish } from "../../../../utils/polishToEnglish";
import { getPageContent } from "@/lib/getPageContent";

export async function POST(req: NextRequest) {
  const tubylytylkofigi = req.nextUrl.searchParams.get("tubylytylkofigi");
  const job = req.nextUrl.searchParams.get("job");

  if (!tubylytylkofigi || tubylytylkofigi !== process.env.API_SECRET_KEY) {
    return NextResponse.json({ error: "Error" }, { status: 500 });
  }
  if (!job) {
    return NextResponse.json({ error: "no content" });
  }
  try {
    const content = await getPageContent(polishToEnglish(job));

    if (!content) {
      return NextResponse.json({ error: "no content" });
    } else {
      return NextResponse.json(content);
    }
  } catch (error) {
    console.error("Error", error);
    return NextResponse.json({ error: "Error" }, { status: 500 });
  }
}
