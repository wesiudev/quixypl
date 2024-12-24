"use client";
import dynamic from "next/dynamic";
import { useState } from "react";
import { updateUser } from "@/firebase";
import { useDispatch, useSelector } from "react-redux";
import { set_modals } from "@/redux/slices/modalsopen";

const SettingsInputs = dynamic(
  () => import("./SettingsInputs/SettingsInputs"),
  {
    ssr: false,
  }
);
const Unsaved = dynamic(() => import("./SettingsInputs/Unsaved"), {
  ssr: false,
});

export default function Settings({ isNavOpen }: { isNavOpen: boolean }) {
  const [error, setError] = useState<any>("");
  const [changesWereMade, setChangesWereMade] = useState<any>(false);
  const { modals } = useSelector((state: any) => state.modals);
  const { light } = useSelector((state: any) => state.light);
  const dispatch = useDispatch();
  return (
    <>
      <button
        disabled={error}
        onClick={() => {
          changesWereMade
            ? setError(true)
            : dispatch(set_modals({ ...modals, config: !modals.config }));
          setTimeout(() => {
            setError(false);
          }, 1200);
        }}
        className={`rounded-lg disabled:cursor-not-allowed fixed z-[999999999999999] left-0 top-0 w-screen h-screen ${
          modals.config
            ? "bg-opacity-80 translate-y-0"
            : "bg-opacity-0 translate-x-[100vw]"
        } bg-gradient-to-b from-primaryStart/70 to-primaryEnd/70 hover:from-primaryStart/50 hover:to-primaryEnd/50`}
      />
      <div
        className={`h-[80vh] w-[95vw] lg:w-[50rem] rounded-lg overflow-y-scroll scrollbar ${
          modals?.config
            ? "z-[999999999999999999999] opacity-100 fixed left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2"
            : "z-[-1000] opacity-0 fixed -translate-y-[150vh]"
        } mb-12`}
      >
        <div className={`${error && "vibrate-screen"}`}>
          <SettingsInputs
            light={light}
            changesWereMade={changesWereMade}
            setChangesWereMade={setChangesWereMade}
            setError={setError}
          />
          <Unsaved
            light={light}
            changesWereMade={changesWereMade}
            error={error}
            updateUser={updateUser}
            setChangesWereMade={setChangesWereMade}
          />
        </div>
      </div>
    </>
  );
}
