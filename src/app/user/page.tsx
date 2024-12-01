import { Metadata } from "next";
import User from "./User";
import DashboardUnderMenu from "./DashboardUnderMenu";
import UserPanel from "@/components/UserPanel";

export const metadata: Metadata = {
  title: "Panel administracyjny",
};

export default function Page() {
  return (
    <div>
      {/* <UserPanel /> */}
      <DashboardUnderMenu />
      <User />
    </div>
  );
}
