import Contact from "@/components/Contact";
import { Metadata } from "next";

export default async function Page() {
  return <Contact />;
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
  title:
    "Quixy | Praca Zdalna | Zatrudnij freelancerów | Skontaktuj się z nami",
  description:
    "Zatrudnij ekspertów z branży IT, marketingu, designu i innych dziedzin. Znajdź specjalistów w Quixy Talent™ i rozwijaj swój biznes już dziś!",
};
