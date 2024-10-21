import { updateApplication } from "@/firebase";
import moment from "moment";
import Link from "next/link";
import { useState } from "react";
import { HiOutlineDotsHorizontal } from "react-icons/hi";

export default function LeadApplication({
  lead,
  setNoteOpen,
  filter,
}: {
  lead: any;
  setNoteOpen: any;
  filter: string;
}) {
  const [optionsOpen, setOptionsOpen] = useState(false);

  return (
    <div
      key={lead.id}
      className={`rounded relative bg-zinc-800 p-3 h-max border-[3px] overflow-hidden ${
        lead.status === "trash" && "border-orange-700"
      } ${lead.status === "reseted" && "border-white"} ${
        lead.status === "accepted" && "border-green-500"
      } ${lead.status === undefined && "border-zinc-800"} ${
        lead.status === "rejected" && "border-red-500"
      } ${lead?.status === "accepted" && "border-yellow-400"}`}
    >
      {optionsOpen && (
        <div className="w-full h-full absolute left-0 top-0 bg-black bg-opacity-50" />
      )}

      <div className="flex w-full justify-between items-center">
        <div className="flex space-x-2">
          <p>{moment(lead.createdAt).format("DD-MM-YYYY")}</p>
          <p className="text-blue-500 font-light font-gotham italic">
            {moment(lead.createdAt).fromNow()}
          </p>
        </div>
        <button
          onClick={() => setOptionsOpen(!optionsOpen)}
          className="text-3xl text-white h-full px-2 hover:bg-white hover:bg-opacity-20 rounded relative z-50"
        >
          <HiOutlineDotsHorizontal />
        </button>
        <div
          className={`z-50 absolute top-14 right-14 w-max h-max py-6 bg-zinc-800 flex flex-col items-start space-y-1 duration-200 ease-in-out ${
            !optionsOpen ? "-translate-y-[300px]" : "-translate-y-0"
          }`}
        >
          <button
            onClick={() =>
              updateApplication(lead.id, {
                ...lead,
                isFinished: false,
                isTrash: false,
                signed: false,
                status: "reseted",
              }).then(() => setOptionsOpen(false))
            }
            className="w-full px-4 py-1 text-white bg-white bg-opacity-0 duration-150 hover:bg-opacity-20"
          >
            Resetuj
          </button>
        </div>
      </div>

      <table className="w-full mt-3">
        <tbody>
          <tr className="bg-gray-700">
            <td>Email:</td>
            <td>{lead.email}</td>
          </tr>
          <tr className="bg-gray-700">
            <td>Imię i nazwisko:</td>
            <td>{lead.name}</td>
          </tr>
          <tr className="bg-gray-700">
            <td>Tel:</td>
            <td>{lead.phoneNumber}</td>
          </tr>
          <tr className="bg-gray-700">
            <tr className="bg-gray-700">
              <td colSpan={2}>
                <a
                  href={lead.file}
                  download
                  className="text-white underline font-light"
                >
                  Pobierz CV
                </a>
              </td>
            </tr>
          </tr>
        </tbody>
      </table>
      <div className="pt-3 w-full flex flex-row justify-between">
        <div>Notatka:</div>
        <button
          onClick={() => setNoteOpen(lead)}
          className="text-blue-500 font-light rounded p-0.5 px-2 hover:bg-white hover:bg-opacity-20"
        >
          Edytuj
        </button>
      </div>
      {lead?.note !== undefined && (
        <p className="text-white font-light">{lead?.note}</p>
      )}
      <div className="flex flex-col w-full mt-3">
        {!lead.isFinished && (
          <button
            onClick={() =>
              updateApplication(lead.id, {
                ...lead,
                isFinished: true,
              })
            }
            className="w-full text-center bg-green-500 text-white py-2 hover:bg-green-400 font-light text-base rounded"
          >
            Oznacz jako sprawdzone
          </button>
        )}
        {lead.isFinished && (!lead?.status || lead.status === "reseted") && (
          <div className="grid grid-cols-2 mt-2 gap-2">
            <button
              onClick={() =>
                updateApplication(lead.id, {
                  ...lead,
                  status: "rejected",
                })
              }
              className="bg-gray-500 hover:bg-gray-400 p-3 rounded"
            >
              Odrzuć
            </button>
            <button
              onClick={() =>
                updateApplication(lead.id, {
                  ...lead,
                  status: "accepted",
                })
              }
              className="bg-green-500 hover:bg-green-400 p-3 rounded"
            >
              Akceptuj
            </button>
          </div>
        )}

        {lead.isFinished && !lead?.status && (
          <Link
            className="w-full text-center bg-blue-500 text-white py-2 font-light text-base mt-2 rounded"
            href={`mailto:${lead.email}`}
          >
            Napisz email
          </Link>
        )}
      </div>
    </div>
  );
}
