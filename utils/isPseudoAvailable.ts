"use server";
export async function isPseudoAvailable(localPseudo: string) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/checkPseudo?pseudo=${localPseudo}&tubylytylkofigi=${process.env.API_SECRET_KEY}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      cache: "no-store",
    }
  );
  console.log(response);
  const data = response.json();
  return data;
}
