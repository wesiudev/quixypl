import { NextRequest, NextResponse } from "next/server";
import { fetchJobOffers } from "@/firebase";

export async function POST(req: NextRequest) {
  const tubylytylkofigi = req.nextUrl.searchParams.get("tubylytylkofigi");
  const category = req.nextUrl.searchParams.get("category");

  // Validate API secret key
  if (tubylytylkofigi !== process.env.API_SECRET_KEY) {
    return new NextResponse("not found", { status: 404 });
  }

  try {
    const jobOffers = await fetchJobOffers();

    return NextResponse.json(jobOffers);
  } catch (error) {
    // Handle any potential errors during the process
    return new NextResponse("-", { status: 500 });
  }
}
