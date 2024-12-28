import MainFooter from "@/components/MainFooter";
import Chat from "@/components/Dashboard/Chat/Chat";
export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jobs = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/jobs?tubylytylkofigi=${process.env.API_SECRET_KEY}`
  ).then((res) => res.json());
  return (
    <div className="">
      {children}
      <Chat />
      <MainFooter jobsList={jobs} />
    </div>
  );
}
