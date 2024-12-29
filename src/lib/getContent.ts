"use server";
export async function getContent(slug: any) {
  const posts = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/content/${slug}`,
    { next: { revalidate: 600 } }
  ).then((res: any) => res.json());
  return posts;
}
