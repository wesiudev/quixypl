import Image from "next/image";
import Link from "next/link";
import { TfiFlagAlt } from "react-icons/tfi";

export default function DisplayTalentsOrInviter(data: any) {
  return (
    <div
      className={` ${
        data.length > 0 &&
        "w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3"
      }`}
    >
      {data.length > 0 ? (
        data?.map((talent: any) => (
          <Link
            key={talent?.uid}
            href={`/${!talent?.seek ? "company" : "talent"}/${talent.pseudo}`}
            className=" flex p-3 border-2 border-gray-500/30 hover:shadow-md duration-200 hover:scale-[1.03] hover:shadow-cta bg-white"
          >
            {talent?.photoURL ? (
              <div className="w-12 md:w-24 aspect-square rounded-full">
                <Image
                  src={talent?.photoURL}
                  width={224}
                  height={224}
                  alt={`Zdjęcie talentu ${talent?.name || talent?.pseudo}`}
                  className="rounded-full"
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
            <div className="px-3 flex flex-col font-coco">
              <h2 className="text-lg font-bold text-black">{talent?.name}</h2>
              <h3 className="badge badge-primary badge-outline text-base text-gray-700">
                {talent?.title}
              </h3>
              <p className="text-black text-sm">{talent?.city}</p>
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
              Brak freelancerów - skonfiguruj profil i wyświetl się jako
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
    </div>
  );
}
