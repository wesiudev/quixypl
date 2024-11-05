import Link from "next/link";

export default function SearchJobs() {
  return (
    <div className="flex flex-col">
      <h2 className="text-white w-max text-5xl font-extrabold">
        <Link title="Szukaj pracy zdalnej" href="/praca-zdalna">
          Praca Zdalna
        </Link>
      </h2>
      <div className="flex flex-row">
        <h1 className="max-w-xl text-white">
          <span className="italic">Freelancer Job Boards</span> – Praca zdalna,
          profile freelancerów i projekty do zrealizowania!
        </h1>
      </div>
    </div>
  );
}
