import { NextRequest, NextResponse } from "next/server";
import { getDocuments } from "@/firebase";
import { polishToEnglish } from "../../../../utils/polishToEnglish";

export async function GET(request: NextRequest) {
  const tubylytylkofigi = request.nextUrl.searchParams.get("tubylytylkofigi");
  const category = request.nextUrl.searchParams.get("category");

  // Validate API secret key
  if (tubylytylkofigi !== process.env.API_SECRET_KEY) {
    return NextResponse.json("not found", { status: 404 });
  }

  try {
    const req: any = await getDocuments("offers");
    if (category) {
      const jobOffers = req.filter(
        (jobOffer: any) => polishToEnglish(jobOffer?.job) === category
      );
      return NextResponse.json(jobOffers);
    } else {
      return NextResponse.json(req);
    }
  } catch (error) {
    // Handle any potential errors during the process
    return NextResponse.json("-", { status: 500 });
  }
}
