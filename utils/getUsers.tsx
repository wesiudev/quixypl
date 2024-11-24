"use server";
export async function getUser(id: any) {
  const req = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/user?id=${JSON.stringify(
      id
    )}&tubylytylkofigi=${process.env.API_SECRET_KEY}`,
    {
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      method: "POST",
    }
  );
  const data = req.json();
  return data;
}
