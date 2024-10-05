import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";
import VerifyEmail from "./VerifyEmail";
import { Metadata } from "next";

export default async function Page({ params }: { params: { uid: string } }) {
  const user = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/users/getUser?secret=${process.env.API_SECRET_KEY}&uid=${params.uid}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      cache: "no-store",
    }
  ).then((res) => res.json());
  if (!user) {
    return (
      <div className="bg-gradient-to-br from-zinc-300 via-zinc-100 to-zinc-300 flex flex-col items-center justify-center text-zinc-800 h-screen left-0 top-0 w-screen">
        <h1 className="text-3xl font-bold text-center">Wystąpił błąd</h1>
        <Link
          href="/"
          className="text-zinc-800 font-bold text-xl flex flex-row items-center relative z-50"
        >
          <FaArrowLeft className="mr-2" />
          Powrót
        </Link>
      </div>
    );
  }
  return (
    <div className="text-center">
      <div className="bg-white w-full h-screen flex items-center justify-center flex-col left-0 top-0">
        <VerifyEmail userId={user?.uid} />
      </div>
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
  title: "Przetwarzanie danych...",
  description:
    "Zatrudnij ekspertów z branży IT, marketingu, designu i innych dziedzin. Znajdź specjalistów w Quixy Talent™ i rozwijaj swój biznes już dziś!",
};
