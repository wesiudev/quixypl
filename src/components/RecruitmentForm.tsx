"use client";
import { storage } from "@/firebase";
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { toast } from "react-toastify";
import Documents from "./Documents";

export default function RecruitmentForm({
  updateUserLeads,
  uid,
  companyName,
  setApplyOpen,
  user,
  formState,
  setFormState,
}: {
  updateUserLeads: any;
  uid: string;
  companyName: string;
  setApplyOpen: any;
  user: any;
  formState: any;
  setFormState: any;
}) {
  const [isSent, setIsSent] = useState(false);
  const [inputs, setInputs] = useState<{
    name: string;
    email: string;
    phoneNumber: string;
    file: File | string;
  }>({
    name: "",
    email: "",
    phoneNumber: "",
    file: "",
  });
  const [isFileTooBig, setIsFileTooBig] = useState<boolean>(false);
  const [fileUploading, setFileUploading] = useState(false);

  const handleFileChange = (e: any) => {
    const file = e.target.files[0];
    if (file.size > 20 * 1024 * 1024) {
      setIsFileTooBig(true);
    } else if (!["application/pdf", "application/msword"].includes(file.type)) {
      toast.error("Dozwolone formaty plików w: PDF, DOC, DOCX", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
      });
      setIsFileTooBig(true);
    } else {
      setIsFileTooBig(false);
    }
  };

  const uploadFile = async (file: any) => {
    setFileUploading(true);
    const randId = `cv-${uuidv4()}`;
    const docRef = ref(storage, randId);

    try {
      await uploadBytes(docRef, file);
      const url = await getDownloadURL(docRef);
      setInputs((prev) => ({ ...prev, file: url }));
      setFileUploading(false);
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  return (
    <div>
      <div className="grid grid-cols-1 gap-4 p-4 rounded-b-lg">
        <div className="flex flex-col text-black">
          <label className="text-sm text-white" htmlFor="name">
            Imię i nazwisko
          </label>
          <input
            className="rounded-md p-2 border-b-[3px]  focus:border-ctaStart bg-gray-200 focus:bg-white duration-200 hover:bg-gray-100  outline-none focus:outline-none border-transparent"
            type="text"
            id="name"
            name="name"
            value={formState?.name}
            placeholder="Jan Kowalski"
            onChange={(e) =>
              setFormState(() => ({ ...formState, name: e.target.value }))
            }
          />
        </div>
        <div className="grid grid-cols-2 gap-4 text-black">
          <div className="flex flex-col">
            <label className="text-sm text-white" htmlFor="email">
              Adres e-mail
            </label>
            <input
              required
              className="rounded-md p-2 border-b-[3px] focus:border-ctaStart bg-gray-200 focus:bg-white duration-200 hover:bg-gray-100  outline-none focus:outline-none border-transparent"
              type="email"
              id="email"
              name="email"
              placeholder="jan.kowalski@gmail.com"
              value={formState.email}
              onChange={(e) =>
                setFormState(() => ({ ...formState, email: e.target.value }))
              }
            />
          </div>
          <div className="flex flex-col">
            <label className="text-sm text-white" htmlFor="phoneNumber">
              Numer telefonu
            </label>
            <input
              required
              className="rounded-md p-2 border-b-[3px] focus:border-ctaStart bg-gray-200 focus:bg-white duration-200 hover:bg-gray-100  outline-none focus:outline-none border-transparent"
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              value={formState?.phoneNumber}
              placeholder="Numer telefonu"
              onChange={(e) =>
                setFormState(() => ({
                  ...formState,
                  phoneNumber: e.target.value,
                }))
              }
            />
          </div>
        </div>
        <Documents
          user={user}
          setFormState={setFormState}
          formState={formState}
          handleFileChange={handleFileChange}
        />
        <div className="flex flex-col items-center justify-center text-sm text-white">
          {isFileTooBig && <p className="text-red-600">Plik jest za duży</p>}
        </div>
        <div className="grid grid-cols-2 gap-4 sticky bottom-[1rem]">
          {!fileUploading && (
            <button
              onClick={() => {
                if (!isFileTooBig) {
                  uploadFile(inputs.file);
                }
              }}
              disabled={isSent || isFileTooBig}
              className="disabled:cursor-not-allowed bg-gradient-to-r from-ctaStart to-primaryHoverEnd text-white text border-transparent-zinc-800 outline-none focus:outline-none duration-200 text-center py-2 rounded-md"
            >
              {!isSent && "APLIKUJ"}
              {isSent && "DZIĘKUJEMY"}
            </button>
          )}
          {fileUploading && (
            <button
              onClick={() => {
                if (!isFileTooBig) {
                  uploadFile(inputs.file);
                }
              }}
              disabled={true}
              className="disabled:cursor-not-allowed bg-gradient-to-r from-ctaStart to-primaryHoverEnd text-white text border-transparent-zinc-800 outline-none focus:outline-none duration-200 text-center py-2 rounded-md"
            >
              WYSYŁANIE
            </button>
          )}

          <button
            onClick={() => setApplyOpen(false)}
            className="text-white px-6 py-2 rounded-md bg-gradient-to-r from-red-500 to-red-600 hover:from-red-400 hover:to-red-500 transition duration-300"
          >
            ANULUJ
          </button>
        </div>
        <details className="text-sm text-white">
          <summary className="cursor-pointer">
            Aplikując wyrażam zgodę na przetwarzanie moich danych osobowych
            zawartych w formularzu rekrutacyjnym przez Quixy.pl
          </summary>
          <p>
            w celu przeprowadzenia procesu rekrutacji przez {companyName}{" "}
            zgodnie z przepisami Rozporządzenia Parlamentu Europejskiego i Rady
            (UE) 2016/679 z dnia 27 kwietnia 2016 r. w sprawie ochrony osób
            fizycznych w związku z przetwarzaniem danych osobowych i w sprawie
            swobodnego przepływu takich danych (RODO).
          </p>
        </details>
      </div>
    </div>
  );
}
