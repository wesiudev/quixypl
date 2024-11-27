import { NextRequest, NextResponse } from "next/server";
import { OpenAI } from "openai";
export const revalidate = 0;
const openai = new OpenAI({
  organization: "org-33Zg7MbY4ION1Emx89iluRp0",
  project: "proj_QKtnnRnF9OosRuZUSruWqLdW",
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: NextRequest) {
  const additional = req.nextUrl.searchParams.get("additional");
  const place = req.nextUrl.searchParams.get("place");
  const product = req.nextUrl.searchParams.get("product");
  const investment = req.nextUrl.searchParams.get("investment");
  const tubylytylkofigi = req.nextUrl.searchParams.get("tubylytylkofigi");

  if (!tubylytylkofigi || tubylytylkofigi !== process.env.API_SECRET_KEY) {
    return NextResponse.json({ error: "Error" }, { status: 500 });
  }
  try {
    const prompt = `Use polish language. Generate a business idea based on the following details: additional: ${additional}, place: ${place}, user has product?: ${product} users' budget to start a new business: ${investment}.
    Your response should be in the following format:
    {
      "name": "your idea title here",
      "content": "your idea content here"
      "marketing": "your idea marketing here",
      "businessplan":"your idea businessplan here",
      "staff":"your idea staff here personel here",
      "estimatedRealizationTime": "estimate realization time here",
      "tags": "create tags array string[] for idea concept"
    }
    `;

    const response = await openai.completions.create({
      model: "gpt-3.5-turbo-instruct",
      prompt,
      max_tokens: 2500,
      n: 1,
      stop: null,
      temperature: 0.7,
    });
    return NextResponse.json({ ...response });
  } catch (error) {
    console.error("Error", error);
    return NextResponse.json({ error: "Error" }, { status: 500 });
  }
}
