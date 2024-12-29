export async function getPosts() {
  const posts = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/posts?tubylytylkofigi=${process.env.API_SECRET_KEY}`
  ).then((res: any) => res.json());
  return posts;
}
