"use server";
export async function getUsers() {
  const posts = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/users?tubylytylkofigi=${process.env.API_SECRET_KEY}`,
    { next: { revalidate: 6000 } }
  ).then((res: any) => res.json());
  return posts;
}
