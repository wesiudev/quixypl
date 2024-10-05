import { NextRequest, NextResponse } from "next/server";
import { getTalents } from "../../../../utils/getTalents";

export async function GET(req: NextRequest) {
  const tubylytylkofigi = req.nextUrl.searchParams.get("tubylytylkofigi");
  if (tubylytylkofigi !== process.env.API_SECRET_KEY) {
    return new NextResponse("not found", { status: 404 });
  }
  try {
    const talents = await getTalents();
    const allIdeas = talents.flatMap((talent) => talent.ideas || []);
    return NextResponse.json(allIdeas);
  } catch (error) {
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
