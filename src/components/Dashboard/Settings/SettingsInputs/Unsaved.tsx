import { getDocument } from "@/firebase";
import { set_modals } from "@/redux/slices/modalsopen";
import { setUser } from "@/redux/slices/user";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";

export default function Unsaved({
  changesWereMade,
  error,
  source,
  setSource,
  setChangesWereMade,
  updateUser,
  data,
}: {
  changesWereMade: boolean;
  error: boolean;
  source: any;
  setSource: any;
  setChangesWereMade: (value: boolean) => void;
  updateUser: (uid: string, data: any) => Promise<void>;
  data: any;
}) {
  const dispatch = useDispatch();
  const { modals } = useSelector((state: any) => state.modals);
  return (
    <div
      className={`${
        changesWereMade
          ? "sticky z-[70] scale-x-100"
          : "fixed z-[-70] scale-x-0"
      } left-0 bottom-6 flex items-center justify-center`}
    >
      <div
        className={`flex space-x-3 lg:space-x-6 p-3 px-5 rounded-md items-center justify-between max-w-[90%] ${
          error ? "bg-red-500" : "bg-gray-600"
        } ${
          changesWereMade
            ? "duration-300 translate-y-0"
            : "translate-y-[200px] duration-300"
        } `}
      >
        <div className="text-white text-sm pr-3">
          <b>Uwaga!</b> - Masz niezapisane zmiany
        </div>
        <div className="flex flex-col-reverse sm:flex-row items-center w-max">
          <button
            onClick={() => {
              getDocument("users", source?.uid).then((snapshot) => {
                setSource(snapshot);
                dispatch(setUser(snapshot));
              });
              setChangesWereMade(false);
              dispatch(set_modals({ ...modals, config: false }));
            }}
            className="text-white px-6 pt-2 sm:pt-0 text-xs underline hover:no-underline"
          >
            Cofnij
          </button>
          <button
            onClick={() => {
              const history = source?.history ? [...source?.history] : [];
              updateUser(source?.uid, {
                ...source,
                ...data,
                configured: true,
                history: [
                  ...history,
                  { creationTime: Date.now(), action: "Aktualizacja profilu" },
                ],
              }).then(() => {
                dispatch(set_modals({ ...modals, config: false })),
                  dispatch(
                    setUser({
                      ...source,
                      configured: true,
                      history: [
                        ...history,
                        {
                          creationTime: Date.now(),
                          action: "Aktualizacja profilu",
                        },
                      ],
                    })
                  );
              });

              setChangesWereMade(false);
            }}
            style={{ textShadow: "2px 2px 2px black" }}
            className="text-white text-xl rounded-xl bg-cta font-gotham px-6 py-2"
          >
            Zapisz
          </button>
        </div>
      </div>
    </div>
  );
}
