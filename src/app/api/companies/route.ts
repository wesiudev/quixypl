import { getDocuments } from "@/firebase";
import { NextRequest, NextResponse } from "next/server";
import { polishToEnglish } from "../../../../utils/polishToEnglish";

export async function GET(req: NextRequest) {
  const tubylytylkofigi = req.nextUrl.searchParams.get("tubylytylkofigi");
  const category = req.nextUrl.searchParams.get("category");
  if (tubylytylkofigi !== process.env.API_SECRET_KEY) {
    return new NextResponse("not found", { status: 404 });
  }
  const users = await getDocuments("users");
  const companies = users
    .filter(
      (user) =>
        user?.access && user?.tags?.some((tag: any) => tag.slugUrl === category)
    )
    .map((user) => ({
      ...user,
      email: "hidden",
    }));

  return NextResponse.json(companies);
}
