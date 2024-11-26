"use server";

export async function getStripeCheckoutByQuixyPacket(uid: any, packet: string) {
  const req = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/stripe/getStripeCheckoutByQuixyPacket?uid=${uid}&packet=${packet}&tubylytylkofigi=${process.env.API_SECRET_KEY}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      cache: "no-store",
    }
  );

  const data = req.json();

  return data;
}
