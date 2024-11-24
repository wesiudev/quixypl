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
    const prompt = `You are helping to create more content for the website. In the example response instead of "{{give value}}" you should put the satysfying value. You should create description for the questiion: Ile zarabiają specjaliści na stanowisku ${position}. Use Polish language and return html like in the example responses:{
      "content": "<div>
  <h2>Jakie są główne zadania i wynagrodzenie specjalistów ds. tworzenia gier mobilnych?</h2>
  <p>Specjaliści zajmujący się tworzeniem gier mobilnych odgrywają kluczową rolę w projektowaniu, rozwijaniu i wdrażaniu gier na urządzenia mobilne. Ich obowiązki obejmują:</p>
  <ul>
    <li>Projektowanie mechaniki gry, grafiki, animacji i dźwięków, aby zapewnić graczom wyjątkowe wrażenia,</li>
    <li>Programowanie gier w silnikach takich jak Unity, Unreal Engine czy Godot,</li>
    <li>Optymalizację gier pod kątem wydajności i łatwości użytkowania na różnych platformach,</li>
    <li>Testowanie gier w celu zapewnienia płynności rozgrywki oraz eliminacji błędów,</li>
    <li>Integrację systemów zakupów w aplikacji oraz reklam, co wspiera modele monetyzacji gier.</li>
  </ul>
  <h3>Zarobki na stanowisku specjalisty ds. tworzenia gier mobilnych</h3>
  <p>Wynagrodzenie specjalistów zależy od ich doświadczenia oraz wielkości firmy. Poniżej przedstawiono przykładowe przedziały zarobków:</p>
  <ul>
    <li><strong>Junior:</strong> od {{give value}} do {{give value}} PLN brutto miesięcznie,</li>
    <li><strong>Medior (Mid-level):</strong> od {{give value}} do {{give value}} PLN brutto miesięcznie,</li>
    <li><strong>Senior:</strong> od {{give value}} do {{give value}} PLN brutto miesięcznie lub więcej przy projektach dużej skali (AAA).</li>
  </ul>
  <p>Warto również zauważyć, że w branży gier mobilnych często oferowane są bonusy zależne od sukcesu projektu lub udziału w zyskach firmy, co dodatkowo zwiększa atrakcyjność tej ścieżki zawodowej.</p>
</div>"
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
