import Chat from "@/components/Dashboard/Chat/Chat";
import { Providers } from "@/redux/Provider";
import DashboardHeader from "@/components/Dashboard/DashboardHeader";
import DashboardUser from "../DashboardUser";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-[#126b91]">
      <Providers>
        <DashboardUser />
        <Chat />
        <div className="sticky top-0 left-0 z-[999999]">
          <DashboardHeader />
        </div>
        <div className="lg:pl-[30rem]">{children}</div>
      </Providers>
    </div>
  );
}
