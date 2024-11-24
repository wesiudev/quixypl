import { fetchUsers, getDocuments } from "@/firebase";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const tubylytylkofigi = req.nextUrl.searchParams.get("tubylytylkofigi");
  const id = req.nextUrl.searchParams.get("id");
  if (tubylytylkofigi !== process.env.API_SECRET_KEY) {
    return new NextResponse("not found", { status: 404 });
  }
  const users = await fetchUsers();
  return NextResponse.json({
    users,
  });
}
