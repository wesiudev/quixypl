import { Metadata } from "next";
import User from "./User";
import DashboardUnderMenu from "./DashboardUnderMenu";
import UserPanel from "@/components/UserPanel";
import Settings from "@/components/Dashboard/Settings/Settings";

export const metadata: Metadata = {
  title: "Panel administracyjny",
};

export default function Page() {
  return (
    <div>
      {/* <Settings /> */}
      <UserPanel />
      <DashboardUnderMenu />
      <User />
    </div>
  );
}
