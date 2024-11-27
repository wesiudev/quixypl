import { useRouter } from "next/navigation";
import { useState } from "react";

export default function OfferOptionsOpened({
  optionsOpen,
  setEditOpen,
  setOptionsOpen,
  setApplicationsOpen,
  handleDeleteJobOffer,
  jobOffer,
  deleteMenu,
  setDeleteMenu,
}: {
  optionsOpen: any;
  setEditOpen: (value: boolean) => void;
  setOptionsOpen: (value: boolean) => void;
  setApplicationsOpen: (value: boolean) => void;
  handleDeleteJobOffer: (id: string) => Promise<void>;
  jobOffer: { id: string };
  deleteMenu: any;
  setDeleteMenu: any;
}) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  return (
    <div
      className={`px-2 z-10 absolute top-7 right-12 w-max h-max py-6 bg-zinc-800 flex flex-col items-start space-y-1 duration-500 ease-in-out ${
        !optionsOpen ? "-translate-y-[80px] scale-x-0" : "-translate-y-0"
      }`}
    >
      {/* <button
        onClick={() => {
          setEditOpen(true);
          setOptionsOpen(false);
        }}
        className="w-full px-4 py-1 text-white bg-white bg-opacity-10 duration-150 hover:bg-opacity-20"
      >
        Edytuj
      </button> */}
      <button
        onClick={() => {
          router.push("/dashboard/leads");
          setOptionsOpen(false);
        }}
        className="w-full px-4 py-1 text-white bg-white bg-opacity-10 duration-150 hover:bg-opacity-20"
      >
        Kandydaci
      </button>
      <button
        onClick={() => {
          setDeleteMenu(!deleteMenu);
        }}
        disabled={loading}
        className="w-full px-4 py-1 text-red-500 bg-white disabled:bg-red-400 bg-opacity-10 duration-150 hover:bg-opacity-20"
      >
        {loading && <div className="loading loading-spinner"></div>}{" "}
        {deleteMenu ? "Anuluj" : "Usuń"}
      </button>
      {deleteMenu && (
        <button
          disabled={loading}
          onClick={() => {
            setLoading(true);
            handleDeleteJobOffer(jobOffer.id).then(() => setLoading(false));
          }}
          className="disabled:bg-red-400 w-full px-4 py-1 text-white bg-red-500 bg-opacity-100 duration-150 hover:bg-opacity-90"
        >
          {loading && <div className="loading loading-spinner"></div>} Usuń
        </button>
      )}
    </div>
  );
}
