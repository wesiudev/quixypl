import Link from "next/link";
import { HiOutlineDotsHorizontal } from "react-icons/hi";

interface JobOfferDetailsProps {
  jobOffer: {
    title: string;
    isPaid: boolean;
    price: number;
  };
  loading: boolean;
  pay: (jobOffer: { title: string; isPaid: boolean; price: number }) => void;
  setOptionsOpen: (value: boolean) => void;
  optionsOpen: boolean;
}

export default function JobOfferDetails({
  jobOffer,
  loading,
  pay,
  setOptionsOpen,
  optionsOpen,
}: JobOfferDetailsProps) {
  return (
    <div className="flex w-full justify-between font-gotham mb-4 text-black">
      <div className="flex flex-col">
        <h3 className="font-coco text-lg sm:text-xl font-bold text-black mb-2 pr-6">
          {jobOffer.title}
        </h3>
        <div
          className={`${
            jobOffer.isPaid ? "hidden" : "block"
          } col-span-1 font-coco`}
        >
          <div className="flex flex-col">
            <div className="flex items-center font-bold">Do zapłaty</div> 💎
            {jobOffer.price}
          </div>
          <p
            className={`${
              jobOffer.isPaid ? "text-green-500" : "text-red-500"
            } mb-2`}
          >
            {jobOffer.isPaid ? "Opłacono" : "Nie opłacono"}
          </p>
          {!jobOffer.isPaid && (
            <button
              disabled={loading}
              onClick={() => pay(jobOffer)}
              className="bg-gradient-to-r from-primary to-cta px-2 py-0.5 text-white font-bold font-coco text-xl"
            >
              Opublikuj{" "}
              {loading && <div className="loading-lg loading-infinity"></div>}
            </button>
          )}
          {jobOffer.isPaid && (
            <Link
              href="/dashboard/applications"
              className="bg-gradient-to-r from-primary to-cta px-2 py-0.5  text-white"
            >
              Przeglądaj aplikacje
            </Link>
          )}
        </div>
      </div>

      <div className="flex flex-col">
        <div className="flex items-end justify-end">
          <button
            onClick={() => setOptionsOpen(!optionsOpen)}
            className={`w-max text-3xl text-white h-full px-2 bg-gradient-to-r from-primary to-cta hover:bg-opacity-20 relative z-10 duration-200 `}
          >
            <HiOutlineDotsHorizontal
              className={`${
                optionsOpen ? "scale-125 hover:scale-110" : "hover:scale-90"
              }`}
            />
          </button>
        </div>
      </div>
    </div>
  );
}
