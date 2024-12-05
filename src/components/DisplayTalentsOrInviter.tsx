import Image from "next/image";
import Link from "next/link";
import { FaPlusCircle } from "react-icons/fa";
import { TfiFlagAlt } from "react-icons/tfi";

export default function DisplayTalentsOrInviter({ data }: { data: any }) {
  return (
    <div
      className={`${
        data.length > 0 &&
        "w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3"
      }`}
    >
      {data.length > 0 ? (
        data?.map((talent: any, i: number) => (
          <Link
            key={talent?.pseudo}
            href={`/talent/${talent.pseudo}`}
            className="flex p-3 hover:shadow-md duration-200 hover:scale-[1.03] hover:shadow-cta bg-white"
          >
            {talent?.photoURL ? (
              <div className="relative min-w-16 h-16 aspect-square rounded-full overflow-hidden">
                <Image
                  src={talent?.photoURL}
                  width={224}
                  height={224}
                  alt={`Zdjęcie talentu ${talent?.name || talent?.pseudo}`}
                  className="absolute inset-0 object-cover h-full duration-500"
                />
              </div>
            ) : (
              <span
                style={{ boxShadow: "0px 0px 4px black" }}
                className="w-12 md:w-24 aspect-square rounded-full mr-2 flex items-center justify-center text-2xl text-primary"
              >
                {talent?.pseudo && talent?.pseudo[0]?.toUpperCase()}
              </span>
            )}
            <div className="px-3 flex flex-col">
              <h2 className="text-lg font-extrabold text-black">
                {talent?.name}
              </h2>
              <h3 style={{ lineHeight: 1.7 }}>
                <span className="text-sm xl:text-base p-1 w-max max-w-full text-white bg-gradient-to-r from-primary to-cta">
                  {talent?.title}
                </span>
              </h3>
              <h3 className="text-black">{talent?.city}</h3>
            </div>
          </Link>
        ))
      ) : (
        <div className="flex flex-col w-full items-center justify-center mt-3">
          <div className="w-full flex flex-col items-center justify-center text-center px-4">
            <div className="bg-gradient-to-r from-primary to-cta rounded-full aspect-square mx-auto w-32 flex items-center justify-center">
              <TfiFlagAlt className="text-white text-4xl" />
            </div>
            <p className="max-w-sm  text-black p-3">
              Brak specjalistów - skonfiguruj profil i wyświetl się jako
              pierwszy/a{" "}
            </p>
          </div>
          <Link
            href="/register"
            className="animate-pulse rounded-xl w-max font-gotham font-light  bg-cta hover:bg-opacity-90 duration-300 text-white text-sm lg:text-base p-2 py-1.5 text-center"
          >
            Przejdź do panelu
          </Link>
        </div>
      )}
      {data.length > 0 && (
        <Link
          href={`/register`}
          className="flex p-3 hover:shadow-md duration-200 hover:scale-[1.03] hover:shadow-cta bg-gradient-to-r from-primary to-cta "
        >
          <span className="mr-2 flex text-2xl text-white">
            <FaPlusCircle className="w-16 h-16" />
          </span>

          <div className="px-3 flex flex-col text-white">
            <h2 className="text-lg font-extrabold">Wolne miejsce</h2>
            <h3 className="">
              Skonfiguruj profil na naszej platformie i wyświetlaj swoje usługi
            </h3>
            <p className="text-white bg-cta px-3 py-1.5 w-max max-w-full mt-1">
              Do rejestracji!
            </p>
          </div>
        </Link>
      )}
    </div>
  );
}
