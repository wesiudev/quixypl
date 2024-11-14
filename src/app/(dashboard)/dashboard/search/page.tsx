import Search from "@/components/Search";
import { Metadata } from "next";
export default async function Page() {
  return <Search />;
}
export const metadata: Metadata = {
  publisher: "quixy.pl",
  manifest: "/manifest.json",
  authors: [
    {
      name: "quixy",
      url: "https://quixy.pl",
    },
  ],
  verification: {
    google: "google85185d3abec28326.html",
  },
  title: `Wyszukiwarka - Panel Użytkownika`,
  description:
    "Zatrudnij ekspertów z branży IT, marketingu, designu i innych dziedzin. Znajdź specjalistów w Quixy Talent™ i rozwijaj swój biznes już dziś!",
};
