"use client";
import { addConversation } from "@/firebase/";
import { getDocument, updateUser } from "@/firebase/";
import Image from "next/image";
import { FaTrophy } from "react-icons/fa6";

export default function ChatListElement({
  source,
  value,
  setCurrentConversation,
  setClickedUserData,
}: {
  source: any;
  value: any;
  setCurrentConversation: any;
  setClickedUserData: any;
}) {
  return (
    <>
      {value?.status === "online" && (
        <div key={value?.uid} className={`bg-white w-full relative`}>
          {value?.status === "online" && (
            <div className="absolute top-1/2 -translate-y-1/2 right-3 w-5 h-5 bg-[green] rounded-full"></div>
          )}
          {value?.premium && (
            <FaTrophy className="w-7 h-7 absolute top-1/2 -translate-y-1/2 right-12 text-yellow-500" />
          )}
          {value?.chat && !value.premium && (
            <Image
              src="/assets/devil.webp"
              width={224}
              height={224}
              alt="PREMIUM"
              className="w-7 h-7 absolute top-1/2 -translate-y-1/2 right-12"
            />
          )}
          {(source?.premium || source?.chat) && (
            <div
              className="absolute left-2 bottom-2 text-yellow-400 z-[500]"
              title={value?.premium ? "VIP" : "PREMIUM"}
            ></div>
          )}

          <div
            className="flex items-center w-full p-2"
            style={{ boxShadow: "0 0 10px 0 rgba(0,0,0,0.25)" }}
          >
            <button
              onClick={() => {
                if (value?.uid === source?.uid) {
                  return null;
                }
                if (
                  !source?.relatedUsers?.some((u: any) => u?.uid === value?.uid)
                ) {
                  addConversation([
                    {
                      login: source?.login,
                      uid: source?.uid,
                      primaryImage: source?.photoURL || "",
                    },
                    {
                      login: value?.login,
                      uid: value?.uid,
                      primaryImage: value?.photoURL || "",
                    },
                  ]).then((res) => {
                    setCurrentConversation(res);
                    Promise.all([
                      getDocument("users", source?.uid),
                      getDocument("users", value?.uid),
                    ]).then(([userData, clickedUserData]) => {
                      const userRelatedUsers =
                        userData?.relatedUsers instanceof Array
                          ? userData?.relatedUsers
                          : [];
                      const clickedUserRelatedUsers =
                        clickedUserData?.relatedUsers instanceof Array
                          ? clickedUserData?.relatedUsers
                          : [];
                      if (!userRelatedUsers.includes(value?.uid)) {
                        updateUser(source?.uid, {
                          relatedUsers: [
                            ...userRelatedUsers,
                            {
                              login: value?.login,
                              uid: value?.uid,
                              primaryImage: value?.photoURL || "",
                            },
                          ],
                        });
                      }
                      if (!clickedUserRelatedUsers.includes(source?.uid)) {
                        updateUser(value?.uid, {
                          relatedUsers: [
                            ...clickedUserRelatedUsers,
                            {
                              login: source?.login,
                              uid: source?.uid,
                              primaryImage: source?.photoURL || "",
                            },
                          ],
                        });
                      }
                    });
                    getDocument("users", value?.uid).then((data) => {
                      setClickedUserData(data);
                    });
                  });
                } else {
                  const sortedParticipantIds = [source, value]
                    .map((p) => p.uid)
                    .sort();
                  const conversationId = sortedParticipantIds.join("_");

                  setCurrentConversation(conversationId);

                  getDocument("users", value?.uid).then((data) => {
                    setClickedUserData(data);
                  });
                }
              }}
              className="flex items-center w-full"
            >
              {value?.photoURL ? (
                <div
                  className="w-12 aspect-square rounded-full relative"
                  style={{ boxShadow: "0px 0px 5px #000000" }}
                >
                  <Image
                    src={value?.photoURL}
                    width={50}
                    height={50}
                    alt=""
                    className="rounded-full absolute inset-0 object-cover w-full h-full group-hover:scale-110 duration-500"
                  />
                </div>
              ) : (
                <div
                  style={{ boxShadow: "0px 0px 5px #000000" }}
                  className="aspect-square flex items-center justify-center text-2xl w-12 text-white rounded-full bg-[#A6152D]"
                >
                  {value?.login[0].toUpperCase()}
                </div>
              )}
              <div className="text-black font-bold ml-3 flex items-center justify-between w-full overflow-hidden text-clip">
                <div className="pr-6 w-max">
                  {value?.login !== source?.login ? value?.login : "Ty"}
                </div>
              </div>
            </button>
          </div>
        </div>
      )}
    </>
  );
}
