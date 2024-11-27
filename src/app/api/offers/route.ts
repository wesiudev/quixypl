import { NextRequest, NextResponse } from "next/server";
import { fetchJobOffers, getDocuments } from "@/firebase";

export async function GET(req: NextRequest) {
  const tubylytylkofigi = req.nextUrl.searchParams.get("tubylytylkofigi");
  const category = req.nextUrl.searchParams.get("category");

  // Validate API secret key
  if (tubylytylkofigi !== process.env.API_SECRET_KEY) {
    return NextResponse.json("not found", { status: 404 });
  }

  try {
    const req: any = await getDocuments("offers");
    const jobOffers = req.filter((jobOffer: any) => jobOffer?.job === category);
    return NextResponse.json(jobOffers);
  } catch (error) {
    // Handle any potential errors during the process
    return NextResponse.json("-", { status: 500 });
  }
}
