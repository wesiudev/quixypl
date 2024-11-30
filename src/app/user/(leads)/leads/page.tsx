"use client";
import dynamic from "next/dynamic";
const LeadsList = dynamic(() => import("@/components/LeadsList"), {
  ssr: false,
});
export default function Page() {
  return (
    <div>
      <LeadsList />
    </div>
  );
}
