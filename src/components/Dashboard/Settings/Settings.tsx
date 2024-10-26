"use client";
import UserEditDashboard from "./SettingsInputs/SettingsInputs";
import { useRef, useState } from "react";
import Unsaved from "./SettingsInputs/Unsaved";
import { updateUser } from "@/firebase";
import { useDispatch, useSelector } from "react-redux";
import { set_modals } from "@/redux/slices/modalsopen";
export default function Settings({
  source,
  setSource,
  data,
}: {
  source: any;
  setSource: any;
  data: any;
}) {
  const wrapperRef = useRef<any>(null);
  const [error, setError] = useState(false);
  const [changesWereMade, setChangesWereMade] = useState(false);
  const { modals } = useSelector((state: any) => state.modals);
  const dispatch = useDispatch();
  function scrollIntoView() {
    setTimeout(() => {
      wrapperRef.current.scrollTop += 400;
    }, 50);
  }
  return (
    <div className="overflow-x-hidden">
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
        className={`disabled:cursor-not-allowed fixed z-[99999] left-0 top-0 w-full h-full ${
          modals.config
            ? "bg-opacity-80 translate-y-0"
            : "bg-opacity-0 translate-x-[100vw]"
        }  bg-black hover:bg-opacity-60`}
      />
      <div
        ref={wrapperRef}
        className={`fixed bg-white w-screen lg:w-full h-screen overflow-y-scroll scrollbarChat left-0 top-0 ${
          modals.config
            ? "z-[99999999999999999] opacity-100 -translate-y-1/2 top-1/2"
            : "z-[-1000] opacity-0 -translate-y-[150vh] top-0"
        } `}
      >
        <div className={`${error && "vibrate-screen"}`}>
          <UserEditDashboard
            scrollIntoView={scrollIntoView}
            source={source}
            setSource={setSource}
            changesWereMade={changesWereMade}
            setChangesWereMade={setChangesWereMade}
            setError={setError}
          />
          <Unsaved
            changesWereMade={changesWereMade}
            error={error}
            updateUser={updateUser}
            source={source}
            setSource={setSource}
            setChangesWereMade={setChangesWereMade}
            data={data}
          />
        </div>
      </div>
    </div>
  );
}
