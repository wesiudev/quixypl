import { NextRequest, NextResponse } from "next/server";
import { polishToEnglish } from "../../../../utils/polishToEnglish";
import { fetchTalents } from "@/firebase";

export async function GET(req: NextRequest) {
  const tubylytylkofigi = req.nextUrl.searchParams.get("tubylytylkofigi");
  const name = req.nextUrl.searchParams.get("name");

  // Validate API secret key
  if (tubylytylkofigi !== process.env.API_SECRET_KEY) {
    return new NextResponse("not found", { status: 404 });
  }

  try {
    const talents = await fetchTalents();
    const allIdeas = talents.flatMap((talent) => talent.ideas || []);
    const idea = allIdeas.find(
      (idea) =>
        name === polishToEnglish(`${idea.name}${idea.creationTime.toString()}`)
    );
    return NextResponse.json(idea);
  } catch (error) {
    // Handle any potential errors during the process
    return new NextResponse("-", { status: 500 });
  }
}
