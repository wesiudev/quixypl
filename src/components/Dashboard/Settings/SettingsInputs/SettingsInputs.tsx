"use client";
import TagsHandler from "../SettingsTagsHandler";
import PreferencesHandler from "../SettingsPreferencesHandler";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "@/redux/slices/user";
import EssentialUserInfo from "./EssentialUserInfo";
import SettingsHeader from "./SettingsHeader";
import ChooseAccountType from "./ChooseAccountType";

export default function SettingsInputs({
  changesWereMade,
  setChangesWereMade,

  setError,
}: {
  changesWereMade: any;
  setChangesWereMade: any;

  setError: any;
}) {
  const dispatch = useDispatch();
  const { user } = useSelector((state: any) => state.user);
  const addPreference = (preference: any) => {
    const newPreferences = user?.preferences
      ? [...user?.preferences, preference]
      : [preference];
    dispatch(setUser({ ...user, preferences: newPreferences }));
    setChangesWereMade(true);
  };

  const removePreference = (preference: any) => {
    const newPreferences = user?.preferences.filter(
      (item: string) => item !== preference
    );
    dispatch(setUser({ ...user, preferences: newPreferences }));
    setChangesWereMade(true);
  };

  return (
    <div>
      <div className="relative bg-white pb-24">
        <SettingsHeader setError={setError} changesWereMade={changesWereMade} />
        {!user?.configured && (
          <ChooseAccountType
            user={user}
            setChangesWereMade={setChangesWereMade}
          />
        )}
        <EssentialUserInfo
          user={user}
          setChangesWereMade={setChangesWereMade}
        />
        <TagsHandler />
        <PreferencesHandler
          addPreference={addPreference}
          removePreference={removePreference}
        />
      </div>
    </div>
  );
}
