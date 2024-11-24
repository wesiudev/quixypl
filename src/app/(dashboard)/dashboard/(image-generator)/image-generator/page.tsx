import dynamic from "next/dynamic";

const ImageGenerator = dynamic(() => import("@/components/ImageGenerator"), {
  ssr: false,
});

export default function Page() {
  return <ImageGenerator />;
}

export const metadata = {
  title: "Generator Obrazów - Panel użytkownika Quixy",
};
