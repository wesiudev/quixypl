import { updateDocument, updateUser } from "@/firebase";
import { set_modals } from "@/redux/slices/modalsopen";
import { setUser } from "@/redux/slices/user";
import moment from "moment";
import { useState } from "react";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";

const updateUserLead = async (id: string, data: any) => {
  await updateDocument(["realized"], data, "users", id);
  await updateUser(id, {
    leads: data.leads.map((lead: any) =>
      lead.id === data.id ? { ...lead, status: data.status } : lead
    ),
  });
};

export default function LeadApplication({
  lead,
  noteOpen,
  setNoteOpen,
  filter,
}: {
  lead: any;
  noteOpen: any;
  setNoteOpen: any;
  filter: string;
}) {
  const [optionsOpen, setOptionsOpen] = useState(false);
  const { user } = useSelector((state: any) => state.user);
  const dispatch = useDispatch();
  const deleteUserLead = async (id: string, leadId: string) => {
    await updateUser(id, {
      leads: user?.leads?.filter((lead: any) => lead.id !== leadId),
    });
  };
  const handleUpdate = (status: string) => {
    setOptionsOpen(false);
    const updatedLeads = user.leads.map((l: any) =>
      l.id === lead.id ? { ...l, status: status } : l
    );
    dispatch(setUser({ ...user, leads: updatedLeads }));
    updateUserLead(user?.id, { ...lead, status: status });
  };

  const handleDelete = () => {
    setOptionsOpen(false);
    const updatedLeads = user?.leads.filter((l: any) => l.id !== lead.id);
    dispatch(setUser({ ...user, leads: updatedLeads }));
    updateDocument(["leads"], [updatedLeads], "users", user?.id);
  };

  const { modals } = useSelector((state: any) => state.modals);
  return (
    <div
      key={lead?.id}
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
          <p>{moment(lead?.creationTime).format("DD-MM-YYYY")}</p>
          <p className="text-blue-500 font-light font-gotham italic">
            {moment(lead?.creationTime).fromNow()}
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
          <button
            onClick={handleDelete}
            className="w-full px-4 py-1 text-white bg-red-500 bg-opacity-0 duration-150 hover:bg-opacity-20"
          >
            Usuń
          </button>
        </div>
      </div>

      <table className="w-full mt-3">
        <tbody>
          <tr className="bg-gray-700">
            <td>Numer Telefonu:</td>
            <td>{lead.phoneNumber}</td>
          </tr>
          <tr className="bg-gray-700">
            <td>Wiadomość:</td>
            <td>{lead.message}</td>
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
      {lead?.note && <p className="text-white font-light">{lead?.note}</p>}
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
      </div>
    </div>
  );
}
