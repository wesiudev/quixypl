"use client";
import { updateApplication } from "@/firebase";
import moment from "moment";
import { useState } from "react";
import "moment/locale/pl";
import Link from "next/link";
import { FaChevronLeft } from "react-icons/fa6";
import { useSelector } from "react-redux";
import LeadApplication from "./LeadApplication";
export default function LeadsList() {
  const { user } = useSelector((state: any) => state.user);
  const [noteOpen, setNoteOpen] = useState<any>();
  const [filter, setFilter] = useState("new");
  moment.locale("pl");
  const { light } = useSelector((state: any) => state.light);
  return (
    <>
      <div className="font-sans py-3 mx-3 lg:py-6 lg:mx-6 lg:ml-12">
        <div
          className={`${
            light ? "bg-white text-black" : "bg-[#222430] text-white"
          } rounded-lg w-full justify-between py-3 px-3 xl:px-6 font-bold text-lg flex items-center`}
        >
          <Link href="/user" className="flex items-center">
            <FaChevronLeft className="mr-2 text-xl" />
            Powrót
          </Link>
          <div className="flex flex-col pl-12">
            <h2 className="font-extrabold">Sekcja Leadów</h2>
            <p className="text-xs font-coco">
              Znajdziesz tutaj wszystkie swoje zlecenia oraz kandydatów.
            </p>
          </div>
        </div>
        <div
          className={` ${
            light ? "bg-white text-black" : "bg-[#222430] text-white"
          } mt-6 rounded-lg min-h-screen text-white`}
        >
          <div className="font-gotham font-light grid grid-cols-2 gap-2 p-6 !text-white">
            <button
              onClick={() => setFilter("new")}
              className={`rounded-md p-1 border-2 border-dashed ${
                filter === "new"
                  ? `bg-gradient-to-b text-white ${
                      light
                        ? "border-black from-primaryHoverStart to-primaryHoverEnd"
                        : "border-white from-primaryStart to-primaryEnd"
                    }`
                  : `border-transparent bg-gradient-to-b text-white ${
                      light
                        ? " from-primaryHoverStart/70 to-primaryHoverEnd/70"
                        : " from-primaryStart/70 to-primaryEnd/70"
                    }`
              }`}
            >
              NOWE
            </button>
            <button
              onClick={() => setFilter("old")}
              className={`rounded-md text-white p-1 border-2 border-dashed ${
                filter === "old"
                  ? `bg-gradient-to-b text-white ${
                      light
                        ? "border-black from-primaryHoverStart to-primaryHoverEnd"
                        : "border-white from-primaryStart to-primaryEnd"
                    }`
                  : `border-transparent bg-gradient-to-b text-white ${
                      light
                        ? "from-primaryHoverStart/70 to-primaryHoverEnd/70"
                        : "from-primaryStart/70 to-primaryEnd/70"
                    }`
              }`}
            >
              SPRAWDZONE
            </button>{" "}
          </div>
          <div className="grid grid-cols-1 xl:grid-cols-3 2xl:grid-cols-4 font-sans gap-6">
            {user?.leads?.map((lead: any, i: any) => (
              <>
                {filter === "new" &&
                  !lead.signed &&
                  lead.status !== "trash" && (
                    <LeadApplication
                      key={i}
                      lead={lead}
                      noteOpen={noteOpen}
                      setNoteOpen={setNoteOpen}
                      filter={filter}
                    />
                  )}
              </>
            ))}
            {user?.leads?.map((lead: any, i: any) => (
              <>
                {filter === "old" &&
                  lead.isFinished &&
                  lead.status !== "rejected" &&
                  !lead.signed &&
                  lead.status !== "trash" && (
                    <LeadApplication
                      key={i}
                      lead={lead}
                      noteOpen={noteOpen}
                      setNoteOpen={setNoteOpen}
                      filter={filter}
                    />
                  )}
              </>
            ))}
          </div>
        </div>
      </div>
      {noteOpen !== undefined && (
        <div
          onClick={() => {
            setNoteOpen(undefined);
          }}
          className="z-[120] fixed left-0 top-0 w-full h-full bg-black bg-opacity-80 flex flex-col items-center justify-center"
        >
          <div
            className="bg-slate-700 border-black border-2 p-6 sm:p-12"
            onClick={(e) => e.stopPropagation()}
          >
            <textarea
              onChange={(e) =>
                setNoteOpen({ ...noteOpen, note: e.target.value })
              }
              name="note"
              id="note"
              rows={10}
              autoFocus
              placeholder="Wpisz tekst"
              className="font-bold text-base font-sans p-3 w-full text-zinc-800 drop-shadow-xl shadow-black"
            />

            <button
              onClick={() => {
                updateApplication(noteOpen.id, {
                  ...noteOpen,
                  note: noteOpen.note,
                });
                setNoteOpen(undefined);
              }}
              className="w-full bg-green-500 hover:bg-green-400 font-gotham p-3 text-white font-bold"
            >
              Zapisz
            </button>
          </div>
        </div>
      )}
    </>
  );
}
