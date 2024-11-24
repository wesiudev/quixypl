import dynamic from "next/dynamic";
import { Metadata } from "next";

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

export const metadata: Metadata = {
  publisher: "wesiu.dev",
  manifest: "/manifest.json",
  authors: [
    {
      name: "wesiudev",
      url: "https://wesiudev.com",
    },
  ],
  verification: {
    google: "google85185d3abec28326.html",
  },
  title: `Zlecenia i aplikacje - Panel Użytkownika`,
  description: "Przeglądaj swoje zlecenia i aplikacje na twoje oferty pracy",
};
