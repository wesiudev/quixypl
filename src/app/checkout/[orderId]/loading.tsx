import Image from "next/image";

export default function Loading() {
  return (
    <div className="fixed left-0 top-0 z-[5000]  h-screen w-screen flex justify-center items-center text-4xl">
      <div className="flex flex-col items-center justify-center">
        {" "}
        <div className="rounded-lg bg-gradient-to-b from-accentStart to-accentEnd w-36 h-36 mx-auto flex flex-col items-center justify-center">
          <div className="flex items-center justify-center rounded-lg p-3 w-16 h-16 bg-white animate-pulse">
            <Image
              src="/assets/quixy-logo.png"
              width={124}
              height={124}
              alt=""
              className=""
              priority
            />
          </div>
          <h2 className="text-sm font-bold mt-3 text-center text-white">
            Wczytywanie...
          </h2>
        </div>
      </div>
    </div>
  );
}
