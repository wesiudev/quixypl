import { fetchUsers } from "@/firebase";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const tubylytylkofigi = req.nextUrl.searchParams.get("tubylytylkofigi");
  if (tubylytylkofigi !== process.env.API_SECRET_KEY) {
    return NextResponse.json("not found", { status: 404 });
  }
  try {
    const talents = await fetchUsers();
    const allIdeas = talents.flatMap((talent) => talent.ideas || []);
    return NextResponse.json(allIdeas);
  } catch (error) {
    return NextResponse.json("-", { status: 500 });
  }
}
