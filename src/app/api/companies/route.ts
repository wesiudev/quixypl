import { getDocuments } from "@/firebase";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const tubylytylkofigi = req.nextUrl.searchParams.get("tubylytylkofigi");
  if (tubylytylkofigi !== process.env.API_SECRET_KEY) {
    return new NextResponse("not found", { status: 404 });
  }
  const users = await getDocuments("users");
  const companies = users.filter(
    (user) =>
      !user?.seek &&
      user?.seek !== "ask" &&
      user?.emailVerified &&
      user?.pseudo &&
      user?.configured &&
      user?.name &&
      user?.access
  );
  return NextResponse.json(companies);
}
