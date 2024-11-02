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
              alt=""
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
              alt=""
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
  { name: "warmińsko-mazurskie", image: "/assets/regions/warm-maz.png" },
  { name: "pomorskie", image: "/assets/regions/pom.png" },
  { name: "podlaskie", image: "/assets/regions/podl.png" },
  { name: "kujawsko-pomorskie", image: "/assets/regions/kuj-pom.png" },
  { name: "mazowieckie", image: "/assets/regions/maz.png" },
  { name: "lubelskie", image: "/assets/regions/lubelskie.png" },
  { name: "małopolskie", image: "/assets/regions/mal.png" },
  { name: "dolnośląskie", image: "/assets/regions/dolnoslaskie.png" },
  { name: "wielkopolskie", image: "/assets/regions/wielk.png" },
  { name: "lodzkie", image: "/assets/regions/lodz.png" },
  { name: "świętokrzyskie", image: "/assets/regions/swiet.png" },
  { name: "zachodniopomorskie", image: "/assets/regions/zach.png" },
];
