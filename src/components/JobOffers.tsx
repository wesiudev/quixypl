import Link from "next/link";
import { TfiFlagAlt } from "react-icons/tfi";

export default function JobOffers({
  content,
  categoryUrl,
}: {
  content: any;
  categoryUrl: any;
}) {
  return (
    <div>
      {" "}
      <div className="px-4">
        <div className="rounded-3xl p-3 bg-gradient-to-r from-primary/20 to-cta/20 container mx-auto my-12">
          <div className="bg-gradient-to-r from-primary to-cta rounded-full aspect-square mx-auto w-32 flex items-center justify-center">
            <TfiFlagAlt className="text-white text-4xl animate-bounce" />
          </div>

          <p className="font-light text-black text-base font-gotham mt-3 text-center max-w-xl mx-auto">
            Brak aktywnych ofert pracy zdalnej dla specjalistów w branży{" "}
            {content?.genitive}
          </p>
          <h3 className="flex flex-col text-white p-2 font-gotham font-light text-center mx-auto max-w-[332px] group">
            <Link
              href="/register"
              className="rounded-2xl bg-[#14a800] p-2 duration-100 group-hover:bg-opacity-80"
            >
              Bądź szybszy/a i dodaj ogłoszenie
            </Link>
            <Link
              href="/register"
              className="rounded-b-2xl bg-[#14a800] w-max max-w-[100%] mx-auto p-2 px-4 duration-100 group-hover:bg-opacity-80"
            >
              o pracę już dziś!
            </Link>
          </h3>
        </div>
      </div>
    </div>
  );
}
