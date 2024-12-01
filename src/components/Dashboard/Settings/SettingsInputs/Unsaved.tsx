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
          ? "left-0 bottom-0 sticky z-[6000] scale-x-100"
          : "left-0 bottom-0 fixed z-[-70] scale-x-0"
      } flex items-center justify-center`}
    >
      <div
        className={`flex space-x-3 lg:space-x-6 p-3 px-5 items-center justify-center w-full ${
          error ? "bg-red-500" : "bg-primary"
        } ${
          changesWereMade
            ? "duration-300 translate-y-0"
            : "translate-y-[200px] duration-300"
        } `}
      >
        <div className="text-white font-extralight pr-3 font-coco">
          <b>Uwaga!</b> - Masz niezapisane zmiany{" "}
          <button
            onClick={() => {
              getDocument("users", source?.uid).then((snapshot) => {
                setSource(snapshot);
                dispatch(setUser(snapshot));
              });
              setChangesWereMade(false);
              dispatch(set_modals({ ...modals, config: false }));
            }}
            className="font-bold text-white text-xs underline hover:no-underline"
          >
            Cofnij
          </button>
        </div>
        <div className="flex flex-col-reverse sm:flex-row items-center w-max">
          <button
            onClick={async () => {
              const history = source?.history ? [...source?.history] : [];
              try {
                await updateUser(source?.uid, {
                  ...source,
                  ...data,
                  configured: true,
                  history: [
                    ...history,
                    {
                      creationTime: Date.now(),
                      action: "Aktualizacja profilu",
                    },
                  ],
                });
                dispatch(set_modals({ ...modals, config: false }));
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
              } catch (error) {
                console.error(error);
              } finally {
                setChangesWereMade(false);
              }
            }}
            className="text-white text-sm  bg-[green] font-gotham px-6 py-2"
          >
            Zapisz
          </button>
        </div>
      </div>
    </div>
  );
}
