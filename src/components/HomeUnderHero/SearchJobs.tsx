import Link from "next/link";

export default function SearchJobs() {
  return (
    <div className="flex flex-col">
      <h2
        style={{ textShadow: "0px 2px 2px #000000" }}
        className="text-orange-500 mb-6 text-4xl lg:text-6xl font-coco font-extrabold"
      >
        <a href="/praca-zdalna">Quixy Talent&trade;</a>
      </h2>
      <div className="flex flex-row">
        <h2 className="font-cardo text-2xl md:text-3xl lg:text-4xl font-bold text-zinc-800 drop-shadow-md shadow-black">
          Realizuj projekty lub znajdź pracę zdalną
        </h2>
      </div>
      <div className="text-zinc-500 mt-3 text-lg font-gotham font-light">
        Przeglądaj listę projektów
        <Link
          href="/marketplace"
          style={{ boxShadow: "0px 0px 4px #000" }}
          className="bg-orange-500 text-white py-1 px-3 rounded-md font-bold underline ml-2"
        >
          Zobacz Oferty
        </Link>
      </div>
    </div>
  );
}
