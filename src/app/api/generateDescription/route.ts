import { NextRequest, NextResponse } from "next/server";
import { OpenAI } from "openai";
export const revalidate = 0;
const openai = new OpenAI({
  organization: "org-33Zg7MbY4ION1Emx89iluRp0",
  project: "proj_QKtnnRnF9OosRuZUSruWqLdW",
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: NextRequest) {
  const tubylytylkofigi = req.nextUrl.searchParams.get("tubylytylkofigi");
  const position = req.nextUrl.searchParams.get("position");

  if (!tubylytylkofigi || tubylytylkofigi !== process.env.API_SECRET_KEY) {
    return NextResponse.json({ error: "Error" }, { status: 500 });
  }
  try {
    const prompt = `You are helping to create more content for the website. You should create description for the questiion: Czym zajmują się specjaliści na stanowisku ${position}. Use Polish language and return html like in the example responses:{
      "content": "<p>Specjaliści w tworzeniu gier mobilnych koncentrują się na projektowaniu, rozwijaniu i wdrażaniu gier na urządzenia mobilne. Do ich zadań należy:</p><ul><li>Projektowanie mechaniki gry, grafiki, animacji i dźwięków,</li><li>Programowanie gier w silnikach takich jak Unity, Unreal Engine czy Godot,</li><li>Optymalizacja gier pod kątem wydajności i użyteczności na różnych platformach,</li><li>Testowanie gier, zapewnienie płynności rozgrywki i usuwanie błędów,</li><li>Integracja gier z systemami zakupów w aplikacji oraz reklamami.&nbsp;</li></ul>"
    }
    `;
    const response = await openai.completions.create({
      model: "gpt-3.5-turbo-instruct",
      prompt,
      max_tokens: 2500,
      n: 1,
      stop: null,
      temperature: 0.5,
    });
    return NextResponse.json(response);
  } catch (error) {
    console.error("Error", error);
    return NextResponse.json({ error: "Error" }, { status: 500 });
  }
}
