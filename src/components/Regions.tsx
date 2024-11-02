import Image from "next/image";

export default function Regions() {
  return (
    <div className="w-full flex items-center overflow-x-hidden">
      <div className="flex flex-row move-from-right-to-left ml-[100%]">
        {regions.map((region: any, i: any) => (
          <div
            key={i}
            className={`flex text-zinc-800 w-max items-center px-12 py-3 border-l border-zinc-800 border-y ${
              i % 2 === 0 ? "bg-green-300" : "bg-green-200"
            }`}
          >
            <Image
              src={region.image}
              width={100}
              height={100}
              alt="abc"
              className="w-[50px] h-auto mr-3"
            />

            <h2 className="w-max font-bold text-zinc-800 drop-shadow-xl shadow-black">
              {region.name}
            </h2>
          </div>
        ))}
        {regions.map((region: any, i: any) => (
          <div
            key={i}
            className={`flex text-zinc-800 w-max items-center px-12 py-3 border-l border-zinc-800 border-y ${
              i % 2 === 0 ? "bg-green-300" : "bg-green-200"
            }`}
          >
            <Image
              src={region.image}
              width={100}
              height={100}
              alt="abc"
              className="w-[50px] h-auto mr-3"
            />
            <h2 className="w-max font-bold text-zinc-800 drop-shadow-xl shadow-black">
              {region.name}
            </h2>
          </div>
        ))}
      </div>
    </div>
  );
}

const regions = [
  { name: "google", image: "/assets/google.png" },
  { name: "deviant", image: "/assets/deviant.png" },
  { name: "pinterest", image: "/assets/pinterest.png" },
];
