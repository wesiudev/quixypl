import { fetchOffers } from "@/firebase";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const tubylytylkofigi = req.nextUrl.searchParams.get("tubylytylkofigi");
  const cat = req.nextUrl.searchParams.get("cat");
  if (tubylytylkofigi !== process.env.API_SECRET_KEY) {
    return new NextResponse("not found", { status: 404 });
  }
  try {
    const offers = await fetchOffers();

    return NextResponse.json(offers);
  } catch (error) {
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
