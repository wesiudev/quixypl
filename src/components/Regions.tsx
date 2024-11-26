import Image from "next/image";

export default function Regions() {
  return (
    <div className="w-[365px] flex items-center overflow-x-hidden">
      <div className="flex flex-row move-from-right-to-left ml-[100%]">
        {items.map((item: any, i: any) => (
          <div
            key={i}
            className={`flex text-zinc-800 w-max items-center px-4 py-3`}
          >
            <Image
              src={item.image}
              width={100}
              height={100}
              alt={item.name}
              className="w-[80px] h-auto mr-3"
            />
          </div>
        ))}
        {items.map((item: any, i: any) => (
          <div
            key={i}
            className={`flex text-zinc-800 w-max items-center px-4 py-3`}
          >
            <Image
              src={item.image}
              width={100}
              height={100}
              alt={item.name}
              className="w-[80px] h-auto mr-3"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

const items = [
  { name: "google", image: "/assets/google.png" },
  { name: "deviant", image: "/assets/deviant.png" },
  { name: "pinterest", image: "/assets/pinterest.png" },
  { name: "react", image: "/assets/react.png" },
  { name: "openai", image: "/assets/openai.png" },
];
