import dynamic from "next/dynamic";
const NewService = dynamic(() => import("@/components/NewService"), {
  ssr: false,
});

export default function Page() {
  return <NewService />;
}
