import React from "react";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { addDocument, storage, updateUser } from "@/firebase";
import Image from "next/image";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { v4 as uuidv4 } from "uuid";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "@/redux/slices/user";

interface FirstGenerationPopupProps {
  isGenerationTriggered: boolean;
  setIsGenerationTriggered: (value: boolean) => void;
  isLoading: boolean;
  hasImage: boolean;
  imageResponse: string;
  userPrompt: string;
  imageLoaded: boolean;
  setImageLoaded: (value: boolean) => void;
  displayError: (message: string) => void;
  setHasImage: (value: boolean) => void;
}

export default function FirstGenerationPopup(props: FirstGenerationPopupProps) {
  const {
    isGenerationTriggered,
    setIsGenerationTriggered,
    isLoading,
    hasImage,
    imageResponse,
    userPrompt,
    imageLoaded,
    setImageLoaded,
    displayError,
    setHasImage,
  } = props;

  const { user } = useSelector((state: any) => state.user);
  const dispatch = useDispatch();

  const saveImage = async () => {
    const id = toast.loading("Trwa zapisywanie...", {
      position: "bottom-right",
      autoClose: false,
      closeOnClick: false,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
    });

    if (hasImage) {
      try {
        const pseudoRandomName = uuidv4();
        const uniqId = uuidv4();

        // Ensure Firebase storage reference is valid
        const imageRef = ref(storage, `image-${pseudoRandomName}`);

        // Upload image as a data URL with correct content type (assuming PNG)
        await uploadString(imageRef, imageResponse, "data_url", {
          contentType: "image/png",
        });

        // Retrieve the download URL of the uploaded image
        const url = await getDownloadURL(imageRef);

        // Create image document to store in Firestore
        const imageDoc = {
          author: user?.name || user?.email || "Unknown",
          comments: [],
          creationTime: Date.now(),
          isPublic: true,
          likes: 0,
          prompt: userPrompt,
          src: url,
        };

        // Get user history and generated images with safety checks
        const history = user?.history ? [...user.history] : [];
        const generatedImages = user?.generatedImages || [];

        // Update the user's image collection in Firestore
        await updateUser(user?.uid, {
          ...user,
          generatedImages: [
            ...generatedImages,
            { src: url, prompt: userPrompt, id: uniqId },
          ],
          history: [
            ...history,
            {
              creationTime: Date.now(),
              action: `Zapisano obraz w plecaku`,
            },
          ],
        });

        // Dispatch updated user to Redux
        dispatch(
          setUser({
            ...user,
            generatedImages: [
              ...generatedImages,
              {
                src: url,
                prompt: userPrompt,
                id: uniqId,
                creationTime: Date.now(),
                author: user?.name || user?.email || "Unknown",
              },
            ],
          })
        );

        // Add image document to Firestore
        await addDocument("images", uniqId, imageDoc);

        // Show success notification
        toast.update(id, {
          render: "Obraz został zapisany!",
          type: "success",
          isLoading: false,
          closeOnClick: true,
          autoClose: 5000,
        });

        // Reset the image and popup state
        setHasImage(false);
        setIsGenerationTriggered(false);
      } catch (err: any) {
        // Catch and display any errors
        displayError(err.message);

        // Update toast to reflect error state
        toast.update(id, {
          render: `Error: ${err.message}`,
          type: "error",
          isLoading: false,
          autoClose: 5000,
        });
      }
    }
  };

  const closePopup = () => {
    setIsGenerationTriggered(false);
    setHasImage(false);
  };

  return (
    <div>
      {!isLoading && isGenerationTriggered && userPrompt.length > 0 && (
        <div
          style={{ boxShadow: "0px 0px 5px cyan" }}
          className="fixed left-0 top-0 overflow-y-scroll bg-black bg-opacity-50 h-screen w-screen z-[999999999999999999]"
        >
          <div className="w-[95%] max-w-[40rem] mx-auto">
            <div
              className={`duration-500 ${
                hasImage
                  ? "-translate-y-0 flex justify-center items-center"
                  : "-translate-y-[100vh]"
              } h-full w-full relative flex flex-col justify-center items-center`}
            >
              {!isLoading && (
                <>
                  <div className="text-center z-[50] p-3 w-full bg-[#126b91] text-white font-bold">
                    {userPrompt}
                  </div>
                  <Image
                    width={1024}
                    height={1024}
                    src={imageResponse}
                    alt={userPrompt}
                    className="sticky bottom-0"
                    style={{ display: imageLoaded ? "block" : "none" }}
                    onLoad={() => setImageLoaded(true)}
                  />
                  {hasImage && (
                    <div className="grid grid-cols-2 w-full">
                      <button
                        onClick={closePopup}
                        className="text-sm py-3 w-full bg-red-600 hover:bg-red-700 text-white font-light z-50"
                      >
                        Nie zapisuj
                      </button>
                      <button
                        onClick={saveImage}
                        className="py-3 w-full bg-green-600 hover:bg-green-700 text-white text-xl lg:text-2xl sm:px-12"
                      >
                        Zapisz
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
