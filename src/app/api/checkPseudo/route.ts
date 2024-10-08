import { getUsers } from "@/firebase";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const tubylytylkofigi = req.nextUrl.searchParams.get("tubylytylkofigi");
  const pseudo = req.nextUrl.searchParams.get("pseudo");

  if (!tubylytylkofigi || tubylytylkofigi !== process.env.API_SECRET_KEY) {
    return NextResponse.json({ error: "Error" }, { status: 500 });
  }
  try {
    const users = await getUsers();
    const user = users.find((user) => user?.pseudo === pseudo);
    if (!user) {
      return NextResponse.json({ available: true });
    } else {
      return NextResponse.json({ available: false });
    }
  } catch (error) {
    console.error("Error", error);
    return NextResponse.json({ error: "Error" }, { status: 500 });
  }
}
