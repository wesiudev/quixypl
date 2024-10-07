import Link from "next/link";

export default function SearchJobs() {
  return (
    <div className="flex flex-col">
      <h2
        style={{ textShadow: "0px 2px 2px #000000" }}
        className="text-cta mb-6 text-4xl lg:text-6xl font-coco font-extrabold"
      >
        <a href="/praca-zdalna">Quixy Talent&trade;</a>
      </h2>
      <div className="flex flex-row">
        <h1 className="font-gotham text-2xl md:text-3xl lg:text-4xl font-bold text-black drop-shadow-md shadow-black">
          Dodaj ofertę lub szukaj pracy zdalnej
        </h1>
      </div>
    </div>
  );
}
