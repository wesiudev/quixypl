"use client";
import { FaSignOutAlt } from "react-icons/fa";
import { useState } from "react";

export default function HtmlInput({
  label,
  type,
  closeInput,
}: {
  label: any;
  type: any;
  closeInput: any;
}) {
  return (
    <>
      {type === "html" && (
        <div className="z-[250] fixed w-[50vw] min-h-[50vh] bg-slate-700 top-1/2 -translate-y-1/2 -translate-x-1/2 left-1/2 p-8 flex items-center justify-center flex-col">
          <button
            onClick={closeInput}
            className="flex w-full justify-between mb-4 text-white font-bold"
          >
            <p className="text-2xl">{label}</p>
            <div className="flex flex-row items-center">
              Zamknij
              <FaSignOutAlt className="ml-2" />
            </div>
          </button>

          {/* Pass the correct value */}
          <button
            onClick={closeInput}
            className="text-white w-full p-4 bg-green-500 hover:bg-green-600 mt-4"
          >
            Zatwierdź
          </button>
        </div>
      )}
    </>
  );
}
