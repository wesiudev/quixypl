"use client";
import dynamic from "next/dynamic";
const Settings = dynamic(
  () => import("@/components/Dashboard/Settings/Settings"),
  { ssr: false }
);

export default function Page() {
  return (
    <div>
      <Settings />
    </div>
  );
}
