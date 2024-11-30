"use client";
import dynamic from "next/dynamic";

const AddJobOffer = dynamic(
  () => import("@/components/AddJobOffer/AddJobOffer"),
  { ssr: false }
);

export default function Page() {
  return (
    <div>
      <AddJobOffer />
    </div>
  );
}
