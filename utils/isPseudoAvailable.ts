export async function isPseudoAvailable(localPseudo: string) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/checkPseudo?pseudo=${localPseudo}&tubylytylkofigi=${process.env.API_SECRET_KEY}`,
    {
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      method: "GET",
    }
  );
  const data = response.json();
  return data;
}
