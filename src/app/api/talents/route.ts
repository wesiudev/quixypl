import { fetchUsers } from "@/firebase";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const tubylytylkofigi = req.nextUrl.searchParams.get("tubylytylkofigi");
  const category = req.nextUrl.searchParams.get("category");
  if (tubylytylkofigi !== process.env.API_SECRET_KEY) {
    return new NextResponse("not found", { status: 404 });
  }
  const users = await fetchUsers();
  const talents = users.filter(
    (user) =>
      user?.access &&
      (!category || user.tags.some((tag: any) => tag.slugUrl === category))
  );
  return NextResponse.json(talents);
}
