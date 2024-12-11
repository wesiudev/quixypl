import { Metadata } from "next";
import DashboardUnderMenu from "./DashboardUnderMenu";
import UserPanel from "@/components/UserPanel";

export const metadata: Metadata = {
  title: "Panel administracyjny",
};

export default async function Page() {
  return (
    <div>
      <UserPanel />
      <DashboardUnderMenu />
    </div>
  );
}
