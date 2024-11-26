import Header from "@/components/Header";
import jobs from "../../../public/14.09.2024.json";
import MainFooter from "@/components/MainFooter";
import Chat from "@/components/user/Chat/Chat";
export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="">
      <Header jobsList={jobs} />
      {children}
      <Chat />
      <MainFooter jobsList={jobs} />
    </div>
  );
}
