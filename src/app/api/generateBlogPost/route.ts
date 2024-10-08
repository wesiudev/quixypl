import { NextRequest, NextResponse } from "next/server";
import { createChat } from "completions";

export async function GET(req: NextRequest) {
  const topic = req.nextUrl.searchParams.get("topic");

  const chat = createChat({
    apiKey: "sk-proj-m5F97TxvGplJe3a2yfloT3BlbkFJG1TEpMpZ3ms6QfONLsMT",
    model: "gpt-4",
  });

  await chat.sendMessage("Ping");
  const response = await chat.sendMessage(
    `Generujesz posta na bloga, przykład podany pod kątem długości, nie sugeruj się podanym kontentem i utwórz post na temat ${topic}.`,
    {
      expect: {
        examples: [
          {
            title: "Jak działa algorytm TikToka",
            shortDesc:
              "Poznaj tajniki algorytmu TikToka i dowiedz się, jak działa mechanizm rekomendacji treści na tej popularnej platformie.",
            text1Title: "Wstęp",
            text1Desc: `
              TikTok stał się jedną z najpopularniejszych platform społecznościowych na świecie. Kluczowym elementem jego sukcesu jest zaawansowany algorytm rekomendacji, który dostarcza użytkownikom treści dostosowane do ich zainteresowań.
            `,
            text2Title: "Jak działa algorytm TikToka?",
            text2Desc: `
              Podstawowe zasady
              Algorytm TikToka analizuje zachowania użytkowników, aby zrozumieć ich preferencje. Uwzględnia następujące czynniki:              
                Interakcje użytkownika: polubienia, komentarze, udostępnienia, a także czas oglądania filmów.
                Informacje o filmie: hashtagi, opisy, dźwięki i treść wideo.
                Ustawienia konta i urządzenia: język, lokalizacja, typ urządzenia.
              
            `,
            text3Title: "Dlaczego algorytm TikToka jest wyjątkowy?",
            text3Desc: `
              TikTok wyróżnia się na tle innych platform dzięki unikalnemu podejściu do rekomendacji treści. Algorytm nie tylko prezentuje popularne wideo, ale również pomaga odkrywać nowe treści, które mogą być interesujące dla użytkownika, co zwiększa zaangażowanie.
            `,
            text4Title: "Jak algorytm TikToka wpływa na twórców?",
            text4Desc: `
              Dzięki algorytmowi TikToka, twórcy treści mają szansę dotrzeć do szerokiego grona odbiorców, nawet jeśli nie mają jeszcze dużej liczby obserwujących. To otwiera przed nimi nowe możliwości, pozwalając na szybki wzrost popularności.
            `,
            googleTitle:
              "Algorytm TikToka - jak działa i dlaczego jest wyjątkowy?",
            googleDescription:
              "Dowiedz się, jak działa algorytm TikToka, jakie czynniki uwzględnia i dlaczego jest tak skuteczny w rekomendowaniu treści.",
            googleKeywords:
              "algorytm TikTok, jak działa algorytm TikTok, TikTok rekomendacje",
            url: "algorytm-tiktoka-jak-dziala",
            urlLabel: "Dowiedz się więcej o algorytmie TikToka",
          },
        ],
        properties: {
          response: {
            title: "string",
            shortDesc: "string",
            text1Title: "string",
            text1Desc: "string",
            text2Title: "string",
            text2Desc: "string",
            text3Title: "string",
            text3Desc: "string",
            text4Title: "string",
            text4Desc: "string",
            googleTitle: "string",
            googleDescription: "string",
            googleKeywords: "string",
            url: "string",
            urlLabel: "string",
          },
        },

        schema: {
          additionalProperties: true,
          type: "object",
          properties: {
            response: {
              type: "object",
            },
          },
          required: [
            "title",
            "shortDesc",
            "text1Title",
            "text1Desc",
            "text2Title",
            "text2Desc",
            "text3Title",
            "text3Desc",
            "text4Title",
            "text4Desc",
            "googleTitle",
            "googleDescription",
            "googleKeywords",
            "url",
            "urlLabel",
          ],
        },
      },
    }
  );

  return NextResponse.json(response.content);
}
