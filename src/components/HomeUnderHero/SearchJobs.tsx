import Link from "next/link";

export default function SearchJobs() {
  return (
    <div className="flex flex-col">
      <h2 className="text-white bg-gradient-to-r from-primary to-cta mb-6 w-max rounded-lg px-3.5 py-2 text-4xl font-coco font-extrabold">
        <Link title="Szukaj pracy zdalnej" href="/praca-zdalna">
          Quixy Talent
        </Link>
      </h2>
      <div className="flex flex-row">
        <h1 className="font-gotham text-lg lg:text-2xl font-bold text-black drop-shadow-md shadow-black">
          Szukaj pracy zdalnej lub dodaj ofertę
        </h1>
      </div>
    </div>
  );
}
