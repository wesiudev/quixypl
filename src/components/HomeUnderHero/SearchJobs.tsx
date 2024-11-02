import Link from "next/link";

export default function SearchJobs() {
  return (
    <div className="flex flex-col">
      <h2 className="text-white bg-gradient-to-r from-primary to-cta mb-6 w-max px-3.5 py-2 text-2xl font-coco font-extrabold">
        <Link title="Szukaj pracy zdalnej" href="/praca-zdalna">
          Praca Zdalna
        </Link>
      </h2>
      <div className="flex flex-row">
        <h1 className="font-coco text-lg max-w-lg font-bold text-zinc-800 drop-shadow-md shadow-black">
          Szukaj pracy zdalnej lub dodaj ofertę pracy skierowaną do naszych
          freelancerów
        </h1>
      </div>
    </div>
  );
}
