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
    const prompt = `You are helping to create more content for the website. You should create description for the questiion: Czym zajmują się specjaliści na stanowisku ${position}. You should return a list of objects with 3 properties: minimum, average, and high. EXAMPLE: {content:"Ile zarabia specjalista w Agencji Kreatywnej? Poznaj potencjał zarobkowy w branży mobilnych gier!
Tworzenie gier mobilnych to dynamiczny sektor rynku technologicznego, który przyciąga zarówno młodych pasjonatów, jak i doświadczonych profesjonalistów. Specjalista na stanowisku Agencji Kreatywnej odgrywa kluczową rolę w procesie powstawania gier, obejmując szeroki zakres zadań:
Projektowanie mechaniki gry – od innowacyjnych koncepcji po szczegóły rozgrywki, specjaliści kreują wyjątkowe doświadczenia dla graczy.
Tworzenie grafiki i animacji – wizualna strona gier mobilnych wymaga artystycznego wyczucia i znajomości narzędzi takich jak Blender czy Photoshop.
Programowanie gier – silniki jak Unity, Unreal Engine czy Godot to podstawowe narzędzia w arsenale profesjonalisty.
Optymalizacja i testowanie – specjalista dba o płynność działania gry na różnych urządzeniach oraz eliminuje błędy.
Integracja systemów monetyzacji – współczesne gry często korzystają z modelu freemium, co oznacza wbudowanie systemów reklam i zakupów w aplikacji.
Jakie są zarobki na stanowiskach w Agencjach Kreatywnych?
Wynagrodzenie zależy od doświadczenia, lokalizacji i zakresu obowiązków. Średnie zarobki wahają się:
Junior: od 5 000 do 8 000 PLN brutto miesięcznie,
Mid-level: od 8 000 do 15 000 PLN,
Senior: nawet do 25 000 PLN lub więcej w większych firmach lub przy projektach AAA.
Warto pamiętać, że zarobki w branży gier mobilnych mogą również obejmować bonusy za sukcesy projektu oraz udział w zyskach.
Dlaczego warto rozwijać się w tej dziedzinie?
Rynek gier mobilnych rozwija się w zawrotnym tempie – według raportów w 2024 roku sektor ten osiągnie wartość ponad 100 miliardów dolarów. Specjaliści w tej branży mają okazję nie tylko dobrze zarabiać, ale też realizować projekty, które trafiają do milionów użytkowników na całym świecie.
Chcesz zacząć swoją przygodę w branży gier mobilnych? Rozwijaj swoje umiejętności programistyczne, graficzne i kreatywne, a droga do sukcesu stoi otworem! "}
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
