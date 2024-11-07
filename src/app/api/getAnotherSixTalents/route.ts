import { fetchUsers, getDocuments } from "@/firebase";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const tubylytylkofigi = req.nextUrl.searchParams.get("tubylytylkofigi");
  const page = req.nextUrl.searchParams.get("page");
  if (tubylytylkofigi !== process.env.API_SECRET_KEY) {
    return new NextResponse("not found", { status: 404 });
  }
  if (!page) {
    return NextResponse.json([]);
  }
  const talents = await fetchUsers();
  const pageNumber = Number(page);
  const start = (pageNumber - 1) * 6;
  const end = start + 6;
  const anotherSixTalents = talents.slice(start, end);
  return NextResponse.json(anotherSixTalents);
}
