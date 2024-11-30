import dynamic from "next/dynamic";
const Postings = dynamic(() => import("@/components/Postings/Postings"), {
  ssr: false,
});
export default function Page() {
  return (
    <div>
      <Postings />
    </div>
  );
}
