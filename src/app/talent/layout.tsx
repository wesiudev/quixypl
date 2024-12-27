import MainFooter from "@/components/MainFooter";
import Chat from "@/components/Dashboard/Chat/Chat";
export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jobs = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/jobs?tubylytylkofigi=${process.env.API_SECRET_KEY}`,
    {
      next: { revalidate: 600 },
    }
  ).then((res) => res.json());
  return (
    <div>
      {children}
      <Chat />
      <MainFooter jobsList={jobs} />
    </div>
  );
}
