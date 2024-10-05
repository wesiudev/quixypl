import { getTalents } from "../../../../utils/getTalents";

export default async function Page({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const talents = await getTalents();
  return <div>{params.slug}</div>;
}
