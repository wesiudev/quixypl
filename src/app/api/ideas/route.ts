import { NextRequest, NextResponse } from "next/server";
import { getTalents } from "../../../../utils/getTalents";
import { polishToEnglish } from "../../../../utils/polishToEnglish";

export async function GET(req: NextRequest) {
  const tubylytylkofigi = req.nextUrl.searchParams.get("tubylytylkofigi");
  const name = req.nextUrl.searchParams.get("name");

  // Validate API secret key
  if (tubylytylkofigi !== process.env.API_SECRET_KEY) {
    return new NextResponse("not found", { status: 404 });
  }

  try {
    const talents = await getTalents();
    const allIdeas = talents.flatMap((talent) => talent.ideas || []);
    const idea = allIdeas.find(
      (idea) =>
        `${name}${idea.creationTime.toString()}` ===
        polishToEnglish(`${idea.name}${idea.creationTime.toString()}`)
    );
    return NextResponse.json(idea);
  } catch (error) {
    // Handle any potential errors during the process
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
