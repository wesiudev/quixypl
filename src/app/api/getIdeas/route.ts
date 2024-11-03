import { fetchTalents } from "@/firebase";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const tubylytylkofigi = req.nextUrl.searchParams.get("tubylytylkofigi");
  if (tubylytylkofigi !== process.env.API_SECRET_KEY) {
    return new NextResponse("not found", { status: 404 });
  }
  try {
    const talents = await fetchTalents();
    const allIdeas = talents.flatMap((talent) => talent.ideas || []);
    return NextResponse.json(allIdeas);
  } catch (error) {
    return new NextResponse("-", { status: 500 });
  }
}
