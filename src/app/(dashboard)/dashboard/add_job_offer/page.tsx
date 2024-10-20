import AddJobOffer from "@/components/AddJobOffer/AddJobOffer";
import { Metadata } from "next";

export default async function Page() {
  return (
    <div>
      <AddJobOffer />
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
  title: "Dodajesz Ofertę Pracy Zdalnej - Panel Użytkownika",
  description:
    "Zatrudnij ekspertów z branży IT, marketingu, designu i innych dziedzin. Znajdź specjalistów w Quixy Talent™ i rozwijaj swój biznes już dziś!",
};
