import { updateUser } from "@/firebase";
import { set_modals } from "@/redux/slices/modalsopen";
import moment from "moment";
import { useState } from "react";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";

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
  const dispatch = useDispatch();
  const handleUpdate = (status: string) =>
    updateUser(lead.id, { ...lead, status });
  const { modals } = useSelector((state: any) => state.modals);
  return (
    <div
      key={lead.id}
      className={`relative bg-zinc-800 p-3 h-max border-[3px] overflow-hidden ${
        lead.status === "trash"
          ? "border-orange-700"
          : lead.status === "reseted"
          ? "border-white"
          : lead.status === "accepted"
          ? "border-green-500"
          : lead.status === undefined
          ? "border-zinc-800"
          : "border-red-500"
      }`}
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
          className="text-3xl text-white h-full px-2 hover:bg-white hover:bg-opacity-20 relative z-50"
        >
          <HiOutlineDotsHorizontal />
        </button>
        <div
          className={`z-50 absolute top-14 right-14 w-max h-max py-6 bg-zinc-800 flex flex-col items-start space-y-1 duration-200 ease-in-out ${
            !optionsOpen ? "-translate-y-[300px]" : "-translate-y-0"
          }`}
        >
          <button
            onClick={() => handleUpdate("reseted")}
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
        </tbody>
      </table>
      <div className="pt-3 w-full flex flex-row justify-between">
        <div>Notatka:</div>
        <button
          onClick={() => setNoteOpen(lead)}
          className="text-blue-500 font-light p-0.5 px-2 hover:bg-white hover:bg-opacity-20"
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
            onClick={() => handleUpdate("accepted")}
            className="w-full text-center bg-green-500 text-white py-2 hover:bg-green-400 font-light text-base rounded"
          >
            Oznacz jako sprawdzone
          </button>
        )}
        {lead.isFinished && (!lead?.status || lead.status === "reseted") && (
          <div className="grid grid-cols-2 mt-2 gap-2">
            <button
              onClick={() => handleUpdate("rejected")}
              className="bg-gray-500 hover:bg-gray-400 p-3 rounded"
            >
              Odrzuć
            </button>
            <button
              onClick={() => handleUpdate("accepted")}
              className="bg-green-500 hover:bg-green-400 p-3 rounded"
            >
              Akceptuj
            </button>
          </div>
        )}

        {lead.isFinished && !lead?.status && (
          <button
            className="w-full text-center bg-blue-500 text-white py-2 font-light text-base mt-2 rounded"
            onClick={() => {
              dispatch(set_modals({ ...modals, currentChat: lead?.pseudo }));
            }}
          >
            Odpisz
          </button>
        )}
      </div>
    </div>
  );
}
