"use server";
export async function getServices() {
  const services = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/services?tubylytylkofigi=${process.env.API_SECRET_KEY}`,
    { next: { revalidate: 60 } }
  ).then((res: any) => res.json());
  return services;
}
