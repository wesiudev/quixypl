import Chat from "@/components/Dashboard/Chat/Chat";
import { Providers } from "@/redux/Provider";
import DashboardHeader from "@/components/Dashboard/DashboardHeader";
export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const users = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/users/get`);
  return (
    <>
      <div className="bg-[#126b91]">
        <Providers>
          <DashboardHeader users={users} />
          <div className="flex">
            <Chat />
            <div className="w-full h-screen">{children}</div>
          </div>
        </Providers>
      </div>
    </>
  );
}
