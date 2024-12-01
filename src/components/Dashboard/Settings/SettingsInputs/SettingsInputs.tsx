"use client";
import { useState } from "react";
import TagsHandler from "../SettingsTagsHandler";
import PreferencesHandler from "../SettingsPreferencesHandler";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/slices/user";
import EssentialUserInfo from "./EssentialUserInfo";
import SettingsHeader from "./SettingsHeader";
import ChooseAccountType from "./ChooseAccountType";

export default function UserEditDashboard({
  source,
  changesWereMade,
  setChangesWereMade,
  setSource,
  setError,
}: {
  source: any;
  changesWereMade: any;
  setChangesWereMade: any;
  setSource: any;
  setError: any;
}) {
  const dispatch = useDispatch();
  const addPreference = (preference: any) => {
    const newPreferences = source?.preferences
      ? [...source?.preferences, preference]
      : [preference];
    setSource({ ...source, preferences: newPreferences });
    dispatch(setUser({ ...source, preferences: newPreferences }));
    setChangesWereMade(true);
  };

  const removePreference = (preference: any) => {
    const newPreferences = source?.preferences.filter(
      (item: string) => item !== preference
    );
    setSource({ ...source, preferences: newPreferences });
    dispatch(setUser({ ...source, preferences: newPreferences }));
    setChangesWereMade(true);
  };
  const [isUploading, setUploading] = useState(false);
  const [uploadCount, setUploadCount] = useState();
  const [project, setProject] = useState<any>({
    images: [],
    days: 1,
    price: 24.41,
  });
  return (
    <div>
      {isUploading && (
        <div className="z-[500] flex items-center justify-center text-center sticky left-0 top-0 bg-black bg-opacity-75 w-full h-screen font-bold text-xl text-white">
          Dodawanie {uploadCount} obrazów...
        </div>
      )}
      <div className="relative bg-white pb-24">
        <SettingsHeader
          setError={setError}
          changesWereMade={changesWereMade}
          user={source}
        />
        {!source?.configured && (
          <ChooseAccountType
            source={source}
            setChangesWereMade={setChangesWereMade}
          />
        )}
        {source?.configured && source?.seek !== "ask" && (
          <div>
            <EssentialUserInfo
              source={source}
              setChangesWereMade={setChangesWereMade}
              setSource={setSource}
            />
            {source?.seek !== "ask" && (
              <div>
                <TagsHandler />
                <PreferencesHandler
                  addPreference={addPreference}
                  removePreference={removePreference}
                  source={source}
                />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
