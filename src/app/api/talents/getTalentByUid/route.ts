import { fetchTalents } from "@/firebase";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const tubylytylkofigi = req.nextUrl.searchParams.get("tubylytylkofigi");
  const uid = req.nextUrl.searchParams.get("uid");

  if (tubylytylkofigi !== process.env.API_SECRET_KEY) {
    return new NextResponse("not found", { status: 404 });
  }
  const talents = await fetchTalents();
  const talent = talents.find((t) => t.uid === uid);
  return NextResponse.json(talent);
}
