import { Providers } from "@/redux/Provider";
import Loading from "@/app/loading";
import Chat from "@/components/Dashboard/Chat/Chat";
import DashboardHeader from "@/components/Dashboard/DashboardHeader";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="bg-[#126b91]">
        <Providers>
          <Chat />
          <div className="sticky top-0 left-0 z-[999999]">
            <DashboardHeader />
          </div>
          <div className="lg:pl-[30rem]">{children}</div>
          <Loading />
        </Providers>
      </div>
    </>
  );
}
