import Link from "next/link";

export default function SearchJobs() {
  return (
    <div className="flex flex-col">
      <h2 className="text-white w-max text-5xl font-extrabold">
        <Link title="Szukaj pracy zdalnej" href="/praca-zdalna">
          Praca zdalna dla freelancerów i firm
        </Link>
      </h2>
      <div className="flex flex-row">
        <h2 className="mt-3 max-w-xl text-white">
          Zatrudniaj specjalistów lub realizuj zlecenia – Twój sukces zaczyna
          się tutaj!
        </h2>
      </div>
    </div>
  );
}
