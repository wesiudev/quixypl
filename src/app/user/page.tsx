import { Metadata } from "next";
import User from "./User";

export const metadata: Metadata = {
  title: "Panel administracyjny",
};

export default function Page() {
  return (
    <div>
      <User />
    </div>
  );
}
