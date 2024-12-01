"use client";
import UserEditDashboard from "./SettingsInputs/SettingsInputs";
import { useRef, useState } from "react";
import Unsaved from "./SettingsInputs/Unsaved";
import { updateUser } from "@/firebase";
import { useDispatch, useSelector } from "react-redux";
import { set_modals } from "@/redux/slices/modalsopen";
export default function Settings() {
  const wrapperRef = useRef<any>(null);
  const [error, setError] = useState(false);
  const [changesWereMade, setChangesWereMade] = useState(false);
  const { modals } = useSelector((state: any) => state.modals);
  const dispatch = useDispatch();
  const { user } = useSelector((state: any) => state.user);
  const [source, setSource] = useState<any>();
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
        className={`disabled:cursor-not-allowed fixed z-[999999999999999999] left-0 top-0 w-screen h-screen ${
          modals.config
            ? "bg-opacity-80 translate-y-0"
            : "bg-opacity-0 translate-x-[100vw]"
        }  bg-black hover:bg-opacity-60`}
      />
      <div
        ref={wrapperRef}
        className={`h-[80vh] w-[95vw] lg:w-[80vw] overflow-y-scroll scrollbarChat ${
          modals.config
            ? "z-[99999999999999999] opacity-100 fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            : "z-[-1000] opacity-0 fixed -translate-y-[150vh]"
        } mb-12`}
      >
        <div className={`${error && "vibrate-screen"}`}>
          <UserEditDashboard
            source={user}
            setSource={setSource}
            changesWereMade={changesWereMade}
            setChangesWereMade={setChangesWereMade}
            setError={setError}
          />
          <Unsaved
            changesWereMade={changesWereMade}
            error={error}
            updateUser={updateUser}
            source={user}
            setSource={setSource}
            setChangesWereMade={setChangesWereMade}
          />
        </div>
      </div>
    </>
  );
}
