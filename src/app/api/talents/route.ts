import { getDocuments } from "@/firebase";
import { NextRequest, NextResponse } from "next/server";
import { getTalents } from "../../../../utils/getTalents";

export async function GET(req: NextRequest) {
  const tubylytylkofigi = req.nextUrl.searchParams.get("tubylytylkofigi");
  const pseudo = req.nextUrl.searchParams.get("pseudo");

  // Validate API secret key
  if (tubylytylkofigi !== process.env.API_SECRET_KEY) {
    return new NextResponse("not found", { status: 404 });
  }

  try {
    // Fetch documents from the "users" collection
    const talents = await getTalents();

    // Filter users where seek === true
    const filteredTalents = talents.find((talent) => talent?.pseudo === pseudo);
    // Return the filtered list of users as a JSON response
    return NextResponse.json(filteredTalents);
  } catch (error) {
    // Handle any potential errors during the process
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
