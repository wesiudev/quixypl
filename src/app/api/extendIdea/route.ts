import { getIdea } from "@/firebase";
import { NextRequest, NextResponse } from "next/server";
import { OpenAI } from "openai";
export const revalidate = 0;
const openai = new OpenAI({
  organization: "org-33Zg7MbY4ION1Emx89iluRp0",
  project: "proj_QKtnnRnF9OosRuZUSruWqLdW",
  apiKey: process.env.OPENAI_API_KEY,
});
export async function POST(req: NextRequest) {
  const userRequestedData = req.nextUrl.searchParams.get("tubylytylkofigi");
  const ideaId = req.nextUrl.searchParams.get("ideaId");
  const userId = req.nextUrl.searchParams.get("userId");
  const tubylytylkofigi = req.nextUrl.searchParams.get("tubylytylkofigi");
  const businessInformation = await getIdea(userId, ideaId);
  if (!tubylytylkofigi || tubylytylkofigi !== process.env.API_SECRET_KEY) {
    return NextResponse.json({ error: "Error" }, { status: 500 });
  }

  try {
    const prompt = `Pisz po polsku. Rozwijasz pomysł na biznes użytkownika Quixy.pl, który później może być wystawiony jako oferta "pracy" na naszej stronie przez użytkownika. Jeśli pomysł opiewa o www, daj mu dwie propozycje linka .pl, jeśli w informacjach o biznesie informacji jeszcze nie zaproponowałeś w dotychczas wygenerowanym pomyśle: (${businessInformation.toString()}), wiedząc to, wygeneruj dla użytkownika (${userRequestedData}). example response:{
    "name": string,
    "content": string,
}`;

    const response = await openai.completions.create({
      model: "gpt-3.5-turbo-instruct",
      prompt,
      max_tokens: 2500,
      n: 1,
      stop: null,
      temperature: 0.7,
    });
    return NextResponse.json(response);
  } catch (error) {
    console.error("Error", error);
    return NextResponse.json({ error: "Error" }, { status: 500 });
  }
}
